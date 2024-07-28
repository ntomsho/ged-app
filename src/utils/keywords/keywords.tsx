import elements from './elements';
import forms from './forms';
import verbs from './verbs';
import animals from './animals';
import bases from './bases';
import { Keyword } from '../../types';
import Random from '../random';

const arrays = {
    'Element': elements,
    'Form': forms,
    'Verb': verbs,
    'Animal': animals,
    'Base': bases,
};

const getKeyword = (type: 'Element' | 'Form' | 'Verb' | 'Animal' | 'Base', word?: string, excludeWords?: string[]): Keyword | undefined => {
    const array: Keyword[] = arrays[type];
    let selectedKeyword = word ? array.find((keyword) => keyword.word === word) : Random(array);
    if (!selectedKeyword || !excludeWords || excludeWords.length === array.length) return selectedKeyword;
    while (selectedKeyword && excludeWords.includes(selectedKeyword.word)) {
        selectedKeyword = Random(array);
    }
    return selectedKeyword;
}

export default getKeyword;