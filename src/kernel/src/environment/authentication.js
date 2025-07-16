const { pbkdf2 } = await import("node:crypto");

import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./models/session.js";

import * as jose from "jose";

// todo: refactor some of this to use higher order functions
// note: technically it might not make sense to refactor since these are separate auth methods

const VERIFY_JWT_PAYLOAD = function (context, payload) {
	const session_attributes = {
		gauze__session__id: payload.session_id,
		gauze__session__realm: payload.aud,
		gauze__session__agent_id: payload.agent_id,
		gauze__session__agent_type: payload.agent_type,
		gauze__session__seed: payload.seed,
	};
	const session_parameters = { where: session_attributes };
	return MODEL__SESSION__MODEL__ENVIRONMENT.read(context, null, session_parameters).then(function (sessions) {
		if (sessions && sessions.length) {
			return sessions[0];
		} else {
			throw new Error("Session could not be found for agent");
		}
	});
};

const HASH_PASSWORD__AUTHENTICATION__ENVIRONMENT = function (password, salt) {
	return new Promise(function (resolve, reject) {
		// 64 byte length hash generated
		pbkdf2(password, salt, 524288, 128, "sha512", function (err, hash) {
			if (err) return reject(err);
			return resolve(hash.toString("hex"));
		});
	});
};

const ENVIRONMENT_JWT_ISSUER = "gauze";

// note: the unwrapped jwt should have an audience that is the resource server
// note: the wrapped jwt should have an audience that maps to agent_type
const ENVIRONMENT_JWT_AUDIENCE = "environment";

// todo: change the algorithm to EdDSA
const ENVIRONMENT_JWT_HEADER = {
	alg: "HS256",
};

const SIGN_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT = function (payload) {
	const secret = new TextEncoder().encode(process.env.GAUZE_ENVIRONMENT_JWT_SECRET);
	return new jose.SignJWT(payload)
		.setProtectedHeader(ENVIRONMENT_JWT_HEADER)
		.setIssuedAt()
		.setIssuer(ENVIRONMENT_JWT_ISSUER)
		.setAudience(ENVIRONMENT_JWT_AUDIENCE)
		.setExpirationTime("2h")
		.sign(secret);
};

const VERIFY_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT = function (jwt) {
	const secret = new TextEncoder().encode(process.env.GAUZE_ENVIRONMENT_JWT_SECRET);
	return jose.jwtVerify(jwt, secret, {
		issuer: ENVIRONMENT_JWT_ISSUER,
		audience: ENVIRONMENT_JWT_AUDIENCE,
	});
};

// auth is authentication header
const AUTHENTICATE_ENVIRONMENT__AUTHENTICATION__ENVIRONMENT = function (auth) {
	// parse the header to extract the token
	var jwt = null;
	//const auth = req.headers.authorization;
	if (auth) {
		const auth_split = auth.split(" ");
		if (auth_split[0] === "Bearer") {
			jwt = auth_split[1];
			return VERIFY_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT(jwt)
				.then(function ({ payload }) {
					return payload;
				})
				.catch(function (err) {
					// note: maybe log?
					throw new Error("Invalid JWT");
				});
		} else {
			return Promise.reject(new Error("Invalid Authorization type"));
		}
	} else {
		return Promise.reject(new Error("Missing authorization header"));
	}
};

const SYSTEM_JWT_ISSUER = "gauze";

// note: the unwrapped jwt should have an audience that is the resource server
// note: the wrapped jwt should have an audience that maps to agent_type
const SYSTEM_JWT_AUDIENCE = "system";

// todo: change the algorithm to EdDSA
// note: will need a master public/private key pair
// note: we could leave it as symmetric to make it easy to run the serve
const SYSTEM_JWT_HEADER = {
	alg: "HS256",
};

const SIGN_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT = function (payload) {
	const secret = new TextEncoder().encode(process.env.GAUZE_SYSTEM_JWT_SECRET);
	return new jose.SignJWT(payload).setProtectedHeader(SYSTEM_JWT_HEADER).setIssuedAt().setIssuer(SYSTEM_JWT_ISSUER).setAudience(SYSTEM_JWT_AUDIENCE).setExpirationTime("2h").sign(secret);
};

