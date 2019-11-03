<?php

require 'database.php';

$stories = [];
$sql = "SELECT * from stories";

if ($result = mysqli_query($con, $sql)) {
  $i = 0;
  while($row = mysqli_fetch_assoc($result)){
    $stories[$i]['storyHashID'] = $row['storyHashID'];
    $stories[$i]['oneLiner'] = $row['oneLiner'];
    $stories[$i]['content'] = $row['content'];
    $i++;
  }
  echo json_encode($stories);
}

else {
  http_response_code(404);
}
