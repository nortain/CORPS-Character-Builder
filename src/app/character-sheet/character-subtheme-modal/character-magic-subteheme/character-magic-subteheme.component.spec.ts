import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterMagicSubtehemeComponent } from './character-magic-subteheme.component';

describe('CharacterMagicSubtehemeComponent', () => {
  let component: CharacterMagicSubtehemeComponent;
  let fixture: ComponentFixture<CharacterMagicSubtehemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterMagicSubtehemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterMagicSubtehemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
