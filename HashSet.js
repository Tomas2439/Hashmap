// HashSet.js
export default class HashSet {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    // Set ya no recibe un parámetro 'value', solo 'key'
    set(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // Si la clave ya está en el HashSet, no hacemos nada
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i] === key) return;
        }

        // Si no está, la añadimos (sin crear un arreglo de [key, value])
        bucket.push(key);
        this.size++;

        if (this.size > this.capacity * this.loadFactor) {
            this.resize();
        }
    }

    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (const bucket of oldBuckets) {
            for (const key of bucket) {
                this.set(key); // Volvemos a ubicar la clave
            }
        }
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        return bucket.includes(key); // Mucho más simple porque es un arreglo lineal
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const keyIndex = bucket.indexOf(key);

        if (keyIndex !== -1) {
            bucket.splice(keyIndex, 1);
            this.size--;
            return true;
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        const allKeys = [];
        for (const bucket of this.buckets) {
            for (const key of bucket) {
                allKeys.push(key);
            }
        }
        return allKeys;
    }
}