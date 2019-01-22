import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Game } from '../../_models/game';
import { Player } from '../../_models/player';
import { GameStateEnum } from '../../_models/gameState';
import { Direction } from '../../_models/direction';
import { Socket } from 'ng-socket-io';
import { Converter } from '../../_helpers/Converter';
import { ActionPhaseEnum } from '../../_models/actions/action-phase-step';

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
export class WindEffectGeneratorPage implements OnDestroy {

  private game: Game;
  private speed: number;
  private direction: string;
  private availableDirections: string[] = [];
  private socket: Socket;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.socket = this.navParams.get('socketClient');
    this.game = Converter.convertToGame(this.navParams.get('game'));
    this.speed = 0;
    this.direction = '';
    this.initializeDirectionsArray();
    this.socket.on('actionHasBeenAdded', () => this.successCallback());
    this.socket.on('stopActionCreation', () => this.navCtrl.pop());
  }

  ngOnDestroy() {
    console.log('destruction');
    this.socket.removeListener('actionHasBeenAdded');
    this.socket.removeListener('stopActionCreation');
  }

  private initializeDirectionsArray(): void {
    Object.keys(Direction).map(key => this.availableDirections.push(Direction[key]));
  }

  public submit(): void {
    this.socket.emit('addWindEvent', {
      direction: this.direction,
      speed: this.speed,
      gameName: this.game.getName()
    });
  }

  private successCallback() {
    const successMsgToast = this.toastCtrl.create({
      message: `L'effet de vent a bien été pris en compte !`,
      duration: 3000,
    });
    successMsgToast.present();
    this.navCtrl.pop();
  }

}
