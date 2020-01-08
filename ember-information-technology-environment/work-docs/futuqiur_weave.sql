-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 09, 2019 at 05:29 AM
-- Server version: 10.1.37-MariaDB-cll-lve
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `futuqiur_weave`
--

-- --------------------------------------------------------

--
-- Table structure for table `authorisation_type`
--

CREATE TABLE `authorisation_type` (
  `authorisation_type_id` int(11) UNSIGNED NOT NULL COMMENT 'authorisation type id',
  `authorisation_type_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'name',
  `authorisation_type_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authorisation_type`
--

INSERT INTO `authorisation_type` (`authorisation_type_id`, `authorisation_type_name`, `authorisation_type_description`) VALUES
(0, 'No authorisation\r\n', NULL),
(1, 'Logged-in user', NULL),
(2, 'Moderator', NULL),
(3, 'Supermoderator', NULL),
(4, 'Administrator', NULL),
(5, 'Overseer', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `character`
--

CREATE TABLE `character` (
  `character_id` int(11) UNSIGNED NOT NULL COMMENT 'character id',
  `character_node_id` bigint(20) UNSIGNED NOT NULL COMMENT 'character node id, relate to node',
  `character_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'character name',
  `character_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description',
  `character_name_list` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'alternate names, csv'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `character_category`
--

CREATE TABLE `character_category` (
  `character_category_id` bigint(20) UNSIGNED NOT NULL,
  `character_category_script` bigint(20) UNSIGNED NOT NULL,
  `character_category_name` longtext COLLATE utf8_unicode_ci NOT NULL,
  `character_category_comment` longtext COLLATE utf8_unicode_ci
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `data_id` bigint(20) UNSIGNED NOT NULL COMMENT 'data id, also file name',
  `data_current_revision` bigint(20) UNSIGNED NOT NULL COMMENT 'current revision'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`data_id`, `data_current_revision`) VALUES
(1, 0),
(2, 0),
(3, 0),
(4, 0),
(5, 0),
(6, 0),
(7, 0),
(8, 0),
(9, 0),
(10, 0),
(11, 0),
(12, 0),
(13, 0),
(14, 0),
(15, 0),
(16, 0),
(17, 0),
(18, 0),
(19, 0),
(20, 20),
(21, 21),
(22, 22),
(23, 23),
(24, 24),
(25, 25),
(26, 26),
(27, 27),
(28, 28),
(29, 29),
(30, 30),
(31, 31),
(32, 32),
(33, 33),
(34, 34),
(35, 35),
(36, 36),
(37, 37),
(38, 38),
(39, 39),
(40, 40),
(41, 41),
(42, 42),
(43, 43),
(44, 44),
(45, 45),
(46, 46),
(47, 47),
(48, 48),
(49, 49),
(50, 50),
(51, 51),
(52, 52),
(53, 53),
(54, 54),
(55, 55),
(56, 56),
(57, 57);

-- --------------------------------------------------------

--
-- Table structure for table `data_revision`
--

CREATE TABLE `data_revision` (
  `data_revision_id` bigint(20) UNSIGNED NOT NULL COMMENT 'data revision id, also file name',
  `data_revision_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'original file name',
  `data_revision_length` bigint(20) UNSIGNED NOT NULL COMMENT 'length of data',
  `data_revision_type` int(20) UNSIGNED DEFAULT NULL COMMENT 'data format, relate to dttp',
  `data_revision_node_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'nodeid',
  `data_revision_md5` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'MD5 sum of data',
  `data_revision_data_id` bigint(20) UNSIGNED NOT NULL COMMENT 'id of data of which this is a revision, relate to data',
  `data_revision_node_edit_id` bigint(20) UNSIGNED NOT NULL COMMENT 'edit that created this data revision, relate to nder'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `data_revision`
--

INSERT INTO `data_revision` (`data_revision_id`, `data_revision_name`, `data_revision_length`, `data_revision_type`, `data_revision_node_id`, `data_revision_md5`, `data_revision_data_id`, `data_revision_node_edit_id`) VALUES
(1, 'name', 0, 0, 0, 'md5', 0, 0),
(2, '', 0, 0, 0, 'not yet hashed', 3, 0),
(3, '', 0, 0, 0, 'not yet hashed', 4, 0),
(4, '', 0, 0, 0, 'not yet hashed', 5, 0),
(5, '', 0, 0, 0, 'not yet hashed', 6, 0),
(6, '', 0, 0, 0, 'not yet hashed', 7, 0),
(7, '', 0, 0, 0, 'not yet hashed', 8, 0),
(8, '', 0, 0, 0, 'not yet hashed', 9, 0),
(9, '', 0, 0, 0, 'not yet hashed', 10, 0),
(10, '.gtkrc-2.0-gnome-color-chooser', 194, 0, 0, 'not yet hashed', 11, 0),
(11, '', 0, 0, 0, 'not yet hashed', 12, 0),
(12, '', 0, 0, 0, 'not yet hashed', 13, 0),
(13, '', 0, 0, 0, 'not yet hashed', 14, 0),
(14, '', 0, 0, 0, 'not yet hashed', 15, 0),
(15, '.gtkrc-2.0-gnome-color-chooser', 194, 0, 0, 'not yet hashed', 16, 0),
(16, '.gtkrc-2.0-gnome-color-chooser', 194, 0, 0, 'not yet hashed', 17, 0),
(17, '.gtkrc-2.0-gnome-color-chooser', 194, 0, 0, 'not yet hashed', 18, 0),
(18, '.gnuplot_history', 2938, 0, 0, 'not yet hashed', 19, 0),
(19, 'MCGAUNN-1921.ged', 1403, 0, 0, 'not yet hashed', 20, 0),
(20, 'MCGAUNN-1921.ged', 1403, 0, 0, 'not yet hashed', 21, 0),
(21, 'MCGAUNN-1921.ged', 1403, 0, 0, 'not yet hashed', 22, 0),
(22, 'MCGAUNN-1921.ged', 1403, 0, 0, 'not yet hashed', 23, 0),
(23, 'MCGAUNN-1921.ged', 1403, 0, 0, 'not yet hashed', 24, 0),
(24, 'MCGAUNN-1921.ged', 1403, 0, 0, 'not yet hashed', 25, 0),
(25, 'MCGAUNN-1921.ged', 1403, 0, 0, 'not yet hashed', 26, 0),
(26, 'MCGAUNN-1921.ged', 1403, 0, 0, 'not yet hashed', 27, 0),
(27, 'MCGAUNN-1921.ged', 1403, 0, 0, 'not yet hashed', 28, 0),
(28, 'MCGAUNN-1921.ged', 1403, 0, 0, 'not yet hashed', 29, 0),
(29, 'MCGAUNN-1921.ged', 1403, 0, 0, 'not yet hashed', 30, 0),
(30, '.gnuplot-wxt', 49, 0, 0, 'not yet hashed', 31, 0),
(31, '.gnuplot-wxt', 49, 0, 0, 'not yet hashed', 32, 0),
(32, '5289559623_b0bf6ed1a6_o.jpg', 226567, 0, 0, 'not yet hashed', 33, 0),
(33, '5289559623_b0bf6ed1a6_o.jpg', 226567, 0, 0, 'not yet hashed', 34, 0),
(34, '5289559623_b0bf6ed1a6_o.jpg', 226567, 0, 0, 'not yet hashed', 35, 0),
(35, '.gnuplot_history', 2938, 0, 0, 'not yet hashed', 36, 0),
(36, '.gnuplot_history', 2938, 0, 0, 'not yet hashed', 37, 0),
(37, '.gnuplot_history', 2938, 0, 0, 'not yet hashed', 38, 0),
(38, '.gnuplot_history', 2938, 0, 0, 'not yet hashed', 39, 0),
(39, '.gnuplot_history', 2938, 0, 0, 'not yet hashed', 40, 0),
(40, '.gnuplot_history', 2938, 0, 0, 'not yet hashed', 41, 0),
(41, '.gnuplot_history', 2938, 0, 0, 'not yet hashed', 42, 0),
(42, '.gnuplot_history', 2938, 0, 0, 'not yet hashed', 43, 0),
(43, '.gnuplot_history', 2938, 0, 0, 'not yet hashed', 44, 0),
(44, '.gnuplot_history', 2938, 0, 0, 'c5adabb4a9a9dd8e815277f2ee1a920f', 45, 0),
(45, '.gnuplot_history', 2938, 0, 0, 'c5adabb4a9a9dd8e815277f2ee1a920f', 46, 0),
(46, '', 0, 0, 0, '1308a9e32f6fbd1ea2c64688bff4746b', 47, 0),
(47, '', 0, 0, 0, '98536b097ae5ad2ce3c670ae488ca5bb', 48, 0),
(48, '', 0, 0, 0, '98536b097ae5ad2ce3c670ae488ca5bb', 49, 0),
(49, '', 0, 0, 0, '98536b097ae5ad2ce3c670ae488ca5bb', 50, 0),
(50, '', 0, 0, 0, '98536b097ae5ad2ce3c670ae488ca5bb', 51, 0),
(51, '', 0, 0, 0, '98536b097ae5ad2ce3c670ae488ca5bb', 52, 0),
(52, '', 0, 0, 0, '98536b097ae5ad2ce3c670ae488ca5bb', 53, 0),
(53, '', 0, 0, 0, '98536b097ae5ad2ce3c670ae488ca5bb', 54, 0),
(54, '', 0, 0, 0, '98536b097ae5ad2ce3c670ae488ca5bb', 55, 0),
(55, '', 0, 0, 0, '4457d3e7cef6912a1aa2c4afb57d18fe', 56, 0),
(56, '', 0, 0, 0, '4457d3e7cef6912a1aa2c4afb57d18fe', 57, 0);

-- --------------------------------------------------------

--
-- Table structure for table `data_type`
--

CREATE TABLE `data_type` (
  `data_type_id` int(10) UNSIGNED NOT NULL COMMENT 'data type id',
  `data_type_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'name',
  `data_type_node_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'node id, relate to node',
  `data_type_display_flag` tinyint(1) UNSIGNED NOT NULL COMMENT 'display',
  `data_type_display_type_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'display type, relate to dstp',
  `data_type_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `data_type`
--

INSERT INTO `data_type` (`data_type_id`, `data_type_name`, `data_type_node_id`, `data_type_display_flag`, `data_type_display_type_id`, `data_type_description`) VALUES
(1, '', NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `datetime`
--

CREATE TABLE `datetime` (
  `datetime_id` bigint(20) UNSIGNED NOT NULL COMMENT 'datetime id',
  `datetime_string` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'datetime or range string'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dce`
--

CREATE TABLE `dce` (
  `dce_id` bigint(20) UNSIGNED NOT NULL COMMENT 'id',
  `dce_category` bigint(20) UNSIGNED NOT NULL COMMENT 'DCE category',
  `dce_name` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT 'DCE standard name',
  `dce_html` longtext COLLATE utf8_unicode_ci COMMENT 'html',
  `dce_comment` longtext COLLATE utf8_unicode_ci COMMENT 'comment',
  `dce_decomposition` longtext COLLATE utf8_unicode_ci COMMENT 'dce decomp',
  `dce_aka` longtext COLLATE utf8_unicode_ci COMMENT 'alternative character names',
  `dce_see_also` longtext COLLATE utf8_unicode_ci COMMENT 'related characters',
  `dce_comments` longtext COLLATE utf8_unicode_ci COMMENT 'DCE standard comments',
  `dce_mojikyo` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Mojikyo equivalent',
  `dce_tron` text COLLATE utf8_unicode_ci COMMENT 'TRON equivalent',
  `dce_armscii8` text COLLATE utf8_unicode_ci COMMENT 'ARMSCII-8 equivalent',
  `dce_unicode` text COLLATE utf8_unicode_ci COMMENT 'unicode equivalent'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dce`
--

INSERT INTO `dce` (`dce_id`, `dce_category`, `dce_name`, `dce_html`, `dce_comment`, `dce_decomposition`, `dce_aka`, `dce_see_also`, `dce_comments`, `dce_mojikyo`, `dce_tron`, `dce_armscii8`, `dce_unicode`) VALUES
(1, 0, '', '@', 'this is an at-sign!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 0, 'name', '', NULL, 'decomposition', 'name, name, name', 'see also', 'comments', 30942, 'tron', 'armscii', ''),
(3, 0, 'name', '', NULL, 'decomposition', 'name, name, name', 'see also', 'comments', 30942, 'tron', 'armscii', ''),
(4, 0, '', '', NULL, '', '', '', '', 0, '', '', ''),
(5, 0, '', 'horcuhecruhcrehucrehcruhecrucreueu', NULL, '', '', '', '', 0, '', '', ''),
(6, 0, '', 'horcuhecruhcrehucrehcruhecrucreueu', NULL, '', '', '', '', 0, '', '', ''),
(7, 0, 'Latin Majuscule A', 'html equiv', NULL, 'decomposition', 'name, name, name', 'see also', 'comments', 0, 'tron ', 'armsicaa', ''),
(8, 0, 'test', 'steu', NULL, 'unho', 'nuthe', 'e.hu', 'eh', 0, 'h', 'h', ''),
(9, 0, 'test', 'steu', NULL, 'unho', 'nuthe', 'e.hu', 'eh', 0, 'h', 'h', '');

-- --------------------------------------------------------

--
-- Table structure for table `display_type`
--

CREATE TABLE `display_type` (
  `display_type_id` int(11) UNSIGNED NOT NULL COMMENT 'display type id',
  `display_type_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description',
  `display_type_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'name',
  `display_type_part_count` smallint(6) UNSIGNED DEFAULT NULL COMMENT 'number of times url must be displayed (1 or 2; is the number of necessary display strings minus 1)',
  `display_type_part_1` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'display string 1',
  `display_type_part_2` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'display string 2',
  `display_type_part_3` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'display string 3'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `display_type`
--

INSERT INTO `display_type` (`display_type_id`, `display_type_description`, `display_type_name`, `display_type_part_count`, `display_type_part_1`, `display_type_part_2`, `display_type_part_3`) VALUES
(0, '\r\n', '', NULL, '', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `edit_status`
--

CREATE TABLE `edit_status` (
  `edit_status_id` int(10) UNSIGNED NOT NULL COMMENT 'edit status id',
  `edit_status_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'name',
  `edit_status_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `field_type`
--

CREATE TABLE `field_type` (
  `field_type_id` int(10) UNSIGNED NOT NULL COMMENT 'field type id',
  `field_type_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'name',
  `field_type_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `interface`
--

CREATE TABLE `interface` (
  `interface_id` bigint(20) UNSIGNED NOT NULL COMMENT 'interface snippet id',
  `interface_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'name',
  `interface_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description',
  `interface_content` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'interface snippet content',
  `interface_comment` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'comment',
  `interface_contentFRA` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'french / française'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `interface`
--

INSERT INTO `interface` (`interface_id`, `interface_name`, `interface_description`, `interface_content`, `interface_comment`, `interface_contentFRA`) VALUES
(1, NULL, 'permission error text', 'no permissions: You do not have permission to read or write (depending on the action) the specified node', 'debug message\r\n', 'aucune autorisation: Vous n\'avez pas la permission de lire ou d\'écrire (en fonction de l\'action) le nœud spécifié'),
(2, NULL, NULL, 'unrecognised action', NULL, 'l\'action méconnue'),
(3, NULL, NULL, '&nbsp;&nbsp;(logged in)&nbsp;&nbsp;', NULL, '&nbsp;&nbsp;(connecté)&nbsp;&nbsp;'),
(4, NULL, NULL, 'Soit vous n\'avez pas la permission d\'exécuter l\'action spécifiée ou avoir spécifié une action non valide.', NULL, NULL),
(5, NULL, NULL, 'Login not verified: Password does not match checksum — Probably the password was incorrect.', NULL, 'Connectez-vous pas vérifié: Mot de passe ne correspond pas checksum — Probablement le mot de passe est incorrect.'),
(6, NULL, NULL, 'Login error: login not verified.', NULL, 'Erreur de connexion: connexion n\'est pas vérifiée.'),
(7, NULL, NULL, 'Not logged in: indicator not present', NULL, 'Non connecté: indicateur présente pas'),
(8, NULL, NULL, 'Welcome to Weave! Weave is a database designed to use relationships to organise information. I hope you find it useful! Secure access is available <a href=\"https://futuramerlincom.fatcow.com/r.php?c=w&a=1&locale=\">here</a>. ', NULL, 'Bienvenue sur Weave! Weave est une base de données conçu pour utiliser les relations d\'organiser l\'information. J\'espère qu\'elle vous sera utile! Accès sécurisé est disponible <a href=\"https://futuramerlincom.fatcow.com/pageview.php?page=weave.php?action%3Dhome%26locale%3D\">ici</a>. '),
(9, 'Login form', NULL, 'Log in: <form action=\"https://futuramerlincom.fatcow.com/r.php\" method=\"post\"><input type=\"hidden\" name=\"c\" value=\"w\">Username:<input type=\"text\" name=\"wvUserName\"> Password:<input type=\"password\" name=\"wvUserPassword\"><input type=\"hidden\" name=\"a\" value=\"12\"><input type=\"hidden\" name=\"login\" value=\"1\"><input type=\"submit\"></form>', NULL, 'Connexion: <form action=\"https://futuramerlincom.fatcow.com/r.php\" method=\"post\"><input type=\"hidden\" name=\"c\" value=\"w\">Nom d\'utilisateur:<input type=\"text\" name=\"wvUserName\"> Mot de passe:<input type=\"password\" name=\"wvUserPassword\"><input type=\"hidden\" name=\"a\" value=\"12\"><input type=\"hidden\" name=\"login\" value=\"1\"><input type=\"hidden\" name=\"locale\" value=\"2\"><input type=\"submit\"></form>'),
(10, 'New user form', NULL, 'New user: <form action=\"https://futuramerlincom.fatcow.com/r.php\" method=\"post\"><input type=\"hidden\" name=\"c\" value=\"w\">Username:<input type=\"text\" name=\"userName\"> Password (<b><i>CAUTION</i></b>: type this VERY carefully!):<input type=\"password\" name=\"password\"> Node ID corresponding to you (leave this blank if you do not have one):<input type=\"text\" name=\"newUserNodeId\"><input type=\"hidden\" name=\"a\" value=\"14\"><input type=\"hidden\" name=\"login\" value=\"0\"><input type=\"submit\"></form>', NULL, 'Nouvel utilisateur: <form action=\"https://futuramerlincom.fatcow.com/r.php\" method=\"post\"><input type=\"hidden\" name=\"c\" value=\"w\">Nom d\'utilisateur:<input type=\"text\" name=\"userName\"> Mot de passe (<b><i>AVERTISSEMENT</i></b>: type de cela TRÈS attentivement!):<input type=\"password\" name=\"password\"> Node ID correspondant à vous (laisser ce champ vide si vous n\'en avez pas):<input type=\"text\" name=\"newUserNodeId\"><input type=\"hidden\" name=\"a\" value=\"14\"><input type=\"hidden\" name=\"login\" value=\"0\"><input type=\"submit\"><input type=\"hidden\" name=\"locale\" value=\"2\"></form>'),
(11, NULL, NULL, 'Added user ', NULL, 'Ajouté utilisateur '),
(12, NULL, NULL, '. Click ', NULL, '. Clic '),
(13, NULL, NULL, ' to log in. You are user number ', NULL, ' pour vous connecter. Vous êtes le numéro de l\'utilisateur '),
(14, NULL, NULL, '. Your user data string is: ', NULL, NULL),
(15, NULL, NULL, 'Error. A user with that name already exists. Please click ', NULL, 'Erreur. Un utilisateur avec ce nom existe déjà. S\'il vous plaît clic '),
(16, NULL, NULL, 'Home', NULL, 'Accueil'),
(17, NULL, NULL, 'Log in', NULL, 'Connexion'),
(18, NULL, NULL, 'New user', NULL, 'Nouvel utilisateur'),
(19, NULL, NULL, 'Added user', NULL, 'Ajouté utilisateur'),
(20, NULL, NULL, 'Error: non-unique user name', NULL, 'Erreur: le nom d\'utilisateur n\'est pas unique'),
(21, NULL, NULL, ' — Weave', NULL, NULL),
(22, NULL, NULL, 'Unrecognised operation', NULL, 'L\'opération non reconnus'),
(23, NULL, NULL, 'Error', NULL, 'Erreur'),
(24, NULL, NULL, ': Node', NULL, ': Noeud'),
(25, NULL, NULL, '<table border=\"0\" cellpadding=\"24\" width=\"100%\"><tbody><tr><td><br><table border=\"0\" width=\"100%\"><tbody><tr><td style=\"vertical-align:top\">', NULL, NULL),
(26, NULL, NULL, 'here', NULL, 'ici'),
(27, NULL, NULL, '<img src=\"weave.png\" alt=\"Weave\" width=\"132\" height=\"57\" border=\"0\">', NULL, NULL),
(28, NULL, NULL, '&nbsp;&nbsp;(logged in)&nbsp;&nbsp;', NULL, '&nbsp;&nbsp;(connecté)&nbsp;&nbsp;'),
(29, NULL, NULL, '&nbsp;&nbsp;(not logged in)&nbsp;&nbsp;', NULL, '&nbsp;&nbsp;(pas connecté)&nbsp;&nbsp;'),
(30, NULL, NULL, 'Log in…', NULL, 'Connexion…'),
(31, NULL, NULL, 'New user…', NULL, 'Nouvel utilisateur…'),
(33, NULL, NULL, '</td></tr></tbody></table><h1>', NULL, NULL),
(34, NULL, NULL, '</h1>', NULL, NULL),
(35, NULL, NULL, ' ', NULL, NULL),
(36, NULL, NULL, '<?xml version=\"1.0\" encoding=\"us-ascii\"?> \r\n \r\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"> \r\n \r\n<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\"> \r\n \r\n \r\n<head> \r\n \r\n<title>A Unicode Test Page</title> \r\n \r\n<meta name=\"description\" content=\"A test for the Unicode rendering capabilities of your browser\" lang=\"en\" /> \r\n \r\n<meta name=\"keywords\" content=\"Unicode, test, browser, font\" lang=\"en\" /> \r\n \r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=us-ascii\" /> \r\n \r\n<meta http-equiv=\"Content-Language\" content=\"en\" /> \r\n \r\n</head> \r\n \r\n<body> \r\n \r\n<h1>A Unicode Test Page</h1> \r\n \r\n<h2>Contents</h2> \r\n \r\n<ul> \r\n<li><a href=\"#spaces\">Spaces and related</a></li> \r\n<li><a href=\"#genpunct\">General punctuation</a></li> \r\n<li><a href=\"#accents\">A table of (some) accents</a></li> \r\n<li><a href=\"#combining\">Combining diacritics</a></li> \r\n<li><a href=\"#symbols\">Various symbols</a></li> \r\n<li><a href=\"#pushkin\">Some verses in Russian</a></li> \r\n<li><a href=\"#sophocles\">Some verses in ancient Greek</a></li> \r\n<li><a href=\"#kalidasa\">Some verses in Sanskrit</a></li> \r\n<li><a href=\"#confucius\">Some Chinese</a></li> \r\n<li><a href=\"#ramanujan\">A Tamil name</a></li> \r\n<li><a href=\"#quran\">Some Arabic</a></li> \r\n</ul> \r\n \r\n<h2 id=\"spaces\"><a name=\"spaces\">Spaces and related</a></h2> \r\n \r\n<p>The following should all appear as spaces of various widths:</p> \r\n \r\n<ul> \r\n<li>X X X X Y (space; breakable)</li> \r\n<li>X&#xa0;X&#xa0;X&#xa0;X&#xa0;Y (no-break space; unbreakable)</li> \r\n<li>X&#x2000;X&#x2000;X&#x2000;X&#x2000;Y (en quad; breakable)</li> \r\n<li>X&#x2001;X&#x2001;X&#x2001;X&#x2001;Y (em quad; breakable)</li> \r\n<li>X&#x2002;X&#x2002;X&#x2002;X&#x2002;Y (en space; breakable)</li> \r\n<li>X&#x2003;X&#x2003;X&#x2003;X&#x2003;Y (em space; breakable)</li> \r\n<li>X&#x2004;X&#x2004;X&#x2004;X&#x2004;Y (three-per-em space; breakable)</li> \r\n<li>X&#x2005;X&#x2005;X&#x2005;X&#x2005;Y (four-per-em space; breakable)</li> \r\n<li>X&#x2006;X&#x2006;X&#x2006;X&#x2006;Y (six-per-em space; breakable)</li> \r\n<li>X&#x2007;X&#x2007;X&#x2007;X&#x2007;Y (figure space; unbreakable)</li> \r\n<li>X&#x2008;X&#x2008;X&#x2008;X&#x2008;Y (punctuation space; same width as a period)</li> \r\n<li>X&#x2009;X&#x2009;X&#x2009;X&#x2009;Y (thin space)</li> \r\n<li>X&#x200a;X&#x200a;X&#x200a;X&#x200a;Y (hair space)</li> \r\n<li>X&#x200b;X&#x200b;X&#x200b;X&#x200b;Y (zero width space; breakable)</li> \r\n<li>X&#xfeff;X&#xfeff;X&#xfeff;X&#xfeff;Y (zero width no-break space; unbreakable)</li> \r\n</ul> \r\n \r\n<h2 id=\"genpunct\"><a name=\"genpunct\">General punctuation</a></h2> \r\n \r\n<p>The convention in English is &#x201c;to use double quotation marks\r\nto indicate quotation, and &#x2018;single quotation marks&#x2019; for\r\nnested quotations.&#x201d;</p> \r\n \r\n<p xml:lang=\"fr\" lang=\"fr\">En fran&#xe7;ais la convention est\r\n&#xab;&#xa0;d\'utiliser les guillemets fran&#xe7;ais doubles pour les\r\ncitations, et &#x201c;&#xa0;les guillemets anglais doubles&#xa0;&#x201d;\r\nou bien &#x2039;&#xa0;les guillemets fran&#xe7;ais simples&#xa0;&#x203a;\r\npour les citations imbriqu&#xe9;es.&#xa0;&#xbb;</p> \r\n \r\n<p xml:lang=\"de\" lang=\"de\">Auf Deutsch ist die Vereinbarung\r\n&#xbb;umgekehrte zweifache Anf&#xfc;hrungszeichen f&#xfc;r die Zitate\r\nzu benutzen, sogar &#x203a;einfache Anf&#xfc;hrungszeichen&#x2039;\r\nf&#xfc;r die verschachtelte Zitate&#xab;; diese Anf&#xfc;hrungszeichen\r\n&#x201e;d&#xfc;rfen auch solche &#x201a;englische&#x2018;\r\nAnf&#xfc;hrungszeichen sein.&#x201c;</p> \r\n \r\n<p>The en-dash is used between numbers such as in: 1685&#x2013;1750\r\n(J.&#xa0;S.&#xa0;Bach).  It is longer than the hyphen (as in\r\n&#x201c;en-dash&#x201d;, or, more properly, &#x201c;en&#x2010;dash&#x201d;)\r\nbut shorter than the em-dash, which is used &#x2014; like this &#x2014;\r\nas a sort of parenthesis.  Neither should be confused with the\r\nhorizontal bar which is used to introduce quotation in some cases.<br\r\n/>&#x2015;&#xa0;Like this?<br />&#x2015;&#xa0;Right.</p> \r\n \r\n<p>The ellipsis is&#x2026; well, it just is.</p> \r\n \r\n<h2 id=\"accents\"><a name=\"accents\">A table of (some) accents</a></h2> \r\n \r\n<p>In the following table, characters that are missing from Unicode as\r\nof version 3.0, latest draft (i.e. that cannot be represented as a\r\n<em>single</em> character but must use the more general form of\r\ncombining diacritics) have been replaced by <code>X</code>, so you can\r\ntell they are not your browser\'s fault.</p> \r\n \r\n<table> \r\n<tr><th>Base</th><th>Grave</th><th>Acute</th><th>Circumflex</th><th>Tilde</th><th>Diaeresis</th> \r\n<th>Macron</th><th>Breve</th><th>Ogonek</th><th>Dot</th><th>Double acute</th><th>Caron</th> \r\n<th>Double grave</th><th>Inverted breve</th></tr> \r\n<tr><td>a</td><td>&#xe0;</td><td>&#xe1;</td><td>&#xe2;</td><td>&#xe3;</td><td>&#xe4;</td> \r\n<td>&#x101;</td><td>&#x103;</td><td>&#x105;</td><td>&#x227;</td><td>X</td><td>&#x1ce;</td> \r\n<td>&#x201;</td><td>&#x203;</td></tr> \r\n<tr><td>e</td><td>&#xe8;</td><td>&#xe9;</td><td>&#xea;</td><td>&#x1ebd;</td><td>&#xeb;</td> \r\n<td>&#x113;</td><td>&#x115;</td><td>&#x119;</td><td>&#x117;</td><td>X</td><td>&#x11b;</td> \r\n<td>&#x205;</td><td>&#x207;</td></tr> \r\n<tr><td>i</td><td>&#xec;</td><td>&#xed;</td><td>&#xee;</td><td>&#x129;</td><td>&#xef;</td> \r\n<td>&#x12b;</td><td>&#x12d;</td><td>&#x12f;</td><td>i</td><td>X</td><td>&#x1d0;</td> \r\n<td>&#x209;</td><td>&#x20b;</td></tr> \r\n<tr><td>o</td><td>&#xf2;</td><td>&#xf3;</td><td>&#xf4;</td><td>&#xf5;</td><td>&#xf6;</td> \r\n<td>&#x14d;</td><td>&#x14f;</td><td>&#x1eb;</td><td>&#x22f;</td><td>&#x151;</td><td>&#x1d2;</td> \r\n<td>&#x20d;</td><td>&#x20f;</td></tr> \r\n<tr><td>u</td><td>&#xf9;</td><td>&#xfa;</td><td>&#xfb;</td><td>&#x169;</td><td>&#xfc;</td> \r\n<td>&#x16b;</td><td>&#x16d;</td><td>&#x173;</td><td>X</td><td>&#x171;</td><td>&#x1d4;</td> \r\n<td>&#x215;</td><td>&#x217;</td></tr> \r\n<tr><td>y</td><td>&#x1ef3;</td><td>&#xfd;</td><td>&#x177;</td><td>&#x1ef9;</td><td>&#xff;</td> \r\n<td>&#x233;</td><td>X</td><td>X</td><td>&#x1e8f;</td><td>X</td><td>X</td> \r\n<td>X</td><td>X</td></tr> \r\n</table> \r\n \r\n<p>Note that the three characters &#x201c;LATIN SMALL LETTER A WITH DOT\r\nABOVE&#x201d;, &#x201c;LATIN SMALL LETTER O WITH DOT ABOVE&#x201d; and\r\n&#x201c;LATIN SMALL LETTER Y WITH MACRON&#x201d; were not present in\r\nversion 2.0 of the Unicode standard.  So it is quite understandable if\r\nyou do not see the corresponding entries.</p> \r\n \r\n<h2 id=\"combining\"><a name=\"combining\">Combining diacritics</a></h2> \r\n \r\n<p>The following paragraph gives a few forms formed by using combining\r\ndiacritics.  The equal sign means that the combined form on the left\r\nshould be identical in all respects (and in particular, represented\r\nidentically) to the atomic form on the right.  To emphasize even more:\r\nyou should <strong>not</strong> see <em>two</em> signs on the left of\r\nthe equal sign but <em>one</em>, the same as on the right.</p> \r\n \r\n<p> \r\na&#x300;=&#xe0;;\r\ne&#x301;=&#xe9;;\r\ni&#x302;=&#xee; (not the same as &#x131;&#x302; but may be graphically\r\nidentical);\r\no&#x303;=&#xf5;;\r\nu&#x304;=&#x16b; (whereas u&#xaf; is two different symbols);\r\na&#x306;=&#x103;;\r\ne&#x307;=&#x117; (also note i&#x307; should be essentially i);\r\ni&#x308;=&#xef; (whereas i&#x307;&#x308; has three dots on the i);\r\na&#x30a;=&#xe5; (not to be confused with a&#xb0; (read &#x201c;a\r\ndegrees&#x201d;) nor a&#x2da;);\r\no&#x30b;=&#x151;;\r\nc&#x30c;=&#x10d;\r\n<br /> \r\nc&#x327;=&#xe7;;\r\nb&#x323;=&#x1e05;;\r\nd&#x331;=&#x1e0f; (this is supposedly different from d&#x320; but may be\r\ngraphically identical);\r\ne&#x32d;=&#x1e19;\r\n<br /> \r\nu&#x308;&#x304;=&#xfc;&#x304;=&#x1d6; (not the same as u&#x304;&#x308; which\r\nhas the diaeresis on top of the macron);\r\na&#x307;&#x304;=&#x227;&#x304;=&#x1e1;\r\n<br /> \r\no&#x328;&#x304;=&#x1eb;&#x304;=&#x1ed; (also o&#x304;&#x328; but the latter\r\nis not so canonical);\r\no&#x337;&#x301;=&#xf8;&#x301;=&#x1ff; (not so sure about this one)\r\n</p> \r\n \r\n \r\n<h2 id=\"symbols\"><a name=\"symbols\">Various symbols</a></h2> \r\n \r\n<p>Here is a table of the constellations of the Zodiac, in which the\r\nfirst column should contain the relevant astrological symbol:</p> \r\n \r\n<table border=\"1\"> \r\n<tr><th>Sym.</th><th>English name</th><th>Latin name</th><th>Latin genitive</th><th>&#x3b1; star</th></tr> \r\n<tr><td>&#x2648;</td><td>The Ram</td><td>Aries</td><td>Arietis</td><td>Hamal</td></tr> \r\n<tr><td>&#x2649;</td><td>The Bull</td><td>Taurus</td><td>Tauri</td><td>Aldebaran</td></tr> \r\n<tr><td>&#x264a;</td><td>The Twins</td><td>Gemini</td><td>Geminorum</td><td>Castor</td></tr> \r\n<tr><td>&#x264b;</td><td>The Crab</td><td>Cancer</td><td>Cancri</td><td>Acubens</td></tr> \r\n<tr><td>&#x264c;</td><td>The Lion</td><td>Leo</td><td>Leonis</td><td>Regulus</td></tr> \r\n<tr><td>&#x264d;</td><td>The Virgin</td><td>Virgo</td><td>Virginis</td><td>Spica</td></tr> \r\n<tr><td>&#x264e;</td><td>The Scales</td><td>Libra</td><td>Libr&#xe6;</td><td>Zumen el Genubi</td></tr> \r\n<tr><td>&#x264f;</td><td>The Scorpion</td><td>Scorpius</td><td>Scorpii</td><td>Antares</td></tr> \r\n<tr><td>&#x2650;</td><td>The Archer</td><td>Sagittarius</td><td>Sagittarii</td><td>Rubkat</td></tr> \r\n<tr><td>&#x2651;</td><td>The Sea Goat</td><td>Capricornus</td><td>Capricorni</td><td>Giedi</td></tr> \r\n<tr><td>&#x2652;</td><td>The Water Bearer</td><td>Aquarius</td><td>Aquarii</td><td>Sadalmelik</td></tr> \r\n<tr><td>&#x2653;</td><td>The Fishes</td><td>Pisces</td><td>Piscium</td><td>El Rischa</td></tr> \r\n</table> \r\n \r\n<p>The following table should show a chessboard, with a pictorial\r\nrepresentation of the pieces:</p> \r\n \r\n<table> \r\n<tr><th /><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th></tr> \r\n<tr><th>8</th><td>&#x265c;</td><td>&#x265e;</td><td>&#x265d;</td><td>&#x265b;</td><td>&#x265a;</td><td>&#x265d;</td><td>&#x265e;</td><td>&#x265c;</td></tr> \r\n<tr><th>7</th><td>&#x265f;</td><td>&#x265f;</td><td>&#x265f;</td><td>&#x265f;</td><td>&#x265f;</td><td>&#x265f;</td><td>&#x265f;</td><td>&#x265f;</td></tr> \r\n<tr><th>6</th><td /><td /><td /><td /><td /><td /><td /><td /></tr> \r\n<tr><th>5</th><td /><td /><td /><td /><td /><td /><td /><td /></tr> \r\n<tr><th>4</th><td /><td /><td /><td /><td /><td /><td /><td /></tr> \r\n<tr><th>3</th><td /><td /><td /><td /><td /><td /><td /><td /></tr> \r\n<tr><th>2</th><td>&#x2659;</td><td>&#x2659;</td><td>&#x2659;</td><td>&#x2659;</td><td>&#x2659;</td><td>&#x2659;</td><td>&#x2659;</td><td>&#x2659;</td></tr> \r\n<tr><th>1</th><td>&#x2656;</td><td>&#x2658;</td><td>&#x2657;</td><td>&#x2655;</td><td>&#x2654;</td><td>&#x2657;</td><td>&#x2658;</td><td>&#x2656;</td></tr> \r\n</table> \r\n \r\n<p>Here is a snowflake: &#x2744;.</p> \r\n \r\n \r\n<h2 id=\"pushkin\"><a name=\"pushkin\">Some verses in Russian</a></h2> \r\n \r\n<p>The following is a five-verse extract of introduction of the poem\r\n<cite xml:lang=\"ru\" lang=\"ru\">Mednyj Vsadnik</cite>; by A. S. Pushkin\r\n(in Russian):</p> \r\n \r\n<blockquote xml:lang=\"ru\" lang=\"ru\"> \r\n \r\n<p>&#x41f;&#x43e; &#x43e;&#x436;&#x438;&#x432;&#x43b;&#x451;&#x43d;&#x43d;&#x44b;&#x43c; &#x431;&#x435;&#x440;&#x435;&#x433;&#x430;&#x43c;\r\n<br />&#x413;&#x440;&#x43e;&#x43c;&#x430;&#x434;&#x44b; &#x441;&#x442;&#x440;&#x43e;&#x439;&#x43d;&#x44b;&#x435; &#x442;&#x435;&#x441;&#x43d;&#x44f;&#x442;&#x441;&#x44f;\r\n<br />&#x414;&#x432;&#x43e;&#x440;&#x446;&#x43e;&#x432; &#x438; &#x431;&#x430;&#x448;&#x435;&#x43d;; &#x43a;&#x43e;&#x440;&#x430;&#x431;&#x43b;&#x438;\r\n<br />&#x422;&#x43e;&#x43b;&#x43f;&#x43e;&#x439; &#x441;&#x43e; &#x432;&#x441;&#x435;&#x445; &#x43a;&#x43e;&#x43d;&#x446;&#x43e;&#x432; &#x437;&#x435;&#x43c;&#x43b;&#x438;\r\n<br />&#x41a; &#x431;&#x43e;&#x433;&#x430;&#x442;&#x44b;&#x43c; &#x43f;&#x440;&#x438;&#x441;&#x442;&#x430;&#x43d;&#x44f;&#x43c; &#x441;&#x442;&#x440;&#x435;&#x43c;&#x44f;&#x442;&#x441;&#x44f;;</p> \r\n \r\n</blockquote> \r\n \r\n<p>Here is what the above might look like if your browser supports the\r\ncyrillic block of Unicode:</p> \r\n \r\n<blockquote> \r\n \r\n<p><img src=\"pushkin.png\" alt=\"[Five verses in Russian]\" /></p> \r\n \r\n</blockquote> \r\n \r\n<p>And here is a transcription of it:</p> \r\n \r\n<blockquote xml:lang=\"ru\" lang=\"ru\"> \r\n \r\n<p>Po o&#x17e;ivl&#xeb;nnym beregam\r\n<br />Gromady strojnye tesn&#xe2;ts&#xe2;\r\n<br />Dvorcov i ba&#x161;en; korabli\r\n<br />Tolpoj so vseh koncov zemli\r\n<br />K bogatym pristan&#xe2;m strem&#xe2;ts&#xe2;;</p> \r\n \r\n</blockquote> \r\n \r\n<p>A rough translation might be:</p> \r\n \r\n<blockquote> \r\n \r\n<p>Along the animated banks [of the Neva] / the shapely masses press /\r\nof palaces and towers; ships / in crowd from all corners of the Earth\r\n/ rush toward its rich quays.</p> \r\n \r\n</blockquote> \r\n \r\n \r\n<h2 id=\"sophocles\"><a name=\"sophocles\">Some verses in ancient Greek</a></h2> \r\n \r\n<p>The following verses are lines 1182&#x2013;1185 of the tragedy\r\n<cite>Oedipus Rex</cite> by Sophocles (in ancient Greek):</p> \r\n \r\n<blockquote xml:lang=\"el-ancient\" lang=\"el-ancient\"> \r\n \r\n<p>&#x1f38;&#x3bf;&#x1f7a; &#x1f30;&#x3bf;&#x1f7b;&#x387; &#x3c4;&#x1f70; &#x3c0;&#x1f71;&#x3bd;&#x3c4;&#x2bc; &#x1f02;&#x3bd; &#x1f10;&#x3be;&#x1f75;&#x3ba;&#x3bf;&#x3b9; &#x3c3;&#x3b1;&#x3c6;&#x1fc6;.\r\n<br />&#x1f6e; &#x3c6;&#x1ff6;&#x3c2;, &#x3c4;&#x3b5;&#x3bb;&#x3b5;&#x3c5;&#x3c4;&#x3b1;&#x1fd6;&#x1f79;&#x3bd; &#x3c3;&#x3b5; &#x3c0;&#x3c1;&#x3bf;&#x3c3;&#x3d0;&#x3bb;&#x1f73;&#x3c8;&#x3b1;&#x3b9;&#x3bc;&#x3b9; &#x3bd;&#x1fe6;&#x3bd;,\r\n<br />&#x1f45;&#x3c3;&#x3c4;&#x3b9;&#x3c2; &#x3c0;&#x1f73;&#x3c6;&#x3b1;&#x3c3;&#x3bc;&#x3b1;&#x3b9; &#x3c6;&#x1f7b;&#x3c2; &#x3c4;&#x2bc; &#x1f00;&#x3c6;&#x2bc; &#x1f67;&#x3bd; &#x3bf;&#x1f50; &#x3c7;&#x3c1;&#x1fc6;&#x3bd;, &#x3be;&#x1f7a;&#x3bd; &#x3bf;&#x1f37;&#x3c2; &#x3c4;&#x2bc;\r\n<br />&#x3bf;&#x1f50; &#x3c7;&#x3c1;&#x1fc6;&#x3bd; &#x1f41;&#x3bc;&#x3b9;&#x3bb;&#x1ff6;&#x3bd;, &#x3bf;&#x1f55;&#x3c2; &#x3c4;&#x1f73; &#x3bc;&#x2bc; &#x3bf;&#x1f50;&#x3ba; &#x1f14;&#x3b4;&#x3b5;&#x3b9; &#x3ba;&#x3c4;&#x3b1;&#x3bd;&#x1f7d;&#x3bd;.</p> \r\n \r\n</blockquote> \r\n \r\n<p>Here is what the above might look like if your browser supports the\r\ngreek and greek extended blocks of Unicode (note that this\r\nrepresentation uses the wrong shape of beta on the second line,\r\nbecause I didn\'t have the right one in the font I used):</p> \r\n \r\n<blockquote> \r\n \r\n<p><img src=\"sophocles.png\" alt=\"[Four verses in Greek]\" /></p> \r\n \r\n</blockquote> \r\n \r\n<p>And here is the transcription of it:</p> \r\n \r\n<blockquote xml:lang=\"el-ancient\" lang=\"el-ancient\"> \r\n \r\n<p>Iou iou; ta pant\' an ex&#x113;koi saph&#x113;.\r\n<br />&#x14c; ph&#x14d;s, teleutaion se prosblepsaimi nun,\r\n<br />hostis pephasmai phus t\' aph\' h&#x14d;n ou khr&#x113;n, xun hois t\'\r\n<br />ou khr&#x113;n homil&#x14d;n, hous te m\' ouk edei ktan&#x14d;n.</p> \r\n \r\n</blockquote> \r\n \r\n<p>A rough translation might be:</p> \r\n \r\n<blockquote> \r\n \r\n<p>Alas!  All would become clear. / O light, may I see you for the\r\nlast time, / I who was born of these of which it is a crime to be\r\nborn, who live with these / which which it is a crime to live, and who\r\nkilled these whom I must not kill.</p> \r\n \r\n</blockquote> \r\n \r\n \r\n<h2 id=\"kalidasa\"><a name=\"kalidasa\">Some verses in Sanskrit</a></h2> \r\n \r\n<p>The following is one stanza of canto &#x2165; of the <cite\r\nxml:lang=\"sa\" lang=\"sa\">Kum&#x101;ra-sa&#x1e43;bhava</cite> (&#x201c;the\r\nbirth of Kum&#x101;ra&#x201d;) by the great Sanskrit poet\r\nK&#x101;lid&#x101;sa:</p> \r\n \r\n<blockquote xml:lang=\"sa\" lang=\"sa\"> \r\n \r\n<p>&#x92a;&#x936;&#x941;&#x92a;&#x924;&#x93f;&#x930;&#x92a;&#x93f; &#x924;&#x93e;&#x928;&#x94d;&#x92f;&#x939;&#x93e;&#x928;&#x93f; &#x915;&#x943;&#x91a;&#x94d;&#x91b;&#x94d;&#x930;&#x93e;&#x926;&#x94d;\r\n<br />&#x905;&#x917;&#x92e;&#x92f;&#x926;&#x926;&#x94d;&#x930;&#x93f;&#x938;&#x941;&#x924;&#x93e;&#x938;&#x92e;&#x93e;&#x917;&#x92e;&#x94b;&#x924;&#x94d;&#x915;&#x903; &#x964;\r\n<br />&#x915;&#x92e;&#x92a;&#x930;&#x92e;&#x935;&#x936;&#x902; &#x928; &#x935;&#x93f;&#x92a;&#x94d;&#x930;&#x915;&#x941;&#x930;&#x94d;&#x92f;&#x941;&#x930;&#x94d;\r\n<br />&#x935;&#x93f;&#x92d;&#x941;&#x92e;&#x92a;&#x93f; &#x924;&#x902; &#x92f;&#x926;&#x92e;&#x940; &#x938;&#x94d;&#x92a;&#x943;&#x936;&#x928;&#x94d;&#x924;&#x93f; &#x92d;&#x93e;&#x935;&#x93e;&#x903; &#x965;</p> \r\n \r\n</blockquote> \r\n \r\n<p>Here is what the above might look like if your browser supports the\r\ndevan&#x101;gar&#x12b; block of Unicode:</p> \r\n \r\n<blockquote> \r\n \r\n<p><img src=\"kalidasa.png\" alt=\"[A stanza in Sanskrit]\" /></p> \r\n \r\n</blockquote> \r\n \r\n<p>And here is the transcription of it:</p> \r\n \r\n<blockquote xml:lang=\"sa\" lang=\"sa\"> \r\n \r\n<p>Pa&#x15b;upatirapi t&#x101;nyah&#x101;ni k&#x1e5b;cchr&#x101;d\r\n<br />agamayadadrisut&#x101;sam&#x101;gamotka&#x1e25;;\r\n<br />kamaparamava&#x15b;a&#x1e43; na viprakuryur\r\n<br />vibhumapi ta&#x1e43; yadam&#x12b; sp&#x1e5b;&#x15b;anti bh&#x101;v&#x101;&#x1e25;?</p> \r\n \r\n</blockquote> \r\n \r\n<p>A rough translation might be:</p> \r\n \r\n<blockquote> \r\n \r\n<p>And Pa&#x15b;upati passed those days with hardship, / eager for\r\nunion with the daughter of the mountain. / Which other powerless\r\n[creature] would they not torment, / such emotions, when they affect\r\neven the powerful [&#x15a;iva]?</p> \r\n \r\n</blockquote> \r\n \r\n \r\n<h2 id=\"confucius\"><a name=\"confucius\">Some Chinese</a></h2> \r\n \r\n<p>The following are the two first lines of the <cite>Analects</cite> \r\nby Confucius:</p> \r\n \r\n<blockquote xml:lang=\"zh\" lang=\"zh\"> \r\n \r\n<p>&#x5b50;&#x66f0;&#xff1a;&#x300c;&#x5b78;&#x800c;&#x6642;&#x7fd2;&#x4e4b;&#xff0c;&#x4e0d;&#x4ea6;&#x8aaa;&#x4e4e;&#xff1f;&#x6709;&#x670b;&#x81ea;&#x9060;&#x65b9;&#x4f86;&#xff0c;&#x4e0d;&#x4ea6;&#x6a02;&#x4e4e;&#xff1f;\r\n<br />&#x4eba;&#x4e0d;&#x77e5;&#x800c;&#x4e0d;&#x614d;&#xff0c;&#x4e0d;&#x4ea6;&#x541b;&#x5b50;&#x4e4e;&#xff1f;&#x300d;</p> \r\n<p>&#x6709;&#x5b50;&#x66f0;&#xff1a;&#x300c;&#x5176;&#x70ba;&#x4eba;&#x4e5f;&#x5b5d;&#x5f1f;&#xff0c;&#x800c;&#x597d;&#x72af;&#x4e0a;&#x8005;&#xff0c;&#x9bae;&#x77e3;&#xff1b;\r\n<br />&#x4e0d;&#x597d;&#x72af;&#x4e0a;&#xff0c;&#x800c;&#x597d;&#x4f5c;&#x4e82;&#x8005;&#xff0c;&#x672a;&#x4e4b;&#x6709;&#x4e5f;&#x3002;&#x541b;&#x5b50;&#x52d9;&#x672c;&#xff0c;&#x672c;&#x7acb;&#x800c;&#x9053;&#x751f;&#x3002;\r\n<br />&#x5b5d;&#x5f1f;&#x4e5f;&#x8005;&#xff0c;&#x5176;&#x70ba;&#x4ec1;&#x4e4b;&#x672c;&#x8207;&#xff01;&#x300d;</p> \r\n \r\n</blockquote> \r\n \r\n<p>Here is what the above might look like if your browser supports the\r\nCJK block of Unicode:</p> \r\n \r\n<blockquote> \r\n \r\n<p><img src=\"confucius.png\" alt=\"[Two lines in Chinese]\" /></p> \r\n \r\n</blockquote> \r\n \r\n<p>And here is the transcription of it:</p> \r\n \r\n<blockquote xml:lang=\"zh\" lang=\"zh\"> \r\n \r\n<p>Z&#x1d0; yu&#x113;: &#x201c;Xu&#xe9; &#xe9;r sh&#x12b; x&#xed;\r\nzh&#x12b;, b&#xfa; y&#xec; yu&#xe8; h&#x16b;?  Yo&#x1d4; p&#xe9;ng\r\nz&#xec; y&#x1d4;an f&#x101;ngl&#xe1;i, b&#xfa; y&#xec; l&#xe8;\r\nh&#x16b;? R&#xe9;n b&#xf9; zh&#x12b;, &#xe9;r b&#xfa; y&#xf9;n,\r\nb&#xfa; y&#xec; j&#x16b;nz&#x1d0; h&#x16b;?&#x201d;</p> \r\n<p>Y&#xf3;uz&#x1d0; yu&#x113;: &#x201c;Q&#xed; w&#xe8;i r&#xe9;n\r\ny&#x11b; xi&#xe0;od&#xec;, &#xe9;r\r\nh&#xe0;of&#xe0;nsh&#xe0;ngzh&#x11b;, xi&#x101;n y&#x1d0;; b&#xfa;\r\nh&#xe0;o f&#xe0;nsh&#xe0;ng, &#xe9;r\r\nh&#xe0;ozu&#xf2;lu&#xe0;nzh&#x11b;, w&#xe8;i zh&#x12b; y&#xf3;u\r\ny&#x11b;. J&#x16b;nz&#x1d0; w&#xf9; b&#x11b;n, b&#x11b;n l&#xec;\r\n&#xe9;r d&#xe0;o sh&#x113;ng. Xi&#xe0;od&#xec; y&#xe9; zh&#x11b;,\r\nq&#xed; w&#xe8;i r&#xe9;n zh&#x12b; b&#xe9;n y&#x1d4;!&#x201d;</p> \r\n \r\n \r\n</blockquote> \r\n \r\n<p>A rough translation might be:</p> \r\n \r\n<blockquote> \r\n \r\n<p>The Master [Confucius] said: &ldquo;To study and to practice, it is\r\nis a joy, isn\'t it?  When friends come from afar, it is a pleasure,\r\nisn\'t it?  If one remains unknown and isn\'t hurt, isn\'t one an\r\nhonorable man?&rdquo;</p> \r\n<p>Master You said: &ldquo;Few of the men who act well filially and\r\nfraternally are also fond of offending their superiors; men who are\r\nnot fond of offending their superiors, but who like to cause trouble,\r\nsuch do not exist.  The honorable man concerns himself with the\r\nfoundations.  Once the foundations are established, the Way is born.\r\nIs not acting well filially and fraternally the foundation of\r\nhumanity?&rdquo;</p> \r\n \r\n</blockquote> \r\n \r\n \r\n<h2 id=\"ramanujan\"><a name=\"ramanujan\">A Tamil name</a></h2> \r\n \r\n<p>The following is the original (Tamil) name of a famous\r\nmathematician:</p> \r\n \r\n<blockquote xml:lang=\"ta\" lang=\"ta\"> \r\n \r\n<p>&#xbb8;&#xbcd;&#xbb1;&#xbc0;&#xba9;&#xbbf;&#xbb5;&#xbbe;&#xbb8;\r\n&#xbb0;&#xbbe;&#xbae;&#xbbe;&#xba9;&#xbc1;&#xb9c;&#xba9;&#xbcd;\r\n&#xb90;&#xbaf;&#xb99;&#xbcd;&#xb95;&#xbbe;&#xbb0;&#xbcd;</p> \r\n \r\n</blockquote> \r\n \r\n<p>Here is what the above might look like if your browser supports the\r\nTamil block of Unicode (note, however, that this representation is\r\nless than optimal, since the font I used didn\'t have the\r\n&lsquo;sr&rsquo; ligature; so if the first two characters are replaced\r\nby a single one which looks very different, it is probably\r\nnormal):</p> \r\n \r\n<blockquote> \r\n \r\n<p><img src=\"ramanujan.png\" alt=\"[A name in Tamil]\" /></p> \r\n \r\n</blockquote> \r\n \r\n<p>And here is a transcription of it:</p> \r\n \r\n<blockquote xml:lang=\"ta\" lang=\"ta\"> \r\n \r\n<p>S&#x1e5f;&#x12b;&#x1e49;iv&#x101;sa\r\nR&#x101;m&#x101;&#x1e49;uja&#x1e49; Aiya&#x1e45;k&#x101;r</p> \r\n \r\n</blockquote> \r\n \r\n<p>Here there can be no translation, of course, since this is a proper\r\nnoun.  But I note that the mathematician in question (1887&ndash;1920)\r\nis typically named &ldquo;Srinivasa Ramanujan Iyengar&rdquo; in\r\nEnglish.</p> \r\n \r\n \r\n<h2 id=\"quran\"><a name=\"quran\">Some Arabic</a></h2> \r\n \r\n<p>The following lines are the first chapter of the Qur\'an (note that\r\nthe text runs right to left, and should probably be aligned on the\r\nright margin):</p> \r\n \r\n<blockquote xml:lang=\"ar\" lang=\"ar\" dir=\"rtl\"> \r\n \r\n<p>&#x628;&#x650;&#x633;&#x652;&#x645;&#x650;\r\n&#x671;&#x644;&#x644;&#x651;&#x670;&#x647;&#x650;\r\n&#x671;&#x644;&#x631;&#x651;&#x64e;&#x62d;&#x652;&#x645;&#x640;&#x64e;&#x628;&#x646;&#x650;\r\n&#x671;&#x644;&#x631;&#x651;&#x64e;&#x62d;&#x650;&#x64a;&#x645;&#x650;</p> \r\n<p>&#x671;&#x644;&#x652;&#x62d;&#x64e;&#x645;&#x652;&#x62f;&#x64f;\r\n&#x644;&#x650;&#x644;&#x651;&#x670;&#x647;&#x650;\r\n&#x631;&#x64e;&#x628;&#x651;&#x650;\r\n&#x671;&#x644;&#x652;&#x639;&#x64e;&#x627;&#x644;&#x64e;&#x645;&#x650;&#x64a;&#x646;&#x64e;</p> \r\n<p>&#x671;&#x644;&#x631;&#x651;&#x64e;&#x62d;&#x652;&#x645;&#x640;&#x64e;&#x628;&#x646;&#x650;\r\n&#x671;&#x644;&#x631;&#x651;&#x64e;&#x62d;&#x650;&#x64a;&#x645;&#x650;</p> \r\n<p>&#x645;&#x64e;&#x640;&#x627;&#x644;&#x650;&#x643;&#x650;\r\n&#x64a;&#x64e;&#x648;&#x652;&#x645;&#x650;\r\n&#x671;&#x644;&#x62f;&#x651;&#x650;&#x64a;&#x646;&#x650;</p> \r\n<p>&#x625;&#x650;&#x64a;&#x651;&#x64e;&#x627;&#x643;&#x64e;\r\n&#x646;&#x64e;&#x639;&#x652;&#x628;&#x64f;&#x62f;&#x64f;\r\n&#x648;&#x64e;&#x625;&#x650;&#x64a;&#x651;&#x64e;&#x627;&#x643;&#x64e;\r\n&#x646;&#x64e;&#x633;&#x652;&#x62a;&#x64e;&#x639;&#x650;&#x64a;&#x646;&#x64f;</p> \r\n<p>&#x671;&#x647;&#x652;&#x62f;&#x650;&#x646;&#x64e;&#x640;&#x640;&#x640;&#x640;&#x627;\r\n&#x671;&#x644;&#x635;&#x651;&#x650;&#x631;&#x64e;&#x627;&#x637;&#x64e;\r\n&#x671;&#x644;&#x645;&#x64f;&#x633;&#x652;&#x62a;&#x64e;&#x642;&#x650;&#x64a;&#x645;&#x64e;</p> \r\n<p>&#x635;&#x650;&#x631;&#x64e;&#x627;&#x637;&#x64e;\r\n&#x671;&#x644;&#x651;&#x64e;&#x630;&#x650;&#x64a;&#x646;&#x64e;\r\n&#x623;&#x64e;&#x646;&#x639;&#x64e;&#x645;&#x652;&#x62a;&#x64e;\r\n&#x639;&#x64e;&#x644;&#x64e;&#x64a;&#x647;&#x650;&#x645;&#x652;\r\n&#x63a;&#x64e;&#x64a;&#x631;&#x650;\r\n&#x671;&#x644;&#x645;&#x64e;&#x63a;&#x636;&#x64f;&#x648;&#x628;&#x650;\r\n&#x639;&#x64e;&#x644;&#x64e;&#x64a;&#x647;&#x650;&#x645;&#x652;\r\n&#x648;&#x64e;&#x644;&#x627;&#x64e;\r\n&#x671;&#x644;&#x636;&#x651;&#x64e;&#x627;&#x644;&#x651;&#x650;&#x64a;&#x646;&#x64e;</p> \r\n \r\n</blockquote> \r\n \r\n<p>Here is what the above might look like if your browser supports the\r\nArabic block of Unicode:</p> \r\n \r\n<blockquote dir=\"rtl\"> \r\n \r\n<p><img src=\"quran.png\" alt=\"[Seven verses in Arabic]\" /></p> \r\n \r\n</blockquote> \r\n \r\n<p>And here is a transcription of it:</p> \r\n \r\n<blockquote xml:lang=\"ar\" lang=\"ar\" dir=\"ltr\"> \r\n \r\n<p>bismi &#x103;l-la\'hi &#x103;r-ra&#x1e25;ma\'ni &#x103;r-ra&#x1e25;iymi</p> \r\n<p>&#x103;l-&#x1e25;amdu li-lla\'hi rabbi &#x103;l-`a\'lamiyna</p> \r\n<p>&#x103;r-ra&#x1e25;ma\'ni &#x103;r-ra&#x1e25;iymi</p> \r\n<p>ma\'liki yawmi &#x103;d-diyni</p> \r\n<p>\'iyya\'ka na`budu wa-\'iyya\'ka nasta`iynu</p> \r\n<p>&#x12d;hdina\' &#x103;&#x1e63;-&#x1e63;ira\'&#x1e6d;a &#x103;l-mustaqiyma</p> \r\n<p>&#x1e63;ira\'&#x1e6d;a &#x103;lla&#x1e0f;iyna \'an`amta `alayhim\r\n&#x121;ayri &#x103;l-ma&#x121;&#x1e0d;uwbi `alayhim wala\'\r\n&#x103;&#x1e0d;-&#x1e0d;a\'lliyna</p> \r\n \r\n</blockquote> \r\n \r\n<p>A rough translation might be:</p> \r\n \r\n<blockquote> \r\n \r\n<p>In the name of God, the beneficient, the merciful.</p> \r\n<p>Praise be to God, lord of the worlds.</p> \r\n<p>The beneficient, the merciful.</p> \r\n<p>Master of the day of judgment.</p> \r\n<p>Thee do we worship, and Thine aid we seek.</p> \r\n<p>Lead us on the right path.</p> \r\n<p>The path of those on whom Thou hast bestowed favors.  Not of those\r\nwho have earned Thy wrath, nor of those who go astray.</p> \r\n \r\n</blockquote> \r\n \r\n \r\n</body> \r\n</html> ', NULL, NULL),
(37, NULL, NULL, 'A Unicode Test Page\r\n\r\nContents\r\n\r\nSpaces and related\r\nGeneral punctuation\r\nA table of (some) accents\r\nCombining diacritics\r\nVarious symbols\r\nSome verses in Russian\r\nSome verses in ancient Greek\r\nSome verses in Sanskrit\r\nSome Chinese\r\nA Tamil name\r\nSome Arabic\r\nSpaces and related\r\n\r\nThe following should all appear as spaces of various widths:\r\n\r\nX X X X Y (space; breakable)\r\nX X X X Y (no-break space; unbreakable)\r\nX?X?X?X?Y (en quad; breakable)\r\nX?X?X?X?Y (em quad; breakable)\r\nX?X?X?X?Y (en space; breakable)\r\nX?X?X?X?Y (em space; breakable)\r\nX?X?X?X?Y (three-per-em space; breakable)\r\nX?X?X?X?Y (four-per-em space; breakable)\r\nX?X?X?X?Y (six-per-em space; breakable)\r\nX?X?X?X?Y (figure space; unbreakable)\r\nX?X?X?X?Y (punctuation space; same width as a period)\r\nX?X?X?X?Y (thin space)\r\nX?X?X?X?Y (hair space)\r\nX?X?X?X?Y (zero width space; breakable)\r\nX?X?X?X?Y (zero width no-break space; unbreakable)\r\nGeneral punctuation\r\n\r\nThe convention in English is “to use double quotation marks to indicate quotation, and ‘single quotation marks’ for nested quotations.”\r\n\r\nEn français la convention est « d\'utiliser les guillemets français doubles pour les citations, et “ les guillemets anglais doubles ” ou bien ‹ les guillemets français simples › pour les citations imbriquées. »\r\n\r\nAuf Deutsch ist die Vereinbarung »umgekehrte zweifache Anführungszeichen für die Zitate zu benutzen, sogar ›einfache Anführungszeichen‹ für die verschachtelte Zitate«; diese Anführungszeichen „dürfen auch solche ‚englische‘ Anführungszeichen sein.“\r\n\r\nThe en-dash is used between numbers such as in: 1685–1750 (J. S. Bach). It is longer than the hyphen (as in “en-dash”, or, more properly, “en?dash”) but shorter than the em-dash, which is used — like this — as a sort of parenthesis. Neither should be confused with the horizontal bar which is used to introduce quotation in some cases.\r\n? Like this?\r\n? Right.\r\n\r\nThe ellipsis is… well, it just is.\r\n\r\nA table of (some) accents\r\n\r\nIn the following table, characters that are missing from Unicode as of version 3.0, latest draft (i.e. that cannot be represented as a single character but must use the more general form of combining diacritics) have been replaced by X, so you can tell they are not your browser\'s fault.\r\n\r\nBase	Grave	Acute	Circumflex	Tilde	Diaeresis	Macron	Breve	Ogonek	Dot	Double acute	Caron	Double grave	Inverted breve\r\na	à	á	â	ã	ä	?	?	?	?	X	?	?	?\r\ne	è	é	ê	?	ë	?	?	?	?	X	?	?	?\r\ni	ì	í	î	?	ï	?	?	?	i	X	?	?	?\r\no	ò	ó	ô	õ	ö	?	?	?	?	?	?	?	?\r\nu	ù	ú	û	?	ü	?	?	?	X	?	?	?	?\r\ny	?	ý	?	?	ÿ	?	X	X	?	X	X	X	X\r\nNote that the three characters “LATIN SMALL LETTER A WITH DOT ABOVE”, “LATIN SMALL LETTER O WITH DOT ABOVE” and “LATIN SMALL LETTER Y WITH MACRON” were not present in version 2.0 of the Unicode standard. So it is quite understandable if you do not see the corresponding entries.\r\n\r\nCombining diacritics\r\n\r\nThe following paragraph gives a few forms formed by using combining diacritics. The equal sign means that the combined form on the left should be identical in all respects (and in particular, represented identically) to the atomic form on the right. To emphasize even more: you should not see two signs on the left of the equal sign but one, the same as on the right.\r\n\r\nà=à; é=é; î=î (not the same as ?? but may be graphically identical); õ=õ; ?=? (whereas u¯ is two different symbols); ?=?; ?=? (also note i? should be essentially i); ï=ï (whereas i?? has three dots on the i); å=å (not to be confused with a° (read “a degrees”) nor a?); ?=?; ?=? \r\nç=ç; ?=?; ?=? (this is supposedly different from d? but may be graphically identical); ?=? \r\n?=?=? (not the same as ? which has the diaeresis on top of the macron); ?=?=? \r\n?=?=? (also ? but the latter is not so canonical); ó?=?=? (not so sure about this one)\r\n\r\nVarious symbols\r\n\r\nHere is a table of the constellations of the Zodiac, in which the first column should contain the relevant astrological symbol:\r\n\r\nSym.	English name	Latin name	Latin genitive	? star\r\n?	The Ram	Aries	Arietis	Hamal\r\n?	The Bull	Taurus	Tauri	Aldebaran\r\n?	The Twins	Gemini	Geminorum	Castor\r\n?	The Crab	Cancer	Cancri	Acubens\r\n?	The Lion	Leo	Leonis	Regulus\r\n?	The Virgin	Virgo	Virginis	Spica\r\n?	The Scales	Libra	Libræ	Zumen el Genubi\r\n?	The Scorpion	Scorpius	Scorpii	Antares\r\n?	The Archer	Sagittarius	Sagittarii	Rubkat\r\n?	The Sea Goat	Capricornus	Capricorni	Giedi\r\n?	The Water Bearer	Aquarius	Aquarii	Sadalmelik\r\n?	The Fishes	Pisces	Piscium	El Rischa\r\nThe following table should show a chessboard, with a pictorial representation of the pieces:\r\n\r\nA	B	C	D	E	F	G	H\r\n8	?	?	?	?	?	?	?	?\r\n7	?	?	?	?	?	?	?	?\r\n6								\r\n5								\r\n4								\r\n3								\r\n2	?	?	?	?	?	?	?	?\r\n1	?	?	?	?	?	?	?	?\r\nHere is a snowflake: ?.\r\n\r\nSome verses in Russian\r\n\r\nThe following is a five-verse extract of introduction of the poem Mednyj Vsadnik; by A. S. Pushkin (in Russian):\r\n\r\n?? ?????????? ??????? \r\n??????? ???????? ???????? \r\n??????? ? ?????; ??????? \r\n?????? ?? ???? ?????? ????? \r\n? ??????? ????????? ?????????;\r\n\r\nHere is what the above might look like if your browser supports the cyrillic block of Unicode:\r\n\r\n\r\n\r\nAnd here is a transcription of it:\r\n\r\nPo oživlënnym beregam \r\nGromady strojnye tesnâtsâ \r\nDvorcov i bašen; korabli \r\nTolpoj so vseh koncov zemli \r\nK bogatym pristanâm stremâtsâ;\r\n\r\nA rough translation might be:\r\n\r\nAlong the animated banks [of the Neva] / the shapely masses press / of palaces and towers; ships / in crowd from all corners of the Earth / rush toward its rich quays.\r\n\r\nSome verses in ancient Greek\r\n\r\nThe following verses are lines 1182–1185 of the tragedy Oedipus Rex by Sophocles (in ancient Greek):\r\n\r\n??? ???· ?? ????? ?? ?????? ????. \r\n? ???, ?????????? ?? ???????????? ???, \r\n????? ???????? ??? ?? ??? ?? ?? ????, ??? ??? ?? \r\n?? ???? ??????, ??? ?? ?? ??? ???? ??????.\r\n\r\nHere is what the above might look like if your browser supports the greek and greek extended blocks of Unicode (note that this representation uses the wrong shape of beta on the second line, because I didn\'t have the right one in the font I used):\r\n\r\n\r\n\r\nAnd here is the transcription of it:\r\n\r\nIou iou; ta pant\' an ex?koi saph?. \r\n? ph?s, teleutaion se prosblepsaimi nun, \r\nhostis pephasmai phus t\' aph\' h?n ou khr?n, xun hois t\' \r\nou khr?n homil?n, hous te m\' ouk edei ktan?n.\r\n\r\nA rough translation might be:\r\n\r\nAlas! All would become clear. / O light, may I see you for the last time, / I who was born of these of which it is a crime to be born, who live with these / which which it is a crime to live, and who killed these whom I must not kill.\r\n\r\nSome verses in Sanskrit\r\n\r\nThe following is one stanza of canto ? of the Kum?ra-sa?bhava (“the birth of Kum?ra”) by the great Sanskrit poet K?lid?sa:\r\n\r\n????????? ????????? ?????????? \r\n??????????????????????? ? \r\n???????? ? ????????????? \r\n??????? ?? ???? ????????? ????? ?\r\n\r\nHere is what the above might look like if your browser supports the devan?gar? block of Unicode:\r\n\r\n\r\n\r\nAnd here is the transcription of it:\r\n\r\nPa?upatirapi t?nyah?ni k?cchr?d \r\nagamayadadrisut?sam?gamotka?; \r\nkamaparamava?a? na viprakuryur \r\nvibhumapi ta? yadam? sp??anti bh?v???\r\n\r\nA rough translation might be:\r\n\r\nAnd Pa?upati passed those days with hardship, / eager for union with the daughter of the mountain. / Which other powerless [creature] would they not torment, / such emotions, when they affect even the powerful [?iva]?\r\n\r\nSome Chinese\r\n\r\nThe following are the two first lines of the Analects by Confucius:\r\n\r\n??????????????????????????? \r\n??????????????\r\n\r\n????????????????????? \r\n??????????????????????????? \r\n?????????????\r\n\r\nHere is what the above might look like if your browser supports the CJK block of Unicode:\r\n\r\n\r\n\r\nAnd here is the transcription of it:\r\n\r\nZ? yu?: “Xué ér sh? xí zh?, bú yì yuè h?? Yo? péng zì y?an f?nglái, bú yì lè h?? Rén bù zh?, ér bú yùn, bú yì j?nz? h??”\r\n\r\nYóuz? yu?: “Qí wèi rén y? xiàodì, ér hàofànshàngzh?, xi?n y?; bú hào fànshàng, ér hàozuòluànzh?, wèi zh? yóu y?. J?nz? wù b?n, b?n lì ér dào sh?ng. Xiàodì yé zh?, qí wèi rén zh? bén y?!”\r\n\r\nA rough translation might be:\r\n\r\nThe Master [Confucius] said: “To study and to practice, it is is a joy, isn\'t it? When friends come from afar, it is a pleasure, isn\'t it? If one remains unknown and isn\'t hurt, isn\'t one an honorable man?”\r\n\r\nMaster You said: “Few of the men who act well filially and fraternally are also fond of offending their superiors; men who are not fond of offending their superiors, but who like to cause trouble, such do not exist. The honorable man concerns himself with the foundations. Once the foundations are established, the Way is born. Is not acting well filially and fraternally the foundation of humanity?”\r\n\r\nA Tamil name\r\n\r\nThe following is the original (Tamil) name of a famous mathematician:\r\n\r\n????????? ????????? ????????\r\n\r\nHere is what the above might look like if your browser supports the Tamil block of Unicode (note, however, that this representation is less than optimal, since the font I used didn\'t have the ‘sr’ ligature; so if the first two characters are replaced by a single one which looks very different, it is probably normal):\r\n\r\n\r\n\r\nAnd here is a transcription of it:\r\n\r\nS???iv?sa R?m??uja? Aiya?k?r\r\n\r\nHere there can be no translation, of course, since this is a proper noun. But I note that the mathematician in question (1887–1920) is typically named “Srinivasa Ramanujan Iyengar” in English.\r\n\r\nSome Arabic\r\n\r\nThe following lines are the first chapter of the Qur\'an (note that the text runs right to left, and should probably be aligned on the right margin):\r\n\r\n?????? ??????? ????????????? ??????????\r\n\r\n????????? ??????? ????? ?????????????\r\n\r\n????????????? ??????????\r\n\r\n???????? ?????? ????????\r\n\r\n???????? ???????? ?????????? ???????????\r\n\r\n???????????? ?????????? ?????????????\r\n\r\n??????? ????????? ????????? ????????? ????? ?????????? ????????? ????? ????????????\r\n\r\nHere is what the above might look like if your browser supports the Arabic block of Unicode:\r\n\r\n\r\n\r\nAnd here is a transcription of it:\r\n\r\nbismi ?l-la\'hi ?r-ra?ma\'ni ?r-ra?iymi\r\n\r\n?l-?amdu li-lla\'hi rabbi ?l-`a\'lamiyna\r\n\r\n?r-ra?ma\'ni ?r-ra?iymi\r\n\r\nma\'liki yawmi ?d-diyni\r\n\r\n\'iyya\'ka na`budu wa-\'iyya\'ka nasta`iynu\r\n\r\n?hdina\' ??-?ira\'?a ?l-mustaqiyma\r\n\r\n?ira\'?a ?lla?iyna \'an`amta `alayhim ?ayri ?l-ma??uwbi `alayhim wala\' ??-?a\'lliyna\r\n\r\nA rough translation might be:\r\n\r\nIn the name of God, the beneficient, the merciful.\r\n\r\nPraise be to God, lord of the worlds.\r\n\r\nThe beneficient, the merciful.\r\n\r\nMaster of the day of judgment.\r\n\r\nThee do we worship, and Thine aid we seek.\r\n\r\nLead us on the right path.\r\n\r\nThe path of those on whom Thou hast bestowed favors. Not of those who have earned Thy wrath, nor of those who go astray.\r\n\r\n\r\n?(-???-?)? ?(????•?)? ?(?????)? ?(-???•?).\r\n\r\n', NULL, NULL),
(38, NULL, NULL, '<a href=\"r.php?c=w&a=', NULL, NULL),
(39, NULL, NULL, '\">', NULL, NULL),
(40, NULL, NULL, '</a>', NULL, NULL),
(41, NULL, NULL, '<input type=\"hidden\" name=\"', NULL, NULL),
(42, NULL, NULL, '<form action=\"r.php\" method=\"post\"><input type=\"hidden\" name=\"c\" value=\"w\"><input type=\"hidden\" name=\"a\" value=\"', NULL, NULL),
(43, NULL, NULL, '\"><input type=\"hidden\" name=\"', NULL, NULL),
(44, NULL, NULL, '\" value=\"', NULL, NULL),
(45, NULL, NULL, '\"><input type=\"hidden\" name=\"login\" value=\"1\"><input type=\"hidden\" name=\"locale\" value=\"\"><input type=\"submit\" class=\"t\" value=\"', NULL, '\"><input type=\"hidden\" name=\"login\" value=\"1\"><input type=\"hidden\" name=\"locale\" value=\"2\"><input type=\"submit\" class=\"t\" value=\"'),
(46, NULL, NULL, '<h3>Error</h3><br><br>The requested action \"', NULL, '<h3>Erreur</h3><br><br>L\'action demandée «'),
(47, NULL, NULL, '\" is not recognised by Weave. Please try again.', NULL, '» n\'est pas reconnu par Weave. S\'il vous plaît essayez de nouveau.'),
(48, NULL, NULL, 'Null!\r\n', NULL, 'Nulle!'),
(49, NULL, NULL, 'Error: ', NULL, 'Erreur: '),
(50, NULL, NULL, '<em>You do not appear to have sufficient privileges to perform the specified action.</em> If you are not logged in and think you do have these privileges, you can do so to work within the privileges afforded your account.', NULL, '<em>Vous ne semblez pas avoir des privilèges suffisants pour exécuter l\'action spécifiée.</ em> Si vous n\'êtes pas connecté et que vous pensez faire ces privilèges, vous pouvez faire pour travailler au sein de l\'privilèges accordés à votre compte.'),
(51, NULL, NULL, '<form target=\"weave.php\" action=\"post\"><input type=\"hidden\" name=\"action\" value=\"home\"><input type=\"image\" src=\"weave.png\" width=\"132\" height=\"57\"></form>', NULL, NULL),
(52, NULL, NULL, '<form target=\"weave.php\" action=\"post\"><input type=\"hidden\" name=\"action\" value=\"home\"><input type=\"image\" src=\"weave.png\" width=\"132\" height=\"57\"></form>', NULL, NULL),
(53, NULL, NULL, '<form action=\"weave.php\" method=\"post\" target=\"_self\"><input type=\"hidden\" name=\"action\" value=\"home\"><input type=\"image\" src=\"weave.png\" width=\"132\" height=\"57\"></form>', NULL, NULL),
(54, NULL, NULL, '&', 'Do not localise', NULL),
(55, NULL, NULL, 'home', NULL, ''),
(56, NULL, NULL, '<a href=\"weave.php?action=home\">Log out…</a>', NULL, '<a href=\"weave.php?action=home&locale=2\">Déconnexion…</a>'),
(57, NULL, NULL, '<input type=\"hidden\" name=\"userName\" value=\"', NULL, NULL),
(58, NULL, NULL, '\"><input type=\"hidden\" name=\"password\" value=\"', NULL, NULL),
(59, NULL, NULL, '\"><input type=\"hidden\" name=\"login\" value=\"1\"><input type=\"image\" src=\"weave.png\" width=\"132\" height=\"57\"></form>', NULL, '\"><input type=\"hidden\" name=\"login\" value=\"1\"><input type=\"hidden\" name=\"locale\" value=\"2\"><input type=\"image\" src=\"weave.png\" width=\"132\" height=\"57\"></form>'),
(60, NULL, NULL, '\"></form>', NULL, NULL),
(61, NULL, NULL, '<input type=\"hidden\" name=\"locale\" value=\"', NULL, NULL),
(62, NULL, NULL, 'locale=', NULL, NULL),
(63, NULL, NULL, '&locale=', NULL, NULL),
(64, NULL, NULL, 'New node…', NULL, 'Nouveau noeud…'),
(66, NULL, NULL, '&#32;', NULL, '&#32;'),
(69, NULL, NULL, '!', NULL, '!'),
(70, NULL, '', 'Added node ', NULL, 'Nœud ajouté '),
(71, NULL, NULL, '<p><a href=\"', NULL, '<p><a href=\"'),
(72, NULL, NULL, '<p><small><a href=\"', NULL, '<p><small><a href=\"'),
(73, NULL, NULL, '\">', NULL, '\">');
INSERT INTO `interface` (`interface_id`, `interface_name`, `interface_description`, `interface_content`, `interface_comment`, `interface_contentFRA`) VALUES
(65, NULL, NULL, 'New node:<br><form action=\"r.php\" method=\"post\" enctype=\"multipart/form-data\"><input type=\"hidden\" name=\"c\" value=\"w\"><br>Title: <input type=\"text\" name=\"nodeTitle\"><br> Sort title: <input type=\"text\" name=\"nodeSortTitle\"><br> Display title: <input type=\"text\" name=\"nodeDisplayTitle\"><br> Short title: <input type=\"text\" name=\"nodeShortTitle\"><br> Type: <input type=\"text\" name=\"nodeType\"><br>Description: <textarea rows=\"20\" cols=\"80\" name=\"nodeDescription\"></textarea><br> Disambiguation description: <input type=\"text\" name=\"nodeDisambiguationDescription\"><br> Metadata: <input type=\"text\" name=\"nodeMetadata\"><br> Permissions: <input type=\"text\" name=\"nodePermissions\"><br> Relationships: <input type=\"text\" name=\"nodeRelationships\"><br> Source (citation): <input type=\"text\" name=\"nodeSource\"><br> Comments: <input type=\"text\" name=\"nodeComment\"><br> Short description: <input type=\"text\" name=\"nodeShortDescription\"><br> Is this node from another universe? <input type=\"radio\" name=\"nodeUniverseStatus\" value=\"1\">Yes <input type=\"radio\" name=\"nodeUniverseStatus\" value=\"\">No <br> Does this node have copyright issues? <input type=\"radio\" name=\"nodeCopyrightFlag\" value=\"1\">Yes <input type=\"radio\" name=\"nodeCopyrightFlag\" value=\"\">No<br> Does this node contain morally troublesome content? <input type=\"radio\" name=\"nodeMoralityFlag\" value=\"1\">Yes <input type=\"radio\" name=\"nodeMoralityFlag\" value=\"\">No<br> Does this node contain information which it would be unethical to disseminate to minors? <input type=\"radio\" name=\"nodeMinorFlag\" value=\"1\">Yes <input type=\"radio\" name=\"nodeMinorFlag\" value=\"\">No<br>Does this node contain personal information? <input type=\"radio\" name=\"nodePersonalFlag\" value=\"1\">Yes <input type=\"radio\" name=\"nodePersonalFlag\" value=\"\">No <br> Upload a data entry to be represented by this node? <input type=\"radio\" name=\"nodeDataUploadFlag\" value=\"1\">Yes, this: <input type=\"file\"  name=\"uploadeddata\" /> of type <input type=\"text\" name=\"dataType\"> <input type=\"radio\" name=\"nodeDataUploadFlag\" value=\"\">No <br><br><input type=\"hidden\" name=\"a\" value=\"8\">', NULL, 'Nouveau nœud: <br> <form action=\"r.php\" method=\"post\" enctype=\"multipart/form-data\"><input type=\"hidden\" name=\"c\" value=\"w\"> Titre <br>: <input type=\"text\" titre name=\"nodeTitle\"> Trier <br>: <input type = \" texte \"name =\"nodeSortTitle\"> Titre pour l\'affichage: <input type=\"text\" name=\"nodeDisplayTitle\"><br> Titre abrégé: <input type=\"text\" name=\"nodeShortTitle\"><br>  Type <br>: <input type=\"text\" name=\"nodeType\"> <br> Description: <textarea rows=\"20\" cols=\"80\" name=\"nodeDescription\"></textarea> Description Homonymie <br>: <input type=\"text\" métadonnées name=\"nodeDisambiguationDescription\"> <br>: <input type=\"text\" autorisations <br> name=\"nodeMetadata\">: <input type = \"texte\" name = \"nodePermissions\"> Relations <br>: <input type=\"text\" name=\"nodeRelationships\"> <br> Source (citation): <input type=\"text\" name=\"nodeSource\"> <br > Commentaires: <input type=\"text\" name=\"nodeComment\"> <br> Description courte: <input type=\"text\" name=\"nodeShortDescription\"> <br> Est-ce nœud d\'un autre univers? <input type=\"radio\" name=\"nodeUniverseStatus\" value=\"1\"> Oui <input type=\"radio\" name=\"nodeUniverseStatus\" value=\"\"> Pas <br> Est-ce noeud ont les problèmes de copyright? <input type=\"radio\" name=\"nodeCopyrightFlag\" value=\"1\"> Oui <input type=\"radio\" name=\"nodeCopyrightFlag\" value=\"\"> Pas <br> Est-ce noeud un contenu moralement gênante? <input type=\"radio\" name=\"nodeMoralityFlag\" value=\"1\"> Oui <input type=\"radio\" name=\"nodeMoralityFlag\" value=\"\"> Pas <br> Est-ce noeud contiennent des informations dont il serait contraire à l\'éthique à diffuser aux mineurs? <input type=\"radio\" name=\"nodeMinorFlag\" value=\"1\"> Oui <input type=\"radio\" name=\"nodeMinorFlag\" value=\"\"> Pas <br> Est-ce noeud contenant des renseignements personnels? <input type=\"radio\" name=\"nodePersonalFlag\" value=\"1\"> Oui <input type=\"radio\" name=\"nodePersonalFlag\" value=\"\"> Pas <br> Ajouter une entrée de données d\'être représenté par ce nœud ? <input type=\"radio\" name=\"nodeDataUploadFlag\" value=\"1\"> Oui, ceci: <input type=\"file\" name=\"uploadeddata\" /> de type <input type = \"text\" name = \"dataType\"> <input type=\"radio\" name=\"nodeDataUploadFlag\" value=\"\"> Pas <br> <input type=\"hidden\" name=\"a\" value=\"8\">'),
(268, NULL, NULL, '', NULL, NULL),
(269, NULL, NULL, '', NULL, NULL),
(270, NULL, NULL, '', NULL, NULL),
(271, NULL, NULL, '', NULL, NULL),
(272, NULL, NULL, '', NULL, NULL),
(273, NULL, NULL, '', NULL, NULL),
(274, NULL, NULL, 'Life Chewable Vitamin C', NULL, NULL),
(275, NULL, NULL, '', NULL, NULL),
(276, NULL, NULL, '', NULL, NULL),
(67, NULL, NULL, 'Save', NULL, 'Enregistrer'),
(68, NULL, NULL, 'Added node', NULL, 'Nœud ajouté'),
(74, NULL, NULL, '</p>', NULL, '</p>'),
(75, NULL, NULL, 'r.php?c=w&a=6&nodeId=', NULL, 'r.php?c=w&a=6&nodeId='),
(76, NULL, NULL, '&locale=', NULL, '&locale='),
(77, NULL, 'Did say: \"><span style=\"font-family: Symbola, serif;\">&#89879;</span></a></small> . Unicode reference fixed 18 January 2012. Trailing space also removed 18 January 2012 (same day).', '\"><span style=\"font-family: Symbola, serif;\">&#128279;</span></a></small>', NULL, '\">&#89879;</a></small> '),
(78, '', NULL, 'test', NULL, NULL),
(79, NULL, NULL, 'test', NULL, NULL),
(80, NULL, NULL, '<form action=\"r.php\" method=\"post\" enctype=\"multipart/form-data\"><input type=\"hidden\" name=\"c\" value=\"w\"><br>Content: <textarea rows=\"20\" cols=\"80\" name=\"intfContent\"></textarea><br><input type=\"hidden\" name=\"a\" value=\"10\">', NULL, NULL),
(81, NULL, NULL, 'New interface content', NULL, NULL),
(82, NULL, NULL, 'Added interface content ', NULL, NULL),
(83, NULL, NULL, 'Added interface content', NULL, NULL),
(84, NULL, NULL, 'Operation index… ', NULL, NULL),
(85, NULL, NULL, 'Operation index… ', NULL, NULL),
(86, NULL, NULL, 'Operation Index', NULL, NULL),
(87, NULL, NULL, 'New node', NULL, NULL),
(88, NULL, NULL, '</li></ul><h3>Moderator actions</h3><ul><li>', NULL, NULL),
(89, NULL, NULL, '</li></ul><h3>Administrator actions</h3><ul><li>', NULL, NULL),
(90, NULL, NULL, 'New interface', NULL, NULL),
(91, NULL, NULL, '', NULL, NULL),
(92, NULL, NULL, '', NULL, NULL),
(93, NULL, NULL, '', NULL, NULL),
(94, NULL, NULL, 'test node', NULL, NULL),
(95, NULL, NULL, 'fuck yeah', NULL, NULL),
(96, NULL, NULL, '', NULL, NULL),
(97, NULL, NULL, '', NULL, NULL),
(98, NULL, NULL, '', NULL, NULL),
(99, NULL, NULL, '', NULL, NULL),
(100, NULL, NULL, 'test node', NULL, NULL),
(101, NULL, NULL, 'fuck yeah', NULL, NULL),
(102, NULL, NULL, '', NULL, NULL),
(103, NULL, NULL, '', NULL, NULL),
(104, NULL, NULL, '', NULL, NULL),
(105, NULL, NULL, '', NULL, NULL),
(106, NULL, NULL, 'test node', NULL, NULL),
(107, NULL, NULL, 'fuck yeah', NULL, NULL),
(108, NULL, NULL, '', NULL, NULL),
(109, NULL, NULL, '', NULL, NULL),
(110, NULL, NULL, '', NULL, NULL),
(111, NULL, NULL, '', NULL, NULL),
(112, NULL, NULL, 'test node', NULL, NULL),
(113, NULL, NULL, 'fuck yeah', NULL, NULL),
(114, NULL, NULL, '', NULL, NULL),
(115, NULL, NULL, '', NULL, NULL),
(116, NULL, NULL, '', NULL, NULL),
(117, NULL, NULL, '', NULL, NULL),
(118, NULL, NULL, 'test node', NULL, NULL),
(119, NULL, NULL, 'fuck yeah', NULL, NULL),
(120, NULL, NULL, '', NULL, NULL),
(121, NULL, NULL, '', NULL, NULL),
(122, NULL, NULL, '', NULL, NULL),
(123, NULL, NULL, '', NULL, NULL),
(124, NULL, NULL, 'test node', NULL, NULL),
(125, NULL, NULL, 'fuck yeah', NULL, NULL),
(126, NULL, NULL, '', NULL, NULL),
(127, NULL, NULL, '', NULL, NULL),
(128, NULL, NULL, '', NULL, NULL),
(129, NULL, NULL, '', NULL, NULL),
(130, NULL, NULL, 'test node', NULL, NULL),
(131, NULL, NULL, 'erchu', NULL, NULL),
(132, NULL, NULL, 'fuck yeah', NULL, NULL),
(133, NULL, NULL, '', NULL, NULL),
(134, NULL, NULL, '', NULL, NULL),
(135, NULL, NULL, '', NULL, NULL),
(136, NULL, NULL, '', NULL, NULL),
(137, NULL, NULL, 'test node', NULL, NULL),
(138, NULL, NULL, 'erchu', NULL, NULL),
(139, NULL, NULL, 'fuck yeah', NULL, NULL),
(140, NULL, NULL, '', NULL, NULL),
(141, NULL, NULL, '', NULL, NULL),
(142, NULL, NULL, '', NULL, NULL),
(143, NULL, NULL, '', NULL, NULL),
(144, NULL, NULL, 'test node', NULL, NULL),
(145, NULL, NULL, 'erchu', NULL, NULL),
(146, NULL, NULL, 'fuck yeah', NULL, NULL),
(147, NULL, NULL, '', NULL, NULL),
(148, NULL, NULL, '', NULL, NULL),
(149, NULL, NULL, 'eruch', NULL, NULL),
(150, NULL, NULL, '', NULL, NULL),
(151, NULL, NULL, 'test node', NULL, NULL),
(152, NULL, NULL, 'erchu', NULL, NULL),
(153, NULL, NULL, 'erchu', NULL, NULL),
(154, NULL, NULL, 'ercuh', NULL, NULL),
(155, NULL, NULL, '', NULL, NULL),
(156, NULL, NULL, 'eruch', NULL, NULL),
(157, NULL, NULL, '', NULL, NULL),
(158, NULL, NULL, 'test node', NULL, NULL),
(159, NULL, NULL, 'erchu', NULL, NULL),
(160, NULL, NULL, 'erchu', NULL, NULL),
(161, NULL, NULL, 'ercuh', NULL, NULL),
(162, NULL, NULL, '', NULL, NULL),
(163, NULL, NULL, 'eruch', NULL, NULL),
(164, NULL, NULL, '', NULL, NULL),
(165, NULL, NULL, 'test node', NULL, NULL),
(166, NULL, NULL, 'erchu', NULL, NULL),
(167, NULL, NULL, 'erchu', NULL, NULL),
(168, NULL, NULL, 'ercuh', NULL, NULL),
(169, NULL, NULL, '', NULL, NULL),
(170, NULL, NULL, 'eruch', NULL, NULL),
(171, NULL, NULL, '', NULL, NULL),
(172, NULL, NULL, 'test node', NULL, NULL),
(173, NULL, NULL, 'erchu', NULL, NULL),
(174, NULL, NULL, 'erchu', NULL, NULL),
(175, NULL, NULL, 'ercuh', NULL, NULL),
(176, NULL, NULL, '', NULL, NULL),
(177, NULL, NULL, 'eruch', NULL, NULL),
(178, NULL, NULL, '', NULL, NULL),
(179, NULL, NULL, 'test node', NULL, NULL),
(180, NULL, NULL, 'erchu', NULL, NULL),
(181, NULL, NULL, 'erchu', NULL, NULL),
(182, NULL, NULL, 'ercuh', NULL, NULL),
(183, NULL, NULL, '', NULL, NULL),
(184, NULL, NULL, 'eruch', NULL, NULL),
(185, NULL, NULL, '', NULL, NULL),
(186, NULL, NULL, 'test node', NULL, NULL),
(187, NULL, NULL, 'erchu', NULL, NULL),
(188, NULL, NULL, 'erchu', NULL, NULL),
(189, NULL, NULL, 'ercuh', NULL, NULL),
(190, NULL, NULL, '', NULL, NULL),
(191, NULL, NULL, 'eruch', NULL, NULL),
(192, NULL, NULL, '', NULL, NULL),
(193, NULL, NULL, 'test node', NULL, NULL),
(194, NULL, NULL, 'erchu', NULL, NULL),
(195, NULL, NULL, 'erchu', NULL, NULL),
(196, NULL, NULL, 'ercuh', NULL, NULL),
(197, NULL, NULL, '', NULL, NULL),
(198, NULL, NULL, 'eruch', NULL, NULL),
(199, NULL, NULL, '', NULL, NULL),
(200, NULL, NULL, 'test node', NULL, NULL),
(201, NULL, NULL, 'erchu', NULL, NULL),
(202, NULL, NULL, 'erchu', NULL, NULL),
(203, NULL, NULL, 'ercuh', NULL, NULL),
(204, NULL, NULL, '', NULL, NULL),
(205, NULL, NULL, 'eruch', NULL, NULL),
(206, NULL, NULL, '', NULL, NULL),
(207, NULL, NULL, 'test node', NULL, NULL),
(208, NULL, NULL, 'erchu', NULL, NULL),
(209, NULL, NULL, 'erchu', NULL, NULL),
(210, NULL, NULL, 'ercuh', NULL, NULL),
(211, NULL, NULL, '', NULL, NULL),
(212, NULL, NULL, 'eruch', NULL, NULL),
(213, NULL, NULL, '', NULL, NULL),
(214, NULL, NULL, 'test node', NULL, NULL),
(215, NULL, NULL, 'erchu', NULL, NULL),
(216, NULL, NULL, 'erchu', NULL, NULL),
(217, NULL, NULL, 'ercuh', NULL, NULL),
(218, NULL, NULL, '', NULL, NULL),
(219, NULL, NULL, 'eruch', NULL, NULL),
(220, NULL, NULL, '', NULL, NULL),
(221, NULL, NULL, 'test node', NULL, NULL),
(222, NULL, NULL, 'erchu', NULL, NULL),
(223, NULL, NULL, 'erchu', NULL, NULL),
(224, NULL, NULL, 'ercuh', NULL, NULL),
(225, NULL, NULL, '', NULL, NULL),
(226, NULL, NULL, 'eruch', NULL, NULL),
(227, NULL, NULL, '', NULL, NULL),
(228, NULL, NULL, 'test node', NULL, NULL),
(229, NULL, NULL, 'erchu', NULL, NULL),
(230, NULL, NULL, 'erchu', NULL, NULL),
(231, NULL, NULL, 'ercuh', NULL, NULL),
(232, NULL, NULL, '', NULL, NULL),
(233, NULL, NULL, 'eruch', NULL, NULL),
(234, NULL, NULL, '', NULL, NULL),
(235, NULL, NULL, 'test node', NULL, NULL),
(236, NULL, NULL, 'erchu', NULL, NULL),
(237, NULL, NULL, 'erchu', NULL, NULL),
(238, NULL, NULL, 'ercuh', NULL, NULL),
(239, NULL, NULL, '', NULL, NULL),
(240, NULL, NULL, 'eruch', NULL, NULL),
(241, NULL, NULL, '', NULL, NULL),
(242, NULL, NULL, 'test node', NULL, NULL),
(243, NULL, NULL, 'erchu', NULL, NULL),
(244, NULL, NULL, 'erchu', NULL, NULL),
(245, NULL, NULL, 'ercuh', NULL, NULL),
(246, NULL, NULL, '', NULL, NULL),
(247, NULL, NULL, 'eruch', NULL, NULL),
(248, NULL, NULL, '', NULL, NULL),
(249, NULL, NULL, 'test node', NULL, NULL),
(250, NULL, NULL, 'erchu', NULL, NULL),
(251, NULL, NULL, 'erchu', NULL, NULL),
(252, NULL, NULL, 'ercuh', NULL, NULL),
(253, NULL, NULL, '', NULL, NULL),
(254, NULL, NULL, '', NULL, NULL),
(255, NULL, NULL, '', NULL, NULL),
(256, NULL, NULL, 'This is a test node.', NULL, NULL),
(257, NULL, NULL, 'oh yeah', NULL, NULL),
(258, NULL, NULL, '', NULL, NULL),
(259, NULL, NULL, '', NULL, NULL),
(267, NULL, NULL, 'test', NULL, NULL),
(260, NULL, NULL, 'Test Node Title', NULL, NULL),
(261, NULL, NULL, 'Gotten from ACME Test Node Company.', NULL, NULL),
(262, NULL, NULL, '', NULL, NULL),
(263, NULL, NULL, 'This is a test node description.', NULL, NULL),
(264, NULL, NULL, 'a node used for test purposes', NULL, NULL),
(265, NULL, NULL, 'This test node has a comment.', NULL, NULL),
(266, NULL, NULL, 'This is a test node short description.', NULL, NULL),
(277, NULL, NULL, '', NULL, NULL),
(278, NULL, NULL, '', NULL, NULL),
(279, NULL, NULL, '', NULL, NULL),
(280, NULL, NULL, '', NULL, NULL),
(281, NULL, NULL, 'test\r\n', NULL, NULL),
(282, NULL, NULL, 'test\r\n', NULL, NULL),
(283, NULL, NULL, 'test\r\n', NULL, NULL),
(284, NULL, NULL, 'Logged in. ', NULL, NULL),
(285, NULL, NULL, 'Return home…', NULL, NULL),
(286, 'SID', NULL, '<input type=\"hidden\" name=\"wvSession\" value=\"', NULL, NULL),
(287, NULL, NULL, '\"><input type=\"hidden\" name=\"login\" value=\"1\"><input type=\"image\" src=\"d/w.png\" width=\"132\" height=\"57\"></form>\n', NULL, NULL),
(288, NULL, NULL, '<img src=\"d/w.png\" alt=\"Weave\" width=\"132\" height=\"57\" border=\"0\">', NULL, NULL),
(289, NULL, '', 'Login error: could not authenticate.', NULL, 'Erreur de connexion: n\'a pas pu authentifier.'),
(290, NULL, NULL, 'mhhv', NULL, NULL),
(291, NULL, NULL, '', NULL, NULL),
(292, NULL, NULL, '', NULL, NULL),
(293, NULL, NULL, 'hlsvlvs', NULL, NULL),
(294, NULL, NULL, '', NULL, NULL),
(295, NULL, NULL, '', NULL, NULL),
(296, NULL, NULL, '', NULL, NULL),
(297, NULL, NULL, 'mhhv', NULL, NULL),
(298, NULL, NULL, '', NULL, NULL),
(299, NULL, NULL, '', NULL, NULL),
(300, NULL, NULL, 'hlsvlvs', NULL, NULL),
(301, NULL, NULL, '', NULL, NULL),
(302, NULL, NULL, '', NULL, NULL),
(303, NULL, NULL, '', NULL, NULL),
(304, NULL, NULL, 'mhhv', NULL, NULL),
(305, NULL, NULL, '', NULL, NULL),
(306, NULL, NULL, '', NULL, NULL),
(307, NULL, NULL, 'hlsvlvs', NULL, NULL),
(308, NULL, NULL, '', NULL, NULL),
(309, NULL, NULL, '', NULL, NULL),
(310, NULL, NULL, '', NULL, NULL),
(311, NULL, NULL, 'etuhesh()', NULL, NULL),
(312, NULL, NULL, '', NULL, NULL),
(313, NULL, NULL, '', NULL, NULL),
(314, NULL, NULL, '', NULL, NULL),
(315, NULL, NULL, '', NULL, NULL),
(316, NULL, NULL, '', NULL, NULL),
(317, NULL, NULL, '', NULL, NULL),
(318, NULL, NULL, 'etuhesh()', NULL, NULL),
(319, NULL, NULL, '', NULL, NULL),
(320, NULL, NULL, '', NULL, NULL),
(321, NULL, NULL, '', NULL, NULL),
(322, NULL, NULL, '', NULL, NULL),
(323, NULL, NULL, '', NULL, NULL),
(324, NULL, NULL, '', NULL, NULL),
(325, NULL, NULL, 'Test', NULL, NULL),
(326, NULL, NULL, '', NULL, NULL),
(327, NULL, NULL, '', NULL, NULL),
(328, NULL, NULL, '', NULL, NULL),
(329, NULL, NULL, 'Oh ya!', NULL, NULL),
(330, NULL, NULL, '', NULL, NULL),
(331, NULL, NULL, '', NULL, NULL),
(332, NULL, NULL, 'Test', NULL, NULL),
(333, NULL, NULL, '', NULL, NULL),
(334, NULL, NULL, '', NULL, NULL),
(335, NULL, NULL, '', NULL, NULL),
(336, NULL, NULL, 'Oh ya!', NULL, NULL),
(337, NULL, NULL, '', NULL, NULL),
(338, NULL, NULL, '', NULL, NULL),
(339, NULL, NULL, 'Test node', NULL, NULL),
(340, NULL, NULL, '', NULL, NULL),
(341, NULL, NULL, '', NULL, NULL),
(342, NULL, NULL, '', NULL, NULL),
(343, NULL, NULL, '', NULL, NULL),
(344, NULL, NULL, '', NULL, NULL),
(345, NULL, NULL, '', NULL, NULL),
(346, NULL, NULL, 'Test node', NULL, NULL),
(347, NULL, NULL, '', NULL, NULL),
(348, NULL, NULL, '', NULL, NULL),
(349, NULL, NULL, '', NULL, NULL),
(350, NULL, NULL, '', NULL, NULL),
(351, NULL, NULL, '', NULL, NULL),
(352, NULL, NULL, '', NULL, NULL),
(353, NULL, NULL, 'Test node', NULL, NULL),
(354, NULL, NULL, '', NULL, NULL),
(355, NULL, NULL, '', NULL, NULL),
(356, NULL, NULL, '', NULL, NULL),
(357, NULL, NULL, '', NULL, NULL),
(358, NULL, NULL, '', NULL, NULL),
(359, NULL, NULL, '', NULL, NULL),
(360, NULL, NULL, 'Test node', NULL, NULL),
(361, NULL, NULL, '', NULL, NULL),
(362, NULL, NULL, '', NULL, NULL),
(363, NULL, NULL, '', NULL, NULL),
(364, NULL, NULL, '', NULL, NULL),
(365, NULL, NULL, '', NULL, NULL),
(366, NULL, NULL, '', NULL, NULL),
(367, NULL, NULL, 'Test node', NULL, NULL),
(368, NULL, NULL, '', NULL, NULL),
(369, NULL, NULL, '', NULL, NULL),
(370, NULL, NULL, '', NULL, NULL),
(371, NULL, NULL, '', NULL, NULL),
(372, NULL, NULL, '', NULL, NULL),
(373, NULL, NULL, '', NULL, NULL),
(374, NULL, NULL, 'ercuhl', NULL, NULL),
(375, NULL, NULL, 'lorcheu', NULL, NULL),
(376, NULL, NULL, 'cehucrh', NULL, NULL),
(377, NULL, NULL, '', NULL, NULL),
(378, NULL, NULL, 'reuhrc', NULL, NULL),
(379, NULL, NULL, '', NULL, NULL),
(380, NULL, NULL, 'Ouhcr', NULL, NULL),
(381, NULL, NULL, '', NULL, NULL),
(382, NULL, NULL, '', NULL, NULL),
(383, NULL, NULL, 'ercuhl', NULL, NULL),
(384, NULL, NULL, 'lorcheu', NULL, NULL),
(385, NULL, NULL, 'cehucrh', NULL, NULL),
(386, NULL, NULL, '', NULL, NULL),
(387, NULL, NULL, 'reuhrc', NULL, NULL),
(388, NULL, NULL, '', NULL, NULL),
(389, NULL, NULL, 'Ouhcr', NULL, NULL),
(390, NULL, NULL, '', NULL, NULL),
(391, NULL, NULL, '', NULL, NULL),
(392, NULL, NULL, 'ercuhl', NULL, NULL),
(393, NULL, NULL, 'lorcheu', NULL, NULL),
(394, NULL, NULL, 'cehucrh', NULL, NULL),
(395, NULL, NULL, '', NULL, NULL),
(396, NULL, NULL, 'reuhrc', NULL, NULL),
(397, NULL, NULL, '', NULL, NULL),
(398, NULL, NULL, 'Ouhcr', NULL, NULL),
(399, NULL, NULL, '', NULL, NULL),
(400, NULL, NULL, '', NULL, NULL),
(401, NULL, NULL, 'ercuhl', NULL, NULL),
(402, NULL, NULL, 'lorcheu', NULL, NULL),
(403, NULL, NULL, 'cehucrh', NULL, NULL),
(404, NULL, NULL, '', NULL, NULL),
(405, NULL, NULL, 'reuhrc', NULL, NULL),
(406, NULL, NULL, '', NULL, NULL),
(407, NULL, NULL, 'Ouhcr', NULL, NULL),
(408, NULL, NULL, '', NULL, NULL),
(409, NULL, NULL, '', NULL, NULL),
(410, NULL, NULL, 'ercuhl', NULL, NULL),
(411, NULL, NULL, 'lorcheu', NULL, NULL),
(412, NULL, NULL, 'cehucrh', NULL, NULL),
(413, NULL, NULL, '', NULL, NULL),
(414, NULL, NULL, 'reuhrc', NULL, NULL),
(415, NULL, NULL, '', NULL, NULL),
(416, NULL, NULL, 'Ouhcr', NULL, NULL),
(417, NULL, NULL, '', NULL, NULL),
(418, NULL, NULL, '', NULL, NULL),
(419, NULL, NULL, 'ercuhl', NULL, NULL),
(420, NULL, NULL, 'lorcheu', NULL, NULL),
(421, NULL, NULL, 'cehucrh', NULL, NULL),
(422, NULL, NULL, '', NULL, NULL),
(423, NULL, NULL, 'reuhrc', NULL, NULL),
(424, NULL, NULL, '', NULL, NULL),
(425, NULL, NULL, 'Ouhcr', NULL, NULL),
(426, NULL, NULL, '', NULL, NULL),
(427, NULL, NULL, '', NULL, NULL),
(428, NULL, NULL, 'ercuhl', NULL, NULL),
(429, NULL, NULL, 'lorcheu', NULL, NULL),
(430, NULL, NULL, 'cehucrh', NULL, NULL),
(431, NULL, NULL, '', NULL, NULL),
(432, NULL, NULL, 'reuhrc', NULL, NULL),
(433, NULL, NULL, '', NULL, NULL),
(434, NULL, NULL, 'Ouhcr', NULL, NULL),
(435, NULL, NULL, '', NULL, NULL),
(436, NULL, NULL, '', NULL, NULL),
(437, NULL, NULL, 'ercuhl', NULL, NULL),
(438, NULL, NULL, 'lorcheu', NULL, NULL),
(439, NULL, NULL, 'cehucrh', NULL, NULL),
(440, NULL, NULL, '', NULL, NULL),
(441, NULL, NULL, 'reuhrc', NULL, NULL),
(442, NULL, NULL, '', NULL, NULL),
(443, NULL, NULL, 'Ouhcr', NULL, NULL),
(444, NULL, NULL, '', NULL, NULL),
(445, NULL, NULL, '', NULL, NULL),
(446, NULL, NULL, 'ercuhl', NULL, NULL),
(447, NULL, NULL, 'lorcheu', NULL, NULL),
(448, NULL, NULL, 'cehucrh', NULL, NULL),
(449, NULL, NULL, '', NULL, NULL),
(450, NULL, NULL, 'reuhrc', NULL, NULL),
(451, NULL, NULL, '', NULL, NULL),
(452, NULL, NULL, 'Ouhcr', NULL, NULL),
(453, NULL, NULL, '', NULL, NULL),
(454, NULL, NULL, '', NULL, NULL),
(455, NULL, NULL, 'ercuhl', NULL, NULL),
(456, NULL, NULL, 'lorcheu', NULL, NULL),
(457, NULL, NULL, 'cehucrh', NULL, NULL),
(458, NULL, NULL, '', NULL, NULL),
(459, NULL, NULL, 'reuhrc', NULL, NULL),
(460, NULL, NULL, '', NULL, NULL),
(461, NULL, NULL, 'Ouhcr', NULL, NULL),
(462, NULL, NULL, '', NULL, NULL),
(463, NULL, NULL, '', NULL, NULL),
(464, NULL, NULL, '', NULL, NULL),
(465, NULL, NULL, '', NULL, NULL),
(466, NULL, NULL, 'Test node', NULL, NULL),
(467, NULL, NULL, '', NULL, NULL),
(468, NULL, NULL, '', NULL, NULL),
(469, NULL, NULL, 'oueuououououououou', NULL, NULL),
(470, NULL, NULL, '', NULL, NULL),
(471, NULL, NULL, '', NULL, NULL),
(472, NULL, NULL, '', NULL, NULL),
(473, NULL, NULL, '', NULL, NULL),
(474, NULL, NULL, '', NULL, NULL),
(475, NULL, NULL, 'Test node', NULL, NULL),
(476, NULL, NULL, '', NULL, NULL),
(477, NULL, NULL, '', NULL, NULL),
(478, NULL, NULL, 'oueuououououououou', NULL, NULL),
(479, NULL, NULL, '', NULL, NULL),
(480, NULL, NULL, '', NULL, NULL),
(481, NULL, NULL, '', NULL, NULL),
(482, NULL, NULL, '', NULL, NULL),
(483, NULL, NULL, '', NULL, NULL),
(484, NULL, NULL, 'Test node', NULL, NULL),
(485, NULL, NULL, '', NULL, NULL),
(486, NULL, NULL, '', NULL, NULL),
(487, NULL, NULL, 'oueuououououououou', NULL, NULL),
(488, NULL, NULL, '', NULL, NULL),
(489, NULL, NULL, '', NULL, NULL),
(490, NULL, NULL, '', NULL, NULL),
(491, NULL, NULL, '', NULL, NULL),
(492, NULL, NULL, '', NULL, NULL),
(493, NULL, NULL, 'Test node', NULL, NULL),
(494, NULL, NULL, '', NULL, NULL),
(495, NULL, NULL, '', NULL, NULL),
(496, NULL, NULL, 'oueuououououououou', NULL, NULL),
(497, NULL, NULL, '', NULL, NULL),
(498, NULL, NULL, '', NULL, NULL),
(499, NULL, NULL, '', NULL, NULL),
(500, NULL, NULL, '', NULL, NULL),
(501, NULL, NULL, '', NULL, NULL),
(502, NULL, NULL, 'Test node', NULL, NULL),
(503, NULL, NULL, '', NULL, NULL),
(504, NULL, NULL, '', NULL, NULL),
(505, NULL, NULL, 'oueuououououououou', NULL, NULL),
(506, NULL, NULL, '', NULL, NULL),
(507, NULL, NULL, '', NULL, NULL),
(508, NULL, NULL, '', NULL, NULL),
(509, NULL, NULL, '', NULL, NULL),
(510, NULL, NULL, '', NULL, NULL),
(511, NULL, NULL, 'Test node', NULL, NULL),
(512, NULL, NULL, '', NULL, NULL),
(513, NULL, NULL, '', NULL, NULL),
(514, NULL, NULL, 'oueuououououououou', NULL, NULL),
(515, NULL, NULL, '', NULL, NULL),
(516, NULL, NULL, '', NULL, NULL),
(517, NULL, NULL, '', NULL, NULL),
(518, NULL, NULL, '', NULL, NULL),
(519, NULL, NULL, '', NULL, NULL),
(520, NULL, NULL, 'euoueueua', NULL, NULL),
(521, NULL, NULL, '', NULL, NULL),
(522, NULL, NULL, '', NULL, NULL),
(523, NULL, NULL, '', NULL, NULL),
(524, NULL, NULL, '', NULL, NULL),
(525, NULL, NULL, '', NULL, NULL),
(526, NULL, NULL, '', NULL, NULL),
(527, NULL, NULL, '', NULL, NULL),
(528, NULL, NULL, '', NULL, NULL),
(529, NULL, NULL, 'euoueueua', NULL, NULL),
(530, NULL, NULL, '', NULL, NULL),
(531, NULL, NULL, '', NULL, NULL),
(532, NULL, NULL, '', NULL, NULL),
(533, NULL, NULL, '', NULL, NULL),
(534, NULL, NULL, '', NULL, NULL),
(535, NULL, NULL, '', NULL, NULL),
(536, NULL, NULL, '', NULL, NULL),
(537, NULL, NULL, '', NULL, NULL),
(538, NULL, NULL, 'euoueueua', NULL, NULL),
(539, NULL, NULL, '', NULL, NULL),
(540, NULL, NULL, '', NULL, NULL),
(541, NULL, NULL, '', NULL, NULL),
(542, NULL, NULL, '', NULL, NULL),
(543, NULL, NULL, '', NULL, NULL),
(544, NULL, NULL, '', NULL, NULL),
(545, NULL, NULL, 'lcrehlru', NULL, NULL),
(546, NULL, NULL, 'rrlhulrcehl', NULL, NULL),
(547, NULL, NULL, 'aoeu98ouglh', NULL, NULL),
(548, NULL, NULL, 'luhcrhe', NULL, NULL),
(549, NULL, NULL, 'lreuhl', NULL, NULL),
(550, NULL, NULL, 'hlrehu', NULL, NULL),
(551, NULL, NULL, 'lhhlerhul', NULL, NULL),
(552, NULL, NULL, 'urcehul', NULL, NULL),
(553, NULL, NULL, 'eurch', NULL, NULL),
(554, NULL, NULL, 'rlh.', NULL, NULL),
(555, NULL, NULL, 'uchcruh', NULL, NULL),
(556, NULL, NULL, 'tqeuhsh', NULL, NULL),
(557, NULL, NULL, 'luchr', NULL, NULL),
(558, NULL, NULL, '', NULL, NULL),
(559, NULL, NULL, 'lchul', NULL, NULL),
(560, NULL, NULL, 'ch', NULL, NULL),
(561, NULL, NULL, 'uhl', NULL, NULL),
(562, NULL, NULL, 'cuhl', NULL, NULL),
(563, NULL, NULL, 'rlh.', NULL, NULL),
(564, NULL, NULL, 'uchcruh', NULL, NULL),
(565, NULL, NULL, 'tqeuhsh', NULL, NULL),
(566, NULL, NULL, 'luchr', NULL, NULL),
(567, NULL, NULL, '', NULL, NULL),
(568, NULL, NULL, 'lchul', NULL, NULL),
(569, NULL, NULL, 'ch', NULL, NULL),
(570, NULL, NULL, 'uhl', NULL, NULL),
(571, NULL, NULL, 'cuhl', NULL, NULL),
(572, NULL, NULL, 'rlh.', NULL, NULL),
(573, NULL, NULL, 'uchcruh', NULL, NULL),
(574, NULL, NULL, 'tqeuhsh', NULL, NULL),
(575, NULL, NULL, 'luchr', NULL, NULL),
(576, NULL, NULL, '', NULL, NULL),
(577, NULL, NULL, 'lchul', NULL, NULL),
(578, NULL, NULL, 'ch', NULL, NULL),
(579, NULL, NULL, 'uhl', NULL, NULL),
(580, NULL, NULL, 'cuhl', NULL, NULL),
(581, NULL, NULL, 'rlh.', NULL, NULL),
(582, NULL, NULL, 'uchcruh', NULL, NULL),
(583, NULL, NULL, 'tqeuhsh', NULL, NULL),
(584, NULL, NULL, 'luchr', NULL, NULL),
(585, NULL, NULL, '', NULL, NULL),
(586, NULL, NULL, 'lchul', NULL, NULL),
(587, NULL, NULL, 'ch', NULL, NULL),
(588, NULL, NULL, 'uhl', NULL, NULL),
(589, NULL, NULL, 'cuhl', NULL, NULL),
(590, NULL, NULL, 'rlh.', NULL, NULL),
(591, NULL, NULL, 'uchcruh', NULL, NULL),
(592, NULL, NULL, 'tqeuhsh', NULL, NULL),
(593, NULL, NULL, 'luchr', NULL, NULL),
(594, NULL, NULL, '', NULL, NULL),
(595, NULL, NULL, 'lchul', NULL, NULL),
(596, NULL, NULL, 'ch', NULL, NULL),
(597, NULL, NULL, 'uhl', NULL, NULL),
(598, NULL, NULL, 'cuhl', NULL, NULL),
(599, NULL, NULL, 'rlh.', NULL, NULL),
(600, NULL, NULL, 'uchcruh', NULL, NULL),
(601, NULL, NULL, 'tqeuhsh', NULL, NULL),
(602, NULL, NULL, 'luchr', NULL, NULL),
(603, NULL, NULL, '', NULL, NULL),
(604, NULL, NULL, 'lchul', NULL, NULL),
(605, NULL, NULL, 'ch', NULL, NULL),
(606, NULL, NULL, 'uhl', NULL, NULL),
(607, NULL, NULL, 'cuhl', NULL, NULL),
(608, NULL, NULL, 'rlh.', NULL, NULL),
(609, NULL, NULL, 'uchcruh', NULL, NULL),
(610, NULL, NULL, 'tqeuhsh', NULL, NULL),
(611, NULL, NULL, 'luchr', NULL, NULL),
(612, NULL, NULL, '', NULL, NULL),
(613, NULL, NULL, 'lchul', NULL, NULL),
(614, NULL, NULL, 'ch', NULL, NULL),
(615, NULL, NULL, 'uhl', NULL, NULL),
(616, NULL, NULL, 'cuhl', NULL, NULL),
(617, NULL, NULL, 'rlh.', NULL, NULL),
(618, NULL, NULL, 'uchcruh', NULL, NULL),
(619, NULL, NULL, 'tqeuhsh', NULL, NULL),
(620, NULL, NULL, 'luchr', NULL, NULL),
(621, NULL, NULL, '', NULL, NULL),
(622, NULL, NULL, 'lchul', NULL, NULL),
(623, NULL, NULL, 'ch', NULL, NULL),
(624, NULL, NULL, 'uhl', NULL, NULL),
(625, NULL, NULL, 'cuhl', NULL, NULL),
(626, NULL, NULL, 'shorttitel', NULL, NULL),
(627, NULL, NULL, 'shorttitle???wtf', NULL, NULL),
(628, NULL, NULL, 'title', NULL, NULL),
(629, NULL, NULL, 'src', NULL, NULL),
(630, NULL, NULL, 'disptitle', NULL, NULL),
(631, NULL, NULL, 'descritpion', NULL, NULL),
(632, NULL, NULL, 'disambig descr', NULL, NULL),
(633, NULL, NULL, 'comm', NULL, NULL),
(634, NULL, NULL, 'shrtdesc', NULL, NULL),
(635, NULL, NULL, 'shorttitel', NULL, NULL),
(636, NULL, NULL, 'shorttitle???wtf', NULL, NULL),
(637, NULL, NULL, 'title', NULL, NULL),
(638, NULL, NULL, 'src', NULL, NULL),
(639, NULL, NULL, 'disptitle', NULL, NULL),
(640, NULL, NULL, 'descritpion', NULL, NULL),
(641, NULL, NULL, 'disambig descr', NULL, NULL),
(642, NULL, NULL, 'comm', NULL, NULL),
(643, NULL, NULL, 'shrtdesc', NULL, NULL),
(644, NULL, NULL, '', NULL, NULL),
(645, NULL, NULL, '', NULL, NULL),
(646, NULL, NULL, 'Test @1@ node', NULL, NULL),
(647, NULL, NULL, '', NULL, NULL),
(648, NULL, NULL, '', NULL, NULL),
(649, NULL, NULL, 'This should work…', NULL, NULL),
(650, NULL, NULL, '', NULL, NULL),
(651, NULL, NULL, '', NULL, NULL),
(652, NULL, NULL, '', NULL, NULL),
(653, NULL, NULL, '', NULL, NULL),
(654, NULL, NULL, '', NULL, NULL),
(655, NULL, NULL, 'relatinship', NULL, NULL),
(656, NULL, NULL, '', NULL, NULL),
(657, NULL, NULL, '', NULL, NULL),
(658, NULL, NULL, '', NULL, NULL),
(659, NULL, NULL, '', NULL, NULL),
(660, NULL, NULL, '', NULL, NULL),
(661, NULL, NULL, '', NULL, NULL),
(662, NULL, NULL, '', NULL, NULL),
(663, NULL, NULL, '', NULL, NULL),
(664, NULL, NULL, 'ecu', NULL, NULL),
(665, NULL, NULL, '', NULL, NULL),
(666, NULL, NULL, 'rcehu', NULL, NULL),
(667, NULL, NULL, '', NULL, NULL),
(668, NULL, NULL, '', NULL, NULL),
(669, NULL, NULL, '', NULL, NULL),
(670, NULL, NULL, '', NULL, NULL),
(671, NULL, NULL, '', NULL, NULL),
(672, NULL, NULL, '', NULL, NULL),
(673, NULL, NULL, 'ecu', NULL, NULL),
(674, NULL, NULL, '', NULL, NULL),
(675, NULL, NULL, 'rcehu', NULL, NULL),
(676, NULL, NULL, '', NULL, NULL),
(677, NULL, NULL, '', NULL, NULL),
(678, NULL, NULL, '', NULL, NULL),
(679, NULL, NULL, '', NULL, NULL),
(680, NULL, NULL, '', NULL, NULL),
(681, NULL, NULL, '', NULL, NULL),
(682, NULL, NULL, 'This', NULL, NULL),
(683, NULL, NULL, '', NULL, NULL),
(684, NULL, NULL, '', NULL, NULL),
(685, NULL, NULL, 'This is the description...\r\n\r\n', NULL, NULL),
(686, NULL, NULL, '', NULL, NULL),
(687, NULL, NULL, '', NULL, NULL),
(688, NULL, NULL, '', NULL, NULL),
(689, NULL, NULL, 'Logged out. ', NULL, NULL),
(690, NULL, NULL, 'Logged out. ', NULL, NULL),
(691, NULL, NULL, 'Log out… ', NULL, NULL),
(692, NULL, NULL, 'Log out…', NULL, NULL),
(693, NULL, NULL, 'Log out…', NULL, NULL),
(694, NULL, NULL, '<a href=\"r.php?c=w&a=1\">Log out…</a>', NULL, NULL),
(695, NULL, NULL, '<a href=\"r.php?c=w&a=1\">Log out…</a>', NULL, NULL),
(696, NULL, NULL, '<a href=\"r.php?c=w&a=1\">Return home…</a>', NULL, NULL),
(697, NULL, NULL, 'test node', NULL, NULL),
(698, NULL, NULL, 'test node', NULL, NULL),
(699, NULL, NULL, 'Test node', NULL, NULL),
(700, NULL, NULL, '', NULL, NULL),
(701, NULL, NULL, 'test node', NULL, NULL),
(702, NULL, NULL, 'Gaak.', NULL, NULL),
(703, NULL, NULL, '', NULL, NULL),
(704, NULL, NULL, '', NULL, NULL),
(705, NULL, NULL, '', NULL, NULL),
(706, NULL, NULL, 'test node', NULL, NULL),
(707, NULL, NULL, 'test node', NULL, NULL),
(708, NULL, NULL, 'Test node', NULL, NULL),
(709, NULL, NULL, '', NULL, NULL),
(710, NULL, NULL, 'test node', NULL, NULL),
(711, NULL, NULL, 'Gaak.', NULL, NULL),
(712, NULL, NULL, '', NULL, NULL),
(713, NULL, NULL, '', NULL, NULL),
(714, NULL, NULL, '', NULL, NULL),
(715, NULL, NULL, 'test node', NULL, NULL),
(716, NULL, NULL, 'test node', NULL, NULL),
(717, NULL, NULL, 'Test node', NULL, NULL),
(718, NULL, NULL, '', NULL, NULL),
(719, NULL, NULL, 'test node', NULL, NULL),
(720, NULL, NULL, 'Gaak.', NULL, NULL),
(721, NULL, NULL, '', NULL, NULL),
(722, NULL, NULL, '', NULL, NULL),
(723, NULL, NULL, '', NULL, NULL),
(724, NULL, NULL, 'test node', NULL, NULL),
(725, NULL, NULL, 'test node', NULL, NULL),
(726, NULL, NULL, 'Test node', NULL, NULL),
(727, NULL, NULL, '', NULL, NULL),
(728, NULL, NULL, 'test node', NULL, NULL),
(729, NULL, NULL, 'Gaak.', NULL, NULL),
(730, NULL, NULL, '', NULL, NULL),
(731, NULL, NULL, '', NULL, NULL),
(732, NULL, NULL, '', NULL, NULL),
(733, NULL, NULL, '', NULL, NULL),
(734, NULL, NULL, '', NULL, NULL),
(735, NULL, NULL, '.eurc', NULL, NULL),
(736, NULL, NULL, '', NULL, NULL),
(737, NULL, NULL, '', NULL, NULL),
(738, NULL, NULL, '', NULL, NULL),
(739, NULL, NULL, '', NULL, NULL),
(740, NULL, NULL, '', NULL, NULL),
(741, NULL, NULL, '', NULL, NULL),
(742, NULL, NULL, '', NULL, NULL),
(743, NULL, NULL, '', NULL, NULL),
(744, NULL, NULL, '', NULL, NULL),
(745, NULL, NULL, '', NULL, NULL),
(746, NULL, NULL, '#!', NULL, NULL),
(747, NULL, NULL, '', NULL, NULL),
(748, NULL, NULL, '', NULL, NULL),
(749, NULL, NULL, '', NULL, NULL),
(750, NULL, NULL, '', NULL, NULL),
(751, NULL, NULL, '', NULL, NULL),
(752, NULL, NULL, '', NULL, NULL),
(753, NULL, NULL, 'test', NULL, NULL),
(754, NULL, NULL, '', NULL, NULL),
(755, NULL, NULL, '', NULL, NULL),
(756, NULL, NULL, '', NULL, NULL),
(757, NULL, NULL, '', NULL, NULL),
(758, NULL, NULL, '', NULL, NULL),
(759, NULL, NULL, '', NULL, NULL),
(760, NULL, NULL, '', NULL, NULL),
(761, NULL, NULL, '', NULL, NULL),
(762, NULL, NULL, '', NULL, NULL),
(763, NULL, NULL, '', NULL, NULL),
(764, NULL, NULL, '', NULL, NULL),
(765, NULL, NULL, '', NULL, NULL),
(766, NULL, NULL, '', NULL, NULL),
(767, NULL, NULL, '', NULL, NULL),
(768, NULL, NULL, '', NULL, NULL),
(769, NULL, NULL, '<small> (', NULL, NULL),
(770, NULL, NULL, ')</small>', NULL, NULL),
(771, NULL, NULL, ')</small>', NULL, NULL),
(772, NULL, NULL, '<small>', NULL, NULL),
(773, NULL, NULL, '</small>', NULL, NULL),
(774, NULL, NULL, '</small>', NULL, NULL),
(775, NULL, NULL, ' to try again.', NULL, NULL),
(776, NULL, NULL, 'Return to node ', NULL, NULL),
(777, NULL, NULL, '…', NULL, NULL),
(778, NULL, NULL, '<br><hr>', NULL, NULL),
(779, NULL, NULL, 'New relationship for node @REPLACEMEWITHDANODEID@:<br><form action=\"r.php\" method=\"post\" enctype=\"multipart/form-data\"><input type=\"hidden\" name=\"c\" value=\"w\"><input type=\"hidden\" name=\"nodeId\" value=\"@REPLACEMEWITHDANODEID@\"><br>Target node: <input type=\"text\" name=\"targetNode\"> <small><a href=\"https://futuramerlincom.fatcow.com/r.php?c=w&a=19&locale=\" target=\"_blank\">(Index…)</a></small><br> Relationship type: <input type=\"text\" name=\"relationshipType\"><input type=\"hidden\" name=\"a\" value=\"18\">', NULL, NULL),
(780, NULL, NULL, '<br>', NULL, NULL),
(781, NULL, NULL, 'Add relationship to node @REPLACEMEWITHDANODEID@…', NULL, NULL),
(782, NULL, NULL, 'Added relationship. Return to node ', NULL, NULL),
(783, NULL, NULL, '…', NULL, NULL),
(784, NULL, NULL, ' | ', NULL, NULL),
(785, NULL, NULL, '<a href=\"', NULL, NULL),
(786, NULL, NULL, '<h2>Relationships</h2>', NULL, NULL),
(787, NULL, NULL, 'labor movement', NULL, NULL),
(788, NULL, NULL, 'labor movement', NULL, NULL),
(789, NULL, NULL, 'Labor movement', NULL, NULL),
(790, NULL, NULL, '', NULL, NULL),
(791, NULL, NULL, 'Labor movement', NULL, NULL),
(792, NULL, NULL, 'The labor movement was the efforts of … to do … and get better wages.', NULL, NULL),
(793, NULL, NULL, '', NULL, NULL),
(794, NULL, NULL, '', NULL, NULL),
(795, NULL, NULL, '', NULL, NULL),
(796, NULL, NULL, 'labor movement', NULL, NULL),
(797, NULL, NULL, 'labor movement', NULL, NULL),
(798, NULL, NULL, 'Labor movement', NULL, NULL),
(799, NULL, NULL, '', NULL, NULL),
(800, NULL, NULL, 'Labor movement', NULL, NULL),
(801, NULL, NULL, 'The labor movement was the efforts of … to do … and get better wages.', NULL, NULL),
(802, NULL, NULL, '', NULL, NULL),
(803, NULL, NULL, '', NULL, NULL),
(804, NULL, NULL, '', NULL, NULL),
(805, NULL, NULL, '', NULL, NULL),
(806, NULL, NULL, '', NULL, NULL),
(807, NULL, NULL, 'Labor movement', NULL, NULL),
(808, NULL, NULL, '', NULL, NULL),
(809, NULL, NULL, '', NULL, NULL),
(810, NULL, NULL, '', NULL, NULL),
(811, NULL, NULL, 'the movement not the band', NULL, NULL),
(812, NULL, NULL, '', NULL, NULL),
(813, NULL, NULL, '', NULL, NULL),
(814, NULL, NULL, 'rcehurlc', NULL, NULL),
(815, NULL, NULL, 'urcehl', NULL, NULL),
(816, NULL, NULL, 'sitnherilh', NULL, NULL),
(817, NULL, NULL, '', NULL, NULL),
(818, NULL, NULL, 'arc', NULL, NULL),
(819, NULL, NULL, 'This is an example!', NULL, NULL),
(820, NULL, NULL, 'erlh', NULL, NULL),
(821, NULL, NULL, '', NULL, NULL),
(822, NULL, NULL, '', NULL, NULL),
(823, NULL, NULL, '', NULL, NULL),
(824, NULL, NULL, '', NULL, NULL),
(825, NULL, NULL, 'henhd', NULL, NULL),
(826, NULL, NULL, '', NULL, NULL),
(827, NULL, NULL, 'rcuhrc', NULL, NULL),
(828, NULL, NULL, '', NULL, NULL),
(829, NULL, NULL, '', NULL, NULL),
(830, NULL, NULL, '', NULL, NULL),
(831, NULL, NULL, '', NULL, NULL),
(832, NULL, NULL, '', NULL, NULL),
(833, NULL, NULL, '', NULL, NULL),
(834, NULL, NULL, '', NULL, NULL),
(835, NULL, NULL, '', NULL, NULL),
(836, NULL, NULL, '', NULL, NULL),
(837, NULL, NULL, '', NULL, NULL),
(838, NULL, NULL, '', NULL, NULL),
(839, NULL, NULL, '', NULL, NULL),
(840, NULL, NULL, '', NULL, NULL),
(841, NULL, NULL, '', NULL, NULL),
(842, NULL, NULL, '', NULL, NULL),
(843, NULL, NULL, '', NULL, NULL),
(844, NULL, NULL, '', NULL, NULL),
(845, NULL, NULL, '', NULL, NULL),
(846, NULL, NULL, '', NULL, NULL),
(847, NULL, NULL, '', NULL, NULL),
(848, NULL, NULL, '', NULL, NULL),
(849, NULL, NULL, '', NULL, NULL),
(850, NULL, NULL, 'Node index: ', NULL, NULL),
(851, NULL, NULL, '–', NULL, NULL),
(852, NULL, NULL, '?Previous page', NULL, NULL),
(853, NULL, NULL, 'Next page?', NULL, NULL),
(854, NULL, NULL, ' | ', NULL, NULL),
(855, NULL, NULL, '<hr>', NULL, NULL),
(856, NULL, NULL, '. ', NULL, NULL),
(857, NULL, NULL, '<strong>', NULL, NULL),
(858, NULL, NULL, '</strong>', NULL, NULL),
(859, NULL, NULL, '</strong>: ', NULL, NULL),
(860, NULL, NULL, '', NULL, NULL),
(861, NULL, NULL, '', NULL, NULL),
(862, NULL, NULL, 'Example', NULL, NULL),
(863, NULL, NULL, '', NULL, NULL),
(864, NULL, NULL, 'Example node', NULL, NULL),
(865, NULL, NULL, 'This is an example node', NULL, NULL),
(866, NULL, NULL, '', NULL, NULL),
(867, NULL, NULL, '', NULL, NULL),
(868, NULL, NULL, '', NULL, NULL),
(869, NULL, NULL, '', NULL, NULL),
(870, NULL, NULL, '', NULL, NULL),
(871, NULL, NULL, '', NULL, NULL),
(872, NULL, NULL, '', NULL, NULL),
(873, NULL, NULL, '', NULL, NULL),
(874, NULL, NULL, 'a', NULL, NULL),
(875, NULL, NULL, '', NULL, NULL),
(876, NULL, NULL, '', NULL, NULL),
(877, NULL, NULL, '', NULL, NULL),
(878, NULL, NULL, '<h3>Basic actions</h3><ul><li>', NULL, NULL),
(879, NULL, NULL, 'Node index', NULL, NULL),
(880, NULL, NULL, '', NULL, NULL),
(881, NULL, NULL, '', NULL, NULL),
(882, NULL, NULL, 'example node', NULL, NULL),
(883, NULL, NULL, '', NULL, NULL),
(884, NULL, NULL, '', NULL, NULL),
(885, NULL, NULL, 'This is an example node', NULL, NULL),
(886, NULL, NULL, 'from 9 March 2012', NULL, NULL),
(887, NULL, NULL, '', NULL, NULL),
(888, NULL, NULL, '', NULL, NULL),
(889, NULL, NULL, 'Added relationship. ', NULL, NULL),
(890, NULL, NULL, 'Return to node ', NULL, NULL),
(891, NULL, NULL, '<br><br>', NULL, NULL),
(892, NULL, NULL, '', NULL, NULL),
(893, NULL, NULL, '', NULL, NULL),
(894, NULL, NULL, 'Coffee bean', NULL, NULL),
(895, NULL, NULL, '', NULL, NULL),
(896, NULL, NULL, '', NULL, NULL),
(897, NULL, NULL, 'La minita, specifically', NULL, NULL),
(898, NULL, NULL, 'this is a bean not a rock band', NULL, NULL),
(899, NULL, NULL, '', NULL, NULL),
(900, NULL, NULL, '', NULL, NULL),
(901, NULL, NULL, '', NULL, NULL),
(902, NULL, NULL, '', NULL, NULL),
(903, NULL, NULL, 'Coffee bean — Arabica', NULL, NULL),
(904, NULL, NULL, '', NULL, NULL),
(905, NULL, NULL, '', NULL, NULL),
(906, NULL, NULL, 'Arabica coffee bean is this…', NULL, NULL),
(907, NULL, NULL, 'I am not La Minita.', NULL, NULL),
(908, NULL, NULL, '', NULL, NULL),
(909, NULL, NULL, '', NULL, NULL),
(910, NULL, NULL, '</li>', NULL, NULL),
(911, NULL, NULL, '<li>', NULL, NULL),
(912, NULL, NULL, '</li></ul>', NULL, NULL),
(913, NULL, NULL, 'New character', NULL, NULL),
(914, NULL, NULL, '<form action=\"r.php\" method=\"post\" enctype=\"multipart/form-data\"><input type=\"hidden\" name=\"c\" value=\"w\"><br>Name: <input type=\"text\" name=\"characterName\"><br>Category: <input type=\"text\" name=\"characterCategory\"><br>HTML equivalent: <input type=\"text\" name=\"characterHTML\"><br>Decomposition: <input type=\"text\" name=\"characterDecomposition\"><br>Other name list (CSV): <input type=\"text\" name=\"characterAka\"><br>See also: <input type=\"text\" name=\"characterSeeAlso\"><br>Comments: <input type=\"text\" name=\"characterComments\"><br>Mojikyo equivalent: <input type=\"text\" name=\"characterMojikyo\"><br>TRON equivalent: <input type=\"text\" name=\"characterTron\"><br>ArmSCII-8 equivalent: <input type=\"text\" name=\"characterArmscii\"><br><input type=\"hidden\" name=\"a\" value=\"21\">', NULL, NULL),
(915, NULL, NULL, 'New character added: @', NULL, NULL),
(916, NULL, NULL, '@', NULL, NULL),
(917, NULL, NULL, 'Added character', NULL, NULL),
(918, NULL, NULL, '', NULL, NULL),
(919, NULL, NULL, '', NULL, NULL),
(920, NULL, NULL, '', NULL, NULL),
(921, NULL, NULL, '', NULL, NULL),
(922, NULL, NULL, '', NULL, NULL),
(923, NULL, NULL, 'test @1@', NULL, NULL),
(924, NULL, NULL, '', NULL, NULL),
(925, NULL, NULL, '', NULL, NULL),
(926, NULL, NULL, '', NULL, NULL),
(927, NULL, NULL, 'New script', NULL, NULL),
(928, NULL, NULL, 'New character category', NULL, NULL),
(929, NULL, NULL, 'Yes', NULL, NULL),
(930, NULL, NULL, 'Yes, this: ', NULL, NULL),
(931, NULL, NULL, ' of type ', NULL, NULL),
(932, NULL, NULL, 'New node: ', NULL, NULL),
(933, NULL, NULL, 'Edit node: ', NULL, NULL),
(934, NULL, NULL, 'New node:', NULL, NULL),
(935, NULL, NULL, 'Edit node ', NULL, NULL),
(936, NULL, NULL, '…', NULL, NULL),
(937, NULL, NULL, '', NULL, NULL),
(938, NULL, NULL, '', NULL, NULL),
(939, NULL, NULL, 'Test Node Title', NULL, NULL),
(940, NULL, NULL, 'Gotten from ACME Test Node Company.', NULL, NULL),
(941, NULL, NULL, '', NULL, NULL),
(942, NULL, NULL, 'This is a test node description.', NULL, NULL),
(943, NULL, NULL, 'a node used for test purposes', NULL, NULL),
(944, NULL, NULL, 'This test node has a comment.', NULL, NULL),
(945, NULL, NULL, 'This is a test node short description.', NULL, NULL),
(946, NULL, NULL, '', NULL, NULL),
(947, NULL, NULL, '', NULL, NULL),
(948, NULL, NULL, 'Test Node Title', NULL, NULL),
(949, NULL, NULL, 'Gotten from ACME Test Node Company.', NULL, NULL),
(950, NULL, NULL, '', NULL, NULL),
(951, NULL, NULL, 'This is a test node description.', NULL, NULL),
(952, NULL, NULL, 'a node used for test purposes', NULL, NULL),
(953, NULL, NULL, 'This test node has a comment.', NULL, NULL),
(954, NULL, NULL, 'This is a test node short description.', NULL, NULL),
(955, NULL, NULL, 'Updated node ', NULL, NULL),
(956, NULL, NULL, 'eueu', NULL, NULL),
(957, NULL, NULL, '', NULL, NULL),
(958, NULL, NULL, '', NULL, NULL),
(959, NULL, NULL, '', NULL, NULL),
(960, NULL, NULL, '', NULL, NULL),
(961, NULL, NULL, '', NULL, NULL),
(962, NULL, NULL, '', NULL, NULL),
(963, NULL, NULL, '', NULL, NULL),
(964, NULL, NULL, '', NULL, NULL),
(965, NULL, NULL, 'eueu', NULL, NULL),
(966, NULL, NULL, '', NULL, NULL),
(967, NULL, NULL, '', NULL, NULL),
(968, NULL, NULL, '', NULL, NULL),
(969, NULL, NULL, '', NULL, NULL),
(970, NULL, NULL, '', NULL, NULL),
(971, NULL, NULL, '', NULL, NULL),
(972, NULL, NULL, '', NULL, NULL),
(973, NULL, NULL, '', NULL, NULL),
(974, NULL, NULL, '', NULL, NULL),
(975, NULL, NULL, '', NULL, NULL),
(976, NULL, NULL, 'eueoueuou', NULL, NULL),
(977, NULL, NULL, '', NULL, NULL),
(978, NULL, NULL, '', NULL, NULL),
(979, NULL, NULL, '', NULL, NULL),
(980, NULL, NULL, '', NULL, NULL),
(981, NULL, NULL, '', NULL, NULL),
(982, NULL, NULL, '', NULL, NULL),
(983, NULL, NULL, '', NULL, NULL),
(984, NULL, NULL, '', NULL, NULL),
(985, NULL, NULL, 'eueoueuoua', NULL, NULL),
(986, NULL, NULL, '', NULL, NULL),
(987, NULL, NULL, '', NULL, NULL),
(988, NULL, NULL, '', NULL, NULL),
(989, NULL, NULL, '', NULL, NULL),
(990, NULL, NULL, '', NULL, NULL),
(991, NULL, NULL, '', NULL, NULL),
(992, NULL, NULL, '', NULL, NULL),
(993, NULL, NULL, '', NULL, NULL),
(994, NULL, NULL, '', NULL, NULL),
(995, NULL, NULL, '', NULL, NULL),
(996, NULL, NULL, 'bou', NULL, NULL),
(997, NULL, NULL, '', NULL, NULL),
(998, NULL, NULL, '', NULL, NULL),
(999, NULL, NULL, '', NULL, NULL),
(1000, NULL, NULL, '', NULL, NULL),
(1001, NULL, NULL, '', NULL, NULL),
(1002, NULL, NULL, '', NULL, NULL),
(1003, NULL, NULL, '', NULL, NULL),
(1004, NULL, NULL, '', NULL, NULL),
(1005, NULL, NULL, '', NULL, NULL),
(1006, NULL, NULL, 'test node ehucred', NULL, NULL),
(1007, NULL, NULL, 'erchu', NULL, NULL),
(1008, NULL, NULL, 'fuck yeah', NULL, NULL),
(1009, NULL, NULL, '', NULL, NULL),
(1010, NULL, NULL, '', NULL, NULL),
(1011, NULL, NULL, '', NULL, NULL),
(1012, NULL, NULL, '', NULL, NULL),
(1013, NULL, NULL, '', NULL, NULL),
(1014, NULL, NULL, '', NULL, NULL),
(1015, NULL, NULL, 'test node ehucred', NULL, NULL),
(1016, NULL, NULL, 'erchu', NULL, NULL),
(1017, NULL, NULL, 'fuck yeah', NULL, NULL),
(1018, NULL, NULL, '', NULL, NULL),
(1019, NULL, NULL, '', NULL, NULL),
(1020, NULL, NULL, '', NULL, NULL),
(1021, NULL, NULL, '', NULL, NULL),
(1022, NULL, NULL, '', NULL, NULL),
(1023, NULL, NULL, '', NULL, NULL),
(1024, NULL, NULL, 'test node aaauu', NULL, NULL),
(1025, NULL, NULL, 'erchu', NULL, NULL),
(1026, NULL, NULL, 'fuck yeah', NULL, NULL),
(1027, NULL, NULL, '', NULL, NULL),
(1028, NULL, NULL, '', NULL, NULL),
(1029, NULL, NULL, '', NULL, NULL),
(1030, NULL, NULL, 'mhhv', NULL, NULL),
(1031, NULL, NULL, '', NULL, NULL),
(1032, NULL, NULL, '', NULL, NULL),
(1033, NULL, NULL, 'hlsvlvsa', NULL, NULL),
(1034, NULL, NULL, '', NULL, NULL),
(1035, NULL, NULL, '', NULL, NULL),
(1036, NULL, NULL, '', NULL, NULL),
(1037, NULL, NULL, '', NULL, NULL),
(1038, NULL, NULL, '', NULL, NULL),
(1039, NULL, NULL, 'mhhv', NULL, NULL),
(1040, NULL, NULL, '', NULL, NULL),
(1041, NULL, NULL, '', NULL, NULL),
(1042, NULL, NULL, 'hlsvlvsaa', NULL, NULL),
(1043, NULL, NULL, '', NULL, NULL),
(1044, NULL, NULL, '', NULL, NULL),
(1045, NULL, NULL, '', NULL, NULL),
(1046, NULL, NULL, '', NULL, NULL),
(1047, NULL, NULL, '', NULL, NULL),
(1048, NULL, NULL, 'mhhv', NULL, NULL),
(1049, NULL, NULL, '', NULL, NULL),
(1050, NULL, NULL, '', NULL, NULL),
(1051, NULL, NULL, 'hlsvlvsaa', NULL, NULL),
(1052, NULL, NULL, '', NULL, NULL),
(1053, NULL, NULL, '', NULL, NULL),
(1054, NULL, NULL, '', NULL, NULL),
(1055, NULL, NULL, '', NULL, NULL),
(1056, NULL, NULL, '', NULL, NULL),
(1057, NULL, NULL, 'mhhv', NULL, NULL),
(1058, NULL, NULL, '', NULL, NULL),
(1059, NULL, NULL, '', NULL, NULL),
(1060, NULL, NULL, 'hlsvlvsaa', NULL, NULL),
(1061, NULL, NULL, '', NULL, NULL),
(1062, NULL, NULL, '', NULL, NULL),
(1063, NULL, NULL, '', NULL, NULL),
(1064, NULL, NULL, '', NULL, NULL),
(1065, NULL, NULL, '', NULL, NULL),
(1066, NULL, NULL, 'mhhv', NULL, NULL),
(1067, NULL, NULL, '', NULL, NULL),
(1068, NULL, NULL, '', NULL, NULL),
(1069, NULL, NULL, 'hlsvlvsaa', NULL, NULL),
(1070, NULL, NULL, 'this one', NULL, NULL),
(1071, NULL, NULL, '', NULL, NULL),
(1072, NULL, NULL, '', NULL, NULL),
(1073, NULL, NULL, '', NULL, NULL),
(1074, NULL, NULL, '', NULL, NULL),
(1075, NULL, NULL, '', NULL, NULL),
(1076, NULL, NULL, '', NULL, NULL),
(1077, NULL, NULL, '', NULL, NULL),
(1078, NULL, NULL, 'bla bla', NULL, NULL),
(1079, NULL, NULL, '', NULL, NULL),
(1080, NULL, NULL, '', NULL, NULL),
(1081, NULL, NULL, '', NULL, NULL),
(1082, NULL, NULL, '\"><input type=\"hidden\" name=\"login\" value=\"1\"><input type=\"hidden\" name=\"locale\" value=\"\"><input type=\"submit\" class=\"t\" value=\"', NULL, NULL),
(1083, NULL, NULL, '\"><input type=\"hidden\" name=\"login\" value=\"1\"><input type=\"hidden\" name=\"locale\" value=\"\"><button type=\"submit\" class=\"t\">', NULL, NULL),
(1084, NULL, NULL, '</button></form>', NULL, NULL),
(1085, NULL, NULL, 'Arabica coffee', NULL, NULL),
(1086, NULL, NULL, 'Arabica', NULL, NULL),
(1087, NULL, NULL, 'Arabica coffee', NULL, NULL),
(1088, NULL, NULL, 'Multiple authors. \"Coffea arabica\", Wikipedia (en). 30 March 2012.', NULL, NULL),
(1089, NULL, NULL, 'Arabica coffee', NULL, NULL),
(1090, NULL, NULL, 'Arabica coffee is from the mountains of Yemen.', NULL, NULL),
(1091, NULL, NULL, 'not La Minita', NULL, NULL),
(1092, NULL, NULL, '', NULL, NULL),
(1093, NULL, NULL, 'Arabica coffee is from Yemen.', NULL, NULL),
(1094, NULL, NULL, 'La Minita', NULL, NULL),
(1095, NULL, NULL, 'La Minita', NULL, NULL),
(1096, NULL, NULL, 'La Minita', NULL, NULL),
(1097, NULL, NULL, 'Cultivar Coffee. \"Costa Rica La Minita Estate\", as of 30 March 2012.', NULL, NULL),
(1098, NULL, NULL, 'La Minita', NULL, NULL),
(1099, NULL, NULL, 'La Minita coffee is from Hacienda La Minita, Costa Rica.', NULL, NULL),
(1100, NULL, NULL, 'not Arabica', NULL, NULL),
(1101, NULL, NULL, '', NULL, NULL),
(1102, NULL, NULL, '', NULL, NULL),
(1103, NULL, NULL, 'Log in…', NULL, NULL),
(1104, NULL, NULL, 'Log in…', NULL, NULL),
(1105, NULL, NULL, 'Log in…', NULL, NULL),
(1106, NULL, NULL, 'Log in…', NULL, NULL),
(1107, NULL, NULL, 'Log in…', NULL, NULL),
(1108, NULL, NULL, 'Log in…', NULL, NULL),
(1109, NULL, NULL, 'Log in…', NULL, NULL),
(1110, NULL, NULL, 'Home', NULL, NULL),
(1111, NULL, NULL, 'You should not see this', NULL, NULL),
(1112, NULL, NULL, 'Log in…', NULL, NULL),
(1113, NULL, NULL, 'New user…', NULL, NULL),
(1114, NULL, NULL, 'New node…', NULL, NULL),
(1115, NULL, NULL, 'Node', NULL, NULL),
(1116, NULL, NULL, 'New node…', NULL, NULL),
(1117, NULL, NULL, 'New node…', NULL, NULL),
(1118, NULL, NULL, 'New interface…', NULL, NULL),
(1119, NULL, NULL, 'Operation index', NULL, NULL),
(1120, NULL, NULL, 'Log in…', NULL, NULL),
(1121, NULL, NULL, 'aaaaa', NULL, NULL),
(1122, NULL, NULL, 'New user…', NULL, NULL),
(1123, NULL, NULL, 'Log out…', NULL, NULL),
(1124, NULL, NULL, 'Edit node…', NULL, NULL),
(1125, NULL, NULL, 'New relationship…', NULL, NULL),
(1126, NULL, NULL, 'Node index', NULL, NULL),
(1127, NULL, NULL, 'New character…', NULL, NULL),
(1128, NULL, NULL, 'New script…', NULL, NULL),
(1129, NULL, NULL, 'New character category…', NULL, NULL),
(1130, NULL, NULL, 'New character category…', NULL, NULL),
(1131, NULL, NULL, 'Edit node…', NULL, NULL),
(1132, NULL, NULL, 'New relationship…', NULL, NULL),
(1133, NULL, NULL, 'Edit node…', NULL, NULL),
(1134, NULL, NULL, ' ', NULL, NULL),
(1135, NULL, NULL, '?', NULL, NULL),
(1136, NULL, NULL, ' ? ', NULL, NULL),
(1137, NULL, NULL, 'Weave', NULL, NULL),
(1138, NULL, NULL, 'Weave', NULL, NULL),
(1139, NULL, NULL, '<br><small>', NULL, NULL),
(1140, NULL, NULL, '', NULL, NULL),
(1141, NULL, NULL, '', NULL, NULL),
(1142, NULL, NULL, '', NULL, NULL),
(1143, NULL, NULL, 'ak', NULL, NULL),
(1144, NULL, NULL, 'eruch', NULL, NULL),
(1145, NULL, NULL, '', NULL, NULL),
(1146, NULL, NULL, 'test node', NULL, NULL),
(1147, NULL, NULL, 'erchu', NULL, NULL),
(1148, NULL, NULL, 'erchu', NULL, NULL),
(1149, NULL, NULL, 'ercuh', NULL, NULL),
(1150, NULL, NULL, '. ', NULL, NULL),
(1151, NULL, NULL, 'Edit relationship…', NULL, NULL),
(1152, NULL, NULL, ' <small>', NULL, NULL),
(1153, NULL, NULL, '', NULL, NULL),
(1154, NULL, NULL, '</small>', NULL, NULL),
(1155, NULL, NULL, ' | ', NULL, NULL),
(1156, NULL, NULL, '', NULL, NULL),
(1157, NULL, NULL, '&#128393;', NULL, NULL),
(1158, NULL, NULL, ' ', NULL, NULL),
(1159, NULL, NULL, '', NULL, NULL),
(1160, NULL, NULL, '', NULL, NULL),
(1161, NULL, NULL, 'Mios', NULL, NULL),
(1162, NULL, NULL, '', NULL, NULL),
(1163, NULL, NULL, '', NULL, NULL),
(1164, NULL, NULL, '<!-- itf65 -->', NULL, NULL),
(1165, NULL, NULL, '', NULL, NULL),
(1166, NULL, NULL, '', NULL, NULL),
(1167, NULL, NULL, '', NULL, NULL),
(1168, NULL, NULL, '', NULL, NULL),
(1169, NULL, NULL, '', NULL, NULL),
(1170, NULL, NULL, '', NULL, NULL),
(1171, NULL, NULL, '', NULL, NULL),
(1172, NULL, NULL, '', NULL, NULL),
(1173, NULL, NULL, '', NULL, NULL),
(1174, NULL, NULL, '', NULL, NULL),
(1175, NULL, NULL, '', NULL, NULL),
(1176, NULL, NULL, '', NULL, NULL),
(1177, NULL, NULL, '', NULL, NULL),
(1178, NULL, NULL, '', NULL, NULL),
(1179, NULL, NULL, 'oun', NULL, NULL),
(1180, NULL, NULL, '', NULL, NULL),
(1181, NULL, NULL, '', NULL, NULL),
(1182, NULL, NULL, '', NULL, NULL),
(1183, NULL, NULL, '', NULL, NULL),
(1184, NULL, NULL, '', NULL, NULL),
(1185, NULL, NULL, '', NULL, NULL),
(1186, NULL, NULL, '', NULL, NULL),
(1187, NULL, NULL, '', NULL, NULL),
(1188, NULL, NULL, 'ak', NULL, NULL),
(1189, NULL, NULL, 'eruch', NULL, NULL),
(1190, NULL, NULL, '', NULL, NULL),
(1191, NULL, NULL, 'test node', NULL, NULL),
(1192, NULL, NULL, 'erchu stamna', NULL, NULL),
(1193, NULL, NULL, 'erchu', NULL, NULL),
(1194, NULL, NULL, 'ercuh', NULL, NULL),
(1195, NULL, NULL, '', NULL, NULL),
(1196, NULL, NULL, '', NULL, NULL),
(1197, NULL, NULL, 'ak', NULL, NULL);
INSERT INTO `interface` (`interface_id`, `interface_name`, `interface_description`, `interface_content`, `interface_comment`, `interface_contentFRA`) VALUES
(1198, NULL, NULL, 'eruch', NULL, NULL),
(1199, NULL, NULL, '', NULL, NULL),
(1200, NULL, NULL, 'test node', NULL, NULL),
(1201, NULL, NULL, 'erchu', NULL, NULL),
(1202, NULL, NULL, 'erchu', NULL, NULL),
(1203, NULL, NULL, 'ercuh', NULL, NULL),
(1204, NULL, NULL, '', NULL, NULL),
(1205, NULL, NULL, '', NULL, NULL),
(1206, NULL, NULL, '', NULL, NULL),
(1207, NULL, NULL, 'eruch', NULL, NULL),
(1208, NULL, NULL, '', NULL, NULL),
(1209, NULL, NULL, 'test node', NULL, NULL),
(1210, NULL, NULL, 'erchu', NULL, NULL),
(1211, NULL, NULL, 'erchu', NULL, NULL),
(1212, NULL, NULL, 'ercuh', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `locale`
--

CREATE TABLE `locale` (
  `locale_id` int(10) UNSIGNED NOT NULL COMMENT 'locale id',
  `locale_suffix` text COLLATE utf8_unicode_ci COMMENT 'locale suffix for identification',
  `locale_name` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'name',
  `locale_description` text COLLATE utf8_unicode_ci COMMENT 'description',
  `locale_comment` text COLLATE utf8_unicode_ci COMMENT 'comment',
  `locale_iso_code` text COLLATE utf8_unicode_ci COMMENT 'iso 639-6 id'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `locale`
--

INSERT INTO `locale` (`locale_id`, `locale_suffix`, `locale_name`, `locale_description`, `locale_comment`, `locale_iso_code`) VALUES
(1, NULL, 'English', NULL, NULL, 'eng'),
(2, 'FRA', 'French', NULL, NULL, 'fra');

-- --------------------------------------------------------

--
-- Table structure for table `metadata`
--

CREATE TABLE `metadata` (
  `metadata_id` bigint(20) UNSIGNED NOT NULL COMMENT 'metadata record id',
  `metadata_field_type_id` int(10) UNSIGNED NOT NULL COMMENT 'field type id',
  `metadata_value` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'value',
  `metadata_universe_status` tinyint(1) UNSIGNED DEFAULT NULL COMMENT 'is this in our universe',
  `metadata_source` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'citation data',
  `metadata_comment` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'comment',
  `metadata_personal_flag` tinyint(1) UNSIGNED DEFAULT NULL COMMENT 'personal information flag'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `node`
--

CREATE TABLE `node` (
  `node_id` bigint(20) UNSIGNED NOT NULL COMMENT 'node id',
  `node_current_revision` int(11) UNSIGNED DEFAULT NULL COMMENT 'id of current revision, relate to ndrv'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `node`
--

INSERT INTO `node` (`node_id`, `node_current_revision`) VALUES
(1, 0),
(2, 1),
(3, 81),
(4, 0),
(5, 0),
(6, 0),
(7, 0),
(8, 0),
(9, 0),
(10, 0),
(11, 0),
(12, 0),
(13, 72),
(14, 0),
(15, 0),
(16, 0),
(17, 0),
(18, 0),
(19, 0),
(20, 0),
(21, 0),
(22, 0),
(23, 0),
(24, 0),
(25, 0),
(26, 71),
(27, 0),
(28, 0),
(29, 0),
(30, 0),
(31, 0),
(32, 0),
(33, 0),
(34, 0),
(35, 0),
(36, 0),
(37, 0),
(38, 0),
(39, 0),
(40, 0),
(41, 0),
(42, 0),
(43, 19),
(44, 20),
(45, 21),
(46, 22),
(47, 23),
(48, 23),
(49, 23),
(50, 24),
(51, 25),
(52, 26),
(53, 27),
(54, 28),
(55, 29),
(56, 29),
(57, 29),
(58, 29),
(59, 29),
(60, 29),
(61, 29),
(62, 29),
(63, 29),
(64, 29),
(65, 29),
(66, 29),
(67, 29),
(68, 29),
(69, 29),
(70, 29),
(71, 29),
(72, 29),
(73, 29),
(74, 29),
(75, 29),
(76, 29),
(77, 29),
(78, 29),
(79, 29),
(80, 29),
(81, 29),
(82, 29),
(83, 29),
(84, 29),
(85, 29),
(86, 29),
(87, 29),
(88, 29),
(89, 29),
(90, 31),
(91, 32),
(92, 33),
(93, 34),
(94, 35),
(95, 36),
(96, 37),
(97, 38),
(98, 39),
(99, 40),
(100, 41),
(101, 42),
(102, 43),
(103, 44),
(104, 45),
(105, 46),
(106, 47),
(107, 48),
(108, 49),
(109, 50),
(110, 51),
(111, 52),
(112, 53),
(113, 54),
(114, 55),
(115, 56),
(116, 57),
(117, 58),
(118, 59),
(119, 60),
(120, 61),
(121, 63),
(122, 73),
(123, 74);

-- --------------------------------------------------------

--
-- Table structure for table `node_edit`
--

CREATE TABLE `node_edit` (
  `node_edit_id` bigint(20) UNSIGNED NOT NULL COMMENT 'edit id',
  `node_edit_user_id` bigint(20) UNSIGNED NOT NULL COMMENT 'user responsible for the edit, relate to user',
  `node_edit_datetime_id` bigint(20) UNSIGNED NOT NULL COMMENT 'datetime of edit, relate to dttm',
  `node_edit_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description',
  `node_edit_source` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'citation data',
  `node_edit_node_id` bigint(20) UNSIGNED NOT NULL COMMENT 'id of edited node, relate to node',
  `node_edit_node_edit_index_id` bigint(20) UNSIGNED NOT NULL COMMENT 'id of revision created by this edit',
  `node_edit_status` int(10) UNSIGNED NOT NULL COMMENT 'edit status, relate to edst',
  `node_edit_edited_data_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'id of data for edited node, if data was edited',
  `node_edit_edited_data_data_revision_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'id of data revision for edited node, if data was edited',
  `node_edit_data_edited_flag` tinyint(1) UNSIGNED NOT NULL COMMENT 'was the node data edited'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `node_edit`
--

INSERT INTO `node_edit` (`node_edit_id`, `node_edit_user_id`, `node_edit_datetime_id`, `node_edit_description`, `node_edit_source`, `node_edit_node_id`, `node_edit_node_edit_index_id`, `node_edit_status`, `node_edit_edited_data_id`, `node_edit_edited_data_data_revision_id`, `node_edit_data_edited_flag`) VALUES
(1, 0, 0, NULL, NULL, 0, 0, 0, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `node_edit_index`
--

CREATE TABLE `node_edit_index` (
  `node_edit_index_id` bigint(20) UNSIGNED NOT NULL COMMENT 'node id for this list of edits, relate to node',
  `node_edit_index_edit_id` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'csv list of edit ids for this node'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `node_revision`
--

CREATE TABLE `node_revision` (
  `node_revision_id` bigint(20) UNSIGNED NOT NULL COMMENT 'node revision id',
  `node_revision_display_title` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'http://futuramerlin.com/d/s/mantis/view.php?id=4',
  `node_revision_short_title` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'http://futuramerlin.com/d/s/mantis/view.php?id=3',
  `node_revision_type` int(11) UNSIGNED DEFAULT NULL COMMENT 'type id, relate to ndtp',
  `node_revision_title` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'title',
  `node_revision_permissions` int(11) UNSIGNED DEFAULT NULL COMMENT 'permissions string id, relate to perm',
  `node_revision_relationships` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'csv of relevant ids, relate to rlsp',
  `node_revision_source` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'citation data',
  `node_revision_sort_title` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'title to use for sorting',
  `node_revision_description` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'description',
  `node_revision_disambiguation_description` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'disambiguation description',
  `node_revision_metadata` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'list of metadata values, csv. relate to meta',
  `node_revision_comment` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'comment',
  `node_revision_short_description` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'short description',
  `node_revision_universe_status` tinyint(1) UNSIGNED DEFAULT NULL COMMENT 'universe?',
  `node_revision_owner` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'owner, relate to user',
  `node_revision_copyright_flag` tinyint(1) UNSIGNED DEFAULT NULL COMMENT 'copyright flag, owner only can view attached data',
  `node_revision_morality_flag` tinyint(1) UNSIGNED DEFAULT NULL COMMENT 'morality flag— no users may view',
  `node_revision_personal_flag` tinyint(1) UNSIGNED DEFAULT NULL COMMENT 'personal info flag, owners only',
  `node_revision_data_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'data id, relate to data',
  `node_revision_node_id` bigint(20) UNSIGNED NOT NULL COMMENT 'id of node of which this is a revision',
  `node_revision_minor_flag` tinyint(1) UNSIGNED DEFAULT NULL COMMENT 'morality flag for minors',
  `node_revision_data_revision_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'ID of current revision of data file',
  `node_revision_time` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'This is the date/time string of when this node was modified'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `node_revision`
--

INSERT INTO `node_revision` (`node_revision_id`, `node_revision_display_title`, `node_revision_short_title`, `node_revision_type`, `node_revision_title`, `node_revision_permissions`, `node_revision_relationships`, `node_revision_source`, `node_revision_sort_title`, `node_revision_description`, `node_revision_disambiguation_description`, `node_revision_metadata`, `node_revision_comment`, `node_revision_short_description`, `node_revision_universe_status`, `node_revision_owner`, `node_revision_copyright_flag`, `node_revision_morality_flag`, `node_revision_personal_flag`, `node_revision_data_id`, `node_revision_node_id`, `node_revision_minor_flag`, `node_revision_data_revision_id`, `node_revision_time`) VALUES
(1, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, ''),
(2, NULL, NULL, 0, 127, 0, '', 128, 129, 130, 131, '', 132, 133, 0, 20, 0, 0, 0, 0, 0, 0, NULL, ''),
(3, NULL, NULL, 0, 134, 0, '', 135, 136, 137, 138, '', 139, 140, 0, 20, 0, 0, 0, 0, 0, 0, NULL, ''),
(4, NULL, NULL, 0, 141, 0, '', 142, 143, 144, 145, '', 146, 147, 0, 20, 0, 0, 0, 0, 0, 0, NULL, ''),
(5, NULL, NULL, 0, 148, 0, 'erchu', 149, 150, 151, 152, '', 153, 154, 0, 20, 0, 0, 0, 0, 0, 0, NULL, ''),
(6, NULL, NULL, 0, 155, 0, 'erchu', 156, 157, 158, 159, '', 160, 161, 0, 20, 0, 0, 0, 33, 0, 0, NULL, ''),
(7, NULL, NULL, 0, 162, 0, 'erchu', 163, 164, 165, 166, '', 167, 168, 0, 20, 0, 0, 0, 34, 0, 0, NULL, ''),
(8, NULL, NULL, 0, 169, 0, 'erchu', 170, 171, 172, 173, '', 174, 175, 0, 20, 0, 0, 0, 35, 0, 0, NULL, ''),
(9, NULL, NULL, 0, 176, 0, 'erchu', 177, 178, 179, 180, '', 181, 182, 0, 20, 0, 0, 0, 36, 0, 0, NULL, ''),
(10, NULL, NULL, 0, 183, 0, 'erchu', 184, 185, 186, 187, '', 188, 189, 0, 20, 0, 0, 0, 37, 0, 0, NULL, ''),
(11, NULL, NULL, 0, 190, 0, 'erchu', 191, 192, 193, 194, '', 195, 196, 0, 20, 0, 0, 0, 38, 0, 0, NULL, ''),
(12, NULL, NULL, 0, 197, 0, 'erchu', 198, 199, 200, 201, '', 202, 203, 0, 20, 0, 0, 0, 39, 0, 0, NULL, ''),
(13, NULL, NULL, 0, 204, 0, 'erchu', 205, 206, 207, 208, '', 209, 210, 0, 20, 0, 0, 0, 40, 0, 0, NULL, ''),
(14, NULL, NULL, 0, 211, 0, 'erchu', 212, 213, 214, 215, '', 216, 217, 0, 20, 0, 0, 0, 41, 0, 0, NULL, ''),
(15, NULL, NULL, 0, 218, 0, 'erchu', 219, 220, 221, 222, '', 223, 224, 0, 20, 0, 0, 0, 42, 0, 0, NULL, ''),
(16, NULL, NULL, 0, 225, 0, 'erchu', 226, 227, 228, 229, '', 230, 231, 0, 20, 0, 0, 0, 43, 0, 0, NULL, ''),
(17, NULL, NULL, 0, 232, 0, 'erchu', 233, 234, 235, 236, '', 237, 238, 0, 20, 0, 0, 0, 44, 0, 0, NULL, ''),
(18, NULL, NULL, 0, 239, 0, 'erchu', 240, 241, 242, 243, '', 244, 245, 0, 20, 0, 0, 0, 45, 0, 0, NULL, ''),
(19, NULL, NULL, 0, 246, 0, 'erchu', 247, 248, 249, 250, '', 251, 252, 0, 20, 0, 0, 0, 46, 0, 0, NULL, ''),
(20, NULL, NULL, 0, 253, 0, '', 254, 255, 256, 257, '', 258, 259, 0, 20, 0, 0, 0, 0, 0, 0, NULL, ''),
(21, NULL, NULL, 0, 260, 0, '', 261, 262, 263, 264, '', 265, 266, 1, 20, 0, 0, 0, 0, 0, 0, NULL, ''),
(22, NULL, NULL, 0, 267, 0, '', 268, 269, 270, 271, '', 272, 273, 0, 20, 0, 0, 0, 0, 0, 0, NULL, ''),
(23, NULL, NULL, 0, 297, 0, '', 298, 299, 300, 301, '', 302, 303, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(24, NULL, NULL, 0, 304, 0, '', 305, 306, 307, 308, '', 309, 310, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(25, NULL, NULL, 0, 311, 0, '', 312, 313, 314, 315, '', 316, 317, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(26, NULL, NULL, 0, 318, 0, '', 319, 320, 321, 322, '', 323, 324, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(27, NULL, NULL, 0, 325, 0, '', 326, 327, 328, 329, '', 330, 331, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(28, NULL, NULL, 0, 332, 0, '', 333, 334, 335, 336, '', 337, 338, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(29, 635, 636, 0, 637, 0, 'rels', 638, 639, 640, 641, 'meta', 642, 643, 1, 0, 1, 1, 1, 57, 0, 1, NULL, ''),
(30, 635, 636, 0, 637, 0, 'rels', 638, 639, 640, 641, 'meta', 642, 643, 1, 0, 1, 1, 1, 57, 0, 1, NULL, ''),
(31, 644, 645, 0, 646, 0, '', 647, 648, 649, 650, '', 651, 652, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(32, 653, 654, 0, 655, 0, '', 656, 657, 658, 22, '', 660, 661, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(33, 662, 663, 0, 664, 0, '', 665, 666, 667, 668, '', 669, 670, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(34, 671, 672, 0, 673, 0, '', 674, 675, 676, 677, '', 678, 679, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(35, 680, 681, 0, 682, 0, '', 683, 684, 685, 686, '', 687, 688, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(36, 697, 698, 0, 699, 0, '', 700, 701, 702, 703, '', 704, 705, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(37, 706, 707, 0, 708, 0, '', 709, 710, 711, 712, '', 713, 714, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(38, 715, 716, 0, 717, 0, '', 718, 719, 720, 721, '', 722, 723, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(39, 724, 725, 0, 726, 0, '', 727, 728, 729, 730, '', 731, 732, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(40, 733, 734, 0, 735, 0, '', 736, 737, 738, 739, '', 740, 741, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(41, 742, 743, 0, 744, 0, '', 745, 746, 747, 748, '', 749, 750, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(42, 751, 752, 0, 753, 0, '', 754, 755, 756, 757, '', 758, 759, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(43, 760, 761, 0, 762, 0, '', 763, 764, 765, 766, '', 767, 768, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(44, 787, 788, 0, 789, 0, '', 790, 791, 792, 793, '', 794, 795, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(45, 796, 797, 0, 798, 0, '', 799, 800, 801, 802, '', 803, 804, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(46, 805, 806, 0, 807, 0, '', 808, 809, 810, 811, '', 812, 813, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(47, 814, 815, 0, 816, 0, '', 817, 818, 819, 820, 'rlhulroc', 821, 822, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(48, 823, 824, 0, 825, 0, '', 826, 827, 828, 829, '', 830, 831, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(49, 832, 833, 0, 834, 0, '', 835, 836, 837, 838, '', 839, 840, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(50, 841, 842, 0, 843, 0, '', 844, 845, 846, 847, '', 848, 849, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(51, 860, 861, 0, 862, 0, '', 863, 864, 865, 866, '', 867, 868, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(52, 869, 870, 0, 871, 0, '', 872, 873, 874, 875, '', 876, 877, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(53, 880, 881, 0, 882, 0, '', 883, 884, 885, 886, '', 887, 888, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(54, 892, 893, 0, 894, 0, '', 895, 896, 897, 898, '', 899, 900, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(55, 901, 902, 0, 903, 0, '', 904, 905, 906, 907, '', 908, 909, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(56, 918, 919, 0, 920, 0, '', 921, 922, 923, 924, '', 925, 926, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(57, 937, 938, 0, 939, 0, '', 940, 941, 942, 943, '', 944, 945, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(58, 946, 947, 0, 948, 0, '', 949, 950, 951, 952, '', 953, 954, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(59, 956, 957, 0, 958, 0, '', 959, 960, 961, 962, '', 963, 964, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(60, 965, 966, 0, 967, 0, '', 968, 969, 970, 971, '', 972, 973, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(61, 974, 975, 0, 976, 0, '', 977, 978, 979, 980, '', 981, 982, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(62, 983, 984, 0, 985, 0, '', 986, 987, 988, 989, '', 990, 991, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(63, 992, 993, 0, 994, 0, '', 995, 996, 997, 998, '', 999, 1000, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(64, 1001, 1002, 0, 1003, 0, '', 1004, 1005, 1006, 1007, '', 1008, 1009, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(65, 1010, 1011, 0, 1012, 0, '', 1013, 1014, 1015, 1016, '', 1017, 1018, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(66, 1019, 1020, 0, 1021, 0, '', 1022, 1023, 1024, 1025, '', 1026, 1027, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(67, 1028, 1029, 0, 1030, 0, '', 1031, 1032, 1033, 1034, '', 1035, 1036, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(68, 1037, 1038, 0, 1039, 0, '', 1040, 1041, 1042, 1043, '', 1044, 1045, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(69, 1046, 1047, 0, 1048, 0, '', 1049, 1050, 1051, 1052, '', 1053, 1054, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(70, 1055, 1056, 0, 1057, 0, '', 1058, 1059, 1060, 1061, '', 1062, 1063, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(71, 1064, 1065, 0, 1066, 0, '', 1067, 1068, 1069, 1070, '', 1071, 1072, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(72, 1073, 1074, 0, 1075, 0, '', 1076, 1077, 1078, 1079, '', 1080, 1081, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(73, 1085, 1086, 0, 1087, 0, '', 1088, 1089, 1090, 1091, '', 1092, 1093, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(74, 1094, 1095, 0, 1096, 0, '', 1097, 1098, 1099, 1100, '', 1101, 1102, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(75, 1141, 1142, 0, 1143, 0, '', 1144, 1145, 1146, 1147, '', 1148, 1149, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(76, 1159, 1160, 0, 1161, 0, '', 1162, 1163, 1164, 1165, '', 1166, 1167, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(77, 1168, 1169, 0, 1170, 0, '', 1171, 1172, 1173, 1174, '', 1175, 1176, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(78, 1177, 1178, 0, 1179, 0, '', 1180, 1181, 1182, 1183, '', 1184, 1185, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(79, 1186, 1187, 0, 1188, 0, '', 1189, 1190, 1191, 1192, '', 1193, 1194, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
(80, 1195, 1196, 0, 1197, 0, '', 1198, 1199, 1200, 1201, '', 1202, 1203, 0, 0, 0, 0, 0, 0, 3, 0, NULL, ''),
(81, 1204, 1205, 0, 1206, 0, '', 1207, 1208, 1209, 1210, '', 1211, 1212, 0, 0, 0, 0, 0, 0, 3, 0, NULL, '2012');

-- --------------------------------------------------------

--
-- Table structure for table `node_type`
--

CREATE TABLE `node_type` (
  `node_type_id` int(11) UNSIGNED NOT NULL COMMENT 'node type id',
  `node_type_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'name',
  `node_type_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `operation`
--

CREATE TABLE `operation` (
  `operation_id` int(10) UNSIGNED NOT NULL COMMENT 'operation id',
  `operation_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'name',
  `operation_disp_name` bigint(20) UNSIGNED NOT NULL COMMENT 'Operation display name',
  `operation_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description',
  `operation_permission_required` int(10) UNSIGNED NOT NULL COMMENT 'required authorisation level for operation, relate to authtype'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `operation`
--

INSERT INTO `operation` (`operation_id`, `operation_name`, `operation_disp_name`, `operation_description`, `operation_permission_required`) VALUES
(1, 'home', 1110, NULL, 0),
(2, 'noone', 1111, NULL, 100),
(3, 'logIn', 1112, 'logIn', 0),
(4, 'newUser', 1113, 'newUser', 0),
(5, 'newNode', 1114, '', 1),
(6, 'nodeView', 1115, NULL, 0),
(7, 'newNodeB', 1116, 'what\'s this do???', 2),
(8, 'newNodeExecute', 1117, NULL, 2),
(9, 'newIntf', 1118, NULL, 4),
(10, 'newIntfExecute', 1118, NULL, 4),
(11, 'operationIndex', 1119, 'display an index of operations', 0),
(12, 'logInExecute', 1120, 'finish the login procedure', 0),
(13, 'aaaaa', 1121, NULL, 0),
(14, 'newUserExecute', 1122, NULL, 0),
(15, 'logOut', 1123, 'Log out', 1),
(16, 'nodeEdit', 1124, NULL, 4),
(17, 'newRelationship', 1125, NULL, 1),
(18, 'newRelationshipExecute', 1125, NULL, 0),
(19, 'nodeIndex', 1126, NULL, 0),
(20, 'newCharacter', 1127, 'add a new DCE entity', 4),
(21, 'newCharacterExecute', 1127, NULL, 4),
(22, 'newScript', 1128, NULL, 4),
(23, 'newScriptExecute', 1128, NULL, 4),
(24, 'newCharacterCategory', 1129, NULL, 4),
(25, 'newCharacterCategoryExecute', 1130, NULL, 4),
(26, 'newNodeRevisionExecute', 1131, NULL, 4),
(27, 'editRelationship', 1151, 'Edit relationship', 2);

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `permission_id` bigint(20) UNSIGNED NOT NULL COMMENT 'permission string id',
  `permission_string` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'permission string content, csv of usprids, relate to uspr)'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `relationship`
--

CREATE TABLE `relationship` (
  `relationship_id` bigint(20) UNSIGNED NOT NULL COMMENT 'relationship id',
  `relationship_relationship_revision_id` bigint(20) UNSIGNED NOT NULL COMMENT 'relationship relationship revision id'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `relationship`
--

INSERT INTO `relationship` (`relationship_id`, `relationship_relationship_revision_id`) VALUES
(3, 2),
(56, 2),
(57, 7),
(58, 8),
(59, 9),
(60, 10),
(61, 11),
(62, 12),
(63, 13),
(64, 14),
(65, 15),
(66, 16);

-- --------------------------------------------------------

--
-- Table structure for table `relationship_revision`
--

CREATE TABLE `relationship_revision` (
  `relationship_revision_id` bigint(20) UNSIGNED NOT NULL COMMENT 'relationship id',
  `relationship_revision_first_node_id` bigint(20) UNSIGNED NOT NULL COMMENT 'parent node id',
  `relationship_revision_second_node_id` bigint(20) UNSIGNED NOT NULL COMMENT 'target node id',
  `relationship_revision_personal_flag` tinyint(1) UNSIGNED DEFAULT NULL COMMENT 'personal info flag',
  `relationship_revision_owner` bigint(20) UNSIGNED NOT NULL COMMENT 'owner, relate to user',
  `relationship_revision_type` int(11) UNSIGNED NOT NULL COMMENT 'relationship type, relate to rltp',
  `relationship_revision_source` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'citation data',
  `relationship_revision_datetime_list` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'relationship time (csv, relate to dttm)',
  `relationship_revision_comment` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'comment',
  `relationship_revision_universe_status` tinyint(1) UNSIGNED DEFAULT NULL COMMENT 'fictional universe only?',
  `relationship_revision_dispute_flag` tinyint(1) DEFAULT NULL COMMENT 'This is a disputed node. See issue 13',
  `relationship_revision_morality_flag` tinyint(1) DEFAULT NULL COMMENT 'morality issue',
  `relationship_revision_minor_flag` tinyint(1) DEFAULT NULL COMMENT 'morality issue re minors',
  `relationship_revision_time` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'relationship revision time',
  `relationship_revision_relationship_id` bigint(20) UNSIGNED NOT NULL COMMENT 'relationship revision relationship id'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `relationship_revision`
--

INSERT INTO `relationship_revision` (`relationship_revision_id`, `relationship_revision_first_node_id`, `relationship_revision_second_node_id`, `relationship_revision_personal_flag`, `relationship_revision_owner`, `relationship_revision_type`, `relationship_revision_source`, `relationship_revision_datetime_list`, `relationship_revision_comment`, `relationship_revision_universe_status`, `relationship_revision_dispute_flag`, `relationship_revision_morality_flag`, `relationship_revision_minor_flag`, `relationship_revision_time`, `relationship_revision_relationship_id`) VALUES
(1, 0, 0, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', 0),
(2, 91, 89, 1, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', 3),
(3, 0, 0, 0, 0, 0, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 0),
(4, 91, 3, 0, 0, 34, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 0),
(5, 91, 3, 0, 0, 34, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 0),
(6, 91, 3, 0, 0, 34, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 0),
(7, 91, 3, 0, 0, 34, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 0),
(8, 91, 3, 0, 0, 34, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 0),
(9, 91, 3, 0, 0, 34, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 59),
(10, 91, 45, 0, 0, 3, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 60),
(11, 91, 95, 0, 0, 2, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 61),
(12, 91, 93, 0, 0, 1, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 62),
(13, 91, 105, 0, 0, 1, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 63),
(14, 114, 113, 0, 0, 2, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 64),
(15, 123, 122, 0, 0, 2, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 65),
(16, 123, 122, 0, 0, 2, 'source', 'datetime list', 'comment', 0, 0, 0, 0, 'revision time', 66);

-- --------------------------------------------------------

--
-- Table structure for table `relationship_type`
--

CREATE TABLE `relationship_type` (
  `relationship_type_id` int(10) UNSIGNED NOT NULL COMMENT 'relationship type id',
  `relationship_type_label` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'label',
  `relationship_type_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description',
  `relationship_type_reversed_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'id of reversed relationship type (e. g. if relationship type is has child, reversed relationship type is has parent, relate to rltp'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `relationship_type`
--

INSERT INTO `relationship_type` (`relationship_type_id`, `relationship_type_label`, `relationship_type_description`, `relationship_type_reversed_id`) VALUES
(1, 'Test relationship', 'test', 1),
(2, 'is a biological relative of', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `script`
--

CREATE TABLE `script` (
  `script_id` int(11) UNSIGNED NOT NULL COMMENT 'script id',
  `script_node_id` bigint(20) UNSIGNED NOT NULL COMMENT 'node id for script, relate to node',
  `script_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'name',
  `script_character_list` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'list of characters, relate to char',
  `script_name_list` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'list of alternate script names as csv',
  `script_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'description'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `script`
--

INSERT INTO `script` (`script_id`, `script_node_id`, `script_name`, `script_character_list`, `script_name_list`, `script_description`) VALUES
(1, 0, '', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) UNSIGNED NOT NULL COMMENT 'user id',
  `user_registration_ip` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'user ip at registration',
  `user_node_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'id of node representing user as person (private), relate to node',
  `user_name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'username',
  `user_authorisation_type` int(10) UNSIGNED NOT NULL COMMENT 'authorisation level, relate to autp',
  `user_password_md5` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'md5sum of password',
  `user_ip_list` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'csv list of ips used by user',
  `user_node_edit_ids` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT 'list of ids of edits made by this user, relate to nder'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_registration_ip`, `user_node_id`, `user_name`, `user_authorisation_type`, `user_password_md5`, `user_ip_list`, `user_node_edit_ids`) VALUES
(1, 'USERREGIP', 1, 'User name', 1, '5f4dcc3b5aa765d61d8327deb882cf99', 'ip,ip,ip,ip', NULL),
(2, 'regip', 1, 'username', 1, '5f4dcc3b5aa765d61d8327deb882cf99', 'ip,ip,ip,ip', NULL),
(24, '72.224.139.59', 0, 'another', 2, '95630cefed3dc2578222c6219f8e069f', '72.224.139.59', NULL),
(20, '74.78.72.177', 0, 'kyan', 4, '95630cefed3dc2578222c6219f8e069f', '74.78.72.177', NULL),
(21, '74.78.72.177', 0, 'mofo', 2, '96326ff1d7999f7dd6a19d524fd776da', '74.78.72.177', NULL),
(22, '74.78.72.177', 0, 'chardonnÃ©É™', 2, '020be165a3e587d7c83cb489c3ec9923', '74.78.72.177', NULL),
(23, '74.78.72.177', 0, 'Ã³\'o\'o\'Ã³eueÄºÄºlÅ‚eÉ™oÂ°eÅ“eAOAEÃ†AOAOÅ’', 2, 'f7c7141f6e335199688a63f2e649d86a', '74.78.72.177', NULL),
(25, '72.224.143.113', 0, 'tesean', 2, 'e9036fdadec9285fa452ecfb52ae0a9e', '72.224.143.113', NULL),
(26, '72.224.143.113', 0, 'tesean2', 2, 'e9036fdadec9285fa452ecfb52ae0a9e', '72.224.143.113', NULL),
(27, '72.224.143.113', 0, 'ketou(20p)', 2, '9b286d241d3eb312d2e2eb789fbe942b', '72.224.143.113', NULL),
(28, '72.224.143.113', 0, 'te\'u', 2, 'c0b1c7977ce2f9890950ba9099afbf99', '72.224.143.113', NULL),
(29, '74.78.72.68', 0, 'ercuh', 2, '2fe7b361775c623626deb195611e7d40', '74.78.72.68', NULL),
(30, '74.78.72.68', 0, 'krcohe', 1, '0d346eee7980306e684a35aa7896fcb6', '74.78.72.68', NULL),
(31, '74.78.72.68', 0, 'test', 3, '5f4dcc3b5aa765d61d8327deb882cf99', '74.78.72.68', NULL),
(32, '169.244.222.46', 0, 'ehu', 1, 'f09c10e0d382cfa4e731eddc7b5eade7', '169.244.222.46', NULL),
(33, '72.227.67.108', 0, 'crahicrh', 1, 'fcc48297a1d1020775b32dcbf3425a61', '72.227.67.108', NULL),
(34, '67.255.240.255', 0, 'Daddy', 1, '3d8d416b9dc8dc0ec50d28ff86675216', '67.255.240.255', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authorisation_type`
--
ALTER TABLE `authorisation_type`
  ADD PRIMARY KEY (`authorisation_type_id`);
ALTER TABLE `authorisation_type` ADD FULLTEXT KEY `AUTPNAME` (`authorisation_type_name`);
ALTER TABLE `authorisation_type` ADD FULLTEXT KEY `AUTPDESC` (`authorisation_type_description`);

--
-- Indexes for table `character`
--
ALTER TABLE `character`
  ADD PRIMARY KEY (`character_id`);
ALTER TABLE `character` ADD FULLTEXT KEY `CHARNAMELIST` (`character_name_list`);
ALTER TABLE `character` ADD FULLTEXT KEY `CHARNAME` (`character_name`);
ALTER TABLE `character` ADD FULLTEXT KEY `CHARDESC` (`character_description`);

--
-- Indexes for table `character_category`
--
ALTER TABLE `character_category`
  ADD PRIMARY KEY (`character_category_id`);
ALTER TABLE `character_category` ADD FULLTEXT KEY `character_category_name` (`character_category_name`);
ALTER TABLE `character_category` ADD FULLTEXT KEY `character_category_comment` (`character_category_comment`);

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`data_id`);

--
-- Indexes for table `data_revision`
--
ALTER TABLE `data_revision`
  ADD PRIMARY KEY (`data_revision_id`);
ALTER TABLE `data_revision` ADD FULLTEXT KEY `DTRVNAME` (`data_revision_name`);
ALTER TABLE `data_revision` ADD FULLTEXT KEY `DTRVMD5` (`data_revision_md5`);

--
-- Indexes for table `data_type`
--
ALTER TABLE `data_type`
  ADD PRIMARY KEY (`data_type_id`);
ALTER TABLE `data_type` ADD FULLTEXT KEY `DTTPNAME` (`data_type_name`);
ALTER TABLE `data_type` ADD FULLTEXT KEY `DTTPDESC` (`data_type_description`);

--
-- Indexes for table `datetime`
--
ALTER TABLE `datetime`
  ADD PRIMARY KEY (`datetime_id`);
ALTER TABLE `datetime` ADD FULLTEXT KEY `DTTMSTR` (`datetime_string`);

--
-- Indexes for table `dce`
--
ALTER TABLE `dce`
  ADD PRIMARY KEY (`dce_id`);
ALTER TABLE `dce` ADD FULLTEXT KEY `dce_decomposition` (`dce_decomposition`);
ALTER TABLE `dce` ADD FULLTEXT KEY `dce_unicode` (`dce_unicode`);
ALTER TABLE `dce` ADD FULLTEXT KEY `dce_comment` (`dce_comment`);
ALTER TABLE `dce` ADD FULLTEXT KEY `dce_html` (`dce_html`);
ALTER TABLE `dce` ADD FULLTEXT KEY `dce_armscii8` (`dce_armscii8`);
ALTER TABLE `dce` ADD FULLTEXT KEY `dce_tron` (`dce_tron`);
ALTER TABLE `dce` ADD FULLTEXT KEY `dce_comments` (`dce_comments`);
ALTER TABLE `dce` ADD FULLTEXT KEY `dce_see_also` (`dce_see_also`);
ALTER TABLE `dce` ADD FULLTEXT KEY `dce_aka` (`dce_aka`);
ALTER TABLE `dce` ADD FULLTEXT KEY `dce_name` (`dce_name`);

--
-- Indexes for table `display_type`
--
ALTER TABLE `display_type`
  ADD PRIMARY KEY (`display_type_id`);
ALTER TABLE `display_type` ADD FULLTEXT KEY `DSTPDESC` (`display_type_description`);
ALTER TABLE `display_type` ADD FULLTEXT KEY `DSTPNAME` (`display_type_name`);
ALTER TABLE `display_type` ADD FULLTEXT KEY `DSTPPT1` (`display_type_part_1`,`display_type_part_2`,`display_type_part_3`);
ALTER TABLE `display_type` ADD FULLTEXT KEY `DSTPPT2` (`display_type_part_2`);
ALTER TABLE `display_type` ADD FULLTEXT KEY `DSTPPT3` (`display_type_part_3`);

--
-- Indexes for table `edit_status`
--
ALTER TABLE `edit_status`
  ADD PRIMARY KEY (`edit_status_id`);
ALTER TABLE `edit_status` ADD FULLTEXT KEY `EDSTNAME` (`edit_status_name`);
ALTER TABLE `edit_status` ADD FULLTEXT KEY `EDSTDESC` (`edit_status_description`);

--
-- Indexes for table `field_type`
--
ALTER TABLE `field_type`
  ADD PRIMARY KEY (`field_type_id`);
ALTER TABLE `field_type` ADD FULLTEXT KEY `FLTPNAME` (`field_type_name`);
ALTER TABLE `field_type` ADD FULLTEXT KEY `FLTPDESC` (`field_type_description`);

--
-- Indexes for table `interface`
--
ALTER TABLE `interface`
  ADD PRIMARY KEY (`interface_id`);
ALTER TABLE `interface` ADD FULLTEXT KEY `INTFNAME` (`interface_name`);
ALTER TABLE `interface` ADD FULLTEXT KEY `INTFDESC` (`interface_description`);
ALTER TABLE `interface` ADD FULLTEXT KEY `INTFCTNT` (`interface_content`);
ALTER TABLE `interface` ADD FULLTEXT KEY `INTFCOMM` (`interface_comment`);
ALTER TABLE `interface` ADD FULLTEXT KEY `INTFCTNTFRA` (`interface_contentFRA`);

--
-- Indexes for table `locale`
--
ALTER TABLE `locale`
  ADD PRIMARY KEY (`locale_id`);
ALTER TABLE `locale` ADD FULLTEXT KEY `LOCLSUFF` (`locale_suffix`);
ALTER TABLE `locale` ADD FULLTEXT KEY `LOCLNAME` (`locale_name`);
ALTER TABLE `locale` ADD FULLTEXT KEY `LOCLDESC` (`locale_description`);
ALTER TABLE `locale` ADD FULLTEXT KEY `LOCLCOMM` (`locale_comment`);
ALTER TABLE `locale` ADD FULLTEXT KEY `LOCLISO` (`locale_iso_code`);

--
-- Indexes for table `metadata`
--
ALTER TABLE `metadata`
  ADD PRIMARY KEY (`metadata_id`);
ALTER TABLE `metadata` ADD FULLTEXT KEY `METAVAL` (`metadata_value`);
ALTER TABLE `metadata` ADD FULLTEXT KEY `METASOURCE` (`metadata_source`);
ALTER TABLE `metadata` ADD FULLTEXT KEY `METACOM` (`metadata_comment`);

--
-- Indexes for table `node`
--
ALTER TABLE `node`
  ADD PRIMARY KEY (`node_id`);

--
-- Indexes for table `node_edit`
--
ALTER TABLE `node_edit`
  ADD PRIMARY KEY (`node_edit_id`);
ALTER TABLE `node_edit` ADD FULLTEXT KEY `NDERDESC` (`node_edit_description`);
ALTER TABLE `node_edit` ADD FULLTEXT KEY `NDERSRC` (`node_edit_source`);

--
-- Indexes for table `node_edit_index`
--
ALTER TABLE `node_edit_index`
  ADD PRIMARY KEY (`node_edit_index_id`);
ALTER TABLE `node_edit_index` ADD FULLTEXT KEY `NDEDEDITLIST` (`node_edit_index_edit_id`);

--
-- Indexes for table `node_revision`
--
ALTER TABLE `node_revision`
  ADD PRIMARY KEY (`node_revision_id`);

--
-- Indexes for table `node_type`
--
ALTER TABLE `node_type`
  ADD PRIMARY KEY (`node_type_id`);
ALTER TABLE `node_type` ADD FULLTEXT KEY `NDTPNAME` (`node_type_name`);
ALTER TABLE `node_type` ADD FULLTEXT KEY `NDTPDESC` (`node_type_description`);

--
-- Indexes for table `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`operation_id`);
ALTER TABLE `operation` ADD FULLTEXT KEY `OPERNAME` (`operation_name`);
ALTER TABLE `operation` ADD FULLTEXT KEY `OPERDESC` (`operation_description`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`permission_id`);
ALTER TABLE `permission` ADD FULLTEXT KEY `PERMSTR` (`permission_string`);

--
-- Indexes for table `relationship`
--
ALTER TABLE `relationship`
  ADD PRIMARY KEY (`relationship_id`);

--
-- Indexes for table `relationship_revision`
--
ALTER TABLE `relationship_revision`
  ADD PRIMARY KEY (`relationship_revision_id`);
ALTER TABLE `relationship_revision` ADD FULLTEXT KEY `RLSPSRC` (`relationship_revision_source`);
ALTER TABLE `relationship_revision` ADD FULLTEXT KEY `RLSPTIMES` (`relationship_revision_datetime_list`);
ALTER TABLE `relationship_revision` ADD FULLTEXT KEY `RLSPRELCOM` (`relationship_revision_comment`);

--
-- Indexes for table `relationship_type`
--
ALTER TABLE `relationship_type`
  ADD PRIMARY KEY (`relationship_type_id`);
ALTER TABLE `relationship_type` ADD FULLTEXT KEY `RLTPLBL` (`relationship_type_label`,`relationship_type_description`);
ALTER TABLE `relationship_type` ADD FULLTEXT KEY `RLTPDESC` (`relationship_type_description`);

--
-- Indexes for table `script`
--
ALTER TABLE `script`
  ADD PRIMARY KEY (`script_id`);
ALTER TABLE `script` ADD FULLTEXT KEY `SCPTNAME` (`script_name`);
ALTER TABLE `script` ADD FULLTEXT KEY `SCPTCHARLIST` (`script_character_list`);
ALTER TABLE `script` ADD FULLTEXT KEY `SCPTNAMELIST` (`script_name_list`);
ALTER TABLE `script` ADD FULLTEXT KEY `SCPTDESC` (`script_description`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);
ALTER TABLE `user` ADD FULLTEXT KEY `USERREGIP` (`user_registration_ip`);
ALTER TABLE `user` ADD FULLTEXT KEY `USERNAME` (`user_name`);
ALTER TABLE `user` ADD FULLTEXT KEY `USERPWDMD5` (`user_password_md5`);
ALTER TABLE `user` ADD FULLTEXT KEY `USERIPLIST` (`user_ip_list`);
ALTER TABLE `user` ADD FULLTEXT KEY `USERNDERIDS` (`user_node_edit_ids`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authorisation_type`
--
ALTER TABLE `authorisation_type`
  MODIFY `authorisation_type_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'authorisation type id', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `character`
--
ALTER TABLE `character`
  MODIFY `character_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'character id';

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `data_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'data id, also file name', AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `data_revision`
--
ALTER TABLE `data_revision`
  MODIFY `data_revision_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'data revision id, also file name', AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `data_type`
--
ALTER TABLE `data_type`
  MODIFY `data_type_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'data type id', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `datetime`
--
ALTER TABLE `datetime`
  MODIFY `datetime_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'datetime id';

--
-- AUTO_INCREMENT for table `dce`
--
ALTER TABLE `dce`
  MODIFY `dce_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id', AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `edit_status`
--
ALTER TABLE `edit_status`
  MODIFY `edit_status_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'edit status id';

--
-- AUTO_INCREMENT for table `field_type`
--
ALTER TABLE `field_type`
  MODIFY `field_type_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'field type id';

--
-- AUTO_INCREMENT for table `interface`
--
ALTER TABLE `interface`
  MODIFY `interface_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'interface snippet id', AUTO_INCREMENT=1213;

--
-- AUTO_INCREMENT for table `locale`
--
ALTER TABLE `locale`
  MODIFY `locale_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'locale id', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `metadata`
--
ALTER TABLE `metadata`
  MODIFY `metadata_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'metadata record id';

--
-- AUTO_INCREMENT for table `node`
--
ALTER TABLE `node`
  MODIFY `node_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'node id', AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `node_edit`
--
ALTER TABLE `node_edit`
  MODIFY `node_edit_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'edit id', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `node_edit_index`
--
ALTER TABLE `node_edit_index`
  MODIFY `node_edit_index_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'node id for this list of edits, relate to node';

--
-- AUTO_INCREMENT for table `node_revision`
--
ALTER TABLE `node_revision`
  MODIFY `node_revision_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'node revision id', AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `node_type`
--
ALTER TABLE `node_type`
  MODIFY `node_type_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'node type id';

--
-- AUTO_INCREMENT for table `operation`
--
ALTER TABLE `operation`
  MODIFY `operation_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'operation id', AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `permission_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'permission string id';

--
-- AUTO_INCREMENT for table `relationship`
--
ALTER TABLE `relationship`
  MODIFY `relationship_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'relationship id', AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `relationship_revision`
--
ALTER TABLE `relationship_revision`
  MODIFY `relationship_revision_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'relationship id', AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `relationship_type`
--
ALTER TABLE `relationship_type`
  MODIFY `relationship_type_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'relationship type id', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `script`
--
ALTER TABLE `script`
  MODIFY `script_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'script id', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'user id', AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
