import * as React from 'react';
import './layout.css';
import Header from '../../components/Header';

interface ILayoutProps {
  children?: JSX.Element | JSX.Element[]
}

export default class Layout extends React.Component<ILayoutProps> {
  render() {
    return (
      <div className={'Container'}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}