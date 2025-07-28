// note: conditional import when used from the browser (or have a build config that overrides this import)
//import { URL, URLSearchParams } from "url";

class Pathfinder {
	constructor(config, states) {
		const self = this;
		// raw config
		const { context = {}, hash = false, base = "http://localhost:4000", basePath = "" } = config;
		// parsed and loaded config
		self.config = {
			context,
			hash,
			base,
			basePath,
		};
		self.states = states;
		self.current = {
			states: [],
		};
	}
	_formatPathString(pathString) {
		// strip ending slash
		if (pathString.length > 1) {
			if (pathString[pathString.length - 1] === "/") {
				return pathString.slice(0, pathString.length - 1)
			} else {
				return pathString
			}
		} else {
			return pathString
		}
	}
	_formatMatch(match) {
		const name = match.states
			.map(function (v) {
				return v.state.name;
			})
			.join(".");
		let pathParams = {};
		let searchParams = {};
		match.states.forEach(function (prefix) {
			pathParams = {
				...pathParams,
				...prefix.pathParams,
			};
			searchParams = {
				...searchParams,
				...prefix.searchParams,
			};
		});
		return {
			name,
			pathParams,
			searchParams,
		};
	}
	URLToState(url) {
		const self = this;
		const match = self._URLToState([], url);
		if (match) {
			return self._formatMatch(match);
		} else {
			throw new Error(`State could not be match for URL "${url}"`);
		}
	}
	_URLToState(prefix, url) {
		const self = this;
		const { hash, base } = self.config;
		// only uses path, search, and hash
		let parsedURL;
		try {
			parsedURL = new URL(url);
		} catch (e) {
			parsedURL = new URL(base + url);
		}
		return self.states
			.map(function (state) {
				const pathMatch = state.pathRegex.exec(hash ? parsedURL.hash.slice(1) : parsedURL.pathname);
				const pathMatchParams = {};
				const pathMatchGroup = pathMatch ? pathMatch.groups : {};
				state.path.forEach(function (param) {
					if (param in pathMatchGroup) {
						pathMatchParams[param] = pathMatchGroup[param];
					}
				});
				const searchMatch = state.search.every(function (param) {
					return typeof parsedURL.searchParams.get(param) === "string";
				});
				const searchMatchParams = {};
				state.search.forEach(function (param) {
					if (parsedURL.searchParams.has(param)) {
						searchMatchParams[param] = parsedURL.searchParams.get(param);
					}
				});
				if (pathMatch && searchMatch) {
					if (state.pathfinder) {
						// recurse
						let parsedStrippedURL;
						try {
							parsedStrippedURL = new URL(url);
						} catch (e) {
							parsedStrippedURL = new URL(base + url);
						}
						if (hash) {
							// note: why is URL.hash set to empty string if i set the hash to '#'?
							parsedStrippedURL.hash = parsedURL.hash.replace(self._formatPathString(state.pathString(pathMatch.groups)), "");
							// add leading slash if necessary
							/*
							if (parsedStrippedURL.hash && parsedStrippedURL.hash[1] !== "/") {
								parsedStrippedURL.hash = "#/" + parsedStrippedURL.hash.slice(1);
							}
							*/
						} else {
							parsedStrippedURL.pathname = parsedURL.pathname.replace(self._formatPathString(state.pathString(pathMatch.groups)), "");
							// add leading slash if necessary
							/*
							if (parsedStrippedURL.pathname && parsedStrippedURL.pathname[0] !== "/") {
								parsedStrippedURL.pathname = "/" + parsedStrippedURL.pathname;
							}
							*/
						}
						state.search.forEach(function (param) {
							parsedStrippedURL.searchParams.delete(param);
						});
						const stripped_url = parsedStrippedURL.toString();
						/*
						return state.pathfinder._URLToState(
							prefix.concat({
								state: state,
								pathParams: pathMatchParams,
								searchParams: searchMatchParams,
							}),
							stripped_url,
						);
						*/
						if (hash) {
							if (parsedStrippedURL.hash === "") {
								// terminate
								return {
									states: prefix.concat({
										state: state,
										pathParams: pathMatchParams,
										searchParams: searchMatchParams,
									}),
								};
							} else {
								return state.pathfinder._URLToState(
									prefix.concat({
										state: state,
										pathParams: pathMatchParams,
										searchParams: searchMatchParams,
									}),
									stripped_url,
								);
							}
						} else {
							if (parsedStrippedURL.pathname === "") {
								// terminate
								return {
									states: prefix.concat({
										state: state,
										pathParams: pathMatchParams,
										searchParams: searchMatchParams,
									}),
								};
							} else {
								return state.pathfinder._URLToState(
									prefix.concat({
										state: state,
										pathParams: pathMatchParams,
										searchParams: searchMatchParams,
									}),
									stripped_url,
								);
							}
						}
					} else {
						// terminate
						return {
							states: prefix.concat({
								state: state,
								pathParams: pathMatchParams,
								searchParams: searchMatchParams,
							}),
						};
					}
				} else {
					return null;
				}
			})
			.find(function (v) {
				return v;
			});
	}
	stateToURL(stateName, pathParams, searchParams) {
		const self = this;
		const match = self._stateToURL(stateName, pathParams, searchParams);
		if (match) {
			return match;
		} else {
			throw new Error(`URL could not be match for state "${stateName}"`);
		}
	}
	_stateToURL(stateName, pathParams, searchParams) {
		const self = this;
		const { hash, basePath } = self.config;
		const names = stateName.split(".");
		const fragments = names.reduce(
			function ([pathfinder, pathname, search], name) {
				const state = pathfinder.states.find(function (v) {
					return v.name === name;
				});
				if (state) {
					const pathParamsExist = state.path.every(function (param) {
						return param in pathParams;
					});
					if (pathParamsExist) {
						const searchParamsExist = state.search.every(function (param) {
							return param in searchParams;
						});
						if (searchParamsExist) {
							const searchParamsFiltered = {
								...searchParams,
							};
							state.search.forEach(function (param) {
								searchParamsFiltered[param] = searchParams[param];
							});
							return [state.pathfinder, pathname + self._formatPathString(state.pathString(pathParams)), searchParamsFiltered];
						} else {
							throw new Error(
								`Search parameters ${state.search
									.map(function (v) {
										return `"${v}"`;
									})
									.join(", ")} missing from ${JSON.stringify(searchParams)} for state "${state.name}"`,
							);
						}
					} else {
						throw new Error(
							`Path parameters ${state.path
								.map(function (v) {
									return `"${v}"`;
								})
								.join(", ")} missing from ${JSON.stringify(pathParams)} for state "${state.name}"`,
						);
					}
				} else {
					throw new Error(`State "${name}" does not exist in "${stateName}"`);
				}
			},
			[self, "", {}],
		);
		const pathname = fragments[1];
		const searchParamsFiltered = fragments[2];
		const search = new URLSearchParams(searchParamsFiltered);
		// note: query parameters must come before hash
		const url = hash ? "?" + [search.toString(), pathname].join("#") : [pathname, search.toString()].join("?");
		return hash ? basePath + url : url;
	}
	transitionByState(name, pathParams, searchParams) {
		const self = this;
		const { context } = self.config;
		// use self.current
		// convert to url and back to state
		const url = self.stateToURL(name, pathParams, searchParams);
		const match = self._URLToState([], url);
		if (match) {
			// remove common current states from new states (mimics a graph transition)
			const states = match.states.map(function (nextState) {
				const exist = self.current.states.some(function (previousState) {
					const pathParamsExist = previousState.state.path.every(function (key) {
						return nextState.pathParams[key] === previousState.pathParams[key];
					});
					const searchParamsExist = previousState.state.search.every(function (key) {
						return nextState.searchParams[key] === previousState.searchParams[key];
					});
					return nextState.state === previousState.state && pathParamsExist && searchParamsExist;
				});
				if (exist) {
					return {
						type: "PREVIOUS",
						state: nextState,
					};
				} else {
					return {
						type: "NEXT",
						state: nextState,
					};
				}
			});
			const existingStates = states
				.filter(function (v) {
					return v.type === "PREVIOUS";
				})
				.map(function (v) {
					return v.state;
				});
			const newStates = states
				.filter(function (v) {
					return v.type === "NEXT";
				})
				.map(function (v) {
					return v.state;
				});
			const existingDependencies = existingStates.reduce(function (dependencies, next) {
				return {
					...dependencies,
					[next.state.name]: self.current.dependencies[next.state.name],
				};
			}, {});
			return newStates
				.reduce(
					function (prev, next) {
						return prev.then(function (previousResolved) {
							return next.state.dependencies(context, previousResolved, next.state, next.pathParams, next.searchParams).then(function (resolved) {
								return {
									...previousResolved,
									[next.state.name]: resolved,
								};
							});
						});
					},
					new Promise(function (resolve, reject) {
						return resolve(existingDependencies);
					}),
				)
				.then(function (dependencies) {
					const result = self._formatMatch(match);
					result.context = context;
					result.dependencies = dependencies;
					self.current = match;
					self.current.dependencies = dependencies;
					return result;
				});
		} else {
			throw new Error(`Invalid transition: name=${name} pathParams=${JSON.stringify(pathParams)} searchParams=${JSON.stringify(searchParams)}`);
		}
	}
	transitionByURL(url) {
		const self = this;
		const state = self.URLToState(url);
		if (state) {
			return self.transitionByState(state.name, state.pathParams, state.searchParams);
		} else {
			throw new Error(`Invalid transition: url=${url}`);
		}
	}
}

