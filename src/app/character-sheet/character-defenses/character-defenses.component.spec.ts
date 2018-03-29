import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterDefensesComponent} from './character-defenses.component';
import {By} from "@angular/platform-browser";
import {mockCharacter, mockDefense} from "../../shared/constants/testing-constants";
import {AttributeStrength} from "../../shared/attribute/attribute-strength.enum";
import {AttributeName} from "../../shared/attribute/attribute-name.enum";
import {ArmorType} from "../../shared/armor/armor-type.enum";
import {Armor} from "../../shared/armor/armor";
import {PhysicalDefenseType} from "../../shared/character/phsyical-defense/physical-defense-type.enum";

describe('CharacterDefensesComponent', () => {
  let component: CharacterDefensesComponent;
  let fixture: ComponentFixture<CharacterDefensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDefensesComponent]
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

  it('should have a label for active and passive defenses', () => {
    const ad = fixture.debugElement.query(By.css("#activeDefense")).nativeElement;
    expect(ad).toBeTruthy();
    const pd = fixture.debugElement.query(By.css("#passiveDefense")).nativeElement;
    expect(pd).toBeTruthy();
  });

  it('should be able to get a value for active defense', () => {
    component.updateDefenses();
    const ad = fixture.debugElement.query(By.css("#activeDefense ")).nativeElement;
    expect(ad.innerText).toContain(11);
    const pd = fixture.debugElement.query(By.css("#passiveDefense ")).nativeElement;
    expect(pd.innerText).toContain(10);
  });

  it('should be able to get active defense if they are wearing light or lighter armor and have epic quickenss', () => {
    component.character.assignAttributePoint(AttributeStrength.Epic, AttributeName.Quickness);
    component.updateDefenses();
    expect(component.getActiveDefenseValue()).toEqual(12);
  });

  it('should be able to get active defense if they are wearing caster armor and have epic self discipline', () => {
    component.character.assignAttributePoint(AttributeStrength.Epic, AttributeName.SelfDiscipline);
    component.character.physicalDefense.equipArmor(new Armor(ArmorType.CasterArmor));
    component.updateDefenses();
    expect(component.getActiveDefenseValue()).toEqual(14);
  });

  it('should be able to reflect an updated armor value in the UI', () => {
    component.character.physicalDefense.equipArmor(new Armor(ArmorType.LightArmor));
    component.character.assignAttributePoint(AttributeStrength.Epic, AttributeName.Quickness);
    component.updateDefenses();
    fixture.detectChanges();
    const ad = fixture.debugElement.query(By.css("#activeDefense ")).nativeElement;
    expect(ad.innerText).toContain(14);
  });

  it('should be able to show in the UI that a defense is passive then active then passive again', () => {
    let passiveList = fixture.debugElement.queryAll(By.css(".passiveList"));
    let activeList = fixture.debugElement.queryAll(By.css(".activeList"));
    expect(passiveList.length).toEqual(4);
    component.character.physicalDefense.moveToActive(PhysicalDefenseType.Missile);
    fixture.detectChanges();
    passiveList = fixture.debugElement.queryAll(By.css(".passiveList"));
    activeList = fixture.debugElement.queryAll(By.css(".activeList"));
    expect(passiveList.length).toEqual(3);
    expect(activeList[0].nativeElement.innerText).toContain(PhysicalDefenseType.Missile);
    component.character.physicalDefense.moveToPassive(PhysicalDefenseType.Missile);
    fixture.detectChanges();
    passiveList = fixture.debugElement.queryAll(By.css(".passiveList"));
    activeList = fixture.debugElement.queryAll(By.css(".activeList"));
    expect(passiveList.length).toEqual(4);
    expect(activeList.length).toEqual(0);

  });


});
