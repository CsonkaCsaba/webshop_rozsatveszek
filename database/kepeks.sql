-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 23. 14:52
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
-- Tábla szerkezet ehhez a táblához `kepeks`
--

CREATE TABLE `kepeks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kepNev` varchar(255) DEFAULT NULL,
  `kepUtvonal` varchar(255) DEFAULT NULL,
  `kepLeiras` varchar(255) DEFAULT NULL,
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

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kepeks`
--
ALTER TABLE `kepeks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `terId` (`termekId`),
  ADD KEY `kategId` (`kategoriaId`),
  ADD KEY `uzlId` (`uzletId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kepeks`
--
ALTER TABLE `kepeks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kepeks`
--
ALTER TABLE `kepeks`
  ADD CONSTRAINT `kategId` FOREIGN KEY (`kategoriaId`) REFERENCES `kategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `terId` FOREIGN KEY (`termekId`) REFERENCES `termeks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `uzlId` FOREIGN KEY (`uzletId`) REFERENCES `uzlets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
