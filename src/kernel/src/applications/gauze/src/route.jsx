import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import blocks from "./static/blocks-wave.svg";

export default function Router() {
	const view = useSelector((state) => {
		return state.view;
	});
	if (view && view.layout && view.sections && view.units) {
		return <view.layout sections={view.sections} units={view.units} />;
	} else {
		return (
			<div className="flex justify-center items-center w-100 h-100 bgx12">
				<img className="loading" src={blocks} width="33%" height="33%" />
			</div>
		);
	}
}
