jest.mock('../fetch', () => ({
    fetch: jest.fn(),
    addResponseInterceptor: jest.fn(),
}));

jest.unmock('../fetch');

import {addResponseInterceptor, cleanInterceptors, fetch as fetchInterceptor} from '../fetch';

describe('Tets fetch interceptor', () => {
    let fetchMock: jest.Mock;

    beforeAll(() => {
        fetchMock = jest.fn();
        window.fetch = fetchInterceptor(fetchMock);
    });

    afterEach(() => {
        cleanInterceptors();
    });

    it('Fetch without any interceptor', async () => {
        const expectedResult = {test: 1};

        fetchMock.mockImplementation(() => Promise.resolve(expectedResult));

        const response = await fetch('http://test.com');

        expect(response).toMatchObject(expectedResult);
    });

    it('One interceptor resolve called', async () => {
        const expectedResultFetch = {test: 1};
        const expectedResultInterceptor = {test: 1};

        fetchMock.mockImplementation(() => Promise.resolve(expectedResultFetch));
        const interceptorSpy = jest.fn();

        addResponseInterceptor((responseFetch: any) => {
            expect(responseFetch).toMatchObject(expectedResultFetch);
            interceptorSpy();
            return expectedResultInterceptor;
        });

        const response = await fetch('http://test.com');

        expect(interceptorSpy).toHaveBeenCalled();
        expect(response).toMatchObject(expectedResultInterceptor);
    });

    it('One interceptor rejected called', async () => {
        const expectedResultFetch = new Error('Test error');
        const expectedResultInterceptor = {test: 1};

        fetchMock.mockImplementation(() => Promise.reject(expectedResultFetch));
        const interceptorSpy = jest.fn();

        addResponseInterceptor(undefined, (responseFetch: any) => {
            expect(responseFetch).toMatchObject(expectedResultFetch);
            interceptorSpy();
            return expectedResultInterceptor;
        });

        const response = await fetch('http://test.com');

        expect(interceptorSpy).toHaveBeenCalled();
        expect(response).toMatchObject(expectedResultInterceptor);
    });

    it('Two interceptors first rejected, second resolved', async () => {
        const expectedResultFetch = {test: 1};
        const expectedResultInterceptorResolved = {test: 2};
        const expectedResultInterceptorRejected = new Error('Test error');

        fetchMock.mockImplementation(() => Promise.resolve(expectedResultFetch));
        const interceptorSpyResolved = jest.fn();
        const interceptorSpyRejected = jest.fn();

        addResponseInterceptor((responseFetch: any) => {
            expect(responseFetch).toMatchObject(expectedResultFetch);
            interceptorSpyRejected();
            return Promise.reject(expectedResultInterceptorRejected);
        });

        addResponseInterceptor(undefined, (responseFetch: any) => {
            expect(responseFetch).toMatchObject(expectedResultInterceptorRejected);
            interceptorSpyResolved();
            return Promise.resolve(expectedResultInterceptorResolved);
        });

        const response = await fetch('http://test.com');
        expect(interceptorSpyResolved).toHaveBeenCalled();
        expect(interceptorSpyRejected).toHaveBeenCalled();
        expect(response).toMatchObject(expectedResultInterceptorResolved);
    });

    it('Two interceptors first resolved, second rejected', async () => {
        const expectedResultFetch = {test: 1};
        const expectedResultInterceptorResolved = {test: 2};
        const expectedResultInterceptorRejected = new Error('Test error');

        fetchMock.mockImplementation(() => Promise.resolve(expectedResultFetch));
        const interceptorSpyResolved = jest.fn();
        const interceptorSpyRejected = jest.fn();

        addResponseInterceptor((responseFetch: any) => {
            expect(responseFetch).toMatchObject(expectedResultFetch);
            interceptorSpyRejected();
            return Promise.resolve(expectedResultInterceptorResolved);
        }, undefined);

        addResponseInterceptor((responseFetch: any) => {
            expect(responseFetch).toMatchObject(expectedResultInterceptorResolved);
            interceptorSpyResolved();
            return Promise.reject(expectedResultInterceptorRejected);
        });

        try {
            await fetch('http://test.com');
        } catch (error) {
            expect(interceptorSpyResolved).toHaveBeenCalled();
            expect(interceptorSpyRejected).toHaveBeenCalled();
            expect(error).toMatchObject(expectedResultInterceptorRejected);
        }
    });

    it('Two interceptors first undefined, second rejected', async () => {
        const expectedResultFetch = {test: 1};
        const expectedResultInterceptorRejected = new Error('Test error');

        fetchMock.mockImplementation(() => Promise.resolve(expectedResultFetch));
        const interceptorSpyResolved = jest.fn();

        addResponseInterceptor(undefined, undefined);

        addResponseInterceptor((responseFetch: any) => {
            expect(responseFetch).toMatchObject(expectedResultFetch);
            interceptorSpyResolved();
            return Promise.reject(expectedResultInterceptorRejected);
        });

        try {
            await fetch('http://test.com');
        } catch (error) {
            expect(interceptorSpyResolved).toHaveBeenCalled();
            expect(error).toMatchObject(expectedResultInterceptorRejected);
        }
    });
});

export default undefined;
