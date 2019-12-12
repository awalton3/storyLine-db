<?php

require 'database.php';

if ($_GET['follower'] !== null)
{
    if ($_GET['followed'] !== null)
    {
      $follower = trim($_GET['follower']);
      $followed = trim($_GET['followed']);
    }
}
else
{
  return http_response_code(400);
}


$stmt = mysqli_prepare($con, "delete from followers where follower=? and followed=?");

if ($stmt)
{
  mysqli_stmt_bind_param($stmt, "ss", $follower, $followed);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  http_response_code(200);
}
else
{
  return http_response_code(422);
}
