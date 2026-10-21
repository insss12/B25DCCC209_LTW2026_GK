import ProductRow from "./ProductRow.jsx";

export default function ProductTable({
  products,
  increaseStock,
  decreaseStock,
  deleteProduct,
}) {
  return (
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
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            increaseStock={increaseStock}
            decreaseStock={decreaseStock}
            deleteProduct={deleteProduct}
          />
        ))}
      </tbody>
    </table>
  );
}