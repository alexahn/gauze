import http from "http";

// system token
/*
const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJwcm94eV9pZCI6ImQyODQ0MjUzLTY4NjItNGE4My1hMzkyLWMzNDYyNTcyMzEyMiIsImFnZW50X2lkIjoiZDI4NDQyNTMtNjg2Mi00YTgzLWEzOTItYzM0NjI1NzIzMTIyIiwiYWdlbnRfdHlwZSI6ImdhdXplX19wcm94eSIsInNlc3Npb25faWQiOiIyMTFmNWI1ZS05OThjLTRmMjAtYWQ3My00MTdmYWViOWYyMzEiLCJzZWVkIjoiYzVmZGQwZTVkNTdhNTcxNGMwN2E0ZWZiMGUxZWI3MDk0ODM0NGJkMjcwYzg1NWU1ZDU3OGJjZjIyMWYyZjk3YmNlMzg0YWM2YjM5NjlkMDc3ZGFhMWFlNjVhN2QwNDE5ZmJkN2EzMzY2NzRmNjgyZTRkZWYwNjU0OTcyMTc3MjUiLCJpYXQiOjE3MTUxNzI4MDEsImlzcyI6ImdhdXplIiwiYXVkIjoic3lzdGVtIiwiZXhwIjoxNzE1MTgwMDAxfQ.XWrh-huOuQSUeQU6LWdxmGkdLN3CfRtfI2tIirFXZf0"
*/

// environment token
const jwt =
	"eyJhbGciOiJIUzI1NiJ9.eyJwcm94eV9pZCI6bnVsbCwiYWdlbnRfaWQiOm51bGwsImFnZW50X3R5cGUiOm51bGwsInNlc3Npb25faWQiOiJmYzIyZTNmYi00M2E2LTQwZTAtYTJkZS05YjNhYTcwOWE0NDkiLCJzZWVkIjoiNWRlNGNkMTAzOTRiMzVhMDY3YzE5OTgwMzE2Y2MyZDQ0ZjQyZjRlNmFkZjllMDBkYzZlNWQ2YmZmZTVlNDliYTk0M2E0NzY2NGRmNjgzZmY5YWY5NjRkMjY5ZTdkMzlhYjhkMjNmYzc5M2ViMjM5OTJjMTQ3NDVmYWE3NTc0ZWMiLCJpYXQiOjE3MTUyNTQ0ODksImlzcyI6ImdhdXplIiwiYXVkIjoiZW52aXJvbm1lbnQiLCJleHAiOjE3MTUyNjE2ODl9.CYoLEorIumdYdaAKgcSOCrfIpZO723jx5AnupNYcQJc";

function execute(path, jwt, query) {
	return new Promise(function (resolve, reject) {
		const req = http.request(
			{
				hostname: "localhost",
				port: 4000,
				path: path,
				method: "POST",
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			},
			function (res) {
				var body = "";
				res.on("data", (chunk) => {
					body += chunk.toString("utf8");
				});
				res.on("end", () => {
					var parsed;
					console.log(JSON.stringify(JSON.parse(body), null, 4));
					try {
						parsed = JSON.parse(body);
					} catch (error) {
						return reject(error);
					}
					return resolve(parsed);
				});
			},
		);

		const body = {
			query: query,
		};

		req.write(JSON.stringify(body));
		req.end();
	});
}

const assert_query = `
mutation {
	agent {
		person {
			assert {
				email(agent_person: {
					gauze__agent_person__email: "contact2@alexahn.com"
				}) {
					success
				}
			}
		}
	}
}
`;

const verify_query = `
mutation {
	agent {
		account {
			verify {
				password(agent_account: {
					gauze__agent_account__password: "1234"
				}) {
					success
				}
			}
		}
	}
}
`;
const signin_query = `
mutation {
	environment {
		signin {
			gauze__session__id
			gauze__session__agent_id
			gauze__session__agent_type
			gauze__session__value
		}
	}
}
`;

execute("/environment/graphql", jwt, assert_query).then(function (assert_step) {
	return execute("/environment/graphql", jwt, verify_query).then(function (verify_step) {
		return execute("/environment/graphql", jwt, signin_query).then(function (session) {
			console.log("SUCCESS", JSON.stringify(session, null, 4));
			const system_jwt = session.data.environment.signin.gauze__session__value;
			const agent_id = session.data.environment.signin.gauze__session__agent_id;
			const proxy_query = `
				query {
					read_proxy(where: {gauze__proxy__root_id: "${agent_id}"}) {
						attributes {
							gauze__proxy__root_id
							gauze__proxy__agent_id
							gauze__proxy__agent_type
						}
					}
				}
			`;
			console.log("system_jwt", system_jwt);
			return execute("/system/graphql", system_jwt, proxy_query).then(function (proxies) {
				console.log("proxies", proxies);
				// select the user proxy
				const user = proxies.data.read_proxy.find(function (proxy) {
					return proxy.attributes.gauze__proxy__agent_type === "gauze__agent_user";
				});
				console.log("user", user);
				// enter user session
				const user_query = `
mutation {
	environment {
		enter_session(proxy: {
			gauze__proxy__agent_id: "${user.attributes.gauze__proxy__agent_id}",
			gauze__proxy__agent_type: "${user.attributes.gauze__proxy__agent_type}"
		}) {
			gauze__session__id
			gauze__session__agent_id
			gauze__session__agent_type
			gauze__session__value
		}
	}
}

				`;
				return execute("/environment/graphql", system_jwt, user_query).then(function (user_session) {
					console.log("user_session", user_session);
				});
			});
		});
	});
});
