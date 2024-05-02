export default function ($abstract) {
	const ENTITY = {
		name: "blacklist",
		table_name: "gauze__blacklist",
		primary_key: "gauze__blacklist__id",
		graphql_meta_type: "BLACKLIST",
		fields: {
			gauze__blacklist__id: {
				name: "gauze__blacklist__id",
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "id",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.RUD_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__blacklist__id")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
			},
			gauze__blacklist__created_at: {
				name: "gauze__blacklist__created_at",
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "created_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.CREATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__blacklist__created_at")],
				serializers: [$abstract.gauze.serializers.CREATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__blacklist__created_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.CREATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__blacklist__created_at")],
				post_deserialize_middlewares: [],
			},
			gauze__blacklist__updated_at: {
				name: "gauze__blacklist__updated_at",
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "updated_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__blacklist__updated_at")],
				serializers: [$abstract.gauze.serializers.UPDATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__blacklist__updated_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.UPDATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__blacklist__updated_at")],
				post_deserialize_middlewares: [],
			},
			gauze__blacklist__deleted_at: {
				name: "gauze__blacklist__deleted_at",
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "deleted_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.DELETED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__blacklist__deleted_at")],
				serializers: [$abstract.gauze.serializers.DELETED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__blacklist__deleted_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.DELETED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__blacklist__deleted_at")],
				post_deserialize_middlewares: [],
			},
			gauze__blacklist__realm: {
				name: "gauze__blacklist__realm",
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "realm",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.RUD_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__blacklist__realm")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
			},
			gauze__blacklist__agent_role: {
				name: "gauze__blacklist__agent_role",
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "agent_role",
				pre_serialize_middlewares: [],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
			},
			gauze__blacklist__agent_id: {
				name: "gauze__blacklist__agent_id",
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "agent_id",
				pre_serialize_middlewares: [],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
			},
			gauze__blacklist__agent_type: {
				name: "gauze__blacklist__agent_type",
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "agent_type",
				pre_serialize_middlewares: [],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
			},
			gauze__blacklist__entity_id: {
				name: "gauze__blacklist__entity_id",
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "entity_id",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.RUD_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__blacklist__entity_id")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
			},
			gauze__blacklist__entity_type: {
				name: "gauze__blacklist__entity_type",
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "entity_type",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.RUD_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__blacklist__entity_type")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
			},
			gauze__blacklist__method: {
				name: "gauze__blacklist__method",
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "method",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.RUD_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__blacklist__method")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
			},
		},
		methods: {
			create: {
				name: "create",
				privacy: "public",
			},
			read: {
				name: "read",
				privacy: "private",
			},
			update: {
				name: "update",
				privacy: "private",
			},
			delete: {
				name: "delete",
				privacy: "private",
			},
		},
	};
	ENTITY.graphql_fields = $abstract.helpers.create_graphql_fields(ENTITY);
	ENTITY.graphql_attributes_string = $abstract.helpers.create_graphql_attributes_string(ENTITY);
	return ENTITY;
}
