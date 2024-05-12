import { GAUZE_PROTOCOL, GAUZE_HOST, GAUZE_PORT } from "env";

class GauzeClient {
	constructor() {
		const self = this;
		self.base = `${GAUZE_PROTOCOL}://${GAUZE_HOST}:${GAUZE_PORT}`;
		self.environmentJWT = null;
		self.systemJWT = null;
		self.proxyJWT = null;
	}
	fetch(path, jwt, body) {
		const self = this;
		return fetch(`${self.base}/${path}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify(body),
		}).then(function (res) {
			return res.json();
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
	}
	getEnvironmentJWT() {
		const self = this;
		return self.environmentJWT;
	}
	setSystemJWT(jwt) {
		const self = this;
		self.systemJWT = jwt;
	}
	getSystemJWT() {
		const self = this;
		return self.systemJWT;
	}
	setProxyJWT(jwt) {
		const self = this;
		self.proxyJWT = jwt;
	}
	getProxyJWT() {
		return self.proxyJWT;
	}
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
      gauze__session__kind
      gauze__session__data
      gauze__session__agent_id
      gauze__session__agent_type
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
			gauze__session__kind
			gauze__session__data
			gauze__session__agent_id
			gauze__session__agent_type
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
	enterSession(proxy) {
		const self = this;
		const query = `
mutation enter_session($proxy: Environment_Mutation__Proxy) {
  environment {
    enter_session(proxy: $proxy) {
      gauze__session__id
      gauze__session__kind
      gauze__session__data
      gauze__session__value
      gauze__session__agent_id
	  gauze__session__agent_type
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
}

export default new GauzeClient();
