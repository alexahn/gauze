class Router {
	constructor() {
		// routes
		// current
	}
	URLToState() {

	}
	StateToURL() {

	}
}

// create routers
// instantiate routes (will create array structured lookup)

// routes class
/*
const pathfinder2 = new Pathfinder([{
	name: "world",
	regex: "/world",
	string: function (groups) {
		return "/world"
	},
	method: "GET",
	dependencies: function (ctx) {
		// ctx is resolved parent dependencies (e.g. ctx.hello.10)
		return {
			y: 20
		}
	},
	routes: []
}])

const pathfinder = new Pathfinder([{
	name: "hello",
	regex: "/hello",
	string: function (groups) {
		return "/hello"
	},
	method: "GET",
	dependencies: function (ctx) {
		return {
			x: 10
		}
	},
	routes: pathfinder2
}])
*/

/*
const director = new Director({
	
})
director.handle("hello.world", function (route, params, dependencies) {

})
director.handle("hello", function (route, params, dependencies) {
	redirect(pathfinder.StateToURL("hello.world", params, dependencies)
})
*/

/*
URLtoState()
StateToURL()
pathfinder.navigateToURL(URL).then(function (route, params, dependencies) {})
pathfinder.navigateToState(name, params).then(function (route, params, dependencies) {}
	director.navigate(route, params, dependencies);
})
*/
