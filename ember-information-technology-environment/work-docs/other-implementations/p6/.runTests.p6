#!/usr/bin/env perl6

use v6.c;
use Test;
use Grammar::Tracer;
use Grammar::ErrorReporting;
use XML::Writer;

# General support code
(
    # This class is originally by Moritz Lenz
    class SymbolTable {
        has @!scopes = {}, ;
        method enter-scope() {
            @!scopes.push({})
        }
        method leave-scope() {
            @!scopes.pop();
        }
        method declare($variable) {
            @!scopes[*-1]{$variable} = True
        }
        method check-declared($variable) {
            for @!scopes.reverse -> %scope {
                return True if %scope{$variable};
            }
            return False;
        }
        method getScopingSpaces() returns Str {
            my Int $scopeCount = @!scopes.elems - 2;
            return '    ' x $scopeCount;
        }
    }
);
my $*ST = SymbolTable.new;
grammar EM does Grammar::ErrorReporting {
    # High-level chunking of the code
    (
        token TOP {
            <block>
        }
        method block {
            $*ST.enter-scope();
            LEAVE $*ST.leave-scope();
            self.block_wrapped();
        }

        # Support rules for high-level chunking
        (
            token block_wrapped {
                [
                    '{ ' ~ ' }' <blockContents>
                ] ||
                <blockContents>
            }
            method blockTerminatedLines {
                my Str $*wantScopingSpaces = $*ST.getScopingSpaces();
                self.blockTerminatedLines_wrapped();
            }
            token blockTerminatedLines_wrapped {
                <scopingSpaces>
                <?{
                    say "Found scopingSpaces: '" ~ $<scopingSpaces> ~ "'";
                    say "Want scopingSpaces: '" ~ $*wantScopingSpaces ~ "'";
                    if $<scopingSpaces> ne $*wantScopingSpaces {
                        say "SCOPING SPACES MISMATCH";
                        return False;
                    }
                }>
                <terminatedLine>
            }
            token blockContents {
                <blockTerminatedLines>*
                <unterminatedLine>?
            }
            token scopingSpaces {
                '    '*
            }
        );
    );

    # Lines and their contents
    (
        token unterminatedLine {
            <lineContents>
        }
        token lineSeparator {
            \n || '; '
        }
        token terminatedLine {
            <unterminatedLine> \n
        }
        token lineContents {
            <assignment> ||
            <invocation> ||
            <declaration> ||
            ''
        }
    );

    # Identifiers, declarations, assignments, references, and invocations
    (
        token identifier {
            [
                [ <type> ' ' ]?
                <escapedName>
                [ <parameterList> ]?
            ] [ '.' <identifier> ]?
        }
        token declaration {
            <identifier>
        }
        token assignment {
            [
                <identifier> '=' <value>
            ] ||
            [
                <identifier> ' = ' <value>
            ] ||
            [
                <identifier> ':' [ ' ' || \n ] <value>
            ] ||
            <identifier> ':' [ ' ' || \n ] <blockContents>
        }
        token reference {
            [ <type> ' ' ]?
            '$'<escapedName>
            [ ' '? <parameterList> ]?
        }
        token invocation {
            <identifier> ' '? <parameterList>
        }
    );

    # Types and values
    (
        token type {
            'String' |
            \*
        }
        token value {
            [
                <invocation> ||
                <reference> ||
                <identifier> ||
                <literal>
            ] <value>?
        }
    );

    # Parameters and lists of parameters
    (
        token parameter {
            <optionalParameter> || <requiredParameter>
        }
        token parameterList {
            <emptyParameterList> ||
            <parenthesizedParameterList> ||
            <regularParameterList> ||
            <nullParameterList>
        }

        # Support rules for parameters
        (
            token optionalParameter {
                [
                    <type> |
                    <identifier>
                ] \?
            }
            token requiredParameter {
                <assignment> |
                [ <type> | <identifier> | <value> ]
            }
        );

        # Support rules for parameter lists
        (
            token parameterListBody {
                <parameter>* % ', '
            }

            token nullParameterList {
                ''
            }
            token emptyParameterList {
                '()'
            }
            token regularParameterList {
                ' ' <parameterListBody>
            }
            token parenthesizedParameterList {
                '(' ~ ')' <parameterListBody>
            }
        );
    );

    # Names vs literals
    (
        token escapedName {
            [\w|[\\\N]]+
        }
        token literal {
            <literalBlock> ||
            <number>
        }
    );

    # Literal types
    (
        token literalBlock {
            [
                ': '
                <blockContents>
            ] ||
            [
                '{ ' ~ ' }' <blockContents>
            ]
        }
        token number {
            \d+
        }
    );
}
say 'Testing optionalParameter';
(
    ok runParserTest('String qux?', 'optionalParameter');
);