class Director {
	constructor() {
		const self = this;
		self.handlers = {};
	}
	register(stateName, handler) {
		const self = this;
		if (self.handlers[stateName]) {
			self.handlers[stateName].push(handler);
		} else {
			self.handlers[stateName] = [handler];
		}
	}
	handle(stateName, context, dependencies, pathParams, searchParams) {
		const self = this;
		const handlers = self.handlers[stateName] ? self.handlers[stateName] : [];
		return Promise.all(
			handlers.map(function (handler) {
				return handler(context, dependencies, pathParams, searchParams);
			}),
		);
	}
}

function start(pathfinder, director, initial) {
	let previous;
	let next;
	let attempt = 0;
	const { name, pathParams = {}, searchParams = {} } = initial;

	function load(name, pathParams, searchParams) {
		const url = pathfinder.stateToURL(name, pathParams, searchParams);
		const parsedLocationURL = new URL(location.href);
		const parsedStateURL = new URL(pathfinder.config.base + url);
		parsedLocationURL.hash = parsedStateURL.hash;
		parsedLocationURL.search = parsedStateURL.search;
		parsedLocationURL.pathname = parsedStateURL.pathname;
		//location.href = parsedLocationURL.toString()
		// note: use replace to preserve browser history
		location.replace(parsedLocationURL.toString());
	}

	setInterval(function () {
		if (next !== location.href && attempt < 4) {
			previous = next;
			next = location.href;
			return pathfinder
				.transitionByURL(location.href)
				.then(function ({ context, dependencies, name, pathParams, searchParams }) {
					return director.handle(name, context, dependencies, pathParams, searchParams).then(function () {
						attempt = 0;
					});
				})
				.catch(function (err) {
					if (err.transitionByState) {
						load(err.transitionByState.name, err.transitionByState.pathParams, err.transitionByState.searchParams);
					} else if (err.transitionByURL) {
						const state = pathfinder.URLToState(err.transitionByURL);
						load(state.name, state, pathParams, state.searchParams);
					} else {
						next = previous;
						previous = null;
						attempt += 1;
						console.error(err);
					}
				});
		}
	}, 128);

	// render initial if it is not a valid state
	try {
		const current = pathfinder.URLToState(location.href);
	} catch (e) {
		load(name, pathParams, searchParams);
	}
}

export { Pathfinder, Director, start };
