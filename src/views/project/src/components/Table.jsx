import * as React from "react";
import { useState } from "react";

import Input from "./Input.jsx"

function Table({ pathfinder, services, header, variables = {}, items }) {
	const { gauze } = services
	const cellClass = "relative tooltip-container ba bw1 br2 mb1 bgx2 bdx2 cx6 bgx3h bdx3h cx6h w100"
	const itemClass = "athelas f6 clouds w-100 truncate-ns mw5";
	const tooltipClass = "absolute tooltip athelas f6 dn bgx2 cx6 mw5 w5 top-0 left-0 ba bw1 br2"
	const { where = {} } = variables
	function handleChange(e) {

	}
	function handleKeyDown(e) {

	}
	return (<div>
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
