import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ClipboardModule } from 'ngx-clipboard';
import { StartpageComponent } from './startpage/startpage.component';
import { HttpClientModule } from '@angular/common/http';
import { PreparingGameComponent } from './game/preparing-game/preparingGame.component';
import { GameComponent } from './game/game.component';
import { RunningGameComponent } from './game/running-game/running-game.component';
import { RuleModalComponent } from './rule-modal/rule-modal.component';
import { EndingGameComponent } from './game/ending-game/ending-game.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    StartpageComponent, 
    PreparingGameComponent, 
    GameComponent, 
    RunningGameComponent, 
    RuleModalComponent, 
    EndingGameComponent, ErrorPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ClipboardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
