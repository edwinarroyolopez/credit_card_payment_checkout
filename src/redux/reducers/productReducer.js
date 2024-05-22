import { createSlice } from '@reduxjs/toolkit';

const initialState =  [
  { id: 1, name: 'Batola estampada', price: 60000, quantity: 3, image: 'https://scontent.feoh10-1.fna.fbcdn.net/v/t39.30808-6/219222374_116339900723780_460053496962460970_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4K0vuzD0TAYQ7kNvgE5Scpz&_nc_ht=scontent.feoh10-1.fna&oh=00_AYA5FywG0IU8ev1Rlqa9WElr0AHSHPbRgZ3r_x7m8xPbiw&oe=66529550' },
  { id: 2, name: 'Capri - blusa', price: 45000, quantity: 5, image: 'https://scontent.feoh10-1.fna.fbcdn.net/v/t39.30808-6/185377143_116327414058362_1276376045424794651_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Zc2UO2982B4Q7kNvgEvWgwp&_nc_ht=scontent.feoh10-1.fna&oh=00_AYA_IQ6Yv1qsuHNYkwtN5bbusHMSBfMVeW-mG4C02IeFQg&oe=66528D0E' },
  { id: 3, name: 'Pijama fresh', price: 70000, quantity: 7, image: 'https://scontent.feoh10-1.fna.fbcdn.net/v/t39.30808-6/216233433_112836741074096_6314668730584399796_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=mEk41kfcSCEQ7kNvgHbY5cD&_nc_ht=scontent.feoh10-1.fna&oh=00_AYBEDmGc4wVp8N-rmQICAmPZJZeC1k1sncGECCHvaEoB3w&oe=66528A68' }
];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
});

export default productSlice.reducer;