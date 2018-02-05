import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSheetComponent} from './character-sheet.component';
import {SharedModule} from "../shared/shared.module";
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";

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
});
