-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-04-25 09:59:12
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
-- 資料表結構 `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- 傾印資料表的資料 `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`) VALUES
(1, '醜娃娃:八寶的餅乾', 351, '/images/product/list/p1.webp'),
(2, '實話實說2 ', 390, '/images/product/list/p2.webp'),
(3, 'Turing Machine', 1190, '/images/product/list/p3.webp'),
(4, '璀璨寶石 Splendor', 1400, '/images/product/list/p4.webp'),
(5, '甜點大胃王', 465, '/images/product/list/p5.webp'),
(6, '狐作非為 Outfoxed', 702, '/images/product/list/p6.webp'),
(7, '迴轉壽司 Sushi Go! ', 351, '/images/product/list/p7.webp'),
(8, '餅乾大戰', 450, '/images/product/list/p8.webp'),
(9, '醬醬三明治', 450, '/images/product/list/p9.webp'),
(10, '動物對對碰', 490, '/images/product/list/p10.webp'),
(11, '骰子街', 750, '/images/product/list/p14.webp'),
(12, '冰淇淋快手2.0', 465, '/images/product/list/p12.webp'),
(13, '蛋糕比薩捲餅帽', 308, '/images/product/list/p13.webp'),
(14, '妙語說書人', 888, '/images/product/list/p15.webp'),
(15, '三國殺標準版', 550, '/images/product/list/st1.webp'),
(16, '風聲再臨', 500, '/images/product/list/st3.webp'),
(17, '卡魯巴探險 Karuba Junior', 1480, '/images/product/list/st5.webp'),
(18, '我們來種菜吧!', 1890, '/images/product/list/st7.webp'),
(19, '玄武門之變-太極篇', 390, '/images/product/list/st8.webp'),
(20, '大五月花號', 1890, '/images/product/list/st9.webp'),
(21, '貓街', 750, '/images/product/list/st10.webp'),
(22, '村莊', 1890, '/images/product/list/st11.webp'),
(23, '詞彙捕手中文達人版', 690, '/images/product/list/edu1.webp'),
(24, '詞彙捕手英文達人版', 655, '/images/product/list/edu2.webp'),
(25, '邏輯九九 ', 351, '/images/product/list/edu3.webp'),
(26, '心算大師', 351, '/images/product/list/edu4.webp'),
(27, '動物農場', 390, '/images/product/list/edu5.webp');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
