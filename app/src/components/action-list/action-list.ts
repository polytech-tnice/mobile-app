import { Component, Input, OnInit } from '@angular/core';
import { Action } from '../../_models/actions/action';
import { Game } from '../../_models/game';
import { Socket } from 'ng-socket-io';
import { Converter } from '../../_helpers/Converter';
import { ActionPhaseEnum } from '../../_models/actions/action-phase-step';

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
export class ActionListComponent {

  @Input() actions: Action[];
  @Input() game: Game;
  @Input() socket: Socket;
  

  constructor() {
    
  }

  vote(): void {
    console.log('Je vote pour cette action!');
  }

  canVote(): boolean {
    return this.game.actionPhase === ActionPhaseEnum.VOTE;
  }

}
