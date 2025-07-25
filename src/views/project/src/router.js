// note: conditional import when used from the browser (or have a build config that overrides this import)
import { URL, URLSearchParams } from "url"

/*
	note: currently pathParams values will get coerced into a string and used as a group variable during URL construction
*/

class Pathfinder {
	constructor(states) {
		// routes
		// current
		const self = this
		self.states = states
	}
	_concatMatch(match) {
		const name = match.prefix.map(function (v) {
			return v.state.name
		}).concat(match.state.name).join('.')
		let pathParams = {
			...match.pathParams
		}
		let searchParams = {
			...match.searchParams
		}
		match.prefix.forEach(function (prefix) {
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
	}
	URLToState(url) {
		const self = this
		const found = self._URLToState([], url)
		if (found) {
			return self._concatMatch(found)
		} else {
			throw new Error(`State could not be found for URL "${url}"`)
		}
	}
	_URLToState(prefix, url) {
		const self = this
		// only uses path, search, and hash
		let objURL
		const host = "http://localhost:4000"
		try {
			objURL = new URL(url)
		} catch (e) {
			objURL = new URL(host + url)
		}
		return self.states.map(function (state) {
			const pathMatch = state.pathRegex.exec(objURL.pathname)
			const searchMatch = state.search.every(function (param) {
				return typeof objURL.searchParams.get(param) === "string"
			})
			const searchMatchParams = {}
			state.search.forEach(function (param) {
				searchMatchParams[param] = objURL.searchParams.get(param)
			})
			if (pathMatch && searchMatch) {
				if (state.pathfinder) {
					let strippedObjURL
					try {
						strippedObjURL = new URL(url)
					} catch (e) {
						strippedObjURL = new URL(host + url)
					}
					strippedObjURL.pathname = objURL.pathname.replace(state.pathString(pathMatch.groups), "")
					state.search.forEach(function (param) {
						strippedObjURL.searchParams.delete(param)
					})
					const strippedURL = strippedObjURL.toString()
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
	StateToURL(stateName, pathParams, searchParams) {
		const self = this;
		const names = stateName.split('.')
		const fragments = names.reduce(function ([pathfinder, pathname], name) {
			const state = pathfinder.states.find(function (v) {
				return v.name === name
			})
			if (state) {
				const paramsExist = state.path.every(function (path) {
					return path in pathParams
				})
				if (paramsExist) {
					return [state.pathfinder, pathname + state.pathString(pathParams)]
				} else {
					throw new Error(`Path parameters ${state.path.map(function (v) { return `"${v}"` }).join(", ")} missing from ${JSON.stringify(pathParams)} for state "${state.name}"`)
				}
			} else {
				throw new Error(`State "${name}" does not exist in "${stateName}"`)
			}
		}, [self, ""])
		const pathname = fragments[1]
		const search = new URLSearchParams(searchParams)
		const url = [pathname, search.toString()].join('?')
		return url
	}
	transitionByState(name, pathParams, searchParams) {
		const self = this
		// use self.current
		// convert to url and back to state
		const url = self.StateToURL(name, pathParams, searchParams)
		const found = self._URLToState([], url)
		if (found) {
			let currentStates = []
			if (self.current) {
				currentStates = self.current.prefix.concat(self.current)
			}
			// remove common current states from new states (mimics a graph transition)
			const newStates = found.prefix.concat(found).map(function (state) {
				const exist = currentStates.some(function (currentState) {
					return state.state === currentState.state
				})
				if (exist) {
					return null
				} else {
					return state
				}
			}).filter(function (v) {
				return v
			})
			const existingStates = found.prefix.concat(found).map(function (state) {
				const exist = currentStates.some(function (currentState) {
					return state.state === currentState.state
				})
				if (exist) {
					return state
				} else {
					return null
				}
			}).filter(function (v) {
				return v
			})
			const existingDependencies = existingStates.reduce(function (dependencies, next) {
				return {
					...dependencies,
					[next.state.name]: self.current.dependencies[next.state.name]
				}
			}, {})
			return newStates.reduce(function (prev, next) {
				return prev.then(function (previousResolved) {
					return next.state.dependencies(previousResolved, next.state, next.pathParams, next.searchParams).then(function (resolved) {
						return {
							...previousResolved,
							[next.state.name]: resolved
						}
					})
				})
			}, new Promise(function (resolve, reject) {
				return resolve(existingDependencies)
			})).then(function (dependencies) {
				const concat = self._concatMatch(found)
				concat.dependencies = dependencies
				self.current = found
				self.current.dependencies = dependencies
				return concat
			})
		} else {
			throw new Error(`Invalid transition: name=${name} pathParams=${JSON.stringify(pathParams)} searchParams=${JSON.stringify(searchParams)}`)
		}
	}
	transitionByURL(url) {
		const self = this
		const state = self.URLToState(url)
		if (state) {
			return self.transitionByState(state.name, state.pathParams, state.searchParams)
		} else {
			throw new Error(`Invalid transition: url=${url}`)
		}
	}
}

class Director {

}

export {
	Pathfinder,
	Director
}
