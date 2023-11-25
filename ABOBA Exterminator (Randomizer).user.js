// ==UserScript==
// @name         ABOBA Exterminator (Randomizer)
// @namespace    https://www.twitch.tv/zy0xxx
// @version      0.1
// @description  Changes ABOBA to something else
// @author       Creyea
// @match        https://www.twitch.tv/zy0xxx*
// @run-at       document-start
// @grant        none
// ==/UserScript==

/*globals $*/

// wideKoko dictionary (emote IDs)
const wideKokoList = {"wideKokoPout": "637ae7863b8505514ff559a2",
                      "wideKokoWatermelon": "637ae7863b8505514ff559a2",
                      "wideKokoBlush": "637ae7379ff7bf291586cdbd",
                      "wideKokoSussy": "637ae8a650303517914e7d09",
                      "wideKokoOk": "640ceb7d872fd1e1c67df903",
                      "wideKokoWink": "640e573964170c9686326f04",
                      "wideKokoAngry": "637ae7703b8505514ff5599f",
                      "wideKokoRage": "640cea48d25fb102fc6c848a",
                      "wideKokoWow": "641358d112ae2f4792c70b53",
                      "wideKokoTired": "640cf651b2a921bacda41026",
                      "wideKokoHuh": "640cf5dd5df4f1465c9a2c38",
                      "wideKokoStare": "641ee97a69c7f0543f42a574",
                      "wideKokoSigh": "641eea1e0ef35e7ab89f1041",
                      "wideKokoSleepy": "64ae7d076ccd286783ce7e71",
                      "wideKokoDizzy": "637ae750130746c5b9f61c44"};

const config = { attributes: true, childList: true, subtree: true };


function emoteRandomizer(obj) {
    var keys = Object.keys(obj);
    var key = keys[keys.length * Math.random() << 0];
    var value = "https://cdn.7tv.app/emote/" + obj[key];

    // "https://cdn.7tv.app/emote/637ae750130746c5b9f61c44/1x.webp 1x, https://cdn.7tv.app/emote/637ae750130746c5b9f61c44/2x.webp 2x"
    var imgString = value + "/1x.webp 1x, " + value + "/2x.webp 2x";

    return [ key, imgString ];
}

function abobaExterminator(chat) {

    // Callback function to execute when mutations are observed
    // Copied straight from the MDN docs LOL
    const replacer = (mutationList, observer) => {

        // Function for checking each mutation. Not needed here but I'll keep it anyway.
        /*
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                console.log("A child node has been added or removed.");
            } else if (mutation.type === "attributes") {
                console.log(`The ${mutation.attributeName} attribute was modified.`);
            }
        }
        */

        var chosen = emoteRandomizer(wideKokoList);

        // Checks for aboba and if it exists, replace with other emote
        // Replacing alt is unnecessary, but might have a function later...
        var aboba = document.querySelector('img[alt="ABOBA"]')
        if (aboba) {
            aboba.srcset = chosen[1];
            aboba.alt = chosen[0];
        }

        chosen = emoteRandomizer(wideKokoList);

        var abozo = document.querySelector('img[alt="ABOZO"]')
        if (abozo) {
            abozo.srcset = chosen[1];
            abozo.alt = chosen[0];
        }
    };

    // Create an observer instance linked to the callback function
    const abobaWatcher = new MutationObserver(replacer);

    // Start observing the target node for configured mutations
    abobaWatcher.observe(chat, config);
}

// Wait for 7tv chat to load. Stolen from below ICANT
// https://stackoverflow.com/questions/16149431/make-function-wait-until-element-exists
var preloader = new MutationObserver(function (mutations, me) {
    // `mutations` is an array of mutations that occurred
    // `me` is the MutationObserver instance

    // Checks for chat every mutation.
    var chat = document.querySelector(".seventv-chat-list");

    // If chat exists, start the abobaExterminator.
    if (chat) {
        abobaExterminator(chat);
        me.disconnect(); // stop observing
        return;
    }
});
preloader.observe(document, config);



