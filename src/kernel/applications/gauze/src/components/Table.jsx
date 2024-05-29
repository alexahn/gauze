import React from "react";
import { useState } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import Connection from "./Connection.jsx";
import Relationship from "./Relationship.jsx";
import Input from "./Input.jsx";
import Pagination from "./Pagination.jsx";

import { v4 as uuidv4 } from "uuid";
import { FileTextIcon, TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";

function read(gauze, model, header, variables) {
	const transactions = [
		function () {
			return gauze.read(header, variables).then(function (data) {
				data.forEach(function (item) {
					model.create(item._metadata.type, item._metadata.id, item.attributes);
				});
				return data;
			});
		},
		function () {
			const countVariables = {
				source: variables.source,
				count: {
					[header.primary_key]: header.primary_key,
				},
				where: variables.where,
			};
			return gauze.count(header, countVariables);
		},
	];
	return Promise.all(
		transactions.map(function (f) {
			return f();
		}),
	);
}

export default function Table({
	agentHeader,
	route,
	nodes,
	edges,
	connections,
	node,
	gauze,
	model,
	router,
	graph,
	type,
	table_name,
	from,
	to,
	fields,
	variables,
	data,
	count,
	connectionIDs,
}) {
	if (!type) return;
	const header = model.read("HEADER", type);
	const [localFields, setLocalFields] = useState(fields);
	const [localWhere, setLocalWhere] = useState(variables.where || {});
	const [createItem, setCreateItem] = useState({});
	const [submitCreate, setSubmitCreate] = useState(false);
	const [syncing, setSyncing] = useState(false);

	const activeNodes = graph.activeNodes(agentHeader.name, graph.nodes, graph.edges, graph.connections);
	const activeNodesArray = Object.values(activeNodes);
	const activeNode = activeNodes[node.id];
	const activeConnectionsArray = graph.activeConnectionsArray(graph.nodes, graph.edges, graph.connections);

	const offset = variables.offset ? Number.parseInt(variables.offset) : 0;
	const limit = variables.limit ? Number.parseInt(variables.limit) : PAGINATION_PAGE_SIZE;
	const total = count;
	const page_current = offset + limit < total ? Math.floor(Math.max(offset / limit) + 1) : Math.ceil(Math.max(total / limit));
	const page_max_no_skew = Math.ceil(Math.max(total / limit));
	const page_max = page_max_no_skew < page_current ? page_current : page_max_no_skew;

	function synchronize(targetNode, variables, data, count, method) {
		const synced = graph.syncNodeEdges(targetNode, data);
		console.log("synced", synced, connections, graph.connections);
		targetNode.props.data = data;
		targetNode.props.count = count;
		targetNode.props.variables = variables;
		// sync to service
		/*
		graph.updateNodes(Object.values(nodes));
		graph.updateEdges(Object.values(edges));
		graph.updateConnections(Object.values(connections));
		*/
		// create new edges, connections, and nodes using service
		const newConnections = synced.newConnections.map(function (connection) {
			return {
				...connection,
				component: Relationship,
				props: {
					gauze: gauze,
					model: model,
					router: router,
				},
			};
		});
		const newEdges = synced.newEdges;
		graph.createConnections(newConnections);
		graph.createEdges(newEdges);
		method(targetNode);
		const syncedConnections = graph.syncNodeConnections(graph.nodes, graph.edges, graph.connections);
		console.log("syncedConnections", syncedConnections);
		const connectedNodes = Object.keys(syncedConnections).map(function (id) {
			return {
				...graph.nodes[id],
				props: {
					...graph.nodes[id].props,
					connectionIDs: syncedConnections[id].connections,
				},
			};
		});
		console.log("connectedNodes", connectedNodes);
		graph.updateNodes(connectedNodes);
		console.log("graph.nodes0", graph.nodes);
		graph.updateNodes(
			graph.activeNodesArray(agentHeader.name, graph.nodes, graph.edges, graph.connections).map(function (node) {
				return {
					...node,
					oldWidth: node.width,
					oldHeight: node.height,
					width: null,
					height: null,
				};
			}),
		);
		console.log("graph.nodes1", graph.nodes);
		graph.updateConnections(
			activeConnectionsArray.map(function (connection) {
				return {
					...connection,
					x: null,
					y: null,
				};
			}),
		);
		// sync from service
		/*
		const agentHeader = gauze.getSystemAgentHeader(model);
		setNodes(
			graph.activeNodes(agentHeader.name, graph.nodes, graph.edges, graph.connections, function (node) {
				return {
					...node,
					width: null,
					height: null,
				};
			}),
		);
		setConnections(
			graph.activeConnections(graph.nodes, graph.edges, graph.connections, function (connection) {
				return {
					...connection,
					x: null,
					y: null,
				};
			}),
		);
		setEdges(graph.activeEdges(graph.nodes, graph.edges, graph.connections));
		*/
	}

	function paginate(item) {
		return function (e) {
			var paginate;
			if (item.type === "previous") {
				paginate = {
					limit: limit,
					offset: Math.max(0, offset - limit),
				};
			} else if (item.type === "next") {
				paginate = {
					limit: limit,
					offset: Math.max(0, Math.min((page_max - 1) * limit, offset + limit)),
				};
			} else if (item.type === "page") {
				paginate = {
					limit: limit,
					offset: Math.max(0, (item.page - 1) * limit),
				};
			} else {
				paginate = {
					limit: limit,
					offset: offset,
				};
			}
			setSyncing(true);
			console.log("paginate", variables, paginate);
			const localVariables = {
				...variables,
				...paginate,
			};
			return read(gauze, model, header, localVariables)
				.then(function (results) {
					const data = results[0].map(function (item) {
						return item.attributes;
					});
					const count = results[1][0].count;
					const targetNode = node;
					synchronize(targetNode, localVariables, data, count, function (targetNode) {
						graph.updateNodes([targetNode]);
					});
					setSyncing(false);
				})
				.catch(function (err) {
					setSyncing(false);
					throw err;
				});
		};
	}

	function traverse(targetHeader, targetNode) {
		console.log("targetNode", targetNode);
		setSyncing(true);
		return read(gauze, model, targetHeader, targetNode.props.variables)
			.then(function (results) {
				const data = results[0].map(function (item) {
					return item.attributes;
				});
				const count = results[1][0].count;
				synchronize(targetNode, targetNode.props.variables, data, count, function (targetNode) {
					graph.createNodes([targetNode]);
				});
				setSyncing(false);
			})
			.catch(function (err) {
				setSyncing(false);
				throw err;
			});
	}

	function traverseTo(sourceHeader, item, targetType) {
		return function (e) {
			console.log("traverseTo", sourceHeader, item, targetType);
			// convert graphql to type to name
			const headers = model.all("HEADER");
			const targetHeader = headers.find(function (header) {
				return header.graphql_meta_type === targetType;
			});
			console.log("targetHeader", targetHeader);
			const source = {
				_metadata: {
					type: header.graphql_meta_type,
					id: item[header.primary_key],
				},
				_direction: "to",
			};
			const targetNode = {
				id: uuidv4(),
				oldX: 0,
				oldY: 0,
				x: null,
				y: null,
				z: 1,
				height: null,
				width: null,
				component: Table,
				props: {
					gauze: gauze,
					model: model,
					router: router,
					graph: graph,
					type: targetHeader.name,
					table_name: targetHeader.table_name,
					primary_key: targetHeader.primary_key,
					graphql_meta_type: targetHeader.graphql_meta_type,
					from: source,
					fromNodeID: node.id,
					to: null,
					toNodeID: null,
					fields: targetHeader.fields,
					variables: {
						source: source,
						where: {},
						limit: PAGINATION_PAGE_SIZE,
					},
					data: [],
					count: 0,
				},
				complete: true,
				sound: false,
			};
			return traverse(targetHeader, targetNode);
		};
	}

	function traverseFrom(sourceHeader, item, targetType) {
		return function (e) {
			console.log("traverse", sourceHeader, item, targetType);
			// convert graphql to type to name
			const headers = model.all("HEADER");
			const targetHeader = headers.find(function (header) {
				return header.graphql_meta_type === targetType;
			});
			console.log("targetHeader", targetHeader);
			const source = {
				_metadata: {
					type: header.graphql_meta_type,
					id: item[header.primary_key],
				},
				_direction: "from",
			};
			const targetNode = {
				id: uuidv4(),
				oldX: 0,
				oldY: 0,
				x: null,
				y: null,
				z: 1,
				height: null,
				width: null,
				component: Table,
				props: {
					gauze: gauze,
					model: model,
					router: router,
					graph: graph,
					type: targetHeader.name,
					table_name: targetHeader.table_name,
					primary_key: targetHeader.primary_key,
					graphql_meta_type: targetHeader.graphql_meta_type,
					from: null,
					fromNodeID: null,
					to: source,
					toNodeID: node.id,
					fields: targetHeader.fields,
					variables: {
						source: source,
						where: {},
						limit: PAGINATION_PAGE_SIZE,
					},
					data: [],
					count: 0,
				},
				complete: true,
				sound: false,
			};
			return traverse(targetHeader, targetNode);
		};
	}

	function updateFilter(field) {
		return function (e) {
			if (e.target.value !== "") {
				const updatedWhere = {
					...localWhere,
					[field]: e.target.value,
				};
				setLocalWhere(updatedWhere);
			} else {
				const updatedWhere = {
					...localWhere,
				};
				delete updatedWhere[field];
				setLocalWhere(updatedWhere);
			}
		};
	}

	function applyFilter(field) {
		return function (e) {
			if (e.key === "Enter") {
				setSyncing(true);
				const localVariables = {
					...variables,
					where: localWhere,
					offset: 0,
				};
				return read(gauze, model, header, localVariables)
					.then(function (results) {
						const data = results[0].map(function (item) {
							return item.attributes;
						});
						const count = results[1][0].count;
						const targetNode = node;
						synchronize(targetNode, localVariables, data, count, function (targetNode) {
							graph.updateNodes([targetNode]);
						});
						setSyncing(false);
					})
					.catch(function (err) {
						setSyncing(false);
						throw err;
					});
			}
		};
	}

	function updateFields(name) {
		return function (e) {
			if (e.target.checked) {
				const updatedFields = [...header.fields].filter(function (field) {
					const exists = localFields.find(function (f) {
						return f.name === field.name;
					});
					return exists || field.name === name;
				});
				setLocalFields(updatedFields);
				graph.updateNodes([
					{
						...node,
						width: null,
						height: null,
						props: {
							...node.props,
							fields: updatedFields,
						},
					},
				]);
			} else {
				const updatedFields = [...header.fields].filter(function (field) {
					const exists = localFields.find(function (f) {
						return f.name === field.name;
					});
					return exists && field.name !== name;
				});
				setLocalFields(updatedFields);
				graph.updateNodes([
					{
						...node,
						width: null,
						height: null,
						props: {
							...node.props,
							fields: updatedFields,
						},
					},
				]);
			}
			updateConnections(
				Object.values(connections).map(function (connection) {
					return {
						...connection,
						x: null,
						y: null,
					};
				}),
			);
		};
	}

	function updateCreateItem(field) {
		return function (e) {
			const updatedItem = { ...createItem };
			updatedItem[field] = e.target.value;
			setCreateItem(updatedItem);
		};
	}

	function handleCreate(e) {
		setSubmitCreate(true);
		const expected = "create";
		const input = prompt(`Confirm create by entering '${expected}'`, "");
		if (input === expected) {
			return gauze
				.create(header, {
					source: node.props.variables.source,
					attributes: createItem,
				})
				.then(function (results) {
					if (results && results.length) {
						const created = results[0];
						model.create(header.graphql_meta_type, created.attributes[header.primary_key], created.attributes);
						setSubmitCreate(false);
						//page.push(created.attributes)
						setCreateItem(created.attributes);
					} else {
						// alert the user that something went wrong
						setSubmitCreate(false);
					}
				});
		} else {
			setSubmitCreate(false);
		}
	}
	return (
		<div className="mw-100 w-100">
			<h1 align="center">{header.graphql_meta_type}</h1>
			<hr />
			<div align="left" className="cf">
				<div className="flex fl">
					<Pagination page={page_current} count={page_max} handleClick={paginate} reverse={false} />
				</div>
			</div>
			<hr />
			<div className="flex fr">
				<table>
					<thead className="mw-100">
						<tr align="right" className="flex flex-wrap">
							<th align="center" className="mw4 w4">
								{/*
								<a href={router.buildUrl(route.name, { ...route.params, where: encodeURIComponent(JSON.stringify(localWhere)) })}>
									<button>Filter</button>
								</a>
								*/}
							</th>
							<th className="mw4 w4 pa1 relative row" tabIndex="0">
								<div className="truncate-ns">RELATIONSHIPS</div>
								<span className="dn bg-light-green mw9 w6 top-0 right-0 pa1 absolute f4 tooltip cf">RELATIONSHIPS</span>
							</th>
							{data.map(function (item) {
								return (
									<th key={item[header.primary_key]} align="center" className="mw4 w4 pa1 relative row" tabIndex="0">
										<div className="truncate-ns">FROM</div>
										{node.props.connectionIDs.map(function (id) {
											const connection = connections[id];
											// note: for some reason we need an existence check here. maybe double check our rendering logic?
											// note: possibly related to scaling the window?
											if (
												connection &&
												connection.nodeID === node.id &&
												connection.name === "to" &&
												connection.entityID === item[header.primary_key] &&
												connection.entityType === header.graphql_meta_type
											) {
												//const absolutePosition = absoluteToAbstract(connection);
												return (
													<Connection
														key={id}
														route={route}
														dataX={connection.x}
														dataY={connection.y}
														graph={graph}
														nodes={nodes}
														edges={edges}
														connections={connections}
														node={node}
														connection={connection}
													/>
												);
											} else {
												return null;
											}
										})}
										{/* connection component? */}
										<span className="dn bg-light-green mw9 w6 top-0 right-0 pa1 absolute f4 tooltip cf">
											<div className="pa1">FROM</div>
											{header.relationships_from.map(function (from) {
												return (
													<div key={from} className="pa1">
														<button onClick={traverseFrom(header, item, from)}>{from}</button>
													</div>
												);
											})}
										</span>
									</th>
								);
							})}
							<th align="center" className="mw4 w4"></th>
						</tr>
						<tr align="right" className="flex flex-wrap">
							<th align="center" className="mw4 w4">
								{/*
								<a href={router.buildUrl(route.name, { ...route.params, where: encodeURIComponent(JSON.stringify(localWhere)) })}>
									<button>Filter</button>
								</a>
								*/}
							</th>
							<th className="mw4 w4 pa1 relative row" tabIndex="0">
								<div>FIELDS</div>
								<span className="dn bg-light-green mw9 w6 top-0 right-0 pa1 absolute f4 tooltip cf">
									{header.fields.map(function (field) {
										return (
											<div key={`${field.name}.checkbox`} className="flex fr">
												{field.name}
												<input
													type="checkbox"
													defaultChecked={
														localFields
															? localFields.find(function (v) {
																	return v.name === field.name;
																})
															: true
													}
													onChange={updateFields(field.name)}
												/>
												{/*
												<a href={router.buildUrl(route.name, { ...route.params, order: field.name, order_direction: "asc" })}>
													<button className="f6" disabled={route.params.order && route.params.order === field.name && route.params.order_direction === "asc"}>
														{"<"}
													</button>
												</a>
												<a href={router.buildUrl(route.name, { ...route.params, order: field.name, order_direction: "desc" })}>
													<button className="f6" disabled={route.params.order && route.params.order === field.name && route.params.order_direction === "desc"}>
														{">"}
													</button>
												</a>
												*/}
											</div>
										);
									})}
								</span>
							</th>
							{data.map(function (item) {
								return (
									<th key={item[header.primary_key]} align="left" className="mw4 w4 pt1 flex flex-wrap justify-center">
										<a href={router.buildUrl("system.types.item.type.id", { type: type, id: item[header.primary_key], mode: "view" })}>
											<button className="f5 ml1 mr1">
												<FileTextIcon />
											</button>
										</a>
										<a href={router.buildUrl("system.types.item.type.id", { type: type, id: item[header.primary_key], mode: "edit" })}>
											<button className="f5 ml1 mr1">
												<Pencil2Icon />
											</button>
										</a>
										<a href={router.buildUrl("system.types.item.type.id", { type: type, id: item[header.primary_key], mode: "remove" })}>
											<button className="f5 ml1 mr1">
												<TrashIcon />
											</button>
										</a>
									</th>
								);
							})}
							<th align="center" className="mw4 w4">
								<button className="green" onClick={handleCreate} disabled={submitCreate}>
									Create
								</button>
							</th>
						</tr>
					</thead>
					<tbody align="right" className="mw-100">
						{localFields.map(function (field) {
							return (
								<tr align="right" key={field.name} className="flex flex-wrap">
									<td className="mw4 w4 overflow-x-hidden">
										<Input
											defaultMode={true}
											field={field}
											className="mw4"
											defaultValue={variables.where ? variables.where[field.name] : null}
											onChange={updateFilter(field.name)}
											onKeyDown={applyFilter(field.name)}
											disabled={syncing}
										/>
									</td>
									<td className="relative mw4 w4 pa1 row" tabIndex="0">
										<div className="truncate-ns field">
											<b>{field.name}</b>
										</div>
										<span className="dn bg-light-green mw9 w6 top-0 right-0 pa1 absolute f4 tooltip">
											<b>{field.name}</b>
										</span>
									</td>
									{data.map(function (item) {
										return (
											<td align="left" key={`${item[header.primary_key]}.${field}`} className="relative mw4 w4 pa1 row" tabIndex="0">
												<div className="truncate-ns">{item[field.name]}</div>
												<span className="dn bg-washed-green mw9 w5 top-0 left-0 pa1 absolute f4 tooltip">{item[field.name]}</span>
											</td>
										);
									})}
									<td className="mw4 w4 overflow-x-hidden">
										<Input field={field} className="mw4 w4" value={createItem[field.name]} onChange={updateCreateItem(field.name)} disabled={submitCreate} />
									</td>
								</tr>
							);
						})}
					</tbody>
					<tfoot className="mw-100">
						<tr align="right" className="flex flex-wrap">
							<th align="center" className="mw4 w4">
								{/*
								<a href={router.buildUrl(route.name, { ...route.params, where: encodeURIComponent(JSON.stringify(localWhere)) })}>
									<button>Filter</button>
								</a>
								*/}
							</th>
							<th className="mw4 w4 pa1 relative row" tabIndex="0">
								<div className="truncate-ns">RELATIONSHIPS</div>
								<span className="dn bg-light-green mw9 w6 top-0 right-0 pa1 absolute f4 tooltip cf">RELATIONSHIPS</span>
							</th>
							{data.map(function (item) {
								return (
									<th key={item[header.primary_key]} align="center" className="mw4 w4 pa1 relative row" tabIndex="0">
										<div className="truncate-ns">TO</div>
										{node.props.connectionIDs.map(function (id) {
											const connection = connections[id];
											if (
												connection &&
												connection.nodeID === node.id &&
												connection.name === "from" &&
												connection.entityID === item[header.primary_key] &&
												connection.entityType === header.graphql_meta_type
											) {
												//const absolutePosition = absoluteToAbstract(connection);
												return (
													<Connection
														key={connection.id}
														route={route}
														dataX={connection.x}
														dataY={connection.y}
														graph={graph}
														nodes={nodes}
														edges={edges}
														connections={connections}
														node={node}
														connection={connection}
													/>
												);
											} else {
												return null;
											}
										})}
										<span className="dn bg-light-green mw9 w6 top-0 right-0 pa1 absolute f4 tooltip cf">
											<div className="pa1">TO</div>
											{header.relationships_to.map(function (to) {
												return (
													<div key={to} className="pa1">
														<button onClick={traverseTo(header, item, to)}>{to}</button>
													</div>
												);
											})}
										</span>
									</th>
								);
							})}
							<th align="center" className="mw4 w4"></th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
}
