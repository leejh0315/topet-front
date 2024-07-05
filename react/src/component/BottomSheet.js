import React from "react";
import PetList from "./PetList";
import HashTagContent from "./HashTagContent";
import AddSchedule from "./AddSchedule";
import "../css/bottomsheet.css";

const BottomSheet = ({
  show,
  onClose,
  onSelectPet,
  type,
  onCompleteTags,
  initialTags,
  selectedDate,
  schedule,
}) => {
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
      default:
        return "";
    }
  }

  function getSheetContent(type) {
    switch (type) {
      case "pet":
        return <PetList onSelectPet={onSelectPet} />;
      case "tag":
        return (
          <HashTagContent
            onComplete={onCompleteTags}
            initialTags={initialTags}
          />
        );
      case "addSchedule":
        return <AddSchedule selectedDate={selectedDate} />;
      case "scheduleDetail":
        return schedule ? (
          <div>
            <h2>{schedule.title}</h2>
            <p>{schedule.content}</p>
            <p>Color: {schedule.color}</p>
            <p>Date: {schedule.date}</p>
          </div>
        ) : null;
      default:
        return "";
    }
  }

  return (
    <>
      {show && <div className="overlay" onClick={onClose}></div>}
      <div className={`bottom-sheet ${show ? "show" : ""}`}>
        <div className="bottom-sheet-title">{getTypeText(type)}</div>
        <div className="bottom-sheet-content">{getSheetContent(type)}</div>
      </div>
    </>
  );
};

export default BottomSheet;
