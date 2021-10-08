import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import CharactersForm from "../CharactersForm";

afterEach(cleanup);

describe('Characters Form', () => {
  it('it should form', () => {
    const { container } = render(<CharactersForm />);

    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('it should input', () => {
    const { container } = render(<CharactersForm />);

    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('it should button text', () => {
    const { container } = render(<CharactersForm />);
    const button = container.querySelector('button');

    expect(button).toHaveTextContent('Search')
  });

  it('it should input have change', () => {
    const setup = () => {
      const utils = render(<CharactersForm />);
      const input = utils.getByLabelText('search-input')
      return {
        input,
        ...utils,
      }
    }
    const {input} = setup();
    fireEvent.change(input, {target: {value: 'Find your Hero'}})
    expect((input as HTMLInputElement).value).toBe('Find your Hero')
  })
})




