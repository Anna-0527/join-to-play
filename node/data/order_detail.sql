-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-04-29 03:04:27
-- 伺服器版本： 10.4.32-MariaDB
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
-- 資料表結構 `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `order_detail`
--

INSERT INTO `order_detail` (`id`, `product_id`, `order_id`, `qty`, `price`, `product_name`) VALUES
(1, 19, 27, 1, 390, '玄武門之變-太極篇'),
(2, 18, 27, 1, 1890, '我們來種菜吧!'),
(3, 16, 27, 1, 500, '風聲再臨'),
(4, 19, 28, 1, 390, '玄武門之變-太極篇'),
(5, 19, 29, 1, 390, '玄武門之變-太極篇'),
(6, 18, 29, 1, 1890, '我們來種菜吧!'),
(7, 16, 29, 1, 500, '風聲再臨'),
(8, 19, 30, 1, 390, '玄武門之變-太極篇'),
(9, 18, 30, 1, 1890, '我們來種菜吧!'),
(10, 16, 30, 1, 500, '風聲再臨'),
(11, 19, 31, 1, 390, '玄武門之變-太極篇'),
(12, 18, 31, 1, 1890, '我們來種菜吧!'),
(13, 16, 31, 1, 500, '風聲再臨'),
(14, 19, 32, 2, 390, '玄武門之變-太極篇'),
(15, 18, 32, 1, 1890, '我們來種菜吧!'),
(16, 16, 32, 1, 500, '風聲再臨'),
(17, 26, 33, 1, 351, '心算大師'),
(18, 27, 33, 1, 390, '動物農場'),
(19, 26, 34, 1, 351, '心算大師'),
(20, 27, 34, 1, 390, '動物農場'),
(21, 26, 35, 1, 351, '心算大師'),
(22, 27, 35, 1, 390, '動物農場');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
