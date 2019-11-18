<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $username = trim($request->username);

  $stmt = mysqli_prepare($con, "select * from accounts where username=?");

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"s", $username);
    mysqli_stmt_execute($stmt);
    if (mysqli_stmt_errno($stmt) != 0)
    {
        echo $stmt->error;
    }

    $accounts = [];
    $i = 0;
    $result = mysqli_stmt_bind_result($stmt, $c1, $c2, $c3, $c4);
    while (mysqli_stmt_fetch($stmt)) {
        $accounts[$i]['username'] = $c1;
        $accounts[$i]['email'] = $c2;
        $accounts[$i]['displayName'] = $c3;
        $accounts[$i]['hashedPassword'] = $c4;
        $i++;
    }
    echo json_encode($accounts);

    mysqli_stmt_close($stmt);
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }

}

