import { Component, OnInit, OnDestroy } from '@angular/core';
import { Direction } from '../../_models/direction';
import { WindEffectProvider } from '../../providers/wind-effect/wind-effect';
import { Subscription } from 'rxjs/Subscription';
import { DirectionUtil } from '../../_models/direction-util';

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

  public direction: Direction;

  private directionSubscription: Subscription;

  constructor(private windEffectProvider: WindEffectProvider) {
    
  }

  ngOnDestroy() {
    this.directionSubscription.unsubscribe();
  }

  ngOnInit() {
    this.directionSubscription = this.windEffectProvider.directionObservable$.subscribe((dir: string) => {
      this.direction = DirectionUtil.direction(dir);
    });
  }

}
