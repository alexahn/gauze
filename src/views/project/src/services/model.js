class ModelService {
	constructor() {
		this.index = {};
		this.subscriptions = {};
		this.collection = [];
	}
	readKey(data = {}, key) {
		const path = key.split(".");
		return path.reduce(function (prev, next) {
			if (typeof prev === "undefined") {
				return prev;
			} else {
				return prev[next];
			}
		}, data);
	}
	writeKey(data = {}, key, value) {
		const path = key.split(".");
		path.reduce(function (prev, next, index) {
			if (typeof prev[next] === "undefined") {
				if (index === path.length - 1) {
					prev[next] = value;
				} else {
					prev[next] = {};
				}
				return prev[next];
			} else {
				if (index === path.length - 1) {
					prev[next] = value;
					return prev[next];
				} else {
					return prev[next];
				}
			}
		}, data);
		return data;
	}
	deleteKey(data = {}, key) {
		const path = key.split(".");
		path.reduce(function (prev, next, index) {
			if (index === path.length - 1) {
				delete prev[next];
			} else {
				if (typeof prev === "undefined") {
					return prev;
				} else {
					return prev[next];
				}
			}
		}, data);
		return data;
	}
	subscribe(metadata, subscriptionID, handler) {
		const self = this;
		const { type, id } = metadata;
		const key = [type, id, subscriptionID].join(".");
		const existing = self.readKey(self.subscriptions, key);
		if (existing) {
			// should be impossible
			throw new Error("Internal error: subscription failed because subscription already exists");
		} else {
			self.writeKey(self.subscriptions, key, handler);
			const item = self.read(itemType, itemID);
			return handler(item);
		}
	}
	unsubscribe(metadata, subscriptionID) {
		const self = this;
		const { type, id } = metadata;
		const key = [type, id, subscriptionID].join(".");
		const existing = self.readKey(self.subscriptions, key);
		if (existing) {
			self.deleteKey(self.subscriptions, key);
		} else {
			// should be impossible
			throw new Error("Internal error: unsubscribe failed because subscription does not exist");
		}
	}
	trigger(metadata) {
		const self = this;
		const { type, id } = metadata;
		const key = [type, id].join(".");
		const itemIndex = self.readKey(self.index, key);
		const handlers = self.readKey(self.subscriptions, key);
		if (handlers) {
			Object.keys(handlers).forEach(function (subscriptionID) {
				const item = self.collection[itemIndex];
				const handler = handlers[subscriptionID];
				if (typeof itemIndex === "undefined") {
					return handler(undefined);
				} else {
					const item = self.collection[itemIndex];
					return handler(item);
				}
			});
		}
	}
	// upsert, read, delete
	upsert(metadata, attributes) {
		const self = this;
		const { type, id } = metadata;
		const key = [type, id].join(".");
		const existing_index = self.readKey(self.index, key);
		var index;
		if (typeof existing_index === "number") {
			index = existing_index;
		} else {
			index = self.collection.length;
		}
		self.collection[index] = attributes;
		self.writeKey(self.index, key, index);
		self.trigger(metadata);
		return attributes;
	}
	read(metadata) {
		const self = this;
		const { type, id } = metadata;
		const key = [type, id].join(".");
		const itemIndex = self.readKey(self.index, key);
		if (typeof itemIndex === "undefined") {
			return undefined;
		} else {
			const item = self.collection[itemIndex];
			return item;
		}
	}
	delete(metadata) {
		const self = this;
		const { type, id } = metadata;
		const key = [type, id].join(".");
		const itemIndex = self.readKey(self.index, key);
		if (typeof itemIndex === "undefined") {
			return undefined;
		} else {
			self.deleteKey(self.index, key);
			self.collection[itemIndex] = undefined;
			self.trigger(metadata);
			// maybe use null here to differentiate between something that has been deleted and something that never existed
			return undefined;
		}
	}
}

export default new ModelService();
