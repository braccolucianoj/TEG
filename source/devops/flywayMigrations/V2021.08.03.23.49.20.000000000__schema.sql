CREATE TABLE game (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(255) NOT NULL
);

CREATE TABLE app_user (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  birth_date date NOT NULL,
  password VARCHAR(255) NOT NULL,
  password_salt VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  image_url text,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
  -- Constraints
  UNIQUE(email),
  UNIQUE(phone),
  UNIQUE(username)
);

CREATE TABLE game_event (
  id SERIAL PRIMARY KEY,
  player_id INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  info JSON,
  game_event_type VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,

  -- References
  FOREIGN KEY (player_id) REFERENCES app_user (id) ON DELETE NO ACTION,
  FOREIGN KEY (game_id) REFERENCES game (id) ON DELETE NO ACTION
);

CREATE TABLE goal (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  function_checker_name VARCHAR(255) NOT NULL,
  description text
);

CREATE TABLE player_game (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  goal_id INTEGER NOT NULL,
  color VARCHAR(255) NOT NULL,
  continent_card_used VARCHAR(255)[],

  -- References
  FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE NO ACTION,
  FOREIGN KEY (game_id) REFERENCES game (id) ON DELETE NO ACTION,
  FOREIGN KEY (goal_id) REFERENCES goal (id) ON DELETE NO ACTION,
  -- Constraints
  UNIQUE(user_id, game_id),
  UNIQUE(game_id, color),
  UNIQUE(game_id, goal_id)
);

CREATE TABLE continent (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,  
  -- Constraints
  UNIQUE(name)
);


CREATE TABLE game_country (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  alpha2 VARCHAR(255) NOT NULL,
  country_type VARCHAR(255) NOT NULL,
  continent_id INTEGER NOT NULL,
  -- Constraints
  FOREIGN KEY (continent_id) REFERENCES continent (id) ON DELETE NO ACTION,

  UNIQUE(name),
  UNIQUE(alpha2)
);

CREATE TABLE country_game_occupation (
  user_id INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  country_id INTEGER NOT NULL,
  occupation SMALLINT[] NOT NULL,     

  -- References
  FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE NO ACTION,
  FOREIGN KEY (game_id) REFERENCES game (id) ON DELETE NO ACTION,
  FOREIGN KEY (country_id) REFERENCES game_country (id) ON DELETE NO ACTION,
  -- Constraints
  CONSTRAINT user_game_pk PRIMARY KEY (country_id, game_id)
);


CREATE TABLE game_round (
  id SERIAL PRIMARY KEY,
  round_number INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  status VARCHAR(255) NOT NULL,
  situation VARCHAR(255) NOT NULL,
  user_order VARCHAR(255)[] NOT NULL,
  user_turn INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL,

  -- References
  FOREIGN KEY (game_id) REFERENCES game (id) ON DELETE NO ACTION,
  -- Constraints
  UNIQUE(round_number, game_id)
);

CREATE TABLE tracking (
id SERIAL PRIMARY KEY,
screen VARCHAR(255),
amount_clicks INTEGER NOT NULL,

--Constraints
UNIQUE(screen)
);