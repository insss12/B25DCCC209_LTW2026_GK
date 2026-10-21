
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout({ loading, error }) {
  return (
    <>
      <NavBar />

      <main>
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>Không tải được dữ liệu</p>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
}
