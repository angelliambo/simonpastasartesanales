import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Spin from '@design-sys/atoms/Spin';
import Text from '@design-sys/atoms/Text';

export type ColumnType<RecordType> = {
  title: React.ReactNode;
  dataIndex?: keyof RecordType | string;
  key?: string;
  render?: (value: any, record: RecordType, index: number) => React.ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
};

export type RowSelection<RecordType> = {
  selectedRowKeys: React.Key[];
  onChange: (selectedRowKeys: React.Key[], selectedRows: RecordType[]) => void;
};

export type PaginationConfig = {
  current?: number;
  pageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  onChange?: (page: number, pageSize?: number) => void;
  onShowSizeChange?: (page: number, pageSize?: number) => void;
};

export interface TableProps<RecordType = any> {
  columns: ColumnType<RecordType>[];
  dataSource: RecordType[];
  rowKey?: keyof RecordType | ((record: RecordType) => React.Key);
  loading?: boolean;
  pagination?: PaginationConfig | false;
  rowSelection?: RowSelection<RecordType>;
  className?: string;
  style?: React.CSSProperties;
  /** ID único del componente (opcional) - se concatena con "table-" */
  id?: string;
}

const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  background: ${({ theme }) => theme?.colors?.background?.card || "#fff"};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid
      ${({ theme }) => theme?.colors?.border?.normal || "#eee"};
    background: ${({ theme }) =>
      theme?.colors?.background?.secondary || "#fafafa"};
    font-weight: 600;
  }

  tbody td {
    padding: 12px 16px;
    border-bottom: 1px solid
      ${({ theme }) => theme?.colors?.border?.light || "#f2f2f2"};
    vertical-align: top;
  }

  tbody tr:hover {
    background: ${({ theme }) =>
      theme?.colors?.background?.secondary || "#fafafa"};
  }
`;

const FooterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

const Pager = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PagerButton = styled.button`
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme?.colors?.border?.normal || "#ddd"};
  background: ${({ theme }) => theme?.colors?.background?.card || "#fff"};
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export function Table<RecordType = any>({
  columns,
  dataSource,
  rowKey,
  loading,
  pagination = { pageSize: 10, current: 1, total: dataSource?.length || 0 },
  rowSelection,
  className,
  style,
  id,
}: TableProps<RecordType>) {
  const [current, setCurrent] = useState<number>(
    pagination && pagination.current ? pagination.current : 1
  );
  const [pageSize] = useState<number>(
    pagination && pagination.pageSize ? pagination.pageSize : 10
  );

  const total =
    pagination === false
      ? dataSource?.length || 0
      : pagination?.total ?? dataSource?.length ?? 0;

  const pagedData = useMemo(() => {
    if (pagination === false) return dataSource;
    const start = (current - 1) * pageSize;
    return dataSource.slice(start, start + pageSize);
  }, [dataSource, current, pageSize, pagination]);

  const getRowKey = (record: RecordType, index: number): React.Key => {
    if (typeof rowKey === "function") return rowKey(record);
    if (typeof rowKey === "string") return (record as any)[rowKey];
    return (record as any)?.key ?? index;
  };

  const handleToggleSelect = (key: React.Key) => {
    if (!rowSelection) return;
    const isSelected = rowSelection.selectedRowKeys.includes(key);
    const newKeys = isSelected
      ? rowSelection.selectedRowKeys.filter((k) => k !== key)
      : [...rowSelection.selectedRowKeys, key];
    const selectedRows = dataSource.filter((r, idx) =>
      newKeys.includes(getRowKey(r, idx))
    );
    rowSelection.onChange(newKeys, selectedRows as any);
  };

  const start = (current - 1) * pageSize + 1;
  const end = Math.min(current * pageSize, total);

  const finalId = id ? `table-${id}` : undefined;

  return (
    <TableWrapper id={finalId} className={className} style={style}>
      {loading && (
        <div style={{ padding: 16 }}>
          <Spin />
        </div>
      )}

      <StyledTable>
        <thead>
          <tr>
            {rowSelection && <th style={{ width: 36 }} />}
            {columns.map((col, idx) => (
              <th
                key={col.key || String(idx)}
                style={{ width: col.width, textAlign: col.align || "left" }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pagedData.map((record, rowIndex) => {
            const key = getRowKey(record, rowIndex);
            return (
              <tr key={key}>
                {rowSelection && (
                  <td>
                    <input
                      type="checkbox"
                      checked={rowSelection.selectedRowKeys.includes(key)}
                      onChange={() => handleToggleSelect(key)}
                    />
                  </td>
                )}
                {columns.map((col, colIndex) => {
                  const value = col.dataIndex
                    ? (record as any)[col.dataIndex as any]
                    : undefined;
                  const content = col.render
                    ? col.render(value, record, rowIndex)
                    : value;
                  return (
                    <td
                      key={(col.key || String(colIndex)) + "-" + String(key)}
                      style={{ textAlign: col.align || "left" }}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>

      {pagination !== false && (
        <FooterBar>
          <Text variant="body2" color="secondary">
            {pagination?.showTotal
              ? pagination.showTotal(total, [start, end])
              : `${start}-${end} de ${total}`}
          </Text>
          <Pager>
            <PagerButton
              onClick={() => setCurrent((c) => Math.max(1, c - 1))}
              disabled={current <= 1}
            >
              Anterior
            </PagerButton>
            <Text variant="body2">{current}</Text>
            <PagerButton
              onClick={() => setCurrent((c) => (end >= total ? c : c + 1))}
              disabled={end >= total}
            >
              Siguiente
            </PagerButton>
          </Pager>
        </FooterBar>
      )}
    </TableWrapper>
  );
}

export default Table;
