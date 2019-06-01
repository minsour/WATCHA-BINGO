import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { PLAYER } from 'src/constants/bingo';
import GameManagerStore from 'src/stores/gameManagerStore';
import './cell.css';

interface ICellProps {
  gameManagerStore?: GameManagerStore
  x: number
  y: number
  player: PLAYER
}

@inject('gameManagerStore')
@observer
export default class Cell extends React.Component<ICellProps> {
  render() {
    return (
      <button className={this.props.gameManagerStore!.bingoStore[this.props.player].bingoBoard.bingoCells[this.props.x][this.props.y].isClicked 
          ? 'ClickedCell'
          : 'UnclickedCell'
        }
        onClick={() => {
          this.props.gameManagerStore!.clickBingoBoard(this.props.player, 
            this.props.gameManagerStore!.bingoStore[this.props.player].bingoBoard.bingoCells[this.props.x][this.props.y].value)
          }
        }
      >
        {this.props.gameManagerStore!.bingoStore[this.props.player].bingoBoard.bingoCells[this.props.x][this.props.y].value === 0 ?
         "":
        this.props.gameManagerStore!.bingoStore[this.props.player].bingoBoard.bingoCells[this.props.x][this.props.y].value}
      </button>
    );
  }
}