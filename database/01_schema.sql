CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role_id INT NOT NULL DEFAULT 2,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    icon TEXT
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    instructions TEXT,
    image_url TEXT,
    category_id INT,
    country_id INT,
    likes_count INT DEFAULT 0,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    CONSTRAINT fk_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL
);

CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE recipe_ingredients (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    unit_id INT,
    quantity DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (recipe_id, ingredient_id),
    CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    CONSTRAINT fk_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
    CONSTRAINT fk_unit FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE SET NULL
);

CREATE TABLE favorites (
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    saved BOOLEAN DEFAULT TRUE,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id),
    CONSTRAINT fk_fav_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_fav_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE likes (
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    liked BOOLEAN DEFAULT TRUE,
    liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id),
    CONSTRAINT fk_like_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_like_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);