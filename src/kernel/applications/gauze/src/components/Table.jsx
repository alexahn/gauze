import React from "react";
import { memo, useState } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import * as orchestrate from "./../orchestrate.js";

import Connection from "./Connection.jsx";
import Relationship from "./Relationship.jsx";
import Input from "./Input.jsx";
import Pagination from "./Pagination.jsx";

import { v4 as uuidv4 } from "uuid";
import { Share1Icon, Pencil2Icon, Cross1Icon, BookmarkIcon, BookmarkFilledIcon, PlusIcon, MinusIcon } from "@radix-ui/react-icons";

export default memo(function Table({
	agentHeader,
	route,
	link,
	nodes,
	edges,
	connections,
	nodeID,
	depth,
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

	const activeNodes = graph.activeNodes(agentHeader.name);
	const activeConnections = graph.activeConnections(agentHeader.name);
	const activeEdges = graph.activeEdges(agentHeader.name);
	//const node = activeNodes.object[nodeID]

	const offset = variables.offset ? Number.parseInt(variables.offset) : 0;
	const limit = variables.limit ? Number.parseInt(variables.limit) : PAGINATION_PAGE_SIZE;
	const total = count;
	const page_current = offset + limit < total ? Math.floor(Math.max(offset / limit) + 1) : Math.ceil(Math.max(total / limit));
	const page_max_no_skew = Math.ceil(Math.max(total / limit));
	const page_max = page_max_no_skew < page_current ? page_current : page_max_no_skew;

	const services = {
		gauze,
		model,
		router,
		graph,
	};

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
			return orchestrate
				.read(services, header, localVariables)
				.then(function (results) {
					const data = results[0].map(function (item) {
						return item.attributes;
					});
					const count = results[1][0].count;
					const selectedNode = graph.selectNode(nodeID);
					const targetNode = { ...selectedNode };
					targetNode.props.variables = localVariables;
					targetNode.props.data = data;
					targetNode.props.count = count;
					return orchestrate
						.synchronize({ gauze, model, graph }, agentHeader, targetNode, function (targetNode) {
							graph.updateNodes([targetNode]);
						})
						.then(function () {
							return orchestrate.reloadRelationships({ gauze, model, graph }, agentHeader).then(function () {
								setSyncing(false);
							});
						});
				})
				.catch(function (err) {
					setSyncing(false);
					throw err;
				});
		};
	}

	function traverseTo(sourceHeader, item, targetType) {
		return function (e) {
			const selectedNode = graph.selectNode(nodeID);
			setSyncing(true);
			return orchestrate
				.traverseTo(services, agentHeader, selectedNode, item, targetType)
				.then(function () {
					setSyncing(false);
				})
				.catch(function (err) {
					setSyncing(false);
					throw err;
				});
		};
	}

	function traverseFrom(sourceHeader, item, targetType) {
		return function (e) {
			const selectedNode = graph.selectNode(nodeID);
			setSyncing(true);
			return orchestrate
				.traverseFrom(services, agentHeader, selectedNode, item, targetType)
				.then(function () {
					setSyncing(false);
				})
				.catch(function (err) {
					setSyncing(false);
					throw err;
				});
		};
	}

	function filter() {
		setSyncing(true);
		const localVariables = {
			...variables,
			where: localWhere,
			offset: 0,
		};
		return orchestrate
			.read({ gauze, model }, header, localVariables)
			.then(function (results) {
				const data = results[0].map(function (item) {
					return item.attributes;
				});
				const count = results[1][0].count;
				const selectedNode = graph.selectNode(nodeID);
				const targetNode = { ...selectedNode };
				targetNode.props.variables = localVariables;
				targetNode.props.data = data;
				targetNode.props.count = count;
				return orchestrate
					.synchronize(services, agentHeader, targetNode, function (targetNode) {
						graph.updateNodes([targetNode]);
					})
					.then(function () {
						return orchestrate.reloadRelationships({ gauze, model, graph }, agentHeader).then(function () {
							setSyncing(false);
						});
					});
			})
			.catch(function (err) {
				setSyncing(false);
				throw err;
			});
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

	function applyFilterEnter(field) {
		return function (e) {
			if (e.key === "Enter") {
				filter();
			}
		};
	}

	function applyFilterButton(e) {
		filter();
	}

	function updateFields(name) {
		return function (e) {
			const selectedNode = graph.selectNode(nodeID);
			const nodeConnections = graph.nodeConnections(nodeID);
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
						...selectedNode,
						width: null,
						height: null,
						props: {
							...selectedNode.props,
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
						...selectedNode,
						width: null,
						height: null,
						props: {
							...selectedNode.props,
							fields: updatedFields,
						},
					},
				]);
			}
			graph.updateConnections(
				graph.selectConnections(nodeConnections.keys).map(function (connection) {
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
		const attributes = { ...createItem };
		const selectedNode = graph.selectNode(nodeID)
		// for convenience to avoid backend issues
		delete attributes[selectedNode.props.primary_key];
		if (input === expected) {
			return gauze
				.create(header, {
					source: selectedNode.props.variables.source,
					attributes: attributes,
				})
				.then(function (results) {
					if (results && results.length) {
						const selectedNode = graph.selectNode(nodeID);
						const created = results[0];
						model.create(header.graphql_meta_type, created.attributes[header.primary_key], created.attributes);
						setSubmitCreate(false);
						setCreateItem(created.attributes);
						setSyncing(true);
						return orchestrate
							.read(services, header, selectedNode.props.variables)
							.then(function (results) {
								const data = results[0].map(function (item) {
									return item.attributes;
								});
								const count = results[1][0].count;
								const selectedNode = graph.selectNode(nodeID);
								const targetNode = { ...selectedNode };
								targetNode.props.data = data;
								targetNode.props.count = count;
								orchestrate.synchronize({ gauze, model, graph }, agentHeader, targetNode, function (targetNode) {
									graph.updateNodes([targetNode]);
								});
								setSyncing(false);
							})
							.catch(function (err) {
								setSyncing(false);
								throw err;
							});
					} else {
						// alert the user that something went wrong
						setSubmitCreate(false);
					}
				})
				.catch(function (err) {
					setSubmitCreate(false);
					throw err;
				});
		} else {
			setSubmitCreate(false);
		}
	}

	function handleClose(e) {
		const selectedNode = graph.selectNode(nodeID);
		if (!selectedNode.root) {
			graph.deleteNodes([selectedNode]);
			orchestrate.synchronize(services, agentHeader, null);
		}
	}

	function handleDeleteRelationship(connection) {
		return function (e) {
			// find the edge, there should only be one
			const edge = activeEdges.values.find(function (edge) {
				return edge.fromConnectionID === connection.id || edge.toConnectionID === connection.id;
			});

			if (edge) {
				const fromConnection = activeConnections.object[edge.fromConnectionID];
				const toConnection = activeConnections.object[edge.toConnectionID];
				return orchestrate.deleteRelationship(services, agentHeader, {
					fromEntityID: fromConnection.entityID,
					fromEntityType: fromConnection.entityType,
					toEntityID: toConnection.entityID,
					toEntityType: toConnection.entityType,
				});
			} else {
				// should be impossible
				throw new Error("Edge could not be found");
			}
		};
	}

	const colors = {
		0: {
			node: {
				bg: "bgx11",
				bd: "bdx11",
				c: "cx7",
				x: 11,
				bgh: "bgx8h",
				bdh: "bdx8h",
				ch: "cx6h",
				xh: 8,
			},
			/*
			table: {
				bg: "bgx8",
				bd: "bdx8",
				c: "cx6",
				x: 8
			},
			*/
			table: {
				bg: "bgx6",
				bd: "bdx6",
				c: "cxyz7",
				x: 6,
				bgh: "bgx4h",
				bdh: "bdx4h",
				ch: "cx6h",
				xh: 4,
			},
		},
		1: {
			node: {
				bg: "bgx8",
				bd: "bdx8",
				c: "cx6",
				x: 8,
				bgh: "bgx6h",
				bdh: "bdx6h",
				ch: "cxyz7h",
				xh: 6,
			},
			/*
			table: {
				bg: "bgx6",
				bd: "bdx6",
				c: "cxyz7",
				x: 6
			},
			*/
			table: {
				bg: "bgx4",
				bd: "bdx4",
				c: "cx6",
				x: 4,
				bgh: "bgx11h",
				bdh: "bdx11h",
				ch: "cx7h",
				xh: 11,
			},
		},
		2: {
			node: {
				bg: "bgx6",
				bd: "bdx6",
				c: "cxyz7",
				x: 6,
				bgh: "bgx4h",
				bdh: "bdx4h",
				ch: "cx6h",
				xh: 4,
			},
			/*
			table: {
				bg: "bgx4",
				bd: "bdx4",
				c: "cx6",
				x: 4
			},
			*/
			table: {
				bg: "bgx11",
				bd: "bdx11",
				c: "cx7",
				x: 11,
				bgh: "bgx8h",
				bdh: "bdx8h",
				ch: "cx6h",
				xh: 8,
			},
		},
		3: {
			node: {
				bg: "bgx4",
				bd: "bdx4",
				c: "cx6",
				x: 4,
				bgh: "bgx11h",
				bdh: "bdx11h",
				ch: "cx7h",
				xh: 11,
			},
			/*
			table: {
				bg: "bgx11",
				bd: "bdx11",
				c: "cx7",
				x: 11
			},
			*/
			table: {
				bg: "bgx8",
				bd: "bdx8",
				c: "cx6",
				x: 8,
				bgh: "bgx6h",
				bdh: "bdx6h",
				ch: "cxyz7h",
				xh: 6,
			},
		},
	};
	const colorIndex = depth % 4 < 0 ? (depth % 4) + 4 : depth % 4;
	const prevColorIndex = colorIndex - 1 < 0 ? ((colorIndex - 1) % 4) + 4 : colorIndex - 1;
	const prevPrevColorIndex = prevColorIndex - 1 < 0 ? ((prevColorIndex - 1) % 4) + 4 : prevColorIndex - 1;
	const nextColorIndex = (colorIndex + 1) % 4;
	const nextNextColorIndex = (nextColorIndex + 1) % 4;
	const color = colors[colorIndex];
	const prevColor = colors[prevColorIndex];
	const prevPrevColor = colors[prevPrevColorIndex];
	const nextColor = colors[nextColorIndex];
	const nextNextColor = colors[nextNextColorIndex];

	const cellClass = "mw4 w4 br2";
	const buttonClass = `ba br2 ${color.table.bd} ${color.table.bg} ${color.table.c} ${color.table.bdh} ${color.table.bgh} ${color.table.ch}`;
	const buttonPaginationClass = `${buttonClass} mr1`;
	const buttonTableClass = `ba br2 ${nextColor.table.bd} ${nextColor.table.bg} ${nextColor.table.c} ${nextColor.table.bdh} ${nextColor.table.bgh} ${nextColor.table.ch}`;
	const buttonBlackClass = `ba br2 bgx2 bdx2 cx12 bgx12h bdx12h cx2h`;
	const buttonSpanClass = `mw5 w-100 truncate-ns ba bw1 br2 ${nextColor.node.bd} ${nextColor.table.bg} ${nextColor.table.c} ${nextColor.node.bdh} ${nextColor.table.bgh} ${nextColor.table.ch}`;
	const cellInputClass = `${cellClass} ${color.node.bg} ${color.node.bd} ${color.node.bgh} ${color.node.bdh} ${color.node.ch}`;
	const cellInputClass2 = `${cellClass} ${color.node.bg} bdx${color.table.x - 1} bw1`;
	const cellTableClass = `${cellClass} ${color.node.bg} ${color.node.bd} ${color.node.c}`;
	const cellEntityClass = `${cellClass} ${nextColor.node.bg} ${nextColor.node.bd} ${nextColor.node.c}`;
	const inputTableClass = `w-100 br2 ba bw1 ${color.node.bd} ${color.node.bg} ${color.node.c} ${color.node.bdh} ${color.node.bgh} ${color.node.ch}`;
	const spanTableClass = `dn mw9 w6 top-0 right-0 pa1 absolute f4 tooltip ${color.node.bg} bdx2 ${color.node.c} bw1 ba br2`;
	const spanEntityClass = `dn mw5 w5 top-0 left-0 pa1 absolute f4 tooltip bgx${nextColor.node.x - 1} bdx${nextColor.node.x - 1} cx${nextColor.node.x === 6 ? nextColor.node.x + 2 : nextColor.node.x + 1} bw1 ba br2`;
	const spanButtonClass = `dn mw5 w5 top-0 left-0 pa1 absolute f4 tooltip bgx${nextColor.table.x - 1} bdx${nextColor.table.x - 1} cx${nextColor.table.x === 6 ? nextColor.table.x + 2 : nextColor.table.x + 1} br2`;
	const spanButtonLongClass = `dn mw9 w6 top-0 left-0 pa1 absolute f4 tooltip bgx${nextColor.table.x - 1} bdx${nextColor.table.x - 1} cx${nextColor.table.x === 6 ? nextColor.table.x + 2 : nextColor.table.x + 1} br2`;
	const buttonConnectionToClass = `ba br2 ${prevPrevColor.table.bd} ${prevPrevColor.table.bg} ${prevPrevColor.table.c} ${prevPrevColor.table.bdh} ${prevPrevColor.table.bgh} ${prevPrevColor.table.ch}`;
	const buttonSpanConnectionToClass = `ba br2 w-100 mw5 ${nextColor.table.bd} ${nextColor.table.bg} ${nextColor.table.c} ${nextColor.table.bdh} ${nextColor.table.bgh} ${nextColor.table.ch}`;
	const spanConnectionToClass = `dn mw9 w5 top-0 left-0 pa1 absolute f4 tooltip bgx${prevPrevColor.table.x - 1} bdx${prevPrevColor.table.x - 1} cx${prevPrevColor.table.x === 6 ? prevPrevColor.table.x + 2 : prevPrevColor.table.x + 1} bw1 ba br2`;
	const buttonConnectionFromClass = `ba br2 ${nextNextColor.node.bd} ${nextNextColor.node.bg} ${nextNextColor.node.c} ${nextNextColor.node.bdh} ${nextNextColor.node.bgh} ${nextNextColor.node.ch}`;
	const buttonSpanConnectionFromClass = `ba br2 w-100 mw5 ${prevColor.table.bd} ${prevColor.table.bg} ${prevColor.table.c} ${prevColor.table.bdh} ${prevColor.table.bgh} ${prevColor.table.ch}`;
	const spanConnectionFromClass = `dn mw9 w5 top-0 left-0 pa1 absolute f4 tooltip bgx${nextNextColor.node.x - 1} bdx${nextNextColor.node.x - 1} cx${nextNextColor.node.x === 6 ? nextNextColor.node.x + 2 : nextNextColor.node.x + 1} bw1 ba br2`;
	function renderTable() {
		const node = activeNodes.object[nodeID];
		return (
			<div className={`node-component mw-100 w-100 consolas relative ${color.node.bd} ${color.node.bg} ${color.node.c} pa4 br4`}>
				<h1 align="center">{header.graphql_meta_type}</h1>
				{node.props.from ? (
					<div className="absolute top-1 left-1">{`From: ${node.props.from._metadata.id}`}</div>
				) : node.props.to ? (
					<div className="absolute top-1 left-1">{`To:  ${node.props.to._metadata.id}`}</div>
				) : null}
				{node.root ? null : link ? (
					<div className="absolute top-1 right-1">
						<button className={buttonClass} onClick={handleClose}>
							<Cross1Icon />
						</button>
					</div>
				) : null}
				{/*<hr />*/}
				<div align="left" className="cf">
					<div className="flex fl pb2">
						<Pagination page={page_current} count={page_max} handleClick={paginate} reverse={false} buttonClass={buttonPaginationClass} />
					</div>
				</div>
				{/*<hr />*/}
				<div className="flex fr">
					<table className={`${color.table.bd} ${color.table.bg} ${color.table.c} br3`}>
						<thead className="mw-100">
							<tr align="right" className="">
								<th align="center" className={cellTableClass}></th>
								<th className={cellTableClass}>
									<div className="pa1 relative row" tabIndex="0">
										<div className="truncate-ns">RELATIONSHIPS</div>
										<span className={spanTableClass}>RELATIONSHIPS</span>
									</div>
								</th>
								{data.map(function (item) {
									return (
										<th key={item[header.primary_key]} align="center" className={cellEntityClass}>
											<div className="flex justify-center pa1">
												<div className="flex relative row" tabIndex="0">
													<button className={`relationship ${buttonTableClass}`}>
														<div className="w3 truncate-ns">FROM</div>
													</button>
													<span className={spanButtonClass}>
														<div className="pa1">FROM</div>
														{header.relationships_from.map(function (from) {
															return (
																<div key={from} className="pa1">
																	<button className={buttonSpanClass} onClick={traverseFrom(header, item, from)}>
																		{from}
																	</button>
																</div>
															);
														})}
													</span>
												</div>
												{link ? (
													<div
														className="flex pl1 from-start from-end"
														data-interaction="from_end"
														data-node-id={node.id}
														data-entity-id={item[header.primary_key]}
														data-entity-type={header.graphql_meta_type}
													>
														<button className={buttonBlackClass}>
															<PlusIcon />
														</button>
													</div>
												) : null}
											</div>
											{node.props.connectionIDs.map(function (id) {
												//const connection = activeConnections.object[id];
												const connection = graph.selectConnection(id);
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
														<div key={connection.id} className="flex justify-center pa1">
															<Connection
																agentHeader={agentHeader}
																route={route}
																dataX={connection.x}
																dataY={connection.y}
																graph={graph}
																nodeID={nodeID}
																connectionID={connection.id}
																buttonClass={buttonConnectionToClass}
																buttonSpanClass={buttonSpanConnectionToClass}
																spanClass={spanConnectionToClass}
															/>
															{link ? (
																<div className="flex pl1">
																	<button className={buttonTableClass} onClick={handleDeleteRelationship(connection)}>
																		<MinusIcon />
																	</button>
																</div>
															) : null}
														</div>
													);
												} else {
													return null;
												}
											})}
										</th>
									);
								})}
								<th align="center" className={cellTableClass}></th>
							</tr>
							<tr>
								<th align="center" className={cellTableClass}>
									<button className={buttonTableClass} onClick={applyFilterButton}>
										Filter
									</button>
								</th>
								<th className={cellTableClass}>
									<div className="pa1 relative row" tabIndex="0">
										<div>FIELDS</div>
										<span className={spanTableClass}>
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
									</div>
								</th>
								{data.map(function (item) {
									function whitelistWhere(method) {
										const whitelistWhere = encodeURIComponent(
											JSON.stringify({
												gauze__whitelist__entity_id: item[header.primary_key],
												gauze__whitelist__entity_type: header.table_name,
												gauze__whitelist__method: method,
											}),
										);
										return whitelistWhere;
									}
									function blacklistWhere(method) {
										const blacklistWhere = encodeURIComponent(
											JSON.stringify({
												gauze__blacklist__entity_id: item[header.primary_key],
												gauze__blacklist__entity_type: header.table_name,
												gauze__blacklist__method: method,
											}),
										);
										return blacklistWhere;
									}
									const share = {
										entity_id: item[header.primary_key],
										entity_type: header.table_name,
									};
									return (
										<th key={item[header.primary_key]} align="center" valign="middle" className={cellEntityClass}>
											<div className="flex justify-center">
												<div className="relative mw4 w4">
													<a href={router.buildUrl("system.types.item.type.id", { type: type, id: item[header.primary_key], mode: "edit" })}>
														<button className={buttonTableClass}>
															<Pencil2Icon />
														</button>
													</a>
												</div>
												<div className="relative row mw4 w4" tabIndex="0">
													<button className={buttonTableClass}>
														<BookmarkIcon />
													</button>
													<span className={spanButtonClass}>
														<div className="pa1">BLACKLIST</div>
														{header.methods.map(function (method) {
															return (
																<a
																	key={method.name}
																	href={router.buildUrl("system.types.list.type", { type: "blacklist", where: blacklistWhere(method.name) })}
																>
																	<button className={buttonSpanClass}>{method.name}</button>
																</a>
															);
														})}
													</span>
												</div>
												<div className="relative row mw4 w4" tabIndex="0">
													<button className={buttonTableClass}>
														<BookmarkFilledIcon />
													</button>
													<span className={spanButtonClass}>
														<div className="pa1">WHITELIST</div>
														{header.methods.map(function (method) {
															return (
																<a
																	key={method.name}
																	href={router.buildUrl("system.types.list.type", { type: "whitelist", where: whitelistWhere(method.name) })}
																>
																	<button className={buttonSpanClass}>{method.name}</button>
																</a>
															);
														})}
													</span>
												</div>
												<div className="relative row mw4 w4" tabIndex="0">
													<button className={buttonTableClass}>
														<Share1Icon />
													</button>
													<span align="left" className={spanButtonLongClass}>
														{JSON.stringify(share)}
													</span>
												</div>
											</div>
										</th>
									);
								})}
								<th align="center" className={cellTableClass}>
									<button className={buttonTableClass} onClick={handleCreate} disabled={submitCreate}>
										Create
									</button>
								</th>
							</tr>
						</thead>
						<tbody className="mw-100">
							{localFields.map(function (field) {
								return (
									<tr key={field.name} className="">
										<td className={cellTableClass}>
											<Input
												defaultMode={true}
												field={field}
												className={inputTableClass}
												defaultValue={variables.where ? variables.where[field.name] : null}
												onChange={updateFilter(field.name)}
												onKeyDown={applyFilterEnter(field.name)}
												disabled={syncing}
											/>
										</td>
										<td align="right" className={cellTableClass}>
											<div className="relative pa1 row" tabIndex="0">
												<div className="truncate-ns field">{field.name}</div>
												<span className={spanTableClass}>
													{/*<div className="absolute top-0 right-0 field w6">{field.name}</div>*/}
													<div>{field.name}</div>
												</span>
											</div>
										</td>
										{data.map(function (item) {
											return (
												<td align="left" key={`${item[header.primary_key]}.${field}`} className={cellEntityClass}>
													<div className="relative pa1 row" tabIndex="0">
														<div className="truncate-ns entity">{item[field.name]}</div>
														<span className={spanEntityClass}>
															{/*<div className="absolute top-0 left-0">{item[field.name]}</div>*/}
															<div>{item[field.name]}</div>
														</span>
													</div>
												</td>
											);
										})}
										<td className={cellTableClass}>
											<Input field={field} className={inputTableClass} value={createItem[field.name]} onChange={updateCreateItem(field.name)} disabled={submitCreate} />
										</td>
									</tr>
								);
							})}
						</tbody>
						<tfoot className="mw-100">
							<tr align="right" className="">
								<th align="center" className={cellTableClass}></th>
								<th className={cellTableClass}>
									<div className="relative pa1 row" tabIndex="0">
										<div className="truncate-ns">RELATIONSHIPS</div>
										<span className={spanTableClass}>RELATIONSHIPS</span>
									</div>
								</th>
								{data.map(function (item) {
									return (
										<th key={item[header.primary_key]} align="center" className={cellEntityClass}>
											<div className="flex justify-center pa1">
												<div className="flex relative row" tabIndex="0">
													<button className={`relationship ${buttonTableClass}`}>
														<div className="w3 truncate-ns">TO</div>
													</button>
													<span className={spanButtonClass}>
														<div className="">TO</div>
														{header.relationships_to.map(function (to) {
															return (
																<div key={to} className="pa1">
																	<button className={buttonSpanClass} onClick={traverseTo(header, item, to)}>
																		{to}
																	</button>
																</div>
															);
														})}
													</span>
												</div>
												{link ? (
													<div
														className="flex pl1 to-start to-end"
														data-interaction="to_end"
														data-node-id={node.id}
														data-entity-id={item[header.primary_key]}
														data-entity-type={header.graphql_meta_type}
													>
														<button className={buttonBlackClass}>
															<PlusIcon />
														</button>
													</div>
												) : null}
											</div>
											{node.props.connectionIDs.map(function (id) {
												//const connection = activeConnections.object[id];
												const connection = graph.selectConnection(id);
												if (
													connection &&
													connection.nodeID === node.id &&
													connection.name === "from" &&
													connection.entityID === item[header.primary_key] &&
													connection.entityType === header.graphql_meta_type
												) {
													//const absolutePosition = absoluteToAbstract(connection);
													return (
														<div key={connection.id} className="flex justify-center pa1">
															<Connection
																agentHeader={agentHeader}
																route={route}
																dataX={connection.x}
																dataY={connection.y}
																graph={graph}
																nodeID={nodeID}
																connectionID={connection.id}
																buttonClass={buttonConnectionFromClass}
																buttonSpanClass={buttonSpanConnectionFromClass}
																spanClass={spanConnectionFromClass}
															/>
															{link ? (
																<div className="flex pl1">
																	<button className={buttonTableClass} onClick={handleDeleteRelationship(connection)}>
																		<MinusIcon />
																	</button>
																</div>
															) : null}
														</div>
													);
												} else {
													return null;
												}
											})}
										</th>
									);
								})}
								<th align="center" className={cellTableClass}></th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		);
	}
	return renderTable();
});
