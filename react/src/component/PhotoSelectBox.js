import React, { useRef } from 'react';
import { FaCamera } from "react-icons/fa";
import '../css/photo_select.css';

const PhotoSelectBox = ({ onPhotosSelected, selectedPhotoCount }) => {
  const fileInputRef = useRef(null);

  const photoSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file =>
      (file.type === 'image/jpeg' || file.type === 'image/png')
    );

    
    onPhotosSelected(validFiles);

    event.target.value = null;
  };

  return (
    <div className='photo-select-box' onClick={photoSelect}>
      <FaCamera className='camera-icon' />
      <span>({selectedPhotoCount}/10)</span>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*" //나중에 쇼츠로 동영상만 받아 올 때는 "video/*"로 하면 동영상만 받아올 수 있음 이것도 역시 모바일에서 갤러리 열림
        multiple
      />
    </div>
  );
};

export default PhotoSelectBox;
