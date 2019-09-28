<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    function sanatise_input($input_string) {
        $input_string = trim($input_string);
        $input_string = htmlspecialchars($input_string, ENT_IGNORE, 'utf-8');
        $input_string = strip_tags($input_string);
        $input_string = stripslashes($input_string);
        return $input_string;
    }
    function dbConnect() {
        //GCP
        $conn = new PDO("mysql:host=localhost;dbname=sqs", 'root', '');
//        $conn = new PDO('mysql:unix_socket=/cloudsql/cmssubdomains:australia-southeast1:databstore;dbname=support_queue', 'queuemanager', '');

        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    }
    // REFACTORED

    function studentNoExists($studentNo, $password) {
        $conn = dbConnect();
        $sql = "
    SELECT * FROM student
                student_NO = :stno AND
                pass = :pass;";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':stno', $studentNo, PDO::PARAM_INT);
        $stmt->bindParam(':pass', $studentNo, PDO::PARAM_STR);
        $stmt->execute();
        $retVal = $stmt->fetch();
        if($stmt->rowCount() > 0) {
            return $retVal;
        } else {
            return false;
        }
    }
    function getQueue() {
        $conn = dbConnect();
        $sql = "
    SELECT * FROM `queue` WHERE
                queue_DATE > NOW() - INTERVAL 5 DAY;";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    function getSuggestions() {
        $conn = dbConnect();
        $sql = "
    SELECT * FROM `suggestion` JOIN queue ON
        queue.id = suggestion.queue_id WHERE
                queue_DATE > NOW() - INTERVAL 5 DAY;";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    function enQueue($queueData) {
        $conn = dbConnect();
        $queueTitle = sanatise_input($queueData['title']);
        $queueDesc = sanatise_input($queueData['desc']);

    // does the student already have an item in the queue?
        $checksql = "
    SELECT * FROM queue WHERE
        student_NO = :stno AND
        queue_DATE > NOW() - INTERVAL 5 DAY;";
        $stmt = $conn->prepare($checksql);
        $stmt->bindParam(':stno', $queueData['studentno'], PDO::PARAM_INT);
        $stmt->execute();
        if($stmt->rowCount() == 0) {
            $sql = "
            INSERT INTO queue (student_NO, queue_TITLE, queue_DESC)
                VALUES (:stno, :title, :desc);";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':stno', $queueData['studentno'], PDO::PARAM_INT);
            $stmt->bindParam(':title', $queueTitle, PDO::PARAM_STR);
            $stmt->bindParam(':desc', $queueDesc, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->rowCount();
        } else {
            return 0;
        }
    }
    function deQueue($queueID, $studentNO) {
        $conn = dbConnect();
        $checksql = "
    SELECT * FROM queue WHERE
        student_NO = :stno AND
        queue_DATE > NOW() - INTERVAL 5 DAY AND
        queue_ID = :queueno;";
        $stmt = $conn->prepare($checksql);
        $stmt->bindParam(':stno', $studentNO, PDO::PARAM_INT);
        $stmt->bindParam(':queueno', $queueID, PDO::PARAM_INT);
        $stmt->execute();
        if($stmt->rowCount() > 0) {
            $sql = "
    DELETE FROM queue
        WHERE queue_ID = :queueno;";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':queueno', $queueID, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->rowCount();
        } else {
            return 0;
        }
    }


?>
