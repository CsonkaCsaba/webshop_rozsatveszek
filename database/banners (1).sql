-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 23. 14:49
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

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
  `id` int(11) NOT NULL,
  `szoveg` varchar(255) DEFAULT NULL,
  `hatterszin` varchar(255) DEFAULT NULL,
  `betuszin` varchar(255) DEFAULT NULL,
  `aktiv` tinyint(1) DEFAULT NULL,
  `sebesseg` int(11) DEFAULT NULL,
  `betustilus` varchar(255) DEFAULT NULL,
  `betutipus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `banners`
--

INSERT INTO `banners` (`id`, `szoveg`, `hatterszin`, `betuszin`, `aktiv`, `sebesseg`, `betustilus`, `betutipus`) VALUES
(1, '🎉📣Megnyitottuk  webáruházunkat! 📣🎉 🌹Gyönyörű rózsák közvetlen a termelőtől!🌹😍', '#191919', '#E8E8E8', 1, 24, 'normal', '\'Nunito\', sans-serif');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
