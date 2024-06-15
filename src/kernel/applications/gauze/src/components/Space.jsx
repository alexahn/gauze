import React from "react";
import { useState, useEffect } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import * as orchestrate from "./../orchestrate.js";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";
import Table from "./Table.jsx";

import { GearIcon, PlusCircledIcon, Link2Icon, LinkBreak2Icon } from "@radix-ui/react-icons";

export default function Space({ gauze, model, router, route, render, graph }) {
	const spaceID = route.params.space;
	const agentHeader = gauze.getSystemAgentHeader(model);
	const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
	const activeConnections = graph.spaceActiveConnections(agentHeader.name, spaceID);
	const activeEdges = graph.spaceActiveEdges(agentHeader.name, spaceID);
	const [nodes, setNodes] = useState(activeNodes.object);
	const [edges, setEdges] = useState(activeEdges.object);
	const [connections, setConnections] = useState(activeConnections.object);
	const [interaction, setInteraction] = useState(graph.readInteraction());
	const [performance, setPerformance] = useState(128);
	const [share, setShare] = useState();
	const [displayShare, setDisplayShare] = useState(false);
	const [link, setLink] = useState(false);
	const [displayWorkspace, setDisplayWorkspace] = useState(false);
	const services = {
		gauze,
		model,
		router,
		graph,
	};
	function toggleShare(e) {
		setDisplayShare(!displayShare);
	}
	function updateShare(e) {
		setShare(e.target.value.replace("\n", ""));
	}
	function handleShare(e) {
		let parsed;
		try {
			parsed = JSON.parse(share);
			const headers = model.all("HEADER");
			const targetHeader = headers.find(function (header) {
				return header.table_name === parsed.entity_type;
			});
			return orchestrate
				.traverseSpaceRoot(
					services,
					agentHeader,
					spaceID,
					{
						[targetHeader.primary_key]: parsed.entity_id,
					},
					targetHeader.graphql_meta_type,
				)
				.then(function () {
					setShare("");
					setDisplayShare(!displayShare);
				});
		} catch (e) {
			console.error(e);
		}
	}
	function handleLink(e) {
		setLink(!link);
	}
	function handlePerformance(e) {
		if (e.target.value === "max") {
			setPerformance(0);
		} else if (e.target.value === "high") {
			setPerformance(4);
		} else if (e.target.value === "medium") {
			setPerformance(32);
		} else if (e.target.value === "low") {
			setPerformance(128);
		} else {
			setPerformance(128);
		}
	}
	function handleWorkspaceEnter(e) {
		setDisplayWorkspace(true);
	}
	function handleWorkspaceLeave(e) {
		setDisplayWorkspace(false);
	}
	useEffect(function () {
		const timer = setInterval(function () {
			const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
			const activeConnections = graph.spaceActiveConnections(agentHeader.name, spaceID);
			const activeEdges = graph.spaceActiveEdges(agentHeader.name, spaceID);
			const interaction = graph.readInteraction();
			setNodes(activeNodes.object);
			setConnections(activeConnections.object);
			setEdges(activeEdges.object);
			setInteraction(interaction);
		}, performance);
		return function () {
			clearInterval(timer);
		};
	});
	//console.log("graph.spaces", graph.spaces);
	//console.log("nodes", nodes);
	return (
		<div className="mw-100 mh-100 h-100 w-100">
			<div className="fixed top-1 right-1" style={{ zIndex: 1 }}>
				<div className="relative row" tabIndex="0">
					<GearIcon width={30} height={30} />
					<span className="dn bg-light-green mw6 w5 top-0 right-0 pa1 absolute f4 tooltip">
						<label htmlFor="performance">Performance:</label>
						<br />
						<input type="radio" id="performance0" name="performance" value="max" defaultChecked={performance === 0} onChange={handlePerformance} />
						<label htmlFor="performance1">Max</label>
						<br />
						<input type="radio" id="performance1" name="performance" value="high" defaultChecked={performance === 4} onChange={handlePerformance} />
						<label htmlFor="performance1">High</label>
						<br />
						<input type="radio" id="performance2" name="performance" value="medium" defaultChecked={performance === 32} onChange={handlePerformance} />
						<label htmlFor="performance2">Medium</label>
						<br />
						<input type="radio" id="performance3" name="performance" value="low" defaultChecked={performance === 128} onChange={handlePerformance} />
						<label htmlFor="performance3">Low</label>
						<br />
					</span>
				</div>
			</div>
			<div className="fixed top-1 left-1" style={{ zIndex: 1 }}>
				<div className="relative">
					<PlusCircledIcon width={30} height={30} onClick={toggleShare} />
					<span className="dn bg-light-green w6 top-0 left-0 pa1 absolute f4" style={{ display: displayShare ? "block" : "none" }}>
						<textarea value={share} onChange={updateShare} rows="4" cols="30" autoFocus={true} />
						<button onClick={handleShare}>Add</button>
						<button onClick={toggleShare}>Cancel</button>
					</span>
				</div>
			</div>
			<div className="fixed bottom-1 right-1" style={{ zIndex: 1 }}>
				{link ? <LinkBreak2Icon width={30} height={30} onClick={handleLink} /> : <Link2Icon width={30} height={30} onClick={handleLink} />}
			</div>
			<div className="fixed top-0 left-0 flex items-center mh-100 h-100 mw-100" style={{ zIndex: 3 }}>
				<div
					className="workspaces flex flex-column mh-75 overflow-y-auto overflow-x-hidden"
					style={{ width: displayWorkspace ? "256px" : "100%", maxHeight: "75%" }}
					onMouseEnter={handleWorkspaceEnter}
					onMouseLeave={handleWorkspaceLeave}
				>
					<div className="bgx10 relative">
						<div>
							<h1>1!</h1>
						</div>
						<span
							className="dn bg-light-green mw6 w5 top-0 left-0 pa1 absolute f4 tooltip truncate-ns"
							style={{ zIndex: 3, width: "256px", display: displayWorkspace ? "block" : "none" }}
						>
							Workspace Workspace 1
						</span>
					</div>
					<div className="bgx10 relative">
						<div>
							<h1>2!</h1>
						</div>
						<span
							className="dn bg-light-green mw6 w5 top-0 left-0 pa1 absolute f4 tooltip truncate-ns"
							style={{ zIndex: 3, width: "256px", display: displayWorkspace ? "block" : "none" }}
						>
							Workspace Workspace 2
						</span>
					</div>
					<div className="bgx10 relative">
						<div>
							<h1>3!</h1>
						</div>
						<span
							className="dn bg-light-green mw6 w5 top-0 left-0 pa1 absolute f4 tooltip truncate-ns"
							style={{ zIndex: 3, width: "256px", display: displayWorkspace ? "block" : "none" }}
						>
							Workspace Workspace 3
						</span>
					</div>
				</div>
			</div>
			<Graph
				key={"graph"}
				agentHeader={agentHeader}
				route={route}
				gauze={gauze}
				model={model}
				router={router}
				link={link}
				graph={graph}
				nodes={nodes}
				edges={edges}
				connections={connections}
				interaction={interaction}
			/>
			<div className="graph-background bgx12 mw-100 mh-100 h-100 w-100 fixed top-0 left-0" style={{ zIndex: -2, width: "100%", height: "100%" }} />
		</div>
	);
}
