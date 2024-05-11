class GauzeClient {
	constructor() {
		this.jwt = "";
	}
	fetch(body) {
		return fetch("/environment/graphql", {
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
}

export default new GauzeClient();
