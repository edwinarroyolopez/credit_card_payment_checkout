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
            <strong>{product.name}</strong>: <div>${product.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;