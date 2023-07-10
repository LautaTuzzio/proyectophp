var phrases = [];

function addPhrase(event) {
    if (event.key === "Enter") {
        var phraseInput = document.getElementById("phrase-input");
        var phrase = phraseInput.value;

        if (phrase.trim() !== "") {
            phrases.push(phrase);
            appendPhraseToList(phrase);
        }

        phraseInput.value = "";
    }
}

function mergePhrases() {
    var phraseList = document.getElementById("phrase-list");
    var mergedPhraseDiv = document.getElementById("merged-phrase");

    if (phrases.length < 2) {
        alert("Por favor, escribe frases antes de tocar el botón");
        return;
    }

    var randomIndex1 = Math.floor(Math.random() * phrases.length);
    var randomIndex2 = Math.floor(Math.random() * phrases.length);

    while (randomIndex1 === randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * phrases.length);
    }

    var phrase1 = phrases[randomIndex1];
    var phrase2 = phrases[randomIndex2];

    var firstHalfPhrase1 = splitPhrase(phrase1).firstHalf;
    var secondHalfPhrase2 = splitPhrase(phrase2).secondHalf;

    var mergedPhrase = firstHalfPhrase1 + " " + secondHalfPhrase2;

    mergedPhraseDiv.textContent = mergedPhrase;
}

function splitPhrase(phrase) {
    var words = phrase.trim().split(" ");
    var mid = Math.floor(words.length / 2);
    var firstHalf = words.slice(0, mid).join(" ");
    var secondHalf = words.slice(mid).join(" ");

    return {
        firstHalf: firstHalf,
        secondHalf: secondHalf
    };
}

function appendPhraseToList(phrase) {
    var phraseList = document.getElementById("phrase-list");
    var listItem = document.createElement("li");
    listItem.textContent = phrase;
    phraseList.appendChild(listItem);
}