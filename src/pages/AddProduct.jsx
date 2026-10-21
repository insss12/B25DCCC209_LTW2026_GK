import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data.js";

export default function AddProduct({ products, addProduct }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      category === "" ||
      price.trim() === "" ||
      stock.trim() === ""
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);

    if (
      numericPrice <= 0 ||
      !Number.isFinite(numericPrice) ||
      numericStock < 0 ||
      !Number.isInteger(numericStock) ||
      !Number.isFinite(numericStock)
    ) {
      setError("Giá phải lớn hơn 0, số lượng là số nguyên không âm");
      return;
    }

    const newId =
      products.length === 0
        ? 1
        : Math.max(...products.map((p) => p.id)) + 1;

    const newProduct = {
      id: newId,
      name: name.trim(),
      category,
      price: numericPrice,
      stock: numericStock,
    };

    addProduct(newProduct);

    const message = `Thêm sản phẩm "${newProduct.name}" thành công`;

    navigate("/products", {
      replace: true,
      state: { message },
    });
  };

  return (
    <div>
      <h1>Thêm sản phẩm</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            id="name"
            type="text"
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
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="stock">Số lượng tồn</label>
          <input
            id="stock"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}