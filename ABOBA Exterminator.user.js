// ==UserScript==
// @name         ABOBA Exterminator
// @namespace    https://www.twitch.tv/zy0xxx
// @version      0.1
// @description  Changes ABOBA to something else
// @author       Creyea
// @match        https://www.twitch.tv/zy0xxx*
// @run-at       document-start
// @grant        none
// ==/UserScript==

/*globals $*/

const config = { attributes: true, childList: true, subtree: true };
const convertImage = "https://cdn.7tv.app/emote/637ae750130746c5b9f61c44/1x.webp 1x, https://cdn.7tv.app/emote/637ae750130746c5b9f61c44/2x.webp 2x";
const convertName = "wideKokoDizzy"; // This is basically a formality.


function abobaExterminator(chat) {
    // Declare the very first aboba (unless it's null)
    var aboba = document.querySelector('img[alt="ABOBA"]')

    // Callback function to execute when mutations are observed
    // Copied straight from the MDN docs LOL
    const wideKoko = (mutationList, observer) => {

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

        // Checks for aboba and if it exists, replace with wideKokoDizzy
        aboba = document.querySelector('img[alt="ABOBA"]')
        if (aboba) {
            aboba.srcset = convertImage;
            aboba.alt = convertName;
        }
    };

    // Create an observer instance linked to the callback function
    const abobaWatcher = new MutationObserver(wideKoko);

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

