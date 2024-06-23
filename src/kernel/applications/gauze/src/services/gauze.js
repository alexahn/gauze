import { GAUZE_PROTOCOL, GAUZE_HOST, GAUZE_PORT } from "env";

import * as jose from "jose";

// note: this is very ugly, and the architecture tries to avoid services having dependencies on each other
// todo: refactor the fetch method so we don't need this
import model from "./model.js";

class GauzeService {
	constructor() {
		const self = this;
		self.base = `${GAUZE_PROTOCOL}://${GAUZE_HOST}:${GAUZE_PORT}`;
		self.environmentJWT = localStorage.getItem("environmentJWT");
		console.log("local env jwt", localStorage.getItem("environmentJWT"));
		self.systemJWT = localStorage.getItem("systemJWT");
		console.log("local sys jwt", localStorage.getItem("systemJWT"));
		self.proxyJWT = localStorage.getItem("proxyJWT");
		console.log("local prox jwt", localStorage.getItem("proxyJWT"));
	}
	fetch(path, jwt, body) {
		const self = this;
		const headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
		};
		if (jwt) {
			headers["Authorization"] = `Bearer ${jwt}`;
		}
		return fetch(`${self.base}/${path}`, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(body),
		})
			.then(function (res) {
				if (res.status === 200) {
					return res.json();
				}
				if (res.status === 401) {
					// note: we need this code block to delete invalid sessions
					// todo: either trigger a call to verify a session is valid on proxy selection or don't rely on local model data for jwt selection
					const sessions = model.all("SESSION");
					sessions.forEach(function (session) {
						if (jwt === session.gauze__session__value) {
							model.delete("SESSION", session.gauze__session__id);
						}
					});
					// destroy this jwt
					if (self.getEnvironmentJWT() === jwt) {
						self.deleteEnvironmentJWT();
					} else if (self.getProxyJWT() === jwt) {
						self.deleteProxyJWT();
						self.deleteEnvironmentJWT();
					} else if (self.getSystemJWT() === jwt) {
						self.deleteSystemJWT();
						self.deleteProxyJWT();
						self.deleteEnvironmentJWT();
					} else {
						throw new Error("Internal error: invalid jwt");
					}
				} else if (res.status === 400) {
					return res.json();
				} else {
					return res.json();
				}
			})
			.then(function (data) {
				// todo: rethink error flows if we add field validation. for now we don't have any actionable errors from the backend, so this is sufficient.
				// todo: if we add field validation errors, we need to change this because errors are now part of the user experience.
				if (data.errors && data.errors.length) {
					throw new Error(data.errors);
				} else {
					return data;
				}
			});
	}
	environment(body) {
		const self = this;
		return self.fetch("environment/graphql", self.environmentJWT, body);
	}
	system(body) {
		const self = this;
		return self.fetch("system/graphql", self.systemJWT, body);
	}
	proxyEnvironment(body) {
		const self = this;
		return self.fetch("environment/graphql", self.proxyJWT, body);
	}
	proxySystem(body) {
		const self = this;
		return self.fetch("system/graphql", self.proxyJWT, body);
	}
	setEnvironmentJWT(jwt) {
		const self = this;
		self.environmentJWT = jwt;
		localStorage.setItem("environmentJWT", jwt);
	}
	getEnvironmentJWT() {
		const self = this;
		return self.environmentJWT;
	}
	deleteEnvironmentJWT() {
		const self = this;
		// todo: see if we can separate this
		const sessions = model.all("SESSION").filter(function (session) {
			return session.gauze__session__value === self.environmentJWT;
		});
		sessions.forEach(function (session) {
			model.delete("SESSION", session.gauze__session_id);
		});
		self.environmentJWT = null;
		localStorage.removeItem("environmentJWT");
	}
	setSystemJWT(jwt) {
		const self = this;
		self.systemJWT = jwt;
		localStorage.setItem("systemJWT", jwt);
	}
	getSystemJWT() {
		const self = this;
		return self.systemJWT;
	}
	deleteSystemJWT() {
		const self = this;
		// todo: see if we can separate this
		const sessions = model.all("SESSION").filter(function (session) {
			return session.gauze__session__value === self.systemJWT;
		});
		sessions.forEach(function (session) {
			model.delete("SESSION", session.gauze__session_id);
		});
		self.systemJWT = null;
		localStorage.removeItem("systemJWT");
	}
	setProxyJWT(jwt) {
		const self = this;
		self.proxyJWT = jwt;
		localStorage.setItem("proxyJWT", jwt);
	}
	getProxyJWT() {
		const self = this;
		return self.proxyJWT;
	}
	deleteProxyJWT() {
		const self = this;
		// todo: see if we can separate this
		const sessions = model.all("SESSION").filter(function (session) {
			return session.gauze__session__value === self.proxyJWT;
		});
		sessions.forEach(function (session) {
			model.delete("SESSION", session.gauze__session_id);
		});
		self.proxyJWT = null;
		localStorage.removeItem("proxyJWT");
	}
	getSystemAgentHeader(model) {
		const self = this;
		const headers = model.all("HEADER");
		const systemJWT = self.getSystemJWT();
		const systemJWTPayload = jose.decodeJwt(systemJWT);
		const agentHeader = headers.find(function (header) {
			return header.table_name === systemJWTPayload.agent_type;
		});
		return agentHeader;
	}
	/*
	processVariables(header, variables) {
		// modify where_like to prefix and suffix with % if and only if the field type is string
		const processed = {...variables}
		Object.keys(processed.where_like || {}).forEach(function (key) {
			const field = header.fields.find(function (field) {
				return field.name === key
			})
			console.log('key', key)
			console.log('field', field)
			if (field && field.graphql_type.name === "String") {
				
				processed.where_like[key] = '%' + variables.where_like[key] + '%'
			}
		})
		console.log('processed', processed)
		return processed
	}
	*/
	// centralize environment queries here for convenience
	personAssert(person) {
		const self = this;
		const query = `
mutation assert_person($agent_person: Environment_Mutation__Agent_Person) {
	agent {
		person {
			assert {
				email(agent_person: $agent_person) {
					success
				}
			}
		}
	}
}
`;
		const agent_person = {
			gauze__agent_person__email: person.email,
		};
		return self
			.environment({
				query: query,
				variables: {
					agent_person: agent_person,
				},
				operationName: "assert_person",
			})
			.then(function (data) {
				return data.data.agent;
			});
	}
	accountVerify(account) {
		const self = this;
		const query = `
mutation verify_account($agent_account: Environment_Mutation__Agent_Account) {
	agent {
		account {
			verify {
				password(agent_account: $agent_account) {
					success
				}
			}
		}
	}
}
`;
		const agent_account = {
			gauze__agent_account__password: account.password,
		};
		return self
			.environment({
				query: query,
				variables: {
					agent_account: agent_account,
				},
				operationName: "verify_account",
			})
			.then(function (data) {
				return data.data.agent;
			});
	}
	signIn() {
		const self = this;
		const query = `
mutation sign_in {
	environment {
		sign_in {
			gauze__session__id
			gauze__session__realm
			gauze__session__agent_id
			gauze__session__agent_type
			gauze__session__kind
			gauze__session__value
			gauze__session__seed
		}
	}
}
`;
		return self
			.environment({
				query: query,
				variables: {},
				operationName: "sign_in",
			})
			.then(function (data) {
				return data.data.environment.sign_in;
			});
	}
	signOut() {
		const self = this;
		const query = `
mutation sign_out {
	environment {
		sign_out {
			gauze__session__id
			gauze__session__realm
			gauze__session__agent_id
			gauze__session__agent_type
			gauze__session__kind
			gauze__session__value
			gauze__session__seed
		}
	}
}
`;
		return self
			.proxyEnvironment({
				query: query,
				variables: {},
				operationName: "sign_out",
			})
			.then(function (data) {
				return data.data.environment.sign_out;
			});
	}
	signUp(parameters) {
		const self = this;
		const { person, account } = parameters;
		const variables = {
			agent_root: {},
			agent_account: {
				gauze__agent_account__password: account.password,
			},
			agent_user: {},
			agent_person: {
				gauze__agent_person__email: person.email,
			},
			agent_character: {},
		};
		const query = `
mutation sign_up(
	$agent_root: Environment_Mutation__Agent_Root
	$agent_account: Environment_Mutation__Agent_Account
	$agent_user: Environment_Mutation__Agent_User
	$agent_person: Environment_Mutation__Agent_Person
	$agent_character: Environment_Mutation__Agent_Character
) {
	environment {
		sign_up(
			agent_root: $agent_root,
			agent_account: $agent_account,
			agent_user: $agent_user,
			agent_person: $agent_person,
			agent_character: $agent_character
		) {
			gauze__session__id
			gauze__session__realm
			gauze__session__agent_id
			gauze__session__agent_type
			gauze__session__kind
			gauze__session__value
			gauze__session__seed
		}
	}
}
`;
		return self
			.environment({
				query: query,
				variables: variables,
				operationName: "sign_up",
			})
			.then(function (data) {
				return data.data.environment.sign_up;
			});
	}
	enterSession(proxy) {
		const self = this;
		const query = `
mutation enter_session($proxy: Environment_Mutation__Proxy) {
	environment {
		enter_session(proxy: $proxy) {
			gauze__session__id
			gauze__session__realm
			gauze__session__agent_id
			gauze__session__agent_type
			gauze__session__value
			gauze__session__kind
			gauze__session__seed
		}
	}
}
`;
		return self
			.environment({
				query: query,
				variables: {
					proxy: proxy,
				},
				operationName: "enter_session",
			})
			.then(function (data) {
				return data.data.environment.enter_session;
			});
	}
	proxyEnterSession(proxy) {
		const self = this;
		const query = `
mutation enter_session($proxy: Environment_Mutation__Proxy) {
	environment {
		enter_session(proxy: $proxy) {
			gauze__session__id
			gauze__session__realm
			gauze__session__agent_id
			gauze__session__agent_type
			gauze__session__value
			gauze__session__kind
			gauze__session__seed
		}
	}
}
`;
		return self
			.proxyEnvironment({
				query: query,
				variables: {
					proxy: proxy,
				},
				operationName: "enter_session",
			})
			.then(function (data) {
				return data.data.environment.enter_session;
			});
	}
	proxies(proxy) {
		const self = this;
		const query = `
query read_proxy($proxy: Proxy_Query__Where) {
    read_proxy(where: $proxy) {
        _metadata {
            id
            type
        }
        attributes {
            gauze__proxy__id
            gauze__proxy__agent_type
            gauze__proxy__agent_id
            gauze__proxy__root_id
        }
    }
}
`;
		const variables = {
			proxy: {
				gauze__proxy__root_id: proxy.gauze__proxy__id,
			},
		};
		return self
			.proxySystem({
				query: query,
				variables: variables,
				operationName: "read_proxy",
			})
			.then(function (data) {
				return data.data.read_proxy;
			});
	}
	header() {
		const self = this;
		const query = `
query header {
	_header {
		name
		table_name
		primary_key
		graphql_meta_type
		default_order
		default_order_direction
		fields {
			name
			sql_type
			graphql_type {
				name
				description
			}
			description
		}
		methods {
			name
			privacy
			allowed_agent_types
		}
		graphql_attributes_string
		graphql_where_string
		graphql_query_attributes_type
		graphql_query_source_type
		graphql_query_where_type
		graphql_query_where_array_type
		graphql_query_where_string_type
		graphql_mutation_attributes_type
		graphql_mutation_source_type
		graphql_mutation_where_type
		graphql_mutation_where_array_type
		graphql_mutation_where_string_type
		relationships_to
		relationships_from
	}
}
`;
		return self
			.system({
				query: query,
				variables: {},
				operationName: "header",
			})
			.then(function (data) {
				return data.data._header;
			});
	}
	create(header, variables) {
		const self = this;
		const query = `
mutation create(
	$source: ${header.graphql_mutation_source_type},
	$attributes: ${header.graphql_mutation_attributes_type}
) {
	create_${header.name}(
		source: $source,
		attributes: $attributes,
	) {
		_metadata {
			id
			type
		}
		attributes {
			${header.graphql_attributes_string}
		}
	}
}
`;
		return self
			.system({
				query: query,
				variables: variables,
			})
			.then(function (data) {
				return data.data[`create_${header.name}`];
			});
	}
	reload(operations) {
		const self = this;
		function operationParameters(header, id) {
			return `
	$source_${id}: ${header.graphql_query_source_type},
	$count_${id}: ${header.graphql_query_where_string_type},
	$where_${id}: ${header.graphql_query_where_type},
	$where_in_${id}: ${header.graphql_query_where_array_type},
	$where_not_in_${id}: ${header.graphql_query_where_array_type},
	$where_like_${id}: ${header.graphql_query_where_type},
	$where_between_${id}: ${header.graphql_query_where_array_type},
	$limit_${id}: Int,
	$offset_${id}: Int,
	$order_${id}: String,
	$order_direction_${id}: String,`;
		}
		function operationFunction(header, id) {
			return `
    read_${id}: read_${header.name}(
        source: $source_${id},
        where: $where_${id},
        where_in: $where_in_${id},
        where_not_in: $where_not_in_${id},
        where_like: $where_like_${id},
        where_between: $where_between_${id},
        limit: $limit_${id},
        offset: $offset_${id},
        order: $order_${id},
        order_direction: $order_direction_${id}
    ) {
        _metadata {
            id
            type
        }
        attributes {
            ${header.graphql_attributes_string}
        }
    }
	count_${id}: count_${header.name}(
		source: $source_${id},
		count: $count_${id},
		where: $where_${id},
		where_in: $where_in_${id},
		where_not_in: $where_not_in_${id},
		where_like: $where_like_${id},
		where_between: $where_between_${id}
	) {
		select
		count
	}`;
		}
		function operationVariables(variables, id) {
			const prefixed = {};
			Object.keys(variables).forEach(function (key) {
				const prefixedKey = `${key}_${id}`;
				prefixed[prefixedKey] = variables[key];
			});
			return prefixed;
		}
		const buckets = [[]];
		const bucketSizes = [0];
		const bucketTransactions = [0];
		let bucketIndex = 0;
		// todo: load from env variable
		const maxHTTPSize = 1048576;
		const maxSQLTransactions = 256;
		// look up array index from node id
		const index = {};
		operations.forEach(function (operation, idx) {
			const id = operation.node.id.replaceAll("-", "_");
			const node = operation.node;
			const header = operation.header;
			index[id] = idx;
			const parametersString = operationParameters(header, id);
			const functionString = operationFunction(header, id);
			const variables = operationVariables(operation.variables, id);
			const variablesString = JSON.stringify(variables);
			// get length of all of these combined
			const size = new TextEncoder().encode(`${parametersString} ${functionString} ${variablesString}`).length;
			const transactions = 2;
			// divide maxHTTPSize by 2 as a safety buffer and divie maxSQLTransactions by 2 as a safety buffer
			if (bucketSizes[bucketIndex] + size < maxHTTPSize / 2 && bucketTransactions[bucketIndex] + transactions < maxSQLTransactions / 2) {
				// add to bucket
				buckets[bucketIndex].push({
					operationParameters: parametersString,
					operationFunction: functionString,
					operationVariables: variables,
				});
				bucketSizes[bucketIndex] = bucketSizes[bucketIndex] + size;
				bucketTransactions[bucketIndex] = bucketTransactions[bucketIndex] + transactions;
			} else {
				// make new bucket
				buckets.push([
					{
						operationParameters: parametersString,
						operationFunction: functionString,
						operationVariables: variables,
					},
				]);
				bucketSizes.push(size);
				bucketTransactions.push(transactions);
				bucketIndex = bucketIndex + 1;
			}
		});
		// do all bucket transactions in parallel and stitch together results based on aliases
		// return results in one shot (the interface for the rest of the code in orchestrate should ideally be unchanged)
		return Promise.all(
			buckets.map(function (bucket) {
				let parameters = "";
				let functions = "";
				let variables = {};
				bucket.forEach(function (segment) {
					parameters = parameters + segment.operationParameters;
					functions = functions + segment.operationFunction;
					Object.keys(segment.operationVariables).forEach(function (key) {
						variables[key] = segment.operationVariables[key];
					});
				});
				//console.log(parameters, parameters.split('\n').length)
				//console.log(functions, functions.split('\n').length)
				const query = `
query reload(
	${parameters}
) {
	${functions}
}
`;
				return self.system({
					query: query,
					variables: variables,
				});
			}),
		).then(function (results) {
			const combined = [];
			Object.keys(index).forEach(function (id) {
				combined[index[id]] = {
					node: operations[index[id]].node,
					header: operations[index[id]].header,
				};
			});
			results.forEach(function (result) {
				// parse results and stitch together a final result
				Object.keys(result.data).forEach(function (key) {
					const splitIndex = key.indexOf("_");
					const method = key.slice(0, splitIndex);
					const id = key.slice(splitIndex + 1);
					if (method === "count") {
						const count = result.data[key][0].count;
						combined[index[id]].count = count;
					} else if (method === "read") {
						const data = result.data[key].map(function (item) {
							return item.attributes;
						});
						combined[index[id]].data = data;
					}
				});
			});
			return combined;
		});
	}
	// todo: maybe generalize the query stitching by leveraging setTimeout and the equivalent of process.nextTick by batching the method calls here and dynamically stitching together a query for each event time slice
	// note: it seems like it would be possible, but it would be a little more involved
	read(header, variables) {
		const self = this;
		const query = `
query read(
	$source: ${header.graphql_query_source_type},
	$where: ${header.graphql_query_where_type},
	$where_in: ${header.graphql_query_where_array_type},
	$where_not_in: ${header.graphql_query_where_array_type},
	$where_like: ${header.graphql_query_where_type},
	$where_between: ${header.graphql_query_where_array_type},
	$limit: Int,
	$offset: Int,
	$order: String,
	$order_direction: String
) {
	read_${header.name}(
		source: $source,
		where: $where,
		where_in: $where_in,
		where_not_in: $where_not_in,
		where_like: $where_like,
		where_between: $where_between,
		limit: $limit,
		offset: $offset,
		order: $order,
		order_direction: $order_direction
	) {
		_metadata {
			id
			type
		}
		attributes {
			${header.graphql_attributes_string}
		}
	}
}
`;
		//const processed = self.processVariables(header, variables)
		return self
			.system({
				query: query,
				variables: variables,
			})
			.then(function (data) {
				return data.data[`read_${header.name}`];
			});
	}
	count(header, variables) {
		const self = this;
		const query = `
query count(
	$source: ${header.graphql_query_source_type},
	$count: ${header.graphql_query_where_string_type},
	$where: ${header.graphql_query_where_type},
    $where_in: ${header.graphql_query_where_array_type},
    $where_not_in: ${header.graphql_query_where_array_type},
	$where_like: ${header.graphql_query_where_type},
	$where_between: ${header.graphql_query_where_array_type},
) {
	count_${header.name}(
		source: $source,
		count: $count,
		where: $where,
		where_in: $where_in,
		where_not_in: $where_not_in,
		where_like: $where_like,
		where_between: $where_between
	) {
		select
		count
	}
}
`;
		return self
			.system({
				query: query,
				variables: variables,
			})
			.then(function (data) {
				return data.data[`count_${header.name}`];
			});
	}
	update(header, variables) {
		const self = this;
		const query = `
mutation update(
	$source: ${header.graphql_mutation_source_type},
	$where: ${header.graphql_mutation_where_type},
    $where_in: ${header.graphql_mutation_where_array_type},
    $where_not_in: ${header.graphql_mutation_where_array_type},
	$attributes: ${header.graphql_mutation_attributes_type},
	$limit: Int,
	$offset: Int,
	$order: String,
	$order_direction: String
) {
	update_${header.name}(
		source: $source,
		where: $where,
		where_in: $where_in,
		where_not_in: $where_not_in,
		attributes: $attributes,
		limit: $limit,
		offset: $offset,
		order: $order,
		order_direction: $order_direction
	) {
		_metadata {
			id
			type
		}
		attributes {
			${header.graphql_attributes_string}
		}
	}
}
`;
		return self
			.system({
				query: query,
				variables: variables,
			})
			.then(function (data) {
				return data.data[`update_${header.name}`];
			});
	}
	delete(header, variables) {
		const self = this;
		const query = `
mutation delete(
	$source: ${header.graphql_mutation_source_type},
	$where: ${header.graphql_mutation_where_type},
    $where_in: ${header.graphql_mutation_where_array_type},
    $where_not_in: ${header.graphql_mutation_where_array_type},
	$limit: Int,
	$offset: Int,
	$order: String,
	$order_direction: String
) {
	delete_${header.name}(
		source: $source,
		where: $where,
		where_in: $where_in,
		where_not_in: $where_not_in,
		limit: $limit,
		offset: $offset,
		order: $order,
		order_direction: $order_direction
	) {
		_metadata {
			id
			type
		}
		attributes {
			${header.graphql_attributes_string}
		}
	}
}
`;
		return self
			.system({
				query: query,
				variables: variables,
			})
			.then(function (data) {
				return data.data[`delete_${header.name}`];
			});
	}
}

export default new GauzeService();
