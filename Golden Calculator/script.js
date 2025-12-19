/*//!-----------Selection---------------------------
document.querySelector('#id') //? first item met only
document.querySelectorAll('.class') //?all items  will be selected
*/
const display = document.querySelector("#paragraph");
const inputButtons = document.querySelectorAll(".inp");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const equalButton = document.querySelector("#equal");
const numpad = document.getElementById("numpad");
const operations1 = ["+", "-", "x", "/", ".", ""];
const operations2 = ["+", "-", "*","x", "/"];

const characters=[ "1","2","3","4","5","6","7","8","9","0","."]
/*//!-----------edit text---------------------------
p.innertext: raw text shown text only , checks css for visibility first
p.textContent: raw text , even unvisible by css
p.innerHTML :insert html tags and text
*/
display.value = "";
/*!-----------display properties---------------------------
console.dir(display)
*/

/*
function addinput(e) {
    let text = e.target.textContent;
    display.textContent += text;
}
function clear_func() {
    display.textContent = '';
}
function delete_func() {
    text = display.textContent;
    display.textContent = text.slice(0,text.length-1);
}
function calculate(){
    display.textContent=eval(display.textContent);
}
*/

//console.log(typeof(display.textContent))
//! event listner-----------------------------------
// --------e is event passed automatically------------------------------------------

/*
inputButtons.forEach((btn) => {
    btn.addEventListener('click', addinput);  e passed auto to function
});
clearButton.addEventListener('click',clear_func)
deleteButton.addEventListener('click',delete_func)
equalButton.addEventListener('click', () => { display.textContent = eval(display.textContent); })
*/

/*//!-------------select in an event ---------
e.target.id === 'id'
e.target.classList.contains('className')
e.target.matches('.class#id')
*/

function inputFunc(e) {
	let endChar =
		display.value.length > 1
			? display.value.slice(-1)
			: display.value;
    let numbers = display.value.split(/[\-\+x\/]/)
    if (e.target.matches(".inp")) {
		if (e.target.id === "dot") {
            if (!operations1.includes(endChar)) {
                if (!numbers[numbers.length-1].includes(".")){display.value += ".";}
			}
		} else if (e.target.matches(".opr")) {
			if (e.target.dataset.value == "-" && endChar == "") {
				display.value += e.target.textContent;
			}
            if (!operations1.includes(endChar)) {
				display.value += e.target.textContent;
			}else if (operations2.includes(endChar)) {
				display.value =
					display.value.slice(0, -1) + e.target.textContent;
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
	} else if ((e.target.id === "equal")) {
		let value = display.value.replaceAll("x", "*");
        let numbersList=[];
        let num="";
        for (const char of value){
            if (characters.includes(char)){
                num += char
            }
            else{
                numbersList.push(Number(num));
                numbersList.push(char);
                num = "" ;
            }
        }
        numbersList.push(Number(num));
        value=""
        numbersList.forEach((x)=>{value +=x;})
        // console.log(eval(value))
        try{
            if (eval(value) == Infinity || eval(value) == -Infinity){ display.value = "Error";
            setTimeout(()=>{display.value="";},500);}else{display.value = eval(value);}
        }
        catch (err){
            display.value = "Error";
            setTimeout(()=>{display.value="";},
        500);
        } finally{
            // console.log('done')
        }
	}}
numpad.addEventListener(
	"click",
	(e) => {
		if (e.target.tagName == "BUTTON") {
			inputFunc(e);
		}
	}
	// inputFunc
);
/*parentheses ) (  */
/*//!to test the fastest method-----------
console.time("method a")
method to test
console.timeEnd("method a")
*/
