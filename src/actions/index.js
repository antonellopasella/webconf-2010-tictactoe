export function move(index, symbol) {
  return {
      type: 'GAME_MOVE',
      index,
      symbol
  };
}

export function resetGame() {
  return {
      type: 'RESET_GAME'
  };
}




