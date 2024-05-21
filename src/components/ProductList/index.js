// src/components/ProductList.js
import React from 'react';
import { useSelector } from 'react-redux';

import {
  ItemsWrapper,
  ProductWrapper,
  OrderInfo,
  ProductTitle,
  ProductImage,
  ProductInfo,
  ProductDetail
} from './ProductList.Style';

const ProductList = () => {
  const products = useSelector(state => state.products);

  return (
    <OrderInfo>
      <h2>Products in the cart</h2>
      <ItemsWrapper>
        {products.map(product => (
          <ProductWrapper key={product.id}>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductInfo>
              <ProductImage src={product.image} alt={product.name} />
              <ProductDetail>
                <span>${product.price}</span>
                <span>items: <b>{product.quantity}</b></span>
              </ProductDetail>
            </ProductInfo>
          </ProductWrapper>
        ))}
      </ItemsWrapper>
    </OrderInfo>
  );
};

export default ProductList;
