
let a = 10;
console.log(a);

let b = [1,2,3,4,5];
console.log(b);
console.log("Hello World");


//Javascript 
// Variables, Arrays, Functions,Loops, Classes, Objects

c = 20; //Global Variable
var d = 30; //Function Scope
let e = 50; // Block Scope


let arr = ["Apple","Mango","Guava"];
console.log(arr);

for(let i=0;i<5;i++){
	console.log(arr[i]);
}

arr.push("Banana"); //Insert at back
arr.pop(); ///remove from back
arr.shift(); //remove from front
arr.unshift("Kiwi"); //insert at front
arr.indexOf("Kiwi"); //finds you the index;


if(arr[0]=="Apple"){
	console.log("Apple");
}
else{
	console.log("No it is",arr[0]);
}





//Function Declaration
function fun(){

	let a = 5;
	if(a===5){
		f = 100; //let has a block scope, var has a function scope
		console.log("Inside",f);
	}
	console.log("Outside",f);

}
fun();
console.log("Global ",f);

square_root(10);



function square_root(n){

	console.log("In first sqrt fn");
	//console.log(Math.sqrt(n));
	return;
}


//Function Hoisting
// Function Expression
var sqrt_n = function(){
	console.log("In second Sqrt Fn");
	return ;
}

sqrt_n(10);


*/















