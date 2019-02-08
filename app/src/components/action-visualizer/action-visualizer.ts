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
  @Input() socketID: any;
  @Input() displayVoteCount: boolean;

  @Output() actionDropped = new EventEmitter();

  private thecardelement: any;
  private lastX: number;
  private lastY: number;
  private startX: number;
  private startY: number;

  constructor() {
  }

  ngOnInit() {
    this.thecardelement = document.getElementById('move-icon');
    this.thecardelement.addEventListener('touchstart', (ev) => {
      ev.preventDefault();
      this.startX = ev.touches[0].clientX;
      this.startY = ev.touches[0].clientY;
    }, false);
    this.thecardelement.addEventListener("touchend", () => {
      const deltaX = this.lastX - this.startX;
      const deltaY = this.lastY - this.startY;
      if (deltaX < deltaY) this.actionDropped.emit({x: this.lastX, y: this.lastY})
    }, false);
    this.thecardelement.addEventListener("touchcancel", () => console.log('touchcancel'), false);
    this.thecardelement.addEventListener("touchleave", () => console.log('touchleave'), false);
    this.thecardelement.addEventListener("touchmove", (ev: any) => {
      ev.preventDefault();
      this.lastX = ev.touches[0].clientX;
      this.lastY = ev.touches[0].clientY;
    }, false);
  }



}
