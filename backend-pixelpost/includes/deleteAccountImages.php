<?php

function deleteAccountImages($user_id, $mysqli) { 

  $stmt = $mysqli->prepare("SELECT image_path FROM images WHERE user_id = ?");
  if (!$stmt) {
    return [
      'message' => 'Account deleted successfully and Prepare failed:' . $mysqli->error,
      'validator' => true
    ];
  }

  $stmt->bind_param("i", $user_id);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $deleteMessages = [];
    $filePaths = $result->fetch_all(MYSQLI_ASSOC);

    foreach ($filePaths as $row) {
      $imagePath = "../" . $row['image_path'];
      if (file_exists($imagePath)) {
        if (unlink($imagePath)) {
          $deleteMessages[] = "File $imagePath deleted successfully.";
        } else {
          $deleteMessages[] = "Error deleting the file $imagePath.";
        }
      } else {
        $deleteMessages[] = "File $imagePath not found.";
      }
    }

    $deleteStmt = $mysqli->prepare("DELETE FROM images WHERE user_id = ?");
    if (!$deleteStmt) {
      return [
        'message' => 'Account deleted successfully and Prepare failed:' . $mysqli->error,
        'validator' => true
      ];
    }

    $deleteStmt->bind_param("i", $user_id);
    if ($deleteStmt->execute()) {
      return [
        'message' => 'Account deleted successfully',
        'validator' => true
      ];
    } else {
      return [
        'message' => 'Account deleted successfully and Error deleting image',
        'validator' => true
      ];
    }
    $deleteStmt->close();

  } else {
    return [
      'message' => 'Account deleted successfully',
      'validator' => true
    ];
  }

  $stmt->close();
  $mysqli->close();
}
