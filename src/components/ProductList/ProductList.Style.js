// src/components/ProductList.Style.js
import styled from 'styled-components';

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const OrderInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;

  @media (min-width: 768px) and (max-width: 990px) {
    padding-right: 15px;
  }
`;



export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
`;

export const ProductTitle = styled.span`
    font-size: 0.7em;
    
    margin: 2px 0;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  span {
    font-size: 0.5em;
    margin: 2px 0;
  }
`;


export const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    font-size: 0.5em;
    margin: 2px 0;
  }
`;