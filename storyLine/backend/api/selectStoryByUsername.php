<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $username = trim($request->username);

  $stmt = mysqli_prepare($con, "select * from stories where authorUsername=? order by RAND()");

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
    $result = mysqli_stmt_bind_result($stmt, $c1, $c2, $c3, $c4, $c6, $c7, $c8);
    while (mysqli_stmt_fetch($stmt)) {
        $stories[$i]['storyHashID'] = $c1;
        $stories[$i]['oneLiner'] = $c2;
        $stories[$i]['writtenAnon'] = $c3;
        $stories[$i]['content'] = $c4;
        $stories[$i]['timestamp'] = $c6;
        $stories[$i]['authorUsername'] = $c7;
        $stories[$i]['numUpVotes'] = $c8;
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
