-- Additional Dummy Database Export
CREATE TABLE `config` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`key`)
);
INSERT INTO `config` VALUES ('API_SECRET','dummy_secret_from_database.sql_do_not_use');
