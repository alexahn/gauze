export default function ($abstract) {
	const ENTITY = {
		name: "proxy",
		table_name: "gauze__proxy",
		primary_key: "gauze__proxy__id",
		graphql_meta_type: "PROXY",
		default_order: "gauze__proxy__created_at",
		default_order_direction: "asc",
		fields: {
			gauze__proxy__id: {
				name: "gauze__proxy__id",
				indexed: true,
				required: false,
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.scalars.id.SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "id",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATE_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__proxy__id")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy"],
			},
			gauze__proxy__created_at: {
				name: "gauze__proxy__created_at",
				indexed: true,
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.scalars.date.SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "created_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.CREATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__proxy__created_at")],
				serializers: [$abstract.gauze.serializers.CREATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__proxy__created_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.CREATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__proxy__created_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy"],
			},
			gauze__proxy__updated_at: {
				name: "gauze__proxy__updated_at",
				indexed: true,
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.scalars.date.SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "updated_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__proxy__updated_at")],
				serializers: [$abstract.gauze.serializers.UPDATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__proxy__updated_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.UPDATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__proxy__updated_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy"],
			},
			gauze__proxy__deleted_at: {
				name: "gauze__proxy__deleted_at",
				indexed: true,
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.scalars.date.SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "deleted_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.DELETED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__proxy__deleted_at")],
				serializers: [$abstract.gauze.serializers.DELETED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__proxy__deleted_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.DELETED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__proxy__deleted_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy"],
			},
			gauze__proxy__agent_id: {
				name: "gauze__proxy__agent_id",
				indexed: true,
				required: true,
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.scalars.id.SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "agent_id",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATE_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__proxy__agent_id")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy"],
			},
			gauze__proxy__agent_type: {
				name: "gauze__proxy__agent_type",
				indexed: true,
				required: true,
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.scalars.string.SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "agent_type",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATE_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__proxy__agent_type")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy"],
			},
			gauze__proxy__root_id: {
				name: "gauze__proxy__root_id",
				indexed: true,
				required: true,
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.scalars.id.SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "root_id",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATE_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__proxy__root_id")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy"],
			},
			gauze__proxy__realms: {
				name: "gauze__proxy__realms",
				indexed: false,
				required: false,
				sql_type: "json",
				graphql_type: $abstract.gauze.types.graphql.scalars.string.SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "realms",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATE_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__proxy__realms")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__proxy"],
			},
		},
		methods: {
			create: {
				name: "create",
				privacy: "private",
				allowed_agent_types: ["gauze__proxy"],
			},
			read: {
				name: "read",
				privacy: "private",
				allowed_agent_types: ["gauze__proxy"],
			},
			update: {
				name: "update",
				privacy: "private",
				allowed_agent_types: ["gauze__proxy"],
			},
			delete: {
				name: "delete",
				privacy: "private",
				allowed_agent_types: ["gauze__proxy"],
			},
			count: {
				name: "count",
				privacy: "private",
				allowed_agent_types: ["gauze__proxy"],
			},
		},
	};
	ENTITY.graphql_attributes_fields = $abstract.gauze.utility.create_graphql_attributes_fields(ENTITY);
	ENTITY.graphql_attributes_string = $abstract.gauze.utility.create_graphql_attributes_string(ENTITY);
	ENTITY.graphql_where_fields = $abstract.gauze.utility.create_graphql_where_fields(ENTITY);
	ENTITY.graphql_where_string = $abstract.gauze.utility.create_graphql_where_string(ENTITY);
	return ENTITY;
}
