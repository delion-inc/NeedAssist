-- Запит 1: Створення користувача
INSERT INTO users (id, name, surname, email, password, phone, refresh_token, user_role)
VALUES ('1', 'Валерій', 'Залужний', 'zaluzhnui228@gmail.com', '$2a$10$Ba88f2RrCiI9hDVDAxeSE.RqTASEaDErEwJOE4g9TLDWE8YEmMlzi', '0672375494', null, 2001);

-- Запит 2: Створення користувача
INSERT INTO users (id, name, surname, email, password, phone, refresh_token, user_role)
VALUES ('2', 'Іван', 'Іванович', 'ivan.ivanov@gmail.com', '$2a$10$Ba88f2RrCiI9hDVDAxeSE.RqTASEaDErEwJOE4g9TLDWE8YEmMlzi', '0987654321', null, 5320);

ALTER SEQUENCE users_id_seq RESTART WITH 3;

-- Запит 1: надання ролі користувачу
INSERT INTO user_roles (user_id, roles)
VALUES ('1', '0');

-- Запит 2: надання ролі користувачу
INSERT INTO user_roles (user_id, roles)
VALUES ('2', '1');

-- Запит 1: Створення запиту
INSERT INTO requests (id, title, description, priority, created_at, city, user_id)
VALUES ('1', 'Одяг для дітей', 'Відам одяг дитячий, стан хороший, є футболки, штани', '0', '2024-04-28 18:12:50', 'Київ', 1);

-- Запит 2: Створення запиту
INSERT INTO requests (id, title, description, priority, created_at, city, user_id)
VALUES ('2', 'Потрібені дрони', 'Дрони FPV на харківський напрямок, 46 штурмова бригада', '2', '2024-02-19 11:40:23', 'Харків', 2);

-- Запит 3: Створення запиту
INSERT INTO requests (id, title, description, priority, created_at, city, user_id)
VALUES ('3', 'Джип Mitsubushi', 'Відам старий джип, на ходу, 5-ти місцевий', '2', '2024-04-26 21:06:31', 'Одеса', 1);

ALTER SEQUENCE requests_id_seq RESTART WITH 4;

