import React from "react";
import { useState, useEffect } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";
import Table from "./Table.jsx";

import { GearIcon, PlusCircledIcon } from "@radix-ui/react-icons";

export default function Root({ gauze, model, router, route, render, graph }) {
	const agentHeader = gauze.getSystemAgentHeader(model);
	const activeNodes = graph.activeNodes(agentHeader.name);
	const activeConnections = graph.activeConnections(agentHeader.name);
	const activeEdges = graph.activeEdges(agentHeader.name);
	const [nodes, setNodes] = useState(activeNodes.object);
	const [edges, setEdges] = useState(activeEdges.object);
	const [connections, setConnections] = useState(activeConnections.object);
	const [performance, setPerformance] = useState(4);
	function handlePerformance(e) {
		if (e.target.value === "high") {
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
			const activeNodes = graph.activeNodes(agentHeader.name);
			const activeConnections = graph.activeConnections(agentHeader.name);
			const activeEdges = graph.activeEdges(agentHeader.name);
			setNodes(activeNodes.object);
			setConnections(activeConnections.object);
			setEdges(activeEdges.object);
		}, performance);
		return function () {
			clearInterval(timer);
		};
	});
	return (
		<div className="mw-100 mh-100 h-100 w-100">
			<div className="fixed top-1 right-1" style={{ zIndex: 1 }}>
				<div className="relative row" tabIndex="0">
					<GearIcon width={30} height={30} />
					<span className="dn bg-light-green w6 top-0 right-0 pa1 absolute f4 tooltip">
						<label htmlFor="performance">Performance:</label>
						<br />
						<input type="radio" id="performance1" name="performance" value="high" defaultChecked={performance === 4} onChange={handlePerformance} />
						<label htmlFor="performance1">High</label>
						<br />
						<input type="radio" id="performance2" name="performance" value="medium" defaultChecked={performance === 32} onChange={handlePerformance} />
						<label htmlFor="performance2">Medium</label>
						<br />
						<input type="radio" id="performance3" name="performance" value="low" defaultChecked={performance === 256} onChange={handlePerformance} />
						<label htmlFor="performance3">Low</label>
						<br />
					</span>
				</div>
			</div>
			<div className="fixed top-1 left-1" style={{ zIndex: 1}}>
				<PlusCircledIcon width={30} height={30}/>
			</div>
			<Graph key={"graph"} agentHeader={agentHeader} route={route} graph={graph} nodes={nodes} edges={edges} connections={connections} />
		</div>
	);
}
