//1
let array1 = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
console.log(array1);

//2
array1.forEach((e, i) => console.log(`[${i + 1}] – ${e}`));

//3
let has7 = array1.some(num => num % 7 === 0);
console.log(has7 ? "Has a multiple of 7" : "Does not have a multiple of 7");

//4
array1.sort((a, b) => b - a);
console.log(array1);

//5
array1.fill(0, Math.floor(array1.length / 2));
console.log(array1);

//6
array1.splice(0, 3);
console.log(array1);

//7
let hasDupes = new Set(array1).size !== array1.length;
console.log(hasDupes ? "Has the same" : "Has no same");

//8
let newArr = array1.slice(1, array1.length - 1);
console.log(newArr);

//9
let evenCount = array1.filter(num => num % 2 === 0).length;
console.log(evenCount);