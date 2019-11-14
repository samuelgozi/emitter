export default class Emitter {
	events = {};

	on(name, cb) {
		this.events[name] ? this.events[name].push(cb) : (this.events[name] = [cb]);

		// Return a function to unbind the callback.
		return () => {
			this.events[name] = this.events[name].filter(fn => fn !== cb);
		};
	}

	emit(name, data) {
		this.events[name] && this.events[name].forEach(cb => cb(data));
	}
}
