import { IHuntersQuarryResource, IIntegerResource, IKeywordResource, IPerDayResource, IPerSessionResource, IResource, RestoreOn } from "../types";

export const smugglersLuck: IPerDayResource = {
  name: 'Smuggler\'s Luck',
  type: 'PerDay',
  restoredOn: RestoreOn.Rest,
  mainDescription: "",
  effectTexts: ['Once per day you can use your Smuggler\'s Luck to cancel out a Consequence or Serious Consequence from a stealing or pickpocketing roll (that is not against a fellow player character) or you can retroactively declare you stole something during a recent scene.'],
  usesPerDay: 1,
  timesUsed: 0,
};

export const parlay: IPerSessionResource = {
  name: 'I Demand a Parlay',
  type: 'PerSession',
  restoredOn: RestoreOn.Session,
  mainDescription: "",
  effectTexts: ['Once per session you can demand a parlay with any group of hostile Personoids with whom you can communicate. Both sides must stop fighting and hear each others\' demands peaceably. If either side takes hostile action against the other before negotiations have ended, the other side gains a Lasting Advantage as the oathbreakers are cursed by the gods or something.'],
  usesPerSession: 1,
  timesUsed: 0,
};

export const battleBallad: IResource = {
  name: 'Battle Ballad',
  type: "Special",
  restoredOn: RestoreOn.Special,
  mainDescription: "",
  effectTexts: ['Once per turn you can give an ally +1 on an Attack or Defense roll while you are playing this song.']
};

export const lullaby: IResource = {
  name: 'Lullaby',
  type: "Special",
  restoredOn: RestoreOn.Special,
  mainDescription: "",
  effectTexts: ['Roll Friendshippery to make 1 non-hostile target fall into a deep sleep.']
};

export const piedPiper: IResource = {
  name: 'Pied Piper',
  type: "Special",
  restoredOn: RestoreOn.Special,
  mainDescription: "",
  effectTexts: ['Roll Friendshippery each turn to make up to 1d6 non-hostile targets follow you in a trance while you continue to play. +1 against animals.']
};

export const macgyverer: IPerDayResource = {
  name: 'Macgyverer',
  type: 'PerDay',
  restoredOn: RestoreOn.Rest,
  mainDescription: "",
  effectTexts: ['5 times per day you can use whatever random crap is around to craft something useful that falls apart after a single scene of use. The object you create can be a working machine, but cannot be magical.'],
  usesPerDay: 5,
  timesUsed: 0,
}

export const huntersQuarry: IHuntersQuarryResource = {
  name: 'Hunter\'s Quarry',
  type: "Hunter's Quarry",
  restoredOn: RestoreOn.Special,
  inUse: false,
  currentTarget: "",
  mainDescription: "",
  effectTexts: ['You can mark any other creature as your Hunter\'s Quarry by spending a full minute observing them or following their tracks. Your Attacks deal +1 Damage to your quarry. You lose your Hunter\'s Quarry after a day passes without tracking or observing them or if you mark another creature as your quarry.']
}

export const chimericCompanion: IKeywordResource = {
  name: 'Chimeric Companion',
  type: "Keyword",
  keywordSlots: [{ types: ['Animal', 'Element', 'Verb'] }, { types: ['Animal'] }],
  keywords: [],
  spendable: false,
  destroyOnSpend: false,
  rerollOnRestore: false,
  restoredOn: RestoreOn.Rest,
  mainDescription: "",
  effectTexts: ['You have a loyal Chimeric Companion that travels with you and aids you. Every day, roll a new magic beast form that it will assume for that day. Your companion rolls at +2 on Actions it’s well suited for and -1 on Actions it’s poorly suited for. If you companion is injured as a Serious Consequence, it retreats to a crystal orb you keep, where it rests until it can reform the next day.']
}

export const chimericMagic: IPerDayResource = {
  name: "Chimeric Magic",
  type: "PerDay",
  restoredOn: RestoreOn.Rest,
  usesPerDay: 1,
  timesUsed: 0,
  mainDescription: "",
  effectTexts: ['Once per day, your companion can create a spell effect based on its keywords. The spell must originate from the creature in some way.'],
}

