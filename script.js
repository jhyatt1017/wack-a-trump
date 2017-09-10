  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  let lastHole;
  let timeUp = false;
  let score = 0;

//Gives a random amount of time.
  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

//Pick a random hole for the mole to pop-up from and makes sure its doesn't come out the same hole in a row.
  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      console.log('Ah nah thats the same one bud');
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }

//Get moles to come up and down by adding and removing css class 'up'.
  function peep() {
    const time = randomTime(400, 1200);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }

//Start game with scoreboard at 0 and 10 seconds on the clock.
  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
  }

//Clicking mole
  function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
  moles.forEach(mole => mole.addEventListener('click', bonk));

