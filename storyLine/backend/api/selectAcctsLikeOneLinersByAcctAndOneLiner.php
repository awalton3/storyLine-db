<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $username = trim($request->username);
  $oneliner = trim($request->oneliner);

  $stmt = mysqli_prepare($con, "select * from accountsLikeOneLiners as A where A.oneLiner=? and A.authorUsername=? order by RAND()");

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"ss", $oneliner, $username);
    mysqli_stmt_execute($stmt);
    if (mysqli_stmt_errno($stmt) != 0)
    {
        echo $stmt->error;
    }

    $stories = [];
    $stories['liked'] = 0;
    $i = 0;
    $result = mysqli_stmt_bind_result($stmt, $c1, $c2);
    while (mysqli_stmt_fetch($stmt)) {
        $stories['liked'] = 1;
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
