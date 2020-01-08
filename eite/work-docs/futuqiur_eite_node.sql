-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 25, 2019 at 12:04 AM
-- Server version: 10.1.38-MariaDB-cll-lve
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `futuqiur_eite_node`
--

-- --------------------------------------------------------

--
-- Table structure for table `idxPerson`
--

CREATE TABLE `idxPerson` (
  `id` int(11) NOT NULL,
  `nodeId` int(11) DEFAULT NULL,
  `publicId` text NOT NULL,
  `hashedSecretKey` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `idxPerson`
--

INSERT INTO `idxPerson` (`id`, `nodeId`, `publicId`, `hashedSecretKey`) VALUES
(1, NULL, 'UNCONFIGURED', '$2y$10$Y3G1Nd91ICdR0I5VQDLYou5Fv1TZfSM0TNygjs/ocVBBDTb.zUgXa');

-- --------------------------------------------------------

--
-- Table structure for table `idxSession`
--

CREATE TABLE `idxSession` (
  `id` int(11) NOT NULL,
  `nodeId` int(11) DEFAULT NULL,
  `sessionKey` text NOT NULL,
  `created` int(11) NOT NULL,
  `expires` int(11) NOT NULL,
  `events` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `idxSession`
--

INSERT INTO `idxSession` (`id`, `nodeId`, `sessionKey`, `created`, `expires`, `events`) VALUES
(1, 0, 'test', 1556041091, 1556042091, ''),
(2, 0, 'test', 1556041209, 1556042209, ''),
(3, 0, 'test', 1556041225, 1556042225, ''),
(4, 0, 'test', 1556041328, 1556042328, ''),
(5, 0, 'test', 1556041329, 1556042329, ''),
(6, 0, 'test', 1556041357, 1556042357, ''),
(7, 0, 'test', 1556041502, 1556042502, ''),
(8, 0, 'test', 1556041583, 1556042583, ''),
(9, 0, 'test', 1556041658, 1556042658, ''),
(10, 0, 'test', 1556042173, 1556043173, ''),
(11, 0, 'test', 1556042462, 1556043462, ''),
(12, 0, 'test', 1556042512, 1556043512, ''),
(13, 0, 'test', 1556042569, 1556043569, ''),
(14, 0, 'test', 1556042648, 1556043648, ''),
(15, 0, 'test', 1556043211, 1556044211, ''),
(16, 0, 'test', 1556053776, 1556054776, ''),
(17, 0, 'test', 1556054308, 1556055308, ''),
(18, 0, 'test', 1556054335, 1556055335, ''),
(19, 0, 'test', 1556054435, 1556055435, ''),
(20, 0, 'test', 1556054509, 1556055509, ''),
(21, 0, 'test', 1556054567, 1556055567, ''),
(22, 0, 'test', 1556054651, 1556055651, ''),
(23, 0, 'test', 1556054698, 1556055698, ''),
(24, 0, 'test', 1556054923, 1556055923, ''),
(25, 0, 'test', 1556055077, 1556056077, ''),
(26, 0, 'test', 1556055302, 1556056302, ''),
(27, 0, 'test', 1556055380, 1556056380, ''),
(28, 0, 'test', 1556060381, 1556061381, ''),
(29, 0, 'test', 1556105856, 1556106856, ''),
(30, 0, 'test', 1556121728, 1556122728, ''),
(31, 0, 'test', 1556151430, 1556152430, ''),
(32, 0, 'e7e374c1-7c2a-4d51-b62a-d17669dc4740', 1556160437, 1556161437, ''),
(33, 0, 'e8c785be-ccd4-42f7-bc4d-0efe0229757a', 1556160444, 1556161444, ''),
(34, 0, 'd0314ddd-e156-46bb-9fea-d947b3dae2c5', 1556162482, 1556163482, ''),
(35, 0, 'a1c515c8-68da-4363-a062-749899a2a263', 1556162910, 1556163910, ''),
(36, 0, '90f20b35-f8d0-4360-9c6a-b33658ba8929', 1556163219, 1556164219, ''),
(37, 0, '4408c5ab-0672-464c-b469-72204438bb11', 1556163557, 1556336357, '');

-- --------------------------------------------------------

--
-- Table structure for table `node`
--

CREATE TABLE `node` (
  `id` int(11) NOT NULL,
  `version` int(11) NOT NULL,
  `data` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `node`
--

INSERT INTO `node` (`id`, `version`, `data`) VALUES
(1, 0, 'Example node'),
(2, 0, 'Example node'),
(3, 0, 'Example node');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `idxPerson`
--
ALTER TABLE `idxPerson`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `idxSession`
--
ALTER TABLE `idxSession`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `node`
--
ALTER TABLE `node`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `idxPerson`
--
ALTER TABLE `idxPerson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `idxSession`
--
ALTER TABLE `idxSession`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `node`
--
ALTER TABLE `node`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
