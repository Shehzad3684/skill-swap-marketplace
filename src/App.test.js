import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders welcome message', async () => {
  render(<App />);
  // Wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });

  const linkElement = screen.getByText(/Skill Swap/i);
  expect(linkElement).toBeInTheDocument();
});
