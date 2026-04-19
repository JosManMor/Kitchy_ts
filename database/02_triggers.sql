CREATE OR REPLACE FUNCTION handle_likes_count()
RETURNS TRIGGER AS $$
DECLARE
    delta INT := 0;
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.liked THEN
            delta := 1;
        END IF;

    ELSIF TG_OP = 'UPDATE' THEN
        IF NOT OLD.liked AND NEW.liked THEN
            delta := 1;
        ELSIF OLD.liked AND NOT NEW.liked THEN
            delta := -1;
        END IF;

    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.liked THEN
            delta := -1;
        END IF;
    END IF;

    -- Solo actualiza si hay cambio real
    IF delta <> 0 THEN
        UPDATE recipes
        SET likes_count = GREATEST(likes_count + delta, 0)
        WHERE id = COALESCE(NEW.recipe_id, OLD.recipe_id);
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_like_insert
AFTER INSERT ON likes
FOR EACH ROW
EXECUTE FUNCTION handle_likes_count();

CREATE TRIGGER trg_like_update
AFTER UPDATE ON likes
FOR EACH ROW
EXECUTE FUNCTION handle_likes_count();

CREATE TRIGGER trg_like_delete
AFTER DELETE ON likes
FOR EACH ROW
EXECUTE FUNCTION handle_likes_count();