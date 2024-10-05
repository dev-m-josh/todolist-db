

--creating a ToDO List App Database

--TODOLIST
        --todolist_id
        --todolist_title
--TODO
      --todo_id
      --todo_title
      --todo_description
      --todo_status
      --todo_deadline
      --todolist_id

CREATE DATABASE TodoList;

--users table
CREATE TABLE users(
        user_id INT PRIMARY KEY IDENTITY(1, 1),
        user_name VARCHAR(50),
        user_email VARCHAR(100) NOT NULL
);

--todos table
CREATE TABLE todos(
        todo_id INT PRIMARY KEY IDENTITY(1, 1),
        user_id INT NOT NULL FOREIGN KEY REFERENCES users(user_id),
        todo_title VARCHAR(50),
        todo_description VARCHAR(255),
        todo_deadline DATE,
        todo_status BIT NOT NULL
);