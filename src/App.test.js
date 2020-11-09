import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tile', () => {
  render(<App />);
  const linkElement = screen.getByText(/Under Development/i);
  expect(linkElement).toBeInTheDocument();
});
