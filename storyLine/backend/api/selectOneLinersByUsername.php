<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $username = trim($request->username);

  $stmt = mysqli_prepare($con, "select * from oneLiners where authorUsername=?");

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"s", $username);
    mysqli_stmt_execute($stmt);
    if (mysqli_stmt_errno($stmt) != 0)
    {
        echo $stmt->error;
    }

    $stories = [];
    $i = 0;
    $result = mysqli_stmt_get_result($stmt);
    while($row = mysqli_fetch_assoc($result)){ 
        $stories[$i]['oneLiner'] = $row['oneLiner'];
        $stories[$i]['numViews'] = $row['numViews'];
        $stories[$i]['writtenAnon'] = $row['writtenAnon'];
        $stories[$i]['timestamp'] = $row['timestamp'];
        $stories[$i]['authorUsername'] = $row['authorUsername'];
        $stories[$i]['numUpVotes'] = $row['numUpVotes'];
        $i++;
    }
    echo json_encode($stories);

    mysqli_stmt_close($stmt);
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }

}

