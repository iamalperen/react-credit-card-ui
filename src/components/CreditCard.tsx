/**
 * CreditCard component provides a visual representation of a credit card with customizable
 * content, appearance, and interactive features.
 *
 * The component displays both front and back sides of a card and supports flipping animation.
 * It automatically identifies card type from the number or accepts a manual override.
 *
 * @example
 * // Basic usage
 * <CreditCard
 *   cardNumber="4111 1111 1111 1111"
 *   cardHolder="JOHN DOE"
 *   expiryDate="12/25"
 *   cvv="123"
 * />
 *
 * // With customizations
 * <CreditCard
 *   cardNumber="5555 5555 5555 4444"
 *   cardHolder="JANE SMITH"
 *   expiryDate="10/26"
 *   cvv="321"
 *   issuer="mastercard"
 *   width="350px"
 *   maxWidth="500px"
 *   cardHolderLabel="NAME"
 *   expiresLabel="VALID THRU"
 *   flipOnClick={false}
 * />
 */
import React, { useMemo, useState, MouseEventHandler, useRef, CSSProperties } from 'react';
import { getCardType, getCardLogo, formatCardNumber, formatExpiryDate } from '../utils';
import { CardType } from '../core/types';
import styles from './CreditCard.module.css';
import {
  DEFAULT_CARD_NUMBER,
  DEFAULT_CARD_HOLDER,
  DEFAULT_EXPIRY_DATE,
  DEFAULT_CVV,
  DEFAULT_FLIP_ON_CLICK,
  DEFAULT_WRAPPER_ARIA_LABEL,
  DEFAULT_INTERACTIVE_ARIA_LABEL_FRONT,
  DEFAULT_INTERACTIVE_ARIA_LABEL_BACK,
  DEFAULT_INTERACTIVE_ARIA_LABEL_STATIC,
  DEFAULT_CARD_FRONT_ARIA_LABEL,
  DEFAULT_CARD_BACK_ARIA_LABEL,
  DEFAULT_LABEL_CARD_HOLDER,
  DEFAULT_LABEL_EXPIRES,
  DEFAULT_LABEL_CVV,
} from '../core/constants';

// Type for CSS variables
type CSSVariableStyle = CSSProperties & { [key: `--${string}`]: string | number };

/**
 * Props for the CreditCard component
 */
export interface CreditCardProps {
  /** Card number to display (formatted automatically) */
  cardNumber: string;
  /** Name of the card holder */
  cardHolder: string;
  /** Expiry date in MM/YY format */
  expiryDate: string;
  /** Card verification value (3-4 digits) */
  cvv: string;
  /** Override the auto-detected card type */
  issuer?: CardType;
  /** Enable flipping the card on click */
  flipOnClick?: boolean;
  /** Width of the card (e.g., "350px", "100%") */
  width?: string;
  /** Maximum width of the card (e.g., "500px") */
  maxWidth?: string;
  /** ARIA label for the interactive card element */
  ariaLabel?: string;
  /** ARIA label for the wrapper element */
  wrapperAriaLabel?: string;
  /** ARIA label for the front of the card */
  cardFrontAriaLabel?: string;
  /** ARIA label for the back of the card */
  cardBackAriaLabel?: string;
  /** Label for the card holder field */
  cardHolderLabel?: string;
  /** Label for the expiry date field */
  expiresLabel?: string;
  /** Label for the CVV field */
  cvvLabel?: string;
  /** Text direction of the card content */
  direction?: 'ltr' | 'rtl';
  /** Additional CSS classes to apply to the wrapper */
  className?: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  cardNumber = DEFAULT_CARD_NUMBER,
  cardHolder = DEFAULT_CARD_HOLDER,
  expiryDate = DEFAULT_EXPIRY_DATE,
  cvv = DEFAULT_CVV,
  issuer,
  flipOnClick = DEFAULT_FLIP_ON_CLICK,
  width,
  maxWidth,
  ariaLabel,
  wrapperAriaLabel,
  cardFrontAriaLabel,
  cardBackAriaLabel,
  cardHolderLabel = DEFAULT_LABEL_CARD_HOLDER,
  expiresLabel = DEFAULT_LABEL_EXPIRES,
  cvvLabel = DEFAULT_LABEL_CVV,
  direction = 'ltr',
  className = '', // Initialize className
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const cardType: CardType = useMemo(() => issuer || getCardType(cardNumber), [cardNumber, issuer]);
  const logo = useMemo(() => getCardLogo(cardType), [cardType]);

