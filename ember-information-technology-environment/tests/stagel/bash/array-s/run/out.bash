strFromByte() {intIn="$1"; shift; internalDebugCollect "int In = ${intIn[@]}; "; internalDebugStackEnter 'strFromByte:in'; assertIsInt "$intIn" 

    let "$strArrayChars" = [];
    "$strArrayChars"=[ '', '', '', '', '', '', '' ];
    # 0 through 6
    let "$strArrayTemp" = [];
    "$strArrayTemp"=[ 'd', 'b', 'l', 
    'c', 'b', 'a' ];
    append"$strArrayChars" "$strArrayTemp";

