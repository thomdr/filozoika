-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2021 at 03:07 PM
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
-- Database: `filozoika_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `animals`
--

CREATE TABLE `animals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `species_id` int(11) DEFAULT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vet` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `own_food` tinyint(1) DEFAULT 0,
  `food_amount` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_id` bigint(20) UNSIGNED DEFAULT NULL,
  `pasport` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `information` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `animals`
--

INSERT INTO `animals` (`id`, `name`, `species_id`, `gender`, `date_of_birth`, `vet`, `own_food`, `food_amount`, `owner_id`, `pasport`, `photo`, `information`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Obnox', 1, 'Vrouw', '2020-06-06', 'Gerard Joling', 0, '200kg', 2, NULL, NULL, 'Oboe is stiekem een giraffe', 0, '2020-09-02 11:01:39', '2020-09-28 06:28:52'),
(9, 'Harrolda', 2, 'Man', '2020-09-13', 'Bauer', 0, '12kg', 2, NULL, NULL, '452433423243432 23243 423246456 3 5375743664133654 45 42145445145 4 1 45 463 1364 6 31 4354 41', 1, '2020-09-21 09:09:23', '2020-09-28 06:28:44'),
(10, 'Ericona', 3, 'Man', '2019-11-07', 'Peter R. de Vries', 1, '25kg', 3, NULL, NULL, NULL, 0, '2020-09-21 09:27:43', '2020-09-28 06:29:16'),
(11, 'Zamateo', 2, 'Man', '2020-02-28', 'Gerard', 0, '10kg', 1, 'public/11_pasport_28_09_2020-13_15_32.png', NULL, 'YOU MANNNNNNN!', 1, '2020-09-21 09:42:20', '2020-09-28 11:15:32'),
(13, 'Dooja', 5, 'Vrouw', '2020-07-10', NULL, 1, '294kg', 1, 'public/13_pasport_24_09_2020-13_31_56.png', 'public/13_photo_24_09_2020-13_31_56.jpeg', NULL, 1, '2020-09-24 05:50:11', '2020-09-28 06:28:26'),
(28, 'Eduart', 3, 'Man', '2020-08-06', 'Peter R. de Vries', 1, '1kg', 3, 'public/28_pasport_24_09_2020-13_30_37.png', 'public/28_photo_25_09_2020-07_20_30.png', 'Kitty katze', 1, '2020-09-24 10:53:14', '2020-09-28 06:28:18'),
(37, 'Hatsikidee', 3, 'Vrouw', '2020-09-10', 'Peter R. de Vries', 1, '2kg', 4, 'public/37_pasport_25_09_2020-11_39_58.jpeg', NULL, 'Wat?', 0, '2020-09-25 07:23:02', '2020-09-28 11:36:56'),
(43, 'Akona', 4, 'Man', '2020-09-05', 'Peter R. de Vries', 1, '1kg', 38, 'public/43_pasport_28_09_2020-11_48_33.png', NULL, 'HEEHEE', 0, '2020-09-28 09:48:34', '2020-09-28 11:13:42'),
(44, 'Prisma', 5, 'Man', '2022-09-28', 'Gerard Joling', 1, '2kg', 1, NULL, NULL, NULL, 1, '2020-09-28 09:49:22', '2020-09-28 11:13:27'),
(46, 'Baksteen', 6, 'Vrouw', '2019-02-10', NULL, 1, '0', 38, 'public/46_pasport_28_09_2020-13_36_13.jpeg', NULL, NULL, 0, '2020-09-28 11:36:13', '2020-09-28 11:37:32'),
(58, 'Hakkadingo', 2, 'Man', '2020-10-09', 'Barry', 0, NULL, 38, NULL, NULL, NULL, 1, '2020-10-20 09:16:13', '2020-11-01 17:33:09'),
(61, 'Skimi', 6, 'Man', '2020-10-10', NULL, 0, NULL, 4, NULL, NULL, NULL, 1, '2020-10-29 10:32:29', '2020-11-01 19:32:55'),
(63, 'Nadeau', 2, 'Vrouw', '2020-07-09', 'Peter R. de Vries', 1, '10kg', 2, NULL, NULL, 'Ha!', 0, '2020-11-01 17:27:51', '2020-11-01 17:32:53'),
(64, 'Kavathus', 5, 'Vrouw', '2020-10-27', 'Danyka', 1, NULL, 40, NULL, NULL, NULL, 1, '2020-11-01 17:31:39', '2020-11-01 19:32:50'),
(65, 'd\'Artagnan', 6, 'Man', '2020-10-23', NULL, 0, '20g', 41, NULL, NULL, NULL, 1, '2020-11-01 18:54:59', '2020-11-01 19:32:43'),
(66, 'Pepi', 6, 'Man', '2020-11-13', NULL, 0, '203g', 41, NULL, NULL, NULL, 1, '2020-11-01 18:54:59', '2020-11-01 19:29:54'),
(67, 'Symphony', 3, 'Vrouw', '2020-06-04', 'Peter R. de Vries', 0, '12 gram', 1, NULL, NULL, 'I AM SO MAD!', 1, '2020-11-01 19:28:56', '2020-11-01 19:30:27'),
(78, 'Ed', 5, NULL, NULL, NULL, 0, NULL, 3, NULL, NULL, NULL, 0, '2020-11-03 13:28:07', '2020-11-19 14:47:38'),
(79, 'Onbekend - Vogel (1)', 6, NULL, NULL, NULL, 0, NULL, 2, NULL, NULL, NULL, 0, '2020-11-05 14:04:30', '2020-11-05 14:04:30'),
(80, 'Onbekend - Vogel (1)', 6, NULL, NULL, NULL, 0, NULL, 2, NULL, NULL, NULL, 0, '2020-11-05 14:04:30', '2020-11-05 14:04:30'),
(81, 'Skeegle', 6, 'Vrouw', '2020-06-10', NULL, 0, '54g', 2, NULL, NULL, NULL, 1, '2020-11-05 14:05:47', '2020-11-05 14:09:36'),
(82, 'Vegelbud', 6, 'Man', '2020-01-10', 'Markus Ruttus', 1, '397g', 2, NULL, NULL, NULL, 1, '2020-11-05 14:05:48', '2020-11-05 14:07:21'),
(83, 'Bortem', 4, 'Man', '2020-12-20', 'Peter R. de Vries', 1, '1kg', 40, 'public/83_pasport_14_12_2020-14_05_39.jpeg', 'public/83_photo_14_12_2020-14_05_39.jpeg', 'Wat een haarbal', 1, '2020-12-14 13:05:39', '2020-12-14 13:06:00'),
(84, 'Immortality', 4, 'Vrouw', '2020-12-27', NULL, 0, NULL, 40, NULL, NULL, NULL, 1, '2020-12-14 13:06:32', '2020-12-14 13:16:36'),
(105, 'Elisabeth', 3, 'Vrouw', '2020-12-04', NULL, 0, '40 gram', 42, NULL, NULL, NULL, 1, '2020-12-14 13:27:27', '2020-12-14 13:30:49'),
(106, 'Anastasia', 1, 'Vrouw', '2020-12-04', NULL, 1, NULL, 3, NULL, NULL, NULL, 1, '2020-12-14 13:28:45', '2020-12-14 13:30:20');

-- --------------------------------------------------------

--
-- Table structure for table `animal_vegetable_link`
--

CREATE TABLE `animal_vegetable_link` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `animal_id` bigint(20) UNSIGNED NOT NULL,
  `vegetable_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `animal_vegetable_link`
--

INSERT INTO `animal_vegetable_link` (`id`, `animal_id`, `vegetable_id`, `created_at`, `updated_at`) VALUES
(1, 1, 3, NULL, NULL),
(2, 1, 12, NULL, NULL),
(30, 44, 4, '2020-09-28 11:13:27', '2020-09-28 11:13:27'),
(31, 44, 6, '2020-09-28 11:13:27', '2020-09-28 11:13:27'),
(32, 44, 11, '2020-09-28 11:13:27', '2020-09-28 11:13:27'),
(33, 43, 5, '2020-09-28 11:13:42', '2020-09-28 11:13:42'),
(34, 43, 7, '2020-09-28 11:13:42', '2020-09-28 11:13:42'),
(35, 43, 8, '2020-09-28 11:13:42', '2020-09-28 11:13:42'),
(36, 43, 10, '2020-09-28 11:13:42', '2020-09-28 11:13:42'),
(37, 43, 12, '2020-09-28 11:13:42', '2020-09-28 11:13:42'),
(43, 11, 2, '2020-09-28 11:15:32', '2020-09-28 11:15:32'),
(44, 11, 5, '2020-09-28 11:15:32', '2020-09-28 11:15:32'),
(45, 11, 8, '2020-09-28 11:15:32', '2020-09-28 11:15:32'),
(46, 11, 10, '2020-09-28 11:15:32', '2020-09-28 11:15:32'),
(47, 11, 11, '2020-09-28 11:15:32', '2020-09-28 11:15:32'),
(56, 37, 8, '2020-09-28 11:36:56', '2020-09-28 11:36:56'),
(57, 37, 9, '2020-09-28 11:36:56', '2020-09-28 11:36:56'),
(58, 37, 11, '2020-09-28 11:36:56', '2020-09-28 11:36:56'),
(59, 37, 12, '2020-09-28 11:36:56', '2020-09-28 11:36:56'),
(60, 46, 1, '2020-09-28 11:37:32', '2020-09-28 11:37:32'),
(61, 46, 2, '2020-09-28 11:37:32', '2020-09-28 11:37:32'),
(62, 46, 3, '2020-09-28 11:37:32', '2020-09-28 11:37:32'),
(63, 46, 4, '2020-09-28 11:37:32', '2020-09-28 11:37:32'),
(64, 46, 8, '2020-09-28 11:37:32', '2020-09-28 11:37:32'),
(65, 46, 9, '2020-09-28 11:37:32', '2020-09-28 11:37:32'),
(66, 46, 11, '2020-09-28 11:37:32', '2020-09-28 11:37:32'),
(67, 46, 14, '2020-09-28 11:37:32', '2020-09-28 11:37:32'),
(68, 46, 15, '2020-09-28 11:37:32', '2020-09-28 11:37:32'),
(104, 63, 1, '2020-11-01 17:32:53', '2020-11-01 17:32:53'),
(105, 63, 12, '2020-11-01 17:32:53', '2020-11-01 17:32:53'),
(106, 58, 1, '2020-11-01 17:33:09', '2020-11-01 17:33:09'),
(107, 58, 6, '2020-11-01 17:33:09', '2020-11-01 17:33:09'),
(108, 58, 7, '2020-11-01 17:33:09', '2020-11-01 17:33:09'),
(109, 58, 15, '2020-11-01 17:33:09', '2020-11-01 17:33:09'),
(116, 67, 2, '2020-11-01 19:30:26', '2020-11-01 19:30:26'),
(117, 67, 4, '2020-11-01 19:30:26', '2020-11-01 19:30:26'),
(118, 67, 9, '2020-11-01 19:30:26', '2020-11-01 19:30:26'),
(124, 65, 3, '2020-11-01 19:32:43', '2020-11-01 19:32:43'),
(125, 65, 5, '2020-11-01 19:32:43', '2020-11-01 19:32:43'),
(126, 65, 8, '2020-11-01 19:32:43', '2020-11-01 19:32:43'),
(127, 65, 11, '2020-11-01 19:32:43', '2020-11-01 19:32:43'),
(128, 65, 15, '2020-11-01 19:32:43', '2020-11-01 19:32:43'),
(129, 64, 2, '2020-11-01 19:32:50', '2020-11-01 19:32:50'),
(130, 64, 5, '2020-11-01 19:32:50', '2020-11-01 19:32:50'),
(131, 64, 7, '2020-11-01 19:32:50', '2020-11-01 19:32:50'),
(132, 64, 9, '2020-11-01 19:32:50', '2020-11-01 19:32:50'),
(133, 64, 11, '2020-11-01 19:32:50', '2020-11-01 19:32:50'),
(134, 64, 15, '2020-11-01 19:32:50', '2020-11-01 19:32:50'),
(135, 61, 14, '2020-11-01 19:32:55', '2020-11-01 19:32:55'),
(140, 82, 5, '2020-11-05 14:07:21', '2020-11-05 14:07:21'),
(141, 82, 7, '2020-11-05 14:07:21', '2020-11-05 14:07:21'),
(142, 82, 8, '2020-11-05 14:07:21', '2020-11-05 14:07:21'),
(143, 82, 9, '2020-11-05 14:07:21', '2020-11-05 14:07:21'),
(144, 82, 11, '2020-11-05 14:07:21', '2020-11-05 14:07:21'),
(153, 81, 2, '2020-11-05 14:09:36', '2020-11-05 14:09:36'),
(154, 81, 4, '2020-11-05 14:09:36', '2020-11-05 14:09:36'),
(155, 81, 12, '2020-11-05 14:09:36', '2020-11-05 14:09:36'),
(156, 81, 15, '2020-11-05 14:09:36', '2020-11-05 14:09:36'),
(163, 83, 1, '2020-12-14 13:06:00', '2020-12-14 13:06:00'),
(164, 83, 5, '2020-12-14 13:06:00', '2020-12-14 13:06:00'),
(165, 83, 8, '2020-12-14 13:06:00', '2020-12-14 13:06:00'),
(166, 83, 9, '2020-12-14 13:06:00', '2020-12-14 13:06:00'),
(167, 83, 11, '2020-12-14 13:06:00', '2020-12-14 13:06:00'),
(168, 83, 14, '2020-12-14 13:06:00', '2020-12-14 13:06:00'),
(169, 84, 2, '2020-12-14 13:16:36', '2020-12-14 13:16:36'),
(170, 84, 5, '2020-12-14 13:16:36', '2020-12-14 13:16:36'),
(171, 84, 8, '2020-12-14 13:16:36', '2020-12-14 13:16:36'),
(172, 84, 11, '2020-12-14 13:16:36', '2020-12-14 13:16:36'),
(173, 84, 15, '2020-12-14 13:16:36', '2020-12-14 13:16:36'),
(174, 106, 2, '2020-12-14 13:30:20', '2020-12-14 13:30:20'),
(175, 106, 5, '2020-12-14 13:30:20', '2020-12-14 13:30:20'),
(176, 105, 2, '2020-12-14 13:30:49', '2020-12-14 13:30:49'),
(177, 105, 4, '2020-12-14 13:30:49', '2020-12-14 13:30:49'),
(178, 105, 8, '2020-12-14 13:30:49', '2020-12-14 13:30:49');

-- --------------------------------------------------------

--
-- Table structure for table `cages`
--

CREATE TABLE `cages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `inside` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cages`
--

INSERT INTO `cages` (`id`, `name`, `number`, `inside`, `created_at`, `updated_at`) VALUES
(1, 'Commerce', 1, 1, '2020-10-01 07:12:40', '2020-10-23 08:35:54'),
(2, 'Constellation', 2, 0, '2020-10-01 07:12:58', '2020-10-23 08:35:46'),
(3, 'Established', 3, 0, '2020-10-01 07:13:15', '2020-10-23 08:35:39'),
(4, 'Scheme', 10, 1, '2020-10-01 07:13:27', '2020-10-23 08:35:31'),
(5, 'Relax', 5, 0, '2020-10-01 07:13:43', '2020-10-23 08:35:26'),
(6, 'Engram', 6, 1, '2020-10-01 07:13:49', '2020-10-23 08:35:21'),
(7, 'Automatic', 7, 1, '2020-10-01 07:17:08', '2020-10-23 08:35:16'),
(8, 'Epico', 9, 1, '2020-10-20 10:03:41', '2020-10-23 08:35:08'),
(11, 'Buiten nummer 9', 9, 0, '2020-11-02 09:37:28', '2020-11-02 09:37:28');

-- --------------------------------------------------------

--
-- Table structure for table `cage_species_link_`
--

CREATE TABLE `cage_species_link_` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cage_id` bigint(20) UNSIGNED NOT NULL,
  `species_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cage_species_link_`
--

INSERT INTO `cage_species_link_` (`id`, `cage_id`, `species_id`, `created_at`, `updated_at`) VALUES
(1, 8, 1, '2020-10-23 08:35:08', '2020-10-23 08:35:08'),
(2, 8, 4, '2020-10-23 08:35:08', '2020-10-23 08:35:08'),
(3, 8, 5, '2020-10-23 08:35:08', '2020-10-23 08:35:08'),
(4, 7, 1, '2020-10-23 08:35:16', '2020-10-23 08:35:16'),
(5, 7, 2, '2020-10-23 08:35:16', '2020-10-23 08:35:16'),
(6, 7, 5, '2020-10-23 08:35:16', '2020-10-23 08:35:16'),
(7, 7, 6, '2020-10-23 08:35:16', '2020-10-23 08:35:16'),
(8, 6, 2, '2020-10-23 08:35:21', '2020-10-23 08:35:21'),
(9, 6, 3, '2020-10-23 08:35:21', '2020-10-23 08:35:21'),
(10, 5, 2, '2020-10-23 08:35:26', '2020-10-23 08:35:26'),
(11, 5, 4, '2020-10-23 08:35:26', '2020-10-23 08:35:26'),
(12, 5, 6, '2020-10-23 08:35:26', '2020-10-23 08:35:26'),
(13, 4, 1, '2020-10-23 08:35:32', '2020-10-23 08:35:32'),
(14, 4, 3, '2020-10-23 08:35:32', '2020-10-23 08:35:32'),
(15, 4, 6, '2020-10-23 08:35:32', '2020-10-23 08:35:32'),
(16, 3, 2, '2020-10-23 08:35:39', '2020-10-23 08:35:39'),
(17, 3, 3, '2020-10-23 08:35:39', '2020-10-23 08:35:39'),
(18, 2, 1, '2020-10-23 08:35:46', '2020-10-23 08:35:46'),
(19, 2, 2, '2020-10-23 08:35:46', '2020-10-23 08:35:46'),
(20, 2, 3, '2020-10-23 08:35:46', '2020-10-23 08:35:46'),
(21, 2, 4, '2020-10-23 08:35:46', '2020-10-23 08:35:46'),
(22, 2, 5, '2020-10-23 08:35:46', '2020-10-23 08:35:46'),
(23, 2, 6, '2020-10-23 08:35:46', '2020-10-23 08:35:46'),
(24, 1, 3, '2020-10-23 08:35:54', '2020-10-23 08:35:54'),
(25, 1, 4, '2020-10-23 08:35:54', '2020-10-23 08:35:54'),
(26, 11, 4, '2020-11-02 09:37:28', '2020-11-02 09:37:28');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2020_08_24_110941_create_owners_table', 2),
(5, '2020_08_24_110926_create_vegetables_table', 3),
(6, '2020_08_24_110900_create_animals_table', 4),
(7, '2020_08_24_111015_create_stays_table', 5),
(8, '2020_08_24_111050_create_statuses_table', 5),
(9, '2020_08_24_111150_create_animal_vegetable_link_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `residence` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_3` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `information` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`id`, `name`, `email`, `residence`, `address`, `postal_code`, `phone_1`, `phone_2`, `phone_3`, `information`, `deleted`, `created_at`, `updated_at`) VALUES
(1, 'Gerard Joling', 'gerard@gmail.com', 'Utrecht', 'Odermanlaan 92', '1248 HK', '065678514', NULL, NULL, 'Rare man...', 0, '2020-08-26 09:24:57', '2020-09-22 05:57:38'),
(2, 'Frans Bauer', 'fransb@hotmail.com', 'Vught', 'Hondsdraftstraat 26', '9211 HA', '0674783922', '0672523414', NULL, 'Hmmmm...', 0, '2020-08-31 08:02:05', '2020-09-22 05:57:13'),
(3, 'Barry Boterbeer', 'rabarber@hotmail.nl', '\'s-Hertogenbosch', 'Zuiderparkweg 500', '5216 HE', '0612355132', NULL, NULL, NULL, 0, '2020-08-31 08:03:33', '2020-09-22 05:56:16'),
(4, 'Tony Bologna', 'garfield@hoohoo.us', 'Eindhoven', 'Makkerweg 217', '4128 DE', '06378214323', '06243789423', '06327589513', 'Informationne', 0, '2020-08-31 08:08:25', '2020-09-22 05:57:52'),
(34, 'Verwijderd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2020-08-31 11:06:35', '2020-09-02 07:02:08'),
(35, 'Verwijderd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2020-08-31 11:07:07', '2020-09-02 07:02:05'),
(36, 'Verwijderd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2020-09-02 06:05:44', '2020-09-02 06:54:37'),
(37, 'Verwijderd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2020-09-21 09:47:35', '2020-09-21 09:47:39'),
(38, 'Tompiet the Mighty', 'tompiet@gmail.com', 'Amsterdam', 'Wuddeufug 202', '1235 DC', '064123874', NULL, NULL, NULL, 0, '2020-09-24 11:44:15', '2020-09-24 11:49:46'),
(40, 'Horkus Perkus', 'horkus@gmail.com', 'Den Haag', 'Wamoedelaan 61', '3215 XD', NULL, NULL, NULL, 'Oh, you\'re approaching me?', 0, '2020-10-08 10:04:14', '2020-10-08 10:04:14'),
(41, 'Colin Myerscough', 'colin@webvooruit.nl', 'Eindhoven', NULL, NULL, NULL, NULL, NULL, 'Ayaya!', 0, '2020-10-19 12:04:15', '2020-12-11 14:49:34'),
(42, 'Clovis Bray', 'clovis.bray@braytech.org', 'Creation', 'Asterion Abyss', '1230 EU', '0637423923', NULL, NULL, 'Artificial Intelligence activated: Enjoying yourselves Intruders? It\'s worth knowing the cataclysmic damage you will be responsible for today. Do not fool yourselves. This facility is not simply the fruitless work of some pathetic scientist; this house was built by the genius Clovis Bray I himself. Within lies humanity\'s salvation: \'La Fountaine de Jouvence\', made possible by Clarity Control. Magnificent wasn\'t it? An entity from beyond our own dimension, and the answer to humanity\'s eternal struggle: Mortality. Were it fall into the wrong hands, humanity and the universe would be utterly doomed. I have no reason to believe you are anything other than the wrong hand. You now face Godlike Judgement, may it extend eternally.', 0, '2020-12-14 13:14:20', '2020-12-14 13:14:20');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `species`
--

CREATE TABLE `species` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `species`
--

INSERT INTO `species` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Rat', '2020-10-20 11:06:28', '2020-10-20 11:06:28'),
(2, 'Muis', '2020-10-20 11:06:28', '2020-10-20 11:06:28'),
(3, 'Hamster', '2020-10-20 11:06:28', '2020-10-20 11:06:28'),
(4, 'Konijn', '2020-10-20 11:06:28', '2020-10-20 11:06:28'),
(5, 'Cavia', '2020-10-20 11:06:28', '2020-10-20 11:06:28'),
(6, 'Vogel', '2020-10-20 11:06:28', '2020-10-20 11:06:28');

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `stay_animal_link_id` bigint(20) UNSIGNED DEFAULT NULL,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fed` tinyint(1) DEFAULT 0,
  `peed` tinyint(1) DEFAULT 0,
  `pood` tinyint(1) DEFAULT 0,
  `information` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `stay_animal_link_id`, `date`, `time`, `fed`, `peed`, `pood`, `information`, `created_at`, `updated_at`) VALUES
(1, 80, '2020-12-01', '14:31:59', 1, 1, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at magna ac leo convallis ultricies id quis ipsum. Nam vehicula odio vel orci mattis, vitae aliquam arcu dignissim. Donec massa massa, dapibus non elementum eget, accumsan ut lorem. Suspendisse feugiat sodales nunc vel tristique.', '2020-11-09 12:21:45', '2020-12-01 12:33:27'),
(2, 81, '2020-12-01', '23:23:21', 0, 1, 1, 'Vervelend beest', '2020-11-09 12:21:45', '2020-12-01 12:33:27'),
(3, 82, '2020-11-26', '19:22:42', 1, 0, 0, 'Spontaan verdwenen', '2020-11-09 12:21:45', '2020-11-09 12:21:45'),
(4, 83, '2020-11-22', '05:54:23', 1, 1, 0, NULL, '2020-11-09 12:21:45', '2020-11-09 12:21:45'),
(5, 84, '2020-11-22', '13:12:55', 1, 0, 1, NULL, '2020-11-09 12:21:45', '2020-11-09 12:21:45'),
(6, 82, '2020-11-26', '16:24:45', 1, 0, 1, NULL, '2020-11-17 15:24:29', '2020-11-17 15:24:29'),
(17, 82, '2020-12-01', '12:23:40', 0, 0, 1, 'EMEME OO KELE', '2020-12-01 11:23:40', '2020-12-01 12:33:27'),
(37, 33, '2020-12-01', '13:34:42', 1, 0, 1, 'Obama did nothing wrong', '2020-12-01 12:34:42', '2020-12-01 13:00:42'),
(44, 28, '2020-12-01', '14:02:06', 0, 0, 1, NULL, '2020-12-01 13:02:06', '2020-12-01 13:02:08'),
(47, 82, '2020-12-01', '14:02:24', 1, 0, 1, NULL, '2020-12-01 13:02:24', '2020-12-01 13:02:30'),
(50, 33, '2020-12-01', '14:59:59', 1, 1, 1, 'Elegiggle', '2020-12-01 14:00:00', '2020-12-01 14:00:04'),
(53, 84, '2020-12-02', '12:19:39', 0, 0, 0, 'Extra info', '2020-12-02 11:19:39', '2020-12-02 11:23:29'),
(65, 89, '2020-12-03', '16:12:37', 0, 1, 1, 'E!', '2020-12-03 15:12:37', '2020-12-03 15:35:18'),
(70, 89, '2020-12-04', '15:59:14', 0, 0, 1, NULL, '2020-12-04 14:59:14', '2020-12-04 14:59:14'),
(72, 89, '2020-12-08', '10:32:14', 0, 0, 1, 'coo', '2020-12-08 09:32:14', '2020-12-10 12:53:09'),
(74, 89, '2020-12-08', '10:32:20', 0, 0, 1, 'yep\nye\nye\nye', '2020-12-08 09:32:20', '2020-12-08 09:33:13'),
(75, 89, '2020-12-10', '13:41:14', 0, 0, 1, NULL, '2020-12-10 12:41:14', '2020-12-10 12:41:14'),
(76, 34, '2020-12-10', '13:41:16', 0, 1, 1, NULL, '2020-12-10 12:41:16', '2020-12-10 12:41:16'),
(77, 28, '2020-12-10', '13:41:19', 0, 1, 1, NULL, '2020-12-10 12:41:19', '2020-12-10 12:41:19'),
(78, 29, '2020-12-10', '13:41:20', 1, 0, 0, NULL, '2020-12-10 12:41:20', '2020-12-10 12:41:20'),
(79, 80, '2020-12-10', '13:41:26', 0, 1, 0, NULL, '2020-12-10 12:41:26', '2020-12-10 12:41:26'),
(80, 81, '2020-12-10', '13:41:27', 0, 0, 1, NULL, '2020-12-10 12:41:27', '2020-12-10 12:41:27'),
(84, 33, '2020-12-10', '13:48:28', 0, 1, 1, NULL, '2020-12-10 12:48:28', '2020-12-10 12:48:28'),
(85, 86, '2020-12-10', '13:48:33', 1, 1, 1, NULL, '2020-12-10 12:48:33', '2020-12-10 12:48:33'),
(86, 89, '2020-12-10', '13:53:32', 1, 1, 1, NULL, '2020-12-10 12:53:32', '2020-12-10 12:53:32'),
(87, 89, '2020-12-11', '14:53:31', 0, 1, 1, NULL, '2020-12-11 13:53:31', '2020-12-11 13:53:31'),
(88, 34, '2020-12-11', '14:53:35', 1, 1, 0, 'Horse radish', '2020-12-11 13:53:35', '2020-12-11 13:54:37'),
(89, 34, '2020-12-11', '14:53:59', 0, 0, 1, 'Lmaotopkek', '2020-12-11 13:53:59', '2020-12-11 13:54:40'),
(91, 85, '2021-01-07', '13:10:50', 0, 1, 1, NULL, '2021-01-07 12:10:50', '2021-01-07 12:10:50'),
(92, 85, '2021-01-07', '13:10:53', 0, 1, 0, 'eer', '2021-01-07 12:10:53', '2021-01-07 12:10:53');

-- --------------------------------------------------------

--
-- Table structure for table `stays`
--

CREATE TABLE `stays` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `owner_id` bigint(20) UNSIGNED DEFAULT NULL,
  `start_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `information` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stays`
--

INSERT INTO `stays` (`id`, `owner_id`, `start_date`, `end_date`, `information`, `created_at`, `updated_at`) VALUES
(10, 2, '2020-09-03', '2020-12-30', 'Bite off human\'s toes if it fits i sits but ask to go outside and ask to come inside and ask to go outside and ask to come inside spit up on light gray carpet instead of adjacent linoleum howl on top of tall thing decide to want nothing to do with my owner today. Walk on keyboard ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss sit on human they not getting up ever but find empty spot in cupboard and sleep all day found somthing move i bite it tail for stand with legs in litter box, but poop outside but see owner, run in terror. What the heck just happened, something feels fishy. Find empty spot in cupboard and sleep all day. Going to catch the red dot today going to catch the red dot today immediately regret falling into bathtub or ooh, are those your $250 dollar sandals? lemme use that as my litter box but then cats take over the world so lick yarn hanging out of own butt catty ipsum.', '2020-09-28 09:44:37', '2020-11-05 14:05:47'),
(43, 3, '2020-10-09', '2020-11-27', 'Did you ever hear the tragedy of Darth Plagueis the Wise? I thought not. It\'s not a story the Jedi would tell you. It\'s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic, he could save others from death, but not himself.', '2020-10-29 10:30:35', '2020-10-29 10:30:35'),
(44, 4, '2020-10-08', '2020-12-25', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at magna ac leo convallis ultricies id quis ipsum. Nam vehicula odio vel orci mattis, vitae aliquam arcu dignissim. Donec massa massa, dapibus non elementum eget, accumsan ut lorem. Suspendisse feugiat sodales nunc vel tristique. Fusce fermentum maximus augue in auctor. Mauris nec varius nunc. Vestibulum nibh enim, mattis ut scelerisque id, aliquam nec urna. Curabitur sodales tempor ex, suscipit viverra dolor lobortis nec. Phasellus sit amet consectetur enim. Mauris ac metus consectetur, placerat nibh sollicitudin, volutpat ante. Sed purus tortor, cursus nec lorem at, molestie tempor diam. Morbi id placerat lorem, vel tincidunt odio.', '2020-10-29 10:32:29', '2020-11-01 18:52:10'),
(45, 1, '2020-10-01', '2020-10-31', 'Donec suscipit ut neque ac consectetur. Sed turpis est, faucibus eu quam in, venenatis semper lorem. Praesent aliquam erat hendrerit odio lacinia dignissim. Nunc aliquam est vitae sem vehicula, at ornare massa venenatis. Maecenas malesuada diam sed pretium feugiat. Donec porttitor maximus ex, sed interdum urna vehicula eget. Ut id tristique tortor. Phasellus enim nunc, accumsan ac tempus at, accumsan ac orci. Suspendisse odio elit, lobortis vitae eros eget, efficitur congue lectus.\r\n\r\n', '2020-10-29 13:14:10', '2020-10-29 13:14:10'),
(47, 40, '2020-12-03', '2021-01-02', 'Suspendisse potenti. Suspendisse potenti. In semper nulla sit amet purus suscipit facilisis. In et lectus quis felis auctor finibus in et arcu. Donec consequat scelerisque est, in faucibus justo maximus sed. Maecenas aliquet bibendum diam, sed ornare dolor bibendum ac. Duis fringilla pharetra nisl nec accumsan. In eget nisi non risus volutpat commodo vel a nisl. Etiam blandit semper mauris, sit amet molestie mauris fringilla sed. Pellentesque vehicula scelerisque nunc, ac suscipit diam varius quis.', '2020-11-01 17:31:39', '2020-12-02 11:25:19'),
(48, 41, '2020-11-05', '2020-12-20', 'In at massa non nulla consectetur luctus rutrum id velit. Cras enim leo, semper et sapien eget, fringilla efficitur tellus. Pellentesque a ligula vitae velit rutrum imperdiet non mattis libero. Vestibulum eu lorem ac tellus auctor dictum. Donec eu nisi eros. Aliquam leo massa, commodo at sapien eu, laoreet sodales urna. Duis quis purus elementum, vehicula metus at, scelerisque ipsum. Donec magna ante, rutrum eget orci eget, malesuada maximus dolor. Etiam fringilla dapibus risus eu dignissim. Fusce ac augue id quam porttitor tempor. Integer turpis arcu, faucibus ac erat vel, cursus porta nisl. Duis auctor ligula non nisi pellentesque placerat. Nam ullamcorper accumsan elit quis condimentum. Proin nec magna sed nisl gravida gravida ut non quam.\r\n\r\n\r\n', '2020-11-01 18:54:59', '2020-11-01 18:54:59'),
(49, 1, '2020-12-31', '2021-01-23', 'Phasellus nibh urna, posuere a consequat at, finibus nec velit. Aliquam volutpat ultricies nunc vel porttitor. Curabitur blandit placerat risus ac rhoncus. Sed condimentum nibh et odio blandit, ac eleifend leo pulvinar. Aliquam erat volutpat. Donec suscipit urna ac luctus bibendum. Aenean ac massa tempor, luctus neque nec, commodo metus.\r\n\r\n', '2020-11-01 19:28:38', '2020-11-01 19:28:56'),
(58, 3, '2020-11-17', '2020-12-01', 'Destroy couch. Am in trouble, roll over, too cute for human to get mad i rule on my back you rub my tummy i bite you hard, the best thing in the universe is a cardboard box and chase after silly colored fish toys around the house humans,humans, humans oh how much they love us felines we are the center of attention they feed, they clean plan steps for world domination refuse to drink water except out of someone\'s glass. Make meme, make cute face pee in the shoe. As lick i the shoes give me attention or face the wrath of my claws, but oooo! dangly balls! jump swat swing flies so sweetly to the floor crash move on wash belly nap and instantly break out into full speed gallop across the house for no reason cat fur is the new black . Lick the other cats commence midnight zoomies so hate dog, but catty ipsum for bury the poop bury it deep or ask to go outside and ask to come inside and ask to go outside and ask to come inside. Jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water nap all day, so purr when being pet lick the plastic bag funny little cat chirrup noise shaking upright tail when standing next to you. Drool car rides are evil yet hack up furballs i is not fat, i is fluffy, cat not kitten around or meow meow meow. Scamper meow meow we are 3 small kittens sleeping most of our time, we are around 15 weeks old i think, i don’t know i can’t count attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what\'s your problem? i meant to do that now i shall wash myself intently yet attack dog, run away and pretend to be victim so toy mouse squeak roll over. Ptracy bite plants attack the child. I\'m going to lap some water out of my master\'s cup meow refuse to leave cardboard box show belly hate dog chase dog then run away steal raw zucchini off kitchen counter. Push your water glass on the floor refuse to drink water except out of someone\'s glass kitty kitty cough furball into food bowl then scratch owner for a new one and meow in empty rooms or stick butt in face sit in a box for hours. Scratch the postman wake up lick paw wake up owner meow meow sitting in a box. Whatever walk on keyboard so i like cats because they are fat and fluffy or cats are the world cuddle no cuddle cuddle love scratch scratch, bleghbleghvomit my furball really tie the room together. Shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff destroy couch as revenge or stare at ceiling jump five feet high and sideways when a shadow moves. Chase mice play with twist ties or mesmerizing birds, but massacre a bird in the living room and then look like the cutest and most innocent animal on the planet commence midnight zoomies but thug cat . All of a sudden cat goes crazy making bread on the bathrobe but roll over and sun my belly and poop on the floor, break a planter, sprint, eat own hair, vomit hair, hiss, chirp at birds, eat a squirrel, hide from fireworks, lick toe beans, attack christmas tree. Lounge in doorway. Meow meow mama chew master\'s slippers rub my belly hiss, hack up furballs or jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water and cats woo. Leave hair on owner\'s clothes stare at imaginary bug, so climb into cupboard and lick the salt off rice cakes or look at dog hiiiiiisssss, push your water glass on the floor this is the day . Sitting in a box jump on counter removed by human jump on counter again removed by human meow before jumping on counter this time to let the human know am coming back and stare at wall turn and meow stare at wall some more meow again continue staring for sit in box catasstrophe. Paw your face to wake you up in the morning hiding behind the couch until lured out by a feathery toy stare out the window love me!. Hide head under blanket so no one can see. I can haz. Give attitude.', '2020-11-03 13:28:07', '2020-12-02 11:26:09'),
(59, 1, '2020-12-25', '2021-01-15', 'Drink water out of the faucet woops poop hanging from butt must get rid run run around house drag poop on floor maybe it comes off woops left brown marks on floor human slave clean lick butt now. Floof tum, tickle bum, jellybean footies curly toes there\'s a forty year old lady there let us feast, for stuff and things or catch eat throw up catch eat throw up bad birds and i\'m bored inside, let me out i\'m lonely outside, let me in i can\'t make up my mind whether to go in or out, guess i\'ll just stand partway in and partway out, contemplating the universe for half an hour how dare you nudge me with your foot?!?! leap into the air in greatest offense! so flex claws on the human\'s belly and purr like a lawnmower. Gate keepers of hell. Ptracy my water bowl is clean and freshly replenished, so i\'ll drink from the toilet for annoy kitten brother with poking, eats owners hair then claws head my left donut is missing, as is my right. Open the door, let me out, let me out, let me-out, let me-aow, let meaow, meaow! howl on top of tall thing and pooping rainbow while flying in a toasted bread costume in space. Cat is love, cat is life commence midnight zoomies, and have a lot of grump in yourself because you can\'t forget to be grumpy and not be like king grumpy cat for really likes hummus, let me in let me out let me in let me out let me in let me out who broke this door anyway . Slap the dog because cats rule walk on keyboard and i like cats because they are fat and fluffy and whatever but stare out cat door then go back inside. Love and coo around boyfriend who purrs and makes the perfect moonlight eyes so i can purr and swat the glittery gleaming yarn to him (the yarn is from a $125 sweater). Gate keepers of hell. Stare at imaginary bug find box a little too small and curl up with fur hanging out . Cat gets stuck in tree firefighters try to get cat down firefighters get stuck in tree cat eats firefighters\' slippers taco cat backwards spells taco cat yet meow meow mama. Love you, then bite you sit in a box for hours and cat dog hate mouse eat string barf pillow no baths hate everything mesmerizing birds litter box is life. I like cats because they are fat and fluffy sleeps on my head or mark territory when in doubt, wash yet i is not fat, i is fluffy jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water. Who\'s the baby being gorgeous with belly side up, but love has closed eyes but still sees you meow for food, then when human fills food dish, take a few bites of food and continue meowing kitty loves pigs. Meowwww get suspicious of own shadow then go play with toilette paper. Poop on grasses kitty pounce, trip, faceplant you didn\'t see that no you didn\'t definitely didn\'t lick, lick, lick, and preen away the embarrassment so intently stare at the same spot pet me pet me pet me pet me, bite, scratch, why are you petting me but stare at guinea pigs give me attention or face the wrath of my claws.\r\n', '2020-11-13 11:45:01', '2020-11-13 11:45:01'),
(60, 2, '2020-12-03', '2020-12-17', NULL, '2020-12-02 11:30:33', '2020-12-02 11:30:33'),
(61, 38, '2021-01-07', '2021-02-19', NULL, '2020-12-04 14:37:01', '2020-12-04 14:37:01'),
(62, 40, '2020-12-11', '2021-01-22', NULL, '2020-12-14 13:06:32', '2020-12-14 13:06:32'),
(70, 42, '2020-12-06', '2021-03-19', 'Maps end. Maps insist on having borders and edges or the table falls away. Which isn’t the way the universe works.', '2020-12-14 13:31:02', '2020-12-14 13:31:02');

-- --------------------------------------------------------

--
-- Table structure for table `stay_animal_link`
--

CREATE TABLE `stay_animal_link` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `animal_id` bigint(20) UNSIGNED DEFAULT NULL,
  `stay_id` bigint(20) UNSIGNED DEFAULT NULL,
  `cage_id` bigint(20) UNSIGNED DEFAULT NULL,
  `medication` tinyint(1) DEFAULT 0,
  `nails` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stay_animal_link`
--

INSERT INTO `stay_animal_link` (`id`, `animal_id`, `stay_id`, `cage_id`, `medication`, `nails`, `created_at`, `updated_at`) VALUES
(10, 10, 43, 1, 0, 0, '2020-10-29 10:30:35', '2020-10-29 10:30:35'),
(11, 28, 43, 2, 0, 0, '2020-10-29 10:30:35', '2020-10-29 10:30:35'),
(14, 11, 45, 2, 0, 0, '2020-10-29 13:14:10', '2020-10-29 13:14:10'),
(28, 61, 44, 4, 0, 0, '2020-11-01 18:52:10', '2020-11-01 18:52:10'),
(29, 37, 44, 1, 0, 0, '2020-11-01 18:52:10', '2020-11-01 18:52:10'),
(33, 65, 48, 7, 0, 0, '2020-11-01 18:54:59', '2020-11-01 18:54:59'),
(34, 66, 48, 7, 0, 0, '2020-11-01 18:54:59', '2020-11-01 18:54:59'),
(48, 67, 49, 6, 0, 1, '2020-11-01 19:28:56', '2020-11-01 19:28:56'),
(49, 11, 49, 5, 1, 1, '2020-11-01 19:28:56', '2020-11-01 19:28:56'),
(80, 81, 10, 7, 0, 0, '2020-11-05 14:05:48', '2020-11-05 14:05:48'),
(81, 82, 10, 7, 0, 0, '2020-11-05 14:05:48', '2020-11-05 14:05:48'),
(82, 63, 10, 6, 0, 1, '2020-11-05 14:05:48', '2020-11-05 14:05:48'),
(83, 9, 10, 6, 1, 0, '2020-11-05 14:05:48', '2020-11-05 14:05:48'),
(84, 1, 10, 7, 1, 1, '2020-11-05 14:05:48', '2020-11-05 14:05:48'),
(85, 11, 59, 5, 0, 0, '2020-11-13 11:45:01', '2020-11-13 11:45:01'),
(86, 64, 47, 2, 0, 0, '2020-12-02 11:25:19', '2020-12-02 11:25:19'),
(87, 78, 58, 2, 0, 0, '2020-12-02 11:26:09', '2020-12-02 11:26:09'),
(88, 10, 58, 1, 0, 0, '2020-12-02 11:26:09', '2020-12-02 11:26:09'),
(89, 81, 60, 2, 0, 0, '2020-12-02 11:30:33', '2020-12-02 11:30:33'),
(90, 46, 61, 7, 0, 0, '2020-12-04 14:37:01', '2020-12-04 14:37:01'),
(91, 84, 62, 1, 0, 0, '2020-12-14 13:06:32', '2020-12-14 13:06:32'),
(92, 64, 62, 2, 0, 0, '2020-12-14 13:06:32', '2020-12-14 13:06:32'),
(93, 83, 62, 1, 0, 0, '2020-12-14 13:06:32', '2020-12-14 13:06:32'),
(116, 105, 70, 2, 0, 0, '2020-12-14 13:31:02', '2020-12-14 13:31:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Thom de Rooij', 'thom.de.rooy@hotmail.nl', NULL, '$2y$10$K1WSw9kEXuKodFvxpbsHCeBGpFXOiHxYfZoTheCDxn33yfhjca9oa', 'rBjHdZjErgIfex0wwNSrqiFT4EFgqfAlc1UcmyVDvwyaUP96tsw5tk3Ys7Sb', '2020-12-10 14:44:46', '2020-12-10 14:44:46'),
(5, 'Barry', 'barry@hotmail.nl', NULL, '$2y$10$FkONKnIfeIDT20/PY2akY.xWNrXDHiVMF5N7rHJ64f9U6xVl.GRRW', 'xrxjldhKftiywus24gEAyxZNt9cdJi0k4Z6UJIfAdGYHHWTztd0tPeB31YOf', '2020-12-17 14:09:29', '2020-12-17 14:09:29'),
(6, 'Eebher', 'eibheer@gmail.com', NULL, '$2y$10$hngIvq0Ud2zmewO5IOZWUeKAH1DMT/gVcWPPbz00/dPu2Q2H9DhRm', NULL, '2020-12-17 14:35:01', '2020-12-17 14:35:01');

-- --------------------------------------------------------

--
-- Table structure for table `vegetables`
--

CREATE TABLE `vegetables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vegetables`
--

INSERT INTO `vegetables` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Wortel', '2020-09-28 07:35:19', '2020-09-28 07:35:19'),
(2, 'Sla', '2020-09-28 07:35:34', '2020-09-28 07:35:34'),
(3, 'Komkommer', '2020-09-28 07:35:36', '2020-09-28 07:35:36'),
(4, 'Witlof', '2020-09-28 07:35:38', '2020-09-28 07:35:38'),
(5, 'Andijvie', '2020-09-28 07:35:47', '2020-09-28 07:35:47'),
(6, 'Broccoli', '2020-09-28 07:36:19', '2020-09-28 07:36:19'),
(7, 'Appel', '2020-09-28 07:36:31', '2020-09-28 07:36:31'),
(8, 'Paprika', '2020-09-28 07:36:34', '2020-09-28 07:36:34'),
(9, 'Banaan', '2020-09-28 07:36:36', '2020-09-28 07:36:36'),
(10, 'Peer', '2020-09-28 07:36:38', '2020-09-28 07:36:38'),
(11, 'Aarbei', '2020-09-28 07:36:57', '2020-09-28 07:36:57'),
(12, 'Ijsbergsla', '2020-09-28 07:37:04', '2020-09-28 07:37:04'),
(14, 'Tosti', '2020-09-28 09:05:53', '2020-09-28 09:05:53'),
(15, 'Makreel', '2020-09-28 11:37:25', '2020-09-28 11:37:25'),
(16, 'Asperger', '2020-12-14 14:09:17', '2020-12-14 14:09:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `animals_owner_id_foreign` (`owner_id`);

--
-- Indexes for table `animal_vegetable_link`
--
ALTER TABLE `animal_vegetable_link`
  ADD PRIMARY KEY (`id`),
  ADD KEY `animal_vegetable_link_animal_id_foreign` (`animal_id`),
  ADD KEY `animal_vegetable_link_vegetable_id_foreign` (`vegetable_id`);

--
-- Indexes for table `cages`
--
ALTER TABLE `cages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cage_species_link_`
--
ALTER TABLE `cage_species_link_`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cage_id_foreign` (`cage_id`),
  ADD KEY `species_id_foreign` (`species_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stay_animal_link_id` (`stay_animal_link_id`);

--
-- Indexes for table `stays`
--
ALTER TABLE `stays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stays_owner_id_foreign` (`owner_id`);

--
-- Indexes for table `stay_animal_link`
--
ALTER TABLE `stay_animal_link`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stay_id` (`stay_id`),
  ADD KEY `animal_id` (`animal_id`),
  ADD KEY `cage_id_foreign_yes` (`cage_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vegetables`
--
ALTER TABLE `vegetables`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animals`
--
ALTER TABLE `animals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `animal_vegetable_link`
--
ALTER TABLE `animal_vegetable_link`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT for table `cages`
--
ALTER TABLE `cages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `cage_species_link_`
--
ALTER TABLE `cage_species_link_`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `species`
--
ALTER TABLE `species`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `stays`
--
ALTER TABLE `stays`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `stay_animal_link`
--
ALTER TABLE `stay_animal_link`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `vegetables`
--
ALTER TABLE `vegetables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `animals`
--
ALTER TABLE `animals`
  ADD CONSTRAINT `animals_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `animal_vegetable_link`
--
ALTER TABLE `animal_vegetable_link`
  ADD CONSTRAINT `animal_vegetable_link_animal_id_foreign` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `animal_vegetable_link_vegetable_id_foreign` FOREIGN KEY (`vegetable_id`) REFERENCES `vegetables` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cage_species_link_`
--
ALTER TABLE `cage_species_link_`
  ADD CONSTRAINT `cage_id_foreign` FOREIGN KEY (`cage_id`) REFERENCES `cages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `species_id_foreign` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `statuses`
--
ALTER TABLE `statuses`
  ADD CONSTRAINT `stay_animal_link_id` FOREIGN KEY (`stay_animal_link_id`) REFERENCES `stay_animal_link` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stays`
--
ALTER TABLE `stays`
  ADD CONSTRAINT `stays_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `stay_animal_link`
--
ALTER TABLE `stay_animal_link`
  ADD CONSTRAINT `animal_id` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `cage_id_foreign_yes` FOREIGN KEY (`cage_id`) REFERENCES `cages` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `stay_id` FOREIGN KEY (`stay_id`) REFERENCES `stays` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
