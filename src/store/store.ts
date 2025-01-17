import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './productsSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
  },
});

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;