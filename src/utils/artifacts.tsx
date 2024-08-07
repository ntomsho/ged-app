import { IArtifactFeature, IArtifactWeaponFeature } from "../types";
import { getCharge, singleAnimal, singleElement } from "./resources";

const artifacts: (IArtifactFeature | IArtifactWeaponFeature)[] = [
  {
    type: 'Artifact',
    name: "Elemental Garb",
    artifactName: "",
    subType: "Magic Garb",
    mainDescription: "",
    // choice: [{choiceText: 'The wearer is immune to all damage from the Element'}, {choiceText: '+2 Charge', value: 2, choiceValue: ChoiceValue.Charge}],
    choice: {
      choices: [
        { effectsText: ['The wearer is immune to all damage from the Element.'] },
        { alternateChoiceTexts: ['+2 Charge'], resources: [null, getCharge(3, ['Cast a Spell with the Element keyword plus Armor, Aura, Cloak, or Shield.'])] },
      ],
      chosenIndex: -1,
    },
    resources: [singleElement, getCharge(1, ['Cast a Spell with the Element keyword plus Armor, Aura, Cloak, or Shield.']),],
    effectTexts: [],
    upgraded: false,
    startingItems: [],
  },
  // ...
  {
    type: 'Artifact',
    name: 'Animal Totem',
    artifactName: "",
    subType: "Magic Object",
    mainDescription: "",
    resources: [singleAnimal],
    effectTexts: [
      'You can transform into the totem\'s animal at will as an Action. When you are in the animal form you continue to use your own mental faculties but you get +1 on physical rolls it would be good at and -1 on physical rolls it would be bad at.',
      'Some Animal types give an additional bonus:',
      '•Creeper: You can assume the regular form of the totem\'s Animal or a swarm of those creatures.',
      '•Grazer: Your animal form provides 2 extra Health while in the form. The Health regenerates after 10 minutes outside of the animal form.',
      '•Swimmer: Once per day when you assume animal form while fully submerged in water, you are fully Healed.'
    ],
    upgraded: false,
    startingItems: []
  },
  {
    type: 'Artifact',
    name: 'Boomerang / Manyshots Weapon',
    weaponType: {name: 'Placeholder', type: 'Weapon', description: '', weaponType: 'Heavy Melee'},
    artifactName: '',
    subType: 'Magic Weapon',
    mainDescription: '',
    resources: [getCharge(4, ['The weapon conjures a salvo of projectiles instead of just one, allowing you to make an area attack or get +1 on an Attack against a single target.'])],
    effectTexts: [
      'The weapon can be effectively thrown regardless of its shape or weight, giving no penalty to Attacks when thrown.',
      'You can hold your hand out to make the weapon fly back to your grasp. It tries to take the most direct route, but will strike through creatures and breakable objects on its way back to you.',
      'Whenever this weapon’s bowstring is drawn, its hammer pulled back, or the wielder reaches for another throwable, a fresh piece of ammunition appears in place immediately. It thus never runs out of ammunition.',
    ],
    upgraded: false,
    startingItems: []
  }
]

export default artifacts;