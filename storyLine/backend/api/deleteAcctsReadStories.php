<?php

require 'database.php';

if ($_GET['storyHashID'] !== null)
{
    if ($_GET['authorUsername'] !== null)
    {
      $storyHashID = trim($_GET['storyHashID']);
      $authorUsername = trim($_GET['authorUsername']);
    }
}
else
{
  return http_response_code(400);
}


$stmt = mysqli_prepare($con, "delete from accountsReadStories where storyHashID=? and authorUsername=?");

if ($stmt)
{
  mysqli_stmt_bind_param($stmt, "ss", $storyHasID, $authorUsername);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  http_response_code(200);
}
else
{
  return http_response_code(422);
}

