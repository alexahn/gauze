// todo: figure out if we want to change graphql to not used a named export either
// note: use a default export here because it makes composing much easier across realms and applications

import Router from "@koa/router";

const ROUTER__HTTP__INTERFACE__DATABASE = new Router();

ROUTER__HTTP__INTERFACE__DATABASE.get('/graphql', function (ctx, next) {
	ctx.body = 'test'
	return next()
})

export default ROUTER__HTTP__INTERFACE__DATABASE;

// note: we can revert to the structure below for structural consistency if we dislike the default export
/*
export { 
	ROUTES__ROUTES__HTTP__INTERFACE__DATABASE
}
*/
