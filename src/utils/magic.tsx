import { IMagicFeature } from "../types";
import { alchemicalBases, alchemicalCatalysts, animalForms, runes, runicPoints, wordsOfPower } from "./resources";
import { getSkill } from "./skills";

const magic: IMagicFeature[] = [
  {
    name: 'Words of Power',
    type: "Magic",
    mainDescription: "Combine words of power to cast a range of spells.",
    unlockingSkill: null,
    resources: [wordsOfPower],
    upgraded: false,
    startingItems: [],
  },
  // {
  //   name: 'Knight of Tushuze',
  // }
  {
    name: 'Boons for Runes',
    type: "Magic",
    mainDescription: "Inscribe magic runes on items to imbue them with mystical power",
    unlockingSkill: getSkill('Macgyver'),
    resources: [runes, runicPoints],
    upgraded: false,
    startingItems: []
  },
  {
    name: 'Hippie',
    type: "Magic",
    mainDescription: "Transform into a variety of animal forms.",
    unlockingSkill: getSkill('Man vs. Wild'),
    resources: [animalForms],
    upgraded: false,
    startingItems: []
  },
  {
    name: 'Mixologist',
    type: "Magic",
    mainDescription: "Create alchemical concoctions with potent magical effects.",
    unlockingSkill: getSkill('Thinkiness'),
    resources: [alchemicalBases, alchemicalCatalysts],
    upgraded: false,
    startingItems: []
  }
]

export default magic;