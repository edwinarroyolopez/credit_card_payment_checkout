import React from 'react';
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';
import ProductImageLazy from '../ProductImageLazy'
import {
  ItemsWrapper,
  ProductWrapper,
  OrderInfo,
  Title,
  ProductTitle,
  ProductInfo,
  ProductDetail
} from './ProductList.Style';

const ProductList = () => {
  const products = useSelector(state => state.products);

  return (
    <OrderInfo>
      <Title>Products in the cart</Title>
      <ItemsWrapper>
        {products.map(product => (
          <ProductWrapper key={product.id}>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductInfo>
              <LazyLoad height={60} offset={100}>
                <ProductImageLazy src={product.image} alt={product.name} />
              </LazyLoad>
              <ProductDetail>
                <span>items: <b>{product.quantity}</b></span>
                <span>unit price: <b>${product.price}</b></span>
                <span>price: <b>${product.price * product.quantity}</b></span>
              </ProductDetail>
            </ProductInfo>
          </ProductWrapper>
        ))}
      </ItemsWrapper>
    </OrderInfo>
  );
};

export default ProductList;
