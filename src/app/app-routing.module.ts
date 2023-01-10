import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';
import { PreparingGameComponent } from './game/preparingGame.component';

const routes: Routes = [
  {path: '', component: StartpageComponent},
  {path: 'games/:id/player/:playerName', component: PreparingGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
