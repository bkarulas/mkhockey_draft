<?php
include '../library/connection.php';

$api = $_GET['api'];
$year = $_GET['year'];

$info = array();

$conn = OpenCon();

switch ($api) {
    case 'teams':
        getTeamsInfo($conn,$info, $year);
    break;
    case 'players':
        getPlayersInfo($conn,$info, $year);
    break;
    case 'goalies':
        getGoaliesInfo($conn,$info, $year);
    break;
    case 'team':
        $team = $_GET['team'];
        getTeamInfo($conn,$info, $year, $team);
    break;
    case 'player':
        $player = $_GET['player'];
        getPlayerInfo($conn,$info, $year, $player);
    break;
    case 'teamname':
        $team = $_GET['team'];
        getTeamName($conn,$info, $year, $team);
    break;
    case 'schedule':
        getSchedule($conn,$info,$year);
    break;
    case 'champs':
        $team = $_GET['team'];
        getChampsNames($conn,$info, $year, $team);
    break;
    default:
        echo "Error API";
}

//STATS - TEAM STANDINGS
function getTeamsInfo($conn,$info, $year){
    $query = "SELECT * FROM summer_".$year."_team ORDER BY points desc, pm desc, gf desc, win desc, id";
    $result = mysqli_query($conn, $query);

    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "id"=>$row['id'],
                "name"=>$row['name'],
                "win"=>$row['win'],
                "lose"=>$row['lose'],
                "tie"=>$row['tie'],
                "points"=>$row['points'],
                "gf"=>$row['gf'],
                "ga"=>$row['ga'],
                "pm"=>$row['pm']
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}

//STATS - PLAYER RANK
function getPlayersInfo($conn,$info, $year){
    $query = "SELECT CONCAT(first_name,' ',last_name) AS name, positions.pos, num, summer_".$year."_team.name AS team, goals, assists, summer_".$year."_player.points FROM summer_".$year."_player 
    LEFT JOIN summer_".$year."_team ON summer_".$year."_player.team_id = summer_".$year."_team.id 
    LEFT JOIN positions ON summer_".$year."_player.pos_id = positions.id
    ORDER BY summer_".$year."_player.points desc, goals desc, summer_".$year."_player.pos_id, summer_".$year."_player.last_name, summer_".$year."_player.first_name, summer_".$year."_player.num, summer_".$year."_player.id;";
    $result = mysqli_query($conn, $query);

    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "name"=>$row['name'],
                "pos"=>$row['pos'],
                "num"=>$row['num'],
                "team"=>$row['team'],
                "goals"=>$row['goals'],
                "assists"=>$row['assists'],
                "points"=>$row['points']
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}

//STATS - GOALIE RANK
function getGoaliesInfo($conn,$info, $year){
    $query = "SELECT CONCAT(summer_".$year."_player.first_name,' ',summer_".$year."_player.last_name) AS name, summer_".$year."_team.name AS team, gp, summer_".$year."_goalie.ga, gaa, so FROM summer_".$year."_goalie
    LEFT JOIN summer_".$year."_player ON summer_".$year."_goalie.player_id = summer_".$year."_player.id
    LEFT JOIN summer_".$year."_team on summer_".$year."_goalie.team_id = summer_".$year."_team.id
    ORDER BY gaa, gp desc, so desc, summer_".$year."_goalie.id";
    $result = mysqli_query($conn, $query);

    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "name"=>$row['name'],
                "team"=>$row['team'],
                "gp"=>$row['gp'],
                "ga"=>$row['ga'],
                "gaa"=>$row['gaa'],
                "so"=>$row['so']
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}

//TEAM INFO
function getTeamInfo($conn,$info, $year, $team){
    $query = "SELECT summer_".$year."_player.id, CONCAT(first_name,' ',last_name) AS name, positions.pos, num, goals, assists, points FROM summer_".$year."_player
    LEFT JOIN positions ON summer_".$year."_player.pos_id = positions.id
    WHERE team_id = $team && summer_".$year."_player.pos_id > 1
    ORDER BY pos_id, last_name, first_name, summer_".$year."_player.id";
    $result = mysqli_query($conn, $query);

    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "id"=>$row['id'],
                "name"=>$row['name'],
                "pos"=>$row['pos'],
                "num"=>$row['num'],
                "goals"=>$row['goals'],
                "assists"=>$row['assists'],
                "points"=>$row['points']
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}

//PLAYER INFO
function getPlayerInfo($conn,$info, $year, $player){
    $query = "SELECT CONCAT(first_name,' ',last_name) AS name, positions.pos, num, summer_".$year."_team.name as team, goals, assists, summer_".$year."_player.points FROM summer_".$year."_player
    LEFT JOIN positions ON summer_".$year."_player.pos_id = positions.id
    LEFT JOIN summer_".$year."_team on summer_".$year."_player.team_id = summer_".$year."_team.id
    WHERE summer_".$year."_player.id =".$player;
    $result = mysqli_query($conn, $query);

    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "name"=>$row['name'],
                "pos"=>$row['pos'],
                "num"=>$row['num'],
                "team"=>$row['team'],
                "goals"=>$row['goals'],
                "assists"=>$row['assists'],
                "points"=>$row['points']
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}

function getTeamName($conn,$info, $year, $team){
    $query = "SELECT * FROM summer_".$year."_team WHERE id=".$team;
    $result = mysqli_query($conn, $query);

    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "name"=>$row['name'],
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}

function getSchedule($conn,$info,$year){
    $query = "SELECT type, week, date, time, home_id, home_name as home, vis_id, vis_name as vis, home_score, vis_score, note FROM summer_19_schedule ORDER BY week, time";
    $result = mysqli_query($conn, $query);

    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "type"=>$row['type'],
                "week"=>$row['week'],
                "date"=>$row['date'],
                "time"=>$row['time'],
                "home_id"=>$row['home_id'],
                "home"=>$row['home'],
                "vis_id"=>$row['vis_id'],
                "vis"=>$row['vis'],
                "home_score"=>$row['home_score'],
                "vis_score"=>$row['vis_score'],
                "note"=>$row['note'],
            ));
    }
    echo json_encode($info);
    CloseCon($conn);
}


function getChampsNames($conn,$info, $year, $team){
    $infoStr = '';
    $query = "SELECT CONCAT(first_name,' ',last_name) AS name FROM summer_".$year."_player 
    WHERE team_id = ".$team." ORDER BY last_name, first_name";
    $result = mysqli_query($conn, $query);

    while ($row = $result->fetch_assoc()) {
        $infoStr= $infoStr.$row['name'].", ";
    }
    echo $infoStr;
    CloseCon($conn);
}
?>