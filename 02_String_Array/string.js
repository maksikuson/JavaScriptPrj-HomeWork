//1
let string = "hello Java Script o o o";
space = string.search(" ");
console.log("Space number : ",space);


//2
let res = string.slice(0, 1).toUpperCase() + string.slice(1);
console.log("Old string : ", string)
console.log("New string : ", res)


//3
let words = string.split(" ");
console.log("Words : ", words)
console.log("Joined: ", words.join(','));
console.log("Words : ", words.length)


//4

/*string = "cascading style sheets";
let wordss = string.split(" ");
console.log("Words : ", wordss)
console.log("login[3]: ", wordss[0]);
console.log("login[3]: ", wordss[1]);
console.log("login[3]: ", wordss[2]);

console.log("login[3]: ", wordss[0][0]);
console.log("login[3]: ", wordss[1][0]);
console.log("login[3]: ", wordss[2][0]);

console.log(wordss[0][0] + wordss[1][0] + wordss[2][0])*/

function Abbreviation(char) {
    return char
        .split(' ') 
        .map(word => word[0].toUpperCase()) 
        .join(''); }

let string3 = "Onishchuk Iryna Anatiliivna";
console.log(Abbreviation(string3));


//5
let func = (string)=>{
    string= string.toLowerCase().replace(/\s/g, '')
    return string === string.split('').reverse().join('');
}
console.log(func('Nan'));


//6
function parseUrl(url) {
    try {
        const urlObj = new URL(url);
        return {
            protocol: urlObj.protocol.slice(0, -1),
            domain: urlObj.hostname,
            path: urlObj.pathname
        };
    } catch (error) {
        return "Invalid URL";
    }
}

let input6 = prompt("Введіть URL для завдання 6:");
console.log(parseUrl(input6));