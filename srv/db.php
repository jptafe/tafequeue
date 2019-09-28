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
        $sql = "SELECT * FROM student WHERE student_NO = :stno AND pass = :pass";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':stno', $studentNo, PDO::PARAM_INT);
        $stmt->bindParam(':pass', $password, PDO::PARAM_STR);
        $stmt->execute();
        if($stmt->rowCount() > 0) {
            $retVal = $stmt->fetch(PDO::FETCH_ASSOC);
            return $retVal;
        } else {
            return false;
        }
    }
    function getQueue() {
        $conn = dbConnect();
        $sql = "
    SELECT queue.queue_ID, queue.student_NO, queue.queue_TITLE, queue.queue_DESC, student.nick
        FROM `queue` JOIN student ON student.student_NO = queue.student_NO
            WHERE queue_DATE > NOW() - INTERVAL 5 DAY;";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    function getSuggestions() {
        $conn = dbConnect();
        $sql = "
    SELECT * FROM `suggestion` JOIN queue ON
        queue.id = suggestion.queue_id WHERE
                queue_DATE > NOW() - INTERVAL 5 DAY;";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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
            return Array('insert'=>true);
        } else {
            return Array('insert'=>false);
        }
    }
    function deQueue($queueID, $studentNO) {
        $conn = dbConnect();
        if($studentNO == $_SESSION['student_NO'] || $_SESSION['privilege'] == 0) {
            $sql = "
    DELETE FROM queue
        WHERE queue_ID = :queueno;";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':queueno', $queueID, PDO::PARAM_INT);
            $stmt->execute();
            return Array('delete'=>true);
        } else {
            return Array('delete'=>false);
        }
    }
    function upSettings($studentNO, $nick, $pass) {
        $conn = dbConnect();
        $cleanNick = sanatise_input($nick);
        if($studentNO == $_SESSION['student_NO']) {
            $sql = "
        UPDATE student SET nick = :nick, pass = :pass
            WHERE student_NO = :studentno";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':studentno', $studentNO, PDO::PARAM_INT);
            $stmt->bindParam(':nick', $nick, PDO::PARAM_STR);
            $stmt->bindParam(':pass', $pass, PDO::PARAM_STR);
            $stmt->execute();
            return Array('update'=>true);
        } else {
            return Array('update'=>false);
        }
    }
?>
