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
const killEnemy = [];

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

  //step 1 and step 2 after kill
  indexEnemies.forEach((index, i) => {
    //если данные массива не находятся в другом массиве (не убит)
    if(!killEnemy.includes(i)){
      blocks[index].classList.add('enemy');
    }
  })

  //game over
  if(blocks[playerIndex].classList.contains('enemy')){
    alert('game over!');
    endGame();
    return;
  }

  //game over
  for (let i = 0; i < indexEnemies.length; i++) {
    if (indexEnemies[i] > blocks.length - countRow) {
      alert('game over!');
      endGame();
      return;
    }
  }

  //win!!
  if(killEnemy.length === indexEnemies.length){
    alert('WIN!!!');
    endGame();
    return;
  }

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

const fire = e => {
if(e.code === "Space"){
  let bulletIndex = playerIndex;

  const flyBullet = () => {
    blocks[bulletIndex].classList.remove('bullet');
    bulletIndex -= countRow;
    blocks[bulletIndex].classList.add('bullet');

    if(bulletIndex < countRow) {

      setTimeout(() => {
        blocks[bulletIndex].classList.remove('bullet');
      }, 50);
      return;
    }

    if(blocks[bulletIndex].classList.contains('enemy')){
      blocks[bulletIndex].classList.remove('bullet');
      blocks[bulletIndex].classList.remove('enemy');

      const indexKillEnemy = indexEnemies.indexOf(bulletIndex);
      killEnemy.push(indexKillEnemy);
      return;
    }

    setTimeout(flyBullet, 50);
    }
  
  flyBullet();
}
};

document.addEventListener('keydown', fire);
document.addEventListener('keydown', movePlayer);

const endGame = () => {
  document.removeEventListener('keydown', fire);
  document.removeEventListener('keydown', movePlayer);
}