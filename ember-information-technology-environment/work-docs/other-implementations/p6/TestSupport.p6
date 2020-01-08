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
