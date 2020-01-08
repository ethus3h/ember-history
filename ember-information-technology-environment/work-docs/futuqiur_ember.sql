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
-- Database: `futuqiur_ember`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_type`
--

CREATE TABLE `auth_type` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(1024) COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `auth_type`
--

INSERT INTO `auth_type` (`id`, `name`, `description`) VALUES
(0, 'No authorization', 'For example, a non-logged-in user.'),
(1, 'User', 'Normal logged-in user'),
(2, 'Moderator', NULL),
(3, 'Administrator', NULL),
(4, 'Oversight', NULL),
(5, 'Record Keeper', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `chunks`
--

CREATE TABLE `chunks` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `address` text NOT NULL,
  `altaddress` text NOT NULL COMMENT 'Backup; not currently used',
  `md5` binary(16) NOT NULL COMMENT 'For deduplication'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chunks`
--

INSERT INTO `chunks` (`id`, `address`, `altaddress`, `md5`) VALUES
(1, 'ia:0.0016865.COALPROJECT.RECORD33', '', 0xa503ed2478f9393d0b8f83ee79e67010),
(2, 'ia:0.0027360.COALPROJECT.RECORD33', '', 0x0d88d60127349e3d198da2cc3468e057),
(3, 'ia:0.0033123.COALPROJECT.RECORD33', '', 0x78463a384a5aa4fad5fa73e2f506ecfc),
(4, 'ia:0.0047472.COALPROJECT.RECORD33', '', 0x3062f3ccb1d63fff7869da1726abaf5e),
(5, 'ia:0.0058868.COALPROJECT.RECORD33', '', 0xb4f945433ea4c369c12741f62a23ccc0),
(6, 'ia:0.0066638.COALPROJECT.RECORD33', '', 0x6a4d049e68d2923e86c3327667d777f4),
(0, '', '', 0x00000000000000000000000000000000),
(8, 'ia:0.0086478.COALPROJECT.RECORD33', '', 0x0cbc6611f5540bd0809a388dc95a615b),
(9, 'ia:0.0092331.COALPROJECT.RECORD33', '', 0x53e50d42513fca6ff6623ae0cf3c9a90),
(10, 'ia:0.012381.COALPROJECT.RECORD33', '', 0x8e6f6f815b50f474cf0dc22d4f400725),
(11, 'ia:0.0112605.COALPROJECT.RECORD33', '', 0x9e5e2363ddfc40d487ac0bcd0208143c),
(12, 'ia:0.012184.COALPROJECT.RECORD33', '', 0xd3282b336ab81c50a46b4ad31c3c031c),
(13, 'ia:0.0132550.COALPROJECT.RECORD33', '', 0x34ff9ba602cc8ffdc004f4c20755acdb),
(14, 'ia:0.0142544.COALPROJECT.RECORD33', '', 0x01e502aeaf55c005f3799868fa5a4bfc),
(15, 'ia:0.015828.COALPROJECT.RECORD33', '', 0xebf86e6d603316644d1746cd10060686),
(16, 'ia:0.0161957.COALPROJECT.RECORD33', '', 0x8d44e67cd62bd69c4263aa9a7f0d53db),
(17, 'ia:0.0178102.COALPROJECT.RECORD33', '', 0x5c36fc54975f869135809f819e6bfdcd),
(18, 'ia:0.0183244.COALPROJECT.RECORD33', '', 0x96845fb75046eef0c3f4b80c47307e17),
(19, 'ia:0.0191075.COALPROJECT.RECORD33', '', 0xddbd07d13758ad9dda9f4ed865ca39df),
(20, 'ia:0.024929.COALPROJECT.RECORD33', '', 0x0bdd4320af6343e1a4f74c54e02597d2),
(21, 'ia:0.0216479.COALPROJECT.RECORD33', '', 0x12781cc92d389b5e797db01b05816d86),
(22, 'ia:0.0224129.COALPROJECT.RECORD33', '', 0xc8abb1cf1ff3c1dfef7691d4ee191740),
(23, 'ia:0.0237792.COALPROJECT.RECORD33', '', 0x4068568491c5889acd5de6ecf671b2ce),
(24, 'ia:0.0241548.COALPROJECT.RECORD33', '', 0xe45c726886462ea9538a5eef08e0c557),
(25, 'ia:0.0257072.COALPROJECT.RECORD33', '', 0x066d2ddf8baaa50c21c975095830dacb),
(26, 'ia:0.0266005.COALPROJECT.RECORD33', '', 0x770f6f61b552af2a24d15fe2fb05a3ce),
(27, 'ia:0.0277712.COALPROJECT.RECORD33', '', 0xe7bde6d4cf32571b0fb1eb108ceca745),
(28, 'ia:0.0288961.COALPROJECT.RECORD33', '', 0x101b8c3a008097c4f80b0fa810372f79),
(29, 'ia:0.0291009.COALPROJECT.RECORD33', '', 0xe86e200aa6064b038b511d38210f4715),
(30, 'ia:0.0387.COALPROJECT.RECORD33', '', 0x32ac1751f078eefad24d01c7ffbc7cfa),
(31, 'ia:0.0312920.COALPROJECT.RECORD33', '', 0xc0a3b52cc38f8610bc269e6ebba334c3),
(32, 'ia:0.0322567.COALPROJECT.RECORD33', '', 0xb759dfaf11f3fab0d7b06780e3c664bd),
(33, 'ia:0.0331329.COALPROJECT.RECORD33', '', 0x8b01a35a624121b1d4e9e92df4a3ed66),
(34, 'ia:0.0349543.COALPROJECT.RECORD33', '', 0x1fe0596a4779ca5b26416d1bfb4a5cb9),
(35, 'ia:0.0358212.COALPROJECT.RECORD33', '', 0x9d1e56b3f09808c74e7180db7b0c4ce4),
(36, 'ia:0.0361896.COALPROJECT.RECORD33', '', 0xa5f19b7602dacfdee784b0503660bd15),
(37, 'ia:0.0375286.COALPROJECT.RECORD33', '', 0xbd4125da4223b9a5171cae788a6acfe2),
(38, 'ia:0.0383728.COALPROJECT.RECORD33', '', 0x07d190208058087e0cbdbe335b464c1e),
(39, 'ia:0.039450.COALPROJECT.RECORD33', '', 0xe340eb372cdc140198957da130a0a29f),
(40, 'ia:0.043670.COALPROJECT.RECORD33', '', 0x664dfe0414788c648c227c08ec9aa99c),
(41, 'ia:0.0418376.COALPROJECT.RECORD33', '', 0xa61323943aa93f68cbfcf58d5ee7e1d2),
(42, 'ia:0.0421316.COALPROJECT.RECORD33', '', 0x4223417386f4cea25798bb65f094c448),
(43, 'ia:0.043221.COALPROJECT.RECORD33', '', 0x952453f1ed0638b1bf09e04a6f808c55),
(44, 'ia:0.0447289.COALPROJECT.RECORD33', '', 0xb122d300354d9d13095fa002cdaf8003),
(45, 'ia:0.045900.COALPROJECT.RECORD33', '', 0xe9525e7dd57fbc9de5ee54beefd28a01),
(46, 'ia:0.0468180.COALPROJECT.RECORD33', '', 0xfcb8a31a12e375d6a24b4eeb9814d416),
(47, 'ia:0.0476652.COALPROJECT.RECORD33', '', 0x2ac11b42d1410d32914b54b8478b6014),
(48, 'ia:0.0486043.COALPROJECT.RECORD33', '', 0x8934820da39138d5f7f093df60fa60be),
(49, 'ia:0.0497243.COALPROJECT.RECORD33', '', 0xae71fd4194d489a11314e0bc29e61102),
(50, 'ia:0.055878.COALPROJECT.RECORD33', '', 0xf568700b1d47b3bb4cc54f3923319959),
(51, 'ia:0.051812.COALPROJECT.RECORD33', '', 0xb0638b72153e8c7087354ecc8df177b4),
(52, 'ia:0.052320.COALPROJECT.RECORD33', '', 0x4280043f7474403b82ec457d0e19fd71),
(53, 'ia:0.0539726.COALPROJECT.RECORD33', '', 0x815623a9b57671983e0fdb5114753824),
(54, 'ia:0.054999.COALPROJECT.RECORD33', '', 0xe89fc8a66eceb632f00f1b538c641387),
(55, 'ia:0.0553078.COALPROJECT.RECORD33', '', 0x1c3c2aa62e73b28f4ad461b3b20ae458),
(56, 'ia:0.0565000.COALPROJECT.RECORD33', '', 0x6a1dfe0999881afb5e4c84858a940056),
(57, 'ia:0.0579109.COALPROJECT.RECORD33', '', 0x7d0a5b646c0163fc9def1e22980907e4),
(58, 'ia:0.0588006.COALPROJECT.RECORD33', '', 0x9dce7ddada349f59c0e992f91b281626),
(59, 'ia:0.0599194.COALPROJECT.RECORD33', '', 0x2b94ef1bb3d653112c0ade7e32bde6c0),
(60, 'ia:0.069358.COALPROJECT.RECORD33', '', 0x1f01efc06bc84daca7a343b892139b48),
(61, 'ia:0.0615680.COALPROJECT.RECORD33', '', 0xa693d0f9fc59805ba5ea8474fd8b21d7),
(62, 'ia:0.0625827.COALPROJECT.RECORD33', '', 0x3b8fb0a65ea2ba34fcdd76da5f21a976),
(63, 'ia:0.0636899.COALPROJECT.RECORD33', '', 0x842c3313c6837e9f0288490fb75430ce),
(64, 'ia:0.0648519.COALPROJECT.RECORD33', '', 0x2c7ddfe0435bd5ca64684b738c45ec45),
(65, 'ia:0.065289.COALPROJECT.RECORD33', '', 0xfcbcdbe4236a0f92a04ab46cfc3c0200),
(66, 'ia:0.0666272.COALPROJECT.RECORD33', '', 0x50874e0d530000278b2b14eb88341a30),
(67, 'ia:0.0679868.COALPROJECT.RECORD33', '', 0xa7521e83b01c5dfe9cdb89bca70b2d8d),
(68, 'ia:0.0683268.COALPROJECT.RECORD33', '', 0xdc66240b456c7f3081c4d65cf9ac6e0b),
(69, 'ia:0.0692112.COALPROJECT.RECORD33', '', 0x213f46df4c322230ac987c73033fb506),
(70, 'ia:0.073194.COALPROJECT.RECORD33', '', 0x55a86bcd3b5048f173a8565d2083863b),
(71, 'ia:0.0719672.COALPROJECT.RECORD33', '', 0xb17ad0e54f66423ed31fb04a09c94dfb),
(72, 'ia:0.0723757.COALPROJECT.RECORD33', '', 0x22e296904274a0949d61adef40f532ca),
(73, 'ia:0.0736568.COALPROJECT.RECORD33', '', 0x0f343b0931126a20f133d67c2b018a3b),
(74, 'ia:0.074977.COALPROJECT.RECORD33', '', 0x7530d44453246fe7a1b3f2200257cb7e),
(75, 'ia:0.0753593.COALPROJECT.RECORD33', '', 0x61c9621a15d4033fe26b9aff9dd23eba),
(76, 'ia:0.0761180.COALPROJECT.RECORD33', '', 0x56a247c55e4cd5b5e3a0d6eaaa56c7d4),
(77, 'ia:0.077708.COALPROJECT.RECORD33', '', 0x6599837e8d80f2540f06f4b4ca895bdc),
(78, 'ia:0.0783681.COALPROJECT.RECORD33', '', 0x96ebf87c5a66e48496968a6e170befda),
(79, 'ia:0.0791545.COALPROJECT.RECORD33', '', 0xdee17817b09da300692496eb8842c809),
(80, 'ia:0.089201.COALPROJECT.RECORD33', '', 0x3fc2dad4991cb7beb19bb18805e98173),
(81, 'ia:0.0815917.COALPROJECT.RECORD33', '', 0xacf5ae479804264862b12db7be433861),
(82, 'ia:0.0821343.COALPROJECT.RECORD33', '', 0x2e3b42100bd2e89c94b1b2f2a6d1ff6d),
(83, 'ia:0.0835661.COALPROJECT.RECORD33', '', 0xfbf0a2738835a388346922b6602398fc),
(84, 'ia:0.0848.COALPROJECT.RECORD33', '', 0xb8e493fdde9c1a7cf6dfb9982b1789f5),
(85, 'ia:0.0858136.COALPROJECT.RECORD33', '', 0x3c5bc568768995ad9164940b30c218c9),
(86, 'ia:0.0865446.COALPROJECT.RECORD33', '', 0x1747a1a43ba3cdb04c41553a5339902d),
(87, 'ia:0.087894.COALPROJECT.RECORD33', '', 0x2bb415ef8400ece32a4613feaa94c8e1),
(88, 'ia:0.0887459.COALPROJECT.RECORD33', '', 0xa111bd2abdc1d19ec66907f7e131edab),
(89, 'ia:0.0898156.COALPROJECT.RECORD33', '', 0x61cde7f29b9d9f7a6abba301470a06a3),
(90, 'ia:0.093688.COALPROJECT.RECORD33', '', 0xb561be5a8ddabf6e178dd369be694b69),
(91, 'ia:0.0914526.COALPROJECT.RECORD33', '', 0x1daba43d540e644ff059743f01054fea),
(92, 'ia:0.0928392.COALPROJECT.RECORD33', '', 0xccbafd57c62efda64025b5e41a1f866a),
(93, 'ia:0.0934082.COALPROJECT.RECORD33', '', 0x993fe3548b715163601ee13719adfd03),
(94, 'ia:0.0945877.COALPROJECT.RECORD33', '', 0xe6c48a0d65a9c0ea5b5848dcd5dfd0fc),
(95, 'ia:0.0956279.COALPROJECT.RECORD33', '', 0x9bad0b14b22bfd7e9502dda267def7b7),
(96, 'ia:0.0967257.COALPROJECT.RECORD33', '', 0x14635d17a2d602b50c35ab11de9b2496),
(97, 'ia:0.0975279.COALPROJECT.RECORD33', '', 0xf198d0838a2038639cf2cf4eca01b83c),
(98, 'ia:0.0986256.COALPROJECT.RECORD33', '', 0x9c79da0de0962e007e76bd603aff3eeb),
(99, 'ia:0.0999367.COALPROJECT.RECORD33', '', 0x8e8e40e72907b4f9f81cc8b17a17430f),
(100, 'ia:0.18725.COALPROJECT.RECORD33', '', 0x66f2ac693595725369c3228b8d5a3ef2),
(101, 'ia:0.1012660.COALPROJECT.RECORD33', '', 0x11d55851316a38166e2b1b2aa5c1d7f0),
(102, 'ia:0.1028283.COALPROJECT.RECORD33', '', 0xf563035747a3c5ea5f5b7c95d29fed89),
(103, 'ia:0.1035795.COALPROJECT.RECORD33', '', 0xeb13603f3fbbe2b217f55df391096ca6),
(104, 'ia:0.1048078.COALPROJECT.RECORD33', '', 0x26a28358dea8fb7e5421de812e3b7622),
(105, 'ia:0.1058826.COALPROJECT.RECORD33', '', 0x78992a243913150ffed1fa47ab55e926),
(106, 'ia:0.1061578.COALPROJECT.RECORD33', '', 0x0c244ad62be5b598e043b3f543280f46),
(107, 'ia:0.10726.COALPROJECT.RECORD33', '', 0xd18debfea56322d6f033acd4f4c092a3),
(108, 'ia:0.10857.COALPROJECT.RECORD33', '', 0xbe04c5d5c399eb9afc25b7fbf69fee2f),
(109, 'ia:0.10980.COALPROJECT.RECORD33', '', 0xb4db34be21f84f3fc5619579cdc1eccf),
(110, 'ia:0.1120.COALPROJECT.RECORD33', '', 0x2b868b7d33fd6519c047d8d17f5e2c23),
(111, 'ia:0.11168.COALPROJECT.RECORD33', '', 0xd80fec878bd5ddd42988180536d8f12c),
(112, 'ia:0.11259.COALPROJECT.RECORD33', '', 0xcb5dc087ce5594c92cffd8cd2cf53b63),
(113, 'ia:0.11373.COALPROJECT.RECORD33', '', 0xccdc06f35c14fcf72ad352ca7cba69fb),
(114, 'ia:0.1147.COALPROJECT.RECORD33', '', 0xf751fd9a1405cac80940898d638ae8ab),
(115, 'ia:0.11569.COALPROJECT.RECORD33', '', 0x6c981f5183c40a8f03072bbdad876a11),
(116, 'ia:0.11650.COALPROJECT.RECORD33', '', 0x6794f8e894cf4caee3729514d722f01c),
(117, 'ia:0.11729.COALPROJECT.RECORD33', '', 0x2c8e9f7c119ff0d037fe8c8305cafbb8),
(118, 'ia:0.11813.COALPROJECT.RECORD33', '', 0x4921f7c6102aebe0919155739f903cef),
(119, 'ia:0.11982.COALPROJECT.RECORD33', '', 0xd67984a35adffc6c7cdaca7eabc100f0),
(120, 'ia:0.120.COALPROJECT.RECORD33', '', 0xcaed8f4373cc05a36bc530541223b57e),
(121, 'ia:0.12115.COALPROJECT.RECORD33', '', 0x65f95afa47bdf58fcb89b111b1151b23),
(122, 'ia:0.12262.COALPROJECT.RECORD33', '', 0x0382fc55cd07c2ba215191716c81eeca),
(123, 'ia:0.12358.COALPROJECT.RECORD33', '', 0x23bb98509596d5949ce1e2c3df9ddfbd),
(124, 'ia:0.12498.COALPROJECT.RECORD33', '', 0xb223999619d26b9d79a56c4e76ad6a9c),
(125, 'ia:0.12597.COALPROJECT.RECORD33', '', 0x3e442eeab0bc4acc1a77e952529337d1),
(126, 'ia:0.1261.COALPROJECT.RECORD33', '', 0xaecf0e251eaa484cd8b16800ef59e5e9),
(127, 'ia:0.1272.COALPROJECT.RECORD33', '', 0xa5fff707b021cff4e4eb293e28d65ce7),
(128, 'ia:0.12896.COALPROJECT.RECORD33', '', 0x0f64b12c788496ed5791e2a858c4d62a),
(129, 'ia:0.12997.COALPROJECT.RECORD33', '', 0xd1183516fbb538b23ea42f3a45d22998),
(130, 'ia:0.1345.COALPROJECT.RECORD33', '', 0x3e7e5f75efdf1542828a1ab8fb18f747),
(131, 'ia:0.13192.COALPROJECT.RECORD33', '', 0x8628fefd3f711372159683fe1db4196f),
(132, 'ia:0.13295.COALPROJECT.RECORD33', '', 0xc2464c9c22eb089f10de29bbc4a34535),
(133, 'ia:0.13334.COALPROJECT.RECORD33', '', 0xf573b647e55482e65aef6eda7bcc6238),
(134, 'ia:0.1341.COALPROJECT.RECORD33', '', 0x962869bfe75e06488730179390bf2020),
(135, 'ia:0.13516.COALPROJECT.RECORD33', '', 0x06ed0274cdbeb41416e67ff0c80a7eb1),
(136, 'ia:0.1369.COALPROJECT.RECORD33', '', 0x5e31169c55accd87a91e74dfe2b10957),
(137, 'ia:0.13781.COALPROJECT.RECORD33', '', 0xb206acf37f6162f249b87b88aa29ae76),
(138, 'ia:0.13867.COALPROJECT.RECORD33', '', 0x9f927efa275f3315b8d30738d3701165),
(139, 'ia:0.13945.COALPROJECT.RECORD33', '', 0xa039e4dde6d7a1c74bc5a91c82553ccc),
(140, 'ia:0.1486.COALPROJECT.RECORD33', '', 0x9e1fd8494d195ab85e128a9534ddf8c3),
(141, 'ia:0.14121.COALPROJECT.RECORD33', '', 0x06c5c6ed28107db31d91baeafe0e3371),
(142, 'ia:0.14261.COALPROJECT.RECORD33', '', 0xf2975538489337c53da9a41f2e8c8d61),
(143, 'ia:0.14361.COALPROJECT.RECORD33', '', 0x9d13c23a7193ccd32a4cd4cb48ad56f7),
(144, 'ia:0.1449.COALPROJECT.RECORD33', '', 0xf61dbc090695088b7771ed9102c854fe),
(145, 'ia:0.14512.COALPROJECT.RECORD33', '', 0x9e1ca072816eb8c8f6cdba71760479da),
(146, 'ia:0.14656.COALPROJECT.RECORD33', '', 0xc34359a2dfa261b7ba7d590055c7ab37),
(147, 'ia:0.14768.COALPROJECT.RECORD33', '', 0x77c53a81d32984ae9ea13ef6141c457b),
(148, 'ia:0.14896.COALPROJECT.RECORD33', '', 0xf1cb53c8ce451bccddad41b41b8f194a),
(149, 'ia:0.14939.COALPROJECT.RECORD33', '', 0x4868b04774b21b88f173668bc58a64e2),
(150, 'ia:0.1552.COALPROJECT.RECORD33', '', 0x22d9136b05f93f6e681486839968c870),
(151, 'ia:0.15140.COALPROJECT.RECORD33', '', 0x6da5f600df858848c89def05e607bcd6),
(152, 'ia:0.15215.COALPROJECT.RECORD33', '', 0xf4fd9c0d1f068adbafbe20ce63d31e4b),
(153, 'ia:0.15390.COALPROJECT.RECORD33', '', 0x82c1897839578d733f211191fc3816d9),
(154, 'ia:0.1540.COALPROJECT.RECORD33', '', 0xf9d06f06c73259fff45913fb14dfcb84),
(155, 'ia:0.15521.COALPROJECT.RECORD33', '', 0xe2652e252c3b50ba299bb8d802600bb1),
(156, 'ia:0.15670.COALPROJECT.RECORD33', '', 0xc9db92b05f3216fcd5d438d680f05443),
(157, 'ia:0.15765.COALPROJECT.RECORD33', '', 0x110867309c5a708c5138c93a50bd250c),
(158, 'ia:0.15830.COALPROJECT.RECORD33', '', 0x72f8cd04ce1543cced801337ed8793b5),
(159, 'ia:0.15963.COALPROJECT.RECORD33', '', 0xd93ebdecbf385fc20a940f74fcde13fe),
(160, 'ia:0.1644.COALPROJECT.RECORD33', '', 0x98d0a295e0e46358ee18b3cf511ce9c9),
(161, 'ia:0.16174.COALPROJECT.RECORD33', '', 0x7a1f498c33eab6c7cdbc4a711448b08b),
(162, 'ia:0.16248.COALPROJECT.RECORD33', '', 0x070a79c2e9a91306b5f622a2d578cdc4),
(163, 'ia:0.16314.COALPROJECT.RECORD33', '', 0x243525255333cee9e0780dc8f29930a2),
(164, 'ia:0.164100.COALPROJECT.RECORD33', '', 0x8e0daef758e9b0775435d9037c46b154),
(165, 'ia:0.16586.COALPROJECT.RECORD33', '', 0xf5a59e4e5139a7c99d95490ca2ca0b3e),
(166, 'ia:0.16685.COALPROJECT.RECORD33', '', 0x622a2acf646be3eadb2e535f2095b0e9),
(167, 'ia:0.16793.COALPROJECT.RECORD33', '', 0x81afd88e0448a611a64a2264ae60de13),
(168, 'ia:0.16830.COALPROJECT.RECORD33', '', 0x5ecb020e8a95363a2950fb7b7601cecc),
(169, 'ia:0.16930.COALPROJECT.RECORD33', '', 0xbab7172c4a07f00e0e0062751082ecbb),
(170, 'ia:0.1774.COALPROJECT.RECORD33', '', 0x8491ad5a8219c61baaac3506bea09465),
(171, 'ia:0.1714.COALPROJECT.RECORD33', '', 0x194577a7e20bdcc7afbb718f502c134c),
(172, 'ia:0.17258.COALPROJECT.RECORD33', '', 0xc6de672fdf41ae248445ecd87d17331b),
(173, 'ia:0.1738.COALPROJECT.RECORD33', '', 0xcf849f5fd4a0532f8d93be9915d9e0e0),
(174, 'ia:0.17415.COALPROJECT.RECORD33', '', 0x05b1b2d576e737991f8b456f018bd165),
(175, 'ia:0.1753.COALPROJECT.RECORD33', '', 0xcaa20f670e0d95427618538f981191f8),
(176, 'ia:0.17617.COALPROJECT.RECORD33', '', 0x384f84ba5b5b627a03a6f22fd179bbcf),
(177, 'ia:0.17722.COALPROJECT.RECORD33', '', 0x648097c36879bd17f65170406770f766),
(178, 'ia:0.17860.COALPROJECT.RECORD33', '', 0x7f9890c1dc1bab8e6d56b0a481aa9c7d),
(179, 'ia:0.17989.COALPROJECT.RECORD33', '', 0x6cdbc35d96f1a4752463344e53c09a5a),
(180, 'ia:0.1847.COALPROJECT.RECORD33', '', 0xd54a1e2156a14fb826291b25df153c4c),
(181, 'ia:0.18172.COALPROJECT.RECORD33', '', 0xd77559d95327d4f9d9adf21bdcf12e53),
(182, 'ia:0.1824.COALPROJECT.RECORD33', '', 0x209e6ee400454b5c37ca171263a5060c),
(183, 'ia:0.18395.COALPROJECT.RECORD33', '', 0xd6451e7901ae81fe232df23c65a4947a),
(184, 'ia:0.18444.COALPROJECT.RECORD33', '', 0xae4359d8eb803dfd10e2b68c6192bd00),
(185, 'ia:0.18527.COALPROJECT.RECORD33', '', 0x802548d8a59da40085607f46985d07d0),
(186, 'ia:0.18611.COALPROJECT.RECORD33', '', 0x24f615069ab8812eab79724eb61a6682),
(187, 'ia:0.18748.COALPROJECT.RECORD33', '', 0xd035f4e487d00b7c7ac2ae00ef46b917),
(188, 'ia:0.18840.COALPROJECT.RECORD33', '', 0xc09d2d8cec2f2cb492f552b95841c74c),
(189, 'ia:0.18950.COALPROJECT.RECORD33', '', 0x3a6c337581afc349391048547a23d2b8),
(190, 'ia:0.1999.COALPROJECT.RECORD33', '', 0x0dc5a87b5205c5023fd53797169ca398),
(191, 'ia:0.19163.COALPROJECT.RECORD33', '', 0x22659d6c947e71aea601b4c1488769be),
(192, 'ia:0.19282.COALPROJECT.RECORD33', '', 0xba11a675032a600792837b18674895fd),
(193, 'ia:0.19310.COALPROJECT.RECORD33', '', 0x771c9beeb9b580bbd9f7b88dced9e8be),
(194, 'ia:0.19414.COALPROJECT.RECORD33', '', 0x9d013fb376022d76a0ff257c18007242),
(195, 'ia:0.19520.COALPROJECT.RECORD33', '', 0xff4044da7902527b474dc77334199386),
(196, 'ia:0.19681.COALPROJECT.RECORD33', '', 0x259a7d8aefcb8921e1ea6450ad969a2b),
(197, 'ia:0.19791.COALPROJECT.RECORD33', '', 0xce6776404fb0eede1cba7e37d34452ba),
(198, 'ia:0.19880.COALPROJECT.RECORD33', '', 0xc8d618b114646da1d68656c637d6a8da),
(199, 'ia:0.19983.COALPROJECT.RECORD33', '', 0x402bbf706950108bce86903afdb63fec),
(200, 'ia:0.291.COALPROJECT.RECORD33', '', 0x66e09be40317579967849d01ee172d3e),
(201, 'ia:0.20135.COALPROJECT.RECORD33', '', 0x70fbe35e503cbdafdb229d285b27a11b),
(202, 'ia:0.20221.COALPROJECT.RECORD33', '', 0x2a2f09da27ba9c0ed306400aa62e9d82);

