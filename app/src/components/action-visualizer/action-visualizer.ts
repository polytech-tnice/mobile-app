import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Action } from '../../_models/actions/action';

/**
 * Generated class for the ActionVisualizerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'action-visualizer',
  templateUrl: 'action-visualizer.html'
})
export class ActionVisualizerComponent implements OnInit {

  @Input() action: Action;
  @Input() title: string;

  constructor() {
    
  }

  ngOnInit() {
    //console.log(this.action);
  }

}
