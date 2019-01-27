import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Game } from '../../_models/game';
import { WindEffectGeneratorPage } from '../wind-effect-generator/wind-effect-generator';
import { Socket } from 'ng-socket-io';
import { Converter } from '../../_helpers/Converter';
import { ActionPhaseEnum } from '../../_models/actions/action-phase-step';
import { GameStateEnum } from '../../_models/gameState';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { env } from '../../app/environment';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage implements OnDestroy {

  private game: Game;
  private socket: Socket;
  private subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private http: HttpClient) {
  }

  ionViewDidLoad() {

    this.game = this.navParams.get('game');
    this.socket = this.navParams.get('socketClient');

    this.subscription = this.http.get(`${env.baseUrl}:${env.port}/api/game/${this.game.name}/state`).subscribe((obj: any) => {
      this.game.actionPhase = Converter.convertToActionPhaseEnum(obj.currentStep);
    });

    this.socket.on('updateScore_success', (obj: any) => {
      this.game.actionPhase = Converter.convertToActionPhaseEnum(obj.params.updatedGame.step);
      this.presentToast('Le point est fini, vous pouvez ajouter des actions!');
    });

    this.socket.on('actionStepUpdated', (obj) => {
      this.updateActionPhaseStep(obj)
    });

    this.socket.on('updateGameState', (obj: any) => this.game.status = Converter.convertToGameStateEnum(obj.state));

    this.socket.on('resultOfVoteEvent', (obj: any) => {
      this.game.lastExecutedAction = Converter.convertToAction(obj.action);
      this.presentToast(`Action pour le prochain point: vent - ${obj.action.direction} - ${obj.action.speed}km/h`);
    });

    this.socket.on('fail_resultOfVoteEvent', () => {
      this.game.lastExecutedAction = null;
      this.presentToast(`Aucune action pour cette fois... `);
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  updateActionPhaseStep(obj: any): any {
    this.game.actionPhase = Converter.convertToActionPhaseEnum(obj.step);
  }

  updateGameStatus(obj: any): any {
    this.game.status = Converter.convertToGameStateEnum(obj.status);
    this.game.actionPhase = ActionPhaseEnum.CREATION;
    this.presentToast('Le point est fini, vous pouvez ajouter des actions!');
  }

  public navigateToWindEffectGeneratorPage(): void {
    
    // Check conditions about phase step in progress...
    if (this.game.actionPhase === ActionPhaseEnum.WAITING) {
      this.presentToast('La partie est en cours, veuillez patienter...');
      return;
    } else if (this.game.actionPhase !== ActionPhaseEnum.CREATION) {
      this.presentToast(`Vous ne pouvez plus ajouter d'actions...`);
      return;
    } else {
      // Check that the user is not the one who "won" the last action phase
      const userSocketID = this.socket.ioSocket.id;
      const creatorIDForLastExecutedAction = (this.game.lastExecutedAction) ? this.game.lastExecutedAction.getCreator() : '';
      if (userSocketID === creatorIDForLastExecutedAction) {
        this.presentToast(`Votre avez gagné la dernière phase d'action, laissez une chance aux autres joueurs pour ce tour !`);
        return;
      }
      this.navCtrl.push(WindEffectGeneratorPage, { game: this.game, socketClient: this.socket });
    }
    
    // Only for test...
    //this.navCtrl.push(WindEffectGeneratorPage, { game: this.game, socketClient: this.socket });
  }

  private presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  startActionPhase() {
    this.socket.emit('updateScore', { game_name: 'Game1' });
  }

}
