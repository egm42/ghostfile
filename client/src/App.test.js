import { render, screen } from '@testing-library/react';
import App from './App';

test('upload page', () => {
  render(<App />);
  expect(screen.getByText('Select and upload a file to create a one-time download link. File uploads are limited to 2GB.')).toBeInTheDocument();
});
