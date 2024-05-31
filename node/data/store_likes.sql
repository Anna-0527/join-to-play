-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-04-24 05:52:46
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
-- 資料表結構 `store_likes`
--

CREATE TABLE `store_likes` (
  `sid` int NOT NULL,
  `store_sid` int NOT NULL,
  `member_sid` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `store_likes`
--

INSERT INTO `store_likes` (`sid`, `store_sid`, `member_sid`, `created_at`) VALUES
(49, 26, 3, '2024-04-18 03:10:40'),
(50, 27, 3, '2024-04-18 03:10:40');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `store_likes`
--
ALTER TABLE `store_likes`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `product_sid` (`store_sid`),
  ADD KEY `member_sid` (`member_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `store_likes`
--
ALTER TABLE `store_likes`
  MODIFY `sid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
