import React, { useState } from 'react';
import TopBar from '../component/TopBar';
import Title from '../component/Title';
import Content from '../component/Content';
import AnimalSelect from '../component/AnimalSelect';
import BottomSheet from '../component/BottomSheet';
import HashTag from '../component/HashTag';
import PhotoSelectBox from '../component/PhotoSelectBox';
import '../css/bottomsheet.css'

const CommunityWrite = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleOpenPetBottomSheet = () => {
    setBottomSheetType('pet');
    setShowBottomSheet(true);
  };

  const handleOpenTagBottomSheet = () => {
    setBottomSheetType('tag');
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    handleCloseBottomSheet();
  };

  const handleCompleteTags = (requiredTag, optionalTags) => {
    setSelectedTags([requiredTag, ...optionalTags]);
    handleCloseBottomSheet();
  };

  return (
    <div>
      <TopBar />
      <AnimalSelect onClick={handleOpenPetBottomSheet} selectedPet={selectedPet} />
      <div style={{ height: '10px' }}></div>
      <Title />
      <div style={{ height: '20px' }}></div>
      <Content />
      <br />
      <PhotoSelectBox />
      <br />
      <HashTag onClick={handleOpenTagBottomSheet} selectedTags={selectedTags} />
      {showBottomSheet && (
        <div className="overlay" onClick={handleCloseBottomSheet}></div>
      )}
      <BottomSheet
        show={showBottomSheet}
        onClose={handleCloseBottomSheet}
        onSelectPet={handleSelectPet}
        type={bottomSheetType}
        onCompleteTags={handleCompleteTags}
      />
    </div>
  );
}

export default CommunityWrite;
