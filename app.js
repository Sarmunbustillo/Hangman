const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('.wrong-letters');
const playAgainBtn = document.querySelector('.play-button');
const popup = document.querySelector('.popup-container');
const notification = document.querySelector('.notification-container');
const finalMessage = document.querySelector('.final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// shos hidden word
displayWord = () => {
  wordEl.innerHTML = `
        ${selectedWord
          .split('')
          .map(
            (letter) => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `
          )
          .join('')}
    `;

  //replace the new char check at console.log(wordEl.innerText, innerWord);
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord.toLowerCase() === selectedWord.toLocaleLowerCase()) {
    finalMessage.innerText = 'Congratulations! You won!';
    popup.style.display = 'flex';
  }
};

// update the wrong letters
updateWrongLetterEl = () => {
  // display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong Letters</p>' : ''}
    ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
  `;

  // display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost.';
    popup.style.display = 'flex';
  }
};

// show notification
showNotification = () => {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 4000);
};

// keydown letter press
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
});

// restart game and play again
playAgainBtn.addEventListener('click', () => {
  // empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetterEl();

  popup.style.display = 'none';
});

displayWord();
