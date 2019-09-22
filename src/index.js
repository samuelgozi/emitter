export default class {
	events = {};

	on(name, cb) {
		const eventCallbacks = (this.events[name] = this.events[name] || []);
		this.events[name].push(cb);
		return () => (this.events[name] = eventCallbacks.filter(fn => fn !== cb));
	}

	emit(name, data) {
		if (this.events[name] === undefined) return;
		this.events[name].forEach(cb => cb(data));
	}
}
