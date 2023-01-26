import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingGameComponent } from './ending-game.component';

describe('EndingGameComponent', () => {
  let component: EndingGameComponent;
  let fixture: ComponentFixture<EndingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndingGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
