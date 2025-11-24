<?php
date_default_timezone_set('Asia/Bangkok');
$jsonFile = __DIR__ . '/data/registrants.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $faculty = $_POST['faculty_select'] ?? '';
    if ($faculty === 'Other') {
        $faculty = $_POST['faculty_other'] ?? 'ไม่ระบุ';
    }

    $newData = [
        'fullname' => htmlspecialchars($_POST['fullname'] ?? ''),
        'email' => htmlspecialchars($_POST['email'] ?? ''),
        'faculty' => htmlspecialchars($faculty), 
        'year_level' => htmlspecialchars($_POST['year_level'] ?? ''),
        'timestamp' => date("d/m/Y H:i:s")
    ];

    $currentData = [];
    if (file_exists($jsonFile)) {
        $currentData = json_decode(file_get_contents($jsonFile), true);
        if (!is_array($currentData)) $currentData = [];
    }
    
    array_unshift($currentData, $newData);
    file_put_contents($jsonFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$registrants = [];
if (file_exists($jsonFile)) {
    $registrants = json_decode(file_get_contents($jsonFile), true);
    if (!is_array($registrants)) $registrants = [];
}
?>

<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrants List</title>
    <link rel="icon" type="image/png" href="img/G15_logo.png">
    <link rel="stylesheet" href="CSS/Registration Page.css">
    <script src="Javascript/Registration.js" defer></script>
</head>
<body>

    <div class="Heading">
        <button id="sidebarToggle" class="toggle-btn">☰</button>
        <img src="img/G15_logo.png" class="heading-logo" alt="Logo">
    </div>

    <aside id="leftSide" class="left-side">
        <nav>
            <img src="img/G15_logo.png" class="side-logo" alt="Logo Sidebar">
            <ul class="side-list">
                <li><a href="index.html"><span class="icon">🏠</span>Homepage</a></li>
                <li><a href="Booth Directory Page.html"><span class="icon">📂</span>Booth Directory</a></li>
                <li style="padding-left: 20px;"><a href="Booth1 Page.html"><span class="icon">•</span>Booth 1</a></li>
                <li style="padding-left: 20px;"><a href="Booth2 Page.html"><span class="icon">•</span>Booth 2</a></li>
                <li style="padding-left: 20px;"><a href="Booth3 Page.html"><span class="icon">•</span>Booth 3</a></li>
                <li style="padding-left: 20px;"><a href="Booth4 Page.html"><span class="icon">•</span>Booth 4</a></li>
                
                <li><a href="Registration Page.html"><span class="icon">📝</span>Registration</a></li>
                <li style="padding-left: 20px;">
                    <a href="registration_summary.php" style="color: #59a8ff; font-weight: bold;">
                        <span class="icon">🔍</span>Check List
                    </a>
                </li>
                <li><a href="Leave Your Feedback Page.html"><span class="icon">💬</span>Feedback</a></li>
                <li style="padding-left: 20px;"><a href="show_feedback.php"><span class="icon">•</span>View all feedback</a></li>
            </ul>
        </nav>
    </aside>

    <div class="regis-container" style="flex-direction: column; align-items: center;">
        
        <div class="summary-card">
            <a href="Registration Page.html" class="btn-back">← กลับไปหน้าลงทะเบียน</a>
            
            <h2 style="text-align: center; margin-top: 10px;">📋 รายชื่อผู้ลงทะเบียน</h2>
            <p style="text-align: center; color:#666;">จำนวน: <strong><?php echo count($registrants); ?></strong> คน</p>

            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th width="10%">ลำดับ</th>
                            <th width="20%">เวลา</th>
                            <th width="25%">ชื่อ-นามสกุล</th>
                            <th width="30%">คณะ / สาขา</th>
                            <th width="15%">ชั้นปี</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($registrants)): ?>
                            <tr><td colspan="5" style="text-align:center; padding: 30px; color: #999;">ยังไม่มีข้อมูล</td></tr>
                        <?php else: ?>
                            <?php foreach ($registrants as $index => $person): ?>
                            <tr>
                                <td style="text-align: center;"><?php echo count($registrants) - $index; ?></td>
                                <td style="color:#888; font-size: 0.9em;"><?php echo $person['timestamp']; ?></td>
                                <td style="font-weight: bold; color: #333;"><?php echo $person['fullname']; ?></td>
                                <td>
                                    <span class="zone-badge">
                                        <?php echo $person['faculty']; ?>
                                    </span>
                                </td>
                                <td><?php echo $person['year_level']; ?></td>
                            </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="drawer-backdrop" id="drawerBackdrop"></div>
    <div class="footer"><p>© 2025 Dreamy Cloud Festival | Group 15</p></div>
</body>
</html>