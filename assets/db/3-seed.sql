INSERT INTO draft_info (year, rounds, teams, updated) VALUES
(19, 11, 4, current_timestamp);

INSERT INTO position (name, updated) VALUES
('Goalie', current_timestamp), 
('Defense', current_timestamp), 
('Forward', current_timestamp), 
('Def/For', current_timestamp);


INSERT INTO 19_players (first_name, last_name,position_id,updated) VALUES
('Vince', 'Badagliacca', 2, current_timestamp), 
('Chris', 'Balkos', 3, current_timestamp), 
('Ryan', 'Bassil', 3, current_timestamp), 
('Mike', 'Bojovich', 3, current_timestamp), 
('Steve', 'Bojovich', 2, current_timestamp), 
('Ryan', 'Bonnett', 3, current_timestamp), 
('Dan', 'Brown', 3, current_timestamp), 
('Dana', 'Burke', 1, current_timestamp), 
('George', 'Cadamov', 4, current_timestamp), 
('Carlo', 'Caltado', 2, current_timestamp), 
('Kosta', 'Cvetkovski', 3, current_timestamp), 
('Michael', 'Demarco', 3, current_timestamp), 
('Mike', 'Field', 4, current_timestamp), 
('Roberto', 'Galluzzo', 3, current_timestamp), 
('Tom', 'Grosdoulies', 3, current_timestamp), 
('Tony', 'Janevski', 4, current_timestamp), 
('Rob', 'Jawharry', 1, current_timestamp), 
('Rob', 'Jovanovski', 3, current_timestamp), 
('Al', 'Karadinovic', 3, current_timestamp), 
('Chris', 'Karafile', 3, current_timestamp), 
('Brad', 'Karulas', 2, current_timestamp), 
('Jamie', 'Karulas', 3, current_timestamp), 
('Ken', 'Karulas', 4, current_timestamp), 
('Jason', 'Mackenzie', 4, current_timestamp), 
('Ryan', 'Macri', 3, current_timestamp), 
('Gary', 'Miller', 3, current_timestamp), 
('Egor', 'Mironov', 3, current_timestamp), 
('George', 'Missios', 3, current_timestamp), 
('Darrin', 'Pandovski', 2, current_timestamp), 
('Bill', 'Pavlovski', 4, current_timestamp), 
('Sash', 'Pavlovski', 2, current_timestamp), 
('Frank', 'Perciasepe', 1, current_timestamp), 
('Andrew', 'Plaunt', 1, current_timestamp), 
('Jason', 'Popovich', 4, current_timestamp), 
('Carmelo', 'Scali', 2, current_timestamp), 
('Derek', 'Servos', 3, current_timestamp), 
('Todd', 'Simmons', 3, current_timestamp), 
('John', 'Skenderis', 4, current_timestamp), 
('Bill', 'Skicos', 2, current_timestamp), 
('Steve', 'Skicos', 4, current_timestamp), 
('Peter', 'Skopec', 2, current_timestamp), 
('Alex', 'Stoyan', 2, current_timestamp), 
('Mike', 'Stoyan', 2, current_timestamp), 
('Evan', 'Tanos', 2, current_timestamp), 
('Paul', 'Taskas', 3, current_timestamp), 
('Bob', 'Telalidis', 3, current_timestamp), 
('John', 'Vidinovski', 3, current_timestamp), 
('Tony', 'Vidinovski', 4, current_timestamp);

INSERT INTO 19_captians (player_id, name, updated) VALUES
(8, 'Dana', current_timestamp),
(17, 'Rob', current_timestamp),
(32, 'Frank', current_timestamp),
(33, 'Andrew', current_timestamp);

UPDATE 19_players SET team_id=1, picked=0 WHERE id=8;
UPDATE 19_players SET team_id=2, picked=0 WHERE id=17;
UPDATE 19_players SET team_id=3, picked=0 WHERE id=32;
UPDATE 19_players SET team_id=4, picked=0 WHERE id=33;

UPDATE 19_captians SET pick=1 WHERE id=1;
UPDATE 19_captians SET pick=2 WHERE id=3;
UPDATE 19_captians SET pick=3 WHERE id=2;
UPDATE 19_captians SET pick=4 WHERE id=4;
