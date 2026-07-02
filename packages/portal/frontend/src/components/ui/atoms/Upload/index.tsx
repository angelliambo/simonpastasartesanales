import React, { useState, useRef, useCallback } from "react";
import {
  UploadProps,
  UploadFile,
  UploadFileStatus,
} from "./Upload.types";
import {
  UploadWrapper,
  UploadInput,
  UploadButton,
  UploadList,
  UploadListItem,
  UploadListItemInfo,
  UploadListItemThumb,
  UploadListItemName,
  UploadListItemActions,
  UploadProgress,
  DragUploadArea,
} from "./Upload.styles";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { mapSizeToAvailable, STANDARD_SIZES } from "../shared";
import { Button } from "../Button";
import { Text } from "../Text";
import { Space } from "../Space";
import {
  UploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";

/**
 * Upload Component - Componente de subida de archivos
 *
 * Compatible con Ant Design Upload API
 */
export const Upload: React.FC<UploadProps> = ({
  beforeUpload,
  onChange,
  onStart,
  onProgress,
  onSuccess,
  onError,
  onRemove,
  accept,
  showUploadList = true,
  multiple = false,
  name = "file",
  customRequest,
  action,
  headers = {},
  data,
  disabled = false,
  size = "md",
  listType = "text",
  maxCount,
  drag = false,
  className,
  style,
  children,
  id,
  accessibility,
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const effectiveAccessibility = accessibility || contextAccessibility;

  // Mapear tamaño usando shared systems
  const mappedSize = mapSizeToAvailable(size, STANDARD_SIZES);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generar UID único
  const generateUID = () => {
    return `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Manejar selección de archivos
  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      const newFiles: File[] = Array.from(files);

      // Verificar maxCount
      if (maxCount && fileList.length + newFiles.length > maxCount) {
        // Mostrar error
        return;
      }

      for (const file of newFiles) {
        // Verificar beforeUpload
        let shouldUpload = true;
        if (beforeUpload) {
          const result = await beforeUpload(file, newFiles);
          shouldUpload = result !== false;
        }

        if (!shouldUpload) continue;

        const uploadFile: UploadFile = {
          uid: generateUID(),
          name: file.name,
          status: "uploading",
          size: file.size,
          type: file.type,
          originFileObj: file,
          percent: 0,
        };

        const updatedFileList = [...fileList, uploadFile];
        setFileList(updatedFileList);
        onChange?.({ file: uploadFile, fileList: updatedFileList });

        onStart?.(file);

        // Upload
        if (customRequest) {
          customRequest({
            action: action || "",
            file,
            filename: name,
            data: typeof data === "function" ? data(file) : data || {},
            headers,
            onProgress: (event) => {
              const updated = {
                ...uploadFile,
                percent: event.percent,
                status: "uploading" as UploadFileStatus,
              };
              const newList = updatedFileList.map((f) =>
                f.uid === uploadFile.uid ? updated : f
              );
              setFileList(newList);
              onProgress?.(event, file);
              onChange?.({ file: updated, fileList: newList });
            },
            onSuccess: (response) => {
              const updated = {
                ...uploadFile,
                status: "done" as UploadFileStatus,
                response,
                percent: 100,
              };
              const newList = updatedFileList.map((f) =>
                f.uid === uploadFile.uid ? updated : f
              );
              setFileList(newList);
              onSuccess?.(response, file);
              onChange?.({ file: updated, fileList: newList });
            },
            onError: (error) => {
              const updated = {
                ...uploadFile,
                status: "error" as UploadFileStatus,
                error,
              };
              const newList = updatedFileList.map((f) =>
                f.uid === uploadFile.uid ? updated : f
              );
              setFileList(newList);
              onError?.(error, null, file);
              onChange?.({ file: updated, fileList: newList });
            },
          });
        } else if (action) {
          // Upload con fetch
          const formData = new FormData();
          formData.append(name, file);
          if (typeof data === "function") {
            Object.entries(data(file)).forEach(([key, value]) => {
              formData.append(key, value as string);
            });
          } else if (data) {
            Object.entries(data).forEach(([key, value]) => {
              formData.append(key, value as string);
            });
          }

          fetch(action, {
            method: "POST",
            headers,
            body: formData,
          })
            .then((response) => response.json())
            .then((response) => {
              const updated = {
                ...uploadFile,
                status: "done" as UploadFileStatus,
                response,
                percent: 100,
              };
              const newList = updatedFileList.map((f) =>
                f.uid === uploadFile.uid ? updated : f
              );
              setFileList(newList);
              onSuccess?.(response, file);
              onChange?.({ file: updated, fileList: newList });
            })
            .catch((error) => {
              const updated = {
                ...uploadFile,
                status: "error" as UploadFileStatus,
                error,
              };
              const newList = updatedFileList.map((f) =>
                f.uid === uploadFile.uid ? updated : f
              );
              setFileList(newList);
              onError?.(error, null, file);
              onChange?.({ file: updated, fileList: newList });
            });
        } else {
          // Sin upload automático, solo marcar como done
          const updated = {
            ...uploadFile,
            status: "done" as UploadFileStatus,
            percent: 100,
          };
          const newList = updatedFileList.map((f) =>
            f.uid === uploadFile.uid ? updated : f
          );
          setFileList(newList);
          onSuccess?.(null, file);
          onChange?.({ file: updated, fileList: newList });
        }
      }

      // Reset input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [
      beforeUpload,
      onChange,
      onStart,
      onProgress,
      onSuccess,
      onError,
      fileList,
      maxCount,
      name,
      customRequest,
      action,
      headers,
      data,
    ]
  );

  // Manejar click en trigger
  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  // Manejar drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const fakeEvent = {
        target: { files },
      } as React.ChangeEvent<HTMLInputElement>;
      await handleFileChange(fakeEvent);
    }
  };

  // Renderizar lista de archivos
  const renderUploadList = () => {
    if (!showUploadList || fileList.length === 0) return null;

    const showOptions =
      typeof showUploadList === "object" ? showUploadList : {};
    const showPreview =
      showOptions.showPreviewIcon !== undefined
        ? showOptions.showPreviewIcon
        : true;
    const showRemove =
      showOptions.showRemoveIcon !== undefined
        ? showOptions.showRemoveIcon
        : true;
    const showDownload =
      showOptions.showDownloadIcon !== undefined
        ? showOptions.showDownloadIcon
        : false;

    return (
      <UploadList $listType={listType} accessibility={effectiveAccessibility}>
        {fileList.map((file) => (
          <UploadListItem
            key={file.uid}
            $listType={listType}
            $status={file.status}
            $size={mappedSize}
            accessibility={effectiveAccessibility}
          >
            <UploadListItemInfo>
              {listType === "picture" || listType === "picture-card" ? (
                <UploadListItemThumb $thumbnail={file.thumbUrl || file.url}>
                  {file.thumbUrl || file.url ? (
                    <img src={file.thumbUrl || file.url} alt={file.name} loading="lazy" />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text color="secondary">📄</Text>
                    </div>
                  )}
                </UploadListItemThumb>
              ) : null}
              <UploadListItemName accessibility={effectiveAccessibility}>
                {file.name}
              </UploadListItemName>
              {file.status === "uploading" && file.percent !== undefined && (
                <UploadProgress
                  $percent={file.percent}
                  accessibility={effectiveAccessibility}
                />
              )}
            </UploadListItemInfo>
            <UploadListItemActions>
              {showPreview && file.status === "done" && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<ZnIcon icon={EyeOutlined} />}
                  onClick={() => {
                    if (file.url) window.open(file.url, "_blank");
                  }}
                >
                  {/* Icono solo */}
                </Button>
              )}
              {showDownload && file.status === "done" && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<ZnIcon icon={DownloadOutlined} />}
                  onClick={() => {
                    if (file.url) {
                      const link = document.createElement("a");
                      link.href = file.url;
                      link.download = file.name;
                      link.click();
                    }
                  }}
                >
                  {/* Icono solo */}
                </Button>
              )}
              {showRemove && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<ZnIcon icon={DeleteOutlined} />}
                  onClick={async () => {
                    const result = await onRemove?.(file);
                    if (result !== false) {
                      const newList = fileList.filter(
                        (f) => f.uid !== file.uid
                      );
                      setFileList(newList);
                      onChange?.({ file, fileList: newList });
                    }
                  }}
                >
                  {/* Icono solo */}
                </Button>
              )}
            </UploadListItemActions>
          </UploadListItem>
        ))}
      </UploadList>
    );
  };

  const triggerContent = children || (
    <Button
      variant="secondary"
      size={mappedSize}
      icon={<ZnIcon icon={UploadOutlined} />}
      disabled={disabled}
    >
      Subir archivo
    </Button>
  );

  const finalId = id ? `upload-${id}` : undefined;

  return (
    <UploadWrapper
      id={finalId}
      $disabled={disabled}
      $size={mappedSize}
      accessibility={effectiveAccessibility}
      className={className}
      style={style}
    >
      <UploadInput
        ref={inputRef}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileChange}
      />
      {drag ? (
        <DragUploadArea
          $disabled={disabled}
          accessibility={effectiveAccessibility}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {triggerContent}
          <Space direction="vertical" size="sm" style={{ marginTop: "8px" }}>
            <Text color="secondary">
              Arrastra archivos aquí o haz clic para seleccionar
            </Text>
          </Space>
        </DragUploadArea>
      ) : (
        <UploadButton
          $size={mappedSize}
          $drag={false}
          accessibility={effectiveAccessibility}
          onClick={handleClick}
        >
          {triggerContent}
        </UploadButton>
      )}
      {renderUploadList()}
    </UploadWrapper>
  );
};

// Upload.Dragger component (compatibilidad con Ant Design)
export const UploadDragger: React.FC<Omit<UploadProps, "drag">> = (props) => (
  <Upload {...props} drag={true} />
);

// Asignar Dragger a Upload usando extensión de interfaz
interface UploadWithDragger extends React.FC<UploadProps> {
  Dragger: typeof UploadDragger;
}

const UploadWithSubcomponents = Upload as unknown as UploadWithDragger;
UploadWithSubcomponents.Dragger = UploadDragger;

export default UploadWithSubcomponents;
