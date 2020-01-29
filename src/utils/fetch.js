// Utilities that wrap fetch to simplify its use with JSON-based APIs.

// fetchJson() enhances fetch() as follows:
// 1. It retrieves the body of a success response, parses it, and resolves to the resulting object.
// 2. It rejects on receiving an error response, with an error that captures key reponse details.
// 3. It applies default options if none are specified.
//
// postJson() and putJson() simplify the creation of options for POST and PUT requests.
//
// Example use:
// fetchJson("/api/users/0")
// fetchJson("/api/users/0", putJson({ name: "Bob Robertson", email: "bob@gmail.com" }))
// fetchJson("/api/users", postJson({ name: "Bob Robertson", email: "bob@gmail.com" }))

const defaultOptions = {
  mode: "same-origin", // change to "cors" if API is at a different origin
  credentials: "omit" // change to "include" if API is protected using cookies
};

const headers = { "Content-Type": "application/json" };

export function fetchJson(url, options = defaultOptions) {
  return fetch(url, options).then(response => {
    if (!response.ok) {
      const err = new Error(response.statusText);
      err.response = response;
      err.status = response.status;
      throw err;
    }
    return response.json();
  });
}

export function postJson(body = {}, options = {}) {
  return {
    ...defaultOptions,
    method: "POST",
    body: JSON.stringify(body),
    headers,
    ...options
  };
}

export function putJson(body = {}, options = {}) {
  return {
    ...defaultOptions,
    method: "PUT",
    body: JSON.stringify(body),
    headers,
    ...options
  };
}
