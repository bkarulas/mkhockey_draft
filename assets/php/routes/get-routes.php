<?php
include '../library/connection.php';

$api = $_GET['api'];
$year = $_GET['year'];

$info = array();

$conn = OpenCon();

switch ($api) {
    case 'teamsinfo':
        getTeamsInfo($conn,$info, $year);
    break;
    case 'drafted':
        getDraftedPlayers($conn,$info, $year);
    break;
    case 'undrafted':
        getUnDraftedPlayers($conn,$info, $year);
    break;
    case 'lastdrafted':
        getLastDraftedPlayer($conn,$info, $year);
    break;
    case 'teamroster':
        $team = $_GET['team'];
        getTeamRoster($conn,$info, $year, $team);
    break;
    case 'lastpick':
        getLastPick($conn,$info, $year);
    break;
    default:
        echo "Error API";
}

//TEAM INFO
function getTeamsInfo($conn,$info, $year){
    $query = "SELECT * FROM ".$year."_captians ORDER BY pick, id, player_id";
    $result = mysqli_query($conn, $query);
    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "id"=>$row['id'],
                "playerId"=>$row['player_id'],
                "name"=>$row['name'],
                "pick"=>$row['pick'],
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}

//ALL DRAFTED PLAYERS
function getDraftedPlayers($conn,$info, $year){
    $query = "SELECT ".$year."_players.id, CONCAT(first_name,' ',last_name) AS name, position.name as position, team_id, picked 
    FROM ".$year."_players
    LEFT JOIN position ON ".$year."_players.position_id = position.id
    WHERE picked>=1
    ORDER BY picked";
    $result = mysqli_query($conn, $query);
    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "id"=>$row['id'],
                "name"=>$row['name'],
                "pos"=>$row['position'],
                "teamId"=>$row['team_id'],
                "picked"=>$row['picked']
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}

//ALL UN-DRAFTED PLAYERS
function getUnDraftedPlayers($conn,$info, $year){
    $query = "SELECT ".$year."_players.id, CONCAT(first_name,' ',last_name) AS name, position_id 
    FROM ".$year."_players
    WHERE picked IS NULL
    ORDER BY position_id, last_name, first_name, id";
    $result = mysqli_query($conn, $query);
    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "id"=>$row['id'],
                "name"=>$row['name'],
                "pos"=>$row['position_id'],
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}

//LAST PLAYER DRAFTED
function getLastDraftedPlayer($conn,$info, $year){
    $query = "SELECT ".$year."_players.id, CONCAT(first_name,' ',last_name) AS name, team_id, ".$year."_captians.name as team, position.name as position, picked 
    FROM ".$year."_players 
    LEFT JOIN position ON position.id = ".$year."_players.position_id
    LEFT JOIN ".$year."_captians ON ".$year."_captians.id = ".$year."_players.team_id
    WHERE picked = (SELECT MAX(picked) FROM  ".$year."_players)";
    $result = mysqli_query($conn, $query);
    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "id"=>$row['id'],
                "name"=>$row['name'],
                "teamId"=>$row['team_id'],
                "team"=>$row['team'],
                "pos"=>$row['position'],
                "picked"=>$row['picked']
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}

function getTeamRoster($conn,$info, $year, $team){
    $query = "SELECT ".$year."_players.id, CONCAT(first_name,' ',last_name) AS name, position_id, picked FROM ".$year."_players
    WHERE team_id = ".$team."
    ORDER BY position_id, picked desc";
    $result = mysqli_query($conn, $query);
    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "id"=>$row['id'],
                "name"=>$row['name'],
                "pos"=>$row['position_id'],
                "picked"=>$row['picked']
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}

//LAST PICK
function getLastPick($conn,$info, $year){
    $query = "SELECT MAX(picked) AS lastpick FROM ".$year."_players;";
    $result = mysqli_query($conn, $query);
    while ($row = $result->fetch_assoc()) {
                $lastpick = $row['lastpick'];
    }
    echo json_encode($lastpick);
    CloseCon($conn);
}
?>