import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { BookmarkFilledIcon, BookmarkIcon, Cross1Icon, Pencil2Icon, PlusCircledIcon, ReloadIcon } from "@radix-ui/react-icons";

import Input from "./Input.jsx";
import Link from "./Link.jsx";
import Pagination from "./Pagination.jsx";

const PAGE_SIZE = 8;
const NODE_HORIZONTAL_GAP = 96;
const NODE_VERTICAL_GAP = 64;
const ACCESS_METHODS = ["create", "read", "update", "delete", "count"];
const NODE_FALLBACK_DIMENSIONS = {
	width: 720,
	height: 320,
};

function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

function getNodeDimensions(nodeDimensions, node) {
	return nodeDimensions[node.id] || NODE_FALLBACK_DIMENSIONS;
}

function getRowAnchor(dimensions, id) {
	if (!dimensions.rows) {
		return null;
	}
	return dimensions.rows[String(id)] || null;
}

function edgePoint(node, dimensions, rowAnchor, side) {
	return {
		x: node.x + (side === "right" ? dimensions.width : 0),
		y: node.y + rowAnchor.y,
	};
}

function itemEdgePoint(node, dimensions) {
	return {
		x: node.x,
		y: node.y + clamp(dimensions.height * 0.18, 56, 96),
	};
}

function edgePath(from, to) {
	const direction = to.x >= from.x ? 1 : -1;
	const dx = Math.max(96, Math.abs(to.x - from.x) * 0.5);
	const c1x = from.x + dx * direction;
	const c2x = to.x - dx * direction;
	return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
}

function edgeLabelPosition(from, to) {
	return {
		x: (from.x + to.x) / 2,
		y: (from.y + to.y) / 2 - 12,
	};
}

function buildTraversalEdges(nodes, nodeDimensions) {
	const nodeIndex = {};
	nodes.forEach(function (node) {
		nodeIndex[node.id] = node;
	});
	return nodes.reduce(function (edges, node) {
		if (!node.parentNodeID) {
			return edges;
		}
		const parentNode = nodeIndex[node.parentNodeID];
		if (!parentNode) {
			return edges;
		}
		const parentDimensions = getNodeDimensions(nodeDimensions, parentNode);
		const nodeDimensionsValue = getNodeDimensions(nodeDimensions, node);
		const parentRowAnchor = getRowAnchor(parentDimensions, node.parentEntityID);
		if (!parentRowAnchor) {
			return edges;
		}
		if (node.kind === "item") {
			const from = edgePoint(parentNode, parentDimensions, parentRowAnchor, "right");
			const to = itemEdgePoint(node, nodeDimensionsValue);
			edges.push({
				id: `edge.item.${node.id}`,
				markerID: `project-graph-edge-item-${node.id}-arrow`,
				from,
				to,
				label: "item",
				color: "var(--x7)",
				title: `item: ${node.parentEntityID}`,
			});
			return edges;
		}
		if (node.kind === "access") {
			const from = edgePoint(parentNode, parentDimensions, parentRowAnchor, "right");
			const to = itemEdgePoint(node, nodeDimensionsValue);
			const label = node.accessMethod ? `${node.accessKind} ${node.accessMethod}` : node.accessKind;
			edges.push({
				id: `edge.access.${node.id}`,
				markerID: `project-graph-edge-access-${node.id}-arrow`,
				from,
				to,
				label,
				color: "var(--x7)",
				title: `${label}: ${node.parentEntityID}`,
			});
			return edges;
		}
		if (!node.source) {
			return edges;
		}
		const direction = node.source._direction;
		const sourceType = node.source._metadata.type;
		const targetType = node.header.graphql_meta_type;
		const color = "var(--x7)";
		const label = direction === "from" ? `${targetType} -> ${sourceType}` : `${sourceType} -> ${targetType}`;
		let labeled = false;
		node.items.forEach(function (item, index) {
			const itemID = item._metadata.id;
			const nodeRowAnchor = getRowAnchor(nodeDimensionsValue, itemID);
			if (!nodeRowAnchor) {
				return;
			}
			const from = direction === "from" ? edgePoint(node, nodeDimensionsValue, nodeRowAnchor, "right") : edgePoint(parentNode, parentDimensions, parentRowAnchor, "right");
			const to = direction === "from" ? edgePoint(parentNode, parentDimensions, parentRowAnchor, "left") : edgePoint(node, nodeDimensionsValue, nodeRowAnchor, "left");
			edges.push({
				id: `edge.${node.id}.${index}`,
				markerID: `project-graph-edge-${node.id}-${index}-arrow`,
				from,
				to,
				label: labeled ? "" : label,
				color,
				title: `${direction}: ${node.source._metadata.id} -> ${itemID}`,
			});
			labeled = true;
		});
		return edges;
	}, []);
}

function edgeBounds(edges) {
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	edges.forEach(function (edge) {
		[edge.from, edge.to].forEach(function (point) {
			minX = Math.min(minX, point.x);
			minY = Math.min(minY, point.y);
			maxX = Math.max(maxX, point.x);
			maxY = Math.max(maxY, point.y);
		});
	});
	const padding = 160;
	return {
		x: minX - padding,
		y: minY - padding,
		width: Math.max(1, maxX - minX + padding * 2),
		height: Math.max(1, maxY - minY + padding * 2),
	};
}

function defaultVariables(header) {
	const variables = {
		where_like: {},
		limit: PAGE_SIZE,
		offset: 0,
	};
	if (header.default_order) {
		variables.order = [
			{
				column: header.default_order,
				order: "desc",
			},
		];
	}
	return variables;
}

function traversalVariables(header, source) {
	const variables = {
		source,
		where: {},
		limit: PAGE_SIZE,
		offset: 0,
	};
	if (header.default_order) {
		variables.order = [
			{
				column: header.default_order,
				order: "desc",
			},
		];
	}
	return variables;
}

function accessVariables(header, where) {
	const variables = {
		where,
		limit: PAGE_SIZE,
		offset: 0,
	};
	if (header.default_order) {
		variables.order = [
			{
				column: header.default_order,
				order: "desc",
			},
		];
	}
	return variables;
}

