import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterAttributesComponent} from './character-attributes.component';
import {SharedModule} from "../../shared/shared.module";
import {DropdownComponent} from "../../shared/ui/dropdown/dropdown.component";
import {By} from "@angular/platform-browser";
import {NgbDropdownConfig, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {AttributeService} from "../../shared/attribute/attribute.service";
import {StartingCharacterAttributes} from "../../shared/attribute/character-attribute/starting-character-attributes";
import {AttributeStrength} from "../../shared/attribute/attribute-strength.enum";
import {AttributeName} from "../../shared/attribute/attribute-name.enum";

fdescribe('CharacterAttributesComponent', () => {
  let component: CharacterAttributesComponent;
  let fixture: ComponentFixture<CharacterAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NgbDropdownModule],
      declarations: [CharacterAttributesComponent],
      providers: [
        NgbDropdownConfig, AttributeService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAttributesComponent);
    component = fixture.componentInstance;
    component.assignableAttributePoints = 4;
    component.racialAttributes = [AttributeName.Brawn, AttributeName.Presence];
    component.incomingAttributes = new StartingCharacterAttributes();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a total of 8 dropdown components', function () {
    const count = fixture.debugElement.queryAll(By.directive(DropdownComponent));
    expect(count.length).toEqual(8);
  });

  it('should be able to load non-zero values when a new race is selected', () => {
    component.incomingAttributes = new StartingCharacterAttributes();
    component.incomingAttributes.Brawn.strength = AttributeStrength.Heroic;
    component.ngOnChanges();
    fixture.detectChanges();
    const brawnDD = fixture.debugElement.query(By.directive(DropdownComponent)).query(By.css("button"));
    expect(brawnDD.nativeElement.innerText).toBe("Heroic (1)");


  });

  it('should be able to limit the dropdown menu of racial stats so they cannot go below 1', () => {
    component.incomingAttributes = new StartingCharacterAttributes();
    component.incomingAttributes.Brawn.strength = AttributeStrength.Heroic;
    component.ngOnChanges();
    fixture.detectChanges();
    const brawnDD = fixture.debugElement.query(By.directive(DropdownComponent)).query(By.css("button"));
    brawnDD.nativeElement.click();
    fixture.detectChanges();
    const menu = fixture.debugElement.query(By.directive(DropdownComponent)).queryAll(By.css(".dropdown-item"));
    expect(menu.length).toEqual(4);

  });

  it('should limit a character to being able to only select up to their assignable attribute points value', () => {
    expect(true).toBeFalsy();
  });
});
