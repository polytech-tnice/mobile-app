import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Game } from '../../_models/game';
import { WindEffectGeneratorPage } from '../wind-effect-generator/wind-effect-generator';
import { Socket } from 'ng-socket-io';
import { Action } from '../../_models/actions/action';
import { Converter } from '../../_helpers/Converter';
import { ActionPhaseEnum } from '../../_models/actions/action-phase-step';
import { GameStateEnum } from '../../_models/gameState';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  private game: Game;
  private actions: Action[];
  private socket: Socket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.get('game');
    this.actions = [];
    this.socket = this.navParams.get('socketClient');
    this.socket.on('actionAddedSuccessfully', (obj: any) => {
      const action: Action = Converter.convertToAction(obj);
      this.actions.push(action);
    });
  }

  public navigateToWindEffectGeneratorPage(): void {
    if (this.game.status !== GameStateEnum.Interupted) {
      this.presentToast('La partie est en cours, veuillez patienter...');
      return;
    }
    this.navCtrl.push(WindEffectGeneratorPage, {game: this.game, socketClient: this.socket});
  }

  private presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
