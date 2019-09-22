import Emitter from '../src/index.js';

test('Adds callback to events with specified name', () => {
	const emitter = new Emitter();

	function callback() {}

	emitter.on('test', callback);

	expect(emitter.events).toHaveProperty('test');
	expect(emitter.events.test.length).toEqual(1);
	expect(emitter.events.test[0]).toBe(callback);
});

test('Adding listener returns a working unbind function', () => {
	const emitter = new Emitter();

	function callback() {}

	const unbind = emitter.on('test', callback);

	expect(typeof unbind).toEqual('function');

	unbind();

	expect(emitter.events.test.length).toEqual(0);
});

test('Unbinding function only removes the correct function', () => {
	const emitter = new Emitter();

	function callback() {}

	const unbind = emitter.on('test', callback);
	emitter.on('test', () => {});
	emitter.on('test', () => {});

	expect(emitter.events.test.length).toEqual(3);
	unbind();
	expect(emitter.events.test.length).toEqual(2);
});
