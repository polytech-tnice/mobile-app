import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../_models/game';
import { Player } from '../../_models/player';
import { GameStateEnum } from '../../_models/gameState';

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
    this.socket.emit('initGame', JSON.stringify({ game_name: 'Game1', player1_name: 'John', player2_name: 'Jane' }))
    this.socket.emit('initGame', JSON.stringify({ game_name: 'Game2', player1_name: 'Mark', player2_name: 'Eliott' }))
    this.socket.emit('initGame', JSON.stringify({ game_name: 'Game3', player1_name: 'Jacques', player2_name: 'Yves' }))
    this.socket.emit('initGame', JSON.stringify({ game_name: 'Game4', player1_name: 'Marie', player2_name: 'Erick' }))
    //this.socket.on('sendingGamesEvent', this.updateGamesList);
  }

  private searchGames(): void {
    this.games = [];
    this.showGames = true;
    this.http.get('http://localhost:3000/api/games').subscribe((res: any) => {
      res.games.forEach((game: any) => {
        this.games.push(this.convertToGame(game));
      });
    });
  }

  private convertToGame(x: any): Game {
    const name: string = x.name;
    const players: Player[] = [];
    x.players.forEach((elt: any) => {
      const name: string = elt.name;
      const player: Player = new Player(name);
      players.push(player);
    });
    const state: GameStateEnum = this.convertToGameStateEnum(x.state);
    return new Game(name, players, state);
  }

  private convertToGameStateEnum(x: number): GameStateEnum {
    switch (x) {
      case 1: return GameStateEnum.InProgress;
      case 2: return GameStateEnum.Interupted;
      case 3: return GameStateEnum.Finished;
    }
  }

  /*private updateGamesList(param): void {
    //console.log(param.games);
    console.log(this.games);
    param.games.forEach((elt: any) => {
      this.games.push(elt.name);
    });
    console.log(this.games)
    /*param.games.forEach((game: any) => {
      this.games.push(game.name);
    });*/
  //}

  /*constructor(public navCtrl: NavController, private socket: Socket, private http: HttpClient) {
    this.socket.connect();
    this.socket.emit('authentification', 'mobileApp');
    this.socket.on('success', this.actionAddedCallback);
    this.socket.on('fail', this.errorCallback);
    this.socket.on('sendGamesList', this.updateGamesList)
    this.socket.on('initGameReceived', () => console.log('Game initialized: OK!'))
  }

  private actionAddedCallback(param): void {
    console.log(param)
    console.log('Action added!')
  }

  private errorCallback(param): void {
    console.log('Failed!')
  }

  private updateGamesList(param): void {
    console.log(param);
    console.log('received games list')
  }

  private sendWind(): void {
    this.socket.emit('addWind', JSON.stringify({game_name: 'Game1', speed: 100, direction: 'E'}))
  }

  private initGame(): void {
    this.socket.emit('initGame', JSON.stringify({game_name: 'Game1', player1_name: 'Player1', player2_name: 'Player2'}))
  }

  private findGames(): void {
    this.socket.emit('listGames');
  }*/

}
