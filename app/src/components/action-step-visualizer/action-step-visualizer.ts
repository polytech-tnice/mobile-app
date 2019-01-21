import { Component, Input, OnInit } from '@angular/core';
import { ActionPhaseEnum } from '../../_models/actions/action-phase-step';
import { Socket } from 'ng-socket-io';
import { Converter } from '../../_helpers/Converter';
import { ActionStepHelper } from '../../_helpers/ActionStep';
import { Game } from '../../_models/game';
import { GameStateEnum } from '../../_models/gameState';

/**
 * Generated class for the ActionStepVisualizerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'action-step-visualizer',
  templateUrl: 'action-step-visualizer.html'
})
export class ActionStepVisualizerComponent implements OnInit {

  @Input() socket: Socket;

  step: ActionPhaseEnum;
  stepLabel: string;
  stepDuration: number;
  gameInProgress: boolean;

  private timer: any;
  private intervalID: any

  constructor() {
    
  }

  ngOnInit() {
    this.stepLabel = ActionStepHelper.actionStep(ActionPhaseEnum.WAITING);
    this.stepDuration = ActionStepHelper.duration(ActionPhaseEnum.WAITING);
    
    this.socket.on('actionStepUpdated', (obj: any) => {
      clearInterval(this.intervalID);
      this.step = Converter.convertToActionPhaseEnum(obj.step);
      this.stepLabel = ActionStepHelper.actionStep(this.step);
      if (this.step !== ActionPhaseEnum.WAITING) {
        this.stepDuration = ActionStepHelper.duration(this.step);
      } else {
        this.stepDuration = -1;
      }
      this.initTimer(this.stepDuration)
      this.startTimer()
    });
  }

  updateActionPhaseStep(obj: any): any {
    this.step = Converter.convertToActionPhaseEnum(obj.step);
    this.stepLabel = ActionStepHelper.actionStep(this.step);
    this.stepDuration = ActionStepHelper.duration(this.step);
  }

  initTimer(duration: number) {
    this.timer = {
      duration: duration,
      currentTime: duration,
      tick: 1000,
      min: 0
    }
  }

  startTimer() {
    this.intervalID = setInterval(() => this.decreaseTimerCount(), this.timer.tick);
  }

  decreaseTimerCount() {
    if (this.timer.currentTime === this.timer.min) {
      clearInterval(this.intervalID);
    } else {
      this.timer.currentTime -= 1;
    }
  }

}
