// class FetchInterceptor {
//     interceptors: Array<Array<(() => any) | undefined>> = [];

//     request(config: RequestInfo) {
//         let promise: Promise<any> = Promise.resolve(config);

//         const promisesChain: Array<((...args: any) => any) | undefined> = [window.fetch];

//         this.interceptors.forEach(([resolve, reject]) => {
//             promisesChain.unshift(resolve, reject);
//         });

//         while (promisesChain.length) {
//             const [resolve, reject] = promisesChain.splice(0, 2);
//             promise = promise.then(resolve, reject);
//         }

//         return promise;
//     }

//     addIntercepptor<T, U>(resolve?: () => T, reject?: () => U) {
//         this.interceptors.push([resolve, reject]);
//     }
// }

// const fetch = new FetchInterceptor();

let interceptors: Array<Array<(() => any) | undefined>> = [];

function fetchInterceptor(config: RequestInfo) {
    let promise: Promise<any> = Promise.resolve(config);

    const promisesChain: Array<((...args: any) => any) | undefined> = [window.fetch, undefined];

    interceptors.forEach(([resolve, reject]) => {
        promisesChain.push(resolve, reject);
    });

    while (promisesChain.length) {
        const [resolve, reject] = promisesChain.splice(0, 2);
        promise = promise.then(resolve, reject);
    }

    return promise;
}

function addResponseInterceptor<T, U>(resolve?: (arg?: any) => T, reject?: (arg?: any) => U) {
    // If I want to add a interceptor before calling the api use unshift instead of push
    interceptors.push([resolve, reject]);
}

function cleanInterceptors() {
    interceptors = [];
}

export {addResponseInterceptor, cleanInterceptors};
export default fetchInterceptor;
