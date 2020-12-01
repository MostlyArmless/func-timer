export async function measureExecutionTime( func: Function, args?: any[], numIterations?: number )
{
    let functionRetVal;
    const isAsync = func.constructor.name === 'AsyncFunction';

    if ( numIterations == undefined || numIterations === 1 )
    {
        let duration;
        if ( args == undefined )
        {
            const t1 = process.hrtime();
            functionRetVal = isAsync ? await func() : func();
            duration = process.hrtime( t1 );
        }
        else
        {
            const t1 = process.hrtime();
            functionRetVal = isAsync ? await func( ...args ) : func( ...args );
            duration = process.hrtime( t1 );
        }

        console.log( `runtime of ${func.name} = ${duration[0]}.${duration[1]} s` );

        return {
            runtimeSeconds: parseFloat( `${duration[0]}.${duration[1]}` ),
            functionOutput: functionRetVal
        };
    }
    else
    {
        let durations = [];
        for ( let i = 0; i < numIterations; i++ )
        {
            let duration;
            if ( args == undefined )
            {
                const t1 = process.hrtime();
                functionRetVal = isAsync ? await func() : func();
                duration = process.hrtime( t1 );
            }
            else
            {
                const t1 = process.hrtime();
                functionRetVal = isAsync ? await func( ...args ) : func( ...args );
                duration = process.hrtime( t1 );
            }
            durations[i] = parseFloat( `${duration[0]}.${duration[1]}` );
        }

        const totalDuration = durations.reduce( ( prev, curr, i ) =>
        {
            return prev + curr;
        } );

        const avgDuration = totalDuration / numIterations;

        console.log( `average runtime after ${numIterations} iterations = ${avgDuration} s` );

        return {
            runtimeSeconds: avgDuration,
            functionOutput: functionRetVal
        };
    }
}