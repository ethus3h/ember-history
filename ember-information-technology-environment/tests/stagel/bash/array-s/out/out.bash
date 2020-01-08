strFromByte() {
    intIn="$1"; shift; internalDebugCollect "int In = ${intIn[@]}; "; internalDebugStackEnter 'strFromByte:in'; assertIsInt "${intIn[@]}"

    strArrayChars=()
    strArrayChars=( '' '' '' '' '' '' '' )
    # 0 through 6
    strArrayTemp=()
    strArrayTemp=( 'd' 'b' 'l' 
    'c' 'b' 'a' )
    append "$(join_by $'\037' "${strArrayChars[@]}")" "$(join_by $'\037' "${strArrayTemp[@]}")"
}
