import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterBar from "../components/FilterBar.jsx";
import ProductTable from "../components/ProductTable.jsx";

export default function ProductList({
  products,
  increaseStock,
  decreaseStock,
  deleteProduct,
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();

  const handleQueryShift = (value) => {
    setQuery(value);
  };

  useEffect(() => {
    const currentMessage = location.state?.message;

    if (currentMessage) {
      setMessage(currentMessage);
      window.history.replaceState({}, document.title);
    }

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.state]);

  const filteredProducts = products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesCategory =
      category === "" || product.category === category;

    return matchesName && matchesCategory;
  });

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>

      {message && <p>{message}</p>}

      <FilterBar
        query={query}
        category={category}
        onQueryChange={handleQueryShift}
        onCategoryChange={setCategory}
      />

      <p>Số sản phẩm tìm thấy: {filteredProducts.length}</p>

      <ProductTable
        products={filteredProducts}
        increaseStock={increaseStock}
        decreaseStock={decreaseStock}
        deleteProduct={deleteProduct}
      />
    </div>
  );
}