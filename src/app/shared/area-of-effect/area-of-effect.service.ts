import {Injectable} from '@angular/core';
import {AreaOfEffect} from "./area-of-effect";
import {AreaOfEffectType} from "./area-of-effect-type.enum";

@Injectable()
export class AreaOfEffectService {

  constructor() {
  }

  displayAOE(aoe: AreaOfEffect): string {
    if (aoe.type === AreaOfEffectType.Self) {
      return aoe.type;
    }
    return aoe.type + " " + aoe.numberOfTargets + " in " + aoe.range;
  }

}
