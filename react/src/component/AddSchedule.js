import React, { useState } from "react";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../component/Button";
import ko from "date-fns/locale/ko";
import SchedulePhotoSelectArea from "../component/SchedulePhotoSelectArea";
import axios from "axios";
import styles from "../css/addSchedule.module.css";

registerLocale("ko", ko);

export default function AddSchedule({ selectedDate, onClose }) {
  const initialDate = dayjs(selectedDate).isValid() ? selectedDate : new Date();
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(initialDate);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [color, setColor] = useState("#000000");

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (dayjs(date).isAfter(endDate)) {
      setEndDate(date);
    }
  };

  const handleAllDay = () => {
    const startOfDay = dayjs(startDate).startOf("day").toDate();
    const endOfDay = dayjs(startDate).endOf("day").toDate();
    setStartDate(startOfDay);
    setEndDate(endOfDay);
    setIsAllDay(!isAllDay);
  };

  const handleCompletionChange = (event) => {
    setIsComplete(event.target.value === "완료");
  };

  const handlePhotoSelected = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
  };

  const postScheduleData = async () => {
    const formData = new FormData();

    formData.append(
      "startDate",
      dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss")
    );
    formData.append("endDate", dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss"));
    formData.append("scheduleTitle", title);
    formData.append("scheduleContent", content);
    formData.append("isComplete", isComplete);
    formData.append("color", color);
    formData.append("scheduleWriter", "WriterName");
    formData.append("scheduleEditer", "EditorName");

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post("/api/schedule/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("서버 오류:", error);
    }
  };

  const postSchedulePhoto = async () => {
    if (!selectedPhoto) return;

    const formData = new FormData();
    formData.append("photo", selectedPhoto);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post("/api/schedule/postPhoto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("서버 오류:", error);
    }
  };

  const handleButtonClick = async () => {
    try {
      await postScheduleData();
      await postSchedulePhoto();
      onClose(); // 두 요청 모두 성공 후 onClose 호출
    } catch (error) {
      console.error("스케줄 저장 중 오류 발생:", error);
    }
  };

  return (
    <div className={styles.AddScheduleWrap}>
      <input
        className={styles.ScheduleTitle}
        type="text"
        name="title"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.DataSelectArea}>
        <span>일정</span>
        <div className={styles.DatepickerBoxWrap}>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
            className={styles.DatepickerBox}
          />
          {!isAllDay && (
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className={styles.TimepickerBox}
              />
            </div>
          )}
        </div>
        <div> - </div>
        <div className={styles.DatepickerBoxWrap}>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            minDate={startDate}
            locale="ko"
            openToDate={startDate}
            dateFormat="yyyy년 MM월 dd일"
            className={styles.DatepickerBox}
          />
          {!isAllDay && (
            <div>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className={styles.TimepickerBox}
              />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleAllDay}
          className={isAllDay ? styles.AlldayBtn : styles.AlldayBtnReverse}
        >
          하루 종일
        </button>
      </div>
      <div>
        <span>완료여부</span>
        <input
          type="radio"
          name="chk_info"
          value="완료"
          onChange={handleCompletionChange}
          checked={isComplete}
        />{" "}
        완료
        <input
          type="radio"
          name="chk_info"
          value="미완료"
          onChange={handleCompletionChange}
          checked={!isComplete}
        />{" "}
        미완료
      </div>
      <div>
        <span>색상</span>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div>
        <span>메모</span>
        <input
          type="text"
          name="memo"
          placeholder="메모를 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <span>사진</span>
      <SchedulePhotoSelectArea
        selectedPhoto={selectedPhoto}
        onPhotoSelected={handlePhotoSelected}
        onRemovePhoto={handleRemovePhoto}
      />
      <Button
        type="submit"
        text="완료"
        btnstyle="orange"
        postServer_withoutPhotos={postScheduleData}
        postServer_withPhotos={postSchedulePhoto}
        onClick={handleButtonClick}
      />
    </div>
  );
}
