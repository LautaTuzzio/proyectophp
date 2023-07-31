var phrases = [];

function addPhrase(event) {
  if (event.key === "Enter") {
    var phraseInput = document.getElementById("phrase-input");
    var phrase = phraseInput.value;

    if (phrase.trim() !== "" && isValidPhrase(phrase)) {
      phrases.push(phrase);
      appendPhraseToList(phrase);
      savePhrasesToLocalStorage();
    } else {
      alert("Por favor, Ingrese una frase valida");
    }

    phraseInput.value = "";
  }
}

function isValidPhrase(phrase) {
  var commaIndex = phrase.indexOf(",");
  if (commaIndex === -1 || commaIndex === 0 || commaIndex === phrase.length - 1) {
    return false;
  }
  return true;
}

function mergePhrases() {
  var phraseList = document.getElementById("phrase-list");
  var mergedPhraseDiv = document.getElementById("merged-phrase");

  if (phrases.length < 2) {
    alert("Por favor, escribe frases antes de tocar el botón");
    return;
  }

  if (localStorage.getItem("phrases")) {
    phrases = JSON.parse(localStorage.getItem("phrases"));
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

  var mergedPhrase = firstHalfPhrase1 + ", " + secondHalfPhrase2;

  mergedPhraseDiv.textContent = mergedPhrase;

  savePhrasesToLocalStorage();
}

function splitPhrase(phrase) {
  var commaIndex = phrase.indexOf(",");
  if (commaIndex === -1) {
    return {
      firstHalf: phrase.trim(),
      secondHalf: ""
    };
  }

  var firstHalf = phrase.substring(0, commaIndex).trim();
  var secondHalf = phrase.substring(commaIndex + 1).trim();

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

function savePhrasesToLocalStorage() {
  localStorage.setItem("phrases", JSON.stringify(phrases));
}

function deleteList() {
  phrases = [];
  savePhrasesToLocalStorage();
  clearPhraseList();
}

function deleteNextPhrase(event) {
  if (deleteMode && event.target.tagName === "LI") {
    var phraseToDelete = event.target.textContent;
    deletePhrase(phraseToDelete);
    deleteMode = false;
    var deleteButton = document.getElementById("delete-list-button");
    deleteButton.textContent = "Borrar Frase";
  }
}

function deletePhrase(phraseToDelete) {
  var index = phrases.indexOf(phraseToDelete);
  if (index !== -1) {
    phrases.splice(index, 1);
    savePhrasesToLocalStorage();
    clearPhraseList();
    phrases.forEach(function (phrase) {
      appendPhraseToList(phrase);
    });
  }
}

function clearPhraseList() {
  var phraseList = document.getElementById("phrase-list");
  phraseList.innerHTML = "";
}

var deleteMode = false;

function deleteList() {
  deleteMode = !deleteMode;
  var deleteButton = document.getElementById("delete-list-button");
  deleteButton.textContent = deleteMode ? "Cancelar" : "Borrar Frase";
}

window.addEventListener("load", function () {
  if (localStorage.getItem("phrases")) {
    phrases = JSON.parse(localStorage.getItem("phrases"));
    phrases.forEach(function (phrase) {
      appendPhraseToList(phrase);
    });
  }
});
