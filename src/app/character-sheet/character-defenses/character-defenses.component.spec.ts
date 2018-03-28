import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDefensesComponent } from './character-defenses.component';
import {By} from "@angular/platform-browser";
import {mockCharacter, mockDefense} from "../../shared/constants/testing-constants";

describe('CharacterDefensesComponent', () => {
  let component: CharacterDefensesComponent;
  let fixture: ComponentFixture<CharacterDefensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDefensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDefensesComponent);
    component = fixture.componentInstance;
    component.defense = mockDefense();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a label for active and passive defenses',  () => {
    const ad = fixture.debugElement.query(By.css("#activeDefense")).nativeElement;
    expect(ad).toBeTruthy();
  });




});
