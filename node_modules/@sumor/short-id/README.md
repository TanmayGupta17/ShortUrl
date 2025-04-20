# short-id

A [Sumor Cloud](https://sumor.cloud) Tool.  
[More Documentation](https://sumor.cloud/short-id)

This is a short-id library for Node.js and the browser.
You can easily use it to generate a short id from number.

[![CI](https://github.com/sumor-cloud/short-id/actions/workflows/ci.yml/badge.svg)](https://github.com/sumor-cloud/short-id/actions/workflows/ci.yml)
[![Test](https://github.com/sumor-cloud/short-id/actions/workflows/ut.yml/badge.svg)](https://github.com/sumor-cloud/short-id/actions/workflows/ut.yml)
[![Coverage](https://github.com/sumor-cloud/short-id/actions/workflows/coverage.yml/badge.svg)](https://github.com/sumor-cloud/short-id/actions/workflows/coverage.yml)
[![Audit](https://github.com/sumor-cloud/short-id/actions/workflows/audit.yml/badge.svg)](https://github.com/sumor-cloud/short-id/actions/workflows/audit.yml)

## Installation

```bash
npm i @sumor/short-id --save
```

## Prerequisites

### Node.JS version

Require Node.JS version 18.x or above

### require Node.JS ES module

As this package is written in ES module,
please change the following code in your `package.json` file:

```json
{
  "type": "module"
}
```

## Usage

#### Standard Usage

```js
import { encode, decode } from '@sumor/short-id'

// by default using rule 0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ
const shortId1 = encode(10)
console.log(shortId1) // 'a'
const shortId2 = encode(72)
console.log(shortId2) // '1a'

const number1 = decode('a')
console.log(number1) // 10
const number2 = decode('1a')
console.log(number2) // 72
```

#### Custom Usage

```js
import { encode, decode } from '@sumor/short-id'

const rule = '0123456789abcdefghigklmnopqrstuvwxyz'
const shortId1 = encode(10, rule)
console.log(shortId1) // 'a'
const shortId2 = encode(46, rule)
console.log(shortId2) // '1a'

const number1 = decode('a', rule)
console.log(number1) // 10
const number2 = decode('1a', rule)
console.log(number2) // 46
```
