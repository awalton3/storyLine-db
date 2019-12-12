<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $follower = trim($request->follower);
  $followed = trim($request->followed);

  $stmt = mysqli_prepare($con, "select * from followers where followers.follower=? and followers.followed=?");

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"ss", $follower, $followed);
    mysqli_stmt_execute($stmt);
    if (mysqli_stmt_errno($stmt) != 0)
    {
        echo $stmt->error;
    }

    $arr = [];
    $result = mysqli_stmt_bind_result($stmt, $c1, $c2);
    if (mysqli_stmt_fetch($stmt)) {
      $arr['following'] = 1;
        // $arr[$i]['follower'] = $c1;
        // $arr[$i]['followed'] = $c2;
        // $arr[$i]['following'] = 1;
        // $i++;
    }

    // echo json_encode($request);
    echo json_encode($arr);

    mysqli_stmt_close($stmt);
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }

}
