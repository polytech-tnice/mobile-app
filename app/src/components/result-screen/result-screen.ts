import { Component, Input } from '@angular/core';
import { Action } from '../../_models/actions/action';

/**
 * Generated class for the ResultScreenComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'result-screen',
  templateUrl: 'result-screen.html'
})
export class ResultScreenComponent {

  @Input() action: Action;

  text: string;

  constructor() {
    console.log('Hello ResultScreenComponent Component');
    this.text = 'Hello World';
  }

}
