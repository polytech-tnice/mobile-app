import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Game } from '../../_models/game';
import { Player } from '../../_models/player';
import { GameStateEnum } from '../../_models/gameState';
import { Direction } from '../../_models/direction';
import { Socket } from 'ng-socket-io';
import { Converter } from '../../_helpers/Converter';
import { ActionPhaseEnum } from '../../_models/actions/action-phase-step';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { env } from '../../app/environment';
import { DirectionUtil } from '../../_models/direction-util';

/**
 * Generated class for the WindEffectGeneratorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wind-effect-generator',
  templateUrl: 'wind-effect-generator.html',
})
export class WindEffectGeneratorPage implements OnInit, OnDestroy {

  private game: Game;
  private speed: number;
  private direction: string;
  private availableDirections: string[] = [];
  private socket: Socket;

  private lastActionSubscription: Subscription;

  maxSpeed: number;
  minSpeed: number;
  disabledDirection: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private http: HttpClient) {
  }

  ionViewDidLoad() {
    
  }

  ngOnInit() {
    this.socket = this.navParams.get('socketClient');
    this.game = Converter.convertToGame(this.navParams.get('game'));
    this.speed = 0;
    this.direction = '';
    this.initializeDirectionsArray();
    this.socket.on('actionHasBeenAdded', () => this.successCallback());
    this.socket.on('stopActionCreation', () => this.navCtrl.pop());
    this.lastActionSubscription = this.http.get(`${env.baseUrl}:${env.port}/api/game/${this.game.name}/last_executed_action`).subscribe((obj: any) => {
      console.log(obj);
      const DEFAULT_MAX_SPEED = 100;
      const DEFAULT_MIN_SPEED = 0;
      if (obj.lastExecutedAction) {
        const DELTA: number = 15;
        const min: number = obj.lastExecutedAction.speed - DELTA;
        const max: number = obj.lastExecutedAction.speed + DELTA;
        this.minSpeed = (min < 0) ? 0 : min;
        this.maxSpeed = (max > 100) ? 100 : max;
        this.disabledDirection = DirectionUtil.directionLabel(DirectionUtil.opposite(DirectionUtil.direction(obj.lastExecutedAction.direction)));
      } else {
        this.minSpeed = DEFAULT_MIN_SPEED;
        this.maxSpeed = DEFAULT_MAX_SPEED;
        this.disabledDirection = '';
      }
    })
  }

  ngOnDestroy() {
    this.socket.removeListener('actionHasBeenAdded');
    this.socket.removeListener('stopActionCreation');
    this.lastActionSubscription.unsubscribe();
  }

  private initializeDirectionsArray(): void {
    for (let dir in Direction) {
      if (!isNaN(Number(dir))) {
        this.availableDirections.push(DirectionUtil.directionLabel(Number(dir)));
      }
    }
    //Object.keys(Direction).filter(key => this.availableDirections.push(Direction[key]));
    console.log(this.availableDirections);
  }

  public submit(): void {
    this.socket.emit('addWindEvent', {
      direction: this.direction,
      speed: this.speed,
      gameName: this.game.getName()
    });
  }

  private successCallback() {
    const successMsgToast = this.toastCtrl.create({
      message: `L'effet de vent a bien été pris en compte !`,
      duration: 3000,
    });
    successMsgToast.present();
    this.navCtrl.pop();
  }

}
