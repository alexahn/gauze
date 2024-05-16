import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FileTextIcon, TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";

export default function TypeItem({ router, route, gauze, model, fields }) {
	const [submitUpdate, setSubmitUpdate] = useState(false);
	const [submitDelete, setSubmitDelete] = useState(false);
	const header = model.read("HEADER", route.params.type);
	const headerFields = header.attributes.split(" ");
	const item = model.read(header.graphql_meta_type, route.params.id) || {};
	const [readItem, setReadItem] = useState(item);
	const [updateItem, setUpdateItem] = useState(item);
	//const item = {}

	useEffect(() => {
		const subscriptionID = uuidv4();
		model.subscribe(header.graphql_meta_type, route.params.id, subscriptionID, function (item) {
			if (item) {
				setReadItem(item);
			} else {
				setReadItem({});
			}
			console.log("SUBSCRIBE", item);
		});
		return () => {
			model.unsubscribe(header.graphql_meta_type, route.params.id, subscriptionID);
		};
	}, [model, route]);

	// update this mapping when we add more types to $abstract
	const graphQLTypeToInputType = {
		Date: "datetime-local",
		String: "text",
	};
	const serializeGraphQLTypeToInputType = {
		Date: function (v) {
			if (v) {
				const d = new Date(v).toISOString();
				return d.slice(0, 16);
			}
		},
		String: function (v) {
			return v;
		},
	};
	function updateFields(field) {
		return function (e) {
			console.log("field", field, e.target.checked);
			const updatedFields = {};
			headerFields.forEach(function (field) {
				updatedFields[field] = true;
			});
			fields.forEach(function (field) {
				delete updatedFields[field];
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
		const expected = "delete";
		const input = prompt(`Confirm delete by entering '${expected}'`, "");
		setSubmitDelete(true);
		if (input === expected) {
			alert("deleting");
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
	function updateLocalItem(field) {
		return function (e) {
			// todo: deserialize value from input field to format that graphql expects
			const updatedItem = { ...updateItem };
			updatedItem[field] = e.target.value;
			setUpdateItem(updatedItem);
		};
	}
	function handleUpdate(e) {
		const expected = "update";
		const input = prompt(`Confirm update by entering '${expected}'`, "");
		setSubmitUpdate(true);
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
						console.log("EVERYTHING SAVED");
						setSubmitUpdate(false);
					} else {
						// alert the user that something went wrong
						setSubmitUpdate(false);
					}
				});
		} else {
			// ignore
			setSubmitUpdate(false);
		}
	}
	return (
		<div className="mw-100 w-100">
			<h1 align="right">{header.graphql_meta_type}</h1>
			<div align="right">Type Item</div>
			<hr />
			<div align="right" className="cf">
				<nav>
					<div className="flex pa1 fr">
						<a href={router.buildUrl(route.name, { ...route.params, mode: "remove" })}>
							<button className="action" type="button" disabled={route.params.mode === "remove"}>
								<TrashIcon />
							</button>
						</a>
						<a href={router.buildUrl(route.name, { ...route.params, mode: "edit" })}>
							<button className="action" type="button" disabled={route.params.mode === "edit"}>
								<Pencil2Icon />
							</button>
						</a>
						<a href={router.buildUrl(route.name, { ...route.params, mode: "view" })}>
							<button className="action" type="button" disabled={route.params.mode === "view"}>
								<FileTextIcon />
							</button>
						</a>
					</div>
				</nav>
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
									{headerFields.map(function (field) {
										return (
											<div key={`${field}.checkbox`}>
												{field}
												<input type="checkbox" defaultChecked={fields ? fields.indexOf(field) >= 0 : true} onChange={updateFields(field)} />
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
						{header.fields.map(function (field) {
							return (
								<tr align="right" key={field.name} className="flex flex-wrap">
									<td align="left" key={`${item[header.primary_key]}.${field}`} className="relative mw5 w5 pa1 row" tabIndex="0">
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
										<input
											className="mw5 w5"
											type={graphQLTypeToInputType[field.graphql_type.name]}
											defaultValue={serializeGraphQLTypeToInputType[field.graphql_type.name](readItem[field.name])}
											value={
												route.params.mode === "edit"
													? serializeGraphQLTypeToInputType[field.graphql_type.name](updateItem[field.name])
													: serializeGraphQLTypeToInputType[field.graphql_type.name](readItem[field.name])
											}
											onChange={updateLocalItem(field.name)}
											disabled={route.params.mode !== "edit"}
										/>
										{/*<input className="mw4" onChange={updateFilter(field)} onKeyDown={applyFilter(field)} defaultValue={where[field] ? where[field] : ""} />*/}
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
