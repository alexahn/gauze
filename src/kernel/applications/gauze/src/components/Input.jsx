import React from "react";
import { useState, useRef, useEffect } from "react";

export default function Input({ field, className, defaultMode, defaultValue, value, onChange, onKeyDown, disabled, cache }) {
	const inputRef = useRef();
	const [lastChanged, setLastChanged] = useState(new Date().getTime());
	const graphQLTypeToInputType = {
		Date: "datetime-local",
		String: "text",
	};
	const serializeGraphQLTypeToInputType = {
		Date: function (v, field) {
			if (typeof v === "string") {
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
	const serializeInputValueToGraphQLType = {
		Date: function (e, field) {
			// treating the input as always representing a UTC date time
			if (e.target.value) {
				e.target.serialized = e.target.value + "Z";
			} else {
				e.target.serialized = e.target.value;
			}
			return e;
		},
		String: function (e, field) {
			e.target.serialized = e.target.value;
			return e;
		},
	};
	const initializeValue = {
		Date: function (v, field) {
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
		setLastChanged(new Date().getTime());
		const serializedValue = serializeInputValueToGraphQLType[field.graphql_type.name](e, field.name);
		return onChange(serializedValue);
	}
	useEffect(function () {
		if (512 < new Date().getTime() - lastChanged) {
			if (defaultMode) {
				const serializedValue = initializeValue[field.graphql_type.name](serializeGraphQLTypeToInputType[field.graphql_type.name](defaultValue, field.name), field.name);
				if (serializedValue !== inputRef.current.value) {
					inputRef.current.value = serializedValue;
				}
			} else {
				const serializedValue = initializeValue[field.graphql_type.name](serializeGraphQLTypeToInputType[field.graphql_type.name](value, field.name), field.name);
				if (serializedValue !== inputRef.current.value) {
					inputRef.current.value = serializedValue;
				}
			}
		}
	});
	const valueInput = (
		<input
			ref={inputRef}
			className={className}
			type={graphQLTypeToInputType[field.graphql_type.name]}
			value={initializeValue[field.graphql_type.name](serializeGraphQLTypeToInputType[field.graphql_type.name](value, field.name), field.name)}
			onChange={handleChange}
			onKeyDown={onKeyDown}
			disabled={disabled}
			cache={cache}
		/>
	);
	const defaultInput = (
		<input
			ref={inputRef}
			className={className}
			type={graphQLTypeToInputType[field.graphql_type.name]}
			defaultValue={initializeValue[field.graphql_type.name](serializeGraphQLTypeToInputType[field.graphql_type.name](defaultValue, field.name), field.name)}
			onChange={handleChange}
			onKeyDown={onKeyDown}
			disabled={disabled}
			cache={cache}
		/>
	);
	return defaultMode ? defaultInput : valueInput;
}
