import { screen, render } from '@testing-library/react';
import Home from './Home';

import { GoogleProvider } from '../context/GoogleContext';
import { BrowserRouter } from 'react-router-dom';

test('renders tutorial link', () => {
  render(
    <BrowserRouter>
      <GoogleProvider>
        <Home />
      </GoogleProvider>
    </BrowserRouter>);
  const tutorialLink = screen.getByText(/tutorial/i);
  expect(tutorialLink).toBeInTheDocument();
});
