import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../_models/game';
import { Player } from '../../_models/player';
import { GameStateEnum } from '../../_models/gameState';
import { env } from '../../app/environment';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private games: Game[];
  private showGames: boolean = false;

  constructor(public navCtrl: NavController, private socket: Socket, private http: HttpClient) {

  }

  ionViewDidLoad() {
    // Initialize variables
    this.games = [];
    this.showGames = false;
    // Connect to websocket
    this.socket.connect();
    // Create games - mock
    this.socket.emit('initGame', { game_name: 'Game1', player1_name: 'John', player2_name: 'Jane' })
    this.socket.emit('initGame', { game_name: 'Game2', player1_name: 'Mark', player2_name: 'Eliott' })
    this.socket.emit('initGame', { game_name: 'Game3', player1_name: 'Jacques', player2_name: 'Yves' })
    this.socket.emit('initGame', { game_name: 'Game4', player1_name: 'Marie', player2_name: 'Erick' })
    
    this.socket.on('joinGameSuccessEvent', (obj) => this.navCtrl.push(GamePage, {game: obj, socketClient: this.socket}));
  }

  private searchGames(): void {
    this.games = [];
    this.showGames = true;
    this.http.get(`${env.baseUrl}:${env.port}/api/games`).subscribe((res: any) => {
      res.games.forEach((game: any) => {
        this.games.push(this.convertToGame(game));
      });
    });
  }

  private joinGame(game: Game): void {
    this.socket.emit('joinGameEvent', game)
  }

  private convertToGame(x: any): Game {
    const name: string = x.name;
    const players: Player[] = [];
    x.players.forEach((elt: any) => {
      const name: string = elt.name;
      const player: Player = new Player(name);
      players.push(player);
    });
    const state: GameStateEnum = this.convertToGameStateEnum(x.status);
    return new Game(name, players, state);
  }

  private convertToGameStateEnum(x: number): GameStateEnum {
    switch (x) {
      case 1: return GameStateEnum.InProgress;
      case 2: return GameStateEnum.Interupted;
      case 3: return GameStateEnum.Finished;
    }
  }

}