function accessWhere(kind, agent, sourceHeader, item, method) {
	const prefix = `gauze__${kind}`;
	const where = {
		[`${prefix}__entity_id`]: item._metadata.id,
		[`${prefix}__entity_type`]: sourceHeader.table_name,
		[`${prefix}__method`]: method,
	};
	if (agent && agent.aud) {
		where[`${prefix}__realm`] = agent.aud;
	}
	return where;
}

function createAttributesFromVariables(header, variables) {
	const fieldNames = new Set(
		header.fields.map(function (field) {
			return field.name;
		}),
	);
	const modes = variables.where && Object.keys(variables.where).length ? ["where"] : ["where_like"];
	return modes.reduce(function (attributes, mode) {
		const values = variables[mode] || {};
		Object.keys(values).forEach(function (fieldName) {
			const value = values[fieldName];
			if (fieldNames.has(fieldName) && value !== undefined && value !== null && typeof value !== "object") {
				attributes[fieldName] = value;
			}
		});
		return attributes;
	}, {});
}

function isGauzeEntityHeader(header) {
	return ["RELATIONSHIP", "WHITELIST", "BLACKLIST"].indexOf(header.graphql_meta_type) >= 0;
}

function stripFilterVariables(variables, filterMode) {
	const stripped = {
		...variables,
		where: variables.where ? { ...variables.where } : undefined,
		where_like: variables.where_like ? { ...variables.where_like } : undefined,
		where_between: variables.where_between ? { ...variables.where_between } : undefined,
		offset: 0,
	};
	["where", "where_like"].forEach(function (mode) {
		if (stripped[mode]) {
			Object.keys(stripped[mode]).forEach(function (field) {
				if (!stripped[mode][field]) {
					delete stripped[mode][field];
				}
			});
		}
	});
	if (stripped.where_between) {
		Object.keys(stripped.where_between).forEach(function (field) {
			const range = stripped.where_between[field] || [];
			const every =
				range.length === 2 &&
				range.every(function (value) {
					return value;
				});
			if (!every) {
				delete stripped.where_between[field];
			}
		});
	}
	if (filterMode === "where") {
		delete stripped.where_like;
		delete stripped.where_between;
	} else if (filterMode === "where_like") {
		delete stripped.where;
		delete stripped.where_between;
	} else if (filterMode === "where_between") {
		delete stripped.where;
		delete stripped.where_like;
	}
	return stripped;
}

function formatValue(value) {
	if (value === undefined || value === null) {
		return "";
	} else if (typeof value === "object") {
		return JSON.stringify(value);
	} else {
		return String(value);
	}
}

function countToNumber(count) {
	const value = Number.parseInt(count, 10);
	if (Number.isNaN(value)) {
		return 0;
	} else {
		return value;
	}
}

