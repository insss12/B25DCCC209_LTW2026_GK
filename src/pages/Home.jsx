export default function Home({ products = [] }) {
  return (
    <div>
      <h1>Kho hàng</h1>
      <p>Tổng số sản phẩm: {products.length}</p>
      <p>Tổng tồn kho: {products.reduce((sum, p) => sum + p.stock, 0)}</p>
    </div>
  );
}