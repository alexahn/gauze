class RenderService {
	constructor() {
		this.index = {};
		this.collection = [];
		this.subscriptions = {};
	}
	readField(data = {}, key) {
		const path = key.split(".");
		return path.reduce(function (prev, next) {
			if (typeof prev === "undefined") {
				return prev;
			} else {
				return prev[next];
			}
		}, data);
	}
	writeField(data = {}, key, value) {
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
	deleteField(data = {}, key) {
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
	subscribe(route, itemType, itemID, subscriptionID, handler) {
		const self = this;
		const key = [route, itemType, itemID, subscriptionID].join(".");
		const existing = self.readField(self.subscriptions, key);
		if (existing) {
			// should be impossible
			throw new Error("Internal error: subscription failed because subscription already exists");
		} else {
			self.writeField(self.subscriptions, key, handler);
			//const item = self.read(itemType, itemID);
			//return handler(item);
		}
	}
	unsubscribe(route, itemType, itemID, subscriptionID) {
		const self = this;
		const key = [route, itemType, itemID, subscriptionID].join(".");
		const existing = self.readField(self.subscriptions, key);
		if (existing) {
			self.deleteField(self.subscriptions, key);
		} else {
			// should be impossible
			//throw new Error("Internal error: unsubscribe failed because subscription does not exist");
		}
	}
	trigger(route, type, id) {
		const self = this;
		const key = [route, type, id].join(".");
		const itemIndex = self.readField(self.index, key);
		const handlers = self.readField(self.subscriptions, key);
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
	all(route, type) {
		const self = this;
		const key = [route, type].join(".");
		const index = self.readField(self.index, key);
		if (index) {
			return Object.keys(typeIndex).map(function (id) {
				const index = typeIndex[id];
				return self.collection[index];
			});
		} else {
			return [];
		}
	}
	create(route, type, id, attributes) {
		const self = this;
		const key = [route, type, id].join(".");
		const existing_index = self.readField(self.index, key);
		var index;
		if (typeof existing_index === "number") {
			index = existing_index;
		} else {
			index = self.collection.length;
		}
		self.collection[index] = attributes;
		self.writeField(self.index, key, index);
		self.trigger(route, type, id);
	}
	read(route, type, id) {
		const self = this;
		const key = [route, type, id].join(".");
		const itemIndex = self.readField(self.index, key);
		if (typeof itemIndex === "undefined") {
			return undefined;
		} else {
			const item = self.collection[itemIndex];
			return item;
		}
	}
	update(route, type, id, attributes) {
		const self = this;
		const key = [route, type, id].join(".");
		const itemIndex = self.readField(self.index, key);
		if (typeof itemIndex === "undefined") {
			throw new Error(`Internal error: update failed because index does not exist for the item ${key}`);
		} else {
			self.collection[itemIndex] = attributes;
			// note: wrap trigger in setTimeout if we want proper ordering on changes
			// note: it shouldn't matter for now
			self.trigger(route, type, id);
			return self.collection[itemIndex];
		}
	}
	delete(route, type, id) {
		const self = this;
		const key = [route, type, id].join(".");
		const itemIndex = self.readField(self.index, key);
		if (typeof itemIndex === "undefined") {
			return undefined;
		} else {
			self.deleteField(self.index, key);
			self.collection[itemIndex] = undefined;
			self.trigger(route, type, id);
			return undefined;
		}
	}
	//strictDelete
}

export default new RenderService();
