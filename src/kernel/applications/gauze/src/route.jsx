import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Router() {
	const route = useSelector((state) => {
		console.log("selector reached", state);
		return state.router.route;
	});
	const view = useSelector((state) => {
		console.log("view selector reached", state);
		return state.view;
	});
	return <view.layout sections={view.sections} units={view.units} />;
}
