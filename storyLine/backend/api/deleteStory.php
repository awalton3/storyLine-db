<?php

require 'database.php';

if ($_GET['storyHashID'] !== null)
{
  $storyHashID = trim($_GET['storyHashID']);
}
else
{
  return http_response_code(400);
}


$stmt = mysqli_prepare($con, "delete from stories where storyHashID=?");

if ($stmt)
{
  mysqli_stmt_bind_param($stmt, "s", $storyHashID);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  http_response_code(200);
}
else
{
  return http_response_code(422);
}

