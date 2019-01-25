import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { WindEffectProvider } from '../../providers/wind-effect/wind-effect';
import { Subscription } from 'rxjs/Subscription';
import { WindForceEnum, WindForceUtil } from '../../_models/actions/wind-force';

/**
 * Generated class for the WindsockComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'windsock',
  templateUrl: 'windsock.html'
})
export class WindsockComponent implements AfterViewInit, OnInit, OnDestroy {

  canvas: any;
  context: any;
  windSpeedSubscription: Subscription;

  constructor(private windEffectService: WindEffectProvider) {
    
  }

  ngOnInit(): void {
    this.windSpeedSubscription = this.windEffectService.speedObservable$.subscribe((speed: number) => {
      this.updateCanvas(speed);
    });
  }

  ngOnDestroy(): void {
    this.windSpeedSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('windsock');
    this.context = this.canvas.getContext('2d');
    const speed = this.windEffectService.getCurrentSpeed();
    this.updateCanvas(speed);
  }

  private updateCanvas(speed: number): void {
    if (speed >= 0 && speed < 10) {
      this.closeToZeroWindsock();
    } else if (speed >= 10 && speed < 35) {
      this.weakWindsock();
    } else if (speed >= 35 && speed < 70) {
      this.lowerWindsock();
    } else {
      this.upperWindsock();
    }
  }

  private lowerWindsock(): void {
    this.drawBackground();
    this.drawMediumForceFlag();
  }

  private initializeWindsock(): void {
    this.drawBackground();
    this.drawFullForceFlag();

  }

  private upperWindsock() {
    this.drawBackground();
    this.drawFullForceFlag();
  }

  private weakWindsock() {
    this.drawBackground();
    this.drawLowForceFlag();
  }

  private closeToZeroWindsock() {
    this.drawBackground();
    this.drawCloseToZeroFlag();
  }

  private drawCloseToZeroFlag(): any {
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(24, 25, 30, 30);    
    this.context.fillStyle = 'rgb(255, 255, 255)'; // white
    this.context.fillRect(38, 39, 25, 25);
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(45, 62, 20, 20);
    this.context.fillStyle = 'rgb(255, 255, 255)'; // white
    this.context.fillRect(48, 82, 15, 15);
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(51, 97, 12, 12);
  }

  private drawLowForceFlag(): any {
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(75, 77, 12, 12);
    this.context.fillStyle = 'rgb(255, 255, 255)'; // white
    this.context.fillRect(66, 67, 15, 15);
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(56, 57, 20, 20);
    this.context.fillStyle = 'rgb(255, 255, 255)'; // white
    this.context.fillRect(41, 42, 25, 25);
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(24, 25, 30, 30);
  }

  private drawMediumForceFlag(): void {
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(24, 25, 30, 30);
    this.context.fillStyle = 'rgb(255, 255, 255)'; // white
    this.context.fillRect(54, 36, 25, 25);
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(79, 46, 20, 20);
    this.context.fillStyle = 'rgb(255, 255, 255)'; // white
    this.context.fillRect(99, 55, 15, 15);
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(114, 63, 12, 10);
  }

  private drawFullForceFlag(): void {
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(24, 25, 30, 30);
    this.context.fillStyle = 'rgb(255, 255, 255)'; // white
    this.context.fillRect(54, 28, 25, 25);
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(79, 31, 20, 20);
    this.context.fillStyle = 'rgb(255, 255, 255)'; // white
    this.context.fillRect(99, 34, 15, 15);
    this.context.fillStyle = 'rgb(210, 12, 30)'; // red
    this.context.fillRect(114, 37, 12, 10);
  }

  private drawBackground(): void {
    // Sky
    this.context.fillStyle = 'rgb(125, 200, 232)';
    this.context.fillRect(0, 0, 150, 120);
    // Grass
    this.context.fillStyle = 'rgb(21, 160, 36)';
    this.context.fillRect(0, 120, 150, 30);
    // Windsock stick
    this.context.fillStyle = 'rgb(64, 50, 34)';
    this.context.fillRect(20, 20, 5, 110);
    // Windsock flag attach
    this.context.fillStyle = 'rgb(0,0,0)';
    this.context.fillRect(24, 30, 10, 2);
    this.context.fillRect(24, 50, 10, 2);
  }

}
