# xcase
Blazingly fast recursive conversion to and from camelCase or PascalCase for objects and arrays and strings.

It supports both Node.js and Browser.

xcase passes most of https://github.com/domchristie/humps tests, excluding only those with custom regexps and handler functions. So if you use `humps` and need something much faster than this is the right place.

```
> node benchmark.js
xcase#camelize x 5,399,331 ops/sec ±1.36% (90 runs sampled)
humps#camelize x 690,996 ops/sec ±1.48% (87 runs sampled)
lodash#camelCase x 597,486 ops/sec ±0.96% (87 runs sampled)
Fastest is xcase#camelize
xcase#decamelize x 4,662,606 ops/sec ±0.72% (92 runs sampled)
humps#decamelize x 1,293,234 ops/sec ±1.50% (85 runs sampled)
lodash#snakeCase x 503,567 ops/sec ±1.69% (91 runs sampled)
Fastest is xcase#decamelize
xcase#camelizeKeys x 415,509 ops/sec ±1.41% (90 runs sampled)
humps#camelizeKeys x 108,174 ops/sec ±0.89% (89 runs sampled)
lodash#reduce + camelCase x 91,300 ops/sec ±0.59% (93 runs sampled)
Fastest is xcase#camelizeKeys
xcase#decamelizeKeys x 427,660 ops/sec ±1.05% (93 runs sampled)
humps#decamelizeKeys x 161,917 ops/sec ±1.03% (91 runs sampled)
lodash#reduce + snakeCase: 
Fastest is xcase#decamelizeKeys
xcase#camelizeKeys (large object) x 518 ops/sec ±1.77% (87 runs sampled)
xcase#camelizeKeys {inPlace: true} (large object) x 447 ops/sec ±1.50% (77 runs sampled)
humps#camelizeKeys (large object) x 134 ops/sec ±2.16% (75 runs sampled)
Fastest is xcase#camelizeKeys (large object)
xcase#decamelizeKeys (large object) x 508 ops/sec ±1.10% (86 runs sampled)
humps#decamelizeKeys (large object) x 135 ops/sec ±19.79% (63 runs sampled)
Fastest is xcase#decamelizeKeys (large object)
```

## Installation

Node: `npm install --save xcase`

Browser (JSPM): `jspm install npm:xcase`

Browser (Bower): `jspm install xcase`

Browser (Manual): Load https://raw.githubusercontent.com/encharm/xcase/master/dist/xcase.min.js and use global `xcase` object

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

* `pascalize(string, [opts])`

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
