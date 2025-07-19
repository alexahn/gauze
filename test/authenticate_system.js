import http from "http";

const GAUZE_EMAIL = "contact@home.alexahn.com";
const GAUZE_PASSWORD = "1234";

function execute(path, jwt, query) {
	return new Promise(function (resolve, reject) {
		const req = http.request(
			{
				hostname: "localhost",
				port: 4000,
				path: path,
				method: "POST",
				headers: {
					Authorization: jwt ? `Bearer ${jwt}` : "",
					"content-type": "application/json; charset=utf-8",
				},
			},
			function (res) {
				var body = "";
				res.on("data", (chunk) => {
					body += chunk.toString("utf8");
				});
				res.on("end", () => {
					var parsed;
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

const enter_login_session_query = `
mutation {
	environment {
		enter_session(proxy: null) {
			gauze__session__id
			gauze__session__kind
			gauze__session__data
			gauze__session__value
			gauze__session__agent_id
			gauze__session__seed
		}
	}
}
`;
execute("/environment/graphql", null, enter_login_session_query)
	.then(function (login_session) {
		if (login_session.errors && login_session.errors.length) {
			console.log("enter_session.errors", login_session.errors);
			return null;
		} else {
			console.log("login session:", true);
			return {
				login_session: login_session.data.environment.enter_session,
			};
		}
	})
	.then(function (collection) {
		if (collection && collection.login_session) {
			const { login_session } = collection;
			const login_jwt = login_session.gauze__session__value;
			const assert_query = `
			mutation {
				agent {
					person {
						assert {
							email(agent_person: {
								gauze__agent_person__email: "${GAUZE_EMAIL}"
							}) {
								success
							}
						}
					}
				}
			}
		`;
			return execute("/environment/graphql", login_jwt, assert_query).then(function (assert_step) {
				if (assert_step.errors && assert_step.errors.length) {
					console.log("assert_step.errors", assert_step.errors);
					return collection;
				} else {
					console.log("assert step:", assert_step.data.agent.person.assert.email.success);
					return {
						...collection,
						assert_step: assert_step.data.agent.person.assert.email,
					};
				}
			});
		} else {
			return collection;
		}
	})
	.then(function (collection) {
		if (collection && collection.assert_step) {
			const { login_session } = collection;
			const login_jwt = login_session.gauze__session__value;
			const verify_query = `
			mutation {
				agent {
					account {
						verify {
							password(agent_account: {
								gauze__agent_account__password: "${GAUZE_PASSWORD}"
							}) {
								success
							}
						}
					}
				}
			}
		`;
			return execute("/environment/graphql", login_jwt, verify_query).then(function (verify_step) {
				if (verify_step.errors && verify_step.errors.length) {
					console.log("verify_step.errors", verify_step.errors);
					return collection;
				} else {
					console.log("verify step:", verify_step.data.agent.account.verify.password.success);
					return {
						...collection,
						verify_step: verify_step.data.agent.account.verify.password,
					};
				}
			});
		} else {
			return collection;
		}
	})
	.then(function (collection) {
		if (collection && collection.verify_step) {
			const { login_session } = collection;
			const login_jwt = login_session.gauze__session__value;
			const signin_query = `
			mutation {
				environment {
					sign_in {
						gauze__session__id
						gauze__session__agent_id
						gauze__session__agent_type
						gauze__session__value
					}
				}
			}
		`;
			return execute("/environment/graphql", login_jwt, signin_query).then(function (signin_session) {
				if (signin_session.errors && signin_session.errors.length) {
					console.log("signin.errors", signin_session.errors);
					return collection;
				} else {
					console.log("signin:", true);
					return {
						...collection,
						signin_session: signin_session.data.environment.sign_in,
					};
				}
			});
		} else {
			return collection;
		}
	})
	.then(function (collection) {
		if (collection && collection.signin_session) {
			const { signin_session } = collection;
			const signin_jwt = signin_session.gauze__session__value;
			const agent_id = signin_session.gauze__session__agent_id;
			const proxy_query = `
			query {
				read_proxy(where: {gauze__proxy__root_id: "${agent_id}"}) {
					attributes {
						gauze__proxy__id
						gauze__proxy__root_id
						gauze__proxy__agent_id
						gauze__proxy__agent_type
					}
				}
			}
		`;
			return execute("/system/graphql", signin_jwt, proxy_query).then(function (proxies) {
				if (proxies.errors && proxies.errors.length) {
					console.log("read_proxy.errors", proxies.errors);
					return collection;
				} else {
					if (proxies.data.read_proxy && proxies.data.read_proxy.length) {
						const root_proxy = proxies.data.read_proxy.find(function (proxy) {
							return proxy.attributes.gauze__proxy__agent_type === "gauze__agent_root";
						});
						const account_proxy = proxies.data.read_proxy.find(function (proxy) {
							return proxy.attributes.gauze__proxy__agent_type === "gauze__agent_account";
						});
						const user_proxy = proxies.data.read_proxy.find(function (proxy) {
							return proxy.attributes.gauze__proxy__agent_type === "gauze__agent_user";
						});
						const person_proxy = proxies.data.read_proxy.find(function (proxy) {
							return proxy.attributes.gauze__proxy__agent_type === "gauze__agent_person";
						});
						const character_proxy = proxies.data.read_proxy.find(function (proxy) {
							return proxy.attributes.gauze__proxy__agent_type === "gauze__agent_character";
						});
						if (!root_proxy) {
							throw new Error("root_proxy does not exist");
						}
						if (!account_proxy) {
							throw new Error("account_proxy does not exist");
						}
						if (!user_proxy) {
							throw new Error("user_proxy does not exist");
						}
						if (!person_proxy) {
							throw new Error("person_proxy does not exist");
						}
						if (!character_proxy) {
							throw new Error("character_proxy does not exist");
						}
						return {
							...collection,
							root_proxy: root_proxy,
							account_proxy: account_proxy,
							user_proxy: user_proxy,
							person_proxy: person_proxy,
							character_proxy: character_proxy,
						};
					} else {
						throw new Error("read_proxy returned no proxies");
					}
				}
			});
		} else {
			return collection;
		}
	})
	.then(function (collection) {
		if (collection && collection.user_proxy) {
			const { signin_session, user_proxy } = collection;
			const signin_jwt = signin_session.gauze__session__value;
			const user_query = `
			mutation {
				realm {
					system {
						enter_session(proxy: {
							gauze__proxy__root_id: "${user_proxy.attributes.gauze__proxy__root_id}",
							gauze__proxy__agent_id: "${user_proxy.attributes.gauze__proxy__agent_id}",
							gauze__proxy__agent_type: "${user_proxy.attributes.gauze__proxy__agent_type}"
						}) {
							gauze__session__id
							gauze__session__agent_id
							gauze__session__agent_type
							gauze__session__value
						}
					}
				}
			}
		`;
			return execute("/environment/graphql", signin_jwt, user_query).then(function (user_session) {
				if (user_session.errors && user_session.errors.length) {
					console.log("enter_session.errors", user_session.errors);
					return collection;
				} else {
					console.log("enter_session:", true);
					return {
						...collection,
						user_session: user_session.data.realm.system.enter_session,
					};
				}
			});
		} else {
			return collection;
		}
	})
	.then(function (collection) {
		if (collection && collection.account_proxy) {
			const { signin_session, account_proxy } = collection;
			const signin_jwt = signin_session.gauze__session__value;
			const account_query = `
			mutation {
				realm {
					system {
						enter_session(proxy: {
							gauze__proxy__root_id: "${account_proxy.attributes.gauze__proxy__root_id}",
							gauze__proxy__agent_id: "${account_proxy.attributes.gauze__proxy__agent_id}",
							gauze__proxy__agent_type: "${account_proxy.attributes.gauze__proxy__agent_type}"
						}) {
							gauze__session__id
							gauze__session__agent_id
							gauze__session__agent_type
							gauze__session__value
						}
					}
				}
			}
		`;
			return execute("/environment/graphql", signin_jwt, account_query).then(function (account_session) {
				if (account_session.errors && account_session.errors.length) {
					console.log("enter_session.errors", JSON.stringify(account_session.errors.locations));
					return collection;
				} else {
					console.log("enter_session:", true);
					return {
						...collection,
						account_session: account_session.data.realm.system.enter_session,
					};
				}
			});
		} else {
			return collection;
		}
	})
	.then(function (collection) {
		console.log(collection);
	});
