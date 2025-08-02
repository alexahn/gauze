import * as React from "react";
import { useState } from "react";

function Table({ pathfinder, services, header, variables, items }) {
	const { gauze } = services
	const cellClass = "relative tooltip-container ba bw1 br2 mb1 bgx2 bdx2 cx6 bgx3h bdx3h cx6h"
	const itemClass = "athelas f6 clouds w-100 truncate-ns mw4";
	const tooltipClass = "absolute tooltip athelas f6 dn bgx2 cx6 mw5 w5 top-0 left-0 ba bw1 br2"
	return (<div>
		<table className="type-list">
			<tr className={cellClass} tabIndex="0">
				{header.fields.map(function (field) {
					return (
						<th className={cellClass} tabIndex="0">
							<div className={itemClass}>{field.name}</div>
							<span className={tooltipClass}>{field.name}</span>
						</th>)
				})}
			</tr>
			{items.map(function (item) {
				return (<tr>
					{header.fields.map(function (field) {
						return (
							<td className={cellClass} tabIndex="0">
								<div className={itemClass}>{item.attributes[field.name]}</div>
								<span className={tooltipClass}>{item.attributes[field.name]}</span>
							</td>
						)
					})}
				</tr>)
			})}
		</table>
	</div>)
}

export default Table
