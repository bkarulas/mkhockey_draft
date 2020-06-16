select * from 19_players;

UPDATE 19_players SET picked = 0, team_id = 1, updated=current_timestamp WHERE id = 3;

drop table 19_players, 19_captians;

/*TEAM INFO*/
SELECT * FROM 19_captians ORDER BY pick, id, player_id;

/*GET ALL DRAFTED PLAYERS*/
SELECT 19_players.id, CONCAT(first_name,' ',last_name) AS name, position.name as position, team_id, picked FROM 19_players
LEFT JOIN position ON 19_players.position_id = position.id
WHERE picked>=1
ORDER BY picked;

/*GET ALL UNDREAFTED PLAYERS*/
SELECT 19_players.id, CONCAT(first_name,' ',last_name) AS name, position.name as position FROM 19_players
LEFT JOIN position ON 19_players.position_id = position.id
WHERE picked IS NULL
ORDER BY position_id, last_name, first_name, id;

/*GET LAST DRAFTED*/
SELECT 19_players.id, CONCAT(first_name,' ',last_name) AS name, team_id, 19_captians.name as team, position.name as position, picked FROM 19_players 
LEFT JOIN position ON position.id = 19_players.position_id
LEFT JOIN 19_captians ON 19_captians.id = 19_players.team_id
WHERE picked = (SELECT MAX(picked) FROM  19_players);

/*CURRENT PICK*/
SELECT MAX(picked) AS lastpick FROM 19_players;

/*GET EACH TEAM*/
SELECT 19_players.id, CONCAT(first_name,' ',last_name) AS name, position_id, picked FROM 19_players
WHERE team_id = 4
ORDER BY position_id, picked desc;

/*-------END---------*/

Update 19_captian set pick = 4, updated=current_timestamp where id=4 ;

SELECT 19_captian.id as id, 19_captian.team_name, 19_player.first_name as name, pick FROM 19_captian
LEFT JOIN 19_player ON 19_captian.manager_id = 19_player.id
WHERE 19_captian.draft_id = 1
ORDER BY pick, 19_captian.id;

UPDATE 19_players SET picked = 1, team_id = 1, updated=current_timestamp WHERE id = 27;
UPDATE 19_players SET picked = 2, team_id = 3, updated=current_timestamp WHERE id = 42;
UPDATE 19_players SET picked = 3, team_id = 2, updated=current_timestamp WHERE id = 3;
UPDATE 19_players SET picked = 4, team_id = 4, updated=current_timestamp WHERE id = 29;
UPDATE 19_players SET picked = 5, team_id = 4, updated=current_timestamp WHERE id = 44;
UPDATE 19_players SET picked = 6, team_id = 2, updated=current_timestamp WHERE id = 43;
UPDATE 19_players SET picked = 7, team_id = 3, updated=current_timestamp WHERE id = 12;
UPDATE 19_players SET picked = 8, team_id = 1, updated=current_timestamp WHERE id = 4;

UPDATE 19_players SET picked = 9, team_id = 1, updated=current_timestamp WHERE id = 35;
UPDATE 19_players SET picked = 10, team_id = 3, updated=current_timestamp WHERE id = 21;
UPDATE 19_players SET picked = 11, team_id = 2, updated=current_timestamp WHERE id =48;
UPDATE 19_players SET picked = 12, team_id = 4, updated=current_timestamp WHERE id = 41;
UPDATE 19_players SET picked = 13, team_id = 4, updated=current_timestamp WHERE id = 18;
UPDATE 19_players SET picked = 14, team_id = 2, updated=current_timestamp WHERE id = 34;
UPDATE 19_players SET picked = 15, team_id = 3, updated=current_timestamp WHERE id = 14;
UPDATE 19_players SET picked = 16, team_id = 1, updated=current_timestamp WHERE id = 31;

UPDATE 19_players SET picked = 17, team_id = 1, updated=current_timestamp WHERE id = 25;
UPDATE 19_players SET picked = 18, team_id = 3, updated=current_timestamp WHERE id = 2;
UPDATE 19_players SET picked = 19, team_id = 2, updated=current_timestamp WHERE id =40;
UPDATE 19_players SET picked = 20, team_id = 4, updated=current_timestamp WHERE id = 36;
UPDATE 19_players SET picked = 21, team_id = 4, updated=current_timestamp WHERE id = 23;
UPDATE 19_players SET picked = 22, team_id = 2, updated=current_timestamp WHERE id = 10;
UPDATE 19_players SET picked = 23, team_id = 3, updated=current_timestamp WHERE id = 39;
UPDATE 19_players SET picked = 24, team_id = 1, updated=current_timestamp WHERE id = 6;

SELECT * FROM 19_player WHERE picked = (SELECT MAX(picked) FROM  19_player);