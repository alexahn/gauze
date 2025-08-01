import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import * as orchestrate from "./../orchestrate.js";

export default function SpacesBar({ route, agentHeader, gauze, model, router, graph, spaces }) {
	const [submitCreateWorkspace, setSubmitCreateWorkspace] = useState(false);
	const [displayWorkspace, setDisplayWorkspace] = useState(false);
	const [editWorkspace, setEditWorkspace] = useState(null);
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
			router.navigate("system.graph.space", { space: "home", time: new Date().getTime() });
		};
	}
	function handleEditWorkspace(spaceID) {
		return function (e) {
			e.preventDefault();
			const formData = new FormData(e.target);
			const workspaceName = formData.get("name");
			const space = graph.readSpace(agentHeader.name, spaceID);
			space.name = workspaceName;
			graph.updateSpace(agentHeader.name, spaceID, space);
			setEditWorkspace(null);
		};
	}
	function handleEnterEditWorkspace(spaceID) {
		return function (e) {
			setEditWorkspace(spaceID);
		};
	}
	function handleExitEditWorkspace(spaceID) {
		return function (e) {
			setEditWorkspace(null);
		};
	}
	function renderEditWorkspace(spaceID) {
		const space = spaces[spaceID];
		const saveClassName = route.params.space === spaceID ? "ba bw1 br2 bgxyz4 bdx2 cx12 bgx3h bdx3h" : "ba bw1 br2 bgx2 bdx2 cx12 bgxyz4h bdxyz4h";
		const inputClassName = "ba bw1 br2 bgx12 bdx12 cx2 mw-100";
		return (
			<form style={{ marginBlockEnd: "0" }} onSubmit={handleEditWorkspace(spaceID)}>
				<div className="flex pa2 athelas">
					<div className="mr1" style={{ width: "100%" }}>
						<input className={inputClassName} style={{ width: "100%" }} name="name" defaultValue={space.name || spaceID.toUpperCase()} />
					</div>
					<div>
						<button className={saveClassName} type="submit">
							Save
						</button>
					</div>
				</div>
			</form>
		);
	}
	function renderDeleteWorkspace(spaceID) {
		const space = spaces[spaceID];
		const deleteClassName =
			route.params.space === spaceID
				? spaceID === "home"
					? "ba bw1 br2 bgxyz4 bdx2 cx12"
					: "ba bw1 br2 bgxyz4 bdx2 cx12 bgxyz5h bdxyz5h"
				: spaceID === "home"
					? "ba bw1 br2 bgx2 bdx2 cx12"
					: "ba bw1 br2 bgx2 bdx2 cxyz7 cxyz12h bgxyz4h bdxyz4h";
		const editClassName =
			route.params.space === spaceID ? "ba bw1 br2 bgxyz4 bdx2 cx12 bgxyz5h bdxyz5h truncate-ns mw-100" : "ba bw1 br2 bgx2 bdx2 cxyz7 cxyz12h bgxyz4h bdxyz4h truncate-ns mw-100";
		return (
			<div className="flex pa2 athelas">
				<div className="mr1" style={{ width: "100%" }}>
					<button className={editClassName} style={{ width: "100%" }} onClick={handleEnterEditWorkspace(spaceID)}>
						{space.name || spaceID.toUpperCase()}
					</button>
				</div>
				<div>
					<button className={deleteClassName} disabled={spaceID === "home"} style={{ opacity: spaceID === "home" ? "0.5" : "1" }} onClick={handleDeleteWorkspace(spaceID)}>
						Delete
					</button>
				</div>
			</div>
		);
	}
	return (
		<div>
			<div
				className="workspaces flex flex-column mh-75 overflow-y-auto overflow-x-hidden br4"
				style={{ width: displayWorkspace ? "256px" : "100%", maxHeight: "75%" }}
				onMouseEnter={handleWorkspaceEnter}
				onMouseLeave={handleWorkspaceLeave}
			>
				<div className="bgxyz3 cx12 relative pa2">
					<div>
						<h1>+</h1>
					</div>
					<span className="dn bgxyz3 cx8 mw6 top-0 left-0 absolute f4 tooltip truncate-ns" style={{ zIndex: 3, width: "256px", display: displayWorkspace ? "block" : "none" }}>
						<div>
							<form className="flex flex-column athelas" onSubmit={handleCreateWorkspace}>
								<div className="pa2">
									<input className="ba bw1 br2 bgx12 bdx12 mr1 mw-100" name="name" placeholder="Space Name" style={{ width: "100%" }} />
								</div>
								<div className="pa2">
									<button className="ba bw1 br2 bgxyz4 bdxyz3 cx12 bgxyz5h bdxyz5h w-100" type="submit" disabled={submitCreateWorkspace}>
										Create
									</button>
								</div>
							</form>
						</div>
					</span>
				</div>
				{Object.keys(spaces).map(function (spaceID, index) {
					const space = spaces[spaceID];
					const className = route.params.space === spaceID ? "bgxyz1 cx12 relative pa2" : "bgxyz3 cx12 relative pa2";
					const spanClassName =
						route.params.space === spaceID
							? "dn bgxyz1 cx12 mw6 w5 top-0 left-0 absolute f4 tooltip truncate-ns"
							: "dn bgxyz3 cx12 mw6 w5 top-0 left-0 absolute f4 tooltip truncate-ns";
					const selectClassName = route.params.space === spaceID ? "ba br2 bgxyz4 bdx2 cx12" : "ba br2 bgx2 bdx2 cxyz7 cxyz12h bgxyz4h bdxyz4h";
					const cancelClassName = route.params.space === spaceID ? "ba br2 bgxyz4 bdx2 cx12 bgx3h bdx3h" : "ba br2 bgx2 bdx2 cx12 bgxyz4h bdxyz4h";
					return (
						<div className={className} key={spaceID}>
							<div>
								<h1>{index + 1}</h1>
							</div>
							<span className={spanClassName} style={{ zIndex: 3, width: "256px", display: displayWorkspace ? "block" : "none" }}>
								<div className="flex flex-column athelas">
									{editWorkspace === spaceID ? renderEditWorkspace(spaceID) : renderDeleteWorkspace(spaceID)}
									<div className="w-100 pa2">
										{editWorkspace === spaceID ? (
											<button className={cancelClassName} style={{ width: "100%" }} onClick={handleExitEditWorkspace(spaceID)}>
												Cancel
											</button>
										) : (
											<a href={router.buildUrl("system.graph.space", { space: spaceID })}>
												<button
													className={selectClassName}
													disabled={route.params.space === spaceID}
													style={{ width: "100%", opacity: route.params.space === spaceID ? "0.5" : "1" }}
												>
													Select
												</button>
											</a>
										)}
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
