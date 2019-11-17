<?php

require 'database.php';

if ($_GET['storyHashID'] !== null)
{
  if ($_GET['tag'] !== null)
  {
    $storyHashID = trim($_GET['storyHashID']);
    $tag = trim($_GET['tag']);
  }
}
else
{
  return http_response_code(400);
}


$stmt = mysqli_prepare($con, "delete from storiesHaveTags where storyHashID=? and tag=?");

if ($stmt)
{
  mysqli_stmt_bind_param($stmt, "ss", $storyHashID, $tag);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  http_response_code(200);
}
else
{
  return http_response_code(422);
}

