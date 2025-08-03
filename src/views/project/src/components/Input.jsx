import React from "react";
import { useState, useRef, useEffect } from "react";

export default function Input({ field, className, defaultMode, defaultValue, value, onChange, onKeyDown, disabled, cache }) {
	const inputRef = useRef();
	const [lastChanged, setLastChanged] = useState(new Date().getTime());
	const graphQLTypeName = field.graphql_type.name.split("___")[0];
	const graphQLTypeToInputType = {
		Date: "datetime-local",
		String: "text",
		SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: "text",
		SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: "datetime-local",
		SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: "text",
	};
	const serializeGraphQLTypeToInputType = {
		Date: function (v, field) {
			// note: look into why we need an existence check here (system entity page)
			if (v && typeof v === "string") {
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
		SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: function (v) {
			if (typeof v === "string") {
				return v;
			} else {
				return undefined;
			}
		},
		SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: function (v, field) {
			// note: look into why we need an existence check here (system entity page)
			if (v && typeof v === "string") {
				const d = new Date(v).toISOString();
				return d.slice(0, 16);
			} else {
				return undefined;
			}
		},
		SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: function (v) {
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
		SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: function (e, field) {
			e.target.serialized = e.target.value;
			return e;
		},
		SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: function (e, field) {
			// treating the input as always representing a UTC date time
			if (e.target.value) {
				e.target.serialized = e.target.value + "Z";
			} else {
				e.target.serialized = e.target.value;
			}
			return e;
		},
		SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: function (e, field) {
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
		SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: function (v) {
			if (v === undefined) {
				return "";
			} else {
				return v;
			}
		},
		SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: function (v, field) {
			if (v === undefined) {
				return new Date(0).toISOString().slice(0, 16);
			} else {
				return v;
			}
		},
		SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT: function (v) {
			if (v === undefined) {
				return "";
			} else {
				return v;
			}
		},
	};
	if (!graphQLTypeToInputType[graphQLTypeName]) {
		throw new Error(`GraphQL type ${graphQLTypeName} does not have a defined input type`)
	}
	if (!serializeGraphQLTypeToInputType[graphQLTypeName]) {
		throw new Error(`GraphQL type ${graphQLTypeName} does not have a GraphQL to input serializer`)
	}
	if (!serializeInputValueToGraphQLType[graphQLTypeName]) {
		throw new Error(`GraphQL type ${graphQLTypeName} does not have an input to GraphQL serializer`)
	}
	if (!initializeValue[graphQLTypeName]) {
		throw new Error(`GraphQL type ${graphQLTypeName} does not have a value initializer`)
	}
	function handleChange(e) {
		setLastChanged(new Date().getTime());
		const serializedValue = serializeInputValueToGraphQLType[field.graphql_type.name](e, field.name);
		return onChange(serializedValue);
	}
	useEffect(function () {
		if (512 < new Date().getTime() - lastChanged) {
			if (defaultMode) {
				const serializedValue = initializeValue[graphQLTypeName](serializeGraphQLTypeToInputType[graphQLTypeName](defaultValue, field.name), field.name);
				if (serializedValue !== inputRef.current.value) {
					inputRef.current.value = serializedValue;
				}
			} else {
				const serializedValue = initializeValue[graphQLTypeName](serializeGraphQLTypeToInputType[graphQLTypeName](value, field.name), field.name);
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
			type={graphQLTypeToInputType[graphQLTypeName]}
			value={initializeValue[graphQLTypeName](serializeGraphQLTypeToInputType[graphQLTypeName](value, field.name), field.name)}
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
			type={graphQLTypeToInputType[graphQLTypeName]}
			defaultValue={initializeValue[graphQLTypeName](serializeGraphQLTypeToInputType[graphQLTypeName](defaultValue, field.name), field.name)}
			onChange={handleChange}
			onKeyDown={onKeyDown}
			disabled={disabled}
			cache={cache}
		/>
	);
	return defaultMode ? defaultInput : valueInput;
}
