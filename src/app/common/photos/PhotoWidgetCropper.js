import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const PhotoWidgetCropper = ({ imagePreview, setImage }) => {
  const cropperRef = useRef(null);

  function cropImage() {
    if (typeof cropperRef.current.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
      setImage(blob);
    }, "image/jpeg");
  }

  return (
    <Cropper
      ref={cropperRef}
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  );
};

export default PhotoWidgetCropper;
