import { fetchJson, postJson, putJson } from "./fetch";

const body = { name: "Bob Robertson", email: "bob@gmail.com" };
const defaultOptions = { mode: "same-origin", credentials: "omit" };

describe("fetchJson()", () => {
  const url = "/api/users/0";
  const successResponse = { ok: true, status: 200, json: () => Promise.resolve(body) };
  const errorResponse = { ok: false, status: 500, statusText: "Internal server error" };

  function mockFetchSuccess() {
    return jest
      .spyOn(window, "fetch")
      .mockImplementation(() => Promise.resolve(successResponse))
      .mockName("fetch");
  }

  function mockFetchError() {
    return jest
      .spyOn(window, "fetch")
      .mockImplementation(() => Promise.resolve(errorResponse))
      .mockName("fetch");
  }

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("calls fetch with the specified url and options", () => {
    const options = { mode: "no-cors" };
    const spy = mockFetchSuccess();
    const promise = fetchJson(url, options);
    expect(spy).toHaveBeenCalledWith(url, options);
    return promise;
  });

  test("uses the default fetch options if none are specified", () => {
    const spy = mockFetchSuccess();
    const promise = fetchJson(url);
    expect(spy).toHaveBeenCalledWith(url, defaultOptions);
    return promise;
  });

  test("resolves to the JSON-parsed response body of a success response", () => {
    mockFetchSuccess();
    return expect(fetchJson(url)).resolves.toBe(body);
  });

  test("rejects with an error including the status text for an error response", () => {
    mockFetchError();
    return expect(fetchJson(url)).rejects.toThrow("Internal server error");
  });

  test("includes the status code and the full response in the error", () => {
    mockFetchError();
    return fetchJson(url).catch(err => {
      expect(err).toHaveProperty("status", 500);
      expect(err).toHaveProperty("response", errorResponse);
    });
  });

  test("rejects with the fetch error if the request fails altogether", () => {
    const error = new Error("Oops!");
    jest
      .spyOn(window, "fetch")
      .mockImplementation(() => Promise.reject(error))
      .mockName("fetch");
    return expect(fetchJson(url)).rejects.toThrow(error);
  });
});

describe("postJson()", () => {
  test("returns an options object with the expected method and headers properties", () => {
    const options = postJson(body);
    expect(options).toHaveProperty("method", "POST");
    expect(options).toHaveProperty("headers", { "Content-Type": "application/json" });
  });

  test("converts the specified body object to JSON and includes it in the options", () => {
    const bodyJson = '{"name":"Bob Robertson","email":"bob@gmail.com"}';
    expect(postJson(body)).toHaveProperty("body", bodyJson);
  });

  test("includes the default options if they are not overridden", () => {
    expect(postJson(body)).toMatchObject(defaultOptions);
  });

  test("overrides and adds options as specified", () => {
    const options = postJson(body, { mode: "no-cors", cache: "reload" });
    expect(options).toHaveProperty("mode", "no-cors");
    expect(options).toHaveProperty("cache", "reload");
  });
});

describe("putJson()", () => {
  test("returns an options object with the expected method and headers properties", () => {
    const options = putJson(body);
    expect(options).toHaveProperty("method", "PUT");
    expect(options).toHaveProperty("headers", { "Content-Type": "application/json" });
  });

  test("converts the specified body object to JSON and includes it in the options", () => {
    const bodyJson = '{"name":"Bob Robertson","email":"bob@gmail.com"}';
    expect(putJson(body)).toHaveProperty("body", bodyJson);
  });

  test("includes the default options if they are not overridden", () => {
    expect(putJson(body)).toMatchObject(defaultOptions);
  });

  test("overrides and adds options as specified", () => {
    const options = putJson(body, { mode: "no-cors", cache: "reload" });
    expect(options).toHaveProperty("mode", "no-cors");
    expect(options).toHaveProperty("cache", "reload");
  });
});
