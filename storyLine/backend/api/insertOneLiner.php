<?php
require 'database.php';


$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data
  $request = json_decode($postdata);

  $oneLiner = trim($request->oneLiner);
  $numViews = (int)$request->numViews;
  $writtenAnon = (int)$request->writtenAnon;
  $timestamp = trim($request->timestamp);
  $authorUsername = trim($request->authorUsername);
  $numUpVotes = (int)$request->numUpVotes;

    $stmt = mysqli_prepare($con, "insert into oneLiners (oneLiner,numViews,writtenAnon,timestamp,authorUsername,numUpVotes) values (?, ?, ?, ?, ?, ?)");
    if ($stmt)
    {
        /*echo '<script>';
  echo 'console.log('. json_encode( $ ) .')';
  echo '</script>';*/
        mysqli_stmt_bind_param($stmt, "siissi", $oneLiner, $numViews, $writtenAnon, $timestamp, $authorUsername, $numUpVotes);
        mysqli_stmt_execute($stmt);
        $resultVar = [
      'oneLiner' => $oneLiner,
      'numViews' => $numViews,
      'writtenAnon' => $writtenAnon,
      'timestamp' => $timestamp,
      'authorUsername' => $authorUsername,
      'numUpVotes' => $numUpVotes
    ];

        if (mysqli_stmt_errno($stmt) != 0)
        {
            echo $stmt->error;
        }
        echo json_encode($resultVar);
        mysqli_stmt_close($stmt);
        http_response_code(201);
        
    }
    else
    {
        return http_response_code(422);
    }

}
