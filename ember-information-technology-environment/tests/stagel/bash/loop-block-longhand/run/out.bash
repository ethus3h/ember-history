let strArrayTemp = [];
strArrayTemp = [ 'd', 'b', 'l', 'c', 'b', 'a' ];
let intC = 0;
let intI = 0;
let strElem = '';
while (await implLt(intI, await count(strArrayTemp))) {
    strElem = await get(strArrayTemp, intI);
    intI = await inc(intI);
    intC = await inc(intC);
}
