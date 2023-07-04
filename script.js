document.addEventListener('DOMContentLoaded', function() {
    var sobreMiButton = document.getElementById('sobre-mi-btn');
    var containerDiv = document.querySelector('.container');
  
    sobreMiButton.addEventListener('click', function() {
      var newDiv = document.createElement('div');
      newDiv.className = 'about-container';
      newDiv.innerHTML = `
      <h1>Sobre mi</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      `;
  
      containerDiv.parentNode.replaceChild(newDiv, containerDiv);
    });
  });



  document.addEventListener('DOMContentLoaded', function() {
  var temasButton = document.getElementById('temas-btn');
  var body = document.body;
  var currentTheme = 1;

  temasButton.addEventListener('click', function() {
    currentTheme = currentTheme < 4 ? currentTheme + 1 : 1;

    body.classList.remove('theme1', 'theme2', 'theme3', 'theme4');

    switch (currentTheme) {
      case 1:
        body.classList.add('theme1');
        break;
      case 2:
        body.classList.add('theme2');
        break;
      case 3:
        body.classList.add('theme3');
        break;
      case 4:
        body.classList.add('theme4');
        break;
      default:
        break;
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    var temasButton = document.getElementById('temas-btn');
    var body = document.body;
    var enviarButton = document.querySelector('input[type="submit"]');
    var currentTheme = 1;
  
    temasButton.addEventListener('click', function() {
      currentTheme = currentTheme < 4 ? currentTheme + 1 : 1;
  
      body.classList.remove('theme1', 'theme2', 'theme3', 'theme4');
  
      switch (currentTheme) {
        case 1:
          body.classList.add('theme1');
          enviarButton.className = '';
          break;
        case 2:
          body.classList.add('theme2');
          enviarButton.className = 'theme2';
          break;
        case 3:
          body.classList.add('theme3');
          enviarButton.className = 'theme3';
          break;
        case 4:
          body.classList.add('theme4');
          enviarButton.className = 'theme4';
          break;
        default:
          break;
      }
    });
  });
  
  function refreshPage() {
    location.reload();
  }
  

  function downloadFile() {
    var link = document.createElement('a');
    link.setAttribute('href', 'Codigo.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  