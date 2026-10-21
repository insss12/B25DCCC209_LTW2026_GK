import { CATEGORIES } from "../data.js";

export default function FilterBar({
  query,
  category,
  onQueryChange,
  onCategoryChange,
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />

      <select
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
  );
}