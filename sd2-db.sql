-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 23, 2025 at 08:29 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sd2-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int NOT NULL,
  `donorName` varchar(255) NOT NULL,
  `itemCategory` enum('clothes','shoes','accessories','bags') NOT NULL,
  `itemColor` varchar(100) NOT NULL,
  `itemCondition` enum('new','good','used') NOT NULL,
  `itemImage` varchar(255) NOT NULL,
  `donationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `donorName`, `itemCategory`, `itemColor`, `itemCondition`, `itemImage`, `donationDate`) VALUES
(1, 'John Doe', 'clothes', 'Red', 'new', './image/red.jpg', '2025-03-22 14:06:55'),
(2, 'Jane Smith', 'shoes', 'Black', 'good', './image/black_shoes.jpeg', '2025-03-22 14:06:55'),
(3, 'Alice Johnson', 'accessories', 'Gold', 'used', './image/gold_ring.jpeg', '2025-03-22 14:06:55'),
(4, 'Bob Brown', 'bags', 'Brown', 'new', './image/bag.jpeg', '2025-03-22 14:06:55');

-- --------------------------------------------------------

--
-- Table structure for table `SwapItems`
--

CREATE TABLE `SwapItems` (
  `item_id` int NOT NULL,
  `itemName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category` varchar(100) NOT NULL,
  `color` varchar(50) NOT NULL,
  `condition` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `itemImage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `swapwith` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `SwapItems`
--

INSERT INTO `SwapItems` (`item_id`, `itemName`, `category`, `color`, `condition`, `description`, `itemImage`, `swapwith`, `created_at`, `updated_at`) VALUES
(1, 'Black Hoodie', 'Clothes', 'Black', 'New', 'A stylish black hoodie, perfect for winter.', './image/black.jpeg', 'Red Sneakers', '2025-03-23 00:02:21', '2025-03-23 00:45:14'),
(2, 'Running Shoes', 'Shoes', 'Blue', 'Good', 'Comfortable running shoes for any athlete.', './image/blue.jpeg', 'Sports Bag', '2025-03-23 00:02:21', '2025-03-23 00:45:25'),
(3, 'Vintage Leather Jacket', 'Clothes', 'Brown', 'Excellent', 'A vintage leather jacket, durable and stylish.', './image/brownjacket.jpeg', 'Casual Shirt', '2025-03-23 00:02:21', '2025-03-23 00:46:57'),
(4, 'Wireless Earbuds', 'Accessories', 'White', 'New', 'High-quality wireless earbuds for music lovers.', './image/earbud.jpeg', 'Bluetooth Speaker', '2025-03-23 00:02:21', '2025-03-23 00:47:19'),
(5, 'Casual Watch', 'Accessories', 'Silver', 'Used', 'A classic silver casual watch with a leather strap.', './image/watch.jpeg', 'Sports Watch', '2025-03-23 00:02:21', '2025-03-23 00:47:39');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UserID` int NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `Role` enum('Admin','Customer') DEFAULT 'Customer',
  `Email` varchar(255) NOT NULL,
  `LastLogin` datetime DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserID`, `Username`, `Password`, `FullName`, `Role`, `Email`, `LastLogin`, `CreatedAt`) VALUES
(1, 'john.doe@example.com', 'password123', 'John Doe', 'Customer', 'john.doe@example.com', '2025-03-21 14:35:00', '2025-03-23 19:41:37'),
(2, 'jane.smith@example.com', 'adminpass', 'Jane Smith', 'Admin', 'jane.smith@example.com', '2025-03-22 08:20:12', '2025-03-23 19:41:37'),
(3, 'alex.jones@example.com', 'alexpassword', 'Alex Jones', 'Customer', 'alex.jones@example.com', '2025-03-22 16:47:58', '2025-03-23 19:41:37'),
(4, 'emily.brown@example.com', 'mypassword', 'Emily Brown', 'Customer', 'emily.brown@example.com', '2025-03-21 11:15:34', '2025-03-23 19:41:37'),
(5, 'robert.white@example.com', 'robert123', 'Robert White', 'Admin', 'robert.white@example.com', '2025-03-23 10:09:07', '2025-03-23 19:41:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SwapItems`
--
ALTER TABLE `SwapItems`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `SwapItems`
--
ALTER TABLE `SwapItems`
  MODIFY `item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
