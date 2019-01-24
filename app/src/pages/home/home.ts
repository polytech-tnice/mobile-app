import { Component, OnDestroy } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../_models/game';
import { env } from '../../app/environment';
import { GamePage } from '../game/game';
import { Converter } from '../../_helpers/Converter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private games: Game[];
  public showGames: boolean = false;

  constructor(public navCtrl: NavController, private socket: Socket, private http: HttpClient, private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    // Initialize variables
    this.games = [];
    this.showGames = false;
    // Connect to websocket
    this.socket.connect();
    this.socket.emit('authentication', {name: 'mobileApp'});
    
    this.socket.on('joinGameEvent_success', (obj: any) => this.navCtrl.push(GamePage, {game: obj.game, socketClient: this.socket}));

  }

  public searchGames(): void {
    this.games = [];
    this.showGames = true;
    this.http.get(`${env.baseUrl}:${env.port}/api/games`).subscribe((res: any) => {
      res.games.forEach((game: any) => {
        this.games.push(Converter.convertToGame(game));
      });
    });
  }

  public joinGame(game: Game): void {
    this.socket.emit('joinGameEvent', game)
  }

  // MOCK
  startGame() {
    this.socket.emit('initGame', { game_name: 'Game1', player1_name: 'John', player2_name: 'Jane' });
    this.socket.emit('launchGame', {name: 'Game1'});
  }

}
