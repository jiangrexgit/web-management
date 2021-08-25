-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-08-25 17:09:15
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
  `department` text NOT NULL,
  `year` text NOT NULL,
  `month` text NOT NULL,
  `day` text NOT NULL,
  `checkin` text NOT NULL,
  `checkout` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `checkin_record`
--

INSERT INTO `checkin_record` (`id`, `account`, `department`, `year`, `month`, `day`, `checkin`, `checkout`) VALUES
(0, 'admin', 'all', '2021', '8', '22', '17:38', '18:53'),
(0, 'admin', 'all', '2021', '8', '25', '22:03', '22:56');

-- --------------------------------------------------------

--
-- 資料表結構 `user_infos`
--

CREATE TABLE `user_infos` (
  `id` int(10) NOT NULL,
  `account` text NOT NULL,
  `password` text NOT NULL,
  `name` text NOT NULL,
  `auth` text NOT NULL,
  `mail` longtext NOT NULL,
  `gender` text NOT NULL,
  `department` text NOT NULL,
  `startworking` date NOT NULL DEFAULT current_timestamp(),
  `vacation` float NOT NULL,
  `salary` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `user_infos`
--

INSERT INTO `user_infos` (`id`, `account`, `password`, `name`, `auth`, `mail`, `gender`, `department`, `startworking`, `vacation`, `salary`) VALUES
(0, 'admin', 'admin', '管理者', 'admin', '', '', 'all', '2020-01-01', 0, 0),
(1, 'test', 'test123', '管理者', 'admin', '', '', 'President', '2020-01-01', 0, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
