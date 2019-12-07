<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $username = trim($request->username);

  $stmt = mysqli_prepare($con, "select * from accountsBookmarkStories as A, stories as S where A.storyHashID=S.storyHashID and A.readerUsername=?");

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
    $result = mysqli_stmt_bind_result($stmt, $c1, $c2, $c3, $c4, $c5, $c6, $c7, $c8, $c9, $c10, $c11);
    while (mysqli_stmt_fetch($stmt)) {
        $stories[$i]['storyHashID'] = $c1;
        $stories[$i]['oneLiner'] = $c2;
        $stories[$i]['requiresReview'] = $c3;
        $stories[$i]['sensitiveContent'] = $c4;
        $stories[$i]['numViews'] = $c5;
        $stories[$i]['writtenAnon'] = $c6;
        $stories[$i]['content'] = $c7;
        $stories[$i]['estReadTime'] = $c8;
        $stories[$i]['timestamp'] = $c9;
        $stories[$i]['authorUsername'] = $c10;
        $stories[$i]['numUpVotes'] = $c11;
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

