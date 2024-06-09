import React from "react";
import { useRef, useLayoutEffect } from "react";

export default function DOM(props) {
	const ref = useRef(null);
	useLayoutEffect(() => {
		const element = props.element
		ref.current.appendChild(element)
	}, [props.element])
	return <div className="w-100 h-100" ref={ref}></div>
}
