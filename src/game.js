import { createStore } from 'redux';
import { tictactoe } from './reducers';



export class Game {
  currentState = {};
  start() {
    this.currentState = tictactoe(null, {type: 'RESET_GAME'} );
    this.draw();
  }

  draw() {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'row';
    for (let i = 0; i < 9; i++) {
      row.innerHTML += '<div data-cellnum="' + i + '" class="col- row-cell row-cell-' + i + '"></div>';
    }
    container.appendChild(row);
    const cellNodes = document.getElementsByClassName('row-cell')

    for(var i = 0; i < cellNodes.length; i++) {
      const index = i;
      // cellNodes[i].innerHTML = index;
      cellNodes[i].onclick = () => {
        this.gameMove(index);
      };
    }
  }

  gameMove(index) {
    if (this.currentState.winner !== 'n') {
      return;
    }
    this.currentState = tictactoe(
      this.currentState,
      {type: 'GAME_MOVE', index: index, symbol: this.currentState.currentPlayer}
    );

    this.update();

    if (this.currentState.winner !== 'n') {
      setTimeout( () => {
        this.win();
      }, 200);
    }
  }

  update() {
    this.currentState.board.forEach( (element, index) => {
      const node = document.getElementsByClassName('row-cell-' + index)[0];
      if(element) {
        node.setAttribute('data-cellnum', element);
        node.classList.add('selected');
        node.classList.add('selected-' + element);
      }
      // node.innerHTML = element;
    });
  }

  win() {
    if(this.currentState.winner !== 'd') {
      alert(this.currentState.winner + ' WIN!');
    } else {
      alert('DRAW');
    }

    this.start();
  }
}