const VERIFY_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT = function (jwt) {
	const secret = new TextEncoder().encode(process.env.GAUZE_SYSTEM_JWT_SECRET);
	return jose.jwtVerify(jwt, secret, {
		issuer: SYSTEM_JWT_ISSUER,
		audience: SYSTEM_JWT_AUDIENCE,
	});
};

// auth is authentication header
const AUTHENTICATE_SYSTEM__AUTHENTICATION__ENVIRONMENT = function (auth) {
	// parse the header to extract the token
	var jwt = null;
	//const auth = req.headers.authorization;
	if (auth) {
		const auth_split = auth.split(" ");
		if (auth_split[0] === "Bearer") {
			jwt = auth_split[1];
			return VERIFY_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT(jwt)
				.then(function ({ payload }) {
					return payload;
				})
				.catch(function (err) {
					// note: maybe log?
					throw new Error("Invalid JWT");
				});
		} else {
			return Promise.reject(new Error("Invalid Authorization type"));
		}
	} else {
		return Promise.reject(new Error("Missing authorization header"));
	}
};

const DATABASE_JWT_ISSUER = "gauze";

// note: the unwrapped jwt should have an audience that is the resource server
// note: the wrapped jwt should have an audience that maps to agent_type
const DATABASE_JWT_AUDIENCE = "database";

// todo: change the algorithm to EdDSA
// note: will need a master public/private key pair
// note: we could leave it as symmetric to make it easy to run the serve
const DATABASE_JWT_HEADER = {
	alg: "HS256",
};

const SIGN_DATABASE_JWT__AUTHENTICATION__ENVIRONMENT = function (payload) {
	const secret = new TextEncoder().encode(process.env.GAUZE_DATABASE_JWT_SECRET);
	return new jose.SignJWT(payload)
		.setProtectedHeader(DATABASE_JWT_HEADER)
		.setIssuedAt()
		.setIssuer(DATABASE_JWT_ISSUER)
		.setAudience(DATABASE_JWT_AUDIENCE)
		.setExpirationTime("2h")
		.sign(secret);
};

const VERIFY_DATABASE_JWT__AUTHENTICATION__ENVIRONMENT = function (jwt) {
	const secret = new TextEncoder().encode(process.env.GAUZE_DATABASE_JWT_SECRET);
	return jose.jwtVerify(jwt, secret, {
		issuer: DATABASE_JWT_ISSUER,
		audience: DATABASE_JWT_AUDIENCE,
	});
};

// auth is authentication header
const AUTHENTICATE_DATABASE__AUTHENTICATION__ENVIRONMENT = function (auth) {
	// parse the header to extract the token
	var jwt = null;
	//const auth = req.headers.authorization;
	if (auth) {
		const auth_split = auth.split(" ");
		if (auth_split[0] === "Bearer") {
			jwt = auth_split[1];
			return VERIFY_DATABASE_JWT__AUTHENTICATION__ENVIRONMENT(jwt)
				.then(function ({ payload }) {
					return payload;
				})
				.catch(function (err) {
					// note: maybe log?
					throw new Error("Invalid JWT");
				});
		} else {
			return Promise.reject(new Error("Invalid Authorization type"));
		}
	} else {
		return Promise.reject(new Error("Missing authorization header"));
	}
};

export {
	VERIFY_JWT_PAYLOAD,
	HASH_PASSWORD__AUTHENTICATION__ENVIRONMENT,
	// ENVIRONMENT
	SIGN_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT,
	VERIFY_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT,
	AUTHENTICATE_ENVIRONMENT__AUTHENTICATION__ENVIRONMENT,
	// SYSTEM
	SIGN_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT,
	VERIFY_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT,
	AUTHENTICATE_SYSTEM__AUTHENTICATION__ENVIRONMENT,
	// DATABASE
	SIGN_DATABASE_JWT__AUTHENTICATION__ENVIRONMENT,
	VERIFY_DATABASE_JWT__AUTHENTICATION__ENVIRONMENT,
	AUTHENTICATE_DATABASE__AUTHENTICATION__ENVIRONMENT,
};
