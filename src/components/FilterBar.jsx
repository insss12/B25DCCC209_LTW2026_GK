import { CATEGORIES } from "../data.js";

export default function FilterBar({
  query,
  category,
  onQueryChange,
  onCategoryChange,
}) {
  return (
    <div className="filter-bar">
      <div>
        <label htmlFor="search">Tìm kiếm</label>
        <input
          id="search"
          type="text"
          value={query}
          placeholder="Nhập tên sản phẩm"
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="category">Danh mục</label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Tất cả danh mục</option>
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}