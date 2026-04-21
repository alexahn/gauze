import React from "react";
import { useState, useEffect } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import * as orchestrate from "./../orchestrate.js";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";
import Table from "./Table.jsx";
import SpacesBar from "./SpacesBar.jsx";
import Popover from "./Popover.jsx";

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
	const [link, setLink] = useState(false);
	const services = {
		gauze,
		model,
		router,
		graph,
	};
	function updateShare(e) {
		setShare(e.target.value.replace("\n", ""));
	}
	function handleShare() {
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
				});
		} catch (e) {
			console.error(e);
		}
	}
	function handleLink(e) {
		setLink(!link);
		const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
		const activeConnections = graph.spaceActiveConnections(agentHeader.name, spaceID);
		graph.updateSpaceNodes(
			agentHeader.name,
			spaceID,
			graph.selectNodes(activeNodes.keys).map(function (node) {
				return {
					...node,
					width: null,
					height: null,
				};
			}),
		);
		graph.updateSpaceConnections(
			agentHeader.name,
			spaceID,
			graph.selectConnections(activeConnections.keys).map(function (connection) {
				return {
					...connection,
					x: null,
					y: null,
				};
			}),
		);
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
			<div className="fixed top-1 left-1" style={{ zIndex: 4 }}>
				<Popover
					containerClassName="relative"
					buttonClassName="button-reset bg-transparent bn pa0"
					buttonContent={<PlusCircledIcon width={30} height={30} />}
					popoverClassName="bgx2 br3 w6 pa3 f4 bw1 ba"
				>
					<div className="flex flex-column">
						<div className="">
							<textarea
								className="bgx12 br2"
								placeholder={'{"entity_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","entity_type": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}'}
								value={share}
								onChange={updateShare}
								rows="4"
								cols="30"
							/>
						</div>
						<div className="flex justify-end w-100 pt3">
							<button className="ba bw1 br2 bgx8 bdx8 cx6 mr1" onClick={handleShare}>
								Add
							</button>
						</div>
					</div>
				</Popover>
			</div>
			<div className="fixed top-1 right-1" style={{ zIndex: 1 }}>
				<Popover
					containerClassName="relative"
					align="right"
					buttonClassName="button-reset bg-transparent bn pa0"
					buttonContent={<GearIcon width={30} height={30} />}
					popoverClassName="bgx2 cx12 br3 mw6 w5 pa3 f4 bw1 ba"
				>
					<label htmlFor="performance">Performance:</label>
					<br />
					<input type="radio" id="performance0" name="performance" value="max" defaultChecked={performance === 0} onChange={handlePerformance} />
					&nbsp;
					<label htmlFor="performance1">Max</label>
					<br />
					<input type="radio" id="performance1" name="performance" value="high" defaultChecked={performance === 4} onChange={handlePerformance} />
					&nbsp;
					<label htmlFor="performance1">High</label>
					<br />
					<input type="radio" id="performance2" name="performance" value="medium" defaultChecked={performance === 32} onChange={handlePerformance} />
					&nbsp;
					<label htmlFor="performance2">Medium</label>
					<br />
					<input type="radio" id="performance3" name="performance" value="low" defaultChecked={performance === 128} onChange={handlePerformance} />
					&nbsp;
					<label htmlFor="performance3">Low</label>
					<br />
				</Popover>
			</div>
			<div className="fixed bottom-1 right-1" style={{ zIndex: 1 }}>
				{link ? <LinkBreak2Icon width={30} height={30} onClick={handleLink} /> : <Link2Icon width={30} height={30} onClick={handleLink} />}
			</div>
			<div className="fixed top-1 left-1 flex items-center mh-100 h-100 mw-100" style={{ zIndex: 3 }}>
				<SpacesBar route={route} agentHeader={agentHeader} gauze={gauze} model={model} router={router} graph={graph} spaces={spaces} />
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
			<div className="graph-background bgx12 mw-100 mh-100 h-100 w-100 fixed top-0 left-0" style={{ zIndex: -2, width: "100%", height: "100%" }}>
				{/*
				<div className="fixed wrapper w-100 h-100">
					<div className="one bgx1" />
					<div className="two bgx2" />
					<div className="three bgx3" />
					<div className="four bgx4" />
					<div className="five bgx5" />
					<div className="six bgx6" />
					<div className="seven bgx7" />
					<div className="eight bgx8" />
					<div className="nine bgx9" /> 
					<div className="ten bgx10" /> 
					<div className="eleven bgx11" />
					<div className="twelve bgx12" />
				</div>
				*/}
			</div>
		</div>
	);
}
