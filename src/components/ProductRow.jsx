import { Link } from "react-router-dom";
import { formatMoney } from "../data.js";

export default function ProductRow({
  product,
  increaseStock,
  decreaseStock,
  deleteProduct,
}) {
  const { id, name, category, price, stock } = product;

  return (
    <tr>
      <td>
        <Link to={`/products/${id}`}>{name}</Link>
      </td>
      <td>{category}</td>
      <td>{formatMoney(price)}</td>
      <td style={{ color: stock < 5 ? "red" : "inherit" }}>
        {stock}
      </td>
      <td>
        <button onClick={() => increaseStock(id)}>+</button>
        <button
          onClick={() => decreaseStock(id)}
          disabled={stock === 0}
        >
          -
        </button>
        <button onClick={() => deleteProduct(id)}>Xóa</button>
      </td>
    </tr>
  );
}