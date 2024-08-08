import { ISpecialAncestry } from "../types";
import { elementBreath } from "./resources";

const ancestries: ISpecialAncestry[] = [
  // {
  //   name: 'Adorable',
  //   effectsText: ['+1 to rolls to melt hearts and convince others you\'re harmless. As long as you have not shown yourself to be a threat, you can roll with Magic as a Defense roll to convince an attacker to leave you alone.']
  // },
  {
    name: 'Aerial',
    effectTexts: [],
    choice: {
      choices: [
        { effectsText: ['You can fly but you have -1 Max Health.'], otherEffect: { targetedValue: 'Health', modifier: -1 } },
        { effectsText: ['You can\'t fly but you can glide and slow yourself down when falling.'] },
      ],
      chosenIndex: -1,
    },
  },
  {
    name: 'Element Breath',
    effectTexts: [],
    resources: [elementBreath],
  },
];

export default ancestries;