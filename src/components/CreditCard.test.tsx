import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreditCard from './CreditCard';

jest.mock('../utils', () => ({
  getCardType: jest.fn((num) => (num.startsWith('4') ? 'visa' : 'unknown')),
  getCardLogo: jest.fn((type) => (type === 'visa' ? 'VisaLogo' : null)),
  formatCardNumber: jest.fn((num) => num.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()),
  formatExpiryDate: jest.fn((date) => date),
  getCardMaxLength: jest.fn(() => 19),
}));

describe('<CreditCard />', () => {
  const defaultProps = {
    cardNumber: '4111222233334444',
    cardHolder: 'Test User',
    expiryDate: '11/28',
    cvv: '987',
  };

  // Arrange: Basic Render Test
  it('renders default card details correctly', () => {
    // Act
    render(<CreditCard {...defaultProps} />);

    // Assert
    expect(screen.getByText('Test User')).toBeInTheDocument();
    // Check formatted number (mock implementation)
    expect(screen.getByText('4111 2222 3333 4444')).toBeInTheDocument();
    expect(screen.getByText('11/28')).toBeInTheDocument();
    // Check default labels
    expect(screen.getByText('Card Holder')).toBeInTheDocument();
    expect(screen.getByText('Expires')).toBeInTheDocument();
    // Check logo (mock implementation)
    expect(screen.getByText('VisaLogo')).toBeInTheDocument();
    
    // CVV section should be hidden initially, not absent from DOM
    const cardBack = screen.getByLabelText('Card back');
    expect(cardBack).toHaveAttribute('aria-hidden', 'true');
    
    // The CVV elements are in the DOM but hidden - we don't test for their absence
    // Instead we check that the card back is properly hidden
    const cvvElement = screen.getByText('987');
    expect(cvvElement.closest('[aria-hidden="true"]')).not.toBeNull();
  });

  // Arrange: Flip Interaction Test
  it('flips the card on click to show CVV', () => {
    // Act
    render(<CreditCard {...defaultProps} flipOnClick={true} />);
    const cardContainer = screen.getByRole('button', { name: /show card back/i });

    // Assert: Initial state (front)
    const cardFront = screen.getByLabelText('Card front');
    const cardBack = screen.getByLabelText('Card back');
    
    expect(cardFront).not.toHaveAttribute('aria-hidden', 'true');
    expect(cardBack).toHaveAttribute('aria-hidden', 'true');
    
    // Act: Click to flip
    fireEvent.click(cardContainer);

    // Assert: Flipped state (back)
    expect(cardFront).toHaveAttribute('aria-hidden', 'true');
    expect(cardBack).not.toHaveAttribute('aria-hidden', 'true');
    
    // CVV should be visible now (contained in an element that's not aria-hidden)
    const cvvElement = screen.getByText('987');
    expect(cvvElement.closest('[aria-hidden="true"]')).toBeNull();
    
    expect(screen.getByText('CVV')).toBeInTheDocument(); // Default CVV label
    // Check updated aria-label
    expect(screen.getByRole('button', { name: /show card front/i })).toBeInTheDocument();

    // Act: Click again to flip back
    fireEvent.click(cardContainer);

    // Assert: Back to initial state (front)
    expect(cardFront).not.toHaveAttribute('aria-hidden', 'true');
    expect(cardBack).toHaveAttribute('aria-hidden', 'true');
  });

  // Arrange: No Flip Test
  it('does not flip the card when flipOnClick is false', () => {
    // Act
    render(<CreditCard {...defaultProps} flipOnClick={false} />);
    // Card container is not a button when not flippable
    const cardContainer = screen.getByLabelText(/credit card visual/i);

    // Assert: Initial state (front)
    const cardFront = screen.getByLabelText('Card front');
    const cardBack = screen.getByLabelText('Card back');
    
    expect(cardFront).not.toHaveAttribute('aria-hidden', 'true');
    expect(cardBack).toHaveAttribute('aria-hidden', 'true');

    // Act: Click (should do nothing)
    fireEvent.click(cardContainer);

    // Assert: Still front state
    expect(cardFront).not.toHaveAttribute('aria-hidden', 'true');
    expect(cardBack).toHaveAttribute('aria-hidden', 'true');
    
    // The CVV is still in the DOM but remains hidden
    const cvvElement = screen.getByText('987');
    expect(cvvElement.closest('[aria-hidden="true"]')).not.toBeNull();
  });

  // Arrange: Custom Labels Test
  it('renders custom labels when provided', () => {
    // Act
    render(
      <CreditCard
        {...defaultProps}
        cardHolderLabel="Titular"
        expiresLabel="Vence"
        cvvLabel="Cod Seg"
      />
    );

    // Assert
    expect(screen.getByText('Titular')).toBeInTheDocument();
    expect(screen.getByText('Vence')).toBeInTheDocument();

    // Act: Flip to see CVV label
    const cardContainer = screen.getByRole('button', { name: /show card back/i });
    fireEvent.click(cardContainer);

    // Assert: CVV label on back
    expect(screen.getByText('Cod Seg')).toBeInTheDocument();
  });

  // Arrange: RTL Test
  it('applies RTL class when direction is rtl', () => {
    // Act
    const { container } = render(<CreditCard {...defaultProps} direction="rtl" />);

    // Assert: Find the wrapper with both the base class and rtl class
    // Note: Using container queries is not ideal but necessary to check for specific class combinations
    const wrapperElement = container.querySelector('div');
    expect(wrapperElement?.className).toContain('rtl');
  });

  // Arrange: className Prop Test
  it('applies external className to the wrapper', () => {
    const customClass = 'my-extra-styles';

    // Act
    const { container } = render(<CreditCard {...defaultProps} className={customClass} />);

    // Assert: Check if the wrapper has both the custom class and its original class
    const wrapperElement = container.querySelector('div');
    expect(wrapperElement?.className).toContain(customClass);
  });

  // Arrange: Width and MaxWidth Test
  it('applies width and maxWidth styles correctly', () => {
    // Act
    const { container } = render(<CreditCard {...defaultProps} width="300px" maxWidth="500px" />);

    // Assert: Check if styles are applied correctly
    const wrapperElement = container.querySelector('div');
    expect(wrapperElement).toHaveStyle('width: 300px');
    // CSS variables require getComputedStyle, which isn't reliable in JSDOM
    // We can check if the style attribute contains the variable declaration
    expect(wrapperElement?.getAttribute('style')).toContain('--card-max-width');
  });
});
