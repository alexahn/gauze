import { GAUZE_PROTOCOL, GAUZE_HOST, GAUZE_PORT } from "env";

class GauzeClient {
	constructor() {
		this.jwt = "";
		this.base = `${GAUZE_PROTOCOL}://${GAUZE_HOST}:${GAUZE_PORT}`;
	}
	fetch(body) {
		const self = this;
		return fetch(`${self.base}/environment/graphql`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${this.jwt}`,
			},
			body: JSON.stringify(body),
		}).then(function (res) {
			return res.json();
		});
	}
	enterSession(agent) {
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
		return self.fetch({
			query: query,
			variables: {
				agent: agent,
			},
			operationName: "enter_session",
		});
	}
}

export default new GauzeClient();
