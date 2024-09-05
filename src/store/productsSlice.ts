import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../models/iProduct";

export interface IProductFilter {
  amount: number | null;
}

export const SORT_MAX = "max";
export const SORT_MIN = "min";
export const SORT_DEFAULT = "default";

export type ProductsState = {
  products: IProduct[];
  filter: IProductFilter;
  sort: string;
  filtredProducts: IProduct[];
};

const data = [
  {
    id: 1,
    amount: 1000,
    name: "Т банк",
    logo: "//static3.banki.ru/ugc/d4/e8/54/40/195706.png",
  },
  {
    id: 2,
    amount: 10000,
    name: "ВТБ",
    logo: "//static4.banki.ru/ugc/ed/5f/1a/1c/327.png",
  },
  {
    id: 3,
    amount: 20000,
    name: "Почта Банк",
    logo: "//static2.banki.ru/ugc/c3/64/dd/70/194275.png",
  },
  {
    id: 4,
    amount: 20000,
    name: "Локо-Банк",
    logo: "//static3.banki.ru/ugc/1a/05/5b/45/9183.png",
  },
  {
    id: 5,
    amount: 1000000,
    name: "Сбербанк",
    logo: "//static4.banki.ru/ugc/9d/12/0b/81/322.png",
  },
] as IProduct[];

const initialState: ProductsState = {
  products: data,
  filter: {
    amount: null,
  },
  sort: SORT_DEFAULT,
  filtredProducts: data,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setSort(state, action: PayloadAction<string>) {
		switch (action.payload) {
			case SORT_MAX:
				state.filtredProducts.sort((a, b) => {return b.amount - a.amount});
				break;
			case SORT_MIN:
				state.filtredProducts.sort((a, b) => {return a.amount - b.amount});
				break;
			case SORT_DEFAULT:
			default:
				state.filtredProducts = state.products;
				break;
		}
    },
    setFilter(state, action: PayloadAction<string>) {
      if (!action.payload) {
        state.filtredProducts = state.products;
      } else {
        state.filter.amount = parseFloat(action.payload);
        state.filtredProducts = state.products.filter(
          (product) =>
            state.filter.amount && product.amount >= state.filter.amount
        );
      }
    },
  },
});

export const { setSort, setFilter } = productsSlice.actions;
export default productsSlice.reducer;
