import React from "react";
import { useState } from "react";

export default function Input({ field, className, defaultValue, value, onChange, disabled }) {
	const graphQLTypeToInputType = {
		Date: "datetime-local",
		String: "text",
	};
	const serializeGraphQLTypeToInputType = {
		Date: function (v) {
			if (v instanceof Date) {
				const d = new Date(v).toISOString();
				return d.slice(0, 16);
			} else {
				return undefined;
			}
		},
		String: function (v) {
			if (typeof v === "string") {
				return v;
			} else {
				return undefined;
			}
		},
	};
	const initializeValue = {
		Date: function (v) {
			if (v === undefined) {
				return new Date(0).toISOString().slice(0, 16);
			} else {
				return v;
			}
		},
		String: function (v) {
			if (v === undefined) {
				return "";
			} else {
				return v;
			}
		},
	};
	function handleChange(e) {
		// todo: deserialize value from input field to format that graphql expects
		// process e.target.value
		return onChange(e);
	}
	return (
		<input
			className={className}
			type={graphQLTypeToInputType[field.graphql_type.name]}
			value={initializeValue[field.graphql_type.name](serializeGraphQLTypeToInputType[field.graphql_type.name](value))}
			onChange={handleChange}
			disabled={disabled}
		/>
	);
}
