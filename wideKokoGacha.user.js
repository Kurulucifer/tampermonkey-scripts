// ==UserScript==
// @name         wideKokoGacha
// @namespace    https://www.twitch.tv/zy0xxx
// @version      0.1
// @description  Adds the other wideKoko's at random
// @author       Creyea
// @match        https://www.twitch.tv/zy0xxx*
// @run-at       document-start
// @require      https://code.jquery.com/jquery-3.7.1.js
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


// Returns an array containing the replacement emote alt (name) and srcset (image links)
function emoteRandomizer(obj) {
    var keys = Object.keys(obj);
    var key = keys[keys.length * Math.random() << 0];
    var value = "https://cdn.7tv.app/emote/" + obj[key];

    // form: "https://cdn.7tv.app/emote/637ae750130746c5b9f61c44/1x.webp 1x, https://cdn.7tv.app/emote/637ae750130746c5b9f61c44/2x.webp 2x"
    var imgString = value + "/1x.webp 1x, " + value + "/2x.webp 2x";

    return [ key, imgString ];
}

function wideKokoGacha(chat) {
    // Callback function to execute when mutations are observed
    // Copied straight from the MDN docs LOL
    const replacer = (mutationList, observer) => {

        // Finds wideKokoGacha and replaces it with a random wideKoko emote
        $('.text-token:contains("wideKokoGacha")').each(function() {
            var chosen = emoteRandomizer(wideKokoList);
            // Creates an emote template from a random emote in chat and turns it into a wideKoko, then replaces
            var exampleEmote = document.querySelector('div[class="seventv-emote-box emote-token"]').parentNode.cloneNode(true);
            var emote = exampleEmote.querySelector('img');
            emote.srcset = chosen[1];
            emote.alt = chosen[0];
            $(this).replaceWith(exampleEmote);
        });
    };

    // Create an observer instance linked to the callback function
    const wideKokoWatcher = new MutationObserver(replacer);

    // Start observing the target node for configured mutations
    wideKokoWatcher.observe(chat, config);
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
        wideKokoGacha(chat);
        me.disconnect(); // stop observing
        return;
    }
});
preloader.observe(document, config);



