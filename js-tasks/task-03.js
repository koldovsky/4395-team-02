//Geometry Basics: Circle Circumference in 2D
function circleCircumference(circle) {
  return 2 * Math.PI * circle.radius;
}

//Training JS #12: loop statement --for..in and for..of
function giveMeFive(obj) {
  const array = [];

  for (let key in obj) {
    if (key.length === 5) {
      array.push(key);
    }
    if (obj[key].length === 5) {
      array.push(obj[key]);
    }
  }

  return array;
}

// Understanding closures - the basics
function buildFun(n){

	let res = []

	for (let i = 0; i< n; i++){
		res.push(function(){
			return i
		})
	}
	return res
}

//Fun with ES6 Classes #2 - Animals and Inheritance
class Shark extends Animal {
  constructor(name, age, status) {
    super(name, age, 0, "shark", status);
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, "cat", status);
  }
  introduce() {
    return `${super.introduce()}  Meow meow!`;
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, "dog", status, master);
    this.master = master;
  }
  greetMaster() {
    return `Hello ${this.master}`;
  }
}
