import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from "next/router"
import { BOOKING_ESCAPE_DATETIME } from "@/components/config";

function getMonthDates(selectedYear, selectedMonth) {
    const startDate = new Date(selectedYear, selectedMonth - 1, 1); // 月份從 0 開始，所以要減 1
    const endDate = new Date(selectedYear, selectedMonth, 0); // 使用下個月的第0天作為本月的最後一天，會自動回到上個月的最後一天

    const datesArray = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        datesArray.push(new Date(date)); // 將每天的日期添加到陣列中
    }

    return datesArray;
}

function getAllTimeSlots() {
    return [
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00'
    ];
}

const MyCalendar = ({ onNextStep, setFormData }) => {

    const router = useRouter();

    const [bookingDateData, setBookingDateData] = useState({
        success: false,
        page: 0,
        totalPages: 0,
        rows: []
    });

    const [bookingDateTimeData, setBookingTimeData] = useState({
        success: false,
        page: 0,
        totalPages: 0,
        rows: []
    });

    useEffect(() => {
        // booking_escape table 的數據
        fetch(BOOKING_ESCAPE_DATETIME)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Booking DateTime Data:", data); // 檢查獲取的資料
                setBookingDateData({ success: true, rows: data }); // 將整個資料陣列作為 rows 的值
                setDataLoaded(true); // 當數據加載完成時，將 dataLoaded 設置為 true
                console.log("Booking DateTime Data Rows:", data.rows); // 檢查 bookingData.rows 的值
            })
            .catch((error) => {
                console.error('Error fetching booking_escape_dateTime data:', error);
            });
    }, [router.query]);

    const closeTimeSlots = () => {
        setShowTimeSlots(false);
    };

    // 定義日期和時間的狀態
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [showTimeSlots, setShowTimeSlots] = useState(false);
    const [bookedTimes, setBookedTimes] = useState([]);
    let bookingTimes = [];

    // 處理日期變化的函式
    const handleDateChange = (date) => {
        setShowTimeSlots(true);
        // 格式化日期為 "YYYY-MM-DD"
        const formattedSelectedDate = date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-');
        //setSelectedDate(formattedDate);
        console.log("Selected date:", formattedSelectedDate);
        // 將所選日期添加到 formData 中
        setFormData(prevData => ({ ...prevData, booking_date: formattedSelectedDate }));


        // 檢查所選日期是否存在於已預定的日期中
        // const alreadyBookedTime = bookingDateData.rows.map(booking => {
        //   if (booking.booking_date === formattedSelectedDate) {
        //     console.log("Formatted Booked Times:", booking.booking_time);
        //     return booking.booking_time;

        //     //   if (booking.booking_time === getAllTimeSlots()) {
        //     //     bookingTimes.push(true)
        //     //   }
        //     //   else 
        //   }
        // });
        // console.log(alreadyBookedTime);

        // 檢查所選日期是否存在已預定的日期中
        const bookedTimesForSelectedDate = bookingDateData.rows
            .filter(booking => booking.booking_date === formattedSelectedDate)
            .map(booking => booking.booking_time.substring(0, 5));

        const timeSlots = getAllTimeSlots();
        const bookedTimesForSelectedDates = bookedTimesForSelectedDate;

        const bookingTimes = timeSlots.map(item => {
            let isBooked = false;
            // 檢查當前時間槽是否已預訂
            bookedTimesForSelectedDates.forEach(bookingTime => {
                if (item === bookingTime) {
                    isBooked = true;
                }
            });
            return isBooked;
        });

        // 打印已預訂狀態
        console.log(bookingTimes);


        // // 更新已預定時間的狀態
        // setBookedTimes(bookedTimesForSelectedDate);
        // console.log(bookedTimesForSelectedDate);

        // const timeSlots = getAllTimeSlots();
        // const bookedTimesForSelectedDates = bookedTimesForSelectedDate;
        // timeSlots.map(item => {
        //   console.log(item);
        //   if (item === bookedTimesForSelectedDates) {
        //     console.log(true);
        //     // bookingTimes.push(true)

        //   }

        //   else {
        //     console.log(false)
        //     // bookingTimes.push(false)
        //   }
        // })
    };

    const handleTimeClick = (time) => {
        // 檢查所選時間是否已被預定
        // if () {
        //   // 如果已被預定，則不進行任何操作
        //   return;
        // }
        setSelectedTime(time);
        console.log("Selected time:", time);
        // 將所選日期和時間添加到 formData 中
        setFormData(prevData => ({ ...prevData, booking_time: time }));
    };


    // 處理表單提交事件
    const handleSubmit = (e) => {
        e.preventDefault();
        onNextStep();
        // 在這裡處理表單提交的邏輯，可以使用 selectedDate 和 selectedTime
        console.log("Formatted Selected Dates:", selectedDate);
        console.log("Formatted Selected Times:", selectedTime);
        closeTimeSlots();
    };

    const alreadyBookedDate = () => {
        if (bookingDateData.rows) {
            const formattedBookedDates = bookingDateData.rows.map(booking => {
                //console.log("Formatted Booked Dates:", booking.booking_date); // 輸出已預定的日期
                return booking.booking_date; // 將預定的日期轉換為相同的格式
            });
            return formattedBookedDates
        }
        return []
    }



    // const alreadyBooked = ({ date }) => {
    //   if (bookingDateData.rows) {
    //     const formattedBookedDates = bookingDateData.rows.map(booking => {
    //       const bookedDate = new Date(booking.booking_date);

    //       return bookedDate.toLocaleString().split(' ')[0].replace("/", "-"); // 將預定的日期轉換為相同的格式
    //     });
    //     console.log("Formatted Booked Dates:", formattedBookedDates); // 輸出已預定的日期


    //     if (typeof date === 'string') {
    //       date = new Date(date); // 將字串轉換為日期對象
    //     }

    //     if (date instanceof Date && !isNaN(date)) { // 確認是有效的日期對象
    //       if (formattedBookedDates.includes(date.toLocaleString().split(' ')[0].replace("/", "-"))) {
    //         if (bookingTimeData.rows) {
    //           const formattedBookedTimes = bookingTimeData.rows.map(timeBooking => {
    //             return timeBooking.booking_time.substring(0, 5); // 取得時間的前5個字元，即開始時間
    //           });
    //           console.log("Formatted Booked Times:", formattedBookedTimes); // 輸出已預定的時間

    //           const allTimeSlots = getAllTimeSlots(); // 調用函式獲取所有可選時段
    //           if (formattedBookedTimes.some(time => allTimeSlots.includes(time))) {
    //             return true; // 如果時間已預定，則禁用它
    //           }
    //         }
    //       }
    //     }
    //   }
    //   // 允許選擇日期
    //   return false;
    // };


    return (
        <div>
            <form onSubmit={handleSubmit} className='bookingCalendarDiv2'>
                <div className='calendarTitle'>預約日期</div>
                {/* 日曆元件 */}
                <div className='bookingCalendarDiv3'>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileClassName={({ date }) => {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                            const formattedDate = `${year}-${month}-${day}`;
                            //console.log(formattedDate); // 输出类似 "2024-04-27"

                            if (alreadyBookedDate().includes(formattedDate)) {
                                return 'alreadyBooked'
                            } else { return '' }
                        }}
                    // tileClassName={({ date }) => (
                    //   alreadyBookedDate({ date }) ? 'alreadyBooked' : ''
                    // )}
                    />

                </div>
                {/* 可選時段 */}
                {showTimeSlots && (
                    <div className='availableTimeSlots'>
                        <span className='close' onClick={closeTimeSlots} >&times;</span>
                        <h4 className='timeSlotsTitle'>可選時段</h4>
                        <ul className='timeSlotsDiv'>
                            <li key={index} onClick={() => handleTimeClick('10:00')} className={`timeSlots ${bookingTimes[index] ? 'alreadyBooked' : ''}`} tabIndex="0">10:00 - 11:00</li>
                            <li key={index} onClick={() => handleTimeClick('12:00')} className={`timeSlots ${bookingTimes[index] ? 'alreadyBooked' : ''}`} tabIndex="0">12:00 - 13:00</li>
                            <li key={index} onClick={() => handleTimeClick('14:00')} className={`timeSlots ${bookingTimes[index] ? 'alreadyBooked' : ''}`} tabIndex="0">14:00 - 15:00</li>
                            <li key={index} onClick={() => handleTimeClick('16:00')} className={`timeSlots ${bookingTimes[index] ? 'alreadyBooked' : ''}`} tabIndex="0">16:00 - 17:00</li>
                            <li key={index} onClick={() => handleTimeClick('18:00')} className={`timeSlots ${bookingTimes[index] ? 'alreadyBooked' : ''}`} tabIndex="0">18:00 - 19:00</li>
                        </ul>
                    </div>
                )}
                {/* 下一步按鈕 */}
                <div className='calendarBtnDiv'><button type="submit" className='calendarBtn'>下一步</button></div>

            </form>
        </div>
    );
};

export default MyCalendar;
