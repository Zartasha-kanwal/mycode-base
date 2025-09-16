"use client";
import { Input, Select } from "antd";
import styles from "./SearchFilter.module.scss";

const { Option } = Select;

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (status: string) => void;
}

export default function SearchFilter({ onSearch, onFilter }: SearchFilterProps) {
  return (
    <div className={styles.container}>
      {/* Search bar */}
      <Input.Search
        placeholder="Search by name or email..."
        allowClear
        enterButton
        onSearch={(value) => onSearch(value)}
        className={styles.searchInput}
      />

      {/* Status filter */}
      <Select
        defaultValue="All"
        onChange={onFilter}
        className={styles.selectFilter}
      >
        <Option value="All">All</Option>
        <Option value="Active">Active</Option>
        <Option value="Waiting">Waiting</Option>
        <Option value="Failed">Failed</Option>
      </Select>
    </div>
  );
}