say 'Testing parameter';
(
    ok runParserTest('*', 'parameter');
    ok runParserTest('String qux?', 'parameter');
    nok runParserTest('String qux?,', 'parameter', True);
);

say 'Testing parameterListBody';
(
    ok runParserTest('', 'parameterListBody');
    ok runParserTest('*', 'parameterListBody');
    ok runParserTest('String qux, *', 'parameterListBody');
    ok runParserTest('String qux?, *', 'parameterListBody');
    ok runParserTest('String qux?', 'parameterListBody');
    ok runParserTest('String, *', 'parameterListBody');
    ok runParserTest('String, String qux, String', 'parameterListBody');
    ok runParserTest('String, String qux?, *', 'parameterListBody');
    ok runParserTest('String, String qux?, String', 'parameterListBody');
    ok runParserTest('String, String qux?', 'parameterListBody');
    ok runParserTest('String, String qux', 'parameterListBody');
    ok runParserTest('String?, *', 'parameterListBody');
);

say 'Testing parenthesizedParameterList';
(
    ok runParserTest('(String, String qux?)', 'parenthesizedParameterList');
);

say 'Testing parameterList';
(
    ok runParserTest('()', 'parameterList');
    ok runParserTest('(*)', 'parameterList');
    ok runParserTest('(String, *)', 'parameterList');
    ok runParserTest('(String, String qux?, *)', 'parameterList');
    ok runParserTest('(String, String qux?)', 'parameterList');
    ok runParserTest('(String, String qux)', 'parameterList');
    #FIXME #ok runParserTest('$1$2$qux', 'parameterList');
);

say 'Testing identifier';
(
    ok runParserTest('foo', 'identifier');
    ok runParserTest('foo(String, String qux?, *)', 'identifier');
    ok runParserTest('foo(String, String qux?)', 'identifier');
    ok runParserTest('String foo(String, String qux?, *)', 'identifier');
);

say 'Testing invocation';
(
    ok runParserTest('foo (bar, baz)', 'invocation');
    ok runParserTest('foo bar 6 qux', 'invocation');
    ok runParserTest('foo bar baz', 'invocation');
    ok runParserTest('foo bar', 'invocation');
    ok runParserTest('foo qux=6 bar', 'invocation');
    ok runParserTest('foo(bar 6 qux)', 'invocation');
    ok runParserTest('foo(bar baz)', 'invocation');
    ok runParserTest('foo(bar, baz)', 'invocation');
    ok runParserTest('foo(bar)', 'invocation');
    ok runParserTest('foo(qux=6 bar)', 'invocation');
    ok runParserTest('foo(String, String qux?)', 'invocation');
    nok runParserTest('foo(bar, baz', 'invocation', True);
    nok runParserTest('foo(bar,baz)', 'invocation', True);
);

say 'Testing value';
(
    ok runParserTest('$1$2$qux', 'value');
);