-- --------------------------------------------------------

--
-- Table structure for table `dc`
--

CREATE TABLE `dc` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `number` bigint(20) UNSIGNED NOT NULL COMMENT 'This Dc''s ID',
  `name` bigint(20) UNSIGNED NOT NULL,
  `class` int(11) UNSIGNED NOT NULL COMMENT 'Dc class',
  `subclass` int(11) UNSIGNED NOT NULL COMMENT 'Dc subclass',
  `simple` text NOT NULL,
  `complex` longtext NOT NULL COMMENT 'Complex rendering rules for this Dc',
  `description` bigint(20) UNSIGNED NOT NULL COMMENT 'A description of this Dc',
  `variants` longtext NOT NULL COMMENT 'List of Dcs that are variants of this Dc',
  `decomposition` longtext NOT NULL COMMENT 'Can include indication of what Dc this Dc is a variant of, e.g. semantics variants or glyph variants, etc. (As well as the usual purposes for character+diacritic etc.)',
  `replaces` bigint(20) UNSIGNED NOT NULL COMMENT 'The Dc that this is a newer revision of',
  `annotations` bigint(20) UNSIGNED NOT NULL COMMENT 'localizable string',
  `synonyms` bigint(20) UNSIGNED NOT NULL COMMENT 'localizable string',
  `see also` bigint(20) UNSIGNED NOT NULL COMMENT 'localizable string'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `dcclasses`