function GraphTable({ node, onReload, onClose, onTraverse, onOpenItem, onOpenAccess, onOpenCreate }) {
	const [filterMode, setFilterMode] = useState(node.filterMode);
	const [localVariables, setLocalVariables] = useState(node.variables);
	const fields = node.header.fields;
	const total = countToNumber(node.count);
	const limit = node.variables.limit ? Number.parseInt(node.variables.limit, 10) : PAGE_SIZE;
	const offset = node.variables.offset ? Number.parseInt(node.variables.offset, 10) : 0;
	const pageCurrent = Math.floor(Math.max(offset / limit) + 1);
	const pageMaxNoSkew = Math.ceil(Math.max(total / limit));
	const pageMax = Math.max(1, pageMaxNoSkew < pageCurrent ? pageCurrent : pageMaxNoSkew);
	const cellClass = "project-graph-cell ba bw1 br2 bdx2 bgx2 cx6";
	const headerCellClass = "project-graph-cell ba bw1 br2 bdx3 bgx3 cx6";
	const rowHeaderCellClass = `${headerCellClass} project-graph-heading`;
	const inputClass = "project-graph-input w-100 ba bw1 br2 bdx3 bgx12 cx2";
	const relationshipTargets = {
		from: node.header.relationships_from || [],
		to: node.header.relationships_to || [],
	};

	useEffect(
		function () {
			setFilterMode(node.filterMode);
			setLocalVariables(node.variables);
		},
		[node.id, node.filterMode, node.variables],
	);

	function updateFilterMode(mode) {
		return function () {
			setFilterMode(mode);
		};
	}

	function updateFilter(field) {
		return function (e) {
			const variables = {
				...localVariables,
				[filterMode]: {
					...(localVariables[filterMode] || {}),
					[field]: e.target.serialized,
				},
			};
			setLocalVariables(variables);
		};
	}

	function updateBetweenFilter(field, index) {
		return function (e) {
			const range = localVariables[filterMode] && localVariables[filterMode][field] ? [...localVariables[filterMode][field]] : [];
			range[index] = e.target.serialized;
			const variables = {
				...localVariables,
				[filterMode]: {
					...(localVariables[filterMode] || {}),
					[field]: range,
				},
			};
			setLocalVariables(variables);
		};
	}

	function applyFilters() {
		const variables = stripFilterVariables(localVariables, filterMode);
		onReload(node.id, variables, filterMode);
	}

	function handleOpenCreate() {
		const variables = stripFilterVariables(localVariables, filterMode);
		onOpenCreate(node, variables);
	}

	function handleFilterKeyDown() {
		return function (e) {
			if (e.key === "Enter") {
				applyFilters();
			}
		};
	}

	function handlePage(item) {
		return function () {
			let paginate;
			if (item.type === "previous") {
				paginate = {
					limit: limit,
					offset: Math.max(0, offset - limit),
				};
			} else if (item.type === "next") {
				paginate = {
					limit: limit,
					offset: Math.max(0, Math.min((pageMax - 1) * limit, offset + limit)),
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
			onReload(
				node.id,
				{
					...node.variables,
					...paginate,
				},
				filterMode,
			);
		};
	}

	function renderModeButtons() {
		return (
			<div className="project-graph-filter-modes flex">
				<button type="button" className={filterMode === "where" ? "active" : ""} onClick={updateFilterMode("where")}>
					Match
				</button>
				<button type="button" className={filterMode === "where_like" ? "active" : ""} onClick={updateFilterMode("where_like")}>
					Search
				</button>
				<button type="button" className={filterMode === "where_between" ? "active" : ""} onClick={updateFilterMode("where_between")}>
					Range
				</button>
			</div>
		);
	}

	function renderFilterRows() {
		if (filterMode === "where_between") {
			return (
				<>
					<tr>
						<th className={rowHeaderCellClass}>
							<div className="project-graph-filter-action">
								<span>Start</span>
								<button type="button" onClick={applyFilters}>
									Apply
								</button>
							</div>
						</th>
						{fields.map(function (field) {
							const defaultValue = localVariables.where_between && localVariables.where_between[field.name] ? localVariables.where_between[field.name][0] : undefined;
							return (
								<th key={field.name} className={cellClass}>
									<Input
										defaultMode={true}
										field={field}
										className={inputClass}
										onChange={updateBetweenFilter(field.name, 0)}
										onKeyDown={handleFilterKeyDown()}
										defaultValue={defaultValue}
									/>
								</th>
							);
						})}
					</tr>
					<tr>
						<th className={rowHeaderCellClass}>
							<div className="project-graph-filter-action">
								<span>End</span>
							</div>
						</th>
						{fields.map(function (field) {
							const defaultValue = localVariables.where_between && localVariables.where_between[field.name] ? localVariables.where_between[field.name][1] : undefined;
							return (
								<th key={field.name} className={cellClass}>
									<Input
										defaultMode={true}
										field={field}
										className={inputClass}
										onChange={updateBetweenFilter(field.name, 1)}
										onKeyDown={handleFilterKeyDown()}
										defaultValue={defaultValue}
									/>
								</th>
							);
						})}
					</tr>
				</>
			);
		} else {
			return (
				<tr>
					<th className={rowHeaderCellClass}>
						<div className="project-graph-filter-action">
							<span>{filterMode === "where" ? "Match" : "Search"}</span>
							<button type="button" onClick={applyFilters}>
								Apply
							</button>
						</div>
					</th>
					{fields.map(function (field) {
						const defaultValue = localVariables[filterMode] ? localVariables[filterMode][field.name] : undefined;
						return (
							<th key={field.name} className={cellClass}>
								<Input
									defaultMode={true}
									field={field}
									className={inputClass}
									onChange={updateFilter(field.name)}
									onKeyDown={handleFilterKeyDown()}
									defaultValue={defaultValue}
								/>
							</th>
						);
					})}
				</tr>
			);
		}
	}

	function renderRelationshipControls(item) {
		if (!relationshipTargets.from.length && !relationshipTargets.to.length) {
			return null;
		}
		function handleRelationshipChange(e) {
			const value = e.target.value;
			e.target.value = "";
			if (!value) {
				return;
			}
			const [direction, targetType] = value.split(":");
			onTraverse(node, item, targetType, direction);
		}
		return (
			<select className="project-graph-row-select ba bw1 br2 bdx3 bgx2 cx6" aria-label="Traverse relationships" defaultValue="" onChange={handleRelationshipChange}>
				<option value="">Link</option>
				{relationshipTargets.from.length ? (
					<optgroup label="From">
						{relationshipTargets.from.map(function (targetType) {
							return (
								<option key={`from.${targetType}`} value={`from:${targetType}`}>
									{targetType}
								</option>
							);
						})}
					</optgroup>
				) : null}
				{relationshipTargets.to.length ? (
					<optgroup label="To">
						{relationshipTargets.to.map(function (targetType) {
							return (
								<option key={`to.${targetType}`} value={`to:${targetType}`}>
									{targetType}
								</option>
							);
						})}
					</optgroup>
				) : null}
			</select>
		);
	}

	function handleOpenItem(item) {
		return function () {
			onOpenItem(node, item);
		};
	}

	function handleOpenAccess(kind, item) {
		return function () {
			onOpenAccess(node, item, kind);
		};
	}

	function renderAccessControls(item) {
		if (isGauzeEntityHeader(node.header)) {
			return null;
		}
		return (
			<>
				<button type="button" className="project-graph-row-link" title="Whitelist" aria-label="Whitelist" onClick={handleOpenAccess("whitelist", item)}>
					<BookmarkFilledIcon />
				</button>
				<button type="button" className="project-graph-row-link" title="Blacklist" aria-label="Blacklist" onClick={handleOpenAccess("blacklist", item)}>
					<BookmarkIcon />
				</button>
			</>
		);
	}

	return (
		<div className="project-graph-node-frame clouds ba bw1 br2 bdx3 bgx12 cx2 shadow-2">
			<div className="project-graph-node-title flex items-center justify-between bgx2 cx6">
				<div className="flex items-center overflow-hidden">
					<div className="project-graph-node-name truncate">{node.header.graphql_meta_type}</div>
					{node.source ? (
						<div className="project-graph-node-source ml2 truncate" title={`${node.source._direction}: ${node.source._metadata.id}`}>
							{node.source._direction}: {node.source._metadata.id}
						</div>
					) : null}
					{node.accessMethod ? (
						<div className="project-graph-node-source ml2 truncate" title={`${node.accessKind}: ${node.accessMethod}`}>
							{node.accessMethod}
						</div>
					) : null}
					<div className="project-graph-node-count ml2">{node.loading ? "Loading" : `${total} rows`}</div>
				</div>
				<div className="project-graph-node-actions flex items-center">
					<button type="button" title="Create" aria-label="Create" onClick={handleOpenCreate}>
						<PlusCircledIcon />
					</button>
					<button type="button" title="Reload" aria-label="Reload" onClick={() => onReload(node.id, node.variables, filterMode)}>
						<ReloadIcon />
					</button>
					<button type="button" title="Close" aria-label="Close" onClick={() => onClose(node.id)}>
						<Cross1Icon />
					</button>
				</div>
			</div>
			<div className="project-graph-node-toolbar flex items-center justify-between">
				{renderModeButtons()}
				<Pagination page={pageCurrent} count={pageMax} handleClick={handlePage} reverse={false} buttonClass="project-graph-page-button ba bw1 br2 bdx3 bgx2 cx6" />
			</div>
			{node.error ? <div className="project-graph-error bgxyz7 cx12 ba bw1 br2 pa2">{node.error}</div> : null}
			<div className="project-graph-table-scroll">
				<table className="project-graph-table">
					<thead>
						{renderFilterRows()}
						<tr>
							<th className={rowHeaderCellClass}>Rows</th>
							{fields.map(function (field) {
								return (
									<th key={field.name} className={headerCellClass} title={field.name}>
										{field.name}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{node.items.map(function (item) {
							const id = item._metadata.id;
							return (
								<tr key={id} data-project-graph-row-id={id}>
									<td className={rowHeaderCellClass}>
										<div className="project-graph-row-actions flex items-center">
											<button type="button" className="project-graph-row-link" title="Open" aria-label="Open" onClick={handleOpenItem(item)}>
												<Pencil2Icon />
											</button>
											{renderAccessControls(item)}
											{renderRelationshipControls(item)}
											<span className="project-graph-row-id truncate" title={id}>
												{id}
											</span>
										</div>
									</td>
									{fields.map(function (field) {
										const value = formatValue(item.attributes[field.name]);
										return (
											<td key={field.name} className={cellClass} title={value}>
												<div className="project-graph-value truncate">{value}</div>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function GraphItemTable({ services, node, onClose, onItemCreate, onItemUpdate, onItemDelete }) {
	const { gauzemodel } = services;
	const [localMode, setLocalMode] = useState(node.mode || "read");
	const [localItem, setLocalItem] = useState(node.item);
	const [localCreateItem, setLocalCreateItem] = useState({ attributes: node.createAttributes || {} });
	const [createFieldError, setCreateFieldError] = useState({});
	const [createModelError, setCreateModelError] = useState("");
	const [updateFieldError, setUpdateFieldError] = useState({});
	const [updateModelError, setUpdateModelError] = useState("");
	const [deleteModelError, setDeleteModelError] = useState("");
	const header = node.header;
	const fields = header.fields;
	const itemID = localItem ? localItem._metadata.id : node.item ? node.item._metadata.id : localMode === "create" ? "new" : "";
	const cellClass = "project-graph-item-cell ba bw1 br2 bdx2 bgx2 cx6";
	const headerCellClass = "project-graph-item-cell ba bw1 br2 bdx3 bgx3 cx6";
	const inputClass = "project-graph-input w-100 ba bw1 br2 bdx3 bgx12 cx2";

	useEffect(
		function () {
			setLocalMode(node.mode || "read");
		},
		[node.id, node.mode],
	);

	useEffect(
		function () {
			setLocalItem(node.item);
			setLocalCreateItem({ attributes: node.createAttributes || {} });
			setCreateFieldError({});
			setCreateModelError("");
			setUpdateFieldError({});
			setUpdateModelError("");
			setDeleteModelError("");
		},
		[node.id, node.item],
	);

	function changeMode(mode) {
		return function () {
			setLocalMode(mode);
		};
	}

	function handleCreateChange(field) {
		return function (e) {
			setLocalCreateItem(function (item) {
				return {
					...item,
					attributes: {
						...item.attributes,
						[field]: e.target.serialized,
					},
				};
			});
		};
	}

	function handleUpdateChange(field) {
		return function (e) {
			setLocalItem(function (item) {
				return {
					...item,
					attributes: {
						...item.attributes,
						[field]: e.target.serialized,
					},
				};
			});
		};
	}

	function handleOnKeyDown() {
		return function () {};
	}

	function handleCreate() {
		const expected = "create";
		const input = prompt(`Confirm action by entering '${expected}'`, "");
		if (input !== expected) {
			return Promise.resolve();
		}
		setCreateFieldError({});
		setCreateModelError("");
		return gauzemodel.default
			.create(header, {
				attributes: localCreateItem.attributes,
			})
			.then(function (rows) {
				if (rows && rows.length) {
					setLocalItem(rows[0]);
					setLocalMode("read");
					onItemCreate(node.id, rows[0]);
				} else {
					setCreateModelError("Something went wrong!");
				}
			})
			.catch(function (err) {
				console.error(err);
				if (err.extensions && err.extensions.field && err.extensions.readable) {
					setCreateFieldError({
						...createFieldError,
						[err.extensions.field.name]: err.extensions.readable,
					});
				} else if (err.extensions && err.extensions.entity && err.extensions.readable) {
					setCreateModelError(err.extensions.readable);
				} else {
					setCreateModelError("Something went wrong!");
				}
			});
	}

	function handleUpdate() {
		if (!localItem) {
			return Promise.resolve();
		}
		const expected = "update";
		const input = prompt(`Confirm action by entering '${expected}'`, "");
		if (input !== expected) {
			return Promise.resolve();
		}
		const previousItem = localItem;
		setUpdateFieldError({});
		setUpdateModelError("");
		return gauzemodel.default
			.update(header, {
				where: {
					[header.primary_key]: localItem._metadata.id,
				},
				attributes: localItem.attributes,
			})
			.then(function (rows) {
				if (rows && rows.length) {
					setLocalItem(rows[0]);
					onItemUpdate(node.id, rows[0], previousItem);
				} else {
					setUpdateModelError("Something went wrong!");
				}
			})
			.catch(function (err) {
				console.error(err);
				if (err.extensions && err.extensions.field && err.extensions.readable) {
					setUpdateFieldError({
						...updateFieldError,
						[err.extensions.field.name]: err.extensions.readable,
					});
				} else if (err.extensions && err.extensions.entity && err.extensions.readable) {
					setUpdateModelError(err.extensions.readable);
				} else {
					setUpdateModelError("Something went wrong!");
				}
			});
	}

	function handleDelete() {
		if (!localItem) {
			return Promise.resolve();
		}
		const expected = "delete";
		const input = prompt(`Confirm action by entering '${expected}'`, "");
		if (input !== expected) {
			return Promise.resolve();
		}
		setDeleteModelError("");
		return gauzemodel.default
			.delete(header, {
				where: {
					[header.primary_key]: localItem._metadata.id,
				},
			})
			.then(function (rows) {
				if (rows && rows.length) {
					const deletedItem = rows[0] || localItem;
					setLocalItem(null);
					onItemDelete(node.id, deletedItem);
				} else {
					setDeleteModelError("Something went wrong!");
				}
			})
			.catch(function (err) {
				console.error(err);
				if (err.extensions && err.extensions.entity && err.extensions.readable) {
					setDeleteModelError(err.extensions.readable);
				} else {
					setDeleteModelError("Something went wrong!");
				}
			});
	}

	function renderModeButtons() {
		if (localMode === "create" && !localItem) {
			return (
				<div className="project-graph-item-modes flex">
					<button type="button" className="active">
						Create
					</button>
				</div>
			);
		}
		return (
			<div className="project-graph-item-modes flex">
				<button type="button" className={localMode === "read" ? "active" : ""} onClick={changeMode("read")}>
					Read
				</button>
				<button type="button" className={localMode === "update" ? "active" : ""} onClick={changeMode("update")}>
					Update
				</button>
				<button type="button" className={localMode === "delete" ? "active" : ""} onClick={changeMode("delete")}>
					Delete
				</button>
			</div>
		);
	}

	function renderCreateValue(field) {
		return (
			<div className="project-graph-item-input-wrap">
				<Input
					defaultMode={true}
					field={field}
					className={inputClass}
					onChange={handleCreateChange(field.name)}
					onKeyDown={handleOnKeyDown(field.name)}
					defaultValue={localCreateItem.attributes[field.name]}
				/>
				{createFieldError[field.name] ? <span className="project-graph-item-error bgxyz7 cx12 ba bw1 br2 pa1">{createFieldError[field.name]}</span> : null}
			</div>
		);
	}

	function renderReadValue(field) {
		return <div className="project-graph-item-value truncate">{formatValue(localItem.attributes[field.name])}</div>;
	}

	function renderUpdateValue(field) {
		return (
			<div className="project-graph-item-input-wrap">
				<Input
					defaultMode={true}
					field={field}
					className={inputClass}
					onChange={handleUpdateChange(field.name)}
					onKeyDown={handleOnKeyDown(field.name)}
					defaultValue={localItem.attributes[field.name]}
				/>
				{updateFieldError[field.name] ? <span className="project-graph-item-error bgxyz7 cx12 ba bw1 br2 pa1">{updateFieldError[field.name]}</span> : null}
			</div>
		);
	}

	function renderDeleteValue(field) {
		return (
			<Input
				defaultMode={true}
				field={field}
				className={inputClass}
				onChange={handleUpdateChange(field.name)}
				onKeyDown={handleOnKeyDown(field.name)}
				defaultValue={localItem.attributes[field.name]}
				disabled={true}
			/>
		);
	}

	function renderRows() {
		if (localMode === "create" && !localItem) {
			return fields.map(function (field) {
				return (
					<tr key={field.name}>
						<td className={cellClass}>
							<div className="project-graph-item-field truncate" title={field.name}>
								{field.name}
							</div>
						</td>
						<td className={cellClass}>{renderCreateValue(field)}</td>
					</tr>
				);
			});
		}
		if (!localItem) {
			return (
				<tr>
					<td className={cellClass} colSpan="2">
						<div className="project-graph-item-message">Item does not exist or has been deleted</div>
					</td>
				</tr>
			);
		}
		return fields.map(function (field) {
			let value;
			if (localMode === "update") {
				value = renderUpdateValue(field);
			} else if (localMode === "delete") {
				value = renderDeleteValue(field);
			} else {
				value = renderReadValue(field);
			}
			return (
				<tr key={field.name}>
					<td className={cellClass}>
						<div className="project-graph-item-field truncate" title={field.name}>
							{field.name}
						</div>
					</td>
					<td className={cellClass}>{value}</td>
				</tr>
			);
		});
	}

	function renderApplyRow() {
		if (localMode === "create" && !localItem) {
			return (
				<tr>
					<td className={cellClass}></td>
					<td className={cellClass}>
						<div className="project-graph-item-input-wrap">
							<button type="button" className="project-graph-item-apply ba bw1 br2 bdx3 bgx2 cx6" onClick={handleCreate}>
								Apply
							</button>
							{createModelError ? <span className="project-graph-item-error bgxyz7 cx12 ba bw1 br2 pa1">{createModelError}</span> : null}
						</div>
					</td>
				</tr>
			);
		}
		if (!localItem || localMode === "read") {
			return null;
		}
		const isDelete = localMode === "delete";
		const error = isDelete ? deleteModelError : updateModelError;
		return (
			<tr>
				<td className={cellClass}></td>
				<td className={cellClass}>
					<div className="project-graph-item-input-wrap">
						<button type="button" className="project-graph-item-apply ba bw1 br2 bdx3 bgx2 cx6" onClick={isDelete ? handleDelete : handleUpdate}>
							Apply
						</button>
						{error ? <span className="project-graph-item-error bgxyz7 cx12 ba bw1 br2 pa1">{error}</span> : null}
					</div>
				</td>
			</tr>
		);
	}

	return (
		<div className="project-graph-item-frame clouds ba bw1 br2 bdx3 bgx12 cx2 shadow-2">
			<div className="project-graph-node-title flex items-center justify-between bgx2 cx6">
				<div className="flex items-center overflow-hidden">
					<div className="project-graph-node-name truncate">{header.graphql_meta_type}</div>
					<div className="project-graph-node-source ml2 truncate" title={itemID}>
						{itemID}
					</div>
				</div>
				<div className="project-graph-node-actions flex items-center">
					<button type="button" title="Close" aria-label="Close" onClick={() => onClose(node.id)}>
						<Cross1Icon />
					</button>
				</div>
			</div>
			<div className="project-graph-node-toolbar flex items-center justify-between">{renderModeButtons()}</div>
			<div className="project-graph-table-scroll">
				<table className="project-graph-item-table">
					<thead>
						<tr>
							<th className={headerCellClass}>Field</th>
							<th className={headerCellClass}>Value</th>
						</tr>
					</thead>
					<tbody>
						{renderRows()}
						{renderApplyRow()}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function GraphEdges({ nodes, nodeDimensions }) {
	const edges = buildTraversalEdges(nodes, nodeDimensions);
	if (!edges.length) {
		return null;
	}
	const bounds = edgeBounds(edges);
	return (
		<svg
			className="project-graph-edges"
			style={{
				left: bounds.x,
				top: bounds.y,
				width: bounds.width,
				height: bounds.height,
			}}
			viewBox={`${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`}
			aria-hidden="true"
		>
			<defs>
				{edges.map(function (edge) {
					return (
						<marker key={edge.id} id={edge.markerID} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
							<path d="M 0 0 L 8 4 L 0 8 z" style={{ fill: edge.color }} />
						</marker>
					);
				})}
			</defs>
			{edges.map(function (edge) {
				const labelPosition = edgeLabelPosition(edge.from, edge.to);
				return (
					<g key={edge.id}>
						<title>{edge.title}</title>
						<path className="project-graph-edge-path" d={edgePath(edge.from, edge.to)} style={{ stroke: edge.color }} markerEnd={`url(#${edge.markerID})`} />
						{edge.label ? (
							<text className="project-graph-edge-label" x={labelPosition.x} y={labelPosition.y} style={{ fill: edge.color }}>
								{edge.label}
							</text>
						) : null}
					</g>
				);
			})}
		</svg>
	);
}

function EntityPicker({ headers, onAdd }) {
	const [filter, setFilter] = useState("");
	const filteredHeaders = headers.filter(function (header) {
		return header.graphql_meta_type.toLowerCase().indexOf(filter.toLowerCase()) >= 0 || header.table_name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
	});
	return (
		<aside className="project-graph-sidebar bgx2 cx6 ba bw1 bdx3">
			<div className="project-graph-sidebar-header">
				<div className="project-graph-sidebar-title">Entities</div>
				<input className="project-graph-sidebar-filter ba bw1 br2 bdx3 bgx12 cx2" value={filter} onChange={(e) => setFilter(e.target.value)} />
			</div>
			<div className="project-graph-entity-list">
				{filteredHeaders.map(function (header) {
					return (
						<button key={header.name} className="project-graph-entity-button ba bw1 br2 bdx3 bgx3 cx6" type="button" onClick={() => onAdd(header)} title={header.table_name}>
							<PlusCircledIcon />
							<span className="truncate">{header.graphql_meta_type}</span>
						</button>
					);
				})}
			</div>
		</aside>
	);
}

function Graph({ pathfinder, services, agent, headers }) {
	const viewportRef = useRef();
	const nodeElementsRef = useRef({});
	const [nodes, setNodes] = useState([]);
	const [nodeDimensions, setNodeDimensions] = useState({});
	const [viewport, setViewport] = useState({ x: 24, y: 24, z: 1 });
	const [dragging, setDragging] = useState(null);
	const { gauzemodel } = services;
	const nodeMeasureSignature = nodes
		.map(function (node) {
			const itemCount = node.items ? node.items.length : node.item ? 1 : 0;
			return [node.id, node.kind || "table", node.header.fields.length, itemCount, node.loading, node.count, node.filterMode, node.mode, node.error].join(":");
		})
		.join("|");

	function updateNode(id, updater) {
		setNodes(function (nodes) {
			return nodes.map(function (node) {
				if (node.id === id) {
					return updater(node);
				} else {
					return node;
				}
			});
		});
	}

	function countVariables(header, variables) {
		return {
			source: variables.source,
			count: {
				[header.primary_key]: header.primary_key,
			},
			where: variables.where,
			where_in: variables.where_in,
			where_not_in: variables.where_not_in,
			where_like: variables.where_like,
			where_between: variables.where_between,
		};
	}

	function reloadNode(id, variables, filterMode, selectedNodeOverride) {
		const selectedNode =
			selectedNodeOverride ||
			nodes.find(function (node) {
				return node.id === id;
			});
		setNodes(function (nodes) {
			return nodes.map(function (node) {
				if (node.id === id) {
					return {
						...node,
						variables,
						filterMode,
						loading: true,
						error: "",
					};
				} else {
					return node;
				}
			});
		});
		if (!selectedNode) {
			return Promise.resolve();
		}
		const header = selectedNode.header;
		const read = gauzemodel.default
			.read(header, variables)
			.then(function (items) {
				return {
					items,
				};
			})
			.catch(function (err) {
				return {
					items: [],
					error: err.message,
				};
			});
		const count = gauzemodel.default
			.count(header, countVariables(header, variables))
			.then(function (counts) {
				return {
					count: counts && counts.length ? counts[0].count : 0,
				};
			})
			.catch(function (err) {
				return {
					count: 0,
					error: err.message,
				};
			});
		return Promise.all([read, count]).then(function (results) {
			const readResult = results[0];
			const countResult = results[1];
			updateNode(id, function (node) {
				return {
					...node,
					items: readResult.items,
					count: countResult.count,
					loading: false,
					error: readResult.error || countResult.error || "",
				};
			});
		});
	}

	function addNode(header) {
		const variables = defaultVariables(header);
		const offset = nodes.length * 32;
		const node = {
			id: uuidv4(),
			header,
			variables,
			filterMode: "where_like",
			items: [],
			count: 0,
			x: 24 + offset,
			y: 24 + offset,
			loading: true,
			error: "",
		};
		setNodes(function (nodes) {
			return nodes.concat(node);
		});
		return reloadNode(node.id, variables, node.filterMode, node);
	}

	function addTraversalNode(sourceNode, item, targetType, direction) {
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		if (!targetHeader) {
			return Promise.resolve();
		}
		const source = {
			_metadata: {
				type: sourceNode.header.graphql_meta_type,
				id: item._metadata.id,
			},
			_direction: direction,
		};
		const variables = traversalVariables(targetHeader, source);
		const sourceDimensions = getNodeDimensions(nodeDimensions, sourceNode);
		const xOffset = direction === "to" ? sourceDimensions.width + NODE_HORIZONTAL_GAP : -(sourceDimensions.width + NODE_HORIZONTAL_GAP);
		const node = {
			id: uuidv4(),
			header: targetHeader,
			source,
			parentNodeID: sourceNode.id,
			parentEntityID: item._metadata.id,
			variables,
			filterMode: "where_like",
			items: [],
			count: 0,
			x: sourceNode.x + xOffset,
			y: sourceNode.y + NODE_VERTICAL_GAP,
			loading: true,
			error: "",
		};
		setNodes(function (nodes) {
			return nodes.concat(node);
		});
		return reloadNode(node.id, variables, node.filterMode, node);
	}

	function addItemNode(sourceNode, item) {
		const sourceDimensions = getNodeDimensions(nodeDimensions, sourceNode);
		const node = {
			id: uuidv4(),
			kind: "item",
			header: sourceNode.header,
			item,
			mode: "update",
			parentNodeID: sourceNode.id,
			parentEntityID: item._metadata.id,
			x: sourceNode.x + sourceDimensions.width + NODE_HORIZONTAL_GAP,
			y: sourceNode.y + NODE_VERTICAL_GAP,
		};
		setNodes(function (nodes) {
			return nodes.concat(node);
		});
		return Promise.resolve();
	}

	function addCreateNode(sourceNode, variables) {
		const sourceDimensions = getNodeDimensions(nodeDimensions, sourceNode);
		const node = {
			id: uuidv4(),
			kind: "item",
			header: sourceNode.header,
			item: null,
			mode: "create",
			createAttributes: createAttributesFromVariables(sourceNode.header, variables || sourceNode.variables),
			parentNodeID: sourceNode.id,
			x: sourceNode.x + sourceDimensions.width + NODE_HORIZONTAL_GAP,
			y: sourceNode.y + NODE_VERTICAL_GAP,
		};
		setNodes(function (nodes) {
			return nodes.concat(node);
		});
		return Promise.resolve();
	}

	function addAccessNode(sourceNode, item, kind) {
		const targetType = kind === "whitelist" ? "WHITELIST" : "BLACKLIST";
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		if (!targetHeader) {
			return Promise.resolve();
		}
		const sourceDimensions = getNodeDimensions(nodeDimensions, sourceNode);
		const accessNodes = ACCESS_METHODS.map(function (method, index) {
			const variables = accessVariables(targetHeader, accessWhere(kind, agent, sourceNode.header, item, method));
			return {
				id: uuidv4(),
				kind: "access",
				accessKind: kind,
				accessMethod: method,
				header: targetHeader,
				variables,
				filterMode: "where",
				items: [],
				count: 0,
				parentNodeID: sourceNode.id,
				parentEntityID: item._metadata.id,
				x: sourceNode.x + sourceDimensions.width + NODE_HORIZONTAL_GAP,
				y: sourceNode.y + NODE_VERTICAL_GAP + index * (NODE_FALLBACK_DIMENSIONS.height + NODE_VERTICAL_GAP),
				loading: true,
				error: "",
			};
		});
		setNodes(function (nodes) {
			return nodes.concat(accessNodes);
		});
		return Promise.all(
			accessNodes.map(function (node) {
				return reloadNode(node.id, node.variables, node.filterMode, node);
			}),
		);
	}

	function itemMatches(a, b) {
		if (!a || !b) {
			return false;
		}
		return a._metadata.type === b._metadata.type && a._metadata.id === b._metadata.id;
	}

	function createGraphItem(itemNodeID, createdItem) {
		const itemNode = nodes.find(function (node) {
			return node.id === itemNodeID;
		});
		const parentNode =
			itemNode && itemNode.parentNodeID
				? nodes.find(function (node) {
						return node.id === itemNode.parentNodeID;
					})
				: null;
		setNodes(function (nodes) {
			return nodes.map(function (node) {
				if (node.id === itemNodeID) {
					return {
						...node,
						item: createdItem,
						mode: "read",
					};
				} else if (node.kind === "item" && itemMatches(node.item, createdItem)) {
					return {
						...node,
						item: createdItem,
					};
				} else {
					return node;
				}
			});
		});
		if (parentNode && parentNode.items) {
			return reloadNode(parentNode.id, parentNode.variables, parentNode.filterMode, parentNode);
		}
		return Promise.resolve();
	}

	function updateGraphItem(itemNodeID, updatedItem, previousItem = updatedItem) {
		setNodes(function (nodes) {
			return nodes.map(function (node) {
				if (node.id === itemNodeID) {
					return {
						...node,
						item: updatedItem,
					};
				} else if (node.kind === "item" && (itemMatches(node.item, previousItem) || itemMatches(node.item, updatedItem))) {
					return {
						...node,
						item: updatedItem,
					};
				} else if (node.items) {
					return {
						...node,
						items: node.items.map(function (item) {
							if (itemMatches(item, previousItem) || itemMatches(item, updatedItem)) {
								return updatedItem;
							} else {
								return item;
							}
						}),
					};
				} else {
					return node;
				}
			});
		});
	}

	function deleteGraphItem(itemNodeID, deletedItem) {
		setNodes(function (nodes) {
			return nodes.map(function (node) {
				if (node.id === itemNodeID) {
					return {
						...node,
						item: null,
					};
				} else if (node.kind === "item" && itemMatches(node.item, deletedItem)) {
					return {
						...node,
						item: null,
					};
				} else if (node.items) {
					return {
						...node,
						items: node.items.filter(function (item) {
							return !itemMatches(item, deletedItem);
						}),
					};
				} else {
					return node;
				}
			});
		});
	}

	function closeNode(id) {
		setNodes(function (nodes) {
			return nodes.filter(function (node) {
				return node.id !== id;
			});
		});
	}

	function registerNodeElement(id) {
		return function (element) {
			if (element) {
				nodeElementsRef.current[id] = element;
			} else {
				delete nodeElementsRef.current[id];
			}
		};
	}

	function handleNodeMouseDown(id) {
		return function (e) {
			if (e.button !== 0) return;
			e.preventDefault();
			e.stopPropagation();
			const node = nodes.find(function (node) {
				return node.id === id;
			});
			if (!node) return;
			setDragging({
				type: "node",
				id,
				startX: e.clientX,
				startY: e.clientY,
				nodeX: node.x,
				nodeY: node.y,
			});
		};
	}

	function handleViewportMouseDown(e) {
		if (e.button !== 0) return;
		if (e.target.closest(".project-graph-node")) return;
		if (e.target.closest(".project-graph-sidebar")) return;
		setDragging({
			type: "viewport",
			startX: e.clientX,
			startY: e.clientY,
			viewportX: viewport.x,
			viewportY: viewport.y,
		});
	}

	function handleWheel(e) {
		e.preventDefault();
		const rect = viewportRef.current.getBoundingClientRect();
		const nextZ = clamp(viewport.z * (e.deltaY > 0 ? 0.9 : 1.1), 0.35, 2.5);
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		const worldX = (mouseX - viewport.x) / viewport.z;
		const worldY = (mouseY - viewport.y) / viewport.z;
		setViewport({
			x: mouseX - worldX * nextZ,
			y: mouseY - worldY * nextZ,
			z: nextZ,
		});
	}

	useEffect(
		function () {
			function handleMouseMove(e) {
				if (!dragging) return;
				if (dragging.type === "node") {
					const dx = (e.clientX - dragging.startX) / viewport.z;
					const dy = (e.clientY - dragging.startY) / viewport.z;
					updateNode(dragging.id, function (node) {
						return {
							...node,
							x: dragging.nodeX + dx,
							y: dragging.nodeY + dy,
						};
					});
				} else if (dragging.type === "viewport") {
					setViewport({
						...viewport,
						x: dragging.viewportX + e.clientX - dragging.startX,
						y: dragging.viewportY + e.clientY - dragging.startY,
					});
				}
			}
			function handleMouseUp() {
				setDragging(null);
			}
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
			return function () {
				window.removeEventListener("mousemove", handleMouseMove);
				window.removeEventListener("mouseup", handleMouseUp);
			};
		},
		[dragging, viewport],
	);

	useEffect(
		function () {
			function measureNodes() {
				setNodeDimensions(function (previousDimensions) {
					const nextDimensions = {};
					nodes.forEach(function (node) {
						const element = nodeElementsRef.current[node.id];
						if (!element) {
							return;
						}
						const width = element.offsetWidth;
						const height = element.offsetHeight;
						const rows = {};
						const tableScroll = element.querySelector(".project-graph-table-scroll");
						if (tableScroll) {
							element.querySelectorAll("[data-project-graph-row-id]").forEach(function (row) {
								const rowTop = row.offsetTop - tableScroll.scrollTop;
								const rowBottom = rowTop + row.offsetHeight;
								if (rowBottom < 0 || rowTop > tableScroll.clientHeight) {
									return;
								}
								rows[row.dataset.projectGraphRowId] = {
									y: tableScroll.offsetTop + rowTop + row.offsetHeight / 2,
								};
							});
						}
						nextDimensions[node.id] = {
							width,
							height,
							rows,
						};
					});
					const changed = JSON.stringify(previousDimensions) !== JSON.stringify(nextDimensions);
					return changed ? nextDimensions : previousDimensions;
				});
			}
			measureNodes();
			window.addEventListener("resize", measureNodes);
			const scrollElements = [];
			let observer;
			if (typeof ResizeObserver !== "undefined") {
				observer = new ResizeObserver(measureNodes);
				nodes.forEach(function (node) {
					const element = nodeElementsRef.current[node.id];
					if (element) {
						observer.observe(element);
					}
				});
			}
			nodes.forEach(function (node) {
				const element = nodeElementsRef.current[node.id];
				if (!element) {
					return;
				}
				const tableScroll = element.querySelector(".project-graph-table-scroll");
				if (tableScroll) {
					scrollElements.push(tableScroll);
					tableScroll.addEventListener("scroll", measureNodes);
				}
			});
			return function () {
				window.removeEventListener("resize", measureNodes);
				scrollElements.forEach(function (tableScroll) {
					tableScroll.removeEventListener("scroll", measureNodes);
				});
				if (observer) {
					observer.disconnect();
				}
			};
		},
		[nodeMeasureSignature],
	);

	return (
		<div className="project-graph-shell bgx12">
			<div className="project-graph-toolbar fixed top-1 left-1 flex items-center">
				<Link href={pathfinder.stateToURL("project.system.headers", {}, {})} push={true}>
					<button type="button" className="ba bw1 br2 bdx3 bgx2 cx6">
						Headers
					</button>
				</Link>
				<div className="project-graph-zoom ba bw1 br2 bdx3 bgx2 cx6">{Math.round(viewport.z * 100)}%</div>
			</div>
			<div ref={viewportRef} className="project-graph-viewport" onMouseDown={handleViewportMouseDown} onWheel={handleWheel}>
				<div
					className="project-graph-plane"
					style={{
						transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.z})`,
					}}
				>
					<GraphEdges nodes={nodes} nodeDimensions={nodeDimensions} />
					{nodes.map(function (node) {
						return (
							<div
								key={node.id}
								className="project-graph-node absolute"
								ref={registerNodeElement(node.id)}
								style={{
									transform: `translate(${node.x}px, ${node.y}px)`,
								}}
							>
								<div className="project-graph-drag-handle" onMouseDown={handleNodeMouseDown(node.id)} />
								{node.kind === "item" ? (
									<GraphItemTable
										services={services}
										node={node}
										onClose={closeNode}
										onItemCreate={createGraphItem}
										onItemUpdate={updateGraphItem}
										onItemDelete={deleteGraphItem}
									/>
								) : (
									<GraphTable
										node={node}
										onReload={reloadNode}
										onClose={closeNode}
										onTraverse={addTraversalNode}
										onOpenItem={addItemNode}
										onOpenAccess={addAccessNode}
										onOpenCreate={addCreateNode}
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<EntityPicker headers={headers} onAdd={addNode} />
		</div>
	);
}

export default Graph;
