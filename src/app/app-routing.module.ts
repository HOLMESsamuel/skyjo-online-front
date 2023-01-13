import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {path: '', component: StartpageComponent},
  {path: 'games/:id/player/:playerName', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
