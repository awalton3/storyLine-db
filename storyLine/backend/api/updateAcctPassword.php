<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $username = trim($request->username);
  $hashedPassword = hash("sha256", trim($request->password));

  $stmt = mysqli_prepare($con, "update accounts set hashedPassword=? where username=?");

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"ss", $hashedPassword, $username);
    mysqli_stmt_execute($stmt);
    if (mysqli_stmt_errno($stmt) != 0)
    {
        echo $stmt->error;
    }
    mysqli_stmt_close($stmt);
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }

}

