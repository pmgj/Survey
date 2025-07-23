import Survey from "./Survey.js";

let disc = ["C/C++", "Dart", "Go", "Java", "JavaScript", "PHP", "Python"];
let s = new Survey();

disc.forEach(d => s.addItem(d));
s.vote({key: "Java"});
s.vote({key: "JavaScript"});
s.vote({key: "Java"});
s.vote({key: "Python"});

console.log(s);
console.log(s.getTotal());