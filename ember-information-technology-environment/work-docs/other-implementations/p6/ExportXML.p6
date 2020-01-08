my $input = slurp();

my $parsed;
run-silenced { $parsed = EM.parse($input); }

say $parsed.tree;
