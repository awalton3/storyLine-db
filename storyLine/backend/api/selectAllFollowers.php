<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $follower = trim($request->follower);

  $stmt = mysqli_prepare($con, "select * from followers where followers.follower=?");

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"s", $follower);
    mysqli_stmt_execute($stmt);
    if (mysqli_stmt_errno($stmt) != 0)
    {
        echo $stmt->error;
    }

    $arr = [];
    $i = 0;
    $result = mysqli_stmt_bind_result($stmt, $c1, $c2);
    while (mysqli_stmt_fetch($stmt)) {
        $arr[$i]['follower'] = $c1;
        $arr[$i]['followed'] = $c2;
        $arr[$i]['following'] = 1;
        $i++;
    }

    echo json_encode($arr);

    mysqli_stmt_close($stmt);
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }

}
