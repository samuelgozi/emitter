export default class {
	_events = {};

	on(name, cb) {
		const eventCallbacks = (this._events[name] = this._events[name] || []);
		this._events[name].push(cb);
		return () => (this._events[name] = eventCallbacks.filter(fn => fn !== cb));
	}

	emit(name, data) {
		if (this._events[name] === undefined) return;
		this._events[name].forEach(cb => cb(data));
	}
}
