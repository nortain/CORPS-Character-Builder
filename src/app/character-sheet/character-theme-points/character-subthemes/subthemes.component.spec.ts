import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubthemesComponent } from './subthemes.component';

describe('SubthemesComponent', () => {
  let component: SubthemesComponent;
  let fixture: ComponentFixture<SubthemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubthemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubthemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
