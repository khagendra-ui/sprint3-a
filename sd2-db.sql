-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Oct 30, 2022 at 09:54 AM
-- Server version: 8.0.24
-- PHP Version: 7.4.20

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


-- create database
CREATE DATABASE clothes_platform;
USE clothes_platform;

-- create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, -- unique username
    email VARCHAR(100) NOT NULL UNIQUE, -- unique email address
    password_hash VARCHAR(255) NOT NULL, -- encrypted password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- account creation time
);

-- create clothes table
CREATE TABLE clothes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- the user who posted this clothing item
    name VARCHAR(100) NOT NULL, -- clothing name (e.g., "Adidas sweatshirt")
    description TEXT, -- clothing description
    image_url VARCHAR(255), -- url of the clothing image
    price DECIMAL(10,2) DEFAULT 0.00, -- price, 0 means donation
    shipping_fee DECIMAL(10,2) DEFAULT 0.00, -- shipping fee
    delivery_method ENUM('shipping', 'pickup', 'no_delivery') NOT NULL, -- delivery method
    status ENUM('available', 'borrowed', 'sold', 'donated') DEFAULT 'available', -- current status of the clothing item
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- time when the item was posted
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- if the user is deleted, delete their clothing items
);

-- create transactions table
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clothes_id INT NOT NULL, -- clothing item involved in the transaction
    seller_id INT, -- seller (null if it's a donation)
    buyer_id INT NOT NULL, -- buyer or borrower
    transaction_type ENUM('purchase', 'borrow', 'donation') NOT NULL, -- type of transaction
    amount DECIMAL(10,2) DEFAULT 0.00, -- transaction amount
    shipping_fee DECIMAL(10,2) DEFAULT 0.00, -- shipping fee
    delivery_method ENUM('shipping', 'pickup', 'no_delivery') NOT NULL, -- delivery method
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- date of the transaction
    FOREIGN KEY (clothes_id) REFERENCES clothes(id) ON DELETE CASCADE, -- if the clothing item is deleted, delete transaction records
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE SET NULL, -- if the seller is deleted, keep transaction records but set seller to null
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE -- if the buyer is deleted, delete transaction records
);

-- create borrow records table
CREATE TABLE borrows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clothes_id INT NOT NULL, -- clothing item that is borrowed
    borrower_id INT NOT NULL, -- user who borrowed the clothing item
    borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- date when the clothing item was borrowed
    return_date TIMESTAMP NULL, -- date when the clothing item was returned (null if not returned yet)
    status ENUM('borrowed', 'returned') DEFAULT 'borrowed', -- current status of the borrow record
    FOREIGN KEY (clothes_id) REFERENCES clothes(id) ON DELETE CASCADE, -- if the clothing item is deleted, delete borrow records
    FOREIGN KEY (borrower_id) REFERENCES users(id) ON DELETE CASCADE -- if the borrower is deleted, delete borrow records
);

-- create cart table
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- user who added the clothing item to the cart
    clothes_id INT NOT NULL, -- clothing item added to the cart
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- time when the item was added to the cart
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- if the user is deleted, delete their cart items
    FOREIGN KEY (clothes_id) REFERENCES clothes(id) ON DELETE CASCADE -- if the clothing item is deleted, remove it from all carts
);



--
-- Table structure for table `test_table`
--

CREATE TABLE `test_table` (
  `id` int NOT NULL,
  `name` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `test_table`
--

INSERT INTO `test_table` (`id`, `name`) VALUES
(1, 'Lisa'),
(2, 'Kimia');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `test_table`
--
ALTER TABLE `test_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `test_table`
--
ALTER TABLE `test_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
