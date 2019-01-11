import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private message: string = "J'aime les sushis!";

  constructor(public navCtrl: NavController, private socket: Socket) {
    this.socket.on('chat message', (msg) => {
      console.log(`Message sent: ${msg}!`)
    })
  }

  private talk(): void {
    this.socket.connect()
    this.socket.emit('chat message', {msg: this.message, device: 'smartphone'})
  }

}
