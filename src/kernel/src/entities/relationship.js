export default function ($abstract) {
	const ENTITY = {
		name: "relationship",
		table_name: "gauze__relationship",
		primary_key: "gauze__relationship__id",
		graphql_meta_type: "RELATIONSHIP",
		default_order: "gauze__relationship__created_at",
		default_order_direction: "desc",
		fields: {
			gauze__relationship__id: {
				name: "gauze__relationship__id",
				required: false,
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "id",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATE_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__relationship__id")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
			gauze__relationship__created_at: {
				name: "gauze__relationship__created_at",
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "created_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.CREATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__relationship__created_at")],
				serializers: [$abstract.gauze.serializers.CREATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__relationship__created_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.CREATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__relationship__created_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
			gauze__relationship__updated_at: {
				name: "gauze__relationship__updated_at",
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "updated_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__relationship__updated_at")],
				serializers: [$abstract.gauze.serializers.UPDATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__relationship__updated_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.UPDATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__relationship__updated_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
			gauze__relationship__deleted_at: {
				name: "gauze__relationship__deleted_at",
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "deleted_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.DELETED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__relationship__deleted_at")],
				serializers: [$abstract.gauze.serializers.DELETED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__relationship__deleted_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.DELETED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__relationship__deleted_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
			gauze__relationship__from_type: {
				name: "gauze__relationship__from_type",
				required: true,
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "from_type",
				pre_serialize_middlewares: [],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
			gauze__relationship__from_id: {
				name: "gauze__relationship__from_id",
				required: true,
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "from_id",
				pre_serialize_middlewares: [],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
			gauze__relationship__to_type: {
				name: "gauze__relationship__to_type",
				required: true,
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "to_type",
				pre_serialize_middlewares: [],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
			gauze__relationship__to_id: {
				name: "gauze__relationship__to_id",
				required: true,
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "to_id",
				pre_serialize_middlewares: [],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
		},
		methods: {
			create: {
				name: "create",
				privacy: "public",
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
			read: {
				name: "read",
				privacy: "private",
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
			update: {
				name: "update",
				privacy: "private",
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
			delete: {
				name: "delete",
				privacy: "private",
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
			count: {
				name: "count",
				privacy: "private",
				allowed_agent_types: ["gauze__proxy", "gauze__agent_root", "gauze__agent_account", "gauze__agent_user", "gauze__agent_person", "gauze__agent_character"],
			},
		},
	};
	ENTITY.graphql_attributes_fields = $abstract.gauze.utility.create_graphql_attributes_fields(ENTITY);
	ENTITY.graphql_attributes_string = $abstract.gauze.utility.create_graphql_attributes_string(ENTITY);
	ENTITY.graphql_where_fields = $abstract.gauze.utility.create_graphql_where_fields(ENTITY);
	ENTITY.graphql_where_string = $abstract.gauze.utility.create_graphql_where_string(ENTITY);
	return ENTITY;
}
