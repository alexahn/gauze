import * as React from "react";
import { useState } from "react";

import navigate from "./../navigate.js"

import Input from "./Input.jsx"
import Pagination from "./Pagination.jsx"

function Table({ pathfinder, services, header, variables = {}, items, count }) {
	const { gauze } = services
	const { where = {} } = variables
	// todo: we can infer the filter mode based on the structure of variables
	const [filterMode, setFilterMode] = useState("where_like")
	const [localVariables, setLocalVariables] = useState(variables)
	const cellClass = "relative tooltip-container ba bw1 br2 mb1 bgx2 bdx2 cx6 bgx3h bdx3h cx6h w100"
	const itemClass = "athelas f6 clouds w-100 truncate-ns mw5";
	const tooltipClass = "absolute tooltip athelas f6 dn bgx2 cx6 mw5 w5 top-0 left-0 ba bw1 br2"

	const offset = variables.offset ? Number.parseInt(variables.offset) : 0;
    const limit = variables.limit ? Number.parseInt(variables.limit) : 16;
	const pageCurrent = Math.floor(Math.max(offset / limit) + 1);
	const pageMaxNoSkew = Math.ceil(Math.max(count / limit));
	const pageMax = pageMaxNoSkew < pageCurrent ? pageCurrent : pageMaxNoSkew;
	function href(item) {   
		var paginate;
		if (item.type === "previous") {
			paginate = {
				limit: limit,
				offset: Math.max(0, offset - limit),
			};
		} else if (item.type === "next") {
			paginate = {
				limit: limit,
				offset: Math.min((pageMax - 1) * limit, offset + limit),
			};
		} else if (item.type === "page") {
			paginate = {
				limit: limit,
				offset: (item.page - 1) * limit,
			};
		} else {
			paginate = {
				limit: limit,
				offset: offset,
			};
		}
		// current state
		const state = pathfinder.URLToState(location.href)
		const url = pathfinder.stateToURL(state.name, state.pathParams, {
			variables: JSON.stringify({
				...variables,
				...paginate
			})
		})
		return url
	}
	// note: we need this function because when the input field is empty, we have where_like: { [field]: "" }, which usually returns an empty array
	// note: if there are any valid queries with null or empty values in the query fields, we would need to rethink this
	function stripVariables(variables) {
		const modes = ["where", "where_like"]
		const array_modes = ["where_between"]
		const stripped = {
			...variables
		}
		modes.forEach(function (mode) {
			if (variables[mode]) {
				Object.keys(variables[mode]).forEach(function (field) {
					if (variables[mode][field]) {
						// nothing
					} else {
						delete stripped[mode][field]
					}
				})
			}
		})
		array_modes.forEach(function (mode) {
			if (variables[mode]) {
				Object.keys(variables[mode]).forEach(function (field) {
					const every = variables[mode][field].every(function (v) {
						return v
					})
					if (every) {
						// nothing
					} else {
						delete stripped[mode][field]
					}
				})
			}
		})
		return stripped
	}
	function handleChange(field) {
		return function (e) {
			const variables = {
				...localVariables
			}
			if (variables[filterMode]) {
				variables[filterMode][field] = e.target.value
			} else {
				variables[filterMode] = {
					[field]: e.target.value
				}
			}
			setLocalVariables(variables)
		}
	}
	function handleKeyDown(field) {
		return function (e) {
			if (e.key === "Enter") {
				// navigate
				const state = pathfinder.URLToState(location.href)
				const url = pathfinder.stateToURL(state.name, state.pathParams, {
					...state.searchParams,
					variables: JSON.stringify(stripVariables(localVariables))
				})
				navigate(url, {
					replace: false,
					push: false // set to true later
				})
			}
		}
	}
	return (<div>
		<table className="type-list">
			<thead>
				<tr>
					<th><button type="button">Search</button></th>
					{header.fields.map(function (field) {
						return (
							<th key={field.name} className={cellClass} tabIndex="0">
								<div className={itemClass}>
									<Input
										defaultMode={true}
										field={field}
										className="w-100 mw5"
										onChange={handleChange(field.name)}
										onKeyDown={handleKeyDown(field.name)}
										defaultValue={localVariables[filterMode] ? localVariables[filterMode][field.name] : undefined}
									/>
								</div>
							</th>)
					})}
				</tr>
				<tr>
					<th><button type="button">Fields</button></th>
					{header.fields.map(function (field) {
						return (
							<th key={field.name} className={cellClass} tabIndex="0">
								<div className={itemClass}>{field.name}</div>
								<span className={tooltipClass}>{field.name}</span>
							</th>)
					})}
				</tr>
			</thead>
			<tbody>
				{items.map(function (item) {
					return (<tr key={item._metadata.id}>
						<td><button type="button">Edit</button></td>
						{header.fields.map(function (field) {
							return (
								<td key={field.name}  className={cellClass} tabIndex="0">
									<div className={itemClass}>{item.attributes[field.name]}</div>
									<span className={tooltipClass}>{item.attributes[field.name]}</span>
								</td>
							)
						})}
					</tr>)
				})}
			</tbody>
		</table>
		<Pagination page={pageCurrent} count={pageMax} href={href} reverse={false}/>
	</div>)
}

export default Table