  const handleFlip: MouseEventHandler<HTMLDivElement> = () => {
    if (flipOnClick) {
      setIsFlipped(!isFlipped);
    }
  };

  // Calculate dynamic wrapper styles
  const wrapperStyle = useMemo(() => {
    const style: CSSVariableStyle = {}; // Use the CSSVariableStyle type
    if (width) {
      style.width = width;
    }
    if (maxWidth) {
      // Set the CSS variable for max-width used in CreditCard.module.css
      style['--card-max-width'] = maxWidth;
    }
    return style;
  }, [width, maxWidth]);

  // Combine CSS module classes with external className
  const wrapperClasses =
    `${styles.wrapper} ${direction === 'rtl' ? styles.rtl : ''} ${className}`.trim();

  const cardContainerClasses = `${styles.cardContainer} ${isFlipped ? styles.flipped : ''}`;
  const cardFrontClasses = `${styles.cardFace} ${styles.cardFront} ${styles[cardType] || ''}`;
  const cardBackClasses = `${styles.cardFace} ${styles.cardBack}`;

  // ARIA labels setup remains the same
  const finalWrapperAriaLabel = wrapperAriaLabel ?? DEFAULT_WRAPPER_ARIA_LABEL;
  const finalInteractiveAriaLabel =
    ariaLabel ??
    (flipOnClick
      ? isFlipped
        ? DEFAULT_INTERACTIVE_ARIA_LABEL_BACK
        : DEFAULT_INTERACTIVE_ARIA_LABEL_FRONT
      : DEFAULT_INTERACTIVE_ARIA_LABEL_STATIC);
  const finalCardFrontAriaLabel = cardFrontAriaLabel ?? DEFAULT_CARD_FRONT_ARIA_LABEL;
  const finalCardBackAriaLabel = cardBackAriaLabel ?? DEFAULT_CARD_BACK_ARIA_LABEL;

  return (
    <div className={wrapperClasses} style={wrapperStyle} aria-label={finalWrapperAriaLabel}>
      <div className={styles.scene} ref={cardRef}>
        <div
          className={cardContainerClasses}
          onClick={flipOnClick ? handleFlip : undefined}
          role={flipOnClick ? 'button' : undefined}
          tabIndex={flipOnClick ? 0 : undefined}
          aria-pressed={isFlipped}
          aria-label={finalInteractiveAriaLabel}
        >
          {/* Card Front */}
          <div
            className={cardFrontClasses}
            aria-hidden={isFlipped}
            aria-label={finalCardFrontAriaLabel}
          >
            <div className={styles.topRow}>
              <div className={styles.cardChip}></div>
              <div className={styles.cardLogo}>{logo}</div>
            </div>
            <p className={styles.cardNumber}>{formatCardNumber(cardNumber)}</p>
            <div className={styles.cardInfo}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>{cardHolderLabel}</span>
                <div className={styles.infoValue}>{cardHolder}</div>
              </div>
              <div className={styles.expiryBlock}>
                <span className={styles.infoLabel}>{expiresLabel}</span>
                <div className={styles.infoValue}>{formatExpiryDate(expiryDate)}</div>
              </div>
            </div>
          </div>
          {/* Card Back */}
          <div
            className={cardBackClasses}
            aria-hidden={!isFlipped}
            aria-label={finalCardBackAriaLabel}
          >
            <div className={styles.magneticStripe}></div>
            <div className={styles.cvvSection}>
              <span className={styles.cvvLabel}>{cvvLabel}</span>
              <div className={styles.cvvBand}>{cvv}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
