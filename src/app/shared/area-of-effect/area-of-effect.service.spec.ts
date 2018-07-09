import { TestBed, inject } from '@angular/core/testing';

import { AreaOfEffectService } from './area-of-effect.service';
import {mockAreaOfEffect} from "../constants/testing-constants";
import {AreaOfEffectType} from "./area-of-effect-type.enum";
import {SharedModule} from "../shared.module";

describe('AreaOfEffectService', () => {
  let aoeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaOfEffectService]
    });
  });

  beforeEach(inject([AreaOfEffectService], (svc: AreaOfEffectService) => {
    aoeService = svc;
  }));

  it('should be created', inject([AreaOfEffectService], (service: AreaOfEffectService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to display an area of effect', () => {
    const mock = "Zone 2 in 10";
    expect(aoeService.displayAOE(mockAreaOfEffect())).toBe(mock);

  });

  it('should display only self when encountering self', () => {
    const mock = "Self";

    const aoe = {numberOfTargets: 1, range: 1, type: AreaOfEffectType.Self};
    expect(aoeService.displayAOE(aoe)).toBe(mock);
  });
});
