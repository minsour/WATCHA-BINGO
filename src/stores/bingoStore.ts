import { observable, action } from 'mobx';
import { BOARD_SIZE, BINGO_TYPE } from '../constants/bingo';
import IBingoBoard from '../interfaces/bingoBoard';
import IBingoCell from 'src/interfaces/bingoCell';

class BingoStore {
  @observable bingoBoard: IBingoBoard

  constructor() {
    this.bingoBoard = {
      bingoCells: [],
      bingoLines: []
    }
    for(let i = 0 ; i < BOARD_SIZE; i++) {
      const row:IBingoCell[] = []
      for(let j = 0 ; j < BOARD_SIZE ; j++) {
        row.push({
          value: 0,
          isClicked: false,
          x: i,
          y: j
        });
      }
      this.bingoBoard.bingoCells.push(row);
    }
  }

  @action initGame = () => {
    for(let i = 0 ; i < BOARD_SIZE; i++) {
      for(let j = 0 ; j < BOARD_SIZE ; j++) { 
        this.bingoBoard.bingoCells[i][j] = {
            value: 0,
            isClicked: false,
            x: i,
            y: j
          };
      }
    }
  }

  @action generateBingoBoard = () => {
    const numbers:number[] = [];
    for(let i = 0 ; i < BOARD_SIZE * BOARD_SIZE; i++) {
      numbers[i] = i+1;
    }

    for(let i = 0 ; i < BOARD_SIZE * BOARD_SIZE; i++) {
      const otherIndex:number = Math.floor(Math.random() * BOARD_SIZE * BOARD_SIZE);
      const temp:number = numbers[i];
      numbers[i] = numbers[otherIndex];
      numbers[otherIndex] = temp;
    }

    for(let i = 0 ; i < BOARD_SIZE; i++) {
      for(let j = 0 ; j < BOARD_SIZE ; j++) { 
        this.bingoBoard.bingoCells[i][j] = {
            value: numbers[i * BOARD_SIZE + j],
            isClicked: false,
            x: i,
            y: j
          };
      }
    }
  }

  @action clearBingoList = () => {
    this.bingoBoard.bingoLines = [];
  }
  @action clickCell = (value:number) => {
    for(let i = 0 ; i < BOARD_SIZE ; i++) {
      for(let j = 0 ; j < BOARD_SIZE ; j++) {
        if (this.bingoBoard.bingoCells[i][j].value === value) {
          this.bingoBoard.bingoCells[i][j].isClicked = true;
          this.verifyBingoByColRow(i, j);
          this.verifyBingoByCross(i, j);
        }
      }
    }
  }

  @action isBingoed = () => {
    return this.bingoBoard.bingoLines.length >= BOARD_SIZE
  }

  @action verifyBingoByColRow = (x:number, y:number) => {
    let rowCount: number = 0;
    let colCount: number = 0;
    for (let i = 0 ; i < BOARD_SIZE ; i++) {
      if (this.bingoBoard.bingoCells[x][i].isClicked) {
        colCount++;
      }
      if (this.bingoBoard.bingoCells[i][y].isClicked) {
        rowCount++;
      }
    }

    if (colCount === BOARD_SIZE) {
      this.bingoBoard.bingoLines.push(
        {
          type: BINGO_TYPE.ROW,
          num: x + 1
        }
      )
    }

    if (rowCount === BOARD_SIZE) {
      this.bingoBoard.bingoLines.push(
        {
          type: BINGO_TYPE.COL,
          num: y + 1
        }
      )
    }
  }

  @action verifyBingoByCross = (x:number, y:number) => {
    if (x === y) {
      let crossCount:number = 0;
      for(let i = 0 ; i < BOARD_SIZE; i++) {
        if (this.bingoBoard.bingoCells[i][i].isClicked) {
          crossCount++;
        }
      }
      if (crossCount === BOARD_SIZE) {
        this.bingoBoard.bingoLines.push(
          {
            type: BINGO_TYPE.CROSS,
            num: 1
          }
        )
      }
    }

    if (x + y + 1 === BOARD_SIZE) {
      let crossCount:number = 0;
      for(let i = 0 ; i < BOARD_SIZE; i++) {
        if (this.bingoBoard.bingoCells[i][BOARD_SIZE - i - 1].isClicked) {
          crossCount++;
        }
      }
      if (crossCount === BOARD_SIZE) {
        this.bingoBoard.bingoLines.push(
          {
            type: BINGO_TYPE.CROSS,
            num: 2
          }
        )
      }
    }
  }
}

export default BingoStore;