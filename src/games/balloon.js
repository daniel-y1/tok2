class BalloonGame {
  constructor(players, screen, endCallback){
    this.players = players;
    this.screen = screen;
    this.endCallback = endCallback;
    this.playerScore = Array(players.length).fill({
      balloonState: 0,
      balloonScore: 0,
      characterState: 0
    });
  }

  receiveMessage(ws, msg) {
    if(msg.action === 'game_action' && msg.action_type === 'pump') {
      this.playerPumpEvent(msg);
    }
  }

  playerPumpEvent(msg) {
    let id = msg.id - 1;
    this.playerScore[id].balloonState += 1;
    this.playerScore[id].characterState += 1;
    this.playerScore[id].characterState %= 2;
    this.updateScreenState();
  }

  updateScreenState() {
    let msgToScreen = {
      action: 'game_action',
      players: []
    }
    for(let i = 0; i < this.players.length; i++) {
      msgToScreen.players.push({
        id: i + 1,
        ...this.playerScore[i],
        score: this.players[i].score
      });
    }

    this.screen.socket.send(JSON.stringify(msgToScreen));
  }
}

module.exports = BalloonGame;