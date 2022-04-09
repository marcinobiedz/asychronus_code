Asynchronous programming is a technique that enables a program to start a potentially long-running task, and then rather than having to wait until that task has finished, to be able to continue to be responsive to other events while the task runs.
# Synchronus programming
Browser steps through the program one line at a time, in the order it has been written, and at each point it waits for the line to finish its work, before going on to the next line. It has to do this, because each line depends on the work that was done in the preceding lines.

Example of blocking code:
```ts
const  btn = document.querySelector('#my-button');

if (btn) {
	btn.addEventListener('click', () => {
		let  myDate;
		for (let  i = 0; i < 10000000; i++) {
			let  date = new  Date();
			myDate = date;
		}

		console.log(myDate);
		let  pElem = document.createElement('p');
		pElem.textContent = 'This is a newly-added paragraph.';
		document.body.appendChild(pElem);
	});
}
```
`console.log` needs to wait until `for` loop finishes all `new Date` calculations.
## Long-running synchronus function
This program generates a number of blue circles `SVG` elements, using a very inefficient algorithm. It will probably take a few seconds before the program renders all the elements.
```ts
const  canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);
let  ctx = canvas.getContext('2d');
let  alertBtn = document.querySelector('.alert');
let  fillBtn = document.querySelector('.fill');  

function  degToRad(degrees: number) {
	return  degrees * Math.PI / 180;
}  

function  random(min: number, max: number) {
	var  num = Math.floor(Math.random() * (max - min)) + min;
	return  num;
}  

function  expensiveOperation() {
	if(ctx){
		for (let  i = 0; i < 1000000; i++) {
			ctx.fillStyle = 'rgba(0,0,255, 0.2)';
			ctx.beginPath();
			ctx.arc(random(0, canvas.width), random(0, canvas.height), 10, degToRad(0), degToRad(360), false);
			ctx.fill()
		}
	}
}  

if(fillBtn && alertBtn){
	fillBtn.addEventListener('click', expensiveOperation);
	alertBtn.addEventListener('click', () =>
		alert('You clicked me!')
	);
}
```
## Event handlers
Event handlers are really a form of asynchronous programming: provide a function (the event handler) that will be called, not right away, but whenever the event happens. Some early asynchronous APIs used events in just this way. The `XMLHttpRequest` API enables to make HTTP requests to a remote server using JavaScript. Since this can take a long time, it's an asynchronous API, and get notified about the progress and eventual completion of a request by attaching event listeners to the `XMLHttpRequest` object.
Example of `XMLHttpRequest`:
```ts
function  loadAsset(url: string, type: XMLHttpRequestResponseType, callback: (arg: any) =>  void) {
	let  xhr = new  XMLHttpRequest();
	xhr.open('GET', url);
	xhr.responseType = type;
	  
	xhr.onload = function () {
		callback(xhr.response);
	};  

	xhr.send();
}

function  displayImage(blob: Blob) {
	let  objectURL = URL.createObjectURL(blob);
	let  image = document.createElement('img');
	image.src = objectURL;
	document.body.appendChild(image);
}  

loadAsset('coffee.jpg', 'blob', displayImage);
```
# Promises
Promises are the foundation of asynchronous programming in modern JavaScript. A promise is an object returned by an asynchronous function, which represents the current state of the operation. At the time the promise was returned to the caller, the operation often isn't finished.

To support error handling,  `Promise`  objects provides a `catch()` method. This is a lot like  `then()`: pass in a handler function. However, while the handler passed to  `then()`  is called when the asynchronous operation _succeeds_, the handler passed to  `catch()`  is called when the asynchronous operation  _fails_.

The previous example has been rewritten using promises:
```ts
console.log ('Starting');
let  image;  

fetch('coffee.jpg').then((response) => {
	console.log('It worked :)')
	return  response.blob();
}).then((myBlob) => {
	let  objectURL = URL.createObjectURL(myBlob);
	image = document.createElement('img');
	image.src = objectURL;
	document.body.appendChild(image);
}).catch((error) => {
	console.log('There has been a problem with your fetch operation: ' + error.message);
});  

console.log ('All done!');
```
Promises come with some quite specific terminology. First, a promise can be in one of three states:

- **pending**: the promise has been created,
- **fulfilled**: the asynchronous function has succeeded,  `then()`  handler is called,
- **rejected**: the asynchronous function has failed,  `catch()`  handler is called,
- **settled** to cover both **fulfilled** and **rejected**

## Combining multiple promises
Sometimes all the promises need to be fulfilled, but they don't depend on each other. In a case like that it's much more efficient to start them all off together, then be notified when they have all fulfilled. The `Promise.all()` method is more suitable here. It takes an array of promises, and returns a single promise.
The promise returned by `Promise.all()` is:

