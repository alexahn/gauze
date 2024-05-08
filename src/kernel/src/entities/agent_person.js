export default function ($abstract) {
	const ENTITY = {
		name: "agent_person",
		table_name: "gauze__agent_person",
		primary_key: "gauze__agent_person__id",
		graphql_meta_type: "AGENT_PERSON",
		fields: {
			gauze__agent_person__id: {
				name: "gauze__agent_person__id",
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "id",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.RUD_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__agent_person__id")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
			},
			gauze__agent_person__created_at: {
				name: "gauze__agent_person__created_at",
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "created_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.CREATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__agent_person__created_at")],
				serializers: [$abstract.gauze.serializers.CREATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__agent_person__created_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.CREATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__agent_person__created_at")],
				post_deserialize_middlewares: [],
			},
			gauze__agent_person__updated_at: {
				name: "gauze__agent_person__updated_at",
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "updated_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__agent_person__updated_at")],
				serializers: [$abstract.gauze.serializers.UPDATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__agent_person__updated_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.UPDATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__agent_person__updated_at")],
				post_deserialize_middlewares: [],
			},
			gauze__agent_person__deleted_at: {
				name: "gauze__agent_person__deleted_at",
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "deleted_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.DELETED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__agent_person__deleted_at")],
				serializers: [$abstract.gauze.serializers.DELETED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__agent_person__deleted_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.DELETED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__agent_person__deleted_at")],
				post_deserialize_middlewares: [],
			},
			gauze__agent_person__email: {
				name: "gauze__agent_person__email",
				sql_type: "string",
				graphql_type: abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "email",
				pre_serialize_middlewares: [],
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
				privacy: "private",
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
	ENTITY.graphql_fields = $abstract.gauze.utility.create_graphql_fields(ENTITY);
	ENTITY.graphql_attributes_string = $abstract.gauze.utility.create_graphql_attributes_string(ENTITY);
	return ENTITY;
}
