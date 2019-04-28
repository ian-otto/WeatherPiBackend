-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 27, 2019 at 11:05 PM
-- Server version: 10.1.37-MariaDB-0+deb9u1
-- PHP Version: 7.0.33-0+deb9u3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `weather_stat`
--

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
CREATE TABLE `statistics` (
  `timecode` datetime NOT NULL,
  `wind_dir` int(11) NOT NULL,
  `wind_speed` int(11) NOT NULL,
  `wind_gust` int(11) NOT NULL,
  `humidity` int(11) NOT NULL,
  `temperature` decimal(10,2) NOT NULL,
  `total_rain` decimal(10,3) NOT NULL,
  `wind_chill` decimal(10,2) NOT NULL,
  `heat_index` decimal(10,2) NOT NULL,
  `dew_point` decimal(10,2) NOT NULL,
  `barometer` decimal(10,3) NOT NULL,
  `daily_rain` decimal(10,3) NOT NULL,
  `hourly_rain` decimal(10,3) NOT NULL,
  `rain_rate` decimal(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`timecode`),
  ADD UNIQUE KEY `timecode` (`timecode`);

