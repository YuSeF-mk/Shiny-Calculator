/*//! ----Selection--
document.querySelector('#id') //? first item met only
document.querySelectorAll('.class') //?all items  will be selected
document.getElementById("numpad")
//?better to stick to one type  of selecting */
const display = document.querySelector("#paragraph");
const inputButtons = document.querySelectorAll(".inp");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const equalButton = document.querySelector("#equal");
const numpad = document.getElementById("numpad");
const operations1 = ["+", "-", "x", "/", ".", ""];
const operations2 = ["+", "-", "*", "x", "/"];
const characters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
/*//! ----edit text--
p.innertext: raw text shown text only , checks css for visibility first
p.textContent: raw text , even unvisible by css
p.innerHTML :insert html tags and text*/
display.value = "";
//! ----display properties of Objects: console.dir(display)--
//console.log(typeof(display.textContent))
//! ----event listner--
//! ----e argument  passed automatically in events--
//! ----select in an event ---------
/*e.target.id === 'id'
e.target.classList.contains('className')
e.target.matches('.class#id')*/
function inputFunc(e) {
	let endChar =
		display.value.length > 1 ? display.value.slice(-1) : display.value;
	let numbers = display.value.split(/[\-\+x\/]/);
	if (e.target.matches(".inp")) {
		if (e.target.id === "dot") {
			if (!operations1.includes(endChar)) {
				if (!numbers[numbers.length - 1].includes(".")) {
					display.value += ".";
				}
			}
		} else if (e.target.matches(".opr")) {
			if (e.target.dataset.value == "-" && endChar == "") {
				display.value += e.target.textContent;
			}
			if (!operations1.includes(endChar)) {
				display.value += e.target.textContent;
			} else if (operations2.includes(endChar)) {
				display.value = display.value.slice(0, -1) + e.target.textContent;
			}
		} else {
			display.value += e.target.textContent;
		}
	} else if (e.target.id == "clear") {
		display.value = "";
	} else if (e.target.id == "delete") {
		if (display.value.length > 1) {
			let text = display.value;
			let textKeep = text.slice(0, -1);
			display.value = textKeep;
		} else {
			display.value = "";
		}
	} else if (e.target.id === "equal") {
		//this is for the error produced with this kind of numbers:  05.23   005.2  006.1  0000008.3
		let value = display.value.replaceAll("x", "*");
		let numbersList = [];
		let num = "";
		for (const char of value) {
			if (characters.includes(char)) {
				num += char;
			} else {
				numbersList.push(parseFloat(num));
				// parseFloat parseInt Number
				numbersList.push(char);
				num = "";
			}
		}
		numbersList.push(Number(num));
		value = "";
		// numbersList.forEach((x)=>{value +=x;})
		value = numbersList.join("");
		try {
			if (eval(value) == Infinity || eval(value) == -Infinity) {
				display.value = "Zero division Error";
				setTimeout(() => {
					display.value = "";
				}, 500);
			} else {
				display.value = eval(value);
			}
		} catch (err) {
			display.value = "Error";
			setTimeout(() => {
				display.value = "";
			}, 500);
		} finally {
			// console.log('done')
		}
	}
}
numpad.addEventListener(
	"click",
	(e) => {
		if (e.target.tagName == "BUTTON") {
			inputFunc(e);
		}
	}
	// inputFunc
);
//! ----to test the fastest method--
/*console.time("method a")
method to test
console.timeEnd("method a")*/

function createParticles() {
	const background = document.querySelector(".background");
	for (let i = 0; i < 20; i++) {
		const p = document.createElement("div");
		p.className = "particle";
		let size = Math.random() * 5 + "px";
		p.style.width = size;
		p.style.height = size;
		p.style.left = Math.random() * 100 + "%";
		p.style.top = Math.random() * 100 + "%";
		p.style.animationDelay = Math.random() * 5 + "s";
		background.appendChild(p);
        /*adding an element */
	}
}
createParticles();
