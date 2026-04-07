CREATE TABLE "USERS"(
    "id" SERIAL PRIMARY KEY,
    "fullname" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "LINKS"(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "original_url" VARCHAR(255),
    "slug" UNIQUE VARCHAR(255),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user
        FOREIGN KEY("user_id")
        REFERENCES "USERS"("id"),
);