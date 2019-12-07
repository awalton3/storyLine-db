<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $username = trim($request->username);
  $storyHashID = trim($request->storyHashID);

  $stmt = mysqli_prepare($con, "select * from accountsBookmarkStories as A where A.storyHashID=? and A.readerUsername=?");

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"ss", $storyHashID, $username);
    mysqli_stmt_execute($stmt);
    if (mysqli_stmt_errno($stmt) != 0)
    {
        echo $stmt->error;
    }

    $stories = [];
    $stories['bookmarked'] = 0;
    $i = 0;
    $result = mysqli_stmt_bind_result($stmt, $c1, $c2);
    while (mysqli_stmt_fetch($stmt)) {
        $stories['bookmarked'] = 1;
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
