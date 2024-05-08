import * as jose from "jose";

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

const SYSTEM_JWT_ISSUER = "gauze";

// note: the unwrapped jwt should have an audience that is the resource server
// note: the wrapped jwt should have an audience that maps to agent_type
const SYSTEM_JWT_AUDIENCE = "system";

// todo: change the algorithm to EdDSA
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

export {
	SIGN_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT,
	VERIFY_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT,
	SIGN_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT,
	VERIFY_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT,
};
