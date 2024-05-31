-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-04-17 11:16:10
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
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` text NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `tag_id` tinyint DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`id`, `username`, `nickname`, `mobile`, `password`, `birthday`, `email`, `gender`, `address`, `tag_id`, `created_at`, `updated_at`) VALUES
(1, '王小明', '小明', '0987654321', '$2y$10$6R/CH9TavH.hy.uyVBGNXO6FKK15sEgtZ2qF17kSo9oQdj7mRjBa.', '1990-05-20', 'wangxiaoming@example.com', '男', '台北市信義區忠孝東路五段123號', 3, '2024-04-17 02:51:51', '2024-04-17 02:51:51'),
(2, '張大雄', '大雄', '0923456789', '$2b$10$hU1kqJURbIFdRT47zzkdruzFiA83gUn1UxSP.HpWlalORH8LOGW8u', '1988-12-10', 'zhangdaxiong@example.com', '男', '台中市西屯區惠中路三段789號', 1, '2024-04-17 02:52:00', '2024-04-17 02:52:00'),
(3, '陳美麗', '美麗', '0912345678', '$2b$10$t7aE/mp8QYQthztZhSAOM.ZLK8yX.qTGUx3LwnkFth5eAfx5cu3KC', '1985-09-15', 'chenmeili@example.com', '女', '新北市板橋區文化路二段456號', 5, '2024-04-17 02:52:12', '2024-04-17 02:52:12'),
(4, '林小芬', '小芬', '0934567890', '$2b$10$lCFYPnUm.VV3r4KBVzmFxe0qS.zo0U3OVz5AGCfQU3QRFs0Z493Ma', '1992-07-25', 'linxiaofen@example.com', '女', '高雄市前鎮區中山三路一段234號', 4, '2024-04-17 02:52:28', '2024-04-17 02:52:28'),
(5, '吳政宏', '政宏', '0967890123', '$2b$10$gq1DAVARVy0Ld5pvJ6o8XOgrn2bnbVjUyFLbgLVVkehZNICGMloQO', '1979-11-30', 'wuzhenghong@example.com', '男', '基隆市中正區和平路四段678號', 6, '2024-04-17 02:52:33', '2024-04-17 02:52:33'),
(6, '黃美玲', '美玲', '0956789012', '$2b$10$R02IOXPwayQbA6MJ4KSCZ.qPIyDtF5fGN8.jG2Rkk9Y935Rsdu7/q', '1983-03-05', 'huangmeiling@example.com', '女', '台南市東區自由路一段567號', 2, '2024-04-17 02:52:38', '2024-04-17 02:52:38'),
(7, '蔡美娟', '美娟', '0978901234', '$2b$10$uLGmZVkTsWs0cvSuO2g7g.lcmytnVyUSDTOcW4fnOkZcZcNleUa9y', '1995-08-18', 'caimeijuan@example.com', '女', '桃園市中壢區龍潭路五段789號', 1, '2024-04-17 02:52:43', '2024-04-17 02:52:43'),
(8, '許志明', '志明', '0989012345', '$2b$10$Ifmltv/tywRfhTXpXFTA1.012ObXphDbniqEz5pAlO2jqNTelT0Fy', '1986-04-22', 'xuzhiming@example.com', '男', '新竹市東區關新五路六段890號', 5, '2024-04-17 02:52:48', '2024-04-17 02:52:48'),
(9, '鄭惠文', '惠文', '0912345678', '$2b$10$gSVDuFXbZrDnzpEu4xIs4.FpHMQfWTtOdqnDiJ.pCNqxQblo8Y.3y', '1990-09-03', 'zhenghuiwen@example.com', '女', '苗栗縣頭份市中山路七段1234號', 3, '2024-04-17 02:52:52', '2024-04-17 02:52:52'),
(10, '邱雅婷', '雅婷', '0923456789', '$2b$10$.Hinrgbj98n0NxDnYkHKzO3mHNV513QMoo0abBjX5GrBaz9UN9faS', '1987-12-15', 'qiuyating@example.com', '女', '彰化縣彰化市中山路八段5678號', 2, '2024-04-17 02:52:57', '2024-04-17 02:52:57'),
(11, '鄭文彬', '文彬', '0934567890', '$2b$10$dMmiya9JOiG0EVVHZFYr4ufv4.8BFrD1N/JBo9DLC5ZIVcikeVrR2', '1984-06-20', 'zhengwenbin@example.com', '男', '南投縣南投市中興路九段2345號', 6, '2024-04-17 02:53:01', '2024-04-17 02:53:01'),
(12, '蕭雅琪', '雅琪', '0956789012', '$2b$10$j4poHzdZnwilWdiL.g830uFJ8buIzLeZL7zXtDVzWw34QE75HFvza', '1993-05-08', 'xiaoyaqi@example.com', '女', '新竹市東區中正路一段6789號', 4, '2024-04-17 02:53:09', '2024-04-17 02:53:09'),
(13, '劉大偉', '大偉', '0967890123', '$2b$10$1z/tfG7wJwfspQIuB6XhD..EdMdDWMYsVhtXK51/qMYJzdwQtzaiy', '1980-10-12', 'liudawei@example.com', '男', '嘉義市東區文化路二段8901號', 1, '2024-04-17 02:53:14', '2024-04-17 02:53:14'),
(14, '林小君', '小君', '0978901234', '$2b$10$9rJv5nVTop0oeb0bpn09K.QHSzCciegsqz6w20C/i0C36GKgNrYnK', '1996-03-25', 'linxiaojun@example.com', '女', '屏東縣屏東市中山路十段2345號', 5, '2024-04-17 02:53:24', '2024-04-17 02:53:24'),
(15, '吳大達', '大達', '0989012345', '$2b$10$zAmo2A.407TjrLuD.yiGIek4LS5dlupSJMJGyczM1QUxmptXoApwa', '1982-11-08', 'wudadada@example.com', '男', '宜蘭縣宜蘭市民族路一段3456號', 2, '2024-04-17 02:53:35', '2024-04-17 02:53:35'),
(16, '何小文', '小文', '0912345678', '$2b$10$Uy/sCaqFKmwXOfbMnC.WOejzeymYVLFYaIdsJCfw32Qlx04SEDcp2', '1991-07-20', 'hexiaowen@example.com', '女', '花蓮縣花蓮市中山路二段7890號', 6, '2024-04-17 02:53:38', '2024-04-17 02:53:38'),
(17, '吳大政', '大政', '0923456789', '$2b$10$b/RKczQC5dk.HSbc8iFNQ.zEDxvBIjVSMHrpLitfee3EWlVfsXyz2', '1989-02-05', 'wudazheng@example.com', '男', '澎湖縣馬公市中正路三段12345號', 3, '2024-04-17 02:53:42', '2024-04-17 02:53:42'),
(18, '林小玲', '小玲', '0934567890', '$2b$10$V3pw7vPhzYGD/Ota8rzD7eEhXUYrl1v2lowvCiptj4xcbnqsQ8JAi', '1994-09-18', 'linxiaoling@example.com', '女', '金門縣金城鎮中山路四段67890號', 1, '2024-04-17 02:53:46', '2024-04-17 02:53:46'),
(19, '洪大翰', '大翰', '0956789012', '$2b$10$x4WlqU9mHz6CNX5m5Kd3NOMy.KUyfk755v8OE2VPaeAJpT06iKFjm', '1981-04-30', 'hongdahan@example.com', '男', '連江縣南竿鄉中正路五段12345號', 4, '2024-04-17 02:53:51', '2024-04-17 02:53:51'),
(20, '翁小慧', '小慧', '0967890123', '$2b$10$xvvCSujVj6/KycKcV4Rtfu9GT2BbLWo7vRZI.tTWCSyklzBGZZFTO', '1985-12-15', 'wengxiaohui@example.com', '女', '東沙群島東沙島村中山路六段67890號', 2, '2024-04-17 02:53:57', '2024-04-17 02:53:57'),
(21, 'qq', '', '0911223344', 'a123456', NULL, 'qq@example.com', '女', '高雄市', 1, '2024-04-17 02:54:03', '2024-04-17 02:54:03');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
