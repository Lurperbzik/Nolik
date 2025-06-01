-- Tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
    api_key VARCHAR(255) DEFAULT NULL
);

-- Tabla de colecciones
CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    owner VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('loading', 'completed')) DEFAULT 'loading',
    owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de invitaciones
CREATE TABLE collection_invites (
    id SERIAL PRIMARY KEY,
    collection_id INTEGER NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    invited_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    invited_by_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
    UNIQUE (collection_id, invited_user_id) -- evitar duplicados
);

-- Vista o tabla intermedia de usuarios que aceptaron invitación
CREATE VIEW collection_members AS
SELECT
    ci.collection_id,
    ci.invited_user_id AS user_id
FROM
    collection_invites ci
WHERE
    ci.status = 'accepted';


CREATE OR REPLACE FUNCTION check_owner_before_invite()
RETURNS TRIGGER AS $$
DECLARE
    owner_id_local INTEGER;
BEGIN
    SELECT owner_id INTO owner_id_local
    FROM collections
    WHERE id = NEW.collection_id;

    -- Comprobar que el usuario que invita sea el dueño
    IF owner_id_local IS NULL THEN
        RAISE EXCEPTION 'Collection does not exist.';
    ELSIF owner_id_local != NEW.invited_by_user_id THEN
        RAISE EXCEPTION 'Only the owner of the collection can send invites.';
    END IF;

    RETURN NEW; -- Permitir la inserción si pasa la validación
END;
$$ LANGUAGE plpgsql;


-- Trigger que se dispara antes de insertar una nueva invitación
CREATE TRIGGER before_invite_insert
BEFORE INSERT ON collection_invites
FOR EACH ROW
EXECUTE FUNCTION check_owner_before_invite();
