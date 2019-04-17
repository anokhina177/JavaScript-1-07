var date = new Date();
var timestamp = date.getTime();

var day = date.getDay();
var month = date.getMonth(); //Be careful! January is 0 not 1
var year = date.getFullYear();
var hour = date.getHours();
var minutes = date.getMinutes();
document.getElementById("time").innerText = `Today is: ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}. Current time: ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

var canvas = document.querySelector('#canv');
var ctx = canvas.getContext('2d');

var xCoord = document.getElementById('xCoord');
var yCoord = document.getElementById('yCoord');

var xCoordInitial = -1;
var yCoordInitial = -1;

var getCoordinates = function (evt) {
	let arr = {};
	let x = evt.offsetX;
	let y = evt.offsetY;

	xCoord.innerText = x;
	yCoord.innerText = y;
};

var system = {
	currentTool : '',
	currentColor : "#FF0000",
	currentFillColor : "#00FF00",
	brushSize : 5
};

var renderSystem = function (obj, elem, action) { 
	//obj -> change
	obj[elem] = action; 
	console.log(obj);
};

var switchTool = function (el) {
	switch (el.id) {
		case "brush":
			return "brush"
			break;
		case "line":
			return "line"
			break;
		case "rectangle":
			return "rectangle"
			break;
		case "circle":
			return "circle"
			break;
		default:
			break;
	}
};

var clicker = function (evt) {
	if (evt.target.classList.contains('toolButton') == true) {
		//console.log (`Выбран инструмент ${evt.target.id}`);
		renderSystem (system, 'currentTool', switchTool (evt.target));
	}
};

var changeColor = function(evt) {
	renderSystem (system, 'currentColor', evt.target.value);
}


var changeFillColor = function(evt) {
	renderSystem (system, 'currentFillColor', evt.target.value);
}


var changeBrushSize = function(evt) {
	renderSystem (system, 'brushSize', evt.target.value);
}


var startDraw = function (evt) {
	//зафиксировать нач коорд
	//начать процесс рисования
	switch (system.currentTool) {
		case "brush":
			draw(evt)
			xCoordInitial = -1;
			yCoordInitial = -1;
			break;
		case "line":
			xCoordInitial = evt.offsetX;
			yCoordInitial = evt.offsetY;
			break;
		case "rectangle":
			xCoordInitial = evt.offsetX;
			yCoordInitial = evt.offsetY;
			break;
		case "circle":
			xCoordInitial = evt.offsetX;
			yCoordInitial = evt.offsetY;
			break;
		default:
			break;
	}
	
};

var endDraw = function (evt) {
	//console.log('end');
	switch (system.currentTool) {
		case "line":
			drawLine(xCoordInitial, yCoordInitial, evt.offsetX, evt.offsetY);
			break;
		case "rectangle":
			drawRectangle(xCoordInitial, yCoordInitial, evt.offsetX, evt.offsetY);
			break;
		case "circle":
			drawCircle(xCoordInitial, yCoordInitial, evt.offsetX, evt.offsetY);
			break;
		default:
			break;
	}
	canvas.onmousemove = null;
};

var draw = function (evt) {
	if (system.currentTool == "brush")
		canvas.onmousemove = function (evt) {
			ctx.fillRect (xCoord.innerText, yCoord.innerText, system.brushSize, system.brushSize);
			ctx.fillStyle = system.currentColor;
		}
};


var drawLine = function(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.strokeStyle = system.currentColor;
	ctx.lineWidth = system.brushSize;

	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	xCoordInitial = x2;
	yCoordInitial = y2;
}


var drawRectangle = function(x1, y1, x2, y2) {
	ctx.beginPath();

	ctx.strokeStyle = system.currentColor;
	ctx.lineWidth = system.brushSize;
	ctx.fillStyle = system.currentFillColor;

	ctx.rect(x1, y1, x2-x1, y2-y1);
	ctx.fill();
	ctx.stroke();
	
	xCoordInitial = x2;
	yCoordInitial = y2;
}


var drawCircle = function(x, y, x2, y2) {
	ctx.beginPath();
	ctx.strokeStyle = system.currentColor;
	ctx.lineWidth = system.brushSize;
	ctx.fillStyle = system.currentFillColor;
	let radius = Math.sqrt(Math.pow(x-x2, 2) + Math.pow(y-y2, 2))
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
	xCoordInitial = -1;
	yCoordInitial = -1;
}

canvas.addEventListener ('mousemove', getCoordinates);
canvas.addEventListener ('mousedown', startDraw);
canvas.addEventListener ('mouseup', endDraw);
window.addEventListener ('click', clicker);

document.getElementById("color").addEventListener("change", changeColor);
document.getElementById("fillcolor").addEventListener("change", changeFillColor);
document.getElementById("sizeSelect").addEventListener("change", changeBrushSize);




//ctx.fillRect (x0, y0, width(px), height(px));

// ctx.fillRect (0, 0, 100, 100);

// ctx.fillStyle = 'white';
// ctx.fillRect (50, 50, 100, 100);

//ctx.fillStyle = '#7700ff';
//ctx.fillRect (200, 200, 100, 100);

// ctx.beginPath();
// ctx.strokeStyle = 'red';
// ctx.fillStyle = 'blue';

// ctx.moveTo (100, 100);
// ctx.lineTo (300, 300);
// ctx.moveTo (100, 100);
// ctx.lineTo (300, 100);
// ctx.moveTo (300, 100);
// ctx.lineTo (300, 300);

// ctx.rect (40,100, 50, 50);
// ctx.fill ();
// ctx.stroke ();



//canvas.addEventListener ('click', function (evt) {console.log (evt)} );



