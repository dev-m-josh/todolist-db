
--load into users table
INSERT INTO users(user_name, user_email, user_password)
VALUES ('Alice Johnson', 'alice.johnson@example.com', 'Sunny$Day42'),
        ('Bob Smith', 'bob.smith@24.com', 'BlueSky!88'),
        ('Charlie Brown', 'charlie.brown@.com', 'Book@Home3'),
        ('Dana White', 'dana.white@02.com', 'Coffee#Lover5'),
        ('Eve Davis', 'eve@davis.com', 'Happy*Cat7')


--load into todos table
INSERT INTO todos(user_id, todo_title, todo_description, todo_deadline, todo_status)
VALUES (1, 'creat a todolist database', 'link the database to the vs code and create routes to get all todos, add a new todo and delete a todo.', '2024/10/1', 1),
        (4,'Grocery Shopping', 'Buy fruits, vegetables, and snacks.', '2024/10/15', 0),
        (2, 'Clean the House', 'Tidy up living room, kitchen, and bedroom.', '2024/10/25', 0),
        (5, 'Organize Digital Files', 'Sort through computer files and folders, deleting unnecessary documents and backing up important ones.', '2024/10/30', 0),
        (3, 'Update Resume', 'Revise the resume to include recent work experiences and skills for upcoming job applications.', '2024/11/21', 0);

select * from users


(select * from  users where user_name = 'Charlie Brown' )



