import { screen, render } from '@testing-library/react';
import Home from './Home';

import { GoogleProvider } from '../context/GoogleContext';
import { BrowserRouter } from 'react-router-dom';

test('renders about nav link', () => {
  render(
    <BrowserRouter>
      <GoogleProvider>
        <Home />
      </GoogleProvider>
    </BrowserRouter>);
  const aboutNavLink = screen.getByText(/about/i);
  expect(aboutNavLink).toBeInTheDocument();
});

test('renders about nav link', () => {
  render(
    <BrowserRouter>
      <GoogleProvider>
        <Home />
      </GoogleProvider>
    </BrowserRouter>);
  const contactNavLink = screen.getByText(/contact/i);
  expect(contactNavLink).toBeInTheDocument();
});
