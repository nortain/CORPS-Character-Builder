import {TestBed, inject} from '@angular/core/testing';

import {AttributeService} from './attribute.service';
import {AttributeName} from "./attribute-name.enum";
import {AttributeStrength} from "./attribute-strength.enum";

describe('AttributeService', () => {
  let attributeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributeService]
    });
  });

  beforeEach(inject([AttributeService], (svc: AttributeService) => {
    attributeService = svc;
  }));

  it('should be created', inject([AttributeService], (service: AttributeService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to get all enums as an array', function () {
    const attributes = AttributeName;
    expect(attributeService.getEnumAsArrayOfStrings(attributes, true).length).toBe(8);
    expect(attributeService.getEnumAsArrayOfStrings(AttributeStrength).length).toBe(5);
    expect(attributeService.getEnumAsArrayOfStrings(AttributeStrength)[4]).toBe(AttributeStrength[4]);
  });

  it('should be able to get a colleciton of dropdown values from a standard enum', function () {
    const result = attributeService.getArrayOfDropdownValueObjectsFromEnum(AttributeStrength);
    expect(result.length).toBe(5);
    expect(result[3].value).toEqual(3);
    expect(result[3].label).toEqual("Epic");

  });

});
