<?php



header('Content-Type: application/json; charset=utf-8');




$jsonFile = __DIR__ . "/data/feedbacks.json";




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




$errors = [];
if (trim($name) === '') $errors[] = 'ชื่อไม่ควรว่าง';
if (!is_numeric($rating) || intval($rating) < 1 || intval($rating) > 5) $errors[] = 'คะแนนต้องเป็น 1-5';

if (!empty($errors)) {
    echo json_encode(['ok' => false, 'errors' => $errors], JSON_UNESCAPED_UNICODE);
    exit;
}



$newFeedback = [
    "name" => $name,
    "gender" => $gender,
    "rating" => $rating,
    "like" => $comment_like,
    "improve" => $comment_improve,
    "timestamp" => date("Y-m-d H:i:s")
];




$feedbacks[] = $newFeedback;




$dataDir = __DIR__ . "/data";
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}




file_put_contents($jsonFile, json_encode($feedbacks, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));




echo json_encode(['ok' => true, 'msg' => 'ส่งแบบประเมินเรียบร้อยแล้ว'], JSON_UNESCAPED_UNICODE);
exit;
?>
