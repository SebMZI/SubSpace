BEGIN;

CREATE TABLE IF NOT EXISTS "Users" (
    "userId" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "username" VARCHAR(150) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Contents" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "contentId" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "thumbnailUrl" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "duration" INT,
    "channelId" TEXT,
    "subscriberCount" INT,
    "userId" INT NOT NULL,

    CONSTRAINT fk_contents_user
        FOREIGN KEY ("userId")
        REFERENCES "Users"("userId")
        ON DELETE CASCADE,

    CONSTRAINT uq_contents_id_user
        UNIQUE ("id", "userId"),

    CONSTRAINT uq_contents_user_external
        UNIQUE ("userId", "contentId")
);

CREATE TABLE IF NOT EXISTS "Tags" (
    "tagId" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" VARCHAR(50) NOT NULL,
    "userId" INT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_tags_user
        FOREIGN KEY ("userId")
        REFERENCES "Users"("userId")
        ON DELETE CASCADE,

    CONSTRAINT uq_tags_id_user
        UNIQUE ("tagId", "userId")
);

CREATE TABLE IF NOT EXISTS "ContentTags" (
    "tagId" INT NOT NULL,
    "contentId" INT NOT NULL,
    "userId" INT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_contenttags
        PRIMARY KEY ("tagId", "contentId"),

    CONSTRAINT fk_contenttags_tag
        FOREIGN KEY ("tagId", "userId")
        REFERENCES "Tags"("tagId", "userId")
        ON DELETE CASCADE,

    CONSTRAINT fk_contenttags_content
        FOREIGN KEY ("contentId", "userId")
        REFERENCES "Contents"("id", "userId")
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Sessions" (
    "sessionId" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "tokenHash" VARCHAR(64) NOT NULL UNIQUE,
    "userId" INT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "lastSeenAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_sessions_user
        FOREIGN KEY ("userId")
        REFERENCES "Users"("userId")
        ON DELETE CASCADE,

    CONSTRAINT chk_sessions_expiry
        CHECK ("expiresAt" > "createdAt")
);

CREATE INDEX IF NOT EXISTS idx_contents_user
    ON "Contents" ("userId");

CREATE INDEX IF NOT EXISTS idx_tags_user
    ON "Tags" ("userId");

CREATE INDEX IF NOT EXISTS idx_contenttags_content
    ON "ContentTags" ("contentId", "userId");

CREATE INDEX IF NOT EXISTS idx_sessions_user
    ON "Sessions" ("userId");

CREATE INDEX IF NOT EXISTS idx_sessions_expiry
    ON "Sessions" ("expiresAt");

DELETE FROM "Sessions" WHERE "expiresAt" <= NOW();

COMMIT;
