import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSheetComponent} from './character-sheet.component';
import {SharedModule} from "../shared/shared.module";
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {mockCharacter} from "../shared/constants/testing-constants";
import {RaceType} from "../shared/character/race/race-type.enum";
import {Level} from "../shared/character/level.enum";
import {Character} from "../shared/character/character";
import {By} from "@angular/platform-browser";
import {InputComponent} from "../shared/ui/input/input.component";

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
    component.character.name = "Bob";
    expect(component.character).toEqual(mockCharacter());
    component.reloadCharacter(RaceType.Burman, Level.Two);
    expect(component.character).not.toEqual(mockCharacter());
    expect(component.character).toEqual(new Character("Bob", RaceType.Burman, Level.Two));
  });

  it('should be able to set character name via the input component', function () {
    expect(component.character.name).toBe("");
    const nameInput = fixture.debugElement.query(By.css("input#NameId")).nativeElement;
    nameInput.value = "Bob";
    nameInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.character.name).toBe("Bob");
  });
});
