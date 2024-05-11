import { createRouter } from "router5";
import browserPlugin from "router5-plugin-browser";
import transitionPath from "router5-transition-path";

// singleton only at root level
import routes from "./routes.js";

const dataMiddlewareFactory = (routes) => (router) => (toState, fromState) => {
	const { toActivate } = transitionPath(toState, fromState);
	const onActivateHandlers = toActivate.map((segment) => routes.find((r) => r.name === segment).onActivate).filter(Boolean);

	return Promise.all(onActivateHandlers.map((callback) => callback())).then((data) => {
		const routeData = data.reduce((accData, rData) => Object.assign(accData, rData), {});
		return { ...toState, data: routeData };
	});
};

const options = {
	//defaultRoute: ''
	queryParamsMode: "loose",
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