say 'Testing lineContents';
(
    ok runParserTest('', 'lineContents');
    ok runParserTest('* foo', 'lineContents');
    ok runParserTest('foo', 'lineContents');
    ok runParserTest('foo()', 'lineContents');
    ok runParserTest('foo(bar)', 'lineContents');
    ok runParserTest('foo(String, String qux, String baz)', 'lineContents');
    ok runParserTest('foo(String, String qux?, *)', 'lineContents');
    ok runParserTest('foo(String, String qux?, String baz)', 'lineContents');
    ok runParserTest('foo(String, String qux?, String)', 'lineContents');
    ok runParserTest('foo(String, String qux?)', 'lineContents');
    ok runParserTest('foo(String, String, String)', 'lineContents');
    ok runParserTest('foo=5', 'lineContents');
    nok runParserTest('String qux?', 'lineContents', True);
);

say 'Testing TOP: Small documents';
(
    ok runParserTest('', 'TOP');
    ok runParserTest('foo', 'TOP');
    ok runParserTest('foo()', 'TOP');
    ok runParserTest('foo(bar)', 'TOP');
    ok runParserTest('foo=5', 'TOP');
);

say 'Testing TOP: Larger documents';
(
    ok runParserTest(q:to/♥/, 'TOP');
    String foo(String, String qux?, *):
    foo(bar baz)
    foo(qux=6 bar)
    ♥

    # ok runParserTest(q:to/♥/;String foo(String, String qux?, *):
    #     say $1$2$qux
    # 
    # # Test simple invocation
    # foo(bar baz) # $1 = bar, $2 is unset, $qux = baz
    # foo(bar 6 qux) # $1 = bar, $2 = 6, $3 = qux, $qux is unset
    # foo(qux=baz bar) # $1 = bar, $qux = baz
    # 
    # # Test simple invocation, parenthesis-less style
    # foo bar baz # $1 = bar, $2 is unset, $qux = baz
    # foo bar 6 qux # $1 = bar, $2 = 6, $3 = qux, $qux is unset
    # foo qux=baz bar # $1 = bar, $qux = baz
    # 
    # # Test invocation with "invoke"
    # routineName="foo"
    # invoke $routineName bar baz
    # ♥
    # , 'TOP');
);

say "Done running tests. Report:";
done-testing;
sub run-silenced (&code) {
    # run-silenced not by me
    temp $*OUT = temp $*ERR = class {
        BEGIN {
            ::?CLASS.^add_method: $_, my method (*@) {} for qw/say put print print-nl/
        }
    }.new;
    code;
}

sub runParserTest(Str $code, Str $rule, Bool $fail = False) {
    try {
        CATCH {
            default {
                if $fail {
                    say "Parsing threw an exception as expected."
                }
                else {
                    say EM.parse($code, :$rule);
                }
            }
        }
        if $fail {
            if runParserTestInner($code, $rule, $fail) {
                say "Test failed.";
                say EM.parse($code, :$rule);
                return True;
            }
            return False;
        }
        else {
            try {
                if ! runParserTestInner($code, $rule, $fail) {
                    say "Test failed.";
                    say EM.parse($code, :$rule);
                    return False;
                }
                return True;
            }
        }
    }
}

sub runParserTestInner(Str $code, Str $rule, Bool $fail = False) {
    try {
        CATCH {
            default {
                if $fail {
                    say "Parsing threw an exception as expected."
                }
                else {
                    #say EM.parse($code, :$rule);
                }
            }
        }
        $*ST = SymbolTable.new;
        if $fail {
            if run-silenced { EM.parse($code, :$rule) } {
            #if EM.parse($code, :$rule) {
                #say EM.parse($code, :$rule);
                say "Parsing unexpectedly succeeded.";
                # Return success status because this is being called by the test runner, which if $fail is True should be set to expect this to fail.
                return True;
            }
            else {
                fail "Parsing failed as expected.";
            }
        }
        else {
            #say "Part 1";
            if ! run-silenced { EM.parse($code, :$rule) } {
            #if ! EM.parse($code, :$rule) {
                #say EM.parse($code, :$rule);
                fail "Parsing unexpectedly failed.";
            }
            else {
                return True;
            }
        }
    }
}
