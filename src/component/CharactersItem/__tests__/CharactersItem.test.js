import React from "react";
import { render, cleanup } from "@testing-library/react";

import CharactersItem from "../CharactersItem";

afterEach(cleanup);

describe("CharactersItem", () => {
  it("it should render name props", () => {
    const { container } = render(<CharactersItem name="bob" />);
    const h3 = container.querySelector("h3");

    expect(h3).toHaveTextContent("bob");
  });

  it("it should render species props", () => {
    const { container } = render(<CharactersItem species="human" />);
    const p = container.querySelector("p");

    expect(p).toHaveTextContent("human");
  });

  it("it should render species props", () => {
    const { container } = render(<CharactersItem species="human" />);
    const p = container.querySelector("p");

    expect(p).toHaveTextContent("human");
  });

  it("it should render image props", () => {
    const { container } = render(<CharactersItem image="https//" />);
    const image = container.querySelector("img");

    expect(image).toHaveAttribute("src");
  });

  it("it should render id props", () => {
    const { container } = render(<CharactersItem id="2" />);
    const aLink = container.querySelector("a");

    expect(aLink).toHaveAttribute("href");
  });
});
