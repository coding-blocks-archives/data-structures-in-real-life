//Object Oriented Programming in Javascript


//allows to create objects without defining the class

//One of way creating Javascript (JSON) - Javascript Object Notation

//Another Way
function Fruit(taste,color){
	this.color = color;
	this.taste = taste;
}

//new keyword
let mango = new Fruit("sweet","yellow");
let orange = new Fruit("sour","orange");


//One Way
var apple = {
	taste:"sweet",
	color:"red",
}

//Class Keyword (ECMAScript 2015)



//Class Declaration (Not Hoisted)
class FruitClass{
	constructor(taste,color){
		this.color = color;
		this.taste = taste;
	}
};



//Class Expression (Not Hoisted)
let FruitClass2 = class{
	constructor(taste,color){
		this.color = color;
		this.taste = taste;
	}
};

//Functions - Declaration, Function Expression
let kiwi = new FruitClass("sour","green");
let kiwi2 = new FruitClass2("sour","green");


/*
var bird ={
	x:100,
	y:20,
	color:"blue",
	eggs:["one","two","three"],

	fly:function(){
		console.log("Bird is flying",this.x,this.y);
	}

};


//For Loop
for(let i =0;i<bird.eggs.length;i++){
	console.log(bird.eggs[i]);
}

//For Each Loop 
bird.eggs.forEach(function(val,idx){
	console.log(idx,val);
});
*/