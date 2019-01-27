import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Point, PointUtil } from '../../_models/geometry/point';
import { Direction } from '../../_models/direction';
import { DirectionUtil } from '../../_models/direction-util';
import { WindEffectProvider } from '../../providers/wind-effect/wind-effect';

/**
 * Generated class for the TactileWindGeneratorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tactile-wind-generator',
  templateUrl: 'tactile-wind-generator.html'
})
export class TactileWindGeneratorComponent implements OnInit {


  private touchzone: any;

  public origin: Point = null;
  public destination: Point = null;

  private xOrigin: any;
  private yOrigin: any;

  private xDestination: any;
  private yDestination: any;

  private direction: Direction;
  public label: string;

  constructor(private windEffectProvider: WindEffectProvider) {

  }

  ngOnInit() {
    this.touchzone = document.getElementById("touchzone");
    this.touchzone.addEventListener("touchstart", (event: any) => {
      event.preventDefault();
      this.xOrigin = event.touches[0].clientX;
      this.yOrigin = event.touches[0].clientY;
    }, false);
    this.touchzone.addEventListener("touchend", () => {
      this.origin = new Point(this.xOrigin, this.yOrigin);
      this.destination = new Point(this.xDestination, this.yDestination);

      // For the direction part...
      const dir: Direction = PointUtil.computeDirection(this.origin, this.destination);
      this.direction = dir;
      this.windEffectProvider.feedDirectionSubject(DirectionUtil.directionLabel(this.direction));
      // End

      // For the speed part... do swipes to the right to add wind, and to the left to remove wind (ex: 1 tick = 5km/h)
      const speedDif: number = PointUtil.computeSpeed(this.origin, this.destination);
      this.windEffectProvider.feedSpeedSubject(speedDif);

    }, false);
    this.touchzone.addEventListener("touchmove", (event: any) => {
      event.preventDefault();
      this.xDestination = event.touches[0].clientX;
      this.yDestination = event.touches[0].clientY;
    }, false);


  }

}
