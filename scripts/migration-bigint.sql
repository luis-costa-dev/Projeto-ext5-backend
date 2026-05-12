-- Migration script to convert INTEGER columns to BIGINT
-- Run this if you have an existing database with the old schema

-- Step 1: Backup and drop foreign key constraint
ALTER TABLE avaliacoes DROP CONSTRAINT IF EXISTS avaliacoes_pessoa_id_fkey;

-- Step 2: Change the pessoa_id column from INTEGER to BIGINT
ALTER TABLE avaliacoes ALTER COLUMN pessoa_id TYPE BIGINT;

-- Step 3: Recreate the foreign key
ALTER TABLE avaliacoes ADD CONSTRAINT avaliacoes_pessoa_id_fkey 
    FOREIGN KEY (pessoa_id) REFERENCES pessoas(id) ON DELETE CASCADE;

-- Step 4: Convert pessoas id from SERIAL (INTEGER) to BIGSERIAL (BIGINT) if needed
-- Note: This may require recreating the primary key, so use with caution on production data
-- ALTER TABLE pessoas ALTER COLUMN id TYPE BIGINT;

-- Step 5: Recreate indexes
DROP INDEX IF EXISTS idx_avaliacoes_pessoa_id;
CREATE INDEX idx_avaliacoes_pessoa_id ON avaliacoes(pessoa_id);
