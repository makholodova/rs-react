import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination/Pagination';

describe('Pagination component', () => {
  it('renders current page number', () => {
    render(<Pagination currentPage={3} onPageChange={() => {}} />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('disables "previous" button on first page', () => {
    render(<Pagination currentPage={1} onPageChange={() => {}} />);

    const prevButton = screen.getByRole('button', { name: '<' });
    expect(prevButton).toBeDisabled();
  });

  it('disables "next" button when isNextDisabled is true', () => {
    render(
      <Pagination
        currentPage={2}
        isNextDisabled={true}
        onPageChange={() => {}}
      />
    );

    const nextButton = screen.getByRole('button', { name: '>' });
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with next page when next is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} onPageChange={onPageChange} />);

    const nextButton = screen.getByRole('button', { name: '>' });
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with previous page when previous is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} onPageChange={onPageChange} />);

    const prevButton = screen.getByRole('button', { name: '<' });
    fireEvent.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
