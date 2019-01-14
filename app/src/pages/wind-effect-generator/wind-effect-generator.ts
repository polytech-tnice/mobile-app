import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Game } from '../../_models/game';
import { Player } from '../../_models/player';
import { GameStateEnum } from '../../_models/gameState';
import { Direction } from '../../_models/direction';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the WindEffectGeneratorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wind-effect-generator',
  templateUrl: 'wind-effect-generator.html',
})
export class WindEffectGeneratorPage {

  private game: Game;
  private speed: number;
  private direction: string;
  private availableDirections: string[] = [];
  private socket: Socket;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('socketClient'));
    this.socket = this.navParams.get('socketClient');
    this.game = this.convertToGame(this.navParams.get('game'));
    this.speed = 0;
    this.direction = '';
    this.initializeDirectionsArray();
    this.socket.on('actionAddedSuccessfully', () => {
      const successMsgToast = this.toastCtrl.create({
        message: `L'effet de vent a bien été pris en compte !`,
        duration: 3000,
      });
      successMsgToast.present();
    });
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

  private initializeDirectionsArray(): void {
    Object.keys(Direction).map(key => this.availableDirections.push(Direction[key]));
  }

  private submit(): void {
    console.log(`Submit form: speed = ${this.speed} et direction = ${this.direction} pour la partie ${this.game.getName()}`)
    this.socket.emit('addWindEvent', {
      direction: this.direction,
      speed: this.speed,
      gameName: this.game.getName()
    });
  }

}
