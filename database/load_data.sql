
--load into users table
INSERT INTO users(user_name, user_email)
VALUES ('Alice Johnson', 'alice.johnson@example.com'),
        ('Bob Smith', 'bob.smith@24.com'),
        ('Charlie Brown', 'charlie.brown@.com'),
        ('Dana White', 'dana.white@02.com'),
        ('Eve Davis', 'eve@davis.com')

--load into todos table
INSERT INTO todos(user_id, todo_title, todo_description, todo_deadline, todo_status)
VALUES (1, 'creat a todolist database', 'link the database to the vs code and create routes to get all todos, add a new todo and delete a todo.', '2024/10/1', 1),
        (4,'Grocery Shopping', 'Buy fruits, vegetables, and snacks.', '2024/10/15', 0),
        (2, 'Clean the House', 'Tidy up living room, kitchen, and bedroom.', '2024/10/25', 0);
