ne() {
    IFS=$'\037' read -r -a genericArrayA <<< "$1"; shift; IFS=$'\037' read -r -a genericItemB <<< "$1"; shift; internalDebugCollect "genericArray A = ${genericArrayA[@]}; "; internalDebugCollect "genericItem B = ${genericItemB[@]}; "; internalDebugStackEnter 'ne:in'; assertIsGenericArray "$(join_by $'\037' "${genericArrayA[@]}")"; assertIsGenericItem "$(join_by $'\037' "${genericItemB[@]}")"

    boolTemp=false
    boolTemp="$(implNot "$(implEq "$(join_by $'\037' "${genericArrayA[@]}")" "$(join_by $'\037' "${genericItemB[@]}")")")"

    boolReturn="$boolTemp"; assertIsBool "$boolReturn"; internalDebugStackExit; print "$boolReturn"
}
