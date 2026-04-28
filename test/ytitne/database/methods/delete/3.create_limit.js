const description = `Create ytitne objects for limited delete`;
const operation_name = "CreateYtitneForLimitedDelete";
const operation_source = `
mutation ${operation_name}(
	$attributes1: Ytitne_Mutation__Attributes,
	$attributes2: Ytitne_Mutation__Attributes,
	$attributes3: Ytitne_Mutation__Attributes
) {
	first: create_ytitne(attributes: $attributes1) {
		attributes {
			id
			text
		}
	}
	second: create_ytitne(attributes: $attributes2) {
		attributes {
			id
			text
		}
	}
	third: create_ytitne(attributes: $attributes3) {
		attributes {
			id
			text
		}
	}
}
`;
const operation_variables = {
	attributes1: {
		id: "20000000-0000-0000-0000-000000000001",
		text: "limit-delete-one",
	},
	attributes2: {
		id: "20000000-0000-0000-0000-000000000002",
		text: "limit-delete-two",
	},
	attributes3: {
		id: "20000000-0000-0000-0000-000000000003",
		text: "limit-delete-three",
	},
};
const expected = `{
    "data": {
        "first": [
            {
                "attributes": {
                    "id": "20000000-0000-0000-0000-000000000001",
                    "text": "limit-delete-one"
                }
            }
        ],
        "second": [
            {
                "attributes": {
                    "id": "20000000-0000-0000-0000-000000000002",
                    "text": "limit-delete-two"
                }
            }
        ],
        "third": [
            {
                "attributes": {
                    "id": "20000000-0000-0000-0000-000000000003",
                    "text": "limit-delete-three"
                }
            }
        ]
    }
}`;

export default {
	step: 3,
	description: description,
	context: {
		agent_id: "1",
	},
	operation: {
		name: operation_name,
		source: operation_source,
		variables: operation_variables,
	},
	expected: expected,
};
