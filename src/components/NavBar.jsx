
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/" end>Trang chủ</NavLink>
      <NavLink to="/products" end>Danh sách</NavLink>
      <NavLink to="/products/new">Thêm mới</NavLink>
    </nav>
  );
}
