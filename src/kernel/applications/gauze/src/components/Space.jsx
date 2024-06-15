import React from "react";
import { useState, useEffect } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import * as orchestrate from "./../orchestrate.js";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";
import Table from "./Table.jsx";
import SpacesBar from "./SpacesBar.jsx";

import { GearIcon, PlusCircledIcon, Link2Icon, LinkBreak2Icon } from "@radix-ui/react-icons";

export default function Space({ gauze, model, router, route, render, graph }) {
	const spaceID = route.params.space;
	const agentHeader = gauze.getSystemAgentHeader(model);
	const activeSpaces = graph.agentActiveSpaces(agentHeader.name);
	const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
	const activeConnections = graph.spaceActiveConnections(agentHeader.name, spaceID);
	const activeEdges = graph.spaceActiveEdges(agentHeader.name, spaceID);
	const [spaces, setSpaces] = useState(activeSpaces.object);
	const [nodes, setNodes] = useState(activeNodes.object);
	const [edges, setEdges] = useState(activeEdges.object);
	const [connections, setConnections] = useState(activeConnections.object);
	const [interaction, setInteraction] = useState(graph.readInteraction());
	const [performance, setPerformance] = useState(0);
	const [share, setShare] = useState();
	const [displayShare, setDisplayShare] = useState(false);
	const [link, setLink] = useState(false);
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
	useEffect(function () {
		const timer = setInterval(function () {
			const activeSpaces = graph.agentActiveSpaces(agentHeader.name);
			const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
			const activeConnections = graph.spaceActiveConnections(agentHeader.name, spaceID);
			const activeEdges = graph.spaceActiveEdges(agentHeader.name, spaceID);
			const interaction = graph.readInteraction();
			setSpaces(activeSpaces.object);
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
			<div className="fixed top-1 left-1" style={{ zIndex: 1 }}>
				<div className="relative">
					<PlusCircledIcon width={30} height={30} onClick={toggleShare} />
					<span className="dn bgx2 br2 w6 top-0 left-0 pa3 absolute f4" style={{ display: displayShare ? "block" : "none" }}>
						<div className="flex flex-column">
							<div className="">
								<textarea
									className="bgx12 br2"
									placeholder={'{"entity_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","entity_type": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}'}
									value={share}
									onChange={updateShare}
									rows="4"
									cols="30"
									autoFocus={true}
								/>
							</div>
							<div className="flex justify-end w-100 pt3">
								<button className="ba bw1 br2 bgx8 bdx8 cx6 mr1" onClick={handleShare}>
									Add
								</button>
								<button className="ba bw1 br2 bgx10 bdx10 cx6" onClick={toggleShare}>
									Cancel
								</button>
							</div>
						</div>
					</span>
				</div>
			</div>
			<div className="fixed top-1 right-1" style={{ zIndex: 1 }}>
				<div className="relative row" tabIndex="0">
					<GearIcon width={30} height={30} />
					<span className="dn bgx2 cx12 br2 mw6 w5 top-0 right-0 pa3 absolute f4 tooltip">
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
			<div className="fixed bottom-1 right-1" style={{ zIndex: 1 }}>
				{link ? <LinkBreak2Icon width={30} height={30} onClick={handleLink} /> : <Link2Icon width={30} height={30} onClick={handleLink} />}
			</div>
			<div className="fixed top-0 left-0 flex items-center mh-100 h-100 mw-100" style={{ zIndex: 3 }}>
				<SpacesBar spaces={spaces} route={route} router={router} graph={graph} />
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
