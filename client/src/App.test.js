import { render, screen } from '@testing-library/react';
import App from './App';

test('upload page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Select and upload a file to create a one-time download link/i);
  expect(linkElement).toBeInTheDocument();
});
