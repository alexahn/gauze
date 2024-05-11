import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Router() {
	const view = useSelector((state) => {
		return state.view;
	});
	console.log("RENDERED");
	return <view.layout sections={view.sections} units={view.units} />;
}
