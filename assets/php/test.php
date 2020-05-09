<?php
include 'library/connection.php';
$conn = OpenCon();
echo "Connected Successfully";
CloseCon($conn);
?>