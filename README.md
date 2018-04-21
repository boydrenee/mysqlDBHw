# mysqlDBHw
1:  Run the following sql in mysql workbench:

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

2.  Run the following command line mysql to populate the database:

load data local infile 'D:/Learn/CWRU/repositories/mysqlDBHw/inventory.csv' into table myInventoryTbl fields terminated by ',' enclosed by '"' lines terminated by '\n';

3.  Run the following in node.js to view the contents of the database:

index.js
Reminder, after display of DB items; use the down arrow key to get the first prompt.