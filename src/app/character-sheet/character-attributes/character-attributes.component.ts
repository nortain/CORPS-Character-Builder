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
  @Input() racialAttributes: AttributeName[];
  onPushToggle = true;
  attributes: string[];

  constructor(private attributeService: AttributeService) {
  }

  ngOnInit() {
    this.attributes = this.attributeService.getEnumAsArrayOfStrings(AttributeName, true);
  }

  ngOnChanges() {
    this.onPushToggle = !this.onPushToggle;
  }

  getAttributeDropdownValues(attributeName: string): DropdownValueObject[] {
    const racial: boolean = this.isRacialAttribute(attributeName);
    const attribute = this.incomingAttributes[attributeName];
    const maxIndex = this.assignableAttributePoints + attribute.strength + 1;
    let minIndex = 0;
    if (racial) {
      minIndex = 1;
    }
    const ddObjects: DropdownValueObject[] = this.attributeService.getArrayOfDropdownValueObjectsFromEnum(AttributeStrength, true, minIndex, maxIndex);
    return ddObjects;
  }

  /**
   * This will return true if the given string/attribute name exists in the array of passed in racial attributes.  This lets us know which attributes cannot go below heroic because of the selected race
   * @param {string} attributeName
   * @returns {boolean}
   */
  isRacialAttribute(attributeName: string): boolean {
    for (const attribute of this.racialAttributes) {
      if (attribute === attributeName) {
        return true;
      }
    }
    return false;
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
