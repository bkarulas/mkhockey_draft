<?php
include '../library/connection.php';

$api = $_GET['api'];
$year = $_GET['year'];
//$draft = $_GET['draft'];

$info = array();

$conn = OpenCon();

switch ($api) {
    case 'draftplayer':
        $pick = $_GET['pick'];
        $team = $_GET['team'];
        $id = $_GET['id'];
        postDraftPlayer($conn,$info, $year, $pick, $team, $id);
    break;
    
    default:
        echo "Error API";
}

//DRAFT BOARD - TEAM NAMES
function postDraftPlayer($conn,$info, $year, $pick, $team, $id){
    $query = "UPDATE ".$year."_players SET picked=".$pick.", team_id=".$team.", updated=current_timestamp WHERE id=".$id;
    if (mysqli_query($conn, $query) === TRUE){
        echo "Drafted";
    }else{
        echo "Error: ".$conn->error;
    }
    echo json_encode($info);
    CloseCon($conn);
}


?>