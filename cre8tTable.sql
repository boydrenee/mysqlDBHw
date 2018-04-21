DROP DATABASE IF EXISTS Bamazon;
CREATE database Bamazon;

USE Bamazon;

CREATE TABLE myInventoryTbl (
  itemkey INT NOT NULL,
  itemname VARCHAR(100) NULL,
  category varCHAR(255) NULL,
  price decimal(10,2) NULL,
  instockcnt INT NULL,
  PRIMARY KEY (itemkey)
);

SELECT * FROM myInventoryTbl;
