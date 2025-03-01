-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20230508.a256228264
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Mar 01. 11:24
-- Kiszolgáló verziója: 10.4.24-MariaDB
-- PHP verzió: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `laravel_vue`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `banners`
--

CREATE TABLE `banners` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `szoveg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hatterszin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `betuszin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aktiv` tinyint(1) DEFAULT NULL,
  `sebeseg` int(11) DEFAULT NULL,
  `betustilus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `betutipus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `betumeret` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `banners`
--

INSERT INTO `banners` (`id`, `szoveg`, `hatterszin`, `betuszin`, `aktiv`, `sebeseg`, `betustilus`, `betutipus`, `betumeret`) VALUES
(1, '🎉📣Megnyitottuk  webáruházunkat! 📣🎉 🌹Gyönyörű rózsák közvetlen a termelőtől!🌹😍', '#191919', '#E8E8E8', 1, 24, 'normal', '\'\\\'Nunito\\\', sans-serif\'', 16);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cegs`
--

CREATE TABLE `cegs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cegnev` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adoszam` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cimId` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cimes`
--

CREATE TABLE `cimes` (
  `cim_id` bigint(20) UNSIGNED NOT NULL,
  `vasarlo_id` bigint(20) UNSIGNED NOT NULL,
  `szallitasi` tinyint(1) NOT NULL DEFAULT 0,
  `szamlazasi` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cimkes`
--

CREATE TABLE `cimkes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cim` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `szoveg` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hatterszin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `betuszin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `betustilus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `betutipus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `betumeret` int(11) DEFAULT NULL,
  `akciosarFt` int(11) DEFAULT NULL,
  `akciosarSzazalek` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `cimkes`
--

INSERT INTO `cimkes` (`id`, `cim`, `szoveg`, `hatterszin`, `betuszin`, `betustilus`, `betutipus`, `betumeret`, `akciosarFt`, `akciosarSzazalek`) VALUES
(15, 'Új termék', 'Új termék!', '#60A448', '#white', 'normal', '\'Nunito, sans-serif\'', 14, 0, 0),
(16, 'Új termék', 'Új termék!', '#60A448', '#white', 'normal', '\'Nunito, sans-serif\'', 14, 0, 0),
(17, '10% akció', '10% akció!', '#60A448', '#white', 'normal', '\'Nunito, sans-serif\'', 14, 2250, 10),
(18, '10% akció', '10% akció!', '#60A448', '#white', 'normal', '\'Nunito, sans-serif\'', 14, 2250, 10);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cims`
--

CREATE TABLE `cims` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `iranyitoszam` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepules` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `utca` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hazszam` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `cims`
--

INSERT INTO `cims` (`id`, `iranyitoszam`, `telepules`, `utca`, `hazszam`) VALUES
(1, '7855', 'Debrecen', 'Hajós', '3'),
(2, '7855', 'Debrecen', 'Hajós', '3'),
(3, '7855', 'Debrecen', 'Hajós', '3'),
(4, '7855', 'Szeged', 'Légió', '20'),
(5, '6770', 'Győr', 'Virág', '10'),
(6, '6782', 'Mórahalom', 'Mező', '12'),
(7, '6782', 'Mórahalom', 'Mező', '13');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dolgozo`
--

CREATE TABLE `dolgozo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uzletId` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `felhNev` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jelszo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vezNev` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kerNev` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lakcim` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `szulDatum` date NOT NULL,
  `utolsoBeDatum` date NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `dolgozoId` bigint(20) UNSIGNED NOT NULL,
  `vasarloId` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hireks`
--

CREATE TABLE `hireks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cim` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `leiras` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `datum` date DEFAULT NULL,
  `uzletId` bigint(20) UNSIGNED NOT NULL,
  `kepId` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `hireks`
--

INSERT INTO `hireks` (`id`, `cim`, `leiras`, `datum`, `uzletId`, `kepId`) VALUES
(1, 'cim', 'leiras', '2025-01-10', 1, 1),
(2, 'cim2', 'leiras2', '2025-01-10', 1, 2),
(3, 'cim3', 'leiras3', '2025-01-10', 1, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `karbantartas`
--

CREATE TABLE `karbantartas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `aktiv` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `karbantartas`
--