- **fulfilled** when and if _all_ the promises in the array are fulfilled,
- **rejected** when and if _any_ of the promises in the array are rejected

Example with `Promise.all()`:
```ts
function fetchAndDecode(url: string, type: string) {
	return  fetch(url).then((response): any  => {
		if(!response.ok) {
			throw  new  Error(`HTTP error! status: ${response.status}`);
		} else {
			if(type === 'blob') {
				return  response.blob();
			} else  if(type === 'text') {
				return  response.text();
			}
		}
	})
	.catch(e  => {
		console.log(`There has been a problem with your fetch operation for resource "${url}": ` + e.message);
	});
}

let  coffee = fetchAndDecode('coffee.jpg', 'blob');
let  tea = fetchAndDecode('tea.jpg', 'blob');
let  description = fetchAndDecode('description.txt', 'text'); 

Promise.all([coffee, tea, description]).then(values  => {
	console.log(values);
	let  objectURL1 = URL.createObjectURL(values[0]);
	let  objectURL2 = URL.createObjectURL(values[1]);
	let  descText = values[2];
	let  image1 = document.createElement('img');
	let  image2 = document.createElement('img');
	image1.src = objectURL1;
	image2.src = objectURL2;
	document.body.appendChild(image1);
	document.body.appendChild(image2);
	let para = document.createElement('p');
	para.textContent = descText;
	document.body.appendChild(para);
});
```
`Promise` API gives another useful methods on `Promise` object, like `Promise.any()`. Promise is fulfilled as soon as any of the array of promises is fulfilled, or rejected if all of them are rejected.

Promises work in the latest versions of all modern browsers; the only place where promise support will be a problem is in Opera Mini and IE11 and earlier versions.
# Async and await
The `async` keyword gives a simpler way to work with asynchronous promise-based code. Inside an async function use the  `await`  keyword before a call to a function that returns a promise. This makes the code wait at that point until the promise is settled, at which point the fulfilled value of the promise is treated as a return value, or the rejected value is thrown. This enables to write code that uses asynchronous functions, but looks like synchronous code.
The previous example has been rewritten with `async`, `await`:
```ts
async  function  myFetch() {
	let  response = await  fetch('coffee.jpg');
	if (!response.ok) {
		throw  new  Error(`HTTP error! status: ${response.status}`);
	} else {
		return  await  response.blob();
	}
}

myFetch().then((blob) => {
	let  objectURL = URL.createObjectURL(blob);
	let  image = document.createElement('img');
	image.src = objectURL;
	document.body.appendChild(image);
}).catch(e  =>  console.log(e));
```
`try...catch` block can be used for error handling, exactly as if the code were synchronous:
```ts
async  function  myFetch() {
	try {
		let  response = await  fetch('coffee.jpg');
		if (!response.ok) {
			throw  new  Error(`HTTP error! status: ${response.status}`);
		} else {
			let  myBlob = await  response.blob();
			let  objectURL = URL.createObjectURL(myBlob);
			let  image = document.createElement('img');
			image.src = objectURL;
			document.body.appendChild(image);
		}
	} catch(e) {
		console.log(e);
	}
}  

myFetch();
```
# Workers
Workers give the ability to run some tasks in a different thread, then continue with other processing. With multithreaded code, we never know when a thread will be suspended and the other thread will get a chance to run. So if both threads have access to the same variables, it's possible for a variable to change unexpectedly at any time, and this causes bugs that are hard to find. To avoid these problems in the web, main code and worker code never get direct access to each others' variables. Workers and the main code run in completely separate worlds, and only interact by sending each other messages.
The first example has been rewritten using `Worker`:
```ts
// index.ts
const  btn = document.querySelector('button');
const  worker = new  Worker('worker.js');  

if (btn) {
	btn.addEventListener('click', () => {
		worker.postMessage('Go!');

		let  pElem = document.createElement('p');
		pElem.textContent = 'This is a newly-added paragraph.';
		document.body.appendChild(pElem);
	});  

	worker.onmessage = function (e) {
		console.log(e.data);
	}
}
```
```ts
// worker.ts
onmessage = function () {
	let  myDate;
	for (let  i = 0; i < 10000000; i++) {
		let  date = new  Date();
		myDate = date
	} 

	postMessage(myDate);
}
```
# Bibliography
- [Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- [Asynchronous Programming](https://eloquentjavascript.net/11_async.html)
- [We have a problem with promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)
- [Let's talk about how to talk about promises](https://thenewtoys.dev/blog/2021/02/08/lets-talk-about-how-to-talk-about-promises/)