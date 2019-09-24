import Emitter from '../index.js';

test('Adds callback to events with specified name', () => {
	const emitter = new Emitter();

	function callback() {}

	emitter.on('test', callback);

	expect(emitter._events).toHaveProperty('test');
	expect(emitter._events.test.length).toEqual(1);
	expect(emitter._events.test[0]).toBe(callback);
});

test('Adding listener returns a working unbind function', () => {
	const emitter = new Emitter();

	function callback() {}

	const unbind = emitter.on('test', callback);

	expect(typeof unbind).toEqual('function');

	unbind();

	expect(emitter._events.test.length).toEqual(0);
});

test('Unbinding function only removes the correct function', () => {
	const emitter = new Emitter();

	function callback() {}

	const unbind = emitter.on('test', callback);
	emitter.on('test', () => {});
	emitter.on('test', () => {});

	expect(emitter._events.test.length).toEqual(3);
	unbind();
	expect(emitter._events.test.length).toEqual(2);
});

test('Unbinded functions are not called', () => {
	const emitter = new Emitter();

	let first = false;
	let second = false;
	let third = false;

	emitter.on('test', () => (first = true));
	const unbind = emitter.on('test', () => (second = true));
	emitter.on('test', () => (third = true));
	unbind();

	emitter.emit('test');

	expect(first).toEqual(true);
	expect(second).toEqual(false);
	expect(third).toEqual(true);
});

test('Emit runs all callbacks for a specific event', () => {
	const emitter = new Emitter();

	let first = false;
	let second = false;
	let third = false;

	emitter.on('test', () => (first = true));
	emitter.on('test', () => (second = true));
	emitter.on('test', () => (third = true));

	emitter.emit('test');

	expect(first).toEqual(true);
	expect(second).toEqual(true);
	expect(third).toEqual(true);
});

test('Callbacks only run when emit is called', () => {
	const emitter = new Emitter();

	let called = false;

	function callback() {
		called = true;
	}

	emitter.on('test', callback);
	expect(called).toEqual(false);
	emitter.emit('test');
	expect(called).toEqual(true);
});

test("Emit doesn't throw when no callbacks are binded to an event", () => {
	const emitter = new Emitter();

	expect(() => emitter.emit('test')).not.toThrow();
});
