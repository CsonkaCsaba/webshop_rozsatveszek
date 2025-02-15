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
-- Tábla szerkezet ehhez a táblához `popups`
--

CREATE TABLE `popups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cim` varchar(255) DEFAULT NULL,
  `szoveg` mediumtext DEFAULT NULL,
  `kepId` bigint(20) UNSIGNED NOT NULL,
  `aktiv` tinyint(1) DEFAULT NULL,
  `hatterszin` varchar(255) DEFAULT NULL,
  `betuszin` varchar(255) DEFAULT NULL,
  `fotomutat` tinyint(1) DEFAULT NULL,
  `betustilus` varchar(255) DEFAULT NULL,
  `betutipus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `popups`
--

INSERT INTO `popups` (`id`, `cim`, `szoveg`, `kepId`, `aktiv`, `hatterszin`, `betuszin`, `fotomutat`, `betustilus`, `betutipus`) VALUES
(1, 'Boldog Nőnapot kívánunk!', 'Ezen a különleges napon szeretnénk kifejezni hálánkat és tiszteletünket mindazért a szeretetért, gondoskodásért és szépségért, amit nap mint nap hoztok az életünkbe. A magastörzsű rózsák eleganciája és bája tökéletesen tükrözi mindazt a csodát, amit Ti képviseltek.\r\n\r\nLepjétek meg magatokat vagy szeretteiteket egy gyönyörű rózsával, és ünnepeljük együtt a nőiesség varázsát!', 33, 1, '#191919', '#E8E8E8', 1, 'normal', '\'Nunito\', sans-serif');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `popups`
--
ALTER TABLE `popups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `photo` (`kepId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `popups`
--
ALTER TABLE `popups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `popups`
--
ALTER TABLE `popups`
  ADD CONSTRAINT `photo` FOREIGN KEY (`kepId`) REFERENCES `kepeks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
