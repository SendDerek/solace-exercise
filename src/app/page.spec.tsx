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
    expect(screen.getByText('Solace Advocates')).toBeInTheDocument();
  });

  it('fetches and displays advocates', async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('Smith')).toBeInTheDocument();
    });
  });

  it('filters advocates by search term', async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.queryByText('Smith')).not.toBeInTheDocument();
  });

  it('resets search when reset button is clicked', async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    const resetButton = screen.getByText('Reset Search');
    fireEvent.click(resetButton);

    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
  });
});