
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data";

export default function AddProduct({ products, addProduct }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      price.trim() === "" ||
      stock.trim() === ""
    ) {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const numberPrice = Number(price);
    const numberStock = Number(stock);

    if (
      numberPrice <= 0 ||
      !Number.isFinite(numberPrice) ||
      !Number.isInteger(numberStock) ||
      numberStock < 0
    ) {
      setMessage(
        "Giá phải lớn hơn 0, số lượng là số nguyên không âm"
      );
      return;
    }

    const maxId = products.reduce(
      (max, p) => Math.max(max, p.id),
      0
    );

    const newProduct = {
      id: maxId + 1,
      name: name.trim(),
      category,
      price: numberPrice,
      stock: numberStock
    };

    addProduct(newProduct);
    navigate("/products", { replace: true });
  };

  return (
    <>
      <h1>Thêm sản phẩm</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price">Giá</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="stock">Số lượng tồn</label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {message && <p className="error">{message}</p>}

        <button type="submit">Thêm</button>
      </form>
    </>
  );
}
