<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $tag = trim($request->tag);

  $stmt = mysqli_prepare($con, "select * from storiesHaveTags where tag=?");

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"s", $tag);
    mysqli_stmt_execute($stmt);
    if (mysqli_stmt_errno($stmt) != 0)
    {
        echo $stmt->error;
    }

    $stories = [];
    $i = 0;
    $result = mysqli_stmt_get_result($stmt);
    while($row = mysqli_fetch_assoc($result)){ 
        $stories[$i]['storyHashID'] = $row['storyHashID'];
        $stories[$i]['tag'] = $row['tag'];
        $i++;
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

