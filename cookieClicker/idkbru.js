const display = document.getElementById("cookieClickNum");
let cookieNum = 0

function cookie(){

    cookieNum = cookieNum + 1;

    display.innerText = cookieNum;
    
}