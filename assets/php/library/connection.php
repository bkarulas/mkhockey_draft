<?php

function OpenCon(){
    include 'cred.php';
    $conn = new mysqli($dbhost, $dbuser, $dbpass,$db);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
 }
 
function CloseCon($conn){
    $conn -> close();
 }

?>
