import { Component, Input, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('action') actionComponent: ElementRef;

  actions: Action[] = [];
  @Input() game: Game;
  @Input() socket: Socket;

  private voteSubscription: Subscription;
  private actionListSubscription: Subscription;
  public displayedAction: Action;
  private droppedAction: Action = null;
  public displayedActionIndex: number;

  public hasDropVote: boolean;

  private boxDOMElement: any;
  private clickTimer = null;

  // MVP - mock the area of the vote box with config JSON
  private box: any = {
    y_min: 415,
    y_max: 590,
    x_min: 35,
    x_max: 335
  }


  constructor(private http: HttpClient, public toastCtrl: ToastController) {

  }

  ngOnInit() {

    this.actionListSubscription = this.http.get(`${env.baseUrl}:${env.port}/api/game/${this.game.name}/actions`).subscribe((obj: any) => {
      obj.actions.forEach((data: any) => {
        this.actions.push(Converter.convertToAction(data));
      });
      if (this.actions.length > 0) {
        this.displayedActionIndex = 0;
        this.displayedAction = this.actions[this.displayedActionIndex];
      }
    });

    this.socket.on('actionAddedSuccessfully', (obj: any) => {
      const action: Action = Converter.convertToAction(obj.action);
      this.actions.push(action);
      if (this.actions.length > 0) {
        this.displayedActionIndex = 0;
        this.displayedAction = this.actions[this.displayedActionIndex];
      }

    });

    this.socket.on('clearActionList', () => this.actions.length = 0);

    this.hasDropVote = false;
    if (this.actions.length > 0) {
      this.boxDOMElement = document.getElementById('container-for-votes');
      this.boxDOMElement.addEventListener("touchstart", () => {
        if (this.clickTimer == null) {
          this.clickTimer = setTimeout(function () {
            this.clickTimer = null;
            // Single tap ...
            // IDEA display message to have informations on the current vote
  
          }, 500)
        } else {
          clearTimeout(this.clickTimer);
          this.clickTimer = null;
          // Double tap
          if (this.droppedAction === null) {
            this.presentToast(`Pas de vote dans l'urne...`)
          } else {
            this.vote(this.droppedAction);
          }
        }
      });
    }
    

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


  getPrevAction(): void {
    const prevIndex = this.displayedActionIndex - 1;
    this.displayedActionIndex = (prevIndex < 0) ? this.actions.length - 1 : this.displayedActionIndex - 1;
    this.displayedAction = this.actions[this.displayedActionIndex];
  }

  getNextAction() {
    const nextIndex = this.displayedActionIndex + 1;
    this.displayedActionIndex = (nextIndex > this.actions.length - 1) ? 0 : this.displayedActionIndex + 1;
    this.displayedAction = this.actions[this.displayedActionIndex];
  }

  moveActionInBox(ev) {
    if (this.canDropVote(ev)) {
      this.hasDropVote = true;
      this.droppedAction = this.displayedAction;
      this.presentToast('Votre vote a bien été déposé, double-tap dans le rectangle noir pour confirmer le vote !');
    } else {
      this.presentToast('Vous devez déposer le vote dans le rectangle noir !');
    }

  }

  cancelVote() {
    this.hasDropVote = false;
    this.droppedAction = null;
  }

  private canDropVote(dropPixel: any): boolean {
    return (!(dropPixel.x < this.box.x_min || dropPixel.x > this.box.x_max || dropPixel.y < this.box.y_min || dropPixel.y > this.box.y_max));
  }


}
