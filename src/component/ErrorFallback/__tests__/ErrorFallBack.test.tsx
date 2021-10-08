import React from "react";
import rendered from "react-test-renderer";
import { render, cleanup } from "@testing-library/react";

import ErrorFallback from "../ErrorFallback";

describe('Error Components', () => {
  it('it Error Components render', () => {
    const errorComponent = rendered.create(<ErrorFallback error="message" />);
    const tree = errorComponent.toJSON();

    expect(tree).toMatchSnapshot();
  })
})