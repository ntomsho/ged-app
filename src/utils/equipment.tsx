import { IWeapon, WeaponType } from "../types";
import Random from "./random";

export const heavyMeleeWeapons: IWeapon[] = [
  {
    name: 'Battleaxe',
    type: 'Weapon',
    weaponType: "Heavy Melee",
    description: "Wood stands no chance."
  },
  // ...
];

export const lightMeleeWeapons: IWeapon[] = [
  {
    name: 'Dagger',
    type: 'Weapon',
    weaponType: 'Light Melee',
    description: 'The classic symbol of betrayal, it works best with the element of surprise.'
  },
  // ...
];

export const rangedWeapons: IWeapon[] = [
  {
    name: 'Blunderbuss',
    type: 'Weapon',
    weaponType: "Ranged",
    description: "Perfect for feudin\' against varmints at close range."
  },
  // ...
];

export const heavyThrownWeapons: IWeapon[] = [
  {
    name: 'Boomerang',
    type: 'Weapon',
    weaponType: 'Heavy Thrown',
    description: 'The epitome of reusable throwing stick technology.'
  },
  // ...
];

export const lightThrownWeapons: IWeapon[] = [
  {
    name: 'Chakrams',
    type: 'Weapon',
    weaponType: 'Light Thrown',
    description: 'Look, I\'m not even sure how you\'re supposed to hold these things, but I assure you they work.'
  },
  // ,,,
];

export const weaponTypes = {
  'Heavy Melee': {emoji: '⚔', list: heavyMeleeWeapons},
  'Light Melee': {emoji: '🔪', list: lightMeleeWeapons},
  'Ranged': {emoji: '🏹', list: rangedWeapons},
  'Heavy Thrown': {emoji: '🪓', list: heavyThrownWeapons},
  'Light Thrown': {emoji: '🪃', list: lightThrownWeapons},
};

export const getRandomWeapon = (weaponType?: WeaponType) => {
  if (weaponType) return Random(weaponTypes[weaponType].list);
  const rolledWeaponType: WeaponType = Random(['Heavy Melee', 'Heavy Melee', 'Light Melee', 'Ranged', 'Ranged', 'Light Thrown', 'Heavy Thrown']);
  return Random(weaponTypes[rolledWeaponType].list);
}