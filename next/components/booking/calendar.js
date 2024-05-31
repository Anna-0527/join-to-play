import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useRouter } from "next/router";
import {
  BOOKING_ESCAPE_DATETIME,
  BOOKING_ESCAPE_BookedSlots,
} from "@/components/config";
import toast from "react-hot-toast";

function getAllTimeSlots() {
  return ["10:00", "12:00", "14:00", "16:00", "18:00"];
}

const MyCalendar = ({ onNextStep, setFormData }) => {
  const router = useRouter();
  const [bookingDateData, setBookingDateData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
  });
  const [bookingSlotsData, setBookingSlotsData] = useState();
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);

  useEffect(() => {
    fetch(BOOKING_ESCAPE_DATETIME)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Booking DateTime Data:", data);
        setBookingDateData({ success: true, rows: data }); //將整個資料陣列作為 rows 的值
      })
      .catch((error) => {
        console.error("Error fetching booking_escape_dateTime data:", error);
      });

    // fetch(BOOKING_ESCAPE_BookedSlots)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Fetched bookedSlotsPerDate Data:", data);
    //     setBookingSlotsData(data);
    //   })
    //   .catch((error) => {
    //     console.error(
    //       "Error fetching booking_escape_bookedSlotsPerDate data:",
    //       error
    //     );
    //   });
  }, [router.query]);

  const closeTimeSlots = () => {
    setShowTimeSlots(false);
  };

  // 處理日期變化的函式
  const handleDateChange = (date) => {
    setShowTimeSlots(true);
    // 格式化日期為 "YYYY-MM-DD"
    const formattedSelectedDate = date
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");
    setSelectedDate(date);
    console.log("Selected date:", formattedSelectedDate);
    // 將所選日期添加到 formData 中
    setFormData((prevData) => ({
      ...prevData,
      booking_date: formattedSelectedDate,
    }));

    // 檢查所選日期是否存在已預定的日期中
    const bookedTimesForSelectedDate = bookingDateData.rows
      .filter((booking) => booking.booking_date === formattedSelectedDate)
      .map((booking) => booking.booking_time.substring(0, 5));
    setBookedTimes(bookedTimesForSelectedDate);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    console.log("Selected time:", time);
    // 將所選日期和時間添加到 formData 中
    setFormData((prevData) => ({ ...prevData, booking_time: time }));
  };

  // 處理表單提交事件
  const handleSubmit = (e) => {
    e.preventDefault();

    // 如果所選時間已被預定
    if (selectedTime && bookedTimesForSelectedDate.includes(selectedTime)) {
      return toast.error("該時段已被預訂，請重新選擇");
    }

    onNextStep();
    closeTimeSlots();
  };

  const alreadyBookedDate = () => {
    if (bookingDateData.rows) {
      return bookingDateData.rows.map((booking) => booking.booking_date);
    }
    return [];
  };

  const timeSlots = getAllTimeSlots();
  const bookedTimesForSelectedDate = bookedTimes;

  function getEndTime(startTime) {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endHours = hours + 1;
    const endTime = `${endHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return endTime;
  }

  const timeSlotElements = timeSlots.map((time) => {
    const isBooked = bookedTimesForSelectedDate.includes(time);
    return (
      <li
        key={time}
        onClick={() => handleTimeClick(time)}
        className={`timeSlots ${isBooked ? "alreadyBooked" : ""}`}
        tabIndex="0"
      >
        {`${time} - ${getEndTime(time)}`}{" "}
        {/* 這裡的 getEndTime 是你定義的取得結束時間的函式 */}
      </li>
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit} className="bookingCalendarDiv2">
        <div className="calendarTitle">預約日期</div>
        <div className="bookingCalendarDiv3">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date }) => {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const formattedDate = `${year}-${month}-${day}`;
              if (alreadyBookedDate().includes(formattedDate)) {
                return "alreadyBooked";
              } else {
                return "";
              }
            }}
          />
        </div>
        {showTimeSlots && (
          <div className="availableTimeSlots">
            <span className="close" onClick={closeTimeSlots}>
              &times;
            </span>
            <h4 className="timeSlotsTitle">可選時段</h4>
            <ul className="timeSlotsDiv">{timeSlotElements}</ul>
          </div>
        )}
        <div className="calendarBtnDiv">
          <button type="submit" className="calendarBtn">
            下一步
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyCalendar;
