import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductImageLazy from '../components/ProductImageLazy'; // Ajusta la ruta según tu estructura de proyecto

describe('ProductImageLazy', () => {
  const src = 'test-image.jpg';
  const alt = 'Test Image';

  test('renders the placeholder before the image is loaded', () => {
    render(<ProductImageLazy src={src} alt={alt} />);

    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();
    expect(screen.queryByAltText(alt)).not.toBeVisible();
  });

  test('renders the image after it has loaded', () => {
    render(<ProductImageLazy src={src} alt={alt} />);

    // Fire the load event on the image
    fireEvent.load(screen.getByAltText(alt));

    // Verify the placeholder is removed and the image is visible
    expect(screen.queryByTestId('image-placeholder')).not.toBeInTheDocument();
    expect(screen.getByAltText(alt)).toBeVisible();
  });

  test('image has correct src and alt attributes', () => {
    render(<ProductImageLazy src={src} alt={alt} />);

    const img = screen.getByAltText(alt);
    expect(img).toHaveAttribute('src', src);
    expect(img).toHaveAttribute('alt', alt);
  });
});
