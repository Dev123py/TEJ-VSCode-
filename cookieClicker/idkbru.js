let totalCookies = 0;
let multiplierLevel = 0;
let autoClickLevel = 0;
let villagerIsWorking = false;

function handleCookieClick() {
    totalCookies = totalCookies + (1 + multiplierLevel);
    refreshUI();
}

function buyUpgrade(type) {
    if (type == 'multiplier') {
        let cost = 10 * (multiplierLevel + 1);
        if (totalCookies >= cost && multiplierLevel < 10) {
            totalCookies = totalCookies - cost;
            multiplierLevel = multiplierLevel + 1;
        }
    } 
    
    if (type == 'autoclick') {
        let cost = 15 * (autoClickLevel + 1);
        if (totalCookies >= cost && autoClickLevel < 10) {
            totalCookies = totalCookies - cost;
            autoClickLevel = autoClickLevel + 1;
        }
    }
    refreshUI();
}

function spawnVillager() {
    let v = document.getElementById("villager");
    v.className = "bonus"; // Pop up in corner
    setTimeout(function() { 
        if (villagerIsWorking == false) { 
            v.className = ""; 
            startWait(); 
        } 
    }, 10000); 
}

function buyVillager() {
    let v = document.getElementById("villager");
    if (totalCookies >= 200 && v.className == "bonus") {
        totalCookies = totalCookies - 200;
        villagerIsWorking = true;
        v.className = "worker"; // Move near cookie
        setTimeout(function() { 
            villagerIsWorking = false; 
            v.className = ""; 
            startWait(); 
        }, 10000); 
    }
}

function startWait() { 
    setTimeout(spawnVillager, 240000); 
}

setInterval(function() {
    if (autoClickLevel > 0) {
        totalCookies = totalCookies + autoClickLevel;
    }
    if (villagerIsWorking == true) {
        totalCookies = totalCookies + 50;
    }
    refreshUI();
}, 1000);

function refreshUI() {
    document.getElementById("cookieCount").innerText = totalCookies;
    document.getElementById("multLevel").innerText = multiplierLevel;
    document.getElementById("multCost").innerText = 10 * (multiplierLevel + 1);
    document.getElementById("autoLevel").innerText = autoClickLevel;
    document.getElementById("autoCost").innerText = 15 * (autoClickLevel + 1);
}

startWait();