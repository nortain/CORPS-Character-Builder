import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import {mockDropdownData} from "../../testing-constants";
import {By} from "@angular/platform-browser";
import {SharedModule} from "../../shared.module";
import {NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap/dropdown/dropdown";
import {NgbDropdownConfig, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbDropdownModule],
      declarations: [ DropdownComponent ],
      providers: [NgbDropdownConfig]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.values = mockDropdownData();
    component.labelName = "Bobs test";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to take in set of values', () => {
    spyOn(component.valueChange, "emit");
    const dd = fixture.debugElement.query(By.css("button"));
    expect(dd.nativeElement).toBeTruthy();
    dd.nativeElement.click();
    fixture.detectChanges();
    const menu = fixture.debugElement.query(By.directive(NgbDropdownMenu));
    expect(menu.nativeElement && menu.nativeElement.children[0]).toBeTruthy();
    menu.nativeElement.children[2].click();
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith(component.values[2]);

  });

  it('should be able to have a label', () => {
    const label = fixture.debugElement.query(By.css("label")).nativeElement;
    expect(label).toBeTruthy();
    expect(label.innerText).toBe("Bobs test");
  });

  it('should be able to get the selected value', () => {
    const selectedValue = component.selectedValue;
    expect(selectedValue).toEqual(mockDropdownData()[0]);
  });

  it('should be able to pre load a value', () => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.values = mockDropdownData();
    component.value = mockDropdownData()[1];
    fixture.detectChanges();
    expect(component.selectedValue).toEqual(mockDropdownData()[1]);
    const dd = fixture.debugElement.query(By.css("button"));
    expect(dd.nativeElement.innerText).toBe(mockDropdownData()[1].label);
  });

  it('should not have a br element in it', () => {
    const newLine = fixture.debugElement.query(By.css("br"));
    expect(newLine).toBeNull();
  });

  it('should be able to put label on a new line', () => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.values = mockDropdownData();
    component.labelName = "Bobs test";
    component.newLineLabelName = true;
    fixture.detectChanges();
    const newLine = fixture.debugElement.query(By.css("br"));
    expect(newLine.nativeElement).toBeTruthy();
  });
});
