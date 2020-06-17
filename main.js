const blocks = document.querySelectorAll('.game div');
const countRow = Math.sqrt(blocks.length);
let playerIndex = Math.round(blocks.length - countRow / 2);

let move = 1;

//enemys
const indexEnemies = [
  23,24,25,26,27,28,29,30,31,32,33,34,35,36,
  43,44,45,46,47,48,49,50,51,52,53,54,55,56,
  63,64,65,66,67,68,69,70,71,72,73,74,75,76
];

//add enemy-class
for (const enemy of indexEnemies) {
  blocks[enemy].classList.add('enemy');
}

const moveEnemy = () => {
  const leftBlockEnemies = indexEnemies[0] % countRow === 0;
  const rightBlockEnemies = indexEnemies[indexEnemies.length - 1] % countRow === countRow - 1;

  if((leftBlockEnemies && move === -1) || (rightBlockEnemies && move === 1)) {
      move = countRow;
  } else if (move === countRow) {
    move = leftBlockEnemies ? 1 : -1;
  }

  indexEnemies.forEach(index =>  blocks[index].classList.remove('enemy'));

  for (let i = 0; i < indexEnemies.length; i++){
    indexEnemies[i] += move;
  };
  indexEnemies.forEach(index => {
    blocks[index].classList.add('enemy');
  })

  setTimeout(moveEnemy, 300);

};
moveEnemy();

//create enemy
blocks[playerIndex].classList.add('player');

const movePlayer = (e) => {
  blocks[playerIndex].classList.remove('player');
  if(e.code === 'ArrowLeft' && playerIndex > blocks.length - countRow) {
    playerIndex--;
  }
  if(e.code === 'ArrowRight' && playerIndex < blocks.length - 1){
    playerIndex++;
  }
  blocks[playerIndex].classList.add('player');
};

document.addEventListener('keydown', movePlayer);