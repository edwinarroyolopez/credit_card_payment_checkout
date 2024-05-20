import React from 'react';
import { useSelector } from 'react-redux';

const ProductList = () => {

  const products = useSelector(state => state.products);

  return (
    <div>
      <h2>Products to Sell</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong>: <span>${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;