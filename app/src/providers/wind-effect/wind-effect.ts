import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WindForceEnum } from '../../_models/actions/wind-force';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the WindEffectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WindEffectProvider {

  private speed: number;

  private _speedSubject: Subject<number> = new Subject<number>();
  public speedObservable$: Observable<number> = this._speedSubject.asObservable();

  private _directionSubject: Subject<string> = new Subject<string>();
  public directionObservable$: Observable<string> = this._directionSubject.asObservable();

  constructor(public http: HttpClient) {
  }

  public feedSpeedSubject(speed: number): void {
    this._speedSubject.next(speed);
  }

  public feedDirectionSubject(direction: string): void {
    this._directionSubject.next(direction);
  }

  public setCurrentSpeed(speed: number): void {
    this.speed = speed;
  }

  public getCurrentSpeed(): number {
    return this.speed;
  }

}
