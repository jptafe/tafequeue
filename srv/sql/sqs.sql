-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 21, 2019 at 12:59 AM
-- Server version: 10.3.17-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sqs`
--

-- --------------------------------------------------------

--
-- Table structure for table `queue`
--

CREATE TABLE `queue` (
  `queue_ID` int(11) NOT NULL,
  `student_NO` bigint(20) NOT NULL,
  `queue_TITLE` varchar(256) NOT NULL,
  `queue_DESC` varchar(2048) NOT NULL,
  `queue_DATE` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `queue`
--

INSERT INTO `queue` (`queue_ID`, `student_NO`, `queue_TITLE`, `queue_DESC`, `queue_DATE`) VALUES
(17, 456955962, 'asdf', 'asdf', '2019-09-28 13:27:04'),
(18, 460728520, 'qwer', 'qwer', '2019-09-28 13:27:04');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_NO` bigint(20) NOT NULL,
  `nick` varchar(64) NOT NULL,
  `pass` varchar(256) NOT NULL,
  `privilege` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_NO`, `nick`, `pass`, `privilege`) VALUES
(451025951, '', '', 1),
(452759541, '', '', 1),
(452825763, '', '', 1),
(454739343, '', '', 1),
(455111948, '', '', 1),
(456876549, '', '', 1),
(456955962, '', '', 1),
(460728520, '', '', 1),
(465063477, '', '', 1),
(465568673, '', '', 1),
(468299219, 'fragspawn', 'asdfasdf', 0),
(469403190, '', '', 1),
(470009192, '', '', 1),
(470903074, '', '', 1),
(470949609, '', '', 1),
(470968167, '', '', 1),
(470984545, '', '', 1),
(470985577, '', '', 1),
(470986402, '', '', 1),
(471004279, '', '', 1),
(471017510, '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `suggestion`
--

CREATE TABLE `suggestion` (
  `id` int(11) NOT NULL,
  `sggestion` varchar(1024) NOT NULL,
  `queue_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `queue`
--
ALTER TABLE `queue`
  ADD PRIMARY KEY (`queue_ID`),
  ADD KEY `student_NO` (`student_NO`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_NO`);

--
-- Indexes for table `suggestion`
--
ALTER TABLE `suggestion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `queue_id` (`queue_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `queue`
--
ALTER TABLE `queue`
  MODIFY `queue_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `suggestion`
--
ALTER TABLE `suggestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `queue`
--
ALTER TABLE `queue`
  ADD CONSTRAINT `queue_ibfk_1` FOREIGN KEY (`student_NO`) REFERENCES `student` (`student_NO`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `suggestion`
--
ALTER TABLE `suggestion`
  ADD CONSTRAINT `suggestion_ibfk_1` FOREIGN KEY (`queue_id`) REFERENCES `queue` (`queue_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
