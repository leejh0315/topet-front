import React from "react";
import PetList from "./AnimalProfileComp/PetList";
import AddSchedule from "./CalendarComp/AddSchedule";
import ScheduleDetail from "./CalendarComp/ScheduleDetail";
import EditDeleteBottomSheet from "./SubBottomSheet";
import ScheduleEdit from "./CalendarComp/ScheduleEdit";
import MapPlaceList from "./MapComp/MapPlaceList";
import "../css/bottomsheet.css";
import HashTagContent from "./HashTagComp/HashTagContent";
import RegisterMyPetBottomSheet from "../component/MyPageComp/RegisterMyPetBottomSheet";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedPet } from "../redux/reducers/selectedPetReducer";
const BottomSheet = ({
  show,
  onClose,
  type,
  selectedDate,
  selectedPet,
  schedule,
  initialAddScheduleValues,
  setSelectedPet,
  onDotsClick,
  onEditClick,
  selectedSchedule,
  handleCompleteTags,
  initialSelectedCategory,
  initialSelectedHashTag,
  setSelectedSearchType,
  setScheduleSubmittedSuccessfully,
  scheduleSubmittedSuccessfully,
  handleOpenInputPetCodeModal,
  searchResult, //지도검색결과
  moveLatLng, //지도이동함수
  setSelectedMarker, //지도마커표시관련
  setSelectedPlace,
  keyword,
}) => {
  const dispatch = useDispatch();
  const handleCloseBottomSheet = () => {
    onClose();
  };

  const handleSelectPet = (pet) => {
    console.log("bottomSheet에서 출력한 Pet : " ,pet);
    setSelectedPet(pet);
    dispatch(updateSelectedPet)
    handleCloseBottomSheet();
  };

  const handleSelectSearchType = (type) => {
    setSelectedSearchType(type);
    handleCloseBottomSheet();
    console.log(type);
  };

  function getTypeText(type) {
    switch (type) {
      case "pet":
        return "반려동물 선택";
      case "tag":
        return "태그 선택";
      case "addSchedule":
        return "일정 등록";
      case "scheduleDetail":
        return "일정 상세";
      case "map":
        return "'" + keyword + "'" + " 검색결과";
      case "editSchedule":
        return "일정 수정";
      case "강아지":
      case "고양이":
      case "특수동물":
        return "게시판 선택";
      case "검색":
        return "검색";
      case "petRegister":
        return "등록";
      default:
        return "";
    }
  }

  function getSheetContent(type) {
    switch (type) {
      case "pet":
        return <PetList onSelectPet={handleSelectPet} />;
      case "tag":
        return (
          <HashTagContent
            show={show}
            initialSelectedCategory={initialSelectedCategory}
            initialSelectedHashTag={initialSelectedHashTag}
            handleCompleteTags={handleCompleteTags}
          />
        );
      case "addSchedule":
        return (
          <AddSchedule
            selectedDate={selectedDate}
            onClose={handleCloseBottomSheet}
            initialValues={initialAddScheduleValues}
            scheduleSubmittedSuccessfully={scheduleSubmittedSuccessfully}
            setScheduleSubmittedSuccessfully={setScheduleSubmittedSuccessfully}
            selectedPet={selectedPet}
          />
        );
      case "scheduleDetail":
        return (
          <ScheduleDetail
            onDotsClick={onDotsClick}
            selectedSchedule={selectedSchedule}
          />
        );
      case "editDelete":
        return (
          <EditDeleteBottomSheet
            show={true}
            onClose={handleCloseBottomSheet}
            onEditClick={onEditClick}
          />
        );
      case "editSchedule":
        return (
          <ScheduleEdit
            selectedSchedule={selectedSchedule}
            onClose={handleCloseBottomSheet}
          />
        );
      case "map":
        return (
          <MapPlaceList
            searchResult={searchResult}
            moveLatLng={moveLatLng}
            onClose={handleCloseBottomSheet}
            setSelectedMarker={setSelectedMarker}
            setSelectedPlace={setSelectedPlace}
          />
        );
      case "강아지":
      case "고양이":
      case "특수동물":
        return (
          <div className="bottom_sheet_buttons">
            <button
              className="bottom_sheet_button"
              onClick={() => handleSelectPet("강아지")}
            >
              강아지
            </button>
            <button
              className="bottom_sheet_button"
              onClick={() => handleSelectPet("고양이")}
            >
              고양이
            </button>
            <button
              className="bottom_sheet_button"
              onClick={() => handleSelectPet("특수동물")}
            >
              특수동물
            </button>
          </div>
        );
      case "검색":
        return (
          <div className="bottom_sheet_buttons">
            <button
              className="bottom_sheet_button"
              onClick={() => handleSelectSearchType("제목+본문")}
            >
              제목+본문
            </button>
            <button
              className="bottom_sheet_button"
              onClick={() => handleSelectSearchType("해시태그")}
            >
              해시태그
            </button>
          </div>
        );
      case "petRegister":
        return (
          <div>
            <RegisterMyPetBottomSheet
              handleOpenInputPetCodeModal={handleOpenInputPetCodeModal}
            />
          </div>
        );
      default:
        return "";
    }
  }

  return (
    <>
      {show && <div className="overlay" onClick={handleCloseBottomSheet}></div>}
      <div className={`bottom_sheet ${show ? "show" : ""}`}>
        <div className="bottom_sheet_title">{getTypeText(type)}</div>
        <div className="bottom_sheet_content">{getSheetContent(type)}</div>
      </div>
    </>
  );
};

export default BottomSheet;
