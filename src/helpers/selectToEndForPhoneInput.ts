export const selectToEnd=(el:any)=>{
    el.target.focus()
    if(el.target.selectionStart<2)el.target.selectionStart = el.target.value.length;
}
