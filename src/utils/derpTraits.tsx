import { IDerpTrait } from "../types";

export const backgrounds: IDerpTrait[] = [
    {
        type: 'Background',
        name: 'Accountant',
        extraInfo: 'There\'s no accounting for this.',
        emoji: '🤓',
    },
    {
        type: 'Background',
        name: 'Apothecary',
        extraInfo: 'Put some leeches on it and call me in the morning.',
        emoji: '⚗',
    },
    // ...
];

export const styles: IDerpTrait[] = [
    {
        type: 'Style',
        name: 'Angry',
        extraInfo: 'Calm down. Deep breaths.',
        emoji: '😡',
    },
    {
        type: 'Style',
        name: 'Edgelord',
        extraInfo: 'I was chosen by the darkness. It\'s not a phase, mom.',
        emoji: '🪦',
    },
    // ...
];

export const derps: IDerpTrait[] = [
    {
        type: 'Derp',
        name: 'Allergic to a color',
        extraInfo: 'This doesn\'t have mauve berries in it, does it?',
        emoji: '🌈',
    },
    {
        type: 'Derp',
        name: 'Amateur superhero',
        extraInfo: 'Fear not, citizens.',
        emoji: '🦸',
    },
    // ...
]