export const accordingToPlan: IPerSessionResource = {
  name: 'All According to Plan',
  type: "PerSession",
  restoredOn: RestoreOn.Session,
  usesPerSession: 1,
  timesUsed: 0,
  mainDescription: "",
  effectTexts: ['Once per session, you can declare things have gone According to Plan and you can retroactively declare you set a trap or created an Advantage that takes effect now.'],
}

export const wordsOfPower: IKeywordResource = {
  name: 'Words of Power',
  type: "Keyword",
  keywordSlots: [{types: ['Element', 'Form', 'Verb']}, {types: ['Element', 'Form', 'Verb']}, {types: ['Element', 'Form', 'Verb']}, {types: ['Element', 'Form', 'Verb']}],
  keywords: [],
  spendable: true,
  destroyOnSpend: false,
  rerollOnRestore: false,
  restoredOn: RestoreOn.Rest,
  mainDescription: "",
  effectTexts: ['Combine any two or three Words of Power to cast a spell based on the phrase. You must spend one of the words used in the spell and all your words are replenished when you rest.']
}

export const animalForms: IKeywordResource = {
  name: 'Animal Forms',
  type: "Keyword",
  keywordSlots: [{types: ['Animal']}, {types: ['Animal']}, {types: ['Animal']}, {types: ['Animal']}, {types: ['Animal']}],
  keywords: [],
  spendable: true,
  destroyOnSpend: false,
  rerollOnRestore: false,
  restoredOn: RestoreOn.Rest,
  mainDescription: "",
  effectTexts: ['Spend one of the animal form keywords to assume the shape of that animal for up to one hour. While transformed, you roll with +2 on anything your form is good at and -1 on anything your form is bad at unless it involves purely your own mental abilities (in which case use your own Skills as normal). Any form that would be larger than a bear is a version of that creature shrunk down to a bear-sized version.']
}

export const runes: IKeywordResource = {
  name: 'Runes',
  type: "Keyword",
  keywordSlots: [{types: ['Element', 'Form', 'Verb']}, {types: ['Element', 'Form', 'Verb']}, {types: ['Element', 'Form', 'Verb']}],
  keywords: [],
  spendable: false,
  destroyOnSpend: false,
  rerollOnRestore: false,
  restoredOn: RestoreOn.Special,
  mainDescription: "",
  effectTexts: []
}

export const runicPoints: IIntegerResource = {
  name: 'Runic Points',
  type: "Integer",
  currentValue: 0,
  maxValue: 3,
  restoredOn: RestoreOn.Rest,
  mainDescription: "",
  effectTexts: ['You can write or inscribe the runes you know on any objects (though putting more than one Rune on the same object causes them both to fail). Whenever you rest, you gain up to 3 Runic Points. You can spend a Runic Point to activate one of your runes, creating a spell effect originating from the object based on the rune. The effect lasts for up to 10 minutes on permanently inscribed Runes and for only one Action on temporarily drawn Runes.']
}

export const alchemicalBases: IKeywordResource = {
  name: 'Alchemical Bases',
  type: 'Keyword',
  keywordSlots: [{types: ['Base']}, {types: ['Base']}, {types: ['Base']}],
  keywords: [],
  spendable: true,
  destroyOnSpend: true,
  rerollOnRestore: false,
  restoredOn: RestoreOn.Resupply,
  mainDescription: "",
  effectTexts: []
}

export const alchemicalCatalysts: IKeywordResource = {
  name: 'Alchemical Catalysts',
  type: 'Keyword',
  keywordSlots: [{types: ['Element', 'Verb']}, {types: ['Element', 'Verb']}, {types: ['Element', 'Verb']}],
  keywords: [],
  spendable: true,
  destroyOnSpend: true,
  rerollOnRestore: true,
  restoredOn: RestoreOn.Resupply,
  mainDescription: "",
  effectTexts: ['You have a mobile alchemy lab and you are proficient in its use. Whenever you resupply, roll 3 random Alchemical Bases and 3 random Alchemical Catalysts (Elements or Verbs). You can combine a Base with a Catalyst to create an Alchemical Compound that acts as a spell with the appropriate properties. Unused Compounds lose their potency a day after creation and the lab can\'t hold more than 3 Bases and 3 Catalysts at a time.']
}
