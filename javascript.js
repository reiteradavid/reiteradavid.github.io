function swap(y1,x1,y2,x2){
    let el1Location = y1 * 4 + x1;
    let el1 = document.getElementById(el1Location);
    let el2Location = y2 * 4 + x2;
    let el2 = document.getElementById(el2Location);
    let elTempinnerHTML = el2.innerHTML;
    let elTempstyleborder = el2.style.border;
    el2.innerHTML = el1.innerHTML;
    el2.style.border = el1.style.border;
    el1.innerHTML = elTempinnerHTML;
    el1.style.border = elTempstyleborder;
}

export{swap}
