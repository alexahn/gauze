const start = new Date().getTime();

var passed = 0;
var rejected = 0;

var counter = 0;
function test() {
	//var x0 = 0
	var t0 = new Date().getTime();
	var rm = 5 / 1000;
	var rs = rm * 1000;
	var x0 = rs;
	setInterval(function () {
		counter += 1;
		var t1 = new Date().getTime();
		if (x0 < rs) {
			x0 = regen(x0, t0, t1, rm);
			t0 = t1;
			passed += 1;
			//console.log('passed', passed)
		} else {
			x0 = degen(x0, t0, t1, rm);
			t0 = t1;
			// attempt
			/*
			if (x0 < rs) {
				x0 = regen(x0, t0, t1, rm)
				passed += 1
			} else {
				rejected += 1
			}
			*/
			rejected += 1;
		}
		if (counter % 100 === 0) {
			console.log("passed", counter / 100, passed);
			console.log("rejected", counter / 100, rejected);
		}
	}, 10);
}

test();

function degen(x, t0, t1, r) {
	return Math.max(0, x - (t1 - t0) * r);
}

function regen(x, t0, t1, r) {
	return x + 1;
}
