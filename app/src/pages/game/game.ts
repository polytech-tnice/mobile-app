import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Game } from '../../_models/game';
import { Player } from '../../_models/player';
import { GameStateEnum } from '../../_models/gameState';
import { WindEffectGeneratorPage } from '../wind-effect-generator/wind-effect-generator';
import { Socket } from 'ng-socket-io';

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
  private socket: Socket;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.game = this.convertToGame(this.navParams.get('game'));
    this.socket = this.navParams.get('socketClient');
    this.socket.on('actionAddedSuccessfully', (obj) => console.log(obj));
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
