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
export class ActionListComponent implements OnInit {

  @Input() actions: Action[];
  @Input() game: Game;
  @Input() socket: Socket;
  

  constructor() {
    
  }

  ngOnInit() {
    this.socket.on('changeActionState', (obj) => {
      console.log(`Ancien state: ${this.game.actionPhase} et nouveau ${Converter.convertToActionPhaseEnum(obj.actionState)}`);
      console.log(this.canVote())
      this.game.actionPhase = Converter.convertToActionPhaseEnum(obj.actionState);
      console.log(this.canVote())
    })
  }

  vote(): void {
    this.socket.emit('changeState');
  }

  canVote(): boolean {
    return this.game.actionPhase === ActionPhaseEnum.VOTE;
  }

}
