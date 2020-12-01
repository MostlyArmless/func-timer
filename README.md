# func-timer

Measure the execution time of a Node.js function. Supports both `async` functions and functions which take arguments.

## Installation

```bash
npm install func-timer
```

## Usage

```typescript
import { ExecutionTimerResult, measureExecutionTime } from 'func-timer';

async function doStuff(arg1: number, arg2: string): number[]
{
    // code you want to measure
    return [1,2,3];
}

async function main()
{
    // Runs your func 10 times with the same inputs, averages the runtimes.
    const numIterations = 10;
    // This function logs information to console, but you can also access the results directly if you're using them in a mocha test for example.
    const result: ExecutionTimerResult = await measureExecutionTime(doStuff, [42, 'dummyArg2'], numIterations);
}

main();
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
