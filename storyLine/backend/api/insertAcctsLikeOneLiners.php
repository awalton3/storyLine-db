<?php
require 'database.php';


$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data
  $request = json_decode($postdata);

  $username = trim($request->authorUsername);
  $storyHashID = trim($request->storyHashID);

    $stmt = mysqli_prepare($con, "insert into accountsBookmarkStories (storyHashID,readerUsername, timestamp) values (?, ?, ?)");
    if ($stmt)
    {
        date_default_timezone_set('America/Chicago');
        $date_time = new DateTime();
        $date = $date_time->format('Y-m-d H:i:s');
        mysqli_stmt_bind_param($stmt, "sss", $storyHashID, $username, $date);
        mysqli_stmt_execute($stmt);
        $resultVar = [
        'username' => $username,
        'storyHashID' => $storyHashID ];

        echo json_encode($resultVar);
        if (mysqli_stmt_errno($stmt) != 0)
        {
            echo $stmt->error;
        }
        mysqli_stmt_close($stmt);
        http_response_code(201);

    }
    else
    {
        return http_response_code(422);
    }

}
