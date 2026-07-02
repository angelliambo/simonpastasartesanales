import React from "react";
import { Card } from "../../../../styles/mixins";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  RoleTag,
  StatusTag,
  EmptyState,
  LoadingState,
} from "../../styles/relationshipTable.mixins";

// ===== TIPOS =====
interface RelationshipTableProps {
  data: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    totalRelations: number;
    status: string;
    createdAt: string;
  }>;
  onViewDetails: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
  /** ID único del componente (opcional) - se concatena con "relationship-table-" */
  id?: string;
}

// ===== COMPONENTE PRINCIPAL =====

export const RelationshipTable: React.FC<RelationshipTableProps> = ({
  data,
  onViewDetails,
  onEdit,
  onDelete,
  loading = false,
  id,
}) => {
  if (loading) {
    return (
      <Card>
        <LoadingState>Cargando datos...</LoadingState>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <EmptyState>No hay datos para mostrar</EmptyState>
      </Card>
    );
  }

  const finalId = id ? `relationship-table-${id}` : undefined;

  return (
    <Card id={finalId} style={{ padding: 0, overflow: "hidden" }}>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Rol</TableHeaderCell>
            <TableHeaderCell>Relaciones</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
            <TableHeaderCell>Fecha Creación</TableHeaderCell>
            <TableHeaderCell>Acciones</TableHeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <RoleTag $role={row.role}>{row.role}</RoleTag>
              </TableCell>
              <TableCell>{row.totalRelations}</TableCell>
              <TableCell>
                <StatusTag $status={row.status}>{row.status}</StatusTag>
              </TableCell>
              <TableCell>
                {new Date(row.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => onViewDetails(row.id)}
                    style={{
                      padding: "4px 12px",
                      background: "#dbeafe",
                      color: "#1e40af",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Ver
                  </button>
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row.id)}
                      style={{
                        padding: "4px 12px",
                        background: "#fef3c7",
                        color: "#a16207",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Editar
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row.id)}
                      style={{
                        padding: "4px 12px",
                        background: "#fee2e2",
                        color: "#991b1b",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RelationshipTable;
