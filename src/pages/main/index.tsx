import * as React from 'react';
import GameManagerStore from 'src/stores/gameManagerStore';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Layout from 'src/layouts/Layout';
import './main.css';

interface IMainProps {
  gameManagerStore?: GameManagerStore
}

@inject('gameManagerStore')
@observer
export default class Main extends React.Component<IMainProps> {
  render() {
    return (
      <Layout>
        <div className={'ButtonContainer'}>
          <Link to='/single'>
            <button className={'Button'}>1인 플레이</button>
          </Link>
          <Link to='/multi'>
            <button className={'Button'}>2인 플레이</button>
          </Link>
        </div>
      </Layout>
    );
  }
}