
import { Link } from "react-router-dom";
import { formatMoney } from "../data";

export default function ProductList({
  products,
  increaseStock,
  decreaseStock,
  deleteProduct
}) {
  return (
    <>
      <h1>Danh sách sản phẩm</h1>

      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Tồn kho</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <Link to={`/products/${p.id}`}>
                  {p.name}
                </Link>
              </td>

              <td>{p.category}</td>

              <td>{formatMoney(p.price)}</td>

              <td className={p.stock < 5 ? "low-stock" : ""}>
                {p.stock}
              </td>

              <td>
                <button
                  onClick={() => increaseStock(p.id)}
                >
                  +
                </button>

                <button
                  onClick={() => decreaseStock(p.id)}
                  disabled={p.stock === 0}
                >
                  -
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
