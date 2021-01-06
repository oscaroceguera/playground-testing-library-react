import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import TestEvents from './testEvents'

afterEach(cleanup)

it('increments counter', () => {
  const { getByTestId } = render(<TestEvents />)

  fireEvent.click(getByTestId('button-up'))

  expect(getByTestId('counter')).toHaveTextContent('1')
})
it('decrement counter', () => {
  const { getByTestId } = render(<TestEvents />)

  fireEvent.click(getByTestId('button-down'))

  expect(getByTestId('counter')).toHaveTextContent('-1')
})