-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-04-24 05:51:29
-- 伺服器版本： 8.0.35
-- PHP 版本： 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `join_to_play`
--

-- --------------------------------------------------------

--
-- 資料表結構 `booking_desk`
--

CREATE TABLE `booking_desk` (
  `sid` int NOT NULL,
  `member_id` int NOT NULL,
  `store_id` int NOT NULL,
  `store_name` varchar(100) NOT NULL,
  `booking_date` datetime NOT NULL,
  `booking_time` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `player_count` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `booking_desk`
--

INSERT INTO `booking_desk` (`sid`, `member_id`, `store_id`, `store_name`, `booking_date`, `booking_time`, `player_count`, `created_at`) VALUES
(1, 77, 15, '安捷尼桌遊', '2021-02-24 10:00:00', '3', 6, '2021-02-17 23:24:25'),
(2, 2, 60, '貓咪貓咪G3', '2021-09-06 11:00:00', '2', 3, '2021-08-30 23:30:49'),
(3, 69, 19, '桌遊地下城', '2023-01-12 13:30:00', '4', 5, '2023-01-05 20:37:07'),
(4, 22, 52, '龍窟桌遊', '2023-07-12 10:30:00', '2', 5, '2023-07-05 18:27:06'),
(5, 89, 32, '貓腳印', '2023-11-28 13:30:00', '4', 7, '2023-11-09 19:02:45'),
(6, 71, 46, 'Palette 派樂地', '2020-05-06 13:30:00', '4', 4, '2020-04-24 19:30:21'),
(7, 42, 45, '貳家桌遊店', '2023-05-07 14:30:00', '2', 8, '2021-05-06 02:07:24'),
(8, 27, 91, '陽光桌遊世界', '2021-07-30 18:00:00', '3', 3, '2021-07-23 21:31:00'),
(9, 14, 3, '桌遊侍', '2023-07-03 18:00:00', '3', 3, '2023-06-26 21:01:49'),
(10, 86, 73, '時光森林', '2022-03-03 14:00:00', '3', 4, '2022-02-24 23:55:27'),
(11, 43, 94, 'UMOOSE遊慕思桌遊', '2022-05-08 10:30:00', '2', 2, '2022-05-01 19:11:41'),
(12, 48, 49, 'AToMic 原子複合式桌遊店', '2024-01-10 13:30:00', '4', 7, '2024-01-03 23:27:33'),
(13, 7, 80, '動桌遊', '2022-04-15 14:30:00', '3', 9, '2022-04-08 20:54:10'),
(14, 25, 10, 'Open開房間桌遊餐館', '2023-02-09 10:00:00', '3', 4, '2023-02-02 22:41:32'),
(15, 36, 35, '桌遊糖果城', '2022-02-12 10:00:00', '2', 4, '2022-02-05 19:30:42'),
(16, 39, 87, '漫果子桌遊', '2022-08-12 11:00:00', '2', 5, '2022-08-05 21:47:32'),
(17, 31, 26, '桌遊老爹', '2020-06-08 13:30:00', '3', 8, '2020-06-02 00:38:36'),
(18, 80, 70, '奧特狐桌遊店', '2020-03-07 16:30:00', '1', 3, '2020-02-29 19:59:42'),
(19, 54, 62, '卡卡城', '2021-03-08 13:30:00', '4', 6, '2021-03-01 20:19:49'),
(20, 17, 9, 'DeRoot休閒空間', '2020-06-10 14:30:00', '2', 7, '2020-06-04 00:36:52'),
(21, 19, 64, '桌遊故事屋', '2023-01-16 11:00:00', '2', 7, '2023-01-09 23:37:36'),
(22, 18, 4, '漫果子桌遊主題餐廳', '2023-11-28 13:00:00', '4', 11, '2023-11-19 16:30:48'),
(23, 82, 7, '大安殿益智遊戲館', '2021-02-21 10:00:00', '3', 9, '2021-02-14 22:00:39'),
(24, 6, 23, '廢青集散地-桌遊俱樂部', '2023-05-07 13:30:00', '4', 10, '2023-05-04 20:10:45'),
(25, 67, 16, '饗玩俱樂部', '2024-01-25 18:00:00', '2', 8, '2024-01-19 00:42:54'),
(26, 70, 13, '夢桌遊', '2023-08-08 15:00:00', '1', 6, '2023-08-02 02:30:57'),
(27, 60, 54, '桌遊盒子', '2023-07-20 18:00:00', '3', 8, '2023-07-13 18:37:37'),
(28, 57, 76, '小桌弄·兒童桌遊', '2022-09-09 18:00:00', '3', 3, '2022-09-03 02:23:55'),
(29, 85, 43, '有堅桌遊店', '2020-05-24 18:00:00', '3', 6, '2020-05-17 23:29:50'),
(30, 94, 25, '萊思樂桌上遊戲', '2020-04-15 13:30:00', '4', 4, '2020-04-09 01:44:59');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `booking_desk`
--
ALTER TABLE `booking_desk`
  ADD PRIMARY KEY (`sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `booking_desk`
--
ALTER TABLE `booking_desk`
  MODIFY `sid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
