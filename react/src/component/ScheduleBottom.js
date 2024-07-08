import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styles from "../css/schedule_bottom.module.css";
import "dayjs/locale/ko";
import BottomSheet from "../component/BottomSheet";

import { GoCircle } from "react-icons/go";

import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale("ko");

const ScheduleBottom = ({ schedules, selectedDate }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState(null);

  const getSchedule = useCallback(
    (date) => {
      const day = schedules.filter((schedule) => {
        const start = dayjs(schedule.startDate);
        const end = dayjs(schedule.endDate);
        const targetDate = dayjs(date);

        return targetDate.isBetween(start, end, "day", "[]");
      });

      return day.length > 0 ? day : [];
    },
    [schedules]
  );

  const handleScheduleClick = (schedule) => {
    setBottomSheetContent(schedule);
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const dayformatter = dayjs(selectedDate, "YYYY/MM/DD").format(
    "YYYY년 MM월 DD일 (ddd)"
  );

  return (
    <div className={styles.ScheduleContainer}>
      {dayformatter && (
        <div className={styles.ScheduleWrap}>
          <p className={styles.SelectedDate}>{dayformatter}</p>
          <div className={styles.ScheduleBoxWrap}>
            {getSchedule(selectedDate).length > 0 ? (
              getSchedule(selectedDate).map((item, index) => (
                <div
                  className={styles.ScheduleBox}
                  key={index}
                  style={{ backgroundColor: item.color }}
                  onClick={() => handleScheduleClick(item)}
                >
                  <div className={styles.ScheduleBoxContent}>
                    <div className={styles.ScheduleContent}>
                      <div className={styles.ScheduleDate}>
                        {dayjs(item.startDate).format("h:mm a") ===
                          "12:00 오전" &&
                        dayjs(item.endDate).format("h:mm a") ===
                          "11:59 오후" ? (
                          "하루 종일"
                        ) : (
                          <>
                            {dayjs(item.startDate).format("h:mm a")} -{" "}
                            {dayjs(item.endDate).format("h:mm a")}
                          </>
                        )}
                      </div>
                      <div className={styles.ScheduleTitle}>
                        {item.scheduleTitle}
                      </div>
                    </div>
                    <div className={styles.ScheduleBoxCheckBox}>
                      <div className={styles.verticalDivider} />

                      {item.isComplete ? (
                        <IoCheckmarkCircleOutline color="#fff" size={28} />
                      ) : (
                        <GoCircle color="rgba(255, 255, 255, 0.3)" size={25} />
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.Noschedule}>일정이 없습니다.</p>
            )}
          </div>
        </div>
      )}
      {showBottomSheet && (
        <BottomSheet
          show={showBottomSheet}
          onClose={handleCloseBottomSheet}
          type="scheduleDetail"
          schedule={bottomSheetContent}
        />
      )}
    </div>
  );
};

export default ScheduleBottom;
