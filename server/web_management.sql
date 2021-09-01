-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-09-01 19:11:17
-- 伺服器版本： 10.4.20-MariaDB
-- PHP 版本： 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `web_management`
--

-- --------------------------------------------------------

--
-- 資料表結構 `checkin_record`
--

CREATE TABLE `checkin_record` (
  `id` int(10) NOT NULL,
  `account` text NOT NULL,
  `year` text NOT NULL,
  `month` text NOT NULL,
  `day` text NOT NULL,
  `checkin` text NOT NULL,
  `checkout` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `checkin_record`
--

INSERT INTO `checkin_record` (`id`, `account`, `year`, `month`, `day`, `checkin`, `checkout`) VALUES
(0, 'admin', '2021', '8', '22', '17:38', '18:53'),
(0, 'admin', '2021', '8', '25', '22:03', '22:56'),
(0, 'admin', '2021', '8', '26', '23:22', '23:50'),
(0, 'admin', '2021', '8', '28', '17:52', '17:52'),
(0, 'admin', '2021', '8', '29', '13:04', '23:30'),
(1, 'aa', '2021', '8', '29', '15:27', '15:27'),
(0, 'admin', '2021', '9', '1', '21:47', '23:27'),
(0, 'admin', '2021', '9', '2', '1:00', '1:02');

-- --------------------------------------------------------

--
-- 資料表結構 `roster_record`
--

CREATE TABLE `roster_record` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `day` text NOT NULL,
  `night` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `roster_record`
--

INSERT INTO `roster_record` (`id`, `year`, `month`, `day`, `night`) VALUES
(0, 2021, 9, '3,6,9,11,19,,', ','),
(1, 2021, 9, '4,7,9,11,,', ','),
(0, 2021, 10, '11,15,', ''),
(1, 2021, 10, '8,21,', ''),
(0, 2021, 8, '8,19,28,', '14,20,'),
(1, 2021, 8, '11,20,28,', '8,17,');

-- --------------------------------------------------------

--
-- 資料表結構 `user_infos`
--

CREATE TABLE `user_infos` (
  `id` int(10) NOT NULL,
  `account` text NOT NULL,
  `password` text NOT NULL,
  `name` text NOT NULL,
  `auth` text NOT NULL DEFAULT 'staff',
  `mail` longtext NOT NULL,
  `gender` text NOT NULL,
  `startworking` date NOT NULL DEFAULT current_timestamp(),
  `vacation` float NOT NULL DEFAULT 0,
  `salary` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `user_infos`
--

INSERT INTO `user_infos` (`id`, `account`, `password`, `name`, `auth`, `mail`, `gender`, `startworking`, `vacation`, `salary`) VALUES
(0, 'admin', 'admin', '管理者', 'admin', '', '', '2020-01-01', 0, 500),
(1, 'aa', 'AAA', 'AA', 'staff', 'dd', 'Male', '2021-08-29', 0, 100);

-- --------------------------------------------------------

--
-- 資料表結構 `vacation_record`
--

CREATE TABLE `vacation_record` (
  `id` int(10) NOT NULL,
  `name` text NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `status` text NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `vacation_record`
--

INSERT INTO `vacation_record` (`id`, `name`, `start`, `end`, `status`) VALUES
(0, '管理者', '2021-09-30 00:00:00', '2021-09-30 00:00:00', 'false'),
(0, '管理者', '2021-08-30 00:00:00', '2021-08-30 00:00:00', 'false');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
