import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { PLAYER, BINGO_TYPE } from 'src/constants/bingo';
import GameManagerStore from 'src/stores/gameManagerStore';
import './bingoList.css';

interface IBingoListProps {
  gameManagerStore?: GameManagerStore
  player: PLAYER
}

@inject('gameManagerStore')
@observer
export default class BingoLine extends React.Component<IBingoListProps> {
  render() {
    return (
      <div className={'BingoList'}>
        {this.props.gameManagerStore!.isPlaying
          && <h4>플레이어{this.props.player+1}의 완성 줄 목록</h4>}
        {this.props.gameManagerStore!.bingoStore[this.props.player].bingoBoard.bingoLines.map(bingo => {
          return (
            <h5 key={bingo.num + bingo.type*5}>
              {bingo.num}번째 {bingo.type === BINGO_TYPE.COL 
              ? '행' 
              : (bingo.type === BINGO_TYPE.ROW ? '열' : '대각선')}
            </h5>
        )})}
      </div>
    );
  }
}