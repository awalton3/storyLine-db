<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $username = trim($request->username);

  $stmt = mysqli_prepare($con, "select * from accountsReadStories where username=?");

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
    $result = mysqli_stmt_bind_result($stmt, $c1, $c2);
    while (mysqli_stmt_fetch($stmt)) {
        $stories[$i]['authorUsername'] = $c1;
        $stories[$i]['storyHashID'] = $c2;
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

