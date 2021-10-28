# ts-runtime-typecheck

![100% coverage](https://img.shields.io/badge/coverage-100%25-success)
![0 dependencies](https://img.shields.io/badge/dependencies-0-success)
![npm](https://img.shields.io/npm/dm/ts-runtime-typecheck)

Simple functions for validating complex data.

JavaScript is a very flexible language. Meaning it's easy to get tripped up by a value with an unexpected type. Even in TypeScript you occasionally have to deal with values which cannot be safely typed at compile time. This library provides a comprehensive selection of functions to simplify type checking code with clear and concise function calls. Ensuring strict type safety throughout your program, no matter the input.

## Installation

Releases are available on the npm repository and our GitHub releases page. ESM and CJS formats are both included, as well as TypeScript type definition files. Both formats work without TypeScript if you prefer plain JS.

```bash
npm install ts-runtime-typecheck
```

---

## Contents

- [Installation](#installation)
- [Type Casts](#type-casts)
  - [Fallback values](#fallback-values)
- [Type Checks](#type-checks)
- [Type Coerce](#type-coerce)
- [Type Asserts](#type-asserts)
- [JSON Types](#json-types)
- [Ensuring an optional value is defined](#ensuring-an-optional-value-is-defined)
- [Array/Object of Type Casts](#arrayobject-of-type-casts)
- [Validating interfaces](#validating-interfaces)
- [Union types](#union-types)
- [Class instances](#class-instances)
- [Reference](#reference)
  - [Reference: Type Casts](#reference-type-casts)
  - [Reference: Optional Type Casts](#reference-optional-type-casts)
  - [Reference: Type Checks](#reference-type-checks)
  - [Reference: Optional Type Checks](#reference-optional-type-checks)
  - [Reference: Type Coerce](#reference-type-coerce)
  - [Reference: Type Assert](#reference-type-assert)
  - [Reference: Types](#reference-types)
- [Changelog](#changelog)
  - [v1.0.0](#v100)
  - [v1.1.0](#v110)
  - [v1.1.1](#v111)
  - [v1.2.0](#v120)
  - [v2.0.0](#v200)
  - [v2.1.0](#v210)
  - [v2.1.1](#211)
  - [v2.2.0](#220)
  - [v2.2.1](#221)
  - [v2.2.2](#222)
  - [v2.3.0](#230)

## Type Casts

**Type Casts** take an `unknown` value as an argument, and return a typed value as the result. These functions take the form [`as{TYPE}`](#reference-type-casts), for example [`asNumber`](#asNumber). If the input value does not match the required type the function will throw. This does not perform any coercion on the value, passing a `string` of a number to [`asNumber`](#asNumber) will cause it to throw.

```typescript
import { asNumber } from 'ts-runtime-typecheck';

function square (input: unknown): number {
  const value: number = asNumber(input);
  return value * value;
}

square(10)
// 100
square()
// Error: Unable to cast undefined to number
square('10')
// Error: Unable to cast string to number
```

**Type Casts** are meant to primarily validate questionable values that are expected to be in a well defined structure. Such as network responses, interfacing with untyped JavaScript or reading data back from a file. If you are looking to validate a type, without throwing an error then take a look at [Type Checks](#type-checks).

### Fallback values

The standard type cast functions take a second optional parameter, which is a _fallback_ value. In the situation that the input is [`Nullish`](#nullish) and the fallback parameter has been defined the function will return the fallback parameter instead of throwing. This is very helpful for validating the input of an optional value, and providing a default value.

```typescript
import { asString } from 'ts-runtime-typecheck';

function printName (name: unknown) {
  const value: string = asString(name, 'Dave');
  console.log(`Hello ${value}, how are you today?`);
}

printName()
// Hello Dave, how are you today?
printName('James')
// Hello James, now are you today?
printName(42)
// Error: Unable to cast number to string
```

In the situation you want to check a value meets an [`Optional`](#optional) type there exists an alternate function for each type cast. These take the form [`asOpt{TYPE}`](#reference-optional-type-casts). Unlike the standard functions they do not allow for a fallback value, but when a [`Nullish`](#nullish) value is passed in they will always emit `undefined`. If the input is not [`Nullish`](#nullish), then it behaves the same as the standard type casts. If the type condition is met then it emits the value, otherwise it will throw.

---

## Type Checks

**Type Checks** take an `unknown` value as an argument, and return a `boolean` indicating if the given value matches the required type. These functions take the form [`is{TYPE}`](#reference-type-checks). In the correct situation TypeScript is capable of refining the type of a value through the use of these functions and flow analysis, like the below example.

```typescript
import { isNumber } from 'ts-runtime-typecheck';

export function printSq (value: unknown) {
  if (isNumber(value)) {
    // inside this block `value` is a `number`
    console.log(`${value} * ${value} = ${value * value}`);
  }
  else {
    // inside this block `value` is `unknown`
    console.log('Invalid input', value);
  }
}
```

In addition all relevant [Type Checks](#reference-type-checks) have an alternate variant that take the form [`isOpt{TYPE}`](#reference-optional-type-checks). These variants return true if the value meets the given type or [`Nullish`](#nullish).

```typescript
import { isOptNumber } from 'ts-runtime-typecheck';

export function printSq (input: unknown) {
  if (isOptNumber(input)) {
    // inside this block `input` is `number | undefined | null`
    const value = input ?? 1; // use nullish coalescing operator to ensure value is number
    console.log(`${value} * ${value} = ${value * value}`);
  }
  else {
    // inside this block `input` is `unknown`
    console.log('Invalid input', value);
  }
}
```

---

## Type Coerce

**Type Coercion** functions take an `unknown` value as an argument, and convert it into a specific type. These functions take the format [`make{TYPE}`](#reference-type-coerce). Unlike the other functions this only works for small subset of types: number, string and boolean. They make a best effort to convert the type, but if the input is not suitable then they will throw an error. For instance passing a non-numeric string to [`makeNumber`](#make-number) will cause it to throw, as will passing a string that is not `"true" | "false"` to [`makeBoolean`](#make-boolean). While these functions will take any input value, this is to allow the input of values that have not been validated. The only valid input types for all 3 functions are `number | string | boolean`. The intention here is to allow useful conversion, but prevent accidentally passing complex types.

There is an argument that [`makeString`](#makestring) could support using the `toString` method of an `object`, but the default `toString` method returns the useless `[object Object]` string. It is possible to detect if an object has implemented it's own `toString` method, but is it correct to use it in this situation? That depends on the intention of the programmer. In the absence of a clear answer the line has been drawn at only accepting primitives.

```typescript
import { makeNumber } from 'ts-runtime-typecheck';

makeNumber('80') // 80
makeNumber(80) // 80
makeNumber(true) // 1
makeNumber(false) // 0
makeNumber('hello') // Error: Unable to cast string to Number
makeNumber({
  toString () { return 'hello' }
}) // Error: Unable to cast object to Number

```

---

## Type Asserts

**Type Assert** functions accept an `unknown` value and throw if the value does not meet the type requirement, they do not return a value. While this may seem very similar to [Type Casts](#type-casts) they are capable of providing a hint to the TypeScript compiler without needing to reassign the value. As such they are very helpful for validating function arguments before using them.

Each type assert takes an optional second argument that is a label for the passed value, this will be included in the thrown `TypeAssertion` error if the value does not meet the type requirement, making it easier to isolate the type violation.

```typescript
import { assertDefined } from 'ts-runtime-typecheck';

function main (meaningOfLife: Optional<number>) {
  meaningOfLife // number | null | undefined
  assertDefined(meaningOfLife, 'Meaning of Life');
  meaningOfLife // number
  return 'but what is the question?';
}

main(42); // 'but what is the question?'
main(); // TypeAssertion: Meaning of Life is not defined
```

TypeAsserts cannot be based on generic types, due to limits in the TypeScript type system. Hence there is no equivalent to [`isStruct`](#isstruct) and similar [`TypeCheck`](#typecheck). However, there is an alternative. It's possible to utilise an invariant ( or assert) function with a [`TypeCheck`](#typecheck) to get the same effect, and an implementation of [`invariant`](#invariant) is provided for this purpose.

```typescript
import { invariant, isLiteral } from 'ts-runtime-typecheck';

function main (meaningOfLife: unknown) {
  meaningOfLife // unknown
  invariant(isLiteral(42)(meaningOfLife), "Universe is broken, meaning of life isn't 42!");
  meaningOfLife // 42
  return 'but what is the question?';
}

main(42); // 'but what is the question?'
main(); // TypeAssertion: Universe is broken, meaning of life isn't 42!
```

---

## JSON Types

Dealing with validating JSON values can often be frustrating, so to make it a little easier JSON specific types and checks are provided. Using the [`JSONValue`](#jsonvalue) type in your code will ensure that TS statically analyses any literal values as serializable to JSON.

```typescript
import type { JSONArray, JSONObject, JSONValue } from 'ts-runtime-typecheck';

// JSONArray is an Array of JSONValues
const a: JSONArray = [12, 'hello'];
// JSONObject is a Dictionary of JSONValues
const b: JSONObject = {
  num: 12,
  str: 'hello'
};
// JSONValue can be any of the following: JSONObject, JSONArray, string, number, boolean or null
const c: JSONValue = 12;

const d: JSONValue = new Error('hi'); // Type 'Error' is not assignable to type 'JSONValue'
```

For dynamic data [`isJSONValue`](#isjsonvalue) and [`asJSONValue`](#asjsonvalue) provide recursive type validation on a value.

[Type Check](#reference-type-checks) and [Type Casts](#reference-type-casts) are provided for [`JSONArrays`](#jsonarray) and [`JSONObjects`](#jsonobject), with the caveat that they only accept [`JSONValues`](#jsonvalue). This is to avoid needing to recursively validate values which have already been validated.

```typescript
import { asJSONValue, isJSONObject, isJSONArray } from 'ts-runtime-typecheck';
import type { JSONValue } from 'ts-runtime-typecheck';

function main (a: unknown) {
  const obj: JSONValue =  asJSONValue(a);
  // obj: JSONValue
  if (isJSONArray(obj)) {
    // obj: JSONArray
  }
  else if (isJSONObject(obj)) {
    // obj: JSONObject
  }
  else {
    // obj: number | string | boolean | null
  }
}
```

One other caveat of [`JSONValue`](#jsonvalue) is that it does not guarantee that the value is not cyclic. It is not possible to serialize cyclic object with `JSON.stringify`, but they are otherwise valid. Using [`isJSONValue`](#isjsonvalue) or [`asJSONValue`](#asjsonvalue) on a cyclic object *will fail*.

```typescript
import { asJSONValue } from 'ts-runtime-typecheck';
import type { Dictionary } from 'ts-runtime-typecheck';

const almost_right: Dictionary = {};
almost_right.self = almost_right;

// BANG! this will fail, it recurses endlessly
const obj = asJSONValue(almost_right);
```

---

## Ensuring an optional value is defined

A common situation is that you have an [`Optional`](#optional) value, with a well defined type. At a specific time it should be defined, but the type system is not aware of this. TypeScript will allow you to cast the value to a non-optional type using `!`, but this is often discouraged in style guides. As an alternative solution you can use the [`asDefined`](#asdefined) function, which removes the optionality from a type union. As with the other type casts this can take a fallback value, and will throw if the condition is not met. However, the output type matches the input type with [`Nullish`](#nullish) subtracted.

```typescript
import { asDefined } from 'ts-runtime-typecheck';

function setup (useComplexType: boolean = false, complexInst?: ComplexType) {
  if (useComplexType) {
    const inst: ComplexType = asDefined(complexInst);
    inst.doComplexThing();
  }
  else {
    doSimpleThing();
  }
}
```

## Array/Object of Type Casts

Validating that a value is an array or dictionary is easy enough, but how about the type of the contents? [`asArrayOf`](#asarrayof) and [`asDictionaryOf`](#asdictionaryof) allow you to cast the elements of a collection using a user defined [Type Check](#reference-type-checks). For example, to cast to `Array<string>`:

```typescript
import { isString, asArrayOf } from 'ts-runtime-typecheck';

function main (obj: unknown) {
  const asStringArray = asArrayOf(isString);

  const arr: string[] = asArrayOfString(obj);
}
```

Or `Array<Dictionary<number>>`:

```typescript
import { isNumber, isDictionaryOf, asArrayOf } from 'ts-runtime-typecheck';

function main () {
  const isDictionaryOfNumber = isDictionaryOf(isNumber);
  const asArrayOfDictionaryOfNumber = asArrayOf(isDictionaryOfNumber);

  const arr = asArrayOfDictionaryOfNumber([
    {
      a: 12,
      b: 42
    },
    {
      n: 90
    }
  ]);
}

```

## Validating interfaces

Validating the shape of an object using a combination of [`asDictionary`](#asdictionary) and other [Type Casts](#reference-type-casts) specific to property types can be a bit verbose. To simplify this scenario you can use [`asStruct`](#asstruct). This function takes an [`InterfacePattern`](#interfacepattern) that defines a specific structure and returns a new function that will cast an unknown value to that structure. An [`InterfacePattern`](#interfacepattern) is a fancy name for a [`Dictionary`](#dictionary) of [Type Checks](#reference-type-checks).

```typescript
import { asStruct, isString, isNumber } from 'ts-runtime-typecheck';

interface Item {
  name: string;
  value: number;
}

const asItem = asStruct({ name: isString, value: isNumber })

function main (obj: unknown) {
  const item: Item = asItem(obj);

  console.log(`${item.name} = ${item.value}`);
}
```

There is also a [Type Check](#reference-type-checks) variant of the this function called [`isStruct`](#isstruct) which works in a very similar way. As an [`InterfacePattern`](#interfacepattern) is composed of [Type Check](#reference-type-checks) functions it's possible to compose nested interface [Type Checks](#reference-type-checks).

```typescript
import { asStruct, isStruct, isString, isOptString, isNumber } from 'ts-runtime-typecheck';
import type { Optional } from 'ts-runtime-typecheck';

interface Declaration {
  item: Item;
  description: Optional<string>
}

interface Item {
  name: string;
  value: number;
}

const isItem = isStruct({ name: isString, value: isNumber });
const asDeclaration = asStruct({ item: isItem, description: isOptString });

function main (obj: unknown) {
  const { item, description } = asDeclaration(obj);

  const comment: string = description ? `// ${description}` : '';
  console.log(`${item.name} = ${item.value} ${comment}`);
}
```

---

## Union types

When a value can be 2 or more types it is relatively easy to do [Type Check](#reference-type-checks).

```typescript
import { isString, isArray } from 'ts-runtime-typecheck';

if (isString(a) || isArray(a)) {
  // a: string | unknown[]
}
```

But you can't cast to that type, or pass it into a function like [`asArrayOf`](#asarrayof) or [`isStruct`](isstruct) which require a [Type Check](#reference-type-checks) for their input. To do this you can use [`isUnion`](#isunion) or [`asUnion`](#asunion). These functions take a variable number of [Type Checks](#reference-type-checks) and produce a union of them.

```typescript
import {
  isString,
  isArray,
  isUnion,
  asArrayOf
} from 'ts-runtime-typecheck';

const check = asArrayOf(isUnion(isString, isArray));
const b = check(['hello', [0, 1, 2], 'world']);
```

---

## Class instances

Under most scenarios you will know if a value is an instance of a given class. However, there are scenarios where this is not the case. For these situations you can use [`isInstance`](#isinstance) or [`asInstance`](#asinstance) to ensure you have the correct type.

```typescript
import { isInstance } from 'ts-runtime-typecheck';

function print_error (err) {
  if (isInstance(Error)(err)) {
    print_string(err.message);
  } else {
    print_unknown(err)
  }
}
```

When validating a value matches an interface it may be desirable to instead use [`isInstance`](#isinstance) instead of [`isStruct`](#isstruct). While it doesn't provide the same guarantees it will often be significantly faster, as it does not perform a [Type Check](#reference-type-checks) on each member to see that they exist and contain the right type of value.

---

## Literal types

TypeScript supports value types for [`Primitive`](#primitive)s. For example

```typescript
let a: 'hello world' = 'hello world';

a = 'goodbye world'; // Type '"goodbye world"' is not assignable to type '"hello world"'
```

You can use [`asLiteral`](#asliteral) and [`isLiteral`](#isliteral) to construct [`TypeCast`](#typecast)s and [`TypeCheck`](#typecheck)s respectively for these value types. These checks can be particularly useful for discriminated unions.

```typescript
interface A {
  type: 'a';
  value: number;
}

interface B {
  type: 'b';
  value: number;
}

const isA = isStruct({
  type: isLiteral('a'),
  value: isNumber,
});

function main (n: A | B) {
  n // A | B
  if (isA(n)) {
    n // A
  } else {
    n // B
  }
}
```

## Reference

### Reference: Type Casts

- ### asString

  Cast `unknown` to `string`. Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asNumber

  Cast `unknown` to `number`. Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asIndex

  Cast `unknown` to [`Index`](#index). Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asPrimitive

  Cast `unknown` to [`Primitive`](#primitive). Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asIndexable

  Cast `unknown` to [`Indexable`](#indexable). Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asBoolean

  Cast `unknown` to `boolean`. Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asArray

  Cast `unknown` to `Array<unknown>`. Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asDictionary

  Cast `unknown` to [`Dictionary<unknown>`](#dictionary). Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asFunction

  Cast `unknown` to [`UnknownFunction`](#unknownfunction). Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asDefined

  Cast [`Type | Nullish`](#nullish) to `Type`, where `Type` is a generic parameter. Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asJSONValue

  Cast `unknown` to [`JSONValue`](#jsonvalue). This function recursively validates the value, and hence will fail if given a cyclic value. Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asJSONObject

  Cast [`JSONValue`](#jsonvalue) to [`JSONObject`](#jsonobject). Unlike [`asJSONValue`](#asjsonvalue) this does not perform recursive validation, hence it only accepts a [`JSONValue`](#jsonvalue) so that the sub-elements are of a known type. Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asJSONArray
  
  Cast [`JSONValue`](#jsonvalue) to [`JSONArray`](#jsonarray). Unlike [`asJSONValue`](#asjsonvalue) this does not perform recursive validation, hence it only accepts a [`JSONValue`](#jsonvalue) so that the sub-elements are of a known type. Accepts an optional fallback value that is emitted if the value is nullish and fallback is defined.

- ### asArrayOf
  
  Takes a Type Cast function for `Type` and returns a new Type Cast function for `Array<Type>` where type is a generic parameter. The emitted Type Cast function accepts an optional fallback value that is emitted if the value is nullish and fallback is defined. Refer to [Array/Object of Type Casts](#arrayobject-of-type-casts) for examples.

- ### asDictionaryOf
  
  Takes a Type Cast function for `Type` and returns a new Type Cast function for [`Dictionary<Type>`](#dictionary) where type is a generic parameter. The emitted Type Cast function accepts an optional fallback value that is emitted if the value is nullish and fallback is defined. Refer to [Array/Object of Type Casts](#arrayobject-of-type-casts) for examples.

- ### asStruct
  
  Takes an [`InterfacePattern`](#interfacepattern) which is equivalent to `Type` and returns a new Type Cast function for `Type`, where `Type` is an interface defined by the [`TypeAsserts`](#typeassert) specified in the pattern. Refer to [Validating interfaces](#validating-interfaces) for examples.

- ### asInstance

  Takes a class (not a instance of a class) and returns a new Type Cast for an instance of that class.

- ### asLiteral

  Takes a [Primitive](#primitive) value and returns a new Type Cast for that specific value.

### Reference: Optional Type Casts

- ### asOptString

  Cast `unknown` value to `string | undefined`. If value is [`Nullish`](#nullish) then return `undefined`.

- ### asOptNumber

  Cast `unknown` value to `number | undefined`. If value is [`Nullish`](#nullish) then return `undefined`.

- ### asOptIndex

  Cast `unknown` value to [`Index | undefined`](#index). If value is [`Nullish`](#nullish) then return `undefined`.

- ### asOptPrimitive

  Cast `unknown` value to [`Primitive | undefined`](#primitive). If value is [`Nullish`](#nullish) then return `undefined`.

- ### asOptIndexable

  Cast `unknown` value to [`Indexable | undefined`](#indexable). If value is [`Nullish`](#nullish) then return `undefined`.

- ### asOptBoolean

  Cast `unknown` value to `boolean | undefined`. If value is [`Nullish`](#nullish) then return `undefined`.

- ### asOptArray

  Cast `unknown` value to `Array<unknown> | undefined`. If value is [`Nullish`](#nullish) then return `undefined`.

- ### asOptDictionary

  Cast `unknown` value to [`Dictionary<unknown> | undefined`](#dictionary). If value is [`Nullish`](#nullish) then return `undefined`.

- ### asOptFunction

  Cast `unknown` value to [`UnknownFunction | undefined`](#unknownfunction). If value is [`Nullish`](#nullish) then return `undefined`.

- ### asUnion

  Takes a variable number of type checks as parameters `<A>(...checks: TypeCheck<A>[])` and returns a new type cast that composes them into type cast for the union `A`. This allows creating a cast for a type union by composing any existing type checks.

- ### asOptUnion

  Identical to [`asUnion`](#asunion) but it the resulting cast returns `A | null | undefined`.

- ### asOptJSONValue

  Cast `unknown` value to [`JSONValue | undefined`](#jsonvalue). If value is [`Nullish`](#nullish) then return `undefined`.

- ### asOptJSONObject

  Cast [`JSONValue | undefined`](#jsonvalue) value to [`JSONObject | undefined`](#jsonobject). If value is [`Nullish`](#nullish) then return `undefined`.

- ### asOptJSONArray

  Cast [`JSONValue | undefined`](#jsonvalue) value to [`JSONArray | undefined`](#jsonarray). If value is [`Nullish`](#nullish) then return `undefined`.

- ### asOptArrayOf

  Takes a Type Cast function for `Type` and returns a new Type Cast function for `Array<Type> | undefined` where type is a generic parameter. Refer to [Array/Object of Type Casts](#arrayobject-of-type-casts) for examples.

- ### asOptDictionaryOf

  Takes a Type Cast function for `Type` and returns a new Type Cast function for [`Dictionary<Type> | undefined`](#dictionary) where type is a generic parameter. Refer to [Array/Object of Type Casts](#arrayobject-of-type-casts) for examples.

- ### asOptStruct
  
  Takes an [`InterfacePattern`](#interfacepattern) which is equivalent to `Type` and returns a new Type Cast function for `Type | undefined`, where `Type` is an interface defined by the [`TypeAsserts`](#typeassert) specified in the pattern. Refer to [Validating interfaces](#validating-interfaces) for examples.

- ### asOptInstance

  Takes a class (not a instance of a class) and returns a new Type Cast for a Optional instance of that class.

- ### asOptLiteral

  Takes a [Primitive](#primitive) value and returns a new optional Type Cast for that specific value.

### Reference: Type Checks

- ### isDictionary

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`Dictionary<unknown>`](#dictionary).

- ### isFunction

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`UnknownFunction`](#unknownfunction).

- ### isBoolean

  Takes an `unknown` value and returns a boolean indicating if the value is of the type `boolean`.

- ### isString

  Takes an `unknown` value and returns a boolean indicating if the value is of the type `string`.

- ### isNumber

  Takes an `unknown` value and returns a boolean indicating if the value is of the type `number`.

- ### isIndex

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`Index`](#index).

- ### isPrimitive

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`Primitive`](#primitive).

- ### isIndexable

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`Indexable`](#indexable).

- ### isArray

  Takes an `unknown` value and returns a boolean indicating if the value is of the type `Array<unknown>`.

- ### isUndefined

  Takes an `unknown` value and returns a boolean indicating if the value is of the type `undefined`.

- ### isNullish

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`Nullish`](#nullish).

- ### isDefined

  Takes an `unknown` value and returns a boolean indicating if the value is **not** of the type [`Nullish`](#nullish).

- ### isUnion

  Takes a variable number of type checks as parameters `<A>(...checks: TypeCheck<A>[])` and returns a new type check that composes them into union type check `TypeCheck<A>`. This allows creating a test for a type union by composing any existing type checks. For inline code it will generally make sense to use logical OR operators instead of this, for example `if ( isNumber(n) || isArray(n) ) {}`. This particular function is intended for when you wish to compose a type check or cast that contains a union, or create a library type check for a common union type.

- ### isJSONValue

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`JSONValue`](#jsonvalue).

- ### isJSONArray

  Takes an [`JSONValue`](#jsonvalue) value and returns a boolean indicating if the value is of the type [`JSONArray`](#jsonarray).

- ### isJSONObject

  Takes an [`JSONValue`](#jsonvalue) value and returns a boolean indicating if the value is of the type [`JSONObject`](#jsonobject).

- ### isArrayOf
  
  Takes a Type Check function for `Type` and returns a new Type Check function for `Array<Type>` where Type is a generic parameter.

- ### isDictionaryOf
  
  Takes a Type Check function for `Type` and returns a new Type Check function for [`Dictionary<Type>`](#dictionary) where Type is a generic parameter.

- ### isStruct

  Takes an [`InterfacePattern`](#interfacepattern) which is equivalent to `Type` and returns a new [`TypeAssert`](#typeassert) function for `Type`, where `Type` is an interface defined by the [`TypeAsserts`](#typeassert) specified in the pattern. Refer to [Validating interfaces](#validating-interfaces) for examples.

- ### isInstance

  Takes a class (not a instance of a class) and returns a new Type Check for an instance of that class.

- ### isLiteral

  Takes a [Primitive](#primitive) value and returns a new Type Check for that specific value.

### Reference: Optional Type Checks

- ### isOptDictionary

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`Optional<Dictionary<unknown>>`](#dictionary).

- ### isOptFunction

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`Optional<UnknownFunction>`](#unknownfunction).

- ### isOptBoolean

  Takes an `unknown` value and returns a boolean indicating if the value is of the type `Optional<boolean>`.

- ### isOptString

  Takes an `unknown` value and returns a boolean indicating if the value is of the type `Optional<string>`.

- ### isOptNumber

  Takes an `unknown` value and returns a boolean indicating if the value is of the type `Optional<number>`.

- ### isOptPrimitive

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`Optional<Primitive>`](#primitive).

- ### isOptIndex

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`Optional<Index>`](#index).

- ### isOptIndexable

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`Optional<Indexable>`](#indexable).

- ### isOptArray

  Takes an `unknown` value and returns a boolean indicating if the value is of the type `Optional<Array<unknown>>`.

- ### isOptUnion

  Identical to [`isUnion`](#isunion) but it the resulting typecheck is `TypeCheck<A | null | undefined>`.

- ### isOptJSONValue

  Takes an `unknown` value and returns a boolean indicating if the value is of the type [`Optional<JSONValue>`](#jsonvalue).

- ### isOptJSONArray

  Takes an [`Optional<JSONValue>`](#jsonvalue) value and returns a boolean indicating if the value is of the type [`Optional<JSONArray>`](#jsonarray).

- ### isOptJSONObject

  Takes an [`Optional<JSONValue>`](#jsonvalue) value and returns a boolean indicating if the value is of the type [`Optional<JSONObject>`](#jsonobject).

- ### isOptStruct

  Takes an [`InterfacePattern`](#interfacepattern) which is equivalent to `Type` and returns a new [`TypeAssert`](#typeassert) function for `Optional<Type>`, where `Type` is an interface defined by the [`TypeAsserts`](#typeassert) specified in the pattern. Refer to [Validating interfaces](#validating-interfaces) for examples.

- ### isOptArrayOf
  
  Takes a Type Check function for `Type` and returns a new Type Check function for `Optional<Array<Type>>` where Type is a generic parameter.

- ### isOptDictionaryOf
  
  Takes a Type Check function for `Type` and returns a new Type Check function for [`Optional<Dictionary<Type>>`](#dictionary) where Type is a generic parameter.

- ### isOptInstance

  Takes a class (not a instance of a class) and returns a new Type Check for a Optional instance of that class.

- ### isOptLiteral

  Takes a [Primitive](#primitive) value and returns a new optional Type Check for that specific value.

### Reference: Type Coerce

- ### makeString

  Takes an `unknown` value and converts it to it's *textual* representation. A value that cannot be cleanly converted will trigger an error.

- ### makeNumber

  Takes an `unknown` value and converts it to it's *numerical* representation. A value that cannot be cleanly converted will trigger an error.

- ### makeBoolean

  Takes an `unknown` value and converts it to it's *boolean* representation. A value that cannot be cleanly converted will trigger an error.

- ### makeStrictPartial

  Takes a value of the generic type `T` and returns a copy of the object excluding any members that were `Nullish`. The returned object meets the type `StrictPartial<T>`.

### Reference: Type Assert

- ### assertDefined

Assert value of type [`Type | Nullish`](#nullish) is `Type`, where `Type` is a generic parameter. Accepts an optional name for the value that is included in the error if the value is nullish.

- ### assertNumber

Assert value of type `unknown` is `number`. Accepts an optional name for the value that is included in the error if the value is not a number.

- ### assertString

Assert value of type `unknown` is `string`. Accepts an optional name for the value that is included in the error if the value is not a `string`.

- ### assertBoolean

Assert value of type `unknown` is `boolean`. Accepts an optional name for the value that is included in the error if the value is not a `boolean`.

- ### assertIndex

Assert value of type `unknown` is `Index`. Accepts an optional name for the value that is included in the error if the value is not a `Index`.

- ### assertPrimitive

Assert value of type `unknown` is `Primitive`. Accepts an optional name for the value that is included in the error if the value is not a `Primitive`.

- ### assertArray

Assert value of type `unknown` is `unknown[]`. Accepts an optional name for the value that is included in the error if the value is not a `unknown[]`.

- ### assertDictionary

Assert value of type `unknown` is `Dictionary`. Accepts an optional name for the value that is included in the error if the value is not a `Dictionary`.

- ### assertIndexable

Assert value of type `unknown` is `Indexable`. Accepts an optional name for the value that is included in the error if the value is not a `Indexable`.

- ### assertFunction

Assert value of type `unknown` is `UnknownFunction`. Accepts an optional name for the value that is included in the error if the value is not a `UnknownFunction`.

- ### assertOptNumber

Assert value of type `unknown` is `Optional<number>`. Accepts an optional name for the value that is included in the error if the value is not a `Optional<number>`.

- ### assertOptString

Assert value of type `unknown` is `Optional<string>`. Accepts an optional name for the value that is included in the error if the value is not a `Optional<string>`.

- ### assertOptBoolean

Assert value of type `unknown` is `Optional<boolean>`. Accepts an optional name for the value that is included in the error if the value is not a `Optional<boolean>`.

- ### assertOptIndex

Assert value of type `unknown` is `Optional<Index>`. Accepts an optional name for the value that is included in the error if the value is not a `Optional<Index>`.

- ### assertOptPrimitive

Assert value of type `unknown` is `Optional<Primitive>`. Accepts an optional name for the value that is included in the error if the value is not a `Optional<Primitive>`.

- ### assertOptArray

Assert value of type `unknown` is `Optional<unknown[]>`. Accepts an optional name for the value that is included in the error if the value is not a `Optional<unknown[]>`.

- ### assertOptDictionary

Assert value of type `unknown` is `Optional<Dictionary>`. Accepts an optional name for the value that is included in the error if the value is not a `Optional<Dictionary>`.

- ### assertOptIndexable

Assert value of type `unknown` is `Optional<Indexable>`. Accepts an optional name for the value that is included in the error if the value is not a `Optional<Indexable>`.

- ### assertOptFunction

Assert value of type `unknown` is `Optional<UnknownFunction>`. Accepts an optional name for the value that is included in the error if the value is not a `Optional<UnknownFunction>`.

- ### assertJSONValue

Assert value of type `unknown` is `JSONValue`. Accepts an optional name for the value that is included in the error if the value is not a `JSONValue`.

- ### assertJSONArray

Assert value of type `JSONValue` is `JSONArray`. Accepts an optional name for the value that is included in the error if the value is not a `JSONArray`.

- ### assertJSONObject

Assert value of type `JSONValue` is `JSONObject`. Accepts an optional name for the value that is included in the error if the value is not a `JSONObject`.

- ### assertOptJSONValue

Assert value of type `unknown` is `JSONValue | undefined`. Accepts an optional name for the value that is included in the error if the value is not a `JSONValue | undefined`.

- ### assertOptJSONArray

Assert value of type `JSONValue | undefined` is `JSONArray | undefined`. Accepts an optional name for the value that is included in the error if the value is not a `JSONArray | undefined`.

- ### assertOptJSONObject

Assert value of type `JSONValue | undefined` is `JSONObject | undefined`. Accepts an optional name for the value that is included in the error if the value is not a `JSONObject | undefined`.

### Reference: Helper functions

- ### invariant

  An invariant is a logical declaration about a condition which the programmer knows to be true, but the compiler cannot. Many of the patterns in ts-runtime-typecheck are based around this concept, albeit to encourage a stricter and safer environment. This helper accepts a logical condition and a message. If the condition is true nothing happens, if it's false then a [`TypeAssertion`](#typeassertion) is thrown with the given message. If the condition is the result of a [`TypeCheck`](#typecheck) then the type predicate is enforced by the invariant.
  
  ```typescript
  import { invariant, isString } from 'ts-runtime-typecheck';

  function main (username: unknown) {
    invariant(isString(username), 'Expected username to be a string');

    username // string
  }
  ```

### Reference: Types

- ### JSONValue

  A union of all the JSON compatible types: [`JSONArray`](#jsonarray), [`JSONObject`](#jsonobject), `number`, `string`, `boolean`, `null`.

- ### JSONObject

  An alias to `Dictionary<JSONValue>` which can represent any JSON `Object` value.

- ### JSONArray

  An alias to `Array<JSONValue>` which can represent any JSON `Array` value.

- ### Dictionary

  An alias to `Record<string, Type>` where `Type` is a generic parameter that default to `unknown`. This type can be used to represent a typical key-value map constructed from a JS `Object`. Where possible use [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) instead, as it is specifically designed for this purpose and has better protection against null errors in TS.

- ### Index

  A union of the `number` and `string` types that represent a value that could be used to index an element within a JS `Object`.

- ### Primitive

  A union of the `number`, `string` and `boolean` types that are the key primitive values in JS.

- ### Indexable

  An alias to `Record<Index, Type>` where `Type` is a generic parameter that default to `unknown`. This type can be used to represent an unknown key-value object that can be indexed using a `number` *or* `string`. It is intended to be used to ease the transition of JS project to TS. Where possible use [`Dictionary`](#dictionary) or preferably [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) instead, as it is specifically designed for this purpose and has better protection against null errors in TS.

- ### Nullish

  A union of `undefined` and `null`. Generally preferable to either `null` or `undefined` on non-validated input. However, be aware of varying behavior between these 2 types in JS around optional members, default parameters and equality.

- ### Optional

  A union of `Type` and [`Nullish`](#nullish) where `Type` is a generic parameter.

- ### UnknownFunction

  A stricter alternative to the type `Function`. It accepts any number of unknown parameters, and returns an unknown value. Allowing you to reference an untyped function in a slightly safer manner. This does not provide any arity or type checks for the parameters.

- ### UnknownAsyncFunction

  Identical to [`UnknownFunction`](#unknownfunction) in all ways but 1, it returns `Promise<unknown>` instead.

- ### TypeCheck

  An alias for a function that meets the requirements of TypeScript [Type Guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards). They take the format `(value: unknown) => value is TYPE`. With the exception of specialist JSON checks all [Type Checks](#reference-type-checks) conform to this type.

- ### InterfacePattern

  An alias for a [`Dictionary`](#dictionary) of [`TypeAssert`](#typeassert) functions. When used in conjunction with [`isStruct`](#isstruct) or [`asStruct`](#asstruct) they can  validate an `object` against the equivalent interface to the pattern.

- ### StrictRequired

  A variant of the inbuilt `Required<T>`, which is the opposite of `Optional<T>` in that it subtracts the type `undefined` from each member of the type `T`. StrictRequired varies in that it also subtracts the type `null` from each member. Ensuring that all members meet the constraint `NonNullable`.

- ### StrictPartial

  A variant of the `Partial<T>` inbuilt, and closely related to `FuzzyPartial`. `Partial` makes no guarantees about the members of the type `T`, as such they can be unions of `null`. This can introduce inconsistency for users of the type; expecting that members can be specified using either `null` or `undefined`, where only some can also use `null`. `StrictPartial` resolves this by specifying that no members of the type `T` can be `null`, ensuring a consistent interface.

- ### FuzzyPartial

  A variant of the `Partial<T>` inbuilt, and closely related to `StrictPartial`. `Partial` makes no guarantees about the members of the type `T`, as such they can be unions of `null`. This can introduce inconsistency for users of the type; expecting that members can be specified using either `null` or `undefined`, where only some can also use `null`. `FuzzyPartial` resolves this by specifying that all members of the type `T` can *ALSO* be `null`, ensuring a consistent interface.

- ### TypeAssertion

  A custom error with the name `TypeAssertion`. This type is exported as a value so that Errors of this type can be isolated from other errors using instance checks. It is possible to use the constructor to create and throw your own Errors if you wish, **but this may change in future**.

## Changelog

### 1.0.0

- Initial release

### 1.1.0

- Documentation update.
- Fix: asDefined was returning `unknown`.
- Breaking change: rename ObjectDict to Dictionary.
- Add: Nullish type ( `null | undefined` ).
- Change: Dictionary no longer contains `T | undefined` union.
- Change: Optional type now also includes `null` in the type union.

### 1.1.1

- Change: return type of `asOpt{TYPE}` is now `TYPE | undefined` instead of `Optional<TYPE>` ( removes null from union )
- Documentation corrections.

### 1.2.0

- Add: Introduce `isStruct` and `asStruct` that allow the inspection of a object to see if it meets a specific interface.
- Add: Optional variants of [Type Checks](#reference-type-checks) with form `isOpt{TYPE}`.
- Breaking Change: `asDefined` can longer accept `null` as a fallback parameter.
- Change: `asIndexable` now accepts arrays.
- Add: `isIndexable` [type check](#reference-type-checks).
- Change: Expose the `TypeAssert` type publicly.
- Add: `InterfacePattern` type.
- Change: modify the type names in errors to be closer to the TypeScript names.

### 2.0.0

- Add: `isUnion` and `isOptUnion` to allow checking if a value matches any type of a type union.
- Add: `asUnion` and `asOptUnion` to allow casting a value to a type union.
- Add: `isArrayOf` and `isOptArrayOf` to allow checking if a value is an array of a given type.
- Add: `isDictionaryOf` and `isOptDictionaryOf` to allow checking if a value is a Dictionary of a given type.
- Breaking Change: Recursive [Type Casts](#reference-type-casts) now take a [Type Check](#reference-type-checks) as an argument instead of a [Type Cast](#reference-type-casts), and no longer emit a copy of the input. As a side effect if you are upgrading from `asArrayRecursive(asOptString)` to `asArraryOf(isOptString)` or (similar) the output array may contain `null` as the elements are no longer transformed by an inner cast ( optional cast methods normalize output to `undefined` ).
- Add: `isInstance` and `isOptInstance` to allow checking if a value is an instance of a given class.
- Add: `asInstance` and `asOptInstance` to allow casting a value to an instance of a given class.
- Breaking Change: `asRecord`, `asOptRecord`, `asRecordRecursive` and `asOptRecordRecursive` have been renamed to `asDictionary`, `asOptDictionary`, `asDictionaryOf` and `asOptDictionaryOf` respectively.
- Breaking Change: `asArrayRecursive` and `asOptArrayRecursive` have been renamed to `asArrayOf` and `asOptArrayOf` respectively.
- Breaking Change: rename `TypeAssert` to `TypeCheck`.

### 2.1.0

- Add: `makeStrictPartial` for converting `Partial<T>` to `StrictPartial`.
- Add: types `StrictPartial` and `FuzzyPartial`, variants of the inbuilt `Partial` type.
- Add: type `StrictRequired`, variant of `Required`.

### 2.1.1

- Fix: incorrect constraint on `makeStrictPartial` prevented passing in non-indexable instances.

### 2.2.0

- Add: `assertDefined` throws if the passed value is `Nullish`.
- Add: `TypeAssertion` error class thrown by TypeAsserts.

### 2.2.1

- Fix: update sub-dependency to resolve [npm advisory 1654](https://www.npmjs.com/advisories/1654)

### 2.2.2

- Fix: `asInstance`, `asOptInstance`, `isInstance` and `isOptInstance` were not exported from the package.

### 2.3.0

- Change: build target to ES2018 instead of ES3.

### 2.4.0

- Add: `invariant` function to assist type assertion
- Add: JSON assertion functions
- Add: Basic type assertion functions
- Add: Literal type casts and checks
- Add: Primitive type, casts and checks

### Next

- Documentation: Correct some typos in the `isStruct`/`asStruct` examples
