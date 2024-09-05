import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { IProduct } from "../models/iProduct";
import Grid from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setFilter, setSort, SORT_DEFAULT, SORT_MAX, SORT_MIN } from "../store/productsSlice";
import {  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

export default function FilterProducts() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector((state: RootState) => state.products.filtredProducts);
  const [amount, setAmountFilter] = useState("");
  const [sortType, setSortType] = useState("");
  const [loaded, setLoaded] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value);
    dispatch(setSort(event.target.value));
  };

  useEffect(() => {
    if (loaded) return;
    setLoaded(true);
    const searchParams = new URLSearchParams(window.location.search);
    const amountParam = searchParams.get("amount");
    if (amountParam) {
      const value = parseFloat(amountParam);
      if (value) {
        setAmountFilter(amountParam);
        dispatch(setFilter(amountParam));
      }
    }
  },[navigate])

  useEffect(() => {
    if (!loaded) return;
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("amount")) {
      searchParams.delete("amount");
    }
    if (amount) {
      searchParams.append("amount", amount);
    }
    navigate({search: searchParams.toString()})
  },[amount])

  return (
    <>
      <TextField
        sx={{ mt: "10px", mb: "10px" }}
        label="Сумма кредита"
        variant="outlined"
        type="number"
        value={amount}
        onChange={(e) => {
          setAmountFilter(e.target.value);
          dispatch(setFilter(e.target.value));
        }}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Сортировать</InputLabel>
        <Select
          defaultValue=""
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortType}
          label="Сортировать"
          onChange={handleChange}
        >
          <MenuItem value={SORT_DEFAULT}>По умолчанию</MenuItem>
          <MenuItem value={SORT_MAX}>По максимальной сумме</MenuItem>
          <MenuItem value={SORT_MIN}>По минимальной сумме</MenuItem>
        </Select>
      </FormControl>

      <Grid
        sx={{ mt: "10px", flexDirection:"column", justifyContent: "center", alignItems: "center" }}
        container
        spacing={3}
        rowSpacing={3}
      >
        {products.map((product: IProduct) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </Grid>
    </>
  );
}
