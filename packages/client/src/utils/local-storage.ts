export const setItem = (key: {[key: string]: any} | string, value?: string) => {
    if (!key) {
        return;
    }

    if (typeof key === 'object') {
        Object.keys(key).forEach(item => {
            window.localStorage.setItem(item, key[item]);
        });

        return;
    }

    window.localStorage.setItem(key, value || '');
};

export const getItem = (key: string[] | string) => {
    if (Array.isArray(key)) {
        return key.map(item => window.localStorage.getItem(item));
    }

    return window.localStorage.getItem(key);
};
