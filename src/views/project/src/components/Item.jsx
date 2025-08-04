import * as React from "react";
import { useState } from "react";

import Input from "./Input.jsx";

function Item({ pathfinder, services, header, item, mode, variables = {} }) {
	const [localMode, setLocalMode] = useState(mode);
	const [localItem, setLocalItem] = useState(item);
	// note: we are populating the initial attributes from where_like, so that the selection is preserved when going from table view to item view
	const [localCreateItem, setLocalCreateItem] = useState({ attributes: variables.where_like || {} });
	const [createFieldError, setCreateFieldError] = useState({});
	const [createModelError, setCreateModelError] = useState("");
	const [updateFieldError, setUpdateFieldError] = useState({});
	const [updateModelError, setUpdateModelError] = useState("");
	const [deleteModelError, setDeleteModelError] = useState("");
	const { gauzemodel } = services;
	const cellClass = "relative tooltip-container ba bw1 br2 mb1 bgx2 bdx2 cx6 bgx3h bdx3h cx6h w100";
	const itemClass = "athelas f6 clouds w-100 truncate-ns mw5";
	const tooltipClass = "absolute tooltip athelas f6 dn bgx2 cx6 mw5 w5 top-0 left-0 ba bw1 br2";
	function changeMode(localMode) {
		return function (e) {
			setLocalMode(localMode);
		};
	}
	function handleCreateChange(field) {
		return function (e) {
			setLocalCreateItem({
				...localCreateItem,
				attributes: {
					...localCreateItem.attributes,
					[field]: e.target.serialized,
				},
			});
		};
	}
	function handleUpdateChange(field) {
		return function (e) {
			setLocalItem({
				...localItem,
				attributes: {
					...localItem.attributes,
					[field]: e.target.serialized,
				},
			});
		};
	}
	function handleCreate() {
		const expected = "create";
		const input = prompt(`Confirm action by entering '${expected}'`, "");
		if (input === expected) {
			setCreateFieldError({});
			setCreateModelError("");
			return gauzemodel.default
				.create(header, {
					attributes: localCreateItem.attributes,
				})
				.then(function (rows) {
					if (rows && rows.length) {
						setLocalCreateItem(rows[0]);
					} else {
						setCreateModelError("Something went wrong!");
					}
				})
				.catch(function (err) {
					console.error(err);
					if (err.extensions && err.extensions.field && err.extensions.readable) {
						// scalar error
						setCreateFieldError({
							...createFieldError,
							[err.extensions.field.name]: err.extensions.readable,
						});
					} else if (err.extensions && err.extensions.entity && err.extensions.readable) {
						setCreateModelError(err.extensions.readable);
					} else {
						setCreateModelError("Something went wrong!")
					}
				});
		}
	}
	function handleUpdate() {
		const expected = "update";
		const input = prompt(`Confirm action by entering '${expected}'`, "");
		if (input === expected) {
			setUpdateFieldError({});
			setUpdateModelError("");
			return gauzemodel.default
				.update(header, {
					where: {
						[header.primary_key]: item._metadata.id,
					},
					attributes: localItem.attributes,
				})
				.then(function (rows) {
					if (rows && rows.length) {
						setLocalItem(rows[0]);
					} else {
						setUpdateModelError("Something went wrong!");
					}
				})
				.catch(function (err) {
					console.error(err);
					if (err.extensions && err.extensions.field && err.extensions.readable) {
						// scalar error
						setUpdateFieldError({
							...updateFieldError,
							[err.extensions.field.name]: err.extensions.readable,
						});
					} else if (err.extensions && err.extensions.entity && err.extensions.readable) {
						setUpdateModelError(err.extensions.readable);
					} else {
						setUpdateModelError("Something went wrong!")
					}
				});
		}
	}
	function handleDelete() {
		const expected = "delete";
		const input = prompt(`Confirm action by entering '${expected}'`, "");
		if (input === expected) {
			setDeleteModelError("");
			return gauzemodel.default
				.delete(header, {
					where: {
						[header.primary_key]: item._metadata.id,
					},
				})
				.then(function (rows) {
					if (rows && rows.length) {
						// setLocalItem({ attributes: {})
					} else {
						setDeleteModelError("Something went wrong!");
					}
				})
				.catch(function (err) {
					console.error(err);
					if (err.extensions && err.extensions.entity && err.extensions.readable) {
						setDeleteModelError(err.extensions.readable);
					} else {
						setDeleteModelError("Something went wrong!")
					}
				});
		}
	}
	function handleOnKeyDown(field) {
		return function (e) {};
	}
	function renderCreate(item) {
		if (item) {
			return <div>Item already exists</div>;
		} else {
			return (
				<div key={"create"}>
					<table>
						<thead>
							<tr>
								<th className={cellClass} tabIndex="0">
									<div className={itemClass}>
										<button type="button" className="athelas f6">
											Create
										</button>
									</div>
								</th>
								<th className={cellClass}></th>
							</tr>
							<tr>
								<th className={cellClass}>
									<div className={itemClass}>Field</div>
								</th>
								<th className={cellClass}>
									<div className={itemClass}>Value</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{header.fields.map(function (field) {
								return (
									<tr key={field.name}>
										<td className={cellClass}>
											<div className={itemClass}>{field.name}</div>
										</td>
										<td className={cellClass}>
											<div className={itemClass}>
												<Input
													defaultMode={true}
													field={field}
													className="w-100 mw5"
													onChange={handleCreateChange(field.name)}
													onKeyDown={handleOnKeyDown(field.name)}
													defaultValue={localCreateItem.attributes[field.name]}
												/>
												{createFieldError[field.name] ? <span className="absolute left-4 top-0 w5 bgxyz7 pa1 br2">{createFieldError[field.name]}</span> : null}
											</div>
										</td>
									</tr>
								);
							})}
							<tr>
								<td className={cellClass}></td>
								<td className={cellClass} align="center">
									<div className={itemClass}>
										<button type="button" className="athelas f6" onClick={handleCreate}>
											Apply
										</button>
										{createModelError ? <span className="absolute left-4 top-0 w5 bgxyz7 pa1 br2">{createModelError}</span> : null}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}
	}
	function renderRead(item) {
		if (item) {
			return (
				<div key={"read"}>
					<table>
						<thead>
							<tr>
								<th className={cellClass} tabIndex="0">
									<div className={itemClass}>
										<button type="button" className="athelas f6">
											Read
										</button>
									</div>
									<span className={tooltipClass}>
										<button type="button" className="athelas f6" onClick={changeMode("read")}>
											Read
										</button>
										<button type="button" className="athelas f6" onClick={changeMode("update")}>
											Update
										</button>
										<button type="button" className="athelas f6" onClick={changeMode("delete")}>
											Delete
										</button>
									</span>
								</th>
								<th className={cellClass}></th>
							</tr>
							<tr>
								<th className={cellClass}>
									<div className={itemClass}>Field</div>
								</th>
								<th className={cellClass}>
									<div className={itemClass}>Value</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{header.fields.map(function (field) {
								return (
									<tr key={field.name}>
										<td className={cellClass}>
											<div className={itemClass}>{field.name}</div>
										</td>
										<td className={cellClass}>
											<div className={itemClass}>{item.attributes[field.name]}</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			);
		} else {
			return <div>Item does not exist or has been deleted</div>;
		}
	}
	function renderUpdate(item) {
		if (item) {
			return (
				<div key={"update"}>
					<table>
						<thead>
							<tr>
								<th className={cellClass} tabIndex="0">
									<div className={itemClass}>
										<button type="button" className="athelas f6">
											Update
										</button>
									</div>
									<span className={tooltipClass}>
										<button type="button" className="athelas f6" onClick={changeMode("read")}>
											Read
										</button>
										<button type="button" className="athelas f6" onClick={changeMode("update")}>
											Update
										</button>
										<button type="button" className="athelas f6" onClick={changeMode("delete")}>
											Delete
										</button>
									</span>
								</th>
								<th className={cellClass}></th>
							</tr>
							<tr>
								<th className={cellClass}>
									<div className={itemClass}>Field</div>
								</th>
								<th className={cellClass}>
									<div className={itemClass}>Value</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{header.fields.map(function (field) {
								return (
									<tr key={field.name}>
										<td className={cellClass}>
											<div className={itemClass}>{field.name}</div>
										</td>
										<td className={cellClass}>
											<div className={itemClass}>
												<Input
													defaultMode={true}
													field={field}
													className="w-100 mw5"
													onChange={handleUpdateChange(field.name)}
													onKeyDown={handleOnKeyDown(field.name)}
													defaultValue={localItem.attributes[field.name]}
												/>
												{updateFieldError[field.name] ? <span className="absolute left-4 top-0 w5 bgxyz7 pa1 br2">{updateFieldError[field.name]}</span> : null}
											</div>
										</td>
									</tr>
								);
							})}
							<tr>
								<td className={cellClass}></td>
								<td className={cellClass} align="center">
									<div className={itemClass}>
										<button type="button" className="athelas f6" onClick={handleUpdate}>
											Apply
										</button>
										{updateModelError ? <span className="absolute left-4 top-0 w5 bgxyz7 pa1 br2">{updateModelError}</span> : null}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		} else {
			return <div>Item does not exist or has been deleted</div>;
		}
	}
	function renderDelete(item) {
		if (item) {
			return (
				<div key={"delete"}>
					<table>
						<thead>
							<tr>
								<th className={cellClass} tabIndex="0">
									<div className={itemClass}>
										<button type="button" className="athelas f6">
											Delete
										</button>
									</div>
									<span className={tooltipClass}>
										<button type="button" className="athelas f6" onClick={changeMode("read")}>
											Read
										</button>
										<button type="button" className="athelas f6" onClick={changeMode("update")}>
											Update
										</button>
										<button type="button" className="athelas f6" onClick={changeMode("delete")}>
											Delete
										</button>
									</span>
								</th>
								<th className={cellClass}></th>
							</tr>
							<tr>
								<th className={cellClass}>
									<div className={itemClass}>Field</div>
								</th>
								<th className={cellClass}>
									<div className={itemClass}>Value</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{header.fields.map(function (field) {
								return (
									<tr key={field.name}>
										<td className={cellClass}>
											<div className={itemClass}>{field.name}</div>
										</td>
										<td className={cellClass}>
											<div className={itemClass}>
												<Input
													defaultMode={true}
													field={field}
													className="w-100 mw5"
													onChange={handleUpdateChange(field.name)}
													onKeyDown={handleOnKeyDown(field.name)}
													defaultValue={localItem.attributes[field.name]}
													disabled={true}
												/>
											</div>
										</td>
									</tr>
								);
							})}
							<tr>
								<td className={cellClass}></td>
								<td className={cellClass} align="center">
									<div className={itemClass}>
										<button type="button" className="athelas f6" onClick={handleDelete}>
											Apply
										</button>
										{deleteModelError ? <span className="absolute left-4 top-0 w5 bgxyz7 pa1 br2">{deleteModelError}</span> : null}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		} else {
			return <div>Item does not exist or has been deleted</div>;
		}
	}
	if (localMode === "create") {
		return renderCreate(localItem);
	} else if (localMode === "read") {
		return renderRead(localItem);
	} else if (localMode === "update") {
		return renderUpdate(localItem);
	} else if (localMode === "delete") {
		return renderDelete(localItem);
	} else {
		return <div>Invalid item action</div>;
	}
}

export default Item;
