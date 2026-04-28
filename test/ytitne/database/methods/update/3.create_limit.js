const description = `Create ytitne objects for limited update`;
const operation_name = "CreateYtitneForLimitedUpdate";
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
		id: "10000000-0000-0000-0000-000000000001",
		text: "limit-update-one",
	},
	attributes2: {
		id: "10000000-0000-0000-0000-000000000002",
		text: "limit-update-two",
	},
	attributes3: {
		id: "10000000-0000-0000-0000-000000000003",
		text: "limit-update-three",
	},
};
const expected = `{
    "data": {
        "first": [
            {
                "attributes": {
                    "id": "10000000-0000-0000-0000-000000000001",
                    "text": "limit-update-one"
                }
            }
        ],
        "second": [
            {
                "attributes": {
                    "id": "10000000-0000-0000-0000-000000000002",
                    "text": "limit-update-two"
                }
            }
        ],
        "third": [
            {
                "attributes": {
                    "id": "10000000-0000-0000-0000-000000000003",
                    "text": "limit-update-three"
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
