export const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    // stores the retrieved header value in sessionStorage at the key of X-CSRF-Token
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

// will call and await the custom csrfFetch with '/api/session/ 
export const restoreCSRF = async () => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    return response;
}

const csrfFetch = async (url, options={}) => {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== 'GET') {
        // options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        // assume that a token has been stored in sessionStorage
        if (!options.headers["Content-Type"] && !(options.body instanceof FormData)) {
            options.headers["Content-Type"] = "application/json";
          }
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }

    const res = await fetch(url, options);
    if (res.status >= 400) throw res;
    return res;
};

export default csrfFetch;