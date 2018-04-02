import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterDefensesComponent} from './character-defenses.component';
import {By} from "@angular/platform-browser";
import {mockCharacter, mockDefense} from "../../shared/constants/testing-constants";
import {AttributeStrength} from "../../shared/attribute/attribute-strength.enum";
import {AttributeName} from "../../shared/attribute/attribute-name.enum";
import {ArmorType} from "../../shared/armor/armor-type.enum";
import {Armor} from "../../shared/armor/armor";
import {PhysicalDefenseType} from "../../shared/character/phsyical-defense/physical-defense-type.enum";
import {ThemeStrength} from "../../shared/theme-points/theme-strength.enum";
import {MagicDefenseType} from "../../shared/character/magic-defense/magic-defense-type.enum";

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
    const ad = fixture.debugElement.query(By.css("#activeDefense ")).nativeElement;
    expect(ad.innerText).toContain(11);
    const pd = fixture.debugElement.query(By.css("#passiveDefense ")).nativeElement;
    expect(pd.innerText).toContain(10);
  });

  it('should be able to get active defense if they are wearing light or lighter armor and have epic quickenss', () => {
    component.character.assignAttributePoint(AttributeStrength.Epic, AttributeName.Quickness);
    expect(component.getActiveDefenseValue()).toEqual(12);
  });

  it('should be able to get active defense if they are wearing caster armor and have epic self discipline', () => {
    component.character.assignAttributePoint(AttributeStrength.Epic, AttributeName.SelfDiscipline);
    component.character.physicalDefense.equipArmor(new Armor(ArmorType.CasterArmor));
    expect(component.getActiveDefenseValue()).toEqual(14);
  });

  it('should be able to reflect an updated armor value in the UI', () => {
    component.character.physicalDefense.equipArmor(new Armor(ArmorType.LightArmor));
    component.character.assignAttributePoint(AttributeStrength.Epic, AttributeName.Quickness);
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

  it('should display fortitude with the correct starting value', () => {
    const fort = fixture.debugElement.query(By.css("#fortitude")).nativeElement;
    expect(fort.innerText).toContain(10);
  });

  it('should display reflex with the correct starting value', () => {
    const ref = fixture.debugElement.query(By.css("#reflex")).nativeElement;
    expect(ref.innerText).toContain(10);
  });

  it('should display will with the correct starting value', () => {
    const will = fixture.debugElement.query(By.css("#will")).nativeElement;
    expect(will.innerText).toContain(10);
  });

  it('should reflect changes in fortitude when combat has the most theme points', () => {
    expect(component.getMagicDefensiveValue(MagicDefenseType.Fortitude)).toEqual(11);
    component.character.themePoints.combat.setStrength(ThemeStrength.Minor);
    expect(component.getMagicDefensiveValue(MagicDefenseType.Fortitude)).toEqual(12);
  });

  it('should be able to assign and remove abitrary bonuses from things like talents', () => {
    let ref = component.getMagicDefensiveValue(MagicDefenseType.Reflex);
    expect(ref).toEqual(11);
    component.assignMagicDefensiveBonus(MagicDefenseType.Reflex, "talent", 1);
    ref = component.getMagicDefensiveValue(MagicDefenseType.Reflex);
    expect(ref).toEqual(12);
    component.removeMagicDefensiveBonus(MagicDefenseType.Reflex, "bob");
    ref = component.getMagicDefensiveValue(MagicDefenseType.Reflex);
    expect(ref).toEqual(12, "trying to remove a bonus with wrong name");
    component.removeMagicDefensiveBonus(MagicDefenseType.Reflex, "talent");
    ref = component.getMagicDefensiveValue(MagicDefenseType.Reflex);
    expect(ref).toEqual(11, "trying to remove a bonus with the correct name");
  });

  it('should not change magic defense from theme points if 2 are tied for the having the most', () => {
    component.character.themePoints.combat.setStrength(ThemeStrength.Lesser);
    component.character.themePoints.stealth.setStrength(ThemeStrength.Lesser);
    expect(component.getMagicDefensiveValue(MagicDefenseType.Reflex)).toEqual(11);
    expect(component.getMagicDefensiveValue(MagicDefenseType.Fortitude)).toEqual(11);
    component.character.themePoints.combat.setStrength(ThemeStrength.Minor);
    expect(component.getMagicDefensiveValue(MagicDefenseType.Reflex)).toEqual(12);
  });

  it('should reflect bonuses to fortitude defense when a characters vitality and/or intuition are strong enough', () => {
    component.character.attributes.Vitality.strength = AttributeStrength.Heroic;
    expect(component.getMagicDefensiveValue(MagicDefenseType.Fortitude)).toEqual(13);
    component.character.attributes.Vitality.strength = AttributeStrength.Champion;
    expect(component.getMagicDefensiveValue(MagicDefenseType.Fortitude)).toEqual(14);
    component.character.attributes.Intuition.strength = AttributeStrength.Heroic;
    expect(component.getMagicDefensiveValue(MagicDefenseType.Fortitude)).toEqual(14);
    component.character.attributes.Intuition.strength = AttributeStrength.Champion;
    expect(component.getMagicDefensiveValue(MagicDefenseType.Fortitude)).toEqual(15);
  });

  it('should reflect bonuses to reflex and will when quickness and self discipline are strong enough respectively', () => {
    component.character.attributes.Quickness.strength = AttributeStrength.Heroic;
    expect(component.getMagicDefensiveValue(MagicDefenseType.Reflex)).toEqual(13);
    expect(component.getMagicDefensiveValue(MagicDefenseType.Will)).toEqual(11);
    component.character.attributes["Self Discipline"].strength = AttributeStrength.Heroic;
    expect(component.getMagicDefensiveValue(MagicDefenseType.Reflex)).toEqual(13);
    expect(component.getMagicDefensiveValue(MagicDefenseType.Will)).toEqual(13);
  });


});
