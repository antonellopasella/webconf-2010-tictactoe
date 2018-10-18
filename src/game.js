import { createStore } from 'redux';
import { tictactoe } from './reducers';



export class Game {
  store;
  start() {
    this.draw();


    this.store = createStore(tictactoe);

    this.store.subscribe( (state) => {
      this.update();
      if (this.store.getState().winner !== 'n') {
        this.win();
      }
    });

    this.store.dispatch({type: 'RESET_GAME'});
  }

  // disegna la griglia 3x3
  draw() {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'row h-100';
    for (let i = 0; i < 9; i++) {
      row.innerHTML += '<div data-cellnum="' + i + '" class="col-4 row-cell row-cell-' + i + '"></div>';
    }
    container.appendChild(row);
    const cellNodes = document.getElementsByClassName('row-cell')

    for(var i = 0; i < cellNodes.length; i++) {
      const index = i;
      cellNodes[i].onclick = () => {
        this.gameMove(index);
      };
    }

    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  onResize() {
    const container = document.getElementById('game-container');
    container.style.height = container.clientWidth + 'px';
  }

  // handler click sulla cella
  gameMove(index) {
    if (this.store.getState().winner !== 'n') {
      return;
    }
    this.store.dispatch({
      type: 'GAME_MOVE',
      index: index,
      symbol: this.store.getState().currentPlayer
    });
  }

  // ridisegna il contenuto delle celle
  update() {
    this.store.getState().board.forEach( (element, index) => {
      const node = document.getElementsByClassName('row-cell-' + index)[0];
      if(element) {
        node.setAttribute('data-cellnum', element);
        node.classList.add('selected');
        node.classList.add('selected-' + element);
      }
    });
  }

  win() {
    // il setTimeout è un hack per aggirare il fatto che il paint di innerHTMl
    // non è sincrono per cui verrebbe mostrato l'alert PRIMA del ridisegno
    // Chrome/*
    setTimeout( () => {
      if(this.store.getState().winner === 'd') {
        alert('DRAW');
      } else if(this.store.getState().winner === 'O') {
        alert('BLUE WIN');
      } else {
        alert('RED WIN');
      }

      this.start();
    }, 200);
  }
}
