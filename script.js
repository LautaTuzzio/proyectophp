var phrases = [];


//Añadir frases a la lista
function addPhrase(event) {
  if (event.key === "Enter") {
    var phraseInput = document.getElementById("phrase-input");
    var phrase = phraseInput.value;

    if (phrase.trim() !== "" && isValidPhrase(phrase)) {
      phrases.push(phrase);
      appendPhraseToList(phrase);
      savePhrasesToLocalStorage();

      var isRandom = false;
      if (document.getElementById("merged-phrase").textContent === phrase) {
        isRandom = true;
      }

      savePhraseToDatabase(phrase, isRandom);
    } else {
      alert("Por favor, ingrese una frase válida");
    }

    phraseInput.value = "";
  }
}

//Revisar si la frase es valida (posicion de la coma)
function isValidPhrase(phrase) {
  var commaIndex = phrase.indexOf(",");
  if (commaIndex === -1 || commaIndex === 0 || commaIndex === phrase.length - 1) {
    return false;
  }
  return true;
}

//El unidor de frases en su maximo esplendor
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
  
  savePhraseToDatabase(mergedPhrase, true);
}

//Separar la frase para tener dos variables a luego fusionar
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

//Hacer que lo escrito en el input se muestre en la lista
function appendPhraseToList(phrase) {
  var phraseList = document.getElementById("phrase-list");
  var listItem = document.createElement("li");
  listItem.textContent = phrase;
  phraseList.appendChild(listItem);
}

//para guardar la lista
function savePhrasesToLocalStorage() {
  localStorage.setItem("phrases", JSON.stringify(phrases));
}

//para borrar frases
function deleteList() {
  phrases = [];
  savePhrasesToLocalStorage();
  clearPhraseList();
}

//boton para borrar frase
function deleteNextPhrase(event) {
  if (deleteMode && event.target.tagName === "LI") {
    var phraseToDelete = event.target.textContent;
    deletePhrase(phraseToDelete);
    deleteMode = false;
    var deleteButton = document.getElementById("delete-list-button");
    deleteButton.textContent = "Borrar Frase";
  }
}

//ya ni me acuerdo pero si lo borro no funca
function deletePhrase(phraseToDelete) {
  var index = phrases.indexOf(phraseToDelete);
  if (index !== -1) {
    phrases.splice(index, 1);
    savePhrasesToLocalStorage();
    clearPhraseList();
    phrases.forEach(function (phrase) {
      appendPhraseToList(phrase);
    });
    deletePhraseFromDatabase(phraseToDelete);
  }
}

//definitivamente borrar la frase
function clearPhraseList() {
  var phraseList = document.getElementById("phrase-list");
  phraseList.innerHTML = "";
}

var deleteMode = false;

//cambio de estado del boton para borrar la lista
function deleteList() {
  deleteMode = !deleteMode;
  var deleteButton = document.getElementById("delete-list-button");
  deleteButton.textContent = deleteMode ? "Cancelar" : "Borrar Frase";
}

//para cargar los datos
window.addEventListener("load", function () {
  if (localStorage.getItem("phrases")) {
    phrases = JSON.parse(localStorage.getItem("phrases"));
    phrases.forEach(function (phrase) {
      appendPhraseToList(phrase);
    });
  }
});

const showDivsButton = document.getElementById("showDivsButton");
const divContainer = document.getElementById("divContainer");
const closeButton = document.getElementById("closeButton");

//abrir el tutorial
showDivsButton.addEventListener("click", function () {
  divContainer.style.display = "flex";
  showDivsButton.style.display = "none";
});

//cerrar el tutorial
closeButton.addEventListener("click", function () {
  divContainer.style.display = "none";
  showDivsButton.style.display = "block";
});

//agregar frase a la base de datos
function savePhraseToDatabase(phrase, isRandom) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "save-phrase.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("phrase=" + encodeURIComponent(phrase) + "&isRandom=" + isRandom);
}

//agregar frase aleatoria a la base de datos
function deletePhraseFromDatabase(phrase) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "delete-phrase.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("phrase=" + encodeURIComponent(phrase));
}
