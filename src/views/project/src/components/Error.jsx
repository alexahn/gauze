import * as React from "react";

function normalizeError(error) {
	if (error instanceof Error) {
		return error;
	} else if (typeof error === "string") {
		return new Error(error);
	} else if (error === null) {
		return new Error("Unknown error");
	} else if (typeof error === "undefined") {
		return new Error("Unknown error");
	} else {
		try {
			return new Error(JSON.stringify(error));
		} catch (err) {
			return new Error(String(error));
		}
	}
}

function projectURL(pathfinder) {
	if (pathfinder) {
		try {
			return pathfinder.stateToURL("project.system.headers.graph", {}, {});
		} catch (err) {
			return "/project/x/headers/graph";
		}
	} else {
		return "/project/x/headers/graph";
	}
}

function ErrorPage({ error, errorInfo, pathfinder, source }) {
	const normalized = normalizeError(error);
	const message = normalized.message || "Something went wrong";
	const stack = normalized.stack || "";
	const componentStack = errorInfo && errorInfo.componentStack ? errorInfo.componentStack : "";
	const showDetails = stack || componentStack;
	const homeURL = projectURL(pathfinder);
	const label = source ? source : "Application error";

	function handleReload() {
		location.reload();
	}

	return (
		<div className="bgx12 cx2 min-vh-100 pa4">
			<div className="mw7 center">
				<div className="clouds bgxyz12 bdx6 cx2 ba bw2 br2 pa4">
					<div className="athelas f3 mb3">{label}</div>
					<div className="avenir f5 lh-copy mb3">{message}</div>
					<div className="flex flex-wrap mb3">
						<a className="mr2" href={homeURL}>
							<button className="athelas clouds ba bw1 br2 bgx10 bdx10 cx6 bgx8h bdx8h pointer">Project</button>
						</a>
						<button className="athelas clouds ba bw1 br2 bgx6 bdx6 cx2 bgx5h bdx5h pointer" onClick={handleReload}>
							Reload
						</button>
					</div>
					{showDetails ? (
						<pre className="consolas f6 bgxyz1 cxyz12 pa3 br2 overflow-auto">
							{stack}
							{stack && componentStack ? "\n\n" : ""}
							{componentStack}
						</pre>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default ErrorPage;
