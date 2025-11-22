<?php

date_default_timezone_set('Asia/Bangkok');
header('Content-Type: application/json; charset=utf-8');

$jsonFile = __DIR__ . '/data/feedbacks.json';


$feedbacks = [];
if (file_exists($jsonFile)) {
    $feedbacks = json_decode(file_get_contents($jsonFile), true);
    if (!is_array($feedbacks)) $feedbacks = [];
}


$name = $_POST['name'] ?? '';
$gender = $_POST['gender'] ?? '';
$rating = $_POST['rating'] ?? '';
$comment_like = $_POST['comment_like'] ?? '';
$comment_improve = $_POST['comment_improve'] ?? '';


$ts = date('Y-m-d H:i:s');

$newFeedback = [
    "name" => $name,
    "gender" => $gender,
    "rating" => $rating,
    "like" => $comment_like,
    "improve" => $comment_improve,
    "timestamp" => $ts
];

$feedbacks[] = $newFeedback;


file_put_contents($jsonFile, json_encode($feedbacks, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));


echo json_encode(['ok' => true, 'msg' => 'ส่งแบบประเมินเรียบร้อยแล้ว']);
exit;
