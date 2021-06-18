import { WebSocketResponseInterface } from './interfaces/web-socket.interface';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebSocketService } from './services/web-socket.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  timer;
  destroyed$ = new Subject();
  showSubmit: boolean;
  timerStartEvent: boolean;

  constructor(
    private webSocketService: WebSocketService
  ) {}

  ngOnInit() {
    this.connectToWebSocket();
  }

  startTimer() {
    if (!this.timerStartEvent) {
      this.webSocketService.startTimer();
      this.timerStartEvent = true;
    }
  }

  resetTimer() {
    this.webSocketService.resetTimer();
    this.timerStartEvent = false;
  }

  stopTimer() {
    this.webSocketService.stopTimer();
    this.timerStartEvent = false;
  }

  ping() {
    this.pingWebSocketConnection();
  }

  private connectToWebSocket() {
      this.webSocketService.socket.on('timer', (timerData: WebSocketResponseInterface) => {
        this.showSubmit = false;
        this.timer = moment("2015-01-01").startOf('day').seconds(timerData.timer).format('H:mm:ss');
      });

      this.webSocketService.socket.on('end', (timerData: WebSocketResponseInterface) => {
        this.showSubmit = true;
        this.timer = moment("2015-01-01").startOf('day').seconds(timerData.timer).format('H:mm:ss');
      });
  }

  private pingWebSocketConnection() {
    this.webSocketService.ping();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
