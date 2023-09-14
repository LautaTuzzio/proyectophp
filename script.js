var phrases = [];

function addPhrase(event) {
  if (event.key === "Enter") {
    var phraseInput = document.getElementById("phrase-input");
    var phrase = phraseInput.value;

    if (phrase.trim() !== "" && isValidPhrase(phrase)) {
      savePhraseToDatabase(phrase, false, function() {
        fetchPhrases();
      });
    } else {
      alert("Por favor, ingrese una frase válida");
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
  var mergedPhraseDiv = document.getElementById("merged-phrase");

  if (phrases.length < 2) {
    alert("Por favor, escribe frases antes de tocar el botón");
    return;
  }

  fetchPhrasesFromDatabase(function(phrasesFromDatabase) {
    console.log("Frases de la base de datos:", phrasesFromDatabase);

    var phrasesInDatabase = phrases.filter(function (phrase) {
      return phrasesFromDatabase.includes(phrase) && phrase.trim() !== '';
    });

    console.log("Frases en la base de datos:", phrasesInDatabase);

    if (phrasesInDatabase.length < 2) {
      alert("No hay suficientes frases válidas en la base de datos para crear un refrán");
      return;
    }

    var randomIndex1 = Math.floor(Math.random() * phrasesInDatabase.length);
    var randomIndex2;
    
    do {
      randomIndex2 = Math.floor(Math.random() * phrasesInDatabase.length);
    } while (randomIndex1 === randomIndex2);
    
    var phrase1 = phrasesInDatabase[randomIndex1];
    var phrase2 = phrasesInDatabase[randomIndex2];
    
    console.log("Frases seleccionadas:", phrase1, phrase2);

    var firstHalfPhrase1 = splitPhrase(phrase1).firstHalf;
    var secondHalfPhrase2 = splitPhrase(phrase2).secondHalf;

    console.log("Primera mitad de la frase1:", firstHalfPhrase1);
    console.log("Segunda mitad de la frase2:", secondHalfPhrase2);
    
    var mergedPhrase = firstHalfPhrase1 + ", " + secondHalfPhrase2;
    
    mergedPhraseDiv.textContent = mergedPhrase;

    savePhraseToDatabase(mergedPhrase, true, function () {
      fetchPhrases();
    });
  });
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

function deleteList() {
  phrases = [];
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
    clearPhraseList();
    phrases.forEach(function (phrase) {
      appendPhraseToList(phrase);
    });
    deletePhraseFromDatabase(phraseToDelete);
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
  fetchPhrases();
});

const showDivsButton = document.getElementById("showDivsButton");
const divContainer = document.getElementById("divContainer");
const closeButton = document.getElementById("closeButton");

showDivsButton.addEventListener("click", function () {
  divContainer.style.display = "flex";
  showDivsButton.style.display = "none";
});

closeButton.addEventListener("click", function () {
  divContainer.style.display = "none";
  showDivsButton.style.display = "block";
});

function savePhraseToDatabase(phrase, isRandom, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "save-phrase.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (callback) {
          callback(); 
        }
      } else {
        console.error("Error");
      }
    }
  };

  if (phrase === null) {
    return;
  }

  xhr.send("phrase=" + encodeURIComponent(phrase) + "&isRandom=" + isRandom);
}

function deletePhraseFromDatabase(phrase) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "delete-phrase.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("phrase=" + encodeURIComponent(phrase));
}

window.addEventListener("load", function () {
  fetchPhrases();
});

function fetchPhrasesFromDatabase(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "get-phrases.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var phrasesFromDatabase = JSON.parse(xhr.responseText);
      callback(phrasesFromDatabase);
    }
  };
  xhr.send();
}

function fetchPhrases() {
  fetchPhrasesFromDatabase(function(phrasesFromDatabase) {
    phrases = phrasesFromDatabase;
    displayPhrases();
  });
}

function displayPhrases() {
  var phraseList = document.getElementById("phrase-list");
  phraseList.innerHTML = "";
  var phrasesWithoutNulls = phrases.filter(function (phrase) {
    return phrase !== null;
  });
  phrasesWithoutNulls.forEach(function (phrase) {
    appendPhraseToList(phrase);
  });
}