import React, { useState } from 'react';
import styled from 'styled-components';

const ProductImageLazy = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);
    const ProductImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
`;

    return (
        <ProductImageWrapper>
            {!loaded && <div className="image-placeholder" data-testid="image-placeholder" style={{ background: '#f0f0f0', width: '60px', height: '60px' }} />}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                style={{ display: loaded ? 'block' : 'none', width: '60px', height: '60px' }}
            />
        </ProductImageWrapper>
    );
};

export default ProductImageLazy;