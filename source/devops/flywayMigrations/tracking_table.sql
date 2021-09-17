CREATE TABLE tracking (
    id SERIAL PRIMARY KEY,
    screen VARCHAR(255),
    amount_views INTEGER,

    --Constraints
    UNIQUE(screen)
);