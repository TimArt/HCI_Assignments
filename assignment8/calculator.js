// this gives us the order of the buttons, which we can use to step through the buttons in various directions
// since we know the layout, + 1 moves to the next item, -1 previous, +4 is one row down, -4 is one row up
buttonOrder = ["#button7","#button8","#button9","#buttonDivide","#button4","#button5","#button6","#buttonMultiply","#button1","#button2","#button3","#buttonAdd","#button0","#buttonClear","#buttonEquals","#buttonSubtract"];

// add the selected class to an item. you can pass this any jquery selector, such as #id or .class
// calling this will de-select anything currently selected
function selectItem(name) {
	$("button").removeClass("cursor");
	$(name).addClass("cursor")
}

// gets the currently selected item, and returns its #id
// returns null if no item is selected
// note that if multiple items are selected, this will only return the first
// but you could rewrite this to return a list of items if you wanted to track multiple selections
function getSelectedItem() {
	selected = $(".cursor"); // this returns an array
	if (selected.length == 0) {
		return null;
	}
	else {
		return "#" + selected.first().attr('id')
	}
}

// the next four functions move the selected UI control
// this uses the array buttonOrder to know the order of the buttons. so you could change buttonOrder
// to change the order that controls are highlighted/
// if no button is currently selected, such as when the page loads, this will select the first
// item in buttonOrder (which is the 7 button)
// selectNext: go to the right, wrapping around to the next row
// selectPrevious: go to the left, wrapping around to the previous row
// selectUp: select the item above
// selectDown: select the item below

function selectNext() {
	selected = getSelectedItem()
	if (selected == null) {
		selectItem(buttonOrder[0]);
	} else {
		index = buttonOrder.indexOf(selected);
		index = (index + 1) % buttonOrder.length;
		selectItem(buttonOrder[index])
	}
}

function selectPrevious() {
	selected = getSelectedItem()
	if (selected == null) {
		selectItem(buttonOrder[0]);
	} else {
		index = buttonOrder.indexOf(selected);
		index = (index - 1);
		if (index < 0) index = buttonOrder.length + index
		selectItem(buttonOrder[index])
	}
}

function selectUp() {
	selected = getSelectedItem()
	if (selected == null) {
		selectItem(buttonOrder[0]);
	} else {
		index = buttonOrder.indexOf(selected);
		index = (index - 4);
		if (index < 0) index = buttonOrder.length + index
		selectItem(buttonOrder[index])
	}
}

function selectDown() {
	selected = getSelectedItem()
	if (selected == null) {
		selectItem(buttonOrder[0]);
	} else {
		index = buttonOrder.indexOf(selected);
		index = (index + 4) % buttonOrder.length;
		selectItem(buttonOrder[index])
	}
}

// actuate the currently selected item
// if no item is selected, this does nothing
// if multiple items are selected, this selects the first
function clickSelectedItem() {
	whichButton = getSelectedItem();
	if (whichButton != null) {
		$(whichButton).click();
	}
}

// Tim's Code ==================================================================

quad0Buttons = ["button7","button8","button4","button5"];
quad1Buttons = ["button9","buttonDivide","button6","buttonMultiply"];
quad2Buttons = ["button1","button2","button0","buttonClear"];
quad3Buttons = ["button3","buttonAdd","buttonEquals","buttonSubtract"];

var isQuadrantSelecting = true;
var isNumberSelecting = false;
var quadrantIndex = 0;
var buttonIndex = 0;
var calculator = document.getElementById('calculator_buttons');
const MULTI_KEY_PRESS_DELTA_TIME = 300;
var timesPressed = 0;
function selectLoop()
{
	if (isQuadrantSelecting)
	{
		switch (quadrantIndex) {
			case 0:
				calculator.classList.remove ('quad--top-left');
				calculator.classList.add ('quad--top-right');
				break;
			case 1:
				calculator.classList.remove ('quad--top-right');
				calculator.classList.add ('quad--bottom-left');
				break;
			case 2:
				calculator.classList.remove ('quad--bottom-left');
				calculator.classList.add ('quad--bottom-right');
				break;
			case 3:
				calculator.classList.remove ('quad--bottom-right');
				calculator.classList.add ('quad--top-left');
				break;
			default:
				break;
		}

		quadrantIndex = (quadrantIndex + 1) % 4;
	}
	else if (isNumberSelecting)
	{

		switch (quadrantIndex) {
			case 0:
				document.getElementById(quad0Buttons[buttonIndex]).focus();
				break;
			case 1:
				document.getElementById(quad1Buttons[buttonIndex]).focus();
				break;
			case 2:
				document.getElementById(quad2Buttons[buttonIndex]).focus();
				break;
			case 3:
				document.getElementById(quad3Buttons[buttonIndex]).focus();
				break;
			default:
				break;
		}

		buttonIndex = (buttonIndex + 1) % 4;
	}
}

