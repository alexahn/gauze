import * as React from "react";
import { useEffect, useEffectEvent, useId, useRef, useState } from "react";

function clamp(value, minimum, maximum) {
	return Math.min(Math.max(value, minimum), maximum);
}

function Popover({ trigger, children, triggerClassName = "", popoverClassName = "", popoverWidth, triggerTitle, triggerAriaLabel }) {
	const fallbackId = useId().replace(/:/g, "");
	const triggerRef = useRef(null);
	const popoverRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const updatePosition = useEffectEvent(function () {
		const triggerElement = triggerRef.current;
		const popoverElement = popoverRef.current;
		if (!triggerElement || !popoverElement || !popoverElement.matches(":popover-open")) {
			return;
		}

		popoverElement.style.margin = "0";
		popoverElement.style.inset = "auto";
		popoverElement.style.position = "fixed";
		if (popoverWidth) {
			popoverElement.style.width = popoverWidth;
		}

		const triggerRect = triggerElement.getBoundingClientRect();
		const popoverRect = popoverElement.getBoundingClientRect();
		const left = clamp(triggerRect.left, 8, Math.max(8, window.innerWidth - popoverRect.width - 8));
		const fitsBelow = triggerRect.bottom + 4 + popoverRect.height <= window.innerHeight - 8;
		const top = fitsBelow ? triggerRect.bottom + 4 : clamp(triggerRect.top - popoverRect.height - 4, 8, Math.max(8, window.innerHeight - popoverRect.height - 8));

		popoverElement.style.left = `${left}px`;
		popoverElement.style.top = `${top}px`;
	});

	useEffect(
		function () {
			const popoverElement = popoverRef.current;
			if (!popoverElement) {
				return;
			}

			function handleToggle(e) {
				const nextOpen = e.newState === "open";
				setIsOpen(nextOpen);
				if (nextOpen) {
					requestAnimationFrame(updatePosition);
				}
			}

			popoverElement.addEventListener("toggle", handleToggle);
			return function () {
				popoverElement.removeEventListener("toggle", handleToggle);
			};
		},
		[updatePosition],
	);

	useEffect(
		function () {
			if (!isOpen) {
				return;
			}

			function handleViewportChange() {
				updatePosition();
			}

			window.addEventListener("resize", handleViewportChange);
			window.addEventListener("scroll", handleViewportChange, true);
			return function () {
				window.removeEventListener("resize", handleViewportChange);
				window.removeEventListener("scroll", handleViewportChange, true);
			};
		},
		[isOpen, updatePosition],
	);

	return (
		<>
			<button ref={triggerRef} className={triggerClassName} type="button" popovertarget={fallbackId} popovertargetaction="toggle" title={triggerTitle} aria-label={triggerAriaLabel}>
				{trigger}
			</button>
			<div ref={popoverRef} id={fallbackId} popover="auto" className={popoverClassName}>
				{children}
			</div>
		</>
	);
}

export default Popover;
