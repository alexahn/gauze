import React from "react";
import { useState } from "react";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";

export default function Root({ gauze, model, router, route, render }) {
	const [nodes, setNodes] = useState(function () {
		console.log('ONLY CALL ONCE')
		return [
		{
			key: "1",
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: node1,
			props: {},
		},
		{
			key: "2",
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: node2,
			props: {},
		},
		{
			key: "3",
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: node1,
			props: {},
		},
		{
			key: "4",
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: node2,
			props: {},
		},
		{
			key: "5",
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: node1,
			props: {},
		},
		{
			key: "6",
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: node2,
			props: {},
		},
	]})
	function initializeNode(index, { width, height }) {
		console.log('initializeNode', index, width, height)
		const updated = [...nodes]
		updated[index] = {
			...updated[index],
			width,
			height
		}
		console.log('updated', updated)
		setNodes(updated)
	}
	function updateNode(index, { x, y, z }) {
		const updated = [...nodes]
		updated[index] = {
			...updated[index],
			x,
			y,
			z
		}
		setNodes(updated)
	}
	function node1({text}) {
		return <h1>Hello {text}</h1>;
	}
	function node2({text}) {
		return <h1>Goodbye {text}</h1>;
	}
	/*
	setTimeout(function () {
		console.log('NODES MODIFIED')
		const updated = nodes.map(function (node) {
			return {
				...node,
				props: {
					text: "begin"
				}
			}
		})
		updated.push({
			...updated[0],
			props: {
				text: "end"
			}
		})
		setNodes(updated)
		console.log('nodes', nodes)
	}, 5000)
	*/
    const initializeStart = nodes.findIndex(function (position) {
        return position.width === null && position.height === null
    })
    if (0 <= initializeStart) {
        setTimeout(function () {
            console.log('initializing', initializeStart)
            render.create(route.name, 'NODE', initializeStart, true)
        }, 0)
    }
	return <Graph key={"graph"} route={route} render={render} nodes={nodes} setNodes={setNodes} initializeNode={initializeNode} updateNode={updateNode} />;
}
