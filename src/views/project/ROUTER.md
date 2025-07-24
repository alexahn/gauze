# Router (Sinew or Zenith)

## Architecture
```
const route = {
	name: "route1",
	regex: "/?<var>(.*)",
	string: function (groups) {
		return "/${groups.var}"
	},
	data: function () {

	}
}

const root = React.createRoot(document.getElementById("root"))

const pathfinder = new Pathfinder({
	// route name
	"/regex_for_path_for_route1": function () {
		// route data
		return await fetch()
	}
})
// ctx only exists within a route change (context for request/response)
// state exists outside of a route change (state of the application)
// route is output from pathfinder (holds route name, route params, route data)
const voyager = new Voyager({
	"route1": function (ctx, state, route) {
		// params and data
		service.updateDate(data)
		if (ENVIRONMENT === "BROWSER") {
			/*
			setState(function (state) {
				return {
					...state,
					view: {
						layout: layout,
						views: views
					}
				}
			})
			*/
			root.render(<layout state={state} router={pathfinder} route={route} views={views} />)
		} else if (ENVIRONMENT === "SERVER") {
			ctx.response.body = Server.renderToString(<layout state={state} router={pathfinder} route={path} views={views} />)
		} else {

		}
	}
})
const route = pathfinder.getState(URL)


```
