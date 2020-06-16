const blocks = document.querySelectorAll('.game div');
const playerIndex = Math.round(blocks.length - Math.sqrt(blocks.length) / 2);

const indexEnemy = [
  23,24,25,26,27,28,29,30,31,32,33,34,35,36,
  43,44,45,46,47,48,49,50,51,52,53,54,55,56,
  63,64,65,66,67,68,69,70,71,72,73,74,75,76
];
//add enemu-class
for (const enemy of indexEnemy) {
  blocks[enemy].classList.add('enemy');
}

blocks[playerIndex].classList.add('player');