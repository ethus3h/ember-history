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
