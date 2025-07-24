// note: conditional import when used from the browser (or have a build config that overrides this import)
import { URL, URLSearchParams } from "url"

class Pathfinder {
	constructor(states) {
		// routes
		// current
		const self = this
		self.states = states
	}
	URLToState(url) {
		const self = this
		const host = "http://localhost:4000"
		let fullURL = url
		try {
			const objURL = new URL(url)
			fullURL = url
		} catch (e) {
			const objURL = new URL(host + url)
			fullURL = host + url
		}
		const found = self._URLToState([], fullURL)
		if (found) {
			// we have enough information to construct a response
			// flatten name, pathParams, and searchParams
			const name = found.prefix.map(function (v) {
				return v.state.name
			}).concat(found.state.name).join('.')
			let pathParams = {
				...found.pathParams
			}
			let searchParams = {
				...found.searchParams
			}
			found.prefix.forEach(function (prefix) {
				pathParams = {
					...pathParams,
					...prefix.pathParams
				}
				searchParams = {
					...searchParams,
					...prefix.searchParams
				}
			})
			return {
				name,
				pathParams,
				searchParams
			}
		} else {
			return found
		}
	}
	_URLToState(prefix, url) {
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
				if (state.pathfinder) {
					// continue
					// strip matched path from parsed.pathname
					// strip matched params from parsed.search
					const strippedObjURL = new URL(url)
					strippedObjURL.pathname = objURL.pathname.replace(state.pathString(pathMatch.groups), "")
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
					return state.pathfinder._URLToState(prefix.concat({
						state: state,
						pathParams: pathMatch.groups,
						searchParams: searchMatchParams
					}), strippedURL)
				} else {
					// terminate
					return {
						prefix: prefix,
						state: state,
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
	StateToURL(name, pathParams, searchParams) {
		const self = this;
		const names = name.split('.')
		console.log("names", names)
		const fragments = names.reduce(function ([pathfinder, pathname], name) {
			console.log("pathfinder", pathfinder)
			console.log("pathname", pathname)
			const state = pathfinder.states.find(function (v) {
				return v.name === name
			})
			return [state.pathfinder, pathname + state.pathString(pathParams)]
		}, [self, ""])
		const pathname = fragments[1]
		const search = new URLSearchParams(searchParams)
		const url = [pathname, search.toString()].join('?')
		console.log("pathname", pathname)
		return url
	}
	transitionByState(name, pathParams, searchParams) {
		const self = this
		// use self.current
		
	}
	transitionByURL(url) {

	}
}

class Director {

}

export {
	Pathfinder,
	Director
}
