const BUILD_TAG = "kt-6641";

import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const savedProducts = localStorage.getItem("gk_products");

    if (savedProducts !== null) {
      try {
        setProducts(JSON.parse(savedProducts));
        setLoading(false);
      } catch {
        localStorage.removeItem("gk_products");
      }
    }

    if (savedProducts !== null) {
      try {
        JSON.parse(savedProducts);
        return () => controller.abort();
      } catch {
        // Dữ liệu lưu không hợp lệ, tải lại từ API.
      }
    }

    axios
      .get("/data/products.json", {
        signal: controller.signal,
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("gk_products", JSON.stringify(products));
    }
  }, [products, loading]);

  const increaseStock = (id) => {
    setProducts((old) =>
      old.map((p) =>
        p.id === id ? { ...p, stock: p.stock + 1 } : p
      )
    );
  };

  const decreaseStock = (id) => {
    setProducts((old) =>
      old.map((p) =>
        p.id === id && p.stock > 0
          ? { ...p, stock: p.stock - 1 }
          : p
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((old) => old.filter((p) => p.id !== id));
  };

  const addProduct = (product) => {
    setProducts((old) => [...old, product]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout loading={loading} error={error} />}
      >
        <Route index element={<Home products={products} />} />

        <Route
          path="products"
          element={
            <ProductList
              products={products}
              increaseStock={increaseStock}
              decreaseStock={decreaseStock}
              deleteProduct={deleteProduct}
            />
          }
        />

        <Route
          path="products/new"
          element={
            <AddProduct
              products={products}
              addProduct={addProduct}
            />
          }
        />

        <Route
          path="products/:id"
          element={<ProductDetail products={products} />}
        />
      </Route>
    </Routes>
  );
}