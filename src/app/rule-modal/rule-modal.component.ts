import { Component } from '@angular/core';

@Component({
  selector: 'app-rule-modal',
  templateUrl: './rule-modal.component.html',
  styleUrls: ['./rule-modal.component.css']
})
export class RuleModalComponent {

  isActive : boolean = false;

  toogleModal() {
    this.isActive = !this.isActive;
  }

}
