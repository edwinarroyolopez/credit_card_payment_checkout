import styled from 'styled-components';

export const OrderInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 25px;
  font-size: calc(10px + 2.5vmin);

  @media (min-width: 768px) {
    font-size: calc(8px + 2vmin);
  }
`;
export const Title = styled.span`
    font-size: 1.4em;

    margin: 2px 0;
    text-align: center;
`;

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

export const ProductImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
`;

export const ProductTitle = styled.span`
    font-size: 1.2em;
    margin: 2px 0;
    text-align: center;
`;

export const ProductInfo = styled.div`
  border-bottom:solid 1px #555;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  span {
    color: #9d9d9d;
    font-size: 1em;
    margin: 2px 0;
  }
`;

export const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  span {
    font-size: 1em;
    margin: 2px 0;
  }
`;
