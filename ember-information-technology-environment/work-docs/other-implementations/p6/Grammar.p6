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
