import { Injectable } from '@angular/core';
import { WebSocketRequestInterface, WebSocketResponseInterface } from '../interfaces/web-socket.interface';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(
    public socket: Socket
  ) { }

  startTimer() {
    this.socket.emit('timer');
  }

  ping(data?: any) {
    this.socket.emit('ping');
  }

  resetTimer() {
    this.socket.emit('reset');
  }

  stopTimer() {
    this.socket.emit('stop');
  }
}
