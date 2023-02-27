export const FromStringToNumber=(val:string | null | undefined):string | number | undefined=>{
    let num=undefined;
    if(val)
        num = parseInt(val.replaceAll(" ", "")).toString();
    if (num === 'NaN') val = undefined;
    else val = num;
    return val;
}