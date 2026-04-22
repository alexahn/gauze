import React from "react";
import { useEffect, useId, useRef } from "react";

export default function Popover({ align = "left", side = "bottom", buttonClassName, buttonContent, containerClassName = "", popoverClassName, children }) {
	const buttonRef = useRef(null);
	const popoverRef = useRef(null);
	const popoverID = useId().replace(/:/g, "");
	const closeEventName = "gauze:close-popovers";

	function positionPopover() {
		const buttonNode = buttonRef.current;
		const popoverNode = popoverRef.current;
		if (!buttonNode || !popoverNode) return;
		const rect = buttonNode.getBoundingClientRect();
		let top;
		let left;
		if (side === "right") {
			top = rect.top;
			left = rect.right + 4;
		} else if (side === "left") {
			top = rect.top;
			left = Math.max(8, rect.left - popoverNode.offsetWidth - 4);
		} else {
			top = rect.bottom + 4;
			left = align === "right" ? Math.max(8, rect.right - popoverNode.offsetWidth) : rect.left;
		}
		popoverNode.style.top = `${top}px`;
		popoverNode.style.left = `${left}px`;
	}

	function togglePopover() {
		const popoverNode = popoverRef.current;
		if (!popoverNode) return;
		if (popoverNode.matches(":popover-open")) {
			popoverNode.hidePopover();
			return;
		}
		popoverNode.style.visibility = "hidden";
		popoverNode.showPopover();
		window.requestAnimationFrame(function () {
			positionPopover();
			popoverNode.style.visibility = "visible";
		});
	}

	useEffect(function () {
		function handleClosePopover() {
			const popoverNode = popoverRef.current;
			if (!popoverNode) return;
			if (popoverNode.matches(":popover-open")) {
				popoverNode.hidePopover();
			}
		}
		window.addEventListener(closeEventName, handleClosePopover);
		return function () {
			window.removeEventListener(closeEventName, handleClosePopover);
		};
	}, []);

	return (
		<div className={containerClassName}>
			<button ref={buttonRef} type="button" className={buttonClassName} onClick={togglePopover}>
				{buttonContent}
			</button>
			<div ref={popoverRef} id={popoverID} popover="auto" className={`tooltip-popover ${popoverClassName}`}>
				{children}
			</div>
		</div>
	);
}
