import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Game } from '../../_models/game';
import { Player } from '../../_models/player';
import { GameStateEnum } from '../../_models/gameState';
import { WindEffectGeneratorPage } from '../wind-effect-generator/wind-effect-generator';
import { Socket } from 'ng-socket-io';
import { Action } from '../../_models/actions/action';
import { WindAction } from '../../_models/actions/wind-action';
import { Direction } from '../../_models/direction';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  private game: Game;
  private actions: Action[];
  private socket: Socket;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.game = this.convertToGame(this.navParams.get('game'));
    this.actions = [];
    this.socket = this.navParams.get('socketClient');
    this.socket.on('actionAddedSuccessfully', (obj: any) => {
      const action: Action = this.convertToAction(obj);
      this.actions.push(action);
      console.log(this.actions);
    });
  }

  private convertToAction(x: any): Action {
    let action: Action;
    // When action type is 1 it means that it's a wind action
    if (x.action.actionType === 1) {
      action = this.convertToWindAction(x);
    }
    return action;
  }

  private convertToWindAction(x: any): WindAction {
    const creator: string = x.creator;
    const speed: number = x.action.speed;
    const direction: string = x.action.direction;
    return new WindAction(creator, speed, direction);
  }

  private convertToGame(x: any): Game {
    const name: string = x.name;
    const players: Player[] = [];
    x.players.forEach((elt: any) => {
      const name: string = elt.name;
      const player: Player = new Player(name);
      players.push(player);
    });
    const state: GameStateEnum = this.convertToGameStateEnum(x.status);
    return new Game(name, players, state);
  }

  private convertToGameStateEnum(x: number): GameStateEnum {
    switch (x) {
      case 1: return GameStateEnum.InProgress;
      case 2: return GameStateEnum.Interupted;
      case 3: return GameStateEnum.Finished;
    }
  }

  private navigateToWindEffectGeneratorPage(): void {
    this.navCtrl.push(WindEffectGeneratorPage, {game: this.game, socketClient: this.socket});
  }

}
