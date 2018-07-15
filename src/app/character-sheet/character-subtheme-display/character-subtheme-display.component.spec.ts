import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSubthemeDisplayComponent } from './character-subtheme-display.component';

describe('CharacterSubthemeDisplayComponent', () => {
  let component: CharacterSubthemeDisplayComponent;
  let fixture: ComponentFixture<CharacterSubthemeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSubthemeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSubthemeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
