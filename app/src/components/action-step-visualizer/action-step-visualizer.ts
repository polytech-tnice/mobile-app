import { Component, Input, OnInit } from '@angular/core';
import { ActionPhaseEnum } from '../../_models/actions/action-phase-step';
import { Socket } from 'ng-socket-io';
import { Converter } from '../../_helpers/Converter';
import { ActionStepHelper } from '../../_helpers/ActionStep';

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

  @Input() step: ActionPhaseEnum;
  @Input() stepLabel: string;
  stepDuration: number;
  @Input() socket: Socket;

  private timer: any;
  private intervalID: any

  constructor() {
    
  }

  ngOnInit() {
    this.socket.on('actionStepUpdated', (obj) => {
      clearInterval(this.intervalID);
      this.stepDuration = ActionStepHelper.duration(Converter.convertToActionPhaseEnum(obj.step))
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
