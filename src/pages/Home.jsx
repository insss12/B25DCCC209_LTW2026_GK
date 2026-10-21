import { formatMoney } from "../data.js";

export default function Home({ products = [] }) {
  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  return (
    <div>
      <h1>Trang chủ</h1>
      <p>Tổng số sản phẩm: {products.length}</p>
      <p>Tổng số lượng tồn kho: {totalStock}</p>
      <p>Tổng giá trị hàng tồn: {formatMoney(totalValue)}</p>
    </div>
  );
}