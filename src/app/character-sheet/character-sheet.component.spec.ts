import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSheetComponent} from './character-sheet.component';
import {SharedModule} from "../shared/shared.module";
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {mockCharacter} from "../shared/constants/testing-constants";
import {RaceType} from "../shared/character/race/race-type.enum";
import {Level} from "../shared/character/level.enum";
import {Character} from "../shared/character/character";

describe('CharacterSheetComponent', () => {
  let component: CharacterSheetComponent;
  let fixture: ComponentFixture<CharacterSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CharacterSheetComponent],
      providers: [NgbDropdownConfig]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to reload a character', () => {
    expect(component.character).toEqual(mockCharacter());
    component.reloadCharacter(RaceType.Burman, Level.Two);
    expect(component.character).not.toEqual(mockCharacter);
    expect(component.character).toEqual(new Character("Bob", RaceType.Burman, Level.Two));
  });
});
