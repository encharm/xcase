# xcase
Blazingly fast recursive conversion to and from camelCase or PascalCase for Objects and Arrays.

xcase passes most of https://github.com/domchristie/humps tests, excluding only those with custom regexps and handler functions. So if you use `humps` in Node and need something 4x faster then this is the right place.

```
> node benchmark.js
xcase#camelizeKeys x 667 ops/sec ±1.06% (91 runs sampled)
xcase#camelizeKeys {inPlace: true} x 594 ops/sec ±1.75% (83 runs sampled)
humps#camelizeKeys x 166 ops/sec ±0.24% (84 runs sampled)
```

## Installation
`npm install --save xcase`

## Usage:

```
let {camelizeKeys} = require('xcase');
let obj = camelizeKeys({
  foo_bar: 1
}); 
// obj is {fooBar: 1}
```

## API

* `camelize(string, [options])` 

    change `"foo_bar"`/`"foo bar"`/`"foo-bar"` to `"fooBar"`

* `camelizeKeys(objectOrArray, [options])`

    change all keys according to `camelize`

* `decamelize(string, [options])`

    change `"fooBar"` to `"foo_bar"` and takes custom `separator` in options

* `decamelizeKeys(objectOrArray, [options])`

    change all keys according to `decamelize`

* `pascalize(object, [opts])`

    change `"foo_bar"`/`"foo bar"`/`"foo-bar"` to `"FooBar"`

* `pascalizeKeys(objectOrArray, [options])`

    change all keys according to `pascalize`

* `depascalize(string, [opts])`

    change `"FooBar"` to `"foo_bar"` and takes custom `separator` in options

* `depascalizeKeys(objectOrArray, [options])`

    change all keys according to `depascalize`


Options:
* `inPlace: true` - to modify existing object (note, it's slower than default! v8 is smarter than us)
* `separator` - for example `-` for `de**` variant of functions

## License

MIT

Copyright (c) 2016, Code Charm Ltd
