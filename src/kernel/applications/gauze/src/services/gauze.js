import { GAUZE_PROTOCOL, GAUZE_HOST, GAUZE_PORT } from "env";

import * as jose from "jose";

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
