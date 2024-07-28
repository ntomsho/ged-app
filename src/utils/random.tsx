export default function Random<Type>(array: Type[]): Type {
    return array[Math.floor(Math.random() * array.length)];
}