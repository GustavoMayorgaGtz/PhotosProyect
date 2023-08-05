-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:8080
-- Tiempo de generación: 02-05-2023 a las 21:51:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `photorepublic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `image`
--

CREATE TABLE `image` (
  `idImage` int(11) NOT NULL,
  `pathCompress` varchar(255) NOT NULL,
  `pathOriginal` varchar(255) NOT NULL,
  `border` varchar(255) NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `userIdUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `image`
--

INSERT INTO `image` (`idImage`, `pathCompress`, `pathOriginal`, `border`, `comments`, `userIdUser`) VALUES
(1, './public/user_directory_1/1682969972514.jpg', './public/user_directory_1_original/1682969972521.jpg', 'Sin borde', NULL, 1),
(2, './public/user_directory_1/1682969972515.jpg', './public/user_directory_1_original/1682969972522.jpg', 'Sin borde', NULL, 1),
(3, './public/user_directory_1/1682969972516.jpg', './public/user_directory_1_original/1682969972523.jpg', 'Sin borde', NULL, 1),
(4, './public/user_directory_1/1682969972517.jpg', './public/user_directory_1_original/1682969972524.jpg', 'Sin borde', NULL, 1),
(5, './public/user_directory_1/1682969972518.jpg', './public/user_directory_1_original/1682969972525.jpg', 'Sin borde', NULL, 1),
(6, './public/user_directory_1/1682969972519.jpg', './public/user_directory_1_original/1682969972527.jpg', 'Sin borde', NULL, 1),
(7, './public/user_directory_1/1682969972520.jpg', './public/user_directory_1_original/1682969972528.jpg', 'Sin borde', NULL, 1),
(8, './public/user_directory_1/1682969972521.jpg', './public/user_directory_1_original/1682969972529.jpg', 'Sin borde', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  `type` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`idUser`, `name`, `id`, `type`) VALUES
(1, 'Gustavo Mayorga Gutierrez', 'Gustavo_Mayorga', 1),
(2, 'Sofia Mayorga Gutierrez', 'Sofia_Mayorga', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idCategoria`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`idImage`),
  ADD KEY `FK_f568970d1a91cd7676061879164` (`userIdUser`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `IDX_cace4a159ff9f2512dd4237376` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `image`
--
ALTER TABLE `image`
  MODIFY `idImage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD CONSTRAINT `categorias_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `user` (`idUser`);

--
-- Filtros para la tabla `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `FK_f568970d1a91cd7676061879164` FOREIGN KEY (`userIdUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
