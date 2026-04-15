DELIMITER //

-- Cuando se inserta un like en TRUE, aumenta el contador
CREATE TRIGGER trg_like_insert
AFTER INSERT ON likes
FOR EACH ROW
BEGIN
    IF NEW.liked = TRUE THEN
        UPDATE recipes
        SET likes_count = likes_count + 1
        WHERE id = NEW.recipe_id;
    END IF;
END//

-- Cuando se actualiza un like (de TRUE a FALSE o viceversa)
CREATE TRIGGER trg_like_update
AFTER UPDATE ON likes
FOR EACH ROW
BEGIN
    IF OLD.liked = FALSE AND NEW.liked = TRUE THEN
        UPDATE recipes
        SET likes_count = likes_count + 1
        WHERE id = NEW.recipe_id;
    ELSEIF OLD.liked = TRUE AND NEW.liked = FALSE THEN
        UPDATE recipes
        SET likes_count = likes_count - 1
        WHERE id = NEW.recipe_id;
    END IF;
END//

-- Cuando se borra el registro (por ejemplo si se quiere limpiar likes nullos)
CREATE TRIGGER trg_like_delete
AFTER DELETE ON likes
FOR EACH ROW
BEGIN
    IF OLD.liked = TRUE THEN
        UPDATE recipes
        SET likes_count = likes_count - 1
        WHERE id = OLD.recipe_id;
    END IF;
END//

DELIMITER ;