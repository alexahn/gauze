import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import * as orchestrate from "./../orchestrate.js";

export default function SpacesBar({ route, agentHeader, gauze, model, router, graph, spaces }) {
	const [submitCreateWorkspace, setSubmitCreateWorkspace] = useState(false);
	const [displayWorkspace, setDisplayWorkspace] = useState(false);
	const services = {
		gauze,
		model,
		router,
		graph,
	};
	function handleWorkspaceEnter(e) {
		setDisplayWorkspace(true);
	}
	function handleWorkspaceLeave(e) {
		setDisplayWorkspace(false);
	}
	function handleCreateWorkspace(e) {
		e.preventDefault();
		setSubmitCreateWorkspace(true);
		const formData = new FormData(e.target);
		const workspaceName = formData.get("name");
		const workspaceID = uuidv4();
		/*
		graph.createSpace(agentHeader.name, workspaceID, {
			name: workspaceName
		})
		*/
		return orchestrate
			.createSpace(services, agentHeader, workspaceID, { name: workspaceName })
			.then(function (space) {
				return orchestrate.reloadSpace(services, agentHeader, workspaceID).then(function () {
					setSubmitCreateWorkspace(false);
					router.navigate("system.graph.space", { space: workspaceID });
				});
			})
			.catch(function (err) {
				console.error(err);
				setSubmitCreateWorkspace(false);
				throw err;
			});
	}
	function handleDeleteWorkspace(spaceID) {
		return function (e) {
			graph.deleteSpace(agentHeader.name, spaceID);
			router.navigate("system.graph.space", { space: "home" });
		};
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
					<span className="dn bgx3 cx8 mw6 top-0 left-0 absolute f4 tooltip truncate-ns" style={{ zIndex: 3, width: "256px", display: displayWorkspace ? "block" : "none" }}>
						<div>
							<form className="flex flex-column" onSubmit={handleCreateWorkspace}>
								<div className="pa1">
									<input className="ba bw1 br2 bgx12 bdx12 mr1 mw-100" name="name" placeholder="Space Name" style={{ width: "100%" }} />
								</div>
								<div className="pa1">
									<button className="ba bw1 br2 bgx4 bdx4 cx6 bgx5h bdx5h w-100" type="submit" disabled={submitCreateWorkspace}>
										Create
									</button>
								</div>
							</form>
						</div>
					</span>
				</div>
				{Object.keys(spaces).map(function (spaceID, index) {
					const space = spaces[spaceID];
					const className = route.params.space === spaceID ? "bgx10 cx12 relative" : "bgx10 cx2 relative";
					const spanClassName =
						route.params.space === spaceID
							? "dn bgx9 cx12 mw6 w5 top-0 left-0 absolute f4 tooltip truncate-ns"
							: "dn bgx9 cx5 mw6 w5 top-0 left-0 absolute f4 tooltip truncate-ns";
					const deleteClassName = spaceID === "home" ? "ba bw1 br2 bgx11 bdx11 cx6" : "ba bw1 br2 bgx11 bdx11 cx6 bgx10h bdx10h w3";
					const selectClassName = route.params.space === spaceID ? "ba br2 bgx4 bdx4 cx6" : "ba br2 bgx4 bdx4 cx6 bgx3h bdx3h";
					return (
						<div className={className} key={spaceID}>
							<div>
								<h1>{index + 1}</h1>
							</div>
							<span className={spanClassName} style={{ zIndex: 3, width: "256px", display: displayWorkspace ? "block" : "none" }}>
								<div className="flex flex-column">
									<div className="flex pa1">
										<div className="mr1 mw-100 truncate-ns" style={{ width: "100%" }}>
											{space.name || spaceID.toUpperCase()}
										</div>
										<div>
											<button
												className={deleteClassName}
												disabled={spaceID === "home"}
												style={{ opacity: spaceID === "home" ? "0.5" : "1" }}
												onClick={handleDeleteWorkspace(spaceID)}
											>
												Delete
											</button>
										</div>
									</div>
									<div className="w-100 pa1">
										<a href={router.buildUrl("system.graph.space", { space: spaceID })}>
											<button
												className={selectClassName}
												disabled={route.params.space === spaceID}
												style={{ width: "100%", opacity: route.params.space === spaceID ? "0.5" : "1" }}
											>
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
