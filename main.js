
document.addEventListener('DOMContentLoaded', async () => {

    chrome.storage.sync.get(['risk', 'entryPrice', 'slPrice'], function (result) {

        let risk = document.getElementById("risk");
        let entryPrice = document.getElementById("entryPrice");
        let slPrice = document.getElementById("slPrice");

        if (result.hasOwnProperty('risk') || result.hasOwnProperty('entryPrice') || result.hasOwnProperty('slPrice')) {
            if (result.hasOwnProperty('risk')) {
                risk.value = result.risk;
            } if (result.hasOwnProperty('entryPrice')) {
                entryPrice.value = result.entryPrice;
            } if (result.hasOwnProperty('slPrice')) {
                slPrice.value = result.slPrice;
            }

            FinalCalculationResult();
        }
    });

})


document.getElementById("btn-reset").addEventListener('click', ResetCalculator);


document.getElementById("risk").addEventListener("keyup", FinalCalculationResult);
document.getElementById("entryPrice").addEventListener("keyup", FinalCalculationResult);
document.getElementById("slPrice").addEventListener("keyup", FinalCalculationResult);





//utils
function getSLRupeePerShare(entryPrice, slPrice) {
    return (parseFloat(entryPrice) - parseFloat(slPrice)).toFixed(2);
}

function getTotalSharesPerTrade(risk, SLRupeePerShare) {
    return Math.round(parseFloat(risk) / parseFloat(SLRupeePerShare));
}

function getRatioTarget(entryPrice, SLRupeePerShare, ratio = 1) {
    return (parseFloat(entryPrice) + (parseFloat(SLRupeePerShare) * ratio)).toFixed(2);
}

function ResetCalculator() {

    console.log("resetting calculator");
    let risk = document.getElementById("risk");
    let entryPrice = document.getElementById("entryPrice");
    let slPrice = document.getElementById("slPrice");
    let slrsPerShare = document.getElementById("slrsPerShare");
    let slTotalShare = document.getElementById("slTotalShare");
    let riskTarget1 = document.getElementById("riskTarget1");
    let riskTarget2 = document.getElementById("riskTarget2");


    risk.value = null;
    entryPrice.value = null;
    slPrice.value = null;
    slrsPerShare.value = null;
    slTotalShare.value = null;
    riskTarget1.value = null;
    riskTarget2.value = null;

    chrome.storage.sync.set({ "risk": null, "entryPrice": null, "slPrice": null }, function () {

    });
}


function FinalCalculationResult() {

    console.log("final calulated result");
    let risk = document.getElementById("risk").value;
    let entryPrice = document.getElementById("entryPrice").value;
    let slPrice = document.getElementById("slPrice").value;
    let slrsPerShare = document.getElementById("slrsPerShare");
    let slTotalShare = document.getElementById("slTotalShare");
    let riskTarget1 = document.getElementById("riskTarget1");
    let riskTarget2 = document.getElementById("riskTarget2");


    slrsPerShareValue = getSLRupeePerShare(entryPrice, slPrice);
    slTotalShareValue = getTotalSharesPerTrade(risk, slrsPerShareValue);



    slrsPerShare.value = slrsPerShareValue;
    slTotalShare.value = slTotalShareValue;


    riskTarget1.value = getRatioTarget(entryPrice, slrsPerShareValue, 1);
    riskTarget2.value = getRatioTarget(entryPrice, slrsPerShareValue, 2);


    chrome.storage.sync.set({ "risk": risk, "entryPrice": entryPrice, "slPrice": slPrice }, function () {

    });



}