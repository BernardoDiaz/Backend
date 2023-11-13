-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: proyectlrd
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `degrees`
--

DROP TABLE IF EXISTS `degrees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `degrees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `id_seccion` int DEFAULT NULL,
  `id_level` int DEFAULT NULL,
  `year` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_seccion` (`id_seccion`),
  KEY `id_level` (`id_level`),
  CONSTRAINT `degrees_ibfk_1` FOREIGN KEY (`id_seccion`) REFERENCES `seccions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `degrees_ibfk_2` FOREIGN KEY (`id_level`) REFERENCES `levels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `degrees`
--

LOCK TABLES `degrees` WRITE;
/*!40000 ALTER TABLE `degrees` DISABLE KEYS */;
INSERT INTO `degrees` VALUES (1,'Kinder 4',1,2,'2023-11-13','2023-11-13 06:41:05','2023-11-13 06:41:05');
/*!40000 ALTER TABLE `degrees` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insertar_asignaturas` AFTER INSERT ON `degrees` FOR EACH ROW BEGIN
    DECLARE nivel INT;
    DECLARE id_level INT;

    -- Obtener el nivel del nuevo grado
    SET nivel = NEW.id_level;

    -- Mapear el nivel a un ID específico 
    CASE nivel
        WHEN 1 THEN SET id_level = 1;
        WHEN 2 THEN SET id_level = 2;
        WHEN 3 THEN SET id_level = 3;
        WHEN 4 THEN SET id_level = 4;
        WHEN 5 THEN SET id_level = 5;
        WHEN 6 THEN SET id_level = 6;
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Nivel no válido';
    END CASE;

    -- Insertar las asignaturas relacionadas con este grado según el nivel
    CASE id_level
        WHEN 1 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp());
        WHEN 2 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES 
                ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 2', NEW.id, current_timestamp(), current_timestamp());
        WHEN 3 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES 
                ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 2', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 3', NEW.id, current_timestamp(), current_timestamp());
        WHEN 4 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES 
                ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 2', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 3', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 4', NEW.id, current_timestamp(), current_timestamp());
        WHEN 5 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES 
                ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 2', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 3', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 4', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 5', NEW.id, current_timestamp(), current_timestamp());
        WHEN 6 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES 
                ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 2', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 3', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 4', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 5', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 6', NEW.id, current_timestamp(), current_timestamp());
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Nivel no válido';
    END CASE;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-13  7:24:16
