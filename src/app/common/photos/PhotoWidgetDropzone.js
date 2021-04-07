import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";

const PhotoWidgetDropzone = ({ setFiles }) => {
  const dropzoneStyles = {
    border: "dashed 3px #eee",
    borderRadius: "5%",
    margin: "10px",
    padding: "13px",
    textAlign: "center",
  };

  const dropzoneActiveStyles = {
    border: "dashed 3px green",
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? { ...dropzoneStyles, ...dropzoneActiveStyles }
          : dropzoneStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  );
};

export default PhotoWidgetDropzone;
