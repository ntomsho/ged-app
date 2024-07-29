export default function Random<Type>(array: Type[]): Type {
    if (!Array.isArray(array)) {
        console.log('Error: value is not an array');
    }
    return array[Math.floor(Math.random() * array.length)];
}