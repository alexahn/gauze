// note: conditional import when used from the browser (or have a build config that overrides this import)
import { URL, URLSearchParams } from "url"

class Pathfinder {
	constructor(states) {
		// routes
		// current
		const self = this
		self.states = states
	}
	URLToState(prefix, url) {
		const self = this
		// only uses path, search, and hash
		const objURL =  new URL(url)
		console.log(objURL)
		return self.states.map(function (state) {
			const pathMatch = state.pathRegex.exec(objURL.pathname)
			const searchMatch = state.search.every(function (param) {
				return typeof objURL.searchParams.get(param) === "string"
			})
			const searchMatchParams = {}
			state.search.forEach(function (param) {
				searchMatchParams[param] = objURL.searchParams.get(param)
			})
			console.log("pathMatch", pathMatch)
			console.log("searchMatch", searchMatch)
			if (pathMatch && searchMatch) {
				if (state.routes) {
					// continue
					// strip matched path from parsed.pathname
					// strip matched params from parsed.search
					const strippedObjURL = new URL(url)
					strippedObjURL.pathname = objURL.pathname.replace(state.pathString(pathMatch.groups), "")
					// need to add this to enable non-greedy parameter selection
					/*
					if (strippedObjURL.pathname[0] !== "/") {
						strippedObjURL.pathname = "/" + strippedObjURL.pathname
					}
					*/
					state.search.forEach(function (param) {
						strippedObjURL.searchParams.delete(param)
					})
					//strippedObjURL.search = strippedObjURL.searchParams.toString()
					const strippedURL = strippedObjURL.toString()
					console.log("strippedURL", strippedURL)
					return state.routes.URLToState(prefix.concat(state), strippedURL)
				} else {
					// terminate
					return {
						prefix: prefix,
						name: state.name,
						pathParams: pathMatch.groups,
						searchParams: searchMatchParams
					}
				}	
			} else {
				// null value represents search attempted but did not match
				return null
			}
		}).find(function (v) {
			return v
		})
	}
	StateToURL() {

	}
}

class Director {

}

export {
	Pathfinder,
	Director
}
