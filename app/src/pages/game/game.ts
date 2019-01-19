import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Game } from '../../_models/game';
import { WindEffectGeneratorPage } from '../wind-effect-generator/wind-effect-generator';
import { Socket } from 'ng-socket-io';
import { Action } from '../../_models/actions/action';
import { Converter } from '../../_helpers/Converter';
import { ActionPhaseEnum } from '../../_models/actions/action-phase-step';
import { GameStateEnum } from '../../_models/gameState';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  private game: Game;
  private actions: Action[];
  private socket: Socket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private http: HttpClient) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.get('game');
    this.socket = this.navParams.get('socketClient');
    this.actions = [];

    this.socket.on('actionAddedSuccessfully', (obj: any) => {
      const action: Action = Converter.convertToAction(obj);
      this.actions.push(action);
    });

    // TO BE REMOVED... Here for testing
    this.socket.emit('updateScore', {game_name: 'Game1'});

    this.socket.on('updateScore_success', (obj) => this.updateGameStatus(obj.params.updatedGame))
  }

  updateGameStatus(obj: any): any {
    this.game.status = Converter.convertToGameStateEnum(obj.status);
    this.game.actionPhase = ActionPhaseEnum.CREATION;
    this.presentToast('Le point est fini, vous pouvez ajouter des actions!');
  }

  public navigateToWindEffectGeneratorPage(): void {
    if ((this.game.status !== GameStateEnum.Interupted && this.game.actionPhase === ActionPhaseEnum.CREATION)) {
      this.presentToast('La partie est en cours, veuillez patienter...');
      return;
    } else {
      this.navCtrl.push(WindEffectGeneratorPage, {game: this.game, socketClient: this.socket});
    }
  }

  private presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
