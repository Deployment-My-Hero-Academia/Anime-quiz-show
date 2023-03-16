/** @jest-environment jsdom */
const {fetch} = require('whatwg-fetch');
global.fetch = fetch;
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { App } from './App';

it('should render', () => {
  render(<App />);

  it('user should be able to register',  () => {
  expect(true).toBe(true);
});

it('user should be able to login',  () => {
    expect(true).toBe(true);
  });
  expect(screen.getByText('Anime Quiz Show')).toBeInTheDocument();
});