// main.js
import HashMap from './HashMap.js';

const test = new HashMap(); // Usa capacity = 16, loadFactor = 0.75 por defecto

// 1. Poblamos la tabla
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log("--- Después de la carga inicial ---");
console.log(`Capacidad actual: ${test.capacity}`);
console.log(`Tamaño actual: ${test.length()}`); 
// Con 12 elementos, 12 / 16 = 0.75. ¡Alcanzamos el Load Factor!

// 2. Sobrescribir nodos (No debe aumentar el tamaño ni la capacidad)
test.set('apple', 'green'); 
test.set('banana', 'green');
console.log("\n--- Después de sobrescribir ---");
console.log(`Valor de 'apple': ${test.get('apple')}`); // 'green'
console.log(`Tamaño actual (debe seguir siendo 12): ${test.length()}`);
console.log(`Capacidad actual (debe seguir siendo 16): ${test.capacity}`);

// 3. Añadir un nodo más para forzar la expansión de los buckets
test.set('moon', 'silver');
console.log("\n--- Después de forzar expansión ---");
console.log(`Tamaño actual: ${test.length()}`); // 13
console.log(`Capacidad actual tras expansión: ${test.capacity}`); // ¡Debería ser 32!

// 4. Probar los demás métodos requeridos
console.log("\n--- Pruebas de métodos ---");
console.log(`has('dog'):`, test.has('dog')); // true
console.log(`has('sun'):`, test.has('sun')); // false
console.log(`get('kite'):`, test.get('kite')); // 'pink'

console.log(`\nKeys:`, test.keys());
console.log(`\nValues:`, test.values());
console.log(`\nEntries:`, test.entries());

console.log("\n--- Probando eliminación ---");
console.log(`remove('dog'):`, test.remove('dog')); // true
console.log(`has('dog'):`, test.has('dog')); // false
console.log(`Tamaño tras borrar un nodo: ${test.length()}`);

console.log("\n--- Probando clear ---");
test.clear();
console.log(`Tamaño tras clear(): ${test.length()}`); // 0