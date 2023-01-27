import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  connection$: WebSocketSubject<any>;

  constructor() { }

  connect(id: string): Observable<any> {
    this.connection$ = webSocket({
      url: environment.websocketUrl + id,
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
