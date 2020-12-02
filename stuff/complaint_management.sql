-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2020 at 04:50 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `complaint_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_list`
--

CREATE TABLE `admin_list` (
  `admin_id` int(11) NOT NULL,
  `admin_email` text DEFAULT NULL,
  `admin_name` text DEFAULT NULL,
  `dept_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_list`
--

INSERT INTO `admin_list` (`admin_id`, `admin_email`, `admin_name`, `dept_id`) VALUES
(1, 'cse190001031@iiti.ac.in', 'ad1', 1),
(2, 'cse190001031@iiti.ac.n', 'ad2', 2),
(3, 'cse190001031@iiti.ac.i', 'ad3', 3);

-- --------------------------------------------------------

--
-- Table structure for table `complaint_list`
--

CREATE TABLE `complaint_list` (
  `complaint_id` int(11) NOT NULL,
  `complaint_subject` text DEFAULT NULL,
  `complaint_text` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `secy_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `dept_id` int(11) DEFAULT NULL,
  `resolved` int(11) DEFAULT NULL,
  `resolved_date` date DEFAULT NULL,
  `days` int(11) DEFAULT NULL,
  `stars` int(11) DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `complaint_list`
--

INSERT INTO `complaint_list` (`complaint_id`, `complaint_subject`, `complaint_text`, `date`, `student_id`, `secy_id`, `admin_id`, `dept_id`, `resolved`, `resolved_date`, `days`, `stars`, `comments`) VALUES
(1, 'acad', 'acad complaint', '2020-01-02', 1, 1, 1, 1, 1, '2020-10-30', 303, NULL, NULL),
(2, 'sport', 'sport complaint', '2020-10-22', 2, 2, 2, 2, 0, NULL, NULL, NULL, NULL),
(3, 'cafe', 'cafe complaint', '2020-08-23', 3, 3, 3, 3, 0, NULL, NULL, NULL, NULL),
(4, 'acad', 'acad complaint', '2020-10-20', 2, 1, 1, 1, 1, '2020-10-23', 4, 3, 'happy'),
(11, 'acad_subject', 'I hate studying!!', '2020-10-19', 2, 1, NULL, 1, 0, NULL, NULL, NULL, NULL),
(12, 'sport', 'why sports', '2020-10-22', 1, 2, 2, 2, 1, '2020-10-30', 9, NULL, NULL),
(14, 'cafe stuff', 'bad quality food', '2020-10-23', NULL, 3, 3, 3, 0, NULL, NULL, NULL, NULL),
(15, 'cafe subject', 'mess food nhi pasand', '2020-10-23', 2, 3, NULL, 3, 0, NULL, NULL, NULL, NULL),
(16, 'i hate sports', 'i dont know why, but i hate sports.', '2020-11-09', NULL, 2, 2, 2, 0, NULL, NULL, NULL, NULL),
(17, 'cafe subject', 'cafe text', '2020-11-09', 2, 3, NULL, 3, 0, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department_list`
--

CREATE TABLE `department_list` (
  `dept_id` int(11) NOT NULL,
  `dept_name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department_list`
--

INSERT INTO `department_list` (`dept_id`, `dept_name`) VALUES
(1, 'academic'),
(2, 'sport'),
(3, 'cafeteria');

-- --------------------------------------------------------

--
-- Table structure for table `reply_list`
--

CREATE TABLE `reply_list` (
  `reply_id` int(11) NOT NULL,
  `reply_text` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `complaint_id` int(11) DEFAULT NULL,
  `from_to` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reply_list`
--

INSERT INTO `reply_list` (`reply_id`, `reply_text`, `date`, `complaint_id`, `from_to`) VALUES
(1, 'yolo1', '2018-09-20', 1, 'A'),
(2, 'yolo2', '2019-09-20', 2, 'S'),
(3, 'yolo3', '2020-10-20', 2, 'A'),
(4, 'yolo4', '2020-09-20', 2, 'T'),
(6, 'yolo5', '2020-10-23', 2, 'T'),
(7, 'yolo6', '2020-10-23', 2, 'S'),
(12, 'ageertbrtb', '2020-10-23', 2, 'T'),
(13, 'gala', '2020-10-23', 2, 'S'),
(14, 'hello!!!', '2020-10-23', 2, 'T'),
(15, 'Namaste complaintId 1', '2020-10-24', 1, 'A'),
(16, '2nd reply', '2020-10-24', 1, 'A'),
(17, 'hello!!', '2020-10-24', 14, 'S'),
(18, 'hi', '2020-10-24', 14, 'S'),
(19, 'hello', '2020-10-24', 15, 'T'),
(20, 'Hi', '2020-11-09', 2, 'T'),
(21, 'Namaste', '2020-11-09', 2, 'T'),
(22, 'hello again', '2020-11-09', 2, 'T'),
(23, 'hello', '2020-11-09', 2, 'T'),
(24, 'HI', '2020-11-09', 2, 'S');

-- --------------------------------------------------------

--
-- Table structure for table `secy_list`
--

CREATE TABLE `secy_list` (
  `secy_id` int(11) NOT NULL,
  `secy_email` text DEFAULT NULL,
  `secy_name` text DEFAULT NULL,
  `dept_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `secy_list`
--

INSERT INTO `secy_list` (`secy_id`, `secy_email`, `secy_name`, `dept_id`) VALUES
(1, 'academicsecy@iiti.ac.in', 'se1', 1),
(2, 'cse190001031@iiti.ac.in', 'se2', 2),
(3, 'cafeteriasecy@iiti.ac.in', 'se3', 3),
(4, 'cse190001031@iiti.ac.i', 'Kushaan', 3),
(5, 'abc', 'd', 1),
(6, 'def', 'g', 2);

-- --------------------------------------------------------

--
-- Table structure for table `student_list`
--

CREATE TABLE `student_list` (
  `roll_no` int(11) NOT NULL,
  `student_email` text DEFAULT NULL,
  `student_name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_list`
--

INSERT INTO `student_list` (`roll_no`, `student_email`, `student_name`) VALUES
(1, '1@iiti.ac.in', 's1'),
(2, 'cse190001031@iiti.ac.in', 's2'),
(3, '3@iiti.ac.in', 's3'),
(190001031, 'cse190001031@iiti.ac.i', 'Kushaan Gowda');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_list`
--
ALTER TABLE `admin_list`
  ADD PRIMARY KEY (`admin_id`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `complaint_list`
--
ALTER TABLE `complaint_list`
  ADD PRIMARY KEY (`complaint_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `secy_id` (`secy_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `department_list`
--
ALTER TABLE `department_list`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `reply_list`
--
ALTER TABLE `reply_list`
  ADD PRIMARY KEY (`reply_id`),
  ADD KEY `reply_list_ibfk_1` (`complaint_id`);

--
-- Indexes for table `secy_list`
--
ALTER TABLE `secy_list`
  ADD PRIMARY KEY (`secy_id`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `student_list`
--
ALTER TABLE `student_list`
  ADD PRIMARY KEY (`roll_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaint_list`
--
ALTER TABLE `complaint_list`
  MODIFY `complaint_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `reply_list`
--
ALTER TABLE `reply_list`
  MODIFY `reply_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_list`
--
ALTER TABLE `admin_list`
  ADD CONSTRAINT `admin_list_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department_list` (`dept_id`);

--
-- Constraints for table `complaint_list`
--
ALTER TABLE `complaint_list`
  ADD CONSTRAINT `complaint_list_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_list` (`roll_no`),
  ADD CONSTRAINT `complaint_list_ibfk_2` FOREIGN KEY (`secy_id`) REFERENCES `secy_list` (`secy_id`),
  ADD CONSTRAINT `complaint_list_ibfk_3` FOREIGN KEY (`admin_id`) REFERENCES `admin_list` (`admin_id`),
  ADD CONSTRAINT `complaint_list_ibfk_4` FOREIGN KEY (`dept_id`) REFERENCES `department_list` (`dept_id`);

--
-- Constraints for table `reply_list`
--
ALTER TABLE `reply_list`
  ADD CONSTRAINT `reply_list_ibfk_1` FOREIGN KEY (`complaint_id`) REFERENCES `complaint_list` (`complaint_id`) ON DELETE CASCADE;

--
-- Constraints for table `secy_list`
--
ALTER TABLE `secy_list`
  ADD CONSTRAINT `secy_list_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department_list` (`dept_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
