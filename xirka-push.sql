-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2023 at 08:18 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xirka-push`
--

-- --------------------------------------------------------

--
-- Table structure for table `alarm`
--

CREATE TABLE `alarm` (
  `id` int(11) NOT NULL,
  `meterNo` varchar(255) NOT NULL,
  `warningTime` varchar(255) NOT NULL,
  `warningCode` varchar(255) NOT NULL,
  `warningInfo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alarm`
--

INSERT INTO `alarm` (`id`, `meterNo`, `warningTime`, `warningCode`, `warningInfo`) VALUES
(1, '9999006144939', '2022-08-31 10:15:10', '8', 'LOW_BATTERY_VOLTAGE');

-- --------------------------------------------------------

--
-- Table structure for table `daily_frozen`
--

CREATE TABLE `daily_frozen` (
  `id` int(11) NOT NULL,
  `meterNo` varchar(255) NOT NULL,
  `frozenDate` varchar(255) NOT NULL,
  `hoursData` varchar(255) NOT NULL,
  `todayVol` varchar(255) NOT NULL,
  `totalVol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `daily_frozen`
--

INSERT INTO `daily_frozen` (`id`, `meterNo`, `frozenDate`, `hoursData`, `todayVol`, `totalVol`) VALUES
(1, '9999006144939', '2022-08-29', '0.0000,0.0030,0.0000,0.0000,0.0000,0.0000,0.0320,0.0240,0.0420,0.0000,0.0000,0. 0000,0.0300,0.0480,0.0000,0.0000,0.0000,0.0030,0.0400,0.0450,0.0360,0.0480,0.0400,0.0420', '0.433', '40.292'),
(2, '9999006144939', '2022-08-29', '0.0000,0.0030,0.0000,0.0000,0.0000,0.0000,0.0320,0.0240,0.0420,0.0000,0.0000,0. 0000,0.0300,0.0480,0.0000,0.0000,0.0000,0.0030,0.0400,0.0450,0.0360,0.0480,0.0400,0.0420', '0.433', '40.292');

-- --------------------------------------------------------

--
-- Table structure for table `meter_task`
--

CREATE TABLE `meter_task` (
  `id` int(11) NOT NULL,
  `meterNo` varchar(255) DEFAULT NULL,
  `taskType` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `serialNo` varchar(255) DEFAULT NULL,
  `totalUsedVolume` varchar(255) DEFAULT NULL,
  `totalPurchaseVolume` varchar(255) DEFAULT NULL,
  `surplusVolume` varchar(255) DEFAULT NULL,
  `totalUsedAmount` varchar(255) DEFAULT NULL,
  `totalPurchaseAmount` varchar(255) DEFAULT NULL,
  `surplusAmount` varchar(255) DEFAULT NULL,
  `clock` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alarm`
--
ALTER TABLE `alarm`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `daily_frozen`
--
ALTER TABLE `daily_frozen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meter_task`
--
ALTER TABLE `meter_task`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alarm`
--
ALTER TABLE `alarm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `daily_frozen`
--
ALTER TABLE `daily_frozen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `meter_task`
--
ALTER TABLE `meter_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
