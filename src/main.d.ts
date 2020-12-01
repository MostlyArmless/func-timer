export interface ExecutionTimerResult
{
    runtimeSeconds: number;
    functionOutput: any;
}

declare function measureExecutionTime( func: Function, args?: any[], numIterations?: number ): Promise<ExecutionTimerResult>