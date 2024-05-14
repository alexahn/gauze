import { createRouter } from "router5";
import browserPlugin from "router5-plugin-browser";
import transitionPath from "router5-transition-path";

// singleton only at root level
import routes from "./routes.js";

const dataMiddlewareFactory = (routes) => (router, dependencies) => (toState, fromState) => {
	const { toActivate } = transitionPath(toState, fromState);
	// note: we need to change something in this middleware so that we get the same order of activation as we get on canActivate
	// note: we might need to change the Promise.all below to a linear reduction
	// note: for now, we are just using canActivate, but we should fix this later so we can separate transition guards from transition logic
	// toActivate.reverse()
	const onActivateHandlers = toActivate.map((segment) => routes.find((r) => r.name === segment).onActivate).filter(Boolean);

	return Promise.all(onActivateHandlers.map((callback) => callback({ dependencies, toState, fromState }))).then((data) => {
		const routeData = data.reduce((accData, rData) => Object.assign(accData, rData), {});
		return { ...toState, data: routeData };
	});
};

const options = {
	defaultRoute: "environment.signin",
	queryParamsMode: "strict",
	urlParamsEncoding: "uriComponent",
};

const router = createRouter(routes, options);

router.usePlugin(
	browserPlugin({
		useHash: true,
	}),
);

router.useMiddleware(dataMiddlewareFactory(routes));

export default router;

//router.start();
