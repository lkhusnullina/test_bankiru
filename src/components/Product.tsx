import { IProduct } from "../models/iProduct";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type ProductProps = {
  product: IProduct;
};

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <Card sx={{ width: 400, display: "flex", gap: "50px", flexDirection: "row"}}>
      <CardMedia
        sx={{ width: 170, height: 170 }}
        component="img"
        image={product.logo}
        alt={product.name}
        title={product.name}
      />
      <CardContent sx={{ display: "flex", gap: "30px", flexDirection: "column"}}>
        <Typography variant="h5" sx={{ color: "text" }}>
          {product.name}
        </Typography>
        <Typography variant="h5" sx={{ color: "text.secondary", fontSize: '20px' }}>
          Сумма {product.amount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