INSERT INTO `karbantartas` (`id`, `aktiv`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategorias`
--

CREATE TABLE `kategorias` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nevHu` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nevEn` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `leirasHu` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `leirasEn` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategorizals`
--

CREATE TABLE `kategorizals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `termekId` bigint(20) UNSIGNED NOT NULL,
  `kategoriaId` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kepeks`
--

CREATE TABLE `kepeks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kepNev` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kepUtvonal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kepLeiras` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `termekId` bigint(20) UNSIGNED DEFAULT NULL,
  `kategoriaId` bigint(20) UNSIGNED DEFAULT NULL,
  `uzletId` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `kepeks`
--

INSERT INTO `kepeks` (`id`, `kepNev`, `kepUtvonal`, `kepLeiras`, `termekId`, `kategoriaId`, `uzletId`) VALUES
(1, 'asfasf', 'https://i00.eu/img/605/466x466/7vkm65tw/356380.webp', 'asd', NULL, NULL, 1),
(2, 'asfd', 'https://i00.eu/img/605/466x466/7vkm65tw/356380.webp', 'asf', NULL, NULL, 1),
(3, 'asfdasf', 'https://i00.eu/img/605/466x466/7vkm65tw/356380.webp', 'asfasdf', NULL, NULL, 1),
(4, 'sdfasdf', 'https://i00.eu/img/605/466x466/7vkm65tw/356380.webp', 'asdfasdf', NULL, NULL, 1),
(12, 'sdfasdf', 'https://i00.eu/img/605/466x466/7vkm65tw/356380.webp', 'asdfasdf', NULL, NULL, 1),
(33, 'roses-3520094_960_720.jpg', '../public/img/uploads/roses-3520094_960_720.jpg', 'roses-3520094_960_720.jpg', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0000_00_00_000000_create_websockets_statistics_entries_table', 1),
(2, '01_2023_08_31_131751_uzlet', 1),
(3, '02_2023_09_01_082730_cim', 1),
(4, '03_2023_09_01_081807_ceg', 1),
(5, '04_2023_08_31_135541_vasarlo', 1),
(6, '05_2023_08_31_133930_dolgozo', 1),
(7, '06_2014_10_12_000000_create_users_table', 1),
(8, '07_2023_08_31_135440_felhasznalo', 1),
(9, '08_2023_09_01_084532_rendeles', 1),
(10, '08_2023_09_02_084532_create_cimkes_table', 1),
(11, '09_2023_08_31_090605_create_products_table', 1),
(12, '10_2023_09_01_093820_valaszt', 1),
(13, '11_2023_08_31_115928_kategoria', 1),
(14, '12_2023_08_31_130954_kepek', 1),
(15, '13_2023_08_31_123234_kategorizal', 1),
(16, '14_2023_08_31_132344_hirek', 1),
(17, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(18, '2014_10_12_100000_create_password_resets_table', 1),
(19, '2019_08_19_000000_create_failed_jobs_table', 1),
(20, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(21, '2024_02_07_174503_cimes', 1),
(22, '2024_10_17_184401_create_wishlists_table', 1),
(23, '2025_01_19_175833_create_banners_table', 1),
(24, '2025_01_21_075937_create_popups_table', 1),
(25, '2025_01_24_104729_create_karbantartas_table', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `popups`
--

CREATE TABLE `popups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cim` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `szoveg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kepid` bigint(20) UNSIGNED DEFAULT NULL,
  `aktiv` tinyint(1) DEFAULT NULL,
  `hatterszin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `betuszin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fotomutat` tinyint(1) DEFAULT NULL,
  `betustilus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `betutipus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `betumeret` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `popups`
--

INSERT INTO `popups` (`id`, `cim`, `szoveg`, `kepid`, `aktiv`, `hatterszin`, `betuszin`, `fotomutat`, `betustilus`, `betutipus`, `betumeret`) VALUES
(1, 'Boldog Nőnapot kívánunk!', 'Ezen a különleges napon szeretnénk kifejezni hálánkat és tiszteletünket mindazért a szeretetért, gondoskodásért és szépségért, amit nap mint nap hoztok az életünkbe. A magastörzsű rózsák eleganciája és bája tökéletesen tükrözi mindazt a csodát, amit Ti ké', 33, 1, '#191919', '#E8E8E8', 1, 'normal', '\'Nunito\', sans-serif', 24);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles`
--

CREATE TABLE `rendeles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `megjegyzes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fizetesiMod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ceges` tinyint(1) NOT NULL,
  `allapot` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rogzitDatum` timestamp NULL DEFAULT NULL,
  `vegosszeg` int(11) NOT NULL,
  `szallitas` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fk_vasarloId` bigint(20) UNSIGNED NOT NULL,
  `fk_userId` bigint(20) UNSIGNED DEFAULT NULL,
  `fk_szamlazasiCim` bigint(20) UNSIGNED NOT NULL,
  `fk_szallitasiCim` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `rendeles`
--

INSERT INTO `rendeles` (`id`, `megjegyzes`, `fizetesiMod`, `ceges`, `allapot`, `rogzitDatum`, `vegosszeg`, `szallitas`, `fk_vasarloId`, `fk_userId`, `fk_szamlazasiCim`, `fk_szallitasiCim`) VALUES
(1, 'Próba2', 'Utánvét', 0, 'Kiszállítás alatt', '2024-10-05 10:01:58', 2500, 'Személyes átvétel', 5, NULL, 6, NULL),
(2, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 13:19:05', 2500, 'Személyes átvétel', 5, NULL, 6, NULL),
(3, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 13:22:28', 2500, 'Személyes átvétel', 5, NULL, 6, NULL),
(4, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 13:26:53', 2500, 'Személyes átvétel', 5, NULL, 6, NULL),
(5, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 13:27:50', 2500, 'Személyes átvétel', 5, NULL, 6, NULL),
(6, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 13:28:18', 2500, 'Személyes átvétel', 5, NULL, 6, NULL),
(7, 'Próba2', 'Utánvét', 0, 'Teljesítve', '2024-10-05 13:31:37', 2500, 'Személyes átvétel', 5, NULL, 6, NULL),
(8, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 13:34:41', 5000, 'Személyes átvétel', 5, NULL, 6, NULL),
(9, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 13:38:48', 15000, 'Házhoz szállítás', 5, NULL, 6, 6),
(10, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 13:40:38', 10000, 'Házhoz szállítás', 5, NULL, 6, 6),
(11, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 15:17:50', 7500, 'Házhoz szállítás', 5, NULL, 6, 6),
(12, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 15:22:14', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(13, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 15:23:40', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(14, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 15:24:56', 7500, 'Házhoz szállítás', 5, NULL, 6, 6),
(15, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 15:30:32', 10000, 'Házhoz szállítás', 5, NULL, 6, 6),
(16, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 15:35:06', 10000, 'Házhoz szállítás', 5, NULL, 6, 6),
(17, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 15:38:25', 10000, 'Házhoz szállítás', 5, NULL, 6, 6),
(18, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 15:39:58', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(19, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 15:41:42', 10000, 'Házhoz szállítás', 5, NULL, 6, 6),
(20, 'Próba2', 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-05 15:44:10', 2500, 'Házhoz szállítás', 5, NULL, 6, 6),
(24, 'Próba2', 'Utánvét', 0, 'Teljesítve', '2025-09-17 13:45:02', 10000, 'Házhoz szállítás', 5, NULL, 6, 7),
(25, NULL, 'Utánvét', 0, 'Feldolgozás alatt', '2025-08-19 13:52:08', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(26, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(27, NULL, 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-07 13:54:44', 5000, 'Házhoz szállítás', 5, NULL, 6, 7),
(28, NULL, 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-07 13:55:53', 5000, 'Személyes átvétel', 5, NULL, 6, 7),
(29, NULL, 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-07 13:57:20', 5000, 'Személyes átvétel', 5, NULL, 6, 7),
(30, NULL, 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-07 13:58:27', 5000, 'Személyes átvétel', 5, NULL, 6, 7),
(31, NULL, 'Utánvét', 0, 'Feldolgozás alatt', '2024-10-08 14:00:36', 7500, 'Személyes átvétel', 5, NULL, 6, 7),
(32, NULL, 'Előre utalás', 0, 'Utalás ellenőrzése', '2024-10-08 14:11:17', 5000, 'Személyes átvétel', 5, NULL, 6, 7),
(33, 'uizop', 'Előre utalás', 0, 'Utalás ellenőrzése', '2024-10-08 14:15:03', 5000, 'Személyes átvétel', 5, NULL, 6, 7),
(34, 'uizopgg', 'Előre utalás', 0, 'Utalás ellenőrzése', '2024-10-08 14:16:56', 5000, 'Személyes átvétel', 5, NULL, 6, 7),
(35, 'uizopgg', 'Előre utalás', 0, 'Utalás ellenőrzése', '2024-10-08 14:19:13', 5000, 'Személyes átvétel', 5, NULL, 6, 7),
(36, 'uizopgg', 'Előre utalás', 0, 'Utalás ellenőrzése', '2024-10-08 14:20:57', 2500, 'Személyes átvétel', 5, NULL, 6, 7),
(37, 'uizopgg', 'Előre utalás', 0, 'Utalás ellenőrzése', '2024-10-08 14:22:29', 5000, 'Személyes átvétel', 5, NULL, 6, 7),
(38, 'uizopgg', 'Előre utalás', 0, 'Utalás ellenőrzése', '2024-10-08 14:23:09', 2500, 'Személyes átvétel', 5, NULL, 6, 7),
(39, 'uizopgg', 'Előre utalás', 0, 'Utalás ellenőrzése', '2024-10-08 14:25:03', 5000, 'Személyes átvétel', 5, NULL, 6, 7),
(40, 'uizopgg', 'Előre utalás', 0, 'Utalás ellenőrzése', '2025-10-01 14:27:45', 2500, 'Személyes átvétel', 5, NULL, 6, 7),
(41, 'uizopgg', 'Előre utalás', 0, 'Utalás ellenőrzése', '2025-03-05 16:32:36', 2500, 'Személyes átvétel', 5, NULL, 6, 7),
(42, 'uizopgg', 'Előre utalás', 0, 'Utalás ellenőrzése', '2025-02-05 16:36:23', 2500, 'Személyes átvétel', 5, NULL, 6, 7),
(43, NULL, 'Utánvét', 0, 'Teljesítve', '2025-01-15 16:37:10', 5000, 'Házhoz szállítás', 5, NULL, 6, 7),
(48, 'Kérem nyomja a kapucsengőt!', 'Utánvét', 0, 'Feldolgozás alatt', '2025-02-14 17:25:07', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(49, 'Kérem nyomja a kapucsengőt!', 'Utánvét', 0, 'Feldolgozás alatt', '2025-02-14 17:29:46', 2500, 'Házhoz szállítás', 5, NULL, 6, 6),
(50, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(51, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(52, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(53, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(54, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(55, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(56, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(57, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(58, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(59, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6),
(60, NULL, 'Utánvét', 0, 'Teljesítve', '2025-10-15 13:53:43', 5000, 'Házhoz szállítás', 5, NULL, 6, 6);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termeks`
--

CREATE TABLE `termeks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nevHu` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nevEn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ar` int(11) NOT NULL,
  `akciosar` int(11) DEFAULT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `leirasHu` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `leirasEn` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `szin` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keszlet` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `cimkeId` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `termeks`
--

INSERT INTO `termeks` (`id`, `nevHu`, `nevEn`, `ar`, `akciosar`, `img`, `url`, `leirasHu`, `leirasEn`, `szin`, `color`, `keszlet`, `created_at`, `updated_at`, `cimkeId`) VALUES
(1, 'Mr. Lincolna', 'Mr. Lincolna', 2500, NULL, '../resources/assets/kepek/lincoln.jpg', '', 'Piros tearózsaa', 'Red tea rose', 'Piros', 'RED', 88, NULL, '2025-02-15 19:01:04', 18),
(2, 'Bianca', 'Bianca', 2500, NULL, '../resources/assets/kepek/bianca.jpg\r\n', '', '', '', 'Fehér', 'White', 74, NULL, '2025-02-15 19:01:04', 17),
(3, 'Monica', 'Monica', 2500, NULL, '../resources/assets/kepek/monica.jpg\r\n', '', '', '', 'Narancssárga', 'Orange', 58, NULL, '2024-10-08 14:49:51', NULL),
(4, 'Caresse', 'Caresse', 2500, NULL, '../resources/assets/kepek/caresse.jpg\r\n', '', '', '', 'Rózsaszín', 'Pink', 95, NULL, '2024-10-05 15:41:42', NULL),
(5, 'Golden Leader', 'Golden Leader', 2500, NULL, '../resources/assets/kepek/golden.jpg\r\n', '', '', '', 'Citromsárga', 'Yellow', 90, NULL, '2024-10-07 13:58:27', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `lastLogin` date DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `dolgozoId` bigint(20) UNSIGNED DEFAULT NULL,
  `vasarloId` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `userName`, `password`, `address`, `birthDate`, `lastLogin`, `admin`, `email`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`, `dolgozoId`, `vasarloId`) VALUES
(1, 'Szűcs Tímea', NULL, '$2y$10$TPh4sGGHeTG3Izzha9HHDu68LQ5gz3HK3koxM4hWRNQxKRLiU0kDm', NULL, NULL, NULL, NULL, 'szucstimea02@gmail.com', NULL, NULL, '2024-09-01 13:04:33', '2024-09-01 13:04:33', NULL, NULL),
(2, 'Szűcs Tímea', NULL, '$2y$10$biM3tRGFNMBHXQ2iwxFfO.qw1QI4fx7kh8TAAVde7CXB/7xDv6e2S', NULL, NULL, NULL, NULL, 'szucsmeja@gmail.com', NULL, NULL, '2024-09-01 13:16:10', '2024-09-01 13:16:10', NULL, NULL),
(16, 'Csonka Csaba', NULL, '$2y$10$wFV0TGTkbjBr1cs52fQSA.1IwMvatH0gq0UQb6AgAMJ1Ss443bBG.', NULL, NULL, NULL, 1, 'csonkacsaba1986@gmail.com', '2024-09-20 17:10:06', NULL, '2024-09-20 17:09:46', '2024-09-20 17:10:06', NULL, NULL),
(48, 'Csonka Csaba', NULL, '$2y$10$Cf2qmpVdrRPscT27xbR.qe0H4zryd.bPhu9Quz3osXHjq45sd4v4e', NULL, NULL, NULL, NULL, 'conkacabi@gmail.com', '2024-10-07 14:20:04', NULL, '2024-10-07 14:18:55', '2024-10-07 14:20:04', NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `uzlets`
--

CREATE TABLE `uzlets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bemutatkozasHu` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bemutatkozasEn` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adoszam` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cegjegyzekszam` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iranyitoszam` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telepules` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hazszam` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utca` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankszamlaszam` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `swiftbic` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `uzlets`
--

INSERT INTO `uzlets` (`id`, `nev`, `bemutatkozasHu`, `bemutatkozasEn`, `email`, `tel`, `adoszam`, `cegjegyzekszam`, `iranyitoszam`, `telepules`, `hazszam`, `utca`, `bank`, `bankszamlaszam`, `iban`, `swiftbic`) VALUES
(1, 'nev', 'bemutatkozasHu', 'bemutatkozasEn', 'email', 'telr6511112', 'adoszam11', 'cegjegyzekszam1', 'iranyitoszam', 'telepules', 'hazszam', 'utca', 'bank neve11', 'bankszamlaszam1', 'IBAN111', 'SWIFTBIC111');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `valaszts`
--

CREATE TABLE `valaszts` (
  `mennyiseg` int(11) DEFAULT NULL,
  `kedvezmeny` int(11) DEFAULT NULL,
  `rendeles_id` bigint(20) UNSIGNED NOT NULL,
  `termek_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `valaszts`
--

INSERT INTO `valaszts` (`mennyiseg`, `kedvezmeny`, `rendeles_id`, `termek_id`) VALUES
(1, NULL, 1, 3),
(1, NULL, 2, 3),
(1, NULL, 3, 3),
(1, NULL, 4, 3),
(1, NULL, 5, 3),
(1, NULL, 6, 3),
(1, NULL, 7, 3),
(1, NULL, 8, 2),
(1, NULL, 8, 4),
(2, NULL, 9, 3),
(4, NULL, 9, 1),
(2, NULL, 10, 5),
(2, NULL, 10, 4),
(1, NULL, 11, 3),
(1, NULL, 11, 1),
(1, NULL, 11, 4),
(1, NULL, 12, 3),
(1, NULL, 12, 1),
(1, NULL, 13, 3),
(1, NULL, 13, 1),
(2, NULL, 14, 1),
(1, NULL, 14, 2),
(2, NULL, 15, 3),
(2, NULL, 15, 2),
(2, NULL, 16, 2),
(2, NULL, 16, 3),
(2, NULL, 17, 2),
(2, NULL, 17, 3),
(2, NULL, 18, 3),
(2, NULL, 19, 3),
(2, NULL, 19, 4),
(1, NULL, 20, 2),
(2, NULL, 24, 3),
(2, NULL, 24, 1),
(2, NULL, 25, 5),
(2, NULL, 26, 2),
(2, NULL, 27, 2),
(2, NULL, 28, 2),
(2, NULL, 29, 3),
(2, NULL, 30, 5),
(3, NULL, 31, 2),
(2, NULL, 32, 3),
(2, NULL, 33, 3),
(2, NULL, 34, 3),
(2, NULL, 35, 3),
(1, NULL, 36, 3),
(2, NULL, 37, 3),
(1, NULL, 38, 3),
(2, NULL, 39, 2),
(1, NULL, 40, 3),
(1, NULL, 41, 3),
(1, NULL, 42, 3),
(2, NULL, 43, 3),
(2, NULL, 48, 2),
(1, NULL, 49, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vasarlos`
--

CREATE TABLE `vasarlos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefonszam` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cegId` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `vasarlos`
--

INSERT INTO `vasarlos` (`id`, `nev`, `email`, `telefonszam`, `cegId`) VALUES
(1, 'vasarlo', 'vasarlo@gmail.hu', '2066698', NULL),
(2, 'Szűcs Tímea', 'szucstimea@gmail.com', '0123', NULL),
(3, 'Szűcs Tímea', 'szucstimea02@gmail.com', '06201234567', NULL),
(4, 'Csonka Csaba', 'csonkacsaba1986@gmail.com', '06306417604', NULL),
(5, 'Csonka Csaba', 'conkacabi@gmail.com', '06306417604', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `websockets_statistics_entries`
--

CREATE TABLE `websockets_statistics_entries` (
  `id` int(10) UNSIGNED NOT NULL,
  `app_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `peak_connection_count` int(11) NOT NULL,
  `websocket_message_count` int(11) NOT NULL,
  `api_message_count` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `wishlists`
--

CREATE TABLE `wishlists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `wishlists`
--

INSERT INTO `wishlists` (`id`, `user_id`, `product_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(4, 16, 4),
(62, 48, 4);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `cegs`
--
ALTER TABLE `cegs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cimid` (`cimId`);

--
-- A tábla indexei `cimes`
--
ALTER TABLE `cimes`
  ADD KEY `cimes_cim_id_foreign` (`cim_id`),
  ADD KEY `cimes_vasarlo_id_foreign` (`vasarlo_id`);

--
-- A tábla indexei `cimkes`
--
ALTER TABLE `cimkes`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `cims`
--
ALTER TABLE `cims`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `dolgozo`
--
ALTER TABLE `dolgozo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uzletid` (`uzletId`);

--
-- A tábla indexei `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dolgId` (`dolgozoId`),
  ADD KEY `vasarlId` (`vasarloId`);

--
-- A tábla indexei `hireks`
--
ALTER TABLE `hireks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shopId` (`uzletId`),
  ADD KEY `photoId` (`kepId`);

--
-- A tábla indexei `karbantartas`
--
ALTER TABLE `karbantartas`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kategorias`
--
ALTER TABLE `kategorias`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kategorizals`
--
ALTER TABLE `kategorizals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tmekId` (`termekId`),
  ADD KEY `katId` (`kategoriaId`);

--
-- A tábla indexei `kepeks`
--
ALTER TABLE `kepeks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `terId` (`termekId`),
  ADD KEY `kategId` (`kategoriaId`),
  ADD KEY `uzlId` (`uzletId`);

--
-- A tábla indexei `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- A tábla indexei `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- A tábla indexei `popups`
--
ALTER TABLE `popups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `phoId` (`kepid`);

--
-- A tábla indexei `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vasarloid` (`fk_vasarloId`),
  ADD KEY `fk_userid` (`fk_userId`),
  ADD KEY `fk_szamlazasicim` (`fk_szamlazasiCim`),
  ADD KEY `fk_szallitasicim` (`fk_szallitasiCim`);

--
-- A tábla indexei `termeks`
--
ALTER TABLE `termeks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cimkeid` (`cimkeId`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `dolgozoid` (`dolgozoId`),
  ADD KEY `vasarloid` (`vasarloId`);

--
-- A tábla indexei `uzlets`
--
ALTER TABLE `uzlets`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `valaszts`
--
ALTER TABLE `valaszts`
  ADD KEY `valaszts_rendeles_id_foreign` (`rendeles_id`),
  ADD KEY `valaszts_termek_id_foreign` (`termek_id`);

--
-- A tábla indexei `vasarlos`
--
ALTER TABLE `vasarlos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vasarlos_email_unique` (`email`),
  ADD KEY `cegid` (`cegId`);

--
-- A tábla indexei `websockets_statistics_entries`
--
ALTER TABLE `websockets_statistics_entries`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wishlists_user_id_foreign` (`user_id`),
  ADD KEY `wishlists_product_id_foreign` (`product_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `banners`
--
ALTER TABLE `banners`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `cegs`
--
ALTER TABLE `cegs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `cimkes`
--
ALTER TABLE `cimkes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `cims`
--
ALTER TABLE `cims`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `dolgozo`
--
ALTER TABLE `dolgozo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `hireks`
--
ALTER TABLE `hireks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `karbantartas`
--
ALTER TABLE `karbantartas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `kategorias`
--
ALTER TABLE `kategorias`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kategorizals`
--
ALTER TABLE `kategorizals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kepeks`
--
ALTER TABLE `kepeks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT a táblához `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT a táblához `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `popups`
--
ALTER TABLE `popups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT a táblához `termeks`
--
ALTER TABLE `termeks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT a táblához `uzlets`
--
ALTER TABLE `uzlets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `vasarlos`
--
ALTER TABLE `vasarlos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `websockets_statistics_entries`
--
ALTER TABLE `websockets_statistics_entries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cegs`
--
ALTER TABLE `cegs`
  ADD CONSTRAINT `cimid` FOREIGN KEY (`cimId`) REFERENCES `cims` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `cimes`
--
ALTER TABLE `cimes`
  ADD CONSTRAINT `cimes_cim_id_foreign` FOREIGN KEY (`cim_id`) REFERENCES `cims` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cimes_vasarlo_id_foreign` FOREIGN KEY (`vasarlo_id`) REFERENCES `vasarlos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `dolgozo`
--
ALTER TABLE `dolgozo`
  ADD CONSTRAINT `uzletid` FOREIGN KEY (`uzletId`) REFERENCES `uzlets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD CONSTRAINT `dolgId` FOREIGN KEY (`dolgozoId`) REFERENCES `dolgozo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vasarlId` FOREIGN KEY (`vasarloId`) REFERENCES `vasarlos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `hireks`
--
ALTER TABLE `hireks`
  ADD CONSTRAINT `photoId` FOREIGN KEY (`kepId`) REFERENCES `kepeks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shopId` FOREIGN KEY (`uzletId`) REFERENCES `uzlets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `kategorizals`
--
ALTER TABLE `kategorizals`
  ADD CONSTRAINT `katId` FOREIGN KEY (`kategoriaId`) REFERENCES `kategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tmekId` FOREIGN KEY (`termekId`) REFERENCES `termeks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `kepeks`
--
ALTER TABLE `kepeks`
  ADD CONSTRAINT `kategId` FOREIGN KEY (`kategoriaId`) REFERENCES `kategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `terId` FOREIGN KEY (`termekId`) REFERENCES `termeks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `uzlId` FOREIGN KEY (`uzletId`) REFERENCES `uzlets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `popups`
--
ALTER TABLE `popups`
  ADD CONSTRAINT `phoId` FOREIGN KEY (`kepid`) REFERENCES `kepeks` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Megkötések a táblához `rendeles`
--
ALTER TABLE `rendeles`
  ADD CONSTRAINT `fk_szallitasicim` FOREIGN KEY (`fk_szallitasiCim`) REFERENCES `cims` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_szamlazasicim` FOREIGN KEY (`fk_szamlazasiCim`) REFERENCES `cims` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_userid` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_vasarloid` FOREIGN KEY (`fk_vasarloId`) REFERENCES `vasarlos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `termeks`
--
ALTER TABLE `termeks`
  ADD CONSTRAINT `cimkeid` FOREIGN KEY (`cimkeId`) REFERENCES `cimkes` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `dolgozoid` FOREIGN KEY (`dolgozoId`) REFERENCES `dolgozo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vasarloid` FOREIGN KEY (`vasarloId`) REFERENCES `vasarlos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `valaszts`
--
ALTER TABLE `valaszts`
  ADD CONSTRAINT `valaszts_rendeles_id_foreign` FOREIGN KEY (`rendeles_id`) REFERENCES `rendeles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `valaszts_termek_id_foreign` FOREIGN KEY (`termek_id`) REFERENCES `termeks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `vasarlos`
--
ALTER TABLE `vasarlos`
  ADD CONSTRAINT `cegid` FOREIGN KEY (`cegId`) REFERENCES `cegs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `termeks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlists_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