// Main selection loop
var interval = null;

function startSelectionLoop()
{
	interval = setInterval (function() { selectLoop() }, 300);
}

function stopSelectionLoop()
{
	clearInterval (interval);
}

startSelectionLoop();

function enableQuadrantSelectionMode()
{
	isNumberSelecting = false;
	document.activeElement.blur();
	quadrantIndex = 0;
	buttonIndex = 0;
	calculator.classList.remove ('quad--no-background');
	isQuadrantSelecting = true;
}

function enableNumberSelectionMode()
{
	isQuadrantSelecting = false;
	isNumberSelecting = true;
	calculator.classList.add ('quad--no-background');
}

// this function responds to user key presses
// you'll rewrite this to control your interface using some number of keys
$(document).keypress(function(event) {

	// Spacebar keypress
	if (event.key == 'a') {

		if (isQuadrantSelecting)
		{
			enableNumberSelectionMode();
		}
		else if (isNumberSelecting)
		{
			timesPressed++;

			// At a later time, run the single keypress event if another
			// keypress has not already happened
			if (timesPressed == 1)
			{
				stopSelectionLoop();
				setTimeout(function() {
					if (isNumberSelecting && timesPressed == 1)
					{
						document.activeElement.click();
						enableQuadrantSelectionMode();
						startSelectionLoop();
					}
					timesPressed = 0;

				}, MULTI_KEY_PRESS_DELTA_TIME);
			}
			// If double keypress, go back
			else if (timesPressed == 2)
			{
				enableQuadrantSelectionMode();
				startSelectionLoop();
				timesPressed = 0;
			}
		}
	}
})


// Calculator Code =============================================================
// for operations, we'll save + - / *
firstValue = null;
operation = null;
addingNumber = false;

digits = "0123456789"
operators = "+-*/"

// handle calculator functions. all buttons with class calcButton will be handled here
$(".calcButton").click(function(event) {
	buttonLabel = $(this).text();

	// if it's a number, add it to our display
	if (digits.indexOf(buttonLabel) != -1) {
		// if we weren't just adding a number, clear our screen
		if (!addingNumber) {
			$("#number_input").val("")
		}
		$("#number_input").val($("#number_input").val() + buttonLabel);
		addingNumber = true;
	// if it's an operator, push the current value onto the stack
	} else if (operators.indexOf(buttonLabel) != -1) {
		// have we added a number? if so, check our stack
		if (addingNumber) {
			// is this the first number on the stack?
			// if so, save it
			if (firstValue == null) {
				firstValue = $("#number_input").val();
				addingNumber = false;
			// do we have a number on the stack already? if so, this is the same as equals
			} else if (firstValue != null) {
				secondValue = $("#number_input").val();
				evaluateExpression(firstValue,operation,secondValue)
				// in this case, keep the operation
				firstValue = $("#number_input").val();
				addingNumber = false;
			}
		}
		// either way, save this as the most recent operation
		operation = buttonLabel;
	} else if (buttonLabel == "C") {
		$("#number_input").val("");
		firstValue = null;
		operation = null;
		addingNumber = false;
	} else if (buttonLabel == "=") {
		if (firstValue != null && operation != null && addingNumber) {
			secondValue = $("#number_input").val();
			evaluateExpression(firstValue,operation,secondValue);
			// clear our state
			firstValue = null;
			operation = null;
			addingNumber = true
		}
	}
})

// do the math for our calculator
function evaluateExpression(first,op,second) {
	output = 0;
	if (op == "+") {
		output = parseInt(first) + parseInt(second);
	} else if (op == "-") {
		output = parseInt(first) - parseInt(second);
	} else if (op == "*") {
		output = parseInt(first) * parseInt(second);
	} else if (op == "/") {
		output = parseInt(first) / parseInt(second);
	}

	// now, handle it
	$("#number_input").val(output.toString());
	// deal with state elsewhere
}
