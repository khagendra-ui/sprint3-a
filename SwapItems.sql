-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 20, 2025 at 10:29 PM
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
-- Table structure for table `SwapItems`
--

CREATE TABLE `SwapItems` (
  `swap_id` int NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_category` enum('clothes','shoes','accessories','bags') NOT NULL,
  `item_description` text,
  `item_image` varchar(255) NOT NULL,
  `swap_status` enum('available','swapped') DEFAULT 'available',
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `SwapItems`
--

INSERT INTO `SwapItems` (`swap_id`, `item_name`, `item_category`, `item_description`, `item_image`, `swap_status`, `added_date`) VALUES
(1, 'Denim Jacket', 'clothes', 'Classic blue denim jacket, size M.', 'images/denim_jacket.jpg', 'available', '2025-03-11 13:25:31'),
(2, 'Running Shoes', 'shoes', 'Nike running shoes, barely used.', 'images/running_shoes.jpg', 'available', '2025-03-11 13:25:31'),
(3, 'Leather Handbag', 'bags', 'Brown leather handbag, stylish and spacious.', 'images/leather_handbag.jpg', 'swapped', '2025-03-11 13:25:31'),
(4, 'Silver Bracelet', 'accessories', 'Elegant silver bracelet with gemstones.', 'images/silver_bracelet.jpg', 'available', '2025-03-11 13:25:31'),
(5, 'Denim Jacket', 'clothes', 'Classic blue denim jacket, size M.', 'images/denim_jacket.jpg', 'available', '2025-03-11 13:25:31'),
(6, 'Running Shoes', 'shoes', 'Nike running shoes, barely used.', 'images/running_shoes.jpg', 'available', '2025-03-11 13:25:31'),
(7, 'Leather Handbag', 'bags', 'Brown leather handbag, stylish and spacious.', 'images/leather_handbag.jpg', 'swapped', '2025-03-11 13:25:31'),
(8, 'Silver Bracelet', 'accessories', 'Elegant silver bracelet with intricate design.', 'images/silver_bracelet.jpg', 'available', '2025-03-11 13:25:31'),
(9, 'Winter Coat', 'clothes', 'Heavy-duty winter coat, size L, insulated for cold weather.', 'images/winter_coat.jpg', 'available', '2025-03-15 10:12:45'),
(10, 'Canvas Sneakers', 'shoes', 'Stylish canvas sneakers, size 9, slightly worn.', 'images/canvas_sneakers.jpg', 'available', '2025-03-15 10:13:01'),
(11, 'Messenger Bag', 'bags', 'Black leather messenger bag with adjustable strap.', 'images/messenger_bag.jpg', 'available', '2025-03-16 14:20:55'),
(12, 'Gold Earrings', 'accessories', 'Pair of 24k gold earrings, brand new.', 'images/gold_earrings.jpg', 'swapped', '2025-03-16 14:22:10'),
(13, 'Plaid Shirt', 'clothes', 'Red and black plaid shirt, size M, in excellent condition.', 'images/plaid_shirt.jpg', 'available', '2025-03-17 09:45:22'),
(14, 'Leather Boots', 'shoes', 'Brown leather boots, size 10, in great condition.', 'images/leather_boots.jpg', 'available', '2025-03-17 09:46:35'),
(15, 'Sunglasses', 'accessories', 'High-end sunglasses, black with silver frame.', 'images/sunglasses.jpg', 'swapped', '2025-03-18 16:03:12'),
(16, 'Tote Bag', 'bags', 'Spacious canvas tote bag with floral design.', 'images/tote_bag.jpg', 'available', '2025-03-19 11:30:00'),
(17, 'Wool Scarf', 'accessories', 'Soft wool scarf, perfect for winter.', 'images/wool_scarf.jpg', 'available', '2025-03-19 11:31:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `SwapItems`
--
ALTER TABLE `SwapItems`
  ADD PRIMARY KEY (`swap_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `SwapItems`
--
ALTER TABLE `SwapItems`
  MODIFY `swap_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
