class ModelService {
	constructor() {
		this.index = {};
		this.collection = [];
		this.subscriptions = {};
	}
	environmentSessions() {
		const self = this;
		const sessions = self.all("SESSION").filter(function (session) {
			return session.gauze__session__agent_id === null && session.gauze__session__agent_type === null;
		});
		return sessions;
	}
	proxySessions() {
		const self = this;
		const sessions = self.all("SESSION").filter(function (session) {
			return session.gauze__session__agent_type === "gauze__proxy";
		});
		return sessions;
	}
	systemSessions() {
		const self = this;
		const sessions = self.all("SESSION").filter(function (session) {
			return session.gauze__session__realm === "system";
		});
		return sessions;
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
	subscribe(itemType, itemID, subscriptionID, handler) {
		const self = this;
		const key = [itemType, itemID, subscriptionID].join(".");
		const existing = self.readField(self.subscriptions, key);
		if (existing) {
			// should be impossible
			throw new Error("Internal error: subscription failed because subscription already exists");
		} else {
			self.writeField(self.subscriptions, key, handler);
			const item = self.read(itemType, itemID);
			return handler(item);
		}
	}
	unsubscribe(itemType, itemID, subscriptionID) {
		const self = this;
		const key = [itemType, itemID, subscriptionID].join(".");
		const existing = self.readField(key);
		if (existing) {
			self.deleteField(self.subscriptions, key);
		} else {
			// should be impossible
			throw new Error("Internal error: unsubscribe failed because subscription does not exist");
		}
	}
	trigger(type, id) {
		const self = this;
		const key = [type, id].join(".");
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
	all(type) {
		const self = this;
		if (self.index[type]) {
			return Object.keys(self.index[type]).map(function (id) {
				const index = self.index[type][id];
				return self.collection[index];
			});
		} else {
			return [];
		}
	}
	create(type, id, attributes) {
		const self = this;
		const index = self.collection.length;
		const key = [type, id].join(".");
		self.collection[index] = attributes;
		self.writeField(self.index, key, index);
		self.trigger(type, id);
	}
	read(type, id) {
		const self = this;
		const key = [type, id].join(".");
		const itemIndex = self.readField(self.index, key);
		if (typeof itemIndex === "undefined") {
			//throw new Error("Internal error: read failed because index does not exist for the item");
			return undefined;
		} else {
			const item = self.collection[itemIndex];
			return item;
		}
	}
	update(type, id, attributes) {
		const self = this;
		const key = [type, id].join(".");
		const itemIndex = self.readField(self.index, key);
		if (typeof itemIndex === "undefined") {
			throw new Error("Internal error: update failed because index does not exist for the item");
		} else {
			self.collection[itemIndex] = attributes;
			// note: wrap trigger in setTimeout if we want proper ordering on changes
			// note: it shouldn't matter for now
			self.trigger(type, id);
			return self.collection[itemIndex];
		}
	}
	delete(type, id) {
		const self = this;
		const key = [type, id].join(".");
		const itemIndex = self.readField(self.index, key);
		if (typeof itemIndex === "undefined") {
			throw new Error("Internal error: delete failed because index does not exist for the item");
		} else {
			self.deleteField(self.index, key);
			self.collection[itemIndex] = undefined;
			self.trigger(type, id);
			return undefined;
		}
	}
}

export default new ModelService();
