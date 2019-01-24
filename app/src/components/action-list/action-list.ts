import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Action } from '../../_models/actions/action';
import { Game } from '../../_models/game';
import { Socket } from 'ng-socket-io';
import { ActionPhaseEnum } from '../../_models/actions/action-phase-step';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { env } from '../../app/environment';
import { ToastController } from 'ionic-angular';
import { Converter } from '../../_helpers/Converter';

/**
 * Generated class for the ActionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'action-list',
  templateUrl: 'action-list.html'
})
export class ActionListComponent implements OnInit, OnDestroy {

  actions: Action[] = [];
  @Input() game: Game;
  @Input() socket: Socket;

  private voteSubscription: Subscription;
  private actionListSubscription: Subscription;
  

  constructor(private http: HttpClient, public toastCtrl: ToastController) {
    
  }

  ngOnInit() {

    this.actionListSubscription = this.http.get(`${env.baseUrl}:${env.port}/api/game/${this.game.name}/actions`).subscribe((obj: any) => {
      obj.actions.forEach((data: any) => {
        this.actions.push(Converter.convertToAction(data));
      });
    });

    this.socket.on('actionAddedSuccessfully', (obj: any) => {
      const action: Action = Converter.convertToAction(obj.action);
      this.actions.push(action);
    });

    this.socket.on('clearActionList', () => this.actions.length = 0);
  }

  ngOnDestroy() {
    if (this.voteSubscription) this.voteSubscription.unsubscribe();
    if (this.actionListSubscription) this.actionListSubscription.unsubscribe();
  }

  vote(action: Action): void {
    this.voteSubscription = this.http.get(`${env.baseUrl}:${env.port}/api/game/${this.game.name}/vote/action/${action.getCreator()}/user/${this.socket.ioSocket.id}`).subscribe((obj: any) => {
      this.presentToast(obj.desc);
    });
  }

  canVote(): boolean {
    return this.game.actionPhase === ActionPhaseEnum.VOTE;
  }

  presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
