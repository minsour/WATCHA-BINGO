import * as React from 'react';
import Layout from '../../layouts/Layout';
import Board from 'src/components/Board';
import { PLAYER, GAME_MODE } from 'src/constants/bingo';
import GameManagerStore from 'src/stores/gameManagerStore';
import { inject, observer } from 'mobx-react';
import BingoLine from 'src/components/BingoList';
import { Link } from 'react-router-dom';
import './multi.css';

interface IMultiProps {
  gameManagerStore?: GameManagerStore
}

@inject('gameManagerStore')
@observer
export default class Multi extends React.Component<IMultiProps> {
  constructor(props: IMultiProps) {
    super(props);
    this.props.gameManagerStore!.initGame(GAME_MODE.MULTI);
  }
  render() {
    return (
      <Layout>
        <div className={'ButtonContainer'}>
          <Link to='/'>
            <button className={'Button'}>처음으로</button>
          </Link>
          <button
            className={'Button'} 
            onClick={this.props.gameManagerStore!.playGame}
          >
            {this.props.gameManagerStore!.isPlaying
             ? '게임 재시작'
             : '게임 시작'}
          </button>
        </div>
        <div className={'BoardContainer'}>
          <div className={'PlayerOne'}>
            <BingoLine player={PLAYER.PLAYER_ONE}/>
            <Board player={PLAYER.PLAYER_ONE}/>
          </div>
          <div className={'PlayerTwo'}>
            <BingoLine player={PLAYER.PLAYER_TWO}/>
            <Board player={PLAYER.PLAYER_TWO}/>
          </div>
        </div>
      </Layout>
    );
  }
}