function limit (x, t0, t1, r) {
	console.log('distance', t1 - t0)
	console.log('partial',  (1 / ((t1 - t0) * r)))
	console.log('degen', ((t1 - t0) * r))
	return Math.max(0, x - ((t1 - t0) * r)) //+ (1 / ((t1 - t0) * r))
}

const start = new Date().getTime()

var passed = 0
var rejected = 0

var counter = 0
function test () {
	//var x0 = 0
	var t0 = new Date().getTime()
	var rm = (5 / 1000)
	var rs = rm * 1000
	var x0 = rs
	setInterval(function () {
		counter += 1
		var t1 = new Date().getTime()
		//var x1 = degen(x0, t0, t1, rm)
		//var scaled = (1 / ((t1 - t0) * rm))
		if (x0 < rs) {
			//x0 = regen(x1, t0, t1, rm)
			x0 = regen(x0, t0, t1, rm)
			t0 = t1
			passed += 1
			//console.log('passed', passed)
		} else {
			x0 = degen(x0, t0, t1, rm)
			//t0 = t1
			//x0 = x1
			t0 = t1
			rejected += 1
			//console.log('rejected', rejected)
			//const end = new Date().getTime()
			//console.log('duration', end - start)
			
		}
		if (counter % 100 === 0) {
			console.log('passed', counter / 100, passed)
			console.log('rejected', counter / 100, rejected)
		}
	}, 10)
}

test()

function degen (x, t0, t1, r) {
	//console.log('degen', ((t1 - t0) * r))
	return Math.max(0, x - ((t1 - t0) * r))
}

function regen (x, t0, t1, r) {
	//console.log('regen', (1 / ((t1 - t0) * r)))
	//return x + (1 / (r * 1000))
	return x + 1
	//return x + (1 / ((t1 - t0) * r))
	//return Math.max(0, x + ((t1 - t0) / r))
}
