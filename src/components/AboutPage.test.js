import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import AboutPage from "./AboutPage.js";

test("renders text mentioning the Garage", () => {
  const { container } = render(
    <BrowserRouter>
      <AboutPage />
    </BrowserRouter>
  );
  expect(container).toHaveTextContent("IBM Cloud Garage");
});
