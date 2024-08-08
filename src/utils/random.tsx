export default function Random<Type>(array: Type[], excludeArray?: Type[]): Type {
    if (!Array.isArray(array)) {
        throw new Error('value is not an array');
    }
    if (!!excludeArray && array.every((val) => excludeArray.includes(val))) {
        throw new Error('all array values have been excluded');
    }
    let returnValue = array[Math.floor(Math.random() * array.length)];
    if (!!excludeArray) {
        while (excludeArray.includes(returnValue)) {
            returnValue = array[Math.floor(Math.random() * array.length)];
        }
    }
    return returnValue;
}