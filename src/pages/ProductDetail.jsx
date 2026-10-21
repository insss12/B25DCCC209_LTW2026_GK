
import { useNavigate, useParams } from "react-router-dom";
import { formatMoney } from "../data";

export default function ProductDetail({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return <p>Không tìm thấy sản phẩm</p>;
  }

  return (
    <>
      <h1>Chi tiết sản phẩm</h1>

      <p>Tên sản phẩm: {product.name}</p>
      <p>Danh mục: {product.category}</p>
      <p>Giá: {formatMoney(product.price)}</p>
      <p>Tồn kho: {product.stock}</p>

      <button onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </>
  );
}
