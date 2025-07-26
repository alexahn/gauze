import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FileTextIcon, TrashIcon, Pencil2Icon, BookmarkIcon, BookmarkFilledIcon, Share1Icon, Link2Icon, ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import Input from "./Input.jsx";

export default function TypeItem({ router, route, gauze, model, fields }) {
	const [submitUpdate, setSubmitUpdate] = useState(false);
	const [submitDelete, setSubmitDelete] = useState(false);
	const header = model.read("HEADER", route.params.type);
	//const headerFields = header.attributes.split(" ");
	const headerFields = header.graphql_attributes_string.split(" ");
	const item = model.read(header.graphql_meta_type, route.params.id) || {};
	const [readItem, setReadItem] = useState(item);
	const [updateItem, setUpdateItem] = useState(item);
	const [updateError, setUpdateError] = useState(null);

	useEffect(() => {
		const subscriptionID = uuidv4();
		model.subscribe(header.graphql_meta_type, route.params.id, subscriptionID, function (item) {
			if (item) {
				setReadItem(item);
			} else {
				setReadItem({});
			}
		});
		return () => {
			model.unsubscribe(header.graphql_meta_type, route.params.id, subscriptionID);
		};
	}, [model, route]);

	function updateFields(field) {
		return function (e) {
			const updatedFields = {};
			header.fields.forEach(function (field) {
				updatedFields[field.name] = true;
			});
			fields.forEach(function (field) {
				delete updatedFields[field.name];
			});
			if (e.target.checked) {
				delete updatedFields[field];
			} else {
				updatedFields[field] = true;
			}
			router.navigate(route.name, { ...route.params, fields: encodeURIComponent(JSON.stringify(updatedFields)) });
		};
	}
	function handleDelete(e) {
		setSubmitDelete(true);
		const expected = "delete";
		const input = prompt(`Confirm delete by entering '${expected}'`, "");
		if (input === expected) {
			return gauze
				.delete(header, {
					where: {
						[header.primary_key]: route.params.id,
					},
				})
				.then(function (results) {
					if (results && results.length) {
						const deleted = results[0];
						model.delete(header.graphql_meta_type, route.params.id);
						setSubmitDelete(false);
					} else {
						// alert the user that something went wrong
						setSubmitDelete(false);
					}
				});
			setSubmitDelete(false);
		} else {
			setSubmitDelete(false);
		}
	}
	function localUpdateItem(field) {
		return function (e) {
			// todo: deserialize value from input field to format that graphql expects
			const updatedItem = { ...updateItem };
			updatedItem[field] = e.target.value;
			setUpdateItem(updatedItem);
		};
	}
	function handleUpdate(e) {
		setSubmitUpdate(true);
		const expected = "update";
		const input = prompt(`Confirm update by entering '${expected}'`, "");
		setUpdateError(null);
		if (input === expected) {
			return gauze
				.update(header, {
					where: {
						[header.primary_key]: route.params.id,
					},
					attributes: updateItem,
				})
				.then(function (results) {
					if (results && results.length) {
						const updated = results[0];
						model.update(header.graphql_meta_type, route.params.id, updated.attributes);
						setSubmitUpdate(false);
					} else {
						// alert the user that something went wrong
						setSubmitUpdate(false);
					}
				})
				.catch(function (err) {
					setSubmitUpdate(false);
					if (err.extensions && err.extensions.field && err.extensions.readable) {
						// scalar error
						setUpdateError(err.extensions);
					}
				});
		} else {
			// ignore
			setSubmitUpdate(false);
		}
	}
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
	const relationshipFromWhere = encodeURIComponent(
		JSON.stringify({
			gauze__relationship__from_id: item[header.primary_key],
			gauze__relationship__from_type: header.table_name,
		}),
	);
	const relationshipToWhere = encodeURIComponent(
		JSON.stringify({
			gauze__relationship__to_id: item[header.primary_key],
			gauze__relationship__to_type: header.table_name,
		}),
	);
	const share = {
		entity_id: item[header.primary_key],
		entity_type: header.table_name,
	};
	return (
		<div className="type-item mw-100 w-100">
			<h1 align="right">{header.graphql_meta_type}</h1>
			<div align="right">Type Item</div>
			<hr />
			<div align="right" className="cf">
				<nav>
					<div className="flex pa1 fr">
						<div className="relative">
							<a href={router.buildUrl("system.types.list.type", { type: "relationship", where: relationshipToWhere })}>
								<button>
									<ChevronUpIcon />
								</button>
							</a>
						</div>
						<div className="relative">
							<a href={router.buildUrl("system.types.list.type", { type: "relationship", where: relationshipFromWhere })}>
								<button>
									<ChevronDownIcon />
								</button>
							</a>
						</div>
						<div className="relative row" tabIndex="0">
							<a>
								<button>
									<Share1Icon />
								</button>
							</a>
							<span className="dn bg-light-green mw6 w6 top-0 right-0 pa1 absolute f9 tooltip">{JSON.stringify(share)}</span>
						</div>
						<div className="relative row" tabIndex="0">
							<a>
								<button>
									<BookmarkFilledIcon />
								</button>
							</a>
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
						<div className="relative row" tabIndex="0">
							<a>
								<button>
									<BookmarkIcon />
								</button>
							</a>
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
						<div>
							<a href={router.buildUrl(route.name, { ...route.params, mode: "remove" })}>
								<button className="action" type="button" disabled={route.params.mode === "remove"}>
									<TrashIcon />
								</button>
							</a>
						</div>
						<div>
							<a href={router.buildUrl(route.name, { ...route.params, mode: "edit" })}>
								<button className="action" type="button" disabled={route.params.mode === "edit"}>
									<Pencil2Icon />
								</button>
							</a>
						</div>
						<div>
							<a href={router.buildUrl(route.name, { ...route.params, mode: "view" })}>
								<button className="action" type="button" disabled={route.params.mode === "view"}>
									<FileTextIcon />
								</button>
							</a>
						</div>
					</div>
				</nav>
			</div>
			<div align="right">
				{updateError ? (
					<div>
						Update failed on field "{updateError.field.name}": {updateError.readable}
					</div>
				) : null}
			</div>
			<hr />
			<div className="flex fr">
				<table>
					<thead className="flex flex-wrap mw-100">
						<tr className="flex flex-wrap">
							<th align="left" className="mw5 w5 pa1">
								<div>VALUES</div>
							</th>
							<th align="right" className="mw4 w4 pa1 relative row" tabIndex="0">
								<div>FIELDS</div>
								<span className="dn bg-light-green mw9 w5 top-0 right-0 pa1 absolute f4 tooltip">
									{header.fields.map(function (field) {
										return (
											<div key={`${field.name}.checkbox`}>
												{field.name}
												<input
													type="checkbox"
													defaultChecked={
														fields
															? fields.find(function (v) {
																	return v.name === field.name;
																})
															: true
													}
													onChange={updateFields(field.name)}
												/>
											</div>
										);
									})}
								</span>
							</th>
							<th className="mw5 w5">
								{route.params.mode === "view" ? null : null}
								{route.params.mode === "edit" ? (
									<button className="blue" onClick={handleUpdate} disabled={submitUpdate}>
										Update
									</button>
								) : null}
								{route.params.mode === "remove" ? (
									<button className="red" onClick={handleDelete} disabled={submitDelete}>
										Delete
									</button>
								) : null}
							</th>
						</tr>
					</thead>
					<tbody align="right" className="mw-100">
						{fields.map(function (field) {
							return (
								<tr align="right" key={field.name} className="flex flex-wrap">
									<td align="left" key={`${item[header.primary_key]}.${field.name}`} className="relative mw5 w5 pa1 row" tabIndex="0">
										<div className="truncate-ns">{readItem[field.name]}</div>
										<span className="dn bg-washed-green mw9 w5 top-0 left-0 pa1 absolute f4 tooltip">{readItem[field.name]}</span>
									</td>
									<td className="relative mw4 w4 pa1 row" tabIndex="0">
										<div className="truncate-ns field">
											<b>{field.name}</b>
										</div>
										<span className="dn bg-light-green mw9 w5 top-0 right-0 pa1 absolute f4 tooltip">
											<b>{field.name}</b>
										</span>
									</td>
									<td className="mw5 w5 overflow-x-hidden">
										<Input
											className="mw5 w5"
											field={field}
											value={route.params.mode === "edit" ? updateItem[field.name] : readItem[field.name]}
											onChange={localUpdateItem(field.name)}
											disabled={route.params.mode !== "edit"}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
