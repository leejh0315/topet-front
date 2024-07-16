import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../component/TopBar";
import Title from "../component/Title";
import Content from "../component/Content";
import AnimalSelect from "../component/AnimalProfileComp/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import "../css/bottomsheet.css";
import PhotoSelectArea from "../component/PhotoSelectComp/PhotoSelectArea";
import Button from "../component/ButtonComp/Button";
import communityApi from "../api/communityApi";
import CheckModal from "../component/CheckModal";

const CommunityWrite = () => {
  const navigate = useNavigate();

  const [selectedPet, setSelectedPet] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);

  const [showWriteCancleModal, setShowWriteCancleModal] = useState(false);
  const [showWriteNullCheckModal, setShowWriteNullCheckModal] = useState(false);

  const handleTitleTextChange = (e) => {
    setTitleText(e.target.value);
  };

  const handleContentTextChange = (e) => {
    setContentText(e.target.value);
  };

  const handlePhotosSelected = (photos) => {
    const newPhotos = photos.filter(
      (photo) =>
        !selectedPhotos.some(
          (selectedPhoto) => selectedPhoto.name === photo.name
        )
    );
    const updatedPhotos = [...selectedPhotos, ...newPhotos].slice(0, 5);

    setSelectedPhotos(updatedPhotos);
  };

  const handleRemovePhoto = (index) => {
    setSelectedPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };


  const handleSubmit = () => { // 서버 전송 함수
    const formData = new FormData();
    formData.append("title", titleText)
    formData.append("content", contentText);
    //여기에 카테고리랑, 해시태그 보내는 거 적어야 함.
    communityApi.postCommunity(selectedPhotos, formData);
    
  };

  const handleBottomSheetOpen = (type) => {
    setBottomSheetType(type);
    setShowBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setShowBottomSheet(false);
  };

  const isSubmitDisabled = !titleText || !contentText;

  const handleShowCheckModal = () => {
    setShowWriteCancleModal(true);
  };

  const handleShowNullCheckModal = () => {
    setShowWriteNullCheckModal(true);
  };

  const handleCloseCancleModal = () => {
    setShowWriteCancleModal(false);
  };

  const handleNullCheckModal = () => {
    setShowWriteNullCheckModal(false);
  };

  const handleWriteCancleModal = () => {
    setShowWriteCancleModal(false);
    navigate(-1);
  };

  console.log('------------------------')
  console.log('제목 : ',titleText)
  console.log('본문 : ',contentText)
  console.log('사진 : ',selectedPhotos)
  console.log('------------------------')

  return (
    <div>
      <TopBar />
      {/* <AnimalSelect
        onClick={() => handleBottomSheetOpen("pet")}
        selectedPet={selectedPet}
      /> */}
      <Title value={titleText} handleTitleTextChange={handleTitleTextChange} />
      <Content
        value={contentText}
        handleContentTextChange={handleContentTextChange}
      />
      <br />
      <PhotoSelectArea
        selectedPhotos={selectedPhotos}
        onPhotosSelected={handlePhotosSelected}
        onRemovePhoto={handleRemovePhoto}
        cnt={5}
      />
      <br />
      {/* 해시태그 자리 */}
      <div>
        <Button text={"취소"} btnstyle="white" onClick={handleShowCheckModal} />
        <Button text={"작성 완료"} btnstyle="white" onClick={isSubmitDisabled ? handleShowNullCheckModal : handleSubmit} />
      </div>
      {showWriteCancleModal &&
        (
          <CheckModal
            Content="게시물 작성을 취소하시겠어요?"
            CancleBtnContent="작성 취소"
            ContinueBtnContent="계속 작성"
            onClose={handleWriteCancleModal}
            onContinue={handleCloseCancleModal}
          />
        )}
        {showWriteNullCheckModal &&
        (
          <CheckModal
            Content="제목, 본문, 해시태그는 필수 항목입니다."
            onClose={handleNullCheckModal}
            oneBtn={true}
          />
        )}
      <BottomSheet
        show={showBottomSheet}
        onClose={handleBottomSheetClose}
        type={bottomSheetType}
        setSelectedPet={setSelectedPet}
        selectedDate={new Date()}
      />
    </div>
  );
};

export default CommunityWrite;
