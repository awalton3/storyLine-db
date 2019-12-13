<?php

require 'database.php';

$stories = [];
$sql = "SELECT * from oneLiners order by RAND()";

if ($result = mysqli_query($con, $sql)) {
  $i = 0;
  while($row = mysqli_fetch_assoc($result)){
    $stories[$i]['oneLiner'] = $row['oneLiner'];
    $stories[$i]['timestamp'] = $row['timestamp'];
    $stories[$i]['authorUsername'] = $row['authorUsername'];
    $stories[$i]['numUpVotes'] = $row['numUpVotes'];
    $i++;
  }
  echo json_encode($stories);
}

else {
  http_response_code(404);
}