--

CREATE TABLE `dcclasses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` bigint(20) UNSIGNED NOT NULL COMMENT 'localizable string',
  `container` bigint(20) UNSIGNED NOT NULL COMMENT 'Containers may not be nested more than 1 deep'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `encmappings`
--

CREATE TABLE `encmappings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `encoding` bigint(20) UNSIGNED NOT NULL,
  `table` bigint(20) UNSIGNED NOT NULL,
  `entry` bigint(20) UNSIGNED NOT NULL COMMENT 'The ID in the source encoding',
  `dc` bigint(20) UNSIGNED NOT NULL COMMENT 'The Dc(s) that this maps to'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `encodings`
--

CREATE TABLE `encodings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `text_identifier` varchar(10) NOT NULL COMMENT 'For example, utf8 (for use in programming)',
  `name` bigint(20) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `enctables`
--

CREATE TABLE `enctables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `encoding` bigint(20) UNSIGNED NOT NULL,
  `text_identifier` varchar(20) NOT NULL,
  `name` bigint(20) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `index`
--

CREATE TABLE `index` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(16) NOT NULL,
  `itemid` bigint(20) UNSIGNED NOT NULL,
  `fulltext` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='A potentially massive fulltext index of Ember';

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'relates to strings:language',
  `name` bigint(20) UNSIGNED NOT NULL COMMENT 'relates to strings:id; used to provide UI reference to what a language is'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Localizable names for languages (related to the strings table)';

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`) VALUES
(0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `localised`
--

CREATE TABLE `localised` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `applicationString` tinyint(1) NOT NULL COMMENT 'Is this a string needed for localising Ember itself'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `localisedmap`
--

CREATE TABLE `localisedmap` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `string` bigint(20) UNSIGNED NOT NULL COMMENT 'Relate toForgot this. (ID of the string, so that this can actually work) Relate to localised.id',
  `language` int(10) UNSIGNED NOT NULL,
  `data` bigint(20) UNSIGNED NOT NULL COMMENT 'Coal ID of the string in this language'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Localizable strings.';

--
-- Dumping data for table `localisedmap`
--

INSERT INTO `localisedmap` (`id`, `string`, `language`, `data`) VALUES
(1, 0, 0, 2),
(2, 0, 0, 3),
(0, 0, 0, 0),
(4, 0, 0, 5),
(5, 0, 0, 6);

-- --------------------------------------------------------

--
-- Table structure for table `recordmeta`
--

CREATE TABLE `recordmeta` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trait` bigint(20) UNSIGNED NOT NULL,
  `value` bigint(20) UNSIGNED NOT NULL COMMENT 'A localizable string.'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `recordrevisions`
--

CREATE TABLE `recordrevisions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `record` bigint(20) UNSIGNED NOT NULL,
  `date` bigint(20) UNSIGNED NOT NULL COMMENT 'date this change was made, as a coal',
  `user` bigint(20) UNSIGNED NOT NULL COMMENT 'user who made this change',
  `owner` bigint(20) UNSIGNED NOT NULL COMMENT 'owner of this record',
  `flags` bigint(20) UNSIGNED NOT NULL COMMENT 'A non-localizable string',
  `types` bigint(20) UNSIGNED NOT NULL COMMENT 'list of record types that apply to this record',
  `permissions` bigint(20) UNSIGNED NOT NULL COMMENT 'A non-localizable string',
  `metadata` longtext NOT NULL COMMENT 'List of relevant record metadata records',
  `relationships` bigint(20) UNSIGNED NOT NULL COMMENT 'A non-localizable string'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recordrevisions`
--

INSERT INTO `recordrevisions` (`id`, `record`, `date`, `user`, `owner`, `flags`, `types`, `permissions`, `metadata`, `relationships`) VALUES
(0, 0, 0, 0, 0, 0, 0, 0, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `records`
--

CREATE TABLE `records` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `latest` bigint(20) UNSIGNED NOT NULL COMMENT 'Latest revision of this record'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `records`
--

INSERT INTO `records` (`id`, `latest`) VALUES
(0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `recordtypes`
--

CREATE TABLE `recordtypes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` bigint(20) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `relationships`
--

CREATE TABLE `relationships` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `target` bigint(20) UNSIGNED NOT NULL COMMENT 'a record',
  `destination` bigint(20) UNSIGNED NOT NULL COMMENT 'a record',
  `relationship` bigint(20) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `relationships`
--

INSERT INTO `relationships` (`id`, `target`, `destination`, `relationship`) VALUES
(0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `relationtypes`
--

CREATE TABLE `relationtypes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` bigint(20) UNSIGNED NOT NULL,
  `namerev` bigint(20) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `strings`
--

CREATE TABLE `strings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `chunk` bigint(20) UNSIGNED NOT NULL,
  `md5` binary(16) NOT NULL COMMENT 'to prevent an attacker sending fake data in response to a coal retrieval'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `strings`
--

INSERT INTO `strings` (`id`, `chunk`, `md5`) VALUES
(1, 2, 0xa503ed2478f9393d0b8f83ee79e67010),
(2, 4, 0x78463a384a5aa4fad5fa73e2f506ecfc),
(3, 6, 0xb4f945433ea4c369c12741f62a23ccc0),
(0, 0, 0x00000000000000000000000000000000),
(5, 9, 0x0cbc6611f5540bd0809a388dc95a615b),
(6, 11, 0x8e6f6f815b50f474cf0dc22d4f400725),
(7, 13, 0xd3282b336ab81c50a46b4ad31c3c031c),
(8, 15, 0x01e502aeaf55c005f3799868fa5a4bfc),
(9, 16, 0x01e502aeaf55c005f3799868fa5a4bfc),
(10, 18, 0x5c36fc54975f869135809f819e6bfdcd),
(11, 20, 0xddbd07d13758ad9dda9f4ed865ca39df),
(12, 22, 0x12781cc92d389b5e797db01b05816d86),
(13, 24, 0x4068568491c5889acd5de6ecf671b2ce),
(14, 26, 0x066d2ddf8baaa50c21c975095830dacb),
(15, 28, 0xe7bde6d4cf32571b0fb1eb108ceca745),
(16, 30, 0xe86e200aa6064b038b511d38210f4715),
(17, 32, 0xc0a3b52cc38f8610bc269e6ebba334c3),
(18, 34, 0x8b01a35a624121b1d4e9e92df4a3ed66),
(19, 36, 0x9d1e56b3f09808c74e7180db7b0c4ce4),
(20, 38, 0xbd4125da4223b9a5171cae788a6acfe2),
(21, 40, 0xe340eb372cdc140198957da130a0a29f),
(22, 42, 0xa61323943aa93f68cbfcf58d5ee7e1d2),
(23, 44, 0x952453f1ed0638b1bf09e04a6f808c55),
(24, 46, 0xe9525e7dd57fbc9de5ee54beefd28a01),
(25, 48, 0x2ac11b42d1410d32914b54b8478b6014),
(26, 50, 0xae71fd4194d489a11314e0bc29e61102),
(27, 52, 0xb0638b72153e8c7087354ecc8df177b4),
(28, 54, 0x815623a9b57671983e0fdb5114753824),
(29, 56, 0x1c3c2aa62e73b28f4ad461b3b20ae458),
(30, 58, 0x7d0a5b646c0163fc9def1e22980907e4),
(31, 60, 0x2b94ef1bb3d653112c0ade7e32bde6c0),
(32, 62, 0xa693d0f9fc59805ba5ea8474fd8b21d7),
(33, 64, 0x842c3313c6837e9f0288490fb75430ce),
(34, 66, 0xfcbcdbe4236a0f92a04ab46cfc3c0200),
(35, 68, 0xa7521e83b01c5dfe9cdb89bca70b2d8d),
(36, 70, 0x213f46df4c322230ac987c73033fb506),
(37, 72, 0xb17ad0e54f66423ed31fb04a09c94dfb),
(38, 74, 0x0f343b0931126a20f133d67c2b018a3b),
(39, 76, 0x61c9621a15d4033fe26b9aff9dd23eba),
(40, 78, 0x6599837e8d80f2540f06f4b4ca895bdc),
(41, 80, 0xdee17817b09da300692496eb8842c809),
(42, 82, 0xacf5ae479804264862b12db7be433861),
(43, 84, 0xfbf0a2738835a388346922b6602398fc),
(44, 86, 0x3c5bc568768995ad9164940b30c218c9),
(45, 88, 0x2bb415ef8400ece32a4613feaa94c8e1),
(46, 90, 0x61cde7f29b9d9f7a6abba301470a06a3),
(47, 92, 0x1daba43d540e644ff059743f01054fea),
(48, 94, 0x993fe3548b715163601ee13719adfd03),
(49, 96, 0x9bad0b14b22bfd7e9502dda267def7b7),
(50, 98, 0xf198d0838a2038639cf2cf4eca01b83c),
(51, 100, 0x8e8e40e72907b4f9f81cc8b17a17430f),
(52, 102, 0x11d55851316a38166e2b1b2aa5c1d7f0),
(53, 104, 0xeb13603f3fbbe2b217f55df391096ca6),
(54, 106, 0x78992a243913150ffed1fa47ab55e926),
(55, 108, 0xd18debfea56322d6f033acd4f4c092a3),
(56, 110, 0xb4db34be21f84f3fc5619579cdc1eccf),
(57, 112, 0xd80fec878bd5ddd42988180536d8f12c),
(58, 114, 0xccdc06f35c14fcf72ad352ca7cba69fb),
(59, 116, 0x6c981f5183c40a8f03072bbdad876a11),
(60, 118, 0x2c8e9f7c119ff0d037fe8c8305cafbb8),
(61, 120, 0xd67984a35adffc6c7cdaca7eabc100f0),
(62, 122, 0x65f95afa47bdf58fcb89b111b1151b23),
(63, 124, 0x23bb98509596d5949ce1e2c3df9ddfbd),
(64, 126, 0x3e442eeab0bc4acc1a77e952529337d1),
(65, 128, 0xa5fff707b021cff4e4eb293e28d65ce7),
(66, 131, 0xd1183516fbb538b23ea42f3a45d22998),
(67, 132, 0x3e7e5f75efdf1542828a1ab8fb18f747),
(68, 134, 0xf573b647e55482e65aef6eda7bcc6238),
(69, 136, 0x06ed0274cdbeb41416e67ff0c80a7eb1),
(70, 138, 0xb206acf37f6162f249b87b88aa29ae76),
(71, 140, 0xa039e4dde6d7a1c74bc5a91c82553ccc),
(72, 142, 0x06c5c6ed28107db31d91baeafe0e3371),
(73, 144, 0x9d13c23a7193ccd32a4cd4cb48ad56f7),
(74, 146, 0x9e1ca072816eb8c8f6cdba71760479da),
(75, 149, 0x77c53a81d32984ae9ea13ef6141c457b),
(76, 150, 0xf1cb53c8ce451bccddad41b41b8f194a),
(77, 152, 0x6da5f600df858848c89def05e607bcd6),
(78, 154, 0x82c1897839578d733f211191fc3816d9),
(79, 156, 0xe2652e252c3b50ba299bb8d802600bb1),
(80, 158, 0x110867309c5a708c5138c93a50bd250c),
(81, 160, 0xd93ebdecbf385fc20a940f74fcde13fe),
(82, 162, 0x7a1f498c33eab6c7cdbc4a711448b08b),
(83, 164, 0x243525255333cee9e0780dc8f29930a2),
(84, 166, 0xf5a59e4e5139a7c99d95490ca2ca0b3e),
(85, 168, 0x81afd88e0448a611a64a2264ae60de13),
(86, 170, 0xbab7172c4a07f00e0e0062751082ecbb),
(87, 172, 0x194577a7e20bdcc7afbb718f502c134c),
(88, 174, 0xcf849f5fd4a0532f8d93be9915d9e0e0),
(89, 176, 0xcaa20f670e0d95427618538f981191f8),
(90, 178, 0x648097c36879bd17f65170406770f766),
(91, 180, 0x6cdbc35d96f1a4752463344e53c09a5a),
(92, 182, 0xd77559d95327d4f9d9adf21bdcf12e53),
(93, 184, 0xd6451e7901ae81fe232df23c65a4947a),
(94, 186, 0x802548d8a59da40085607f46985d07d0),
(95, 188, 0xd035f4e487d00b7c7ac2ae00ef46b917),
(96, 190, 0x3a6c337581afc349391048547a23d2b8),
(97, 192, 0x22659d6c947e71aea601b4c1488769be),
(98, 194, 0x771c9beeb9b580bbd9f7b88dced9e8be),
(99, 196, 0xff4044da7902527b474dc77334199386),
(100, 198, 0xce6776404fb0eede1cba7e37d34452ba),
(101, 200, 0x402bbf706950108bce86903afdb63fec),
(102, 202, 0x70fbe35e503cbdafdb229d285b27a11b);

-- --------------------------------------------------------

--
-- Table structure for table `traits`
--

CREATE TABLE `traits` (
  `id` bigint(20) UNSIGNED NOT NULL COMMENT 'These are metadatas',
  `isLocalisable` tinyint(1) NOT NULL,
  `name` bigint(20) UNSIGNED NOT NULL COMMENT 'Localized name for this trait',
  `phrase` bigint(20) UNSIGNED NOT NULL COMMENT 'Localized phrase to use in describing this trait on record pages'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` binary(16) NOT NULL COMMENT 'md5 of user name',
  `password` varchar(60) NOT NULL COMMENT 'salted sha1',
  `record` bigint(20) UNSIGNED NOT NULL COMMENT 'record relating to this person',
  `authorisation` int(10) UNSIGNED NOT NULL COMMENT 'relate to auth_type'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `record`, `authorisation`) VALUES
(0, 0x098f6bcd4621d373cade4e832627b4f6, '$2a$08$2UaRnw9KvJ.7QfAQM/AxcuRFHqpO.S6pu/ZJdj6fdp8UA0TB1jQya', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_type`
--
ALTER TABLE `auth_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chunks`
--
ALTER TABLE `chunks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dc`
--
ALTER TABLE `dc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dcclasses`
--
ALTER TABLE `dcclasses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `encmappings`
--
ALTER TABLE `encmappings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `encodings`
--
ALTER TABLE `encodings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enctables`
--
ALTER TABLE `enctables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `index`
--
ALTER TABLE `index`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `localised`
--
ALTER TABLE `localised`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `localisedmap`
--
ALTER TABLE `localisedmap`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recordmeta`
--
ALTER TABLE `recordmeta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recordrevisions`
--
ALTER TABLE `recordrevisions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `records`
--
ALTER TABLE `records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `relationships`
--
ALTER TABLE `relationships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `strings`
--
ALTER TABLE `strings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `traits`
--
ALTER TABLE `traits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_type`
--
ALTER TABLE `auth_type`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `chunks`
--
ALTER TABLE `chunks`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT for table `dc`
--
ALTER TABLE `dc`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dcclasses`
--
ALTER TABLE `dcclasses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `encmappings`
--
ALTER TABLE `encmappings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `encodings`
--
ALTER TABLE `encodings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enctables`
--
ALTER TABLE `enctables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `index`
--
ALTER TABLE `index`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'relates to strings:language', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `localised`
--
ALTER TABLE `localised`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `localisedmap`
--
ALTER TABLE `localisedmap`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `recordmeta`
--
ALTER TABLE `recordmeta`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recordrevisions`
--
ALTER TABLE `recordrevisions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `records`
--
ALTER TABLE `records`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `relationships`
--
ALTER TABLE `relationships`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `strings`
--
ALTER TABLE `strings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `traits`
--
ALTER TABLE `traits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'These are metadatas';

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
