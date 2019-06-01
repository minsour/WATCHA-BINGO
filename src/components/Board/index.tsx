import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { PLAYER, BOARD_SIZE } from 'src/constants/bingo';
import GameManagerStore from 'src/stores/gameManagerStore';
import Cell from '../Cell';
import './board.css';

interface IBoardProps {
  gameManagerStore?: GameManagerStore
  player: PLAYER
}

@inject('gameManagerStore')
@observer
export default class Board extends React.Component<IBoardProps> {
  render() {
    return (
      <div className={'Board'}>
        {this.props.gameManagerStore!.bingoStore[this.props.player].bingoBoard.bingoLines}
          
        {this.props.gameManagerStore!.bingoStore[this.props.player].bingoBoard.bingoCells.map(row => {
          return row.map(cell => {
            return <Cell
              key={cell.x * BOARD_SIZE + cell.y}
              player={this.props.player} 
              x={cell.x} 
              y={cell.y} 
             />
          })
        })}
      </div>
    );
  }
}