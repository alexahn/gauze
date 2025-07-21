export default function ($abstract) {
	const ENTITY = {
		name: "agent_character",
		table_name: "gauze__agent_character",
		primary_key: "gauze__agent_character__id",
		graphql_meta_type: "AGENT_CHARACTER",
		default_order: "gauze__agent_character__created_at",
		default_order_direction: "asc",
		fields: {
			gauze__agent_character__id: {
				name: "gauze__agent_character__id",
				indexed: true,
				required: false,
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.graphql.GAUZE_STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "id",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATE_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__agent_character__id")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_character"],
			},
			gauze__agent_character__created_at: {
				name: "gauze__agent_character__created_at",
				indexed: true,
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.graphql.GAUZE_DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "created_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.CREATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__agent_character__created_at")],
				serializers: [$abstract.gauze.serializers.CREATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__agent_character__created_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.CREATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__agent_character__created_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_character"],
			},
			gauze__agent_character__updated_at: {
				name: "gauze__agent_character__updated_at",
				indexed: true,
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.graphql.GAUZE_DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "updated_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__agent_character__updated_at")],
				serializers: [$abstract.gauze.serializers.UPDATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__agent_character__updated_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.UPDATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__agent_character__updated_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_character"],
			},
			gauze__agent_character__deleted_at: {
				name: "gauze__agent_character__deleted_at",
				indexed: true,
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.graphql.GAUZE_DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "deleted_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.DELETED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__agent_character__deleted_at")],
				serializers: [$abstract.gauze.serializers.DELETED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__agent_character__deleted_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.DELETED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__agent_character__deleted_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_character"],
			},
		},
		methods: {
			create: {
				name: "create",
				privacy: "private",
				allowed_agent_types: ["gauze__agent_character"],
			},
			read: {
				name: "read",
				privacy: "private",
				allowed_agent_types: ["gauze__agent_character"],
			},
			update: {
				name: "update",
				privacy: "private",
				allowed_agent_types: ["gauze__agent_character"],
			},
			delete: {
				name: "delete",
				privacy: "private",
				allowed_agent_types: ["gauze__agent_character"],
			},
			count: {
				name: "count",
				privacy: "private",
				allowed_agent_types: ["gauze__agent_character"],
			},
		},
	};
	ENTITY.graphql_attributes_fields = $abstract.gauze.utility.create_graphql_attributes_fields(ENTITY);
	ENTITY.graphql_attributes_string = $abstract.gauze.utility.create_graphql_attributes_string(ENTITY);
	ENTITY.graphql_where_fields = $abstract.gauze.utility.create_graphql_where_fields(ENTITY);
	ENTITY.graphql_where_string = $abstract.gauze.utility.create_graphql_where_string(ENTITY);
	return ENTITY;
}
