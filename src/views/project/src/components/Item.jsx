import * as React from "react"
import { useState } from "react"

function Item({pathfinder, services, header, item}) {
	return (<div>
		{header.fields.map(function (field) {
			return (<div key={field.name}>{field.name}: {item.attributes[field.name]}</div>)
		})}
	</div>)
}

export default Item
