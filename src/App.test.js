import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders welcome message', async () => {
  render(<App />);
  // Wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });

  const linkElements = screen.getAllByText(/SkillSwap/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
