-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ct466
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `comment`
--

create database `ct466`;
use `ct466`;

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `comment_content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,'Bạn cần phải học vững cấu trúc C: vòng lặp, rẻ nhánh,... Và quan trọng nhất là con trỏ trong C','2022-01-10 04:54:13','2022-01-20 17:01:24',1,'2022-01-20 17:01:24'),(2,3,'Day la 1 comment','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(3,2,'Đây là comment của post 1','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(4,4,'Đây là comment của post 2','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(5,5,'Đây là comment của post 3','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(6,6,'Đây là comment của post 4','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(7,7,'Đây là comment của post 5','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(8,8,'Đây là comment của post 6','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(9,9,'Đây là comment của post 7','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(10,10,'Đây là comment của post 8','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(11,6,'Đây là comment của subject 1','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(12,8,'Đây là comment của subject 2','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(13,6,'Đây là comment của subject 3','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL),(14,7,'Đây là comment của subject 4','2022-01-19 11:38:59','2022-01-19 18:38:59',0,NULL);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_code` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `department_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `department_name` (`department_name`,`department_code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


ALTER TABLE `department` MODIFY  `department_code` varchar(10);
--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'DI','Công Nghệ Thông Tin Và Truyền Thông','2022-01-10 04:54:13','2022-01-10 18:54:13'),(2,'CA','Phát triển nông thôn','2022-01-20 11:14:19','2022-01-20 18:14:19'),(3,'DA','Công nghệ sinh học','2022-01-20 11:16:01','2022-01-20 18:16:01');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `document_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `document_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `document_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `document_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (1,1,1,'Tài liệu lập trình căn bản A','http://www.cit.ctu.edu.vn/decuong/CT101.pdf','2022-01-24 09:25:51','2022-01-24 09:25:51',0,NULL),(2,2,1,'Tài liệu mạng máy tính','ThisisLink','2022-01-24 09:25:51','2022-01-24 09:25:51',0,NULL),(3,3,1,'Tài liệu toán rời rạc','ThisisLink','2022-01-24 09:25:51','2022-01-24 09:25:51',0,NULL),(4,4,1,'Tài liệu công nghệ web','ThisisLink','2022-01-24 09:25:51','2022-01-24 09:25:51',0,NULL),(5,5,1,'Tài liệu nhập môn lập trình web','ThisisLink','2022-01-24 09:25:51','2022-01-24 09:25:51',0,NULL),(6,6,2,'Tài liệu giám sát cây trồng','ThisisLink','2022-01-24 09:25:51','2022-01-24 09:25:51',0,NULL),(7,7,2,'Tài liệu phát triển giống cây trồng','ThisisLink','2022-01-24 09:25:51','2022-01-24 09:25:51',0,NULL),(8,8,3,'Tài liệu hóa học cấp 3','ThisisLink','2022-01-24 09:25:51','2022-01-24 09:25:51',0,NULL),(9,9,3,'Tài liệu sinh cấp 3','ThisisLink','2022-01-24 09:25:51','2022-01-24 09:25:51',0,NULL),(10,10,3,'Tài liệu lí cấp 3','ThisisLink','2022-01-24 09:25:51','2022-01-24 09:25:51',0,NULL);
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `topic_id` int DEFAULT NULL,
  `post_title` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `post_content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `post_view` int DEFAULT '0',
  `is_accepted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,1,'Làm thế nào để code tốt hơn?','<p>Chào các bạn, mình làm sinh viên năm nhất khóa k47. Qua học kì II mình thấy choáng bởi không quen với lập trình. Các bạn cho mình xin kinh nghiệm học tốt, cảm ơn!<p>',0,1,'2022-01-10 04:54:13','2022-01-28 01:51:22',0,NULL),(2,2,1,'Làm thế nào để code 1 project nodejs?','<p>Lên mạng kiếm là xong</p>',6,1,'2022-01-10 04:54:13','2022-01-10 18:54:13',0,NULL),(3,3,1,'Làm thế nào để code 1 project javascript?','<p>Hỏi admin bạn ơi </p>',6,1,'2022-01-10 04:54:13','2022-01-10 18:54:13',0,NULL),(4,4,2,'Làm thế nào để nuôi ký sinh trùng?','<p>xem phim ký sinh trùng </p>',3,1,'2022-01-10 04:54:13','2022-01-10 18:54:13',0,NULL),(5,5,2,'Làm thế nào để mua được mồi câu cá?','<p>Chỉ cần ra tiệm</p>',7,1,'2022-01-10 04:54:13','2022-01-10 18:54:13',0,NULL),(6,6,3,'Cho 1 lít HCl tác dụng vs 0.48g Ag là như nào?','<p>Admin không giỏi hóa</p>',5,1,'2022-01-10 04:54:13','2022-01-10 18:54:13',0,NULL),(7,7,3,'Làm sao để học tốt 1 thứ gì đó?','<p>Nếu là gái đến đây ad dạy </p>',175,1,'2022-01-10 04:54:13','2022-01-10 18:54:13',0,NULL),(8,8,3,'Làm sao để vệ sinh ống nghiệm?','<p>Dùng nước</p>',454,1,'2022-01-10 04:54:13','2022-01-10 18:54:13',0,NULL);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_comment`
--

DROP TABLE IF EXISTS `post_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_comment` (
  `comment_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  KEY `comment_id` (`comment_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_comment_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `post_comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_comment`
--

LOCK TABLES `post_comment` WRITE;
/*!40000 ALTER TABLE `post_comment` DISABLE KEYS */;
INSERT INTO `post_comment` VALUES (1,1),(2,1),(3,1),(4,2),(5,3),(6,4),(7,5),(8,6),(9,7),(10,8);
/*!40000 ALTER TABLE `post_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` int DEFAULT NULL,
  `subject_code` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `subject_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subject_name` (`subject_name`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,1,'CT101','Lập Trình Căn Bản A','2022-01-10 04:54:13','2022-01-10 18:54:13'),(2,2,'KT428','Kỹ thuật đàm phán','2022-01-10 04:54:13','2022-01-10 18:54:13'),(3,3,'CS214','Vi sinh học thực phẩm','2022-01-10 04:54:13','2022-01-10 18:54:13'),(4,1,'CT176','Lập trình hướng đối tượng','2022-01-10 04:54:13','2022-01-10 18:54:13');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_comment`
--

DROP TABLE IF EXISTS `subject_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_comment` (
  `comment_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  KEY `comment_id` (`comment_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `subject_comment_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `subject_comment_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_comment`
--

LOCK TABLES `subject_comment` WRITE;
/*!40000 ALTER TABLE `subject_comment` DISABLE KEYS */;
INSERT INTO `subject_comment` VALUES (11,1),(12,2),(13,3),(14,4);
/*!40000 ALTER TABLE `subject_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` int DEFAULT NULL,
  `topic_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `topic_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (1,1,'Forum','Nơi hỏi đáp các vấn đề tại khoa Công Nghệ Thông Tin và Truyền Thông','2022-01-10 04:54:13','2022-01-10 18:54:13',0,NULL),(2,2,'Forum','Nơi hỏi đáp các vấn đề tại khoa Phát triển nông thôn','2022-01-10 04:54:13','2022-01-10 18:54:13',0,NULL),(3,3,'Forum','Nơi hỏi đáp các vấn đề tại khoa Công nghệ sinh học','2022-01-10 04:54:13','2022-01-10 18:54:13',0,NULL);
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(9) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'user',
  `avatar_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` tinyint(1) DEFAULT '1',
  `birthday` date DEFAULT NULL,
  `phone` char(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`,`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jhin','jhin@gmail.com','$2a$10$OAEMa0VJshAWkitDR4D6tOQ66YDswCHdfTtTTJK13Q79SUB.qAgd6','moderator','https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-anime-cute.jpg',1,'2000-10-03','0869541258','529, Ngo Quyen, Dong Da, Ha Noi','2022-01-27 18:13:31','2022-01-28 01:13:31',0,NULL),(2,'Lee Sin','leesin@gmail.com','$2a$10$1rCI2RnOPiDxzEmDbRig4O0im6t6.Nswzg9krJ4sgI08E0HkiwIum','moderator','https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-anime-cute.jpg',1,'2000-10-03','0869541258','529, Ngo Quyen, Dong Da, Ha Noi','2022-01-27 18:16:06','2022-01-28 01:16:06',0,NULL),(3,'Yasuo','yasuo@gmail.com','$2a$10$s.RtM.t4TKdlJQXAMQxwbuglfYTaCsw.KeNMlZq352TzCQdJC/2Sm','moderator','https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-anime-cute.jpg',1,'2000-10-03','0869541258','529, Ngo Quyen, Dong Da, Ha Noi','2022-01-27 18:17:29','2022-01-28 01:17:29',0,NULL),(4,'Jinx','jinx@gmail.com','$2a$10$aoBlmDA4I3bb9Pb7ALE5S.PNL7p9oGOC5zCTzZe6q4wfQ.BpayShq','moderator','https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-anime-cute.jpg',1,'2000-10-03','0869541258','529, Ngo Quyen, Dong Da, Ha Noi','2022-01-27 18:17:52','2022-01-28 01:17:52',0,NULL),(5,'Aatrox','aatrox@gmail.com','$2a$10$JAip5ueYlYfQRNL4YkXGBuezvybYNKANgplae5RGv5WLNFsjJbKNC','admin','https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-anime-cute.jpg',1,'2000-10-03','0869541258','529, Ngo Quyen, Dong Da, Ha Noi','2022-01-27 18:18:57','2022-01-28 01:18:57',0,NULL),(6,'Aphelios','aphelios@gmail.com','$2a$10$jB9h3P61vZ7SJFWeF7g5oegIZ8BAtDpX1xc.o/f.eWHwLqyrkDoki','admin','https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-anime-cute.jpg',1,'2000-10-03','0869541258','529, Ngo Quyen, Dong Da, Ha Noi','2022-01-27 18:19:53','2022-01-28 01:19:53',0,NULL),(7,'Nidalee','nidalee@gmail.com','$2a$10$DbDK2SFY9y3zEmshgsS/..Qnd1f2HbZ3nIS4RFYmcEGNAbQXwgJce','user','https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-anime-cute.jpg',1,'2000-10-03','0869541258','529, Ngo Quyen, Dong Da, Ha Noi','2022-01-27 18:21:08','2022-01-28 01:21:08',0,NULL),(8,'Ashe','ashe@gmail.com','$2a$10$1h8hYPwVt6D1oT4zvRcWROrTjciH0E0frigJhVAf9qly4Tygq2Y9C','user','https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-anime-cute.jpg',1,'2000-10-03','0869541258','529, Ngo Quyen, Dong Da, Ha Noi','2022-01-27 18:21:56','2022-01-28 01:21:56',0,NULL),(9,'Samira','samira@gmail.com','$2a$10$K6EFnOwsTIaWIUVfS2OH5etPIKiuJB3U.RwQuyuX6ZJQCzQR5in1.','user','https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-anime-cute.jpg',1,'2000-10-03','0869541258','529, Ngo Quyen, Dong Da, Ha Noi','2022-01-27 18:23:13','2022-01-28 01:23:13',0,NULL),(10,'Riven','riven@gmail.com','$2a$10$yZ6Z/oZAgjY4qaospfyCoeGVy/RCxkgs2rhl1fDhSfmoCp2o7jCxC','user','https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-anime-cute.jpg',1,'2000-10-03','0869541258','529, Ngo Quyen, Dong Da, Ha Noi','2022-01-27 18:24:01','2022-01-28 01:24:01',0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_department`
--

DROP TABLE IF EXISTS `user_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_department` (
  `user_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  KEY `user_id` (`user_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `user_department_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_department_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_department`
--

LOCK TABLES `user_department` WRITE;
/*!40000 ALTER TABLE `user_department` DISABLE KEYS */;
INSERT INTO `user_department` VALUES (1,1),(2,1),(3,2),(4,3),(5,1),(6,2),(7,1),(8,2),(9,3),(10,1);
/*!40000 ALTER TABLE `user_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_subject`
--

DROP TABLE IF EXISTS `user_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_subject` (
  `user_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  `subject_score` float DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `user_id` (`user_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `user_subject_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_subject_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_subject`
--

LOCK TABLES `user_subject` WRITE;
/*!40000 ALTER TABLE `user_subject` DISABLE KEYS */;
INSERT INTO `user_subject` VALUES (1,1,9.5,'2022-01-27 18:21:08','2022-01-28 01:21:08'),(2,1,7.5,'2022-01-27 18:21:08','2022-01-28 01:21:08'),(3,2,4,'2022-01-27 18:21:08','2022-01-28 01:21:08'),(4,3,7.4,'2022-01-27 18:21:08','2022-01-28 01:21:08'),(5,4,6.4,'2022-01-27 18:21:08','2022-01-28 01:21:08'),(6,2,5.7,'2022-01-27 18:21:08','2022-01-28 01:21:08'),(7,1,9.5,'2022-01-27 18:21:08','2022-01-28 01:21:08'),(8,2,4.7,'2022-01-27 18:21:08','2022-01-28 01:21:08'),(9,3,7.4,'2022-01-27 18:21:08','2022-01-28 01:21:08'),(10,4,8.2,'2022-01-27 18:21:08','2022-01-28 01:21:08');
/*!40000 ALTER TABLE `user_subject` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-28 18:56:23
