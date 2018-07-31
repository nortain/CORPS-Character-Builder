import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AttributeName} from "../../shared/attribute/attribute-name.enum";
import {AttributeStrength} from "../../shared/attribute/attribute-strength.enum";
import {DropdownValueObject} from "../../shared/ui/dropdown/dropdown-value-object";
import {AttributeService} from "../../shared/attribute/attribute.service";
import {StartingCharacterAttributes} from "../../shared/attribute/character-attribute/starting-character-attributes";
import {Attribute} from "../../shared/attribute/attribute";

@Component({
  selector: 'corps-character-attributes',
  templateUrl: './character-attributes.component.html',
  styleUrls: ['./character-attributes.component.css']
})
export class CharacterAttributesComponent implements OnInit, OnChanges {

  @Input() incomingAttributes: StartingCharacterAttributes;
  @Input() assignableAttributePoints: number;
  onPushToggle = true;
  attributes: string[];
  racialAttributeStrength: StartingCharacterAttributes;

  constructor(private attributeService: AttributeService) {
  }

  ngOnInit() {
    this.racialAttributeStrength = this.incomingAttributes;
    this.attributes = this.attributeService.getEnumAsArrayOfStrings(AttributeName, true);
  }

  ngOnChanges() {
    this.onPushToggle = !this.onPushToggle;
  }

  getAttributeDropdownValues(attributeName: string): DropdownValueObject[] {
    const racial: Attribute = this.racialAttributeStrength[attributeName];
    const attribute = this.incomingAttributes[attributeName];
    const maxIndex = this.assignableAttributePoints + attribute.strength;
    let minIndex = 0;
    if (racial.strength === AttributeStrength.Heroic) {
      minIndex = 1;
    }
    return this.attributeService.getArrayOfDropdownValueObjectsFromEnum(AttributeStrength, true, minIndex, maxIndex);
  }

  getIncomingAttributeStrengthFor(attributeName: string): DropdownValueObject {
    const attribute: Attribute = this.incomingAttributes[attributeName];
    if (!attribute) {
      const attributeLabel = AttributeStrength[AttributeStrength.Normal] + " (" + 0 + ")";
      return {value: 0, label: attributeLabel};
    } else {
      // this.attributeStrength
      const attributeLabel = AttributeStrength[attribute.strength] + " (" + attribute.strength + ")";
      return {value: attribute.strength, label: attributeLabel};
    }
  }

  updateAttribute(attributeName: AttributeName, attributeStrength: AttributeStrength) {
    const attribute: Attribute = this.incomingAttributes[attributeName];
    attribute.strength = attributeStrength;
  }

}
