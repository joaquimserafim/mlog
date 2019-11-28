# mlog

> a minimal logging lib for NodeJS

## instalation

```
npm i -S joaquimserafim/mlog
```

## interface

mlog exposes 2 very simple methods:

- info(msg: string | object)
- error(msg: string | object)

## usage

```js
import mlog from 'mlog';

const logger = mlog('my-app')

....


logger.info('hello there!')

// output a string

{"pid": 88064, "type": "info", "timestamp": 1574819112182, "msg": "hello there!", "origin": "my-app"}

// or you can pass an object instead

logger.info({headers: [{'content-type': 'application/javascript'}], body: {hello: 'world'}})

// output a string
{
  "pid": 35573,
  "type": "info",
  "timestamp": 1574964980420,
  "msg": {
    "headers": [
      {
        "content-type": "application/javascript"
      }
    ],
    "body": {
      "hello": "world"
    }
  },
  "origin": "testing"
}


```
