import { User } from "firebase/auth";

export interface RootState {
    user: IUser;
}

export interface IUser {
    displayName: string;
    userAuth: User;
    characters: ICharacter[];
    profilePicture?: string;
}

export interface IDerpTrait {
    type: 'Background' | 'Style' | 'Derp';
    name: string;
    extraInfo: string;
    emoji?: string;
}

export interface ISkill {
    type: 'Fighting' | 'Normal';
    name: 'Brute Force' | 'Ocular Prowess' | 'Rad Moves' | 'Creepin\'' | 'Friendshippery' | 'Macgyver' | 'Man vs. Wild' | 'Thinkiness';
    masteries: string[],
    usedFor: string[];
    extraInfo: string;
    emoji: string;
}

export interface ICharacterFeature {
    type: string;
    name: string;
    upgraded: boolean;
    startingItems: IItem[];
}

export interface IItem {
    type: string;
    name: string;
}

export interface ICharacter {
    playerId: string;
    characterName: string;
    currentHealth: number;
    maxHealth: number;
    currentDerpPoints: number;
    traits: {
        Background: IDerpTrait;
        Style: IDerpTrait;
        Derp: IDerpTrait;
    };
    trainedSkills: ('Brute Force' | 'Ocular Prowess' | 'Rad Moves' | 'Creepin\'' | 'Friendshippery' | 'Macgyver' | 'Man vs. Wild' | 'Thinkiness')[];
    features: ICharacterFeature[];
    inventory: IItem[];
    experience: number;
    level: number;
}

export interface Keyword {
    word: string;
    type: 'Element' | 'Form' | 'Verb' | 'Animal' | 'Base';
    description: string;
    consumed: boolean;
    emoji?: string;
}

export interface ElementKeyword extends Keyword {
    type: 'Element';
    adjective: string;
}

export interface VerbKeyword extends Keyword {
    type: 'Verb';
    gerund: string;
}

export interface FormKeyWord extends Keyword {}

export interface AnimalKeyword extends Keyword {
    type: 'Animal';
    subType: 'Ancient' | 'Crawler' | 'Flier' | 'Grazer' | 'Hunter' | 'Swimmer';
}

export interface Oath {
    //TODO
}

export interface MagicBeast {
    //TODO
}

export enum RestoreOn {
    Rest,
    Resupply,
    DealDamage,
}

export interface IResource {
    name: string;
    restoredOn: RestoreOn;
    mainDescription: string;
    effectTexts: string[];
}

export interface IKeywordResource {
    keywords: Keyword[];
}

export interface IIntegerResource {
    currentValue: number;
    maxValue: number;
}

export interface IFightingStyleFeature extends ICharacterFeature {
    type: 'Fighting Style';
    skill: ISkill;
    mastery?: string;
}

export interface IArtifactFeature extends ICharacterFeature {
    type: 'Artifact';
    subType: 'Magic Garb' | 'Magic Objects' | 'Magic Weapons';
    mainDescription: string;
    resources?: IResource[];
    effectTexts: string[];
}

export interface ISkillMasteryFeature extends ICharacterFeature {
    type: 'Skill Mastery'
    skill: ISkill;
    masteryText: string;
    mainDescription: string;
    resources?: IResource[];
    effectsText: string[];
}

export interface ISpecialAncestry {
    name: string;
    resources?: IResource[];
    effectsText: string[];
}

export interface ISpecialAncestryFeature extends ICharacterFeature {
    type: 'Special Ancestry';
    ancestries: ISpecialAncestry[];
}

export interface IMagicFeature extends ICharacterFeature {
    type: 'Magic';
    mainDescription: string;
    unlockingSkill: ISkill | null;
    resources: IResource[];
}