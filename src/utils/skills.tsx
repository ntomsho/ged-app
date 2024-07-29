import { ISkill } from "../types";

export const fightingSkills: ISkill[] = [
    {
        name: 'Brute Force',
        type: "Fighting",
        usedFor: ['Attacks with heavy melee and heavy throwing weapons', 'Defending with shields', 'Climbing', 'Intimidation', 'Feats of strength and endurance'],
        extraInfo: "",
        emoji: '💪'
    },
    {
        name: 'Ocular Prowess',
        type: "Fighting",
        usedFor: ['Attacks with ranged and throwing weapons', 'Defending against hidden threats', 'Spotting concealed dangers', 'Looking', 'Listening'],
        extraInfo: "",
        emoji: '🎯'
    },
    {
        name: 'Rad Moves',
        type: "Fighting",
        usedFor: ['Attacks with light melee weapons', 'Defending by dodging, evading, or parrying', 'Sprinting', 'Balancing', 'Acrobatics'],
        extraInfo: "",
        emoji: '🤸'
    },
];

export const normalSkills: ISkill[] = [
    {
        name: 'Creepin\'',
        type: "Normal",
        usedFor: ['Sneak attacks against unaware targets', 'Sneaking', 'Hiding', 'Picking locks', 'Stealing', 'Lying', 'Trickery', 'Underworld knowledge'],
        extraInfo: "",
        emoji: '🥷'
    },
    {
        name: 'Friendshippery',
        type: "Normal",
        usedFor: ['Lead or command others', 'Entertain with performance art', 'Befriend', 'Persuade', 'Resist fear or mind-controlling effects'],
        extraInfo: "",
        emoji: '🤝'
    },
    {
        name: 'Macgyver',
        type: "Normal",
        usedFor: ['Craft or repair equipment', 'Build', 'Maintain', 'Assess craftsmanship'],
        extraInfo: "",
        emoji: '🛠'
    },
    {
        name: 'Man vs. Wild',
        type: "Normal",
        usedFor: ['Survive in the wilderness', 'Identify plants and animals', 'Ride, tame, or communicate with beasts', 'Navigate', 'Forage', 'Track'],
        extraInfo: "",
        emoji: '🏕'
    },
    {
        name: 'Thinkiness',
        type: "Normal",
        usedFor: ['Attack with traps or contrivances', 'See through deceptions', 'Interpret clues', 'Recall information', 'Persuade with logic'],
        extraInfo: "",
        emoji: '📖'
    },
];


export const allSkills = [ ...fightingSkills, ...normalSkills ];