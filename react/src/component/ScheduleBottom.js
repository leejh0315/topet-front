import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styles from "../css/schedule_bottom.module.css";
import "dayjs/locale/ko";
import BottomSheet from "../component/BottomSheet";

dayjs.extend(localizedFormat);
dayjs.locale("ko");

const ScheduleBottom = ({ schedules, selectedDate }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState(null);

  const getSchedule = useCallback(
    (date) => {
      const day = schedules.filter((schedule) =>
        dayjs(schedule.date).isSame(date, "day")
      );
      return day.length > 0 ? day : [];
    },
    [schedules]
  );

  const handleScheduleClick = (schedule, date) => {
    setBottomSheetContent({ ...schedule, date });
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const dayformatter = dayjs(selectedDate).format("YYYY년 MM월 DD일 (ddd)");

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
                  style={{ backgroundColor: item.schedule.color }}
                  onClick={() => handleScheduleClick(item.schedule, item.date)}
                >
                  {item.schedule.title}
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
