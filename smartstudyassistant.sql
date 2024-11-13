/*
 Navicat Premium Data Transfer

 Source Server         : SmartStudyAssistant
 Source Server Type    : MySQL
 Source Server Version : 80040 (8.0.40)
 Source Host           : localhost:3306
 Source Schema         : smartstudyassistant

 Target Server Type    : MySQL
 Target Server Version : 80040 (8.0.40)
 File Encoding         : 65001

 Date: 13/11/2024 15:15:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `expense_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `expend` decimal(10, 2) NULL DEFAULT NULL COMMENT '支出',
  `income` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '收入',
  `sort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '类别',
  `date` datetime NULL DEFAULT NULL COMMENT '消费日期',
  `remark` text CHARACTER SET tis620 COLLATE tis620_thai_ci NULL COMMENT '备注',
  PRIMARY KEY (`expense_id`) USING BTREE,
  INDEX `user_id2`(`user_id` ASC) USING BTREE,
  CONSTRAINT `user_id2` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------

-- ----------------------------
-- Table structure for accountdata
-- ----------------------------
DROP TABLE IF EXISTS `accountdata`;
CREATE TABLE `accountdata`  (
  `acc_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` date NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `expensetype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `incometype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `amount` decimal(10, 2) NULL DEFAULT NULL,
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  INDEX `userid2_1`(`user_id` ASC) USING BTREE,
  CONSTRAINT `userid2_1` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of accountdata
-- ----------------------------
INSERT INTO `accountdata` VALUES ('rec_1731409079159_127082', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '2024-11-11', 'income', NULL, '赠与', 8888.00, 'birthday');
INSERT INTO `accountdata` VALUES ('rec_1731414378682_987565', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '2024-11-12', 'expense', '饮食', NULL, 9.00, '晚餐');
INSERT INTO `accountdata` VALUES ('rec_1731414405946_368376', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '2024-11-11', 'expense', '娱乐', NULL, 12.00, 'KTV');
INSERT INTO `accountdata` VALUES ('rec_1731420260994_270903', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '2024-11-12', 'income', NULL, '10月工资', 900.00, '10月工资');
INSERT INTO `accountdata` VALUES ('rec_1731426434770_527630', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '2024-11-12', 'expense', '出行', NULL, 7.50, 'subway');
INSERT INTO `accountdata` VALUES ('rec_1731426535254_466957', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '2024-11-12', 'expense', '饮食', NULL, 100.00, 'hotpot');
INSERT INTO `accountdata` VALUES ('rec_1731480574634_770518', '7038d900-8773-4312-a8b4-1ff906d6783d', '2024-11-13', 'income', NULL, '工资', 78.00, '');
INSERT INTO `accountdata` VALUES ('rec_1731480613466_346110', '7038d900-8773-4312-a8b4-1ff906d6783d', '2024-11-13', 'expense', '饮食', NULL, 99.00, '');
INSERT INTO `accountdata` VALUES ('rec_1731481576532_61367', '43acd90c-05d6-4c1f-8acf-897179a1d956', '2024-11-13', 'expense', '出行', NULL, 88.00, '');
INSERT INTO `accountdata` VALUES ('rec_1731481825594_87638', '43acd90c-05d6-4c1f-8acf-897179a1d956', '2024-11-13', 'income', NULL, '工资', 88.00, '');
INSERT INTO `accountdata` VALUES ('rec_1731481912601_702047', '43acd90c-05d6-4c1f-8acf-897179a1d956', '2024-11-13', 'expense', '饮食', NULL, 45.00, '');
INSERT INTO `accountdata` VALUES ('rec_1731481928917_827756', '43acd90c-05d6-4c1f-8acf-897179a1d956', '2024-11-13', 'income', NULL, '工资', 65.00, '');

-- ----------------------------
-- Table structure for contacts
-- ----------------------------
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts`  (
  `contact_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '姓名',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '性别',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话',
  `job` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '职位',
  `group` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分组',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮件',
  `QQnum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'qq',
  PRIMARY KEY (`contact_id`) USING BTREE,
  INDEX `user_id4`(`user_id` ASC) USING BTREE,
  INDEX `teacher_name`(`name` ASC) USING BTREE,
  CONSTRAINT `user_id4` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contacts
-- ----------------------------

-- ----------------------------
-- Table structure for diet
-- ----------------------------
DROP TABLE IF EXISTS `diet`;
CREATE TABLE `diet`  (
  `diet_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类',
  `food_item` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '食物项',
  `date` datetime NULL DEFAULT NULL,
  `reminder` text CHARACTER SET ujis COLLATE ujis_japanese_ci NULL COMMENT '相关提醒',
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '已食用次数',
  `dietplan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '相关计划',
  PRIMARY KEY (`diet_id`) USING BTREE,
  INDEX `user_id3`(`user_id` ASC) USING BTREE,
  CONSTRAINT `user_id3` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of diet
-- ----------------------------

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note`  (
  `note_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '笔记名/标题',
  `course_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '对应课程名',
  `note_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标题',
  `note_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '内容',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `edit_time` datetime NULL DEFAULT NULL COMMENT '上次编辑时间',
  PRIMARY KEY (`note_name`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `class_name`(`course_name` ASC) USING BTREE,
  CONSTRAINT `class_name` FOREIGN KEY (`course_name`) REFERENCES `timetable` (`classname`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of note
-- ----------------------------

-- ----------------------------
-- Table structure for reminders
-- ----------------------------
DROP TABLE IF EXISTS `reminders`;
CREATE TABLE `reminders`  (
  `reminder_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `reminder_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '提醒内容',
  `reminder_time` datetime NULL DEFAULT NULL COMMENT '提醒时间',
  `is_completed` tinyint NULL DEFAULT NULL COMMENT '是否已经完成',
  `editime` datetime NULL DEFAULT NULL COMMENT '编辑时间（暂留',
  PRIMARY KEY (`reminder_id`) USING BTREE,
  INDEX `user_id1`(`user_id` ASC) USING BTREE,
  CONSTRAINT `user_id1` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reminders
-- ----------------------------

-- ----------------------------
-- Table structure for timetable
-- ----------------------------
DROP TABLE IF EXISTS `timetable`;
CREATE TABLE `timetable`  (
  `timetable_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `classname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '课程名',
  `teacher_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '老师名',
  `classtime` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '上课时间（小节',
  `start_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '开始周',
  `end_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '结束周',
  `weekday` int NOT NULL COMMENT '周几',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '上课地点',
  PRIMARY KEY (`timetable_id`) USING BTREE,
  INDEX `user_id5`(`user_id` ASC) USING BTREE,
  INDEX `teacher_name`(`teacher_name` ASC) USING BTREE,
  INDEX `course_name`(`classname` ASC) USING BTREE,
  CONSTRAINT `teacher_name1` FOREIGN KEY (`teacher_name`) REFERENCES `contacts` (`name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `user_id5` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of timetable
-- ----------------------------

-- ----------------------------
-- Table structure for userdata
-- ----------------------------
DROP TABLE IF EXISTS `userdata`;
CREATE TABLE `userdata`  (
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '唯一区别不同用户的方式',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名(注册与登录时使用',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '昵称(用户界面可显示',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '性别\n(仅限男/女',
  `age` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '年龄',
  `school` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '学校',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '个人描述',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userdata
-- ----------------------------
INSERT INTO `userdata` VALUES ('43305a9c3c50', 'tqq', '258', 'q', '男', '20', '四川大学', 'wuwuwu');
INSERT INTO `userdata` VALUES ('43acd90c-05d6-4c1f-8acf-897179a1d956', 'gin', 'G', '1234', '未知', '999', 'SCU', '默认简介');
INSERT INTO `userdata` VALUES ('7038d900-8773-4312-a8b4-1ff906d6783d', 'gin', '默认昵称', '1234', '未知', '未知', '未知', '默认简介');
INSERT INTO `userdata` VALUES ('a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', 'y', '123', 't', '女', '18', '四川大学', 'lalala');

SET FOREIGN_KEY_CHECKS = 1;
