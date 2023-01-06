import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  connection$: WebSocketSubject<any>;

  constructor() { }

  connect(id: string): Observable<any> {
    this.connection$ = webSocket({
      url: 'ws://localhost:8080/websocket/games/' + id,
      deserializer: ({data}) => data,
      serializer: ({data}) => data,
    });
    return this.connection$;
  }

  send(data: any): void {
    if (this.connection$) {
      this.connection$.next(data);
    } else {
      console.log('Did not send data, unable to open connection');
    }
  }
}
