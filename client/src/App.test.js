import { screen, toBeInTheDocument } from '@testing-library/jest-dom'
import { render, getByText } from '@testing-library/react';
import App from './App';

test('upload page', () => {
  const container = render(<App />);
  const linkElement = getByText(container, 'Select and upload a file to create a one-time download link');
  expect(linkElement).toBeInTheDocument();
});
