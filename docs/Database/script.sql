CREATE TABLE IF NOT EXISTS "Users" (
    "userId" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "username" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "Contents"  (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "contentId" INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    "thumbnailUrl" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    duration INT NULL, -- Video Class
    "channelId" INT NULL, -- Video Class
    "subscriberCount" INT NULL, -- Channel Class
    "userId" INT NOT NULL,
    CONSTRAINT fk_contents_user FOREIGN KEY ("userId") REFERENCES "Users"("userId")
);

CREATE TABLE IF NOT EXISTS "Tags" (
    "tagId" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label VARCHAR(50) NOT NULL,
    "userId" INT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    CONSTRAINT fk_tags_user FOREIGN KEY ("userId") REFERENCES "Users"("userId")
);

CREATE TABLE IF NOT EXISTS "ContentTags" (
    "tagId" INT NOT NULL,
    "contentId" INT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    CONSTRAINT pk_contenttags_ids PRIMARY KEY ("tagId", "contentId"),
    CONSTRAINT fk_contenttags_tagId FOREIGN KEY ("tagId") REFERENCES "Tags"("tagId"),
    CONSTRAINT fk_contenttags_contentId FOREIGN KEY ("contentId") REFERENCES "Contents"("id")
);
