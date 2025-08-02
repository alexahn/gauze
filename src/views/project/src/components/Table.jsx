import * as React from "react";
import { useState } from "react";

function Table({ pathfinder, services, header, variables, items }) {
	const { gauze } = services
	const buttonClass = "clouds w-100 ba bw1 br2 truncate-ns mb1 f6 athelas bgx2 bdx2 cx6 bgx3h bdx3h cx6h truncate-ns mw4";
	return (<div>
		<table className="type-list">
			<tr>
				{header.fields.map(function (field) {
					return (<th className={buttonClass}>{field.name}</th>)
				})}
			</tr>
			{items.map(function (item) {
				return (<tr>
					{header.fields.map(function (field) {
						return (<td className={buttonClass}>{item.attributes[field.name]}</td>)
					})}
				</tr>)
			})}
		</table>
	</div>)
}

export default Table
