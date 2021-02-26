CREATE DATABASE  IF NOT EXISTS `orders_db` ;
USE `orders_db`;
--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;


CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;

INSERT INTO `clients` VALUES (1,'Helio 1','Vasco 1','heliovasco@hotmail.com 1','04140000000 1'),(42,'David','Jones','david@hotmail.com','04140000000');

UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(45) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` float NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`id`,`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;

INSERT INTO `order_items` VALUES (60,'48',1,11,11),(61,'48',2,22,44),(62,'49',1,11,11),(63,'49',2,22,44),(64,'49',1,100,100);

UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_number` varchar(45) NOT NULL,
  `client_id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;

INSERT INTO `orders` VALUES (48,'123456',1,'2014-01-02 10:28:57','Address test',33),(49,'123456',1,'2014-01-02 10:28:57','Address test 22',155);

UNLOCK TABLES;

