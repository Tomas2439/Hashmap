// HashMap.js
export default class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        // Creamos un arreglo con la capacidad inicial, donde cada espacio es un arreglo vacío (para manejar colisiones)
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0; // Para rastrear el número de claves almacenadas (length)
    }

    // Función Hash mejorada con el módulo dentro del bucle
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    // Método auxiliar para evitar acceso fuera de los límites de la memoria
    checkIndex(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
    }

    // Guardar o actualizar un par clave-valor
    set(key, value) {
        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];

        // 1. Revisar si la clave ya existe para sobreescribir el valor
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return; // Actualizado, no aumenta el tamaño
            }
        }

        // 2. Si no existe, agregar al bucket (Manejo de colisión simple)
        bucket.push([key, value]);
        this.size++;

        // 3. Verificar si superamos el Load Factor para redimensionar (Grow)
        if (this.size > this.capacity * this.loadFactor) {
            this.resize();
        }
    }

    // Duplicar la capacidad y reubicar todos los elementos
    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2; // Duplicamos capacidad
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        // Recalcular los hashes para reasignar a los nuevos buckets
        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }

    // Obtener el valor asociado a una clave
    get(key) {
        const index = this.hash(key);
        this.checkIndex(index);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null; // Si no lo encuentra
    }

    // Verificar si la clave existe
    has(key) {
        return this.get(key) !== null;
    }

    // Eliminar una clave
    remove(key) {
        const index = this.hash(key);
        this.checkIndex(index);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1); // Remover del array
                this.size--;
                return true;
            }
        }
        return false;
    }

    // Retornar número de claves almacenadas
    length() {
        return this.size;
    }

    // Vaciar completamente el HashMap
    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    // Retornar arreglo con todas las claves
    keys() {
        const allKeys = [];
        for (const bucket of this.buckets) {
            for (const [key] of bucket) {
                allKeys.push(key);
            }
        }
        return allKeys;
    }

    // Retornar arreglo con todos los valores
    values() {
        const allValues = [];
        for (const bucket of this.buckets) {
            for (const [, value] of bucket) {
                allValues.push(value);
            }
        }
        return allValues;
    }

    // Retornar arreglo con todos los pares clave-valor
    entries() {
        const allEntries = [];
        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                allEntries.push(entry);
            }
        }
        return allEntries;
    }
}