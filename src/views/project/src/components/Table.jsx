import * as React from "react";
import { useState } from "react";

import Input from "./Input.jsx"
import Pagination from "./Pagination.jsx"

function Table({ pathfinder, services, header, variables = {}, items, count }) {
	const { gauze } = services
	const cellClass = "relative tooltip-container ba bw1 br2 mb1 bgx2 bdx2 cx6 bgx3h bdx3h cx6h w100"
	const itemClass = "athelas f6 clouds w-100 truncate-ns mw5";
	const tooltipClass = "absolute tooltip athelas f6 dn bgx2 cx6 mw5 w5 top-0 left-0 ba bw1 br2"
	const { where = {} } = variables

	const offset = variables.offset ? Number.parseInt(variables.offset) : 0;
    const limit = variables.limit ? Number.parseInt(variables.limit) : 16;
	const pageCurrent = Math.floor(Math.max(offset / limit) + 1);
	const pageMaxNoSkew = Math.ceil(Math.max(count / limit));
	const pageMax = pageMaxNoSkew < pageCurrent ? pageCurrent : pageMaxNoSkew;
	console.log('pageCurrent', pageCurrent, 'pageMax', pageMax, 'count', count)
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
				//...state.searchParams.variables,
				...paginate
			})
		})
		return url
	}

	function handleChange(e) {

	}
	function handleKeyDown(e) {

	}
	return (<div>
		<Pagination page={pageCurrent} count={pageMax} href={href} reverse={false}/>
		<table className="type-list">
			<thead>
				<tr>
					<th>X</th>
					{header.fields.map(function (field) {
						return (
							<th key={field.name} className={cellClass} tabIndex="0">
								<div className={itemClass}>
									<Input
										defaultMode={true}
										field={field}
										className="w-100 mw5"
										onChange={handleChange}
										onKeyDown={handleKeyDown}
										defaultValue={where[field.name] ? where[field.name] : ""}
									/>
								</div>
							</th>)
					})}
				</tr>
				<tr>
					<th>Y</th>
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
						<td>Z</td>
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
	</div>)
}

export default Table
