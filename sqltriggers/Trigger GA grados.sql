DELIMITER //
CREATE TRIGGER insertar_asignaturas
AFTER INSERT ON degrees
FOR EACH ROW
BEGIN
    DECLARE nivel INT;
    DECLARE id_level INT;

    -- Obtener el nivel del nuevo grado
    SET nivel = NEW.id_level;

    -- Mapear el nivel a un ID específico 
    CASE nivel
        WHEN 1 THEN SET id_level = 1;
        WHEN 2 THEN SET id_level = 2;
        WHEN 3 THEN SET id_level = 3;
        WHEN 4 THEN SET id_level = 4;
        WHEN 5 THEN SET id_level = 5;
        WHEN 6 THEN SET id_level = 6;
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Nivel no válido';
    END CASE;

    -- Insertar las asignaturas relacionadas con este grado según el nivel
    CASE id_level
        WHEN 1 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp());
        WHEN 2 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES 
                ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 2', NEW.id, current_timestamp(), current_timestamp());
        WHEN 3 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES 
                ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 2', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 3', NEW.id, current_timestamp(), current_timestamp());
        WHEN 4 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES 
                ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 2', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 3', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 4', NEW.id, current_timestamp(), current_timestamp());
        WHEN 5 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES 
                ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 2', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 3', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 4', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 5', NEW.id, current_timestamp(), current_timestamp());
        WHEN 6 THEN
            INSERT INTO subjects (name, id_degree, createdAt, updatedAt)
            VALUES 
                ('Asignatura 1', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 2', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 3', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 4', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 5', NEW.id, current_timestamp(), current_timestamp()),
                ('Asignatura 6', NEW.id, current_timestamp(), current_timestamp());
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Nivel no válido';
    END CASE;
END;
//
DELIMITER ;