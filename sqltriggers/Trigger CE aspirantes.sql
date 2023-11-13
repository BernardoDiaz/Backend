DELIMITER //
CREATE TRIGGER autoCE
AFTER INSERT ON aspirants
FOR EACH ROW
BEGIN
  INSERT INTO consultations (id_aspirant, comments, state, createdAt,updatedAt) 
  VALUES (NEW.id,'', 'Pendiente',current_timestamp(),current_timestamp());
  INSERT INTO interviews (id_aspirant, comments, state, createdAt,updatedAt) 
  VALUES (NEW.id,'', 'Pendiente',current_timestamp(),current_timestamp());
END; //
DELIMITER ;
