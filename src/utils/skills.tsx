import { ISkill } from "../types";

export const fightingSkills: ISkill[] = [
    {
        name: 'Brute Force',
        type: "Fighting",
        usedFor: ['Attacks with heavy melee and heavy throwing weapons', 'Defending with shields', 'Climbing', 'Intimidation', 'Feats of strength and endurance'],
        extraInfo: "",
        masteries: [
            "+1 to rolls with heavy melee weapons and unarmed attacks and defense",
            "+1 to rolls with shields and to use pure strength",
            "+1 damage with Brute Force Attacks",
        ],
        emoji: '💪'
    },
    {
        name: 'Ocular Prowess',
        type: "Fighting",
        usedFor: ['Attacks with ranged and throwing weapons', 'Defending against hidden threats', 'Spotting concealed dangers', 'Looking', 'Listening'],
        extraInfo: "",
        masteries: [
            "+1 to rolls with ranged and thrown weapons",
            "+1 to rolls to notice danger",
            "+1 Damage with Ocular Prowess Attacks",
        ],
        emoji: '🎯'
    },
    {
        name: 'Rad Moves',
        type: "Fighting",
        usedFor: ['Attacks with light melee weapons', 'Defending by dodging, evading, or parrying', 'Sprinting', 'Balancing', 'Acrobatics'],
        extraInfo: "",
        masteries: [
            "+1 to rolls with light melee weapons",
            "+1 to rolls to evade",
            "+1 Damage with Rad Moves Attacks",
        ],
        emoji: '🤸'
    },
];

export const normalSkills: ISkill[] = [
    {
        name: 'Creepin\'',
        type: "Normal",
        usedFor: ['Sneak attacks against unaware targets', 'Sneaking', 'Hiding', 'Picking locks', 'Stealing', 'Lying', 'Trickery', 'Underworld knowledge'],
        extraInfo: "",
        masteries: [],
        emoji: '🥷'
    },
    {
        name: 'Friendshippery',
        type: "Normal",
        usedFor: ['Lead or command others', 'Entertain with performance art', 'Befriend', 'Persuade', 'Resist fear or mind-controlling effects'],
        extraInfo: "",
        masteries: [],
        emoji: '🤝'
    },
    {
        name: 'Macgyver',
        type: "Normal",
        usedFor: ['Craft or repair equipment', 'Build', 'Maintain', 'Assess craftsmanship'],
        extraInfo: "",
        masteries: [],
        emoji: '🛠'
    },
    {
        name: 'Man vs. Wild',
        type: "Normal",
        usedFor: ['Survive in the wilderness', 'Identify plants and animals', 'Ride, tame, or communicate with beasts', 'Navigate', 'Forage', 'Track'],
        extraInfo: "",
        masteries: [],
        emoji: '🏕'
    },
    {
        name: 'Thinkiness',
        type: "Normal",
        usedFor: ['Attack with traps or contrivances', 'See through deceptions', 'Interpret clues', 'Recall information', 'Persuade with logic'],
        extraInfo: "",
        masteries: [],
        emoji: '📖'
    },
];


export const allSkills = [ ...fightingSkills, ...normalSkills ];