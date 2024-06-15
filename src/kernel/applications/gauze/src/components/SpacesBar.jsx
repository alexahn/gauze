import React from "react";
import { useState } from "react";

export default function SpacesBar({ route, gauze, model, router, spaces }) {
	const [displayWorkspace, setDisplayWorkspace] = useState(false);
	function handleWorkspaceEnter(e) {
		setDisplayWorkspace(true);
	}
	function handleWorkspaceLeave(e) {
		setDisplayWorkspace(false);
	}
	return (
		<div>
			<div
				className="workspaces flex flex-column mh-75 overflow-y-auto overflow-x-hidden"
				style={{ width: displayWorkspace ? "256px" : "100%", maxHeight: "75%" }}
				onMouseEnter={handleWorkspaceEnter}
				onMouseLeave={handleWorkspaceLeave}
			>
				<div className="bgx2 cx12 relative">
					<div>
						<h1>+</h1>
					</div>
					<span className="dn bgx3 cx8 mw6 top-0 left-0 pa1 absolute f4 tooltip truncate-ns" style={{ zIndex: 3, width: "256px", display: displayWorkspace ? "block" : "none" }}>
						<div className="flex flex-column">
							{/*
							<div>
								Create Space
							</div>
							*/}
							<div className="flex">
								<input className="mr1 mw-100" placeholder="Space Name" style={{ width: "100%" }} />
								<button className="w3">Create</button>
							</div>
							{/*
							<div>
								<button>Create</button>
							</div>
							*/}
						</div>
					</span>
				</div>
				{Object.keys(spaces).map(function (spaceID, index) {
					const space = spaces[spaceID];
					return (
						<div className="bgx10 cx2 relative" key={spaceID}>
							<div>
								<h1>{index + 1}</h1>
							</div>
							<span
								className="dn bgx9 cx5 mw6 w5 top-0 left-0 absolute f4 tooltip truncate-ns"
								style={{ zIndex: 3, width: "256px", display: displayWorkspace ? "block" : "none" }}
							>
								<div className="flex flex-column">
									<div className="flex pa1">
										<div className="mr1 mw-100 truncate-ns" style={{ width: "100%" }}>
											{spaceID} {spaceID} {spaceID} {spaceID}
										</div>
										<div>
											<button className="w3" disabled={Object.values(spaces).length <= 1}>
												Delete
											</button>
										</div>
									</div>
									<div className="w-100 pa1">
										<a href={router.buildUrl("system.graph.space", { space: spaceID })}>
											<button className="w-100" disabled={route.params.space === spaceID}>
												Select
											</button>
										</a>
									</div>
								</div>
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
