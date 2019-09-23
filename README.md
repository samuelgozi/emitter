[![codecov](https://codecov.io/gh/samuelgozi/emitter/branch/master/graph/badge.svg)](https://codecov.io/gh/samuelgozi/emitter)

# Emitter

Tiny(12 lines of code) javascript event emitter written with ES2019.
This library should be transpiled by you into the version of JS that you need to support.
A babel configuration is provided but without a .browserslistrc configuration.

# Why yet another event emitter?

## I don't trust other peoples code

Now a day its easy to lose track of all of your project's dependencies,
in addition to that, many projects have dependencies for the smallest tasks like checking equality and other basic stuff, this makes large projects more susceptible security vulnerabilities than ever before.

Thats why I decided to write small reusable libraries like this one:

1. This library has no dependencies(other than for tests)
2. Extremely small codebase(12 lines of code).
3. thoroughly tested
4. simple

I believe that all those help with security.

## Its small!

Yes there are others out there that are small to, and might be better for your project like `nanoevents`.

I would use `nanoevents` instead of this one if you think that the output code of babel will be bigger than theirs.
But Thats probably not going to be the case if you already use ESNext syntax in your project, because all of the polyfills will end up being in your code anyways.

And in you are targeting modern browsers, then yhe code in this library will end up being smaller, and faster.

## Its ready for future JS engines!

Its built with modern JS engines in mind.
So with time, when your project starts to target newer browsers, you wont need to do any transpilation to the code, and it will end up being shorter and faster.

If you are using something like `nanoevents` then it will still work, but the code will end up a little longer.

I know that for most devs the difference is too small to care about, and thats fine, I just love to write code.

# Can I use it in production?

Yes you can, we doo. Its thoroughly tested, and very small, so you probably should use it if you don't need any advanced features, but in the worst case you can extend it. its just a class, and a very simple one too.

If you think that a core functionality should be added then just do a quick pull request with tests, or leave an issue.

# Instructions

1. Install

```
yarn add `@trice/emitter`
```

2. use

```
import Emitter from '@trice/emitter';
// Initialize
const emitter = new Emitter();

// Add event listener
// Also returns a function to unbind this listener.
const unbind = emitter.on('tick', console.log);

// Emit event
emitter.emit('tick', 'hello world');

// All callbacks for emitter will be called
// console will print "hello world"

// Remove the event listener
unbind();

// The console will stop logging "hello world"
// on next "tick" events.
```

3. thats it!

## The API

The emitter class instance has two methods:

1. `on` add callback function to event.
2. `emit` emit an event and call all binded callbacks.

### `on` method

Receives two arguments:

1. event name
2. callback function that will be called with the data passed when the event is emitted.

**Returns a function than when called will remove the event listener, or "unbind" the callback you passed if you will.**

### `emit` method

Receives two arguments:

1. event name
2. Data to pass to the callbacks, can be anything or nothing.
