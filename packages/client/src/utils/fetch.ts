let interceptors: Array<Array<(() => any) | undefined>> = [];

// @ts-ignore
const ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';

function fetch(originalFetch = ENVIRONMENT_IS_WORKER ? self.fetch : window.fetch) {
    return function fetchInterceptor(config: RequestInfo, init?: RequestInit) {
        let promise: Promise<any> = Promise.resolve(config);

        const promisesChain: Array<((...args: any) => any) | undefined> = [
            () => originalFetch(config, init),
            undefined,
        ];

        interceptors.forEach(([resolve, reject]) => {
            promisesChain.push(resolve, reject);
        });

        while (promisesChain.length) {
            const [resolve, reject] = promisesChain.splice(0, 2);
            promise = promise.then(resolve, reject);
        }

        return promise;
    };
}

function addResponseInterceptor<T, U>(resolve?: (arg?: any) => T, reject?: (arg?: any) => U) {
    // If I want to add a interceptor before calling the api use unshift instead of push
    interceptors.push([resolve, reject]);
}

function cleanInterceptors() {
    interceptors = [];
}

export {addResponseInterceptor, cleanInterceptors, fetch};

export default fetch();
