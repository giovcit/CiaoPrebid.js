const logHeader = '[PREBID]'
function loadPrebidAndExecute(callback) {
    console.log(`${logHeader} Caricamento Prebid.js...`);
    const script = document.createElement('script');
    script.src = "../../build/dev/prebid.js";
    script.async = true;
    script.onload = function () {
        console.log(`${logHeader} ciaoPrebid caricato`);
        callback();
    };
    script.onerror = function () {
        console.error(`${logHeader} Errore nel caricamento di ciaoPreid.`);
    };
    document.head.appendChild(script);
}

function doPrebid() {
    console.log(`${logHeader} Avvio Prebid...`);
    pbjs.que.push(function () {
        pbjs.addAdUnits(adPubmatic);
        pbjs.requestBids({
            bidsBackHandler: function () {
                console.log(`${logHeader} Offerte ricevute.`);
                pbjs.setTargetingForGPTAsync();
                defineGptSlots();
            }
        });
    });
}

function defineGptSlots() {
    console.log(`${logHeader} Definizione slot GPT.`);
    googletag.cmd.push(function () {
        googletag.defineSlot('/1234567/test-slot', [300, 250], 'div-gpt-ad-12345-0')
            .addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
}