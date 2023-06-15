var canvS = 700;

function setup() {
	createCanvas(canvS, canvS);
	windowResized();
}

function windowResized() {
	canvS = min(windowWidth, windowHeight - 50) * 0.9;
	resizeCanvas(canvS, canvS);
}

function factorial(x) {
	let y = 1;
	for(let i = 2; i <= x; i++) {
		y *= i;
	}
	return y;
}

function coefficient(n, k) {
	return factorial(n) / (factorial(k) * factorial(n - k));
}

function coord(c) {
	return map(c, -1, 1, canvS / 4, canvS * 3 / 4);
}

function draw() {
	background(0);

	translate(canvS / 2, canvS / 2);
	scale(0.5);
	translate(-canvS / 2, -canvS / 2);

	noFill();
	stroke(255);
	strokeWeight(4);

	circle(canvS / 2, canvS / 2, canvS / 2);

	noStroke();

	let a = millis() / 1000;
	a %= PI * 2;

	let iterations = 50;

	fill(255, 0, 255);
	radians();
	circle(coord(cos(a)), coord(-sin(a)), 10);

	noFill();
	stroke(255, 0, 255);
	strokeWeight(4);
	line(coord(0), coord(-0), coord(cos(a)), coord(-sin(a)));
	noStroke();

	let cx = 0;
	let cy = 0;
	let lcx = null;
	let lcy = null;

	for(let i = 0; i < iterations; i++) {
		cx = 0;
		cy = 0;

		for(let j = 0; j <= i; j++) {
			let c = pow(a, j) / pow(i, j);
			let f = coefficient(i, j);
			f *= (j % 4) > 1 ? -1 : 1;

			let t = f * c;

			if((j % 4) % 2 == 0) {
				cx += t;
			}
			else {
				cy += t;
			}
		}
		noFill();
		stroke(125);
		strokeWeight(3);

		if(lcx !== null) {
			line(coord(cx), coord(-cy), coord(lcx), coord(-lcy));
		}

		lcx = cx;
		lcy = cy;

		noStroke();

		fill(255 * (i + 1) / iterations, 255, 0);
		circle(coord(cx), coord(-cy), 10);
	}

	resetMatrix();

	fill(255, 0, 0);

	let error = dist(cx, cy, cos(a), sin(a));
	text("Error: " + error, 50, canvS - 50);

	let d = dist(0, 0, cx, cy);

	error = dist(cx / d, cy / d, cos(a), sin(a));
	text("Normalized error: " + error, 50, canvS - 40);
}
