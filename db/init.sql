CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    image_path VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    login VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('admin', 'teacher' ,'student')),
    group_id INT,
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'finished', 'paused'))
    );
