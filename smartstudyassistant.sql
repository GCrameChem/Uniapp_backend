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

 Date: 10/12/2024 18:10:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
INSERT INTO `accountdata` VALUES ('rec_1732548313896_320314', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '2024-11-24', 'expense', '饮食', NULL, 7.00, '奶茶');
INSERT INTO `accountdata` VALUES ('rec_1732554079392_371605', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '2024-11-25', 'income', NULL, '退款', 85.00, '购物退款');
INSERT INTO `accountdata` VALUES ('rec_1732554213337_755715', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '2024-11-26', 'expense', '饮食', NULL, 15.00, '午餐');

-- ----------------------------
-- Table structure for code
-- ----------------------------
DROP TABLE IF EXISTS `code`;
CREATE TABLE `code`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `veri_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of code
-- ----------------------------
INSERT INTO `code` VALUES ('2058406739@qq.com', '454668');
INSERT INTO `code` VALUES ('2058406739@qq.com', '421465');
INSERT INTO `code` VALUES ('2058406739@qq.com', '742101');
INSERT INTO `code` VALUES ('2058406739@qq.com', '564169');
INSERT INTO `code` VALUES ('wangyuhan030913@163.com', '909582');

-- ----------------------------
-- Table structure for contacts
-- ----------------------------
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts`  (
  `contact_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '姓名',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '性别',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话',
  `job` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '职位',
  `grp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分组',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮件',
  `QQnum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'qq',
  PRIMARY KEY (`contact_id`) USING BTREE,
  INDEX `user_id4`(`user_id` ASC) USING BTREE,
  INDEX `teacher_name`(`name` ASC) USING BTREE,
  CONSTRAINT `user_id4` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of contacts
-- ----------------------------

-- ----------------------------
-- Table structure for diet
-- ----------------------------
DROP TABLE IF EXISTS `diet`;
CREATE TABLE `diet`  (
  `diet_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类',
  `food_item` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '食物项',
  `year` int NULL DEFAULT NULL,
  `month` int NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '已食用次数',
  PRIMARY KEY (`diet_id`) USING BTREE,
  INDEX `user_id3`(`user_id` ASC) USING BTREE,
  CONSTRAINT `user_id3` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of diet
-- ----------------------------
INSERT INTO `diet` VALUES ('diet-1732612633916qks2fq6mg', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '零食', '薯条', 2024, 11, '2024-11-25', '2');
INSERT INTO `diet` VALUES ('diet-1732697632572iuv1vp9w1', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '午餐', '火锅', 2024, 11, '2024-11-27', '1');
INSERT INTO `diet` VALUES ('diet-1732697761008n3zg5vywm', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '水果', '苹果', 2024, 11, '2024-11-27', '2');
INSERT INTO `diet` VALUES ('diet-1733248777898wb46k0ccs', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '外卖', '炸鸡', 2024, 12, '2024-12-03', '1');
INSERT INTO `diet` VALUES ('diet-1733249178885fcic6p0y6', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', '甜品', '蛋糕', 2024, 12, '2024-12-03', '2');

-- ----------------------------
-- Table structure for dietplan
-- ----------------------------
DROP TABLE IF EXISTS `dietplan`;
CREATE TABLE `dietplan`  (
  `plan_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `year` int NULL DEFAULT NULL,
  `month` int NULL DEFAULT NULL,
  `quantity` int NULL DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `quantity_remained` int NULL DEFAULT NULL,
  PRIMARY KEY (`plan_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dietplan
-- ----------------------------
INSERT INTO `dietplan` VALUES ('plan-1732612633916qks2fq6mg', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', 2024, 12, 4, '外卖', 3);
INSERT INTO `dietplan` VALUES ('plan-1733240332489n791u54p8', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', 2024, 12, 3, '甜品', 1);
INSERT INTO `dietplan` VALUES ('plan-17332430450110sknrjh6r', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', 2024, 11, 3, '甜品', 3);
INSERT INTO `dietplan` VALUES ('plan-1733243358870qgnbnahs0', 'a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', 2024, 12, 2, '烧烤', 2);

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note`  (
  `note_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标题',
  `note_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '内容',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `edit_time` datetime NULL DEFAULT NULL COMMENT '上次编辑时间',
  `note_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`note_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of note
-- ----------------------------

-- ----------------------------
-- Table structure for reminders
-- ----------------------------
DROP TABLE IF EXISTS `reminders`;
CREATE TABLE `reminders`  (
  `reminder_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `reminder_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '提醒内容',
  `reminder_time` datetime NULL DEFAULT NULL COMMENT '提醒时间',
  `is_completed` tinyint NULL DEFAULT NULL COMMENT '是否已经完成',
  `editime` datetime NULL DEFAULT NULL COMMENT '编辑时间（暂留',
  PRIMARY KEY (`reminder_id`, `user_id`) USING BTREE,
  INDEX `user_id1`(`user_id` ASC) USING BTREE,
  CONSTRAINT `user_id1` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reminders
-- ----------------------------

-- ----------------------------
-- Table structure for timetable
-- ----------------------------
DROP TABLE IF EXISTS `timetable`;
CREATE TABLE `timetable`  (
  `timetable_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `classname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '课程名',
  `teacher_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '老师名',
  `classtime` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '上课时间（小节',
  `start_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '开始周',
  `end_week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '结束周',
  `weekday` int NOT NULL COMMENT '周几',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '上课地点',
  `timetable_note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '笔记',
  `timetable_contact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'time',
  PRIMARY KEY (`timetable_id`) USING BTREE,
  INDEX `user_id5`(`user_id` ASC) USING BTREE,
  INDEX `teacher_name`(`teacher_name` ASC) USING BTREE,
  INDEX `course_name`(`classname` ASC) USING BTREE,
  CONSTRAINT `user_id5` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

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
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '昵称(用户界面可显示',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '性别\n(仅限男/女',
  `age` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '年龄',
  `school` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '学校',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '个人描述',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of userdata
-- ----------------------------
INSERT INTO `userdata` VALUES ('43acd90c-05d6-4c1f-8acf-897179a1d956', 'gin', NULL, '1234', 'G', '未知', '999', 'SCU', '默认简介');
INSERT INTO `userdata` VALUES ('47d1be6c-b00d-4eee-9043-36fdf2a36c5d', 'gin', 'wangyuhan030913@163.com', '123456', '默认昵称', '未知', '未知', '未知', '默认简介');
INSERT INTO `userdata` VALUES ('7038d900-8773-4312-a8b4-1ff906d6783d', 'gin', NULL, '1234', '默认昵称', '未知', '未知', '未知', '默认简介');
INSERT INTO `userdata` VALUES ('8b350830-4a84-43f5-8797-cc75b65566c9', 'tqq', '2058406739@qq.com', '1207', '默认昵称', '未知', '未知', '未知', '默认简介');
INSERT INTO `userdata` VALUES ('a2e1ca9e-c3a7-422a-b00b-e89ef30e713e', 'y', NULL, 't', '123', '女', '18', '四川大学', 'lalala');

SET FOREIGN_KEY_CHECKS = 1;
