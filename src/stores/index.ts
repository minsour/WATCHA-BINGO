import GameManagerStore from './gameManagerStore';

export class RootStore {
  gameManagerStore: GameManagerStore
  
  constructor() {
    this.gameManagerStore = new GameManagerStore();
  }
}