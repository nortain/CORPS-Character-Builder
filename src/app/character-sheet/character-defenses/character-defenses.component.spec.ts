import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDefensesComponent } from './character-defenses.component';
import {By} from "@angular/platform-browser";
import {mockCharacter, mockDefense} from "../../shared/constants/testing-constants";
import {AttributeStrength} from "../../shared/attribute/attribute-strength.enum";
import {AttributeName} from "../../shared/attribute/attribute-name.enum";

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
    component.character = mockCharacter();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a label for active and passive defenses',  () => {
    const ad = fixture.debugElement.query(By.css("#activeDefense")).nativeElement;
    expect(ad).toBeTruthy();
    const pd = fixture.debugElement.query(By.css("#passiveDefense")).nativeElement;
    expect(pd).toBeTruthy();
  });

  it('should be able to get a value for active defense', function () {
    component.updateDefenses();
    const ad = fixture.debugElement.query(By.css("#activeDefense ")).nativeElement;
    expect(ad.innerText).toContain(11);
    const pd = fixture.debugElement.query(By.css("#passiveDefense ")).nativeElement;
    expect(pd.innerText).toContain(10);
  });

  it('should be able to get active defense if they are wearing light or lighter armor and have epic quickenss', function () {
    component.character.assignAttributePoint(AttributeStrength.Epic, AttributeName.Quickness);
    component.updateDefenses();
    expect(component.getActiveDefenseValue()).toEqual(12);
  });




});
