import { IFightingStyleFeature } from "../types"
import { fightingSkills } from "./skills";

const fightingStyles: IFightingStyleFeature[] = [
    {
        type: 'Fighting Style',
        name: 'Brute Force',
        skill: fightingSkills.find((skill) => skill.name === 'Brute Force')!,
        upgraded: false,
        startingItems: []
    },
    {
        type: 'Fighting Style',
        name: 'Ocular Prowess',
        skill: fightingSkills.find((skill) => skill.name === 'Ocular Prowess')!,
        upgraded: false,
        startingItems: []
    },
    {
        type: 'Fighting Style',
        name: 'Rad Moves',
        skill: fightingSkills.find((skill) => skill.name === 'Rad Moves')!,
        upgraded: false,
        startingItems: []
    }
];

export default fightingStyles;
