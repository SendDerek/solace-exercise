/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './page';

global.fetch = jest.fn();

const mockAdvocates = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    degree: 'MD',
    specialties: ['Cardiology'],
    yearsOfExperience: 5,
    phoneNumber: 1234567890
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'Boston',
    degree: 'RN',
    specialties: ['Oncology'],
    yearsOfExperience: 8,
    phoneNumber: 9876543210
  }
];

describe('Home Page', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ data: mockAdvocates })
    });
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('renders the page title', async () => {
    render(<Home />);
    expect(screen.getByText('Solace')).toBeInTheDocument();
    expect(screen.getByText('Advocates')).toBeInTheDocument();
  });

  it('fetches and displays advocates', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('filters advocates by search term', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search advocates by name, city, degree, or specialty...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Wait for debounce delay
    await waitFor(() => {
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    }, { timeout: 500 });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('resets search when reset button is clicked', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search advocates by name, city, degree, or specialty...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    const resetButton = screen.getByText('Clear');
    fireEvent.click(resetButton);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should debounce search input to avoid excessive filtering', async () => {
    jest.useFakeTimers();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search advocates by name, city, degree, or specialty...');

    // Type multiple characters quickly
    fireEvent.change(searchInput, { target: { value: 'J' } });
    fireEvent.change(searchInput, { target: { value: 'Jo' } });
    fireEvent.change(searchInput, { target: { value: 'Joh' } });
    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Should only filter once after debounce delay, not 4 times
    const filteringCalls = consoleSpy.mock.calls.filter(call =>
      call[0] === 'filtering advocates...'
    );

    expect(filteringCalls.length).toBeLessThanOrEqual(1);

    consoleSpy.mockRestore();
    jest.useRealTimers();
  });
});
