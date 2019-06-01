import { observable, action } from 'mobx';
import BingoStore from './bingoStore';
import { GAME_MODE, PLAYER } from '../constants/bingo';

class GameManagerStore {
  @observable bingoStore: BingoStore[]
  @observable gameMode: GAME_MODE
  @observable currentPlayer: PLAYER
  @observable isPlaying: boolean
  
  constructor() {
    this.bingoStore = [];
    this.bingoStore.push(new BingoStore());
    this.bingoStore.push(new BingoStore());
    this.isPlaying = false;
  }

  @action initGame = (gameMode:GAME_MODE) => {
    this.gameMode = gameMode;
    this.bingoStore[0].initGame();
    this.bingoStore[1].initGame();
    this.isPlaying = false;   
    this.bingoStore[0].clearBingoList();
    this.bingoStore[1].clearBingoList();
  }

  @action playGame = () => {
    this.currentPlayer = PLAYER.PLAYER_ONE;
    this.bingoStore[0].generateBingoBoard();
    this.bingoStore[0].clearBingoList();
    if (this.gameMode === GAME_MODE.MULTI) {
      this.bingoStore[1].generateBingoBoard();
      this.bingoStore[1].clearBingoList();
    }
    this.isPlaying = true;
  }

  @action clickBingoBoard = (player:PLAYER, value:number) => {
    if (value === 0) {
      return;
    }

    if (this.currentPlayer !== player) {
      alert('잘못된 차례입니다.');
      return;
    }

    this.clickCell(value);
    this.verifyWinner();
    this.nextPlayer();
  }

  @action clickCell = (value:number) => {
    this.bingoStore[0].clickCell(value);
    if (this.gameMode === GAME_MODE.MULTI) {
      this.bingoStore[1].clickCell(value);
    }
  }

  @action verifyWinner = () => {
    const isBingoedPlayerOne: boolean = this.bingoStore[0].isBingoed();
    const isBingoedPlayerTwo: boolean = this.bingoStore[1].isBingoed();

    if (this.gameMode === GAME_MODE.SINGLE) {
      if (isBingoedPlayerOne) {
        alert('1P가 빙고를 완성했습니다.');
      } else {
        return;
      }
    } else if (isBingoedPlayerOne && isBingoedPlayerTwo) {
      alert('무승부입니다.');
    } else if (isBingoedPlayerOne) {
      alert('1P가 빙고를 완성했습니다.');
    } else if (isBingoedPlayerTwo) { 
      alert('2P가 빙고를 완성했습니다.');
    } else {
      return;
    }
    this.initGame(this.gameMode);
  }

  @action nextPlayer = () => {
    if (this.gameMode === GAME_MODE.MULTI) {
      this.currentPlayer = (this.currentPlayer+1)%2;
    }
  }
}

export default GameManagerStore;