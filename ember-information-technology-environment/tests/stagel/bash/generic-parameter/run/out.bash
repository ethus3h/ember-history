ne() {genericA="$1"; shift; genericB="$1"; shift; internalDebugCollect "generic A = ${genericA[@]}; "; internalDebugCollect "generic B = ${genericB[@]}; "; internalDebugStackEnter 'ne:in'; assertIsGeneric "$genericA" assertIsGeneric "$genericB" 

    let "$boolTemp" = false;
    "$boolTemp"="$(implNot "$(implEq "$genericA" "$genericB")")";

    boolReturn="$boolTemp"; assertIsBool "$boolReturn"; 