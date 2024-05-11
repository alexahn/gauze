import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Router() {
	const view = useSelector((state) => {
		return state.view;
	});
	if (view && view.layout && view.sections && view.units) {
		return <view.layout sections={view.sections} units={view.units} />;
	} else {
		return <div>Loading</div>;
	}
}
