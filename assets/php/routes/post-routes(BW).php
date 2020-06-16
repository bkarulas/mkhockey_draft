<?php
include '../library/connection.php';

$api = $_GET['api'];
$year = $_GET['year'];

$info = array();

$conn = OpenCon();

switch ($api) {
    case 'draftplayer':
        $id = $_GET['id'];
        getNextPick($conn,$info, $year,$id);
    break;
    
    default:
        echo "Error API";
}

//DRAFT BOARD - TEAM NAMES
function draftPlayer($conn,$info, $year, $pick, $team, $id){
    $query = "UPDATE ".$year."_players SET picked=".$pick.", team_id=".$team.", updated=current_timestamp WHERE id=".$id;
    if (mysqli_query($conn, $query) === TRUE){
        echo "Drafted";
    }else{
        echo "Error: ".$conn->error;
    }
    echo json_encode($info);
    CloseCon($conn);
}

function getNextPick($conn,$info, $year,$id){
    $query = "SELECT MAX(picked) AS lastpick FROM ".$year."_players";
    $result = mysqli_query($conn, $query);
    while ($row = $result->fetch_assoc()) {
                $lastPick = $row['lastpick'];
    }
    $pick = $lastPick +1;
    getNextTeam ($conn,$info, $year,$id, $pick);
}

function getNextTeam($conn,$info, $year,$id, $pick){
    $query = "SELECT id, pick FROM ".$year."_captians ORDER BY pick, id";
    $result = mysqli_query($conn, $query);
    while ($row = $result->fetch_assoc()) {
        array_push($info,
            array(
                "id"=>$row['id'],
                "pick"=>$row['pick']
            ));
    }
    $teams = json_encode($info);
    echo $teams;
    // switch ($pick){
    //     case 1: case 8: case 9: case 16: case 17: case 24: case 25: case 32: case 33: case 40: case 41:
    //         $team = $info[0].id;
    //         break;
    //     case 2: case 7: case 10: case 15: case 18: case 23: case 26: case 31: case 34: case 39: case 42:
    //         $team = $info[1].id;
    //         break;
    //     case 3: case 6: case 11: case 14: case 19: case 22: case 27: case 30: case 35: case 38: case 43:
    //         $team = $info[2].id;
    //         break;
    //     case 4: case 5: case 12: case 13: case 20: case 21: case 28: case 29: case 36: case 37: case 44:
    //         $team = $info[3].id;
    //         break;
    //     default:
    //         echo "ERROR";
    // }
    // draftPlayer($conn,$info, $year, $pick, $team, $id);       
}



?>