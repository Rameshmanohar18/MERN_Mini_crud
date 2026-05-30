CREATE DATABASE IF NOT EXISTS item_management;

USE item_management;

CREATE TABLE IF NOT EXISTS purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  purchase_date DATE NOT NULL
);





CREATE TABLE IF NOT EXISTS item_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  purchase_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  stock_available BOOLEAN DEFAULT FALSE,
  item_type_id INT NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
  FOREIGN KEY (item_type_id) REFERENCES item_types(id)
);

INSERT IGNORE INTO item_types (id, type_name) VALUES
  (1, 'Electronics'),
  (2, 'Furniture'),
  (3, 'Clothing'),
  (4, 'Books'),
  (5, 'Sports');
