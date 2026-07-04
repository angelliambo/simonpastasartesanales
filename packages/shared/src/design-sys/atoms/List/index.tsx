import React, { useMemo } from "react";
import { ListProps, ListItemProps, ListItemMetaProps } from "./List.types";
import {
  StyledList,
  ListHeader,
  ListFooter,
  StyledListItem,
  ListItemContent,
  ListItemActions,
  ListItemExtra,
  ListItemMeta as StyledListItemMeta,
  ListItemMetaAvatar,
  ListItemMetaContent,
  ListItemMetaTitle,
  ListItemMetaDescription,
  ListEmpty,
  ListLoading,
} from "./List.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';
import { mapSizeToAvailable, STANDARD_SIZES } from "../shared";
import { Spin } from "../Spin";

/**
 * List Component - Lista de items
 *
 * Compatible con Ant Design List API
 */
export const List: React.FC<ListProps> = ({
  dataSource = [],
  renderItem,
  loading = false,
  bordered = false,
  size = "md",
  header,
  footer,
  itemLayout = "horizontal",
  split = true,
  className,
  style,
  id,
  accessibility,
  pagination,
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const effectiveAccessibility = accessibility || contextAccessibility;

  // Mapear tamaño usando shared systems
  const mappedSize = mapSizeToAvailable(size, STANDARD_SIZES);

  // Paginación
  const currentPage =
    typeof pagination === "object" ? pagination.current || 1 : 1;
  const pageSize =
    typeof pagination === "object" ? pagination.pageSize || 10 : 10;

  const paginatedData = useMemo(() => {
    if (!pagination || dataSource.length === 0) return dataSource;

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return dataSource.slice(start, end);
  }, [dataSource, currentPage, pageSize, pagination]);

  const finalId = id ? `list-${id}` : undefined;

  return (
    <StyledList
      id={finalId}
      $bordered={bordered}
      $size={mappedSize}
      $split={split}
      accessibility={effectiveAccessibility}
      className={className}
      style={style}
    >
      {header && (
        <ListHeader accessibility={effectiveAccessibility}>{header}</ListHeader>
      )}

      {loading ? (
        <ListLoading>
          <Spin size={mappedSize} />
        </ListLoading>
      ) : paginatedData.length === 0 ? (
        <ListEmpty accessibility={effectiveAccessibility}>
          No hay datos
        </ListEmpty>
      ) : (
        <>
          {paginatedData.map((item, index) => {
            if (renderItem) {
              return (
                <React.Fragment key={index}>
                  {renderItem(item, index)}
                </React.Fragment>
              );
            }
            return null;
          })}
        </>
      )}

      {footer && (
        <ListFooter accessibility={effectiveAccessibility}>{footer}</ListFooter>
      )}

      {pagination && paginatedData.length > 0 && (
        <ListFooter accessibility={effectiveAccessibility}>
          {/* Paginación básica - Componente Pagination podría integrarse en el futuro */}
          <div style={{ textAlign: "center" }}>
            Página {currentPage} de {Math.ceil(dataSource.length / pageSize)}
          </div>
        </ListFooter>
      )}
    </StyledList>
  );
};

/**
 * List.Item Component
 */
export const ListItem: React.FC<ListItemProps> = ({
  children,
  actions,
  extra,
  disabled = false,
  className,
  style,
}) => {
  const { accessibility } = usePersonalization();
  const mappedSize = "md"; // Default size for items

  return (
    <StyledListItem
      $size={mappedSize}
      $split={true}
      $disabled={disabled}
      $itemLayout="horizontal"
      accessibility={accessibility}
      className={className}
      style={style}
    >
      <ListItemContent>{children}</ListItemContent>
      {extra && <ListItemExtra>{extra}</ListItemExtra>}
      {actions && actions.length > 0 && (
        <ListItemActions>
          {actions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ListItemActions>
      )}
    </StyledListItem>
  );
};

/**
 * List.Item.Meta Component
 */
export const ListItemMeta: React.FC<ListItemMetaProps> = ({
  avatar,
  title,
  description,
  className,
  style,
}) => {
  const { accessibility } = usePersonalization();

  return (
    <StyledListItemMeta className={className} style={style}>
      {avatar && <ListItemMetaAvatar>{avatar}</ListItemMetaAvatar>}
      <ListItemMetaContent>
        {title && (
          <ListItemMetaTitle accessibility={accessibility}>
            {title}
          </ListItemMetaTitle>
        )}
        {description && (
          <ListItemMetaDescription accessibility={accessibility}>
            {description}
          </ListItemMetaDescription>
        )}
      </ListItemMetaContent>
    </StyledListItemMeta>
  );
};

// Asignar subcomponentes a List usando extensión de interfaz
interface ListWithSubcomponents extends React.FC<ListProps> {
  Item: typeof ListItem & {
    Meta: typeof ListItemMeta;
  };
}

const ListComponentWithSubcomponents = List as unknown as ListWithSubcomponents;
ListComponentWithSubcomponents.Item = ListItem as typeof ListItem & {
  Meta: typeof ListItemMeta;
};
ListComponentWithSubcomponents.Item.Meta = ListItemMeta;

export default ListComponentWithSubcomponents;
