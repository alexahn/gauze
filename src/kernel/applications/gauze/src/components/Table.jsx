import React from "react";
import { useState } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import * as orchestrate from "./../orchestrate.js";

import Connection from "./Connection.jsx";
import Relationship from "./Relationship.jsx";
import Input from "./Input.jsx";
import Pagination from "./Pagination.jsx";

import { v4 as uuidv4 } from "uuid";
import { Share1Icon, Pencil2Icon, Cross1Icon, BookmarkIcon, BookmarkFilledIcon } from "@radix-ui/react-icons";

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

	const activeNodes = graph.activeNodes(agentHeader.name);
	const activeConnections = graph.activeConnections(agentHeader.name);
	const activeEdges = graph.activeEdges(agentHeader.name);

	const offset = variables.offset ? Number.parseInt(variables.offset) : 0;
	const limit = variables.limit ? Number.parseInt(variables.limit) : PAGINATION_PAGE_SIZE;
	const total = count;
	const page_current = offset + limit < total ? Math.floor(Math.max(offset / limit) + 1) : Math.ceil(Math.max(total / limit));
	const page_max_no_skew = Math.ceil(Math.max(total / limit));
	const page_max = page_max_no_skew < page_current ? page_current : page_max_no_skew;

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
				.read({ gauze, model }, header, localVariables)
				.then(function (results) {
					const data = results[0].map(function (item) {
						return item.attributes;
					});
					const count = results[1][0].count;
					const targetNode = { ...node };
					targetNode.props.variables = localVariables;
					targetNode.props.data = data;
					targetNode.props.count = count;
					return orchestrate
						.synchronize({ gauze, model, graph }, agentHeader, targetNode, function (targetNode) {
							graph.updateNodes([targetNode]);
						})
						.then(function () {
							setSyncing(false);
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
			setSyncing(true);
			return orchestrate
				.traverseTo(
					{
						gauze,
						model,
						router,
						graph,
					},
					agentHeader,
					node,
					item,
					targetType,
				)
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
			setSyncing(true);
			return orchestrate
				.traverseFrom(
					{
						gauze,
						model,
						router,
						graph,
					},
					agentHeader,
					node,
					item,
					targetType,
				)
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
				const targetNode = { ...node };
				targetNode.props.variables = localVariables;
				targetNode.props.data = data;
				targetNode.props.count = count;
				return orchestrate
					.synchronize({ gauze, model, graph }, agentHeader, targetNode, function (targetNode) {
						graph.updateNodes([targetNode]);
					})
					.then(function () {
						setSyncing(false);
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
						...graph.selectNode(node.id),
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
						...graph.selectNode(node.id),
						width: null,
						height: null,
						props: {
							...node.props,
							fields: updatedFields,
						},
					},
				]);
			}
			graph.updateConnections(
				graph.activeConnections(agentHeader.name).values.map(function (connection) {
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
		// for convenience to avoid backend issues
		delete attributes[node.props.primary_key];
		if (input === expected) {
			return gauze
				.create(header, {
					source: node.props.variables.source,
					attributes: attributes,
				})
				.then(function (results) {
					if (results && results.length) {
						const created = results[0];
						model.create(header.graphql_meta_type, created.attributes[header.primary_key], created.attributes);
						setSubmitCreate(false);
						setCreateItem(created.attributes);
						setSyncing(true);
						return orchestrate
							.read({ gauze, model }, header, node.props.variables)
							.then(function (results) {
								const data = results[0].map(function (item) {
									return item.attributes;
								});
								const count = results[1][0].count;
								const targetNode = { ...node };
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
		if (!node.root) {
			graph.deleteNodes([node]);
			synchronize(null);
		}
	}

	return (
		<div className="mw-100 w-100">
			<h1 align="center">{header.graphql_meta_type}</h1>
			<div className="absolute top-0 right-0 pa1">
				{node.root ? null : (
					<button onClick={handleClose}>
						<Cross1Icon />
					</button>
				)}
			</div>
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
						<tr align="right" className="flex">
							<th align="center" className="mw4 w4"></th>
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
											<div className="pa1 from">FROM</div>
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
						<tr align="right" className="flex">
							<th align="center" className="mw4 w4">
								<button onClick={applyFilterButton}>Filter</button>
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
									<th key={item[header.primary_key]} align="left" className="mw4 w4 pt1 flex justify-center">
										<a href={router.buildUrl("system.types.item.type.id", { type: type, id: item[header.primary_key], mode: "edit" })}>
											<button className="">
												<Pencil2Icon />
											</button>
										</a>
										<div className="relative row mw4 w4" tabIndex="0">
											<button className="">
												<BookmarkIcon />
											</button>
											<span className="dn bg-light-green mw4 w4 top-0 right-0 pa1 absolute f4 tooltip">
												{header.methods.map(function (method) {
													return (
														<a key={method.name} href={router.buildUrl("system.types.list.type", { type: "whitelist", where: whitelistWhere(method.name) })}>
															<button className="mw4 w4">{method.name}</button>
														</a>
													);
												})}
											</span>
										</div>
										<div className="relative row mw4 w4" tabIndex="0">
											<button className="">
												<BookmarkFilledIcon />
											</button>
											<span className="dn bg-light-green mw4 w4 top-0 right-0 pa1 absolute f4 tooltip">
												{header.methods.map(function (method) {
													return (
														<a key={method.name} href={router.buildUrl("system.types.list.type", { type: "blacklist", where: blacklistWhere(method.name) })}>
															<button className="mw4 w4">{method.name}</button>
														</a>
													);
												})}
											</span>
										</div>
										<div className="relative row mw4 w4" tabIndex="0">
											<button>
												<Share1Icon />
											</button>
											<span className="dn bg-light-green mw6 w6 top-0 right-0 pa1 absolute f9 tooltip">{JSON.stringify(share)}</span>
										</div>
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
								<tr align="right" key={field.name} className="flex">
									<td className="mw4 w4 overflow-x-hidden">
										<Input
											defaultMode={true}
											field={field}
											className="mw4"
											defaultValue={variables.where ? variables.where[field.name] : null}
											onChange={updateFilter(field.name)}
											onKeyDown={applyFilterEnter(field.name)}
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
						<tr align="right" className="flex">
							<th align="center" className="mw4 w4"></th>
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
