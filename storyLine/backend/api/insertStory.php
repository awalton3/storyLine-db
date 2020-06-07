<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $storyHashID = hash("sha256", trim($request->content));
  $oneLiner = trim($request->oneLiner);
  $writtenAnon = (int)$request->writtenAnon;
  $content = trim($request->content);
  $timestamp = trim($request->timestamp);
  $authorUsername = trim($request->authorUsername);
  $numUpVotes = (int)$request->numUpVotes;

  $stmt = mysqli_prepare($con, "insert into stories (storyHashID,oneLiner,writtenAnon,content,timestamp,authorUsername,numUpVotes) values (?,?,?,?,?,?,?);");

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"ssisssi", $storyHashID,$oneLiner,$writtenAnon,$content,$timestamp,$authorUsername,$numUpVotes);
    mysqli_stmt_execute($stmt);

    if (mysqli_stmt_errno($stmt) != 0)
    {
        echo $stmt->error;
        echo $storyHashID;
    }

    mysqli_stmt_close($stmt);
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }

}
