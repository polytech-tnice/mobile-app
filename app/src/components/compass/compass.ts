import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Direction } from '../../_models/direction';
import { WindEffectProvider } from '../../providers/wind-effect/wind-effect';
import { Subscription } from 'rxjs/Subscription';
import { DirectionUtil } from '../../_models/direction-util';
import { Point, PointUtil } from '../../_models/geometry/point';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the CompassComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'compass',
  templateUrl: 'compass.html'
})
export class CompassComponent implements OnInit, OnDestroy {

  private touchzone: any;

  public origin: Point = null;
  public destination: Point = null;

  private xOrigin: any;
  private yOrigin: any;

  private xDestination: any;
  private yDestination: any;

  //private direction: Direction;
  public label: string;

  @Input() direction: Direction;

  private directionSubscription: Subscription;

  constructor(private windEffectProvider: WindEffectProvider, private toastCtrl: ToastController) {

  }

  ngOnDestroy() {
    this.directionSubscription.unsubscribe();
  }

  ngOnInit() {
    this.directionSubscription = this.windEffectProvider.directionObservable$.subscribe((res: string) => {
      this.direction = DirectionUtil.direction(res);
    });
    this.touchzone = document.getElementById("compass");
    this.touchzone.addEventListener("touchstart", (event: any) => {
      event.preventDefault();
      this.xOrigin = event.touches[0].clientX;
      this.yOrigin = event.touches[0].clientY;
    }, false);
    this.touchzone.addEventListener("touchend", () => {
      this.origin = new Point(this.xOrigin, this.yOrigin);
      this.destination = new Point(this.xDestination, this.yDestination);
      const dir: Direction = PointUtil.computeDirection(this.origin, this.destination);
      
      const disabledDir = this.windEffectProvider.getDisabledDir();
      if (dir === DirectionUtil.direction(disabledDir)) {
        const successMsgToast = this.toastCtrl.create({
          message: `Vous ne pouvez pas changer de direction si brusquement !`,
          duration: 1500,
        });
        successMsgToast.present();
      } else {
        this.direction = dir;
        this.windEffectProvider.feedDirectionSubject(DirectionUtil.directionLabel(this.direction));
      }
      
    }, false);
    this.touchzone.addEventListener("touchmove", (event: any) => {
      event.preventDefault();
      this.xDestination = event.touches[0].clientX;
      this.yDestination = event.touches[0].clientY;
    }, false);
  }

}
