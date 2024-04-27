export default function ($abstract) {
	const ENTITY = {
		primary_key: "id",
		fields: {
			id: {
				name: "id",
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "id",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.ID_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("id")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
			},
			created_at: {
				name: "created_at",
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "created_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.CREATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("created_at")],
				serializers: [$abstract.gauze.serializers.CREATED_AT__SERIALIZER__GAUZE__ABSTRACT("created_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.CREATED_AT__DESERIALIZER__GAUZE__ABSTRACT("created_at")],
				post_deserialize_middlewares: [],
			},
			updated_at: {
				name: "updated_at",
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "updated_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("updated_at")],
				serializers: [$abstract.gauze.serializers.UPDATED_AT__SERIALIZER__GAUZE__ABSTRACT("updated_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.UPDATED_AT__DESERIALIZER__GAUZE__ABSTRACT("updated_at")],
				post_deserialize_middlewares: [],
			},
			deleted_at: {
				name: "deleted_at",
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.DATE__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "deleted_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.DELETED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("deleted_at")],
				serializers: [$abstract.gauze.serializers.DELETED_AT__SERIALIZER__GAUZE__ABSTRACT("deleted_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.DELETED_AT__DESERIALIZER__GAUZE__ABSTRACT("deleted_at")],
				post_deserialize_middlewares: [],
			},
			text: {
				name: "text",
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "text",
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
