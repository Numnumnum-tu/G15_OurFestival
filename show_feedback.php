<?php

date_default_timezone_set('Asia/Bangkok');

$jsonFile = __DIR__ . '/data/feedbacks.json';
$items = [];
if (file_exists($jsonFile)) {
    $items = json_decode(file_get_contents($jsonFile), true);
    if (!is_array($items)) $items = [];
}


usort($items, function($a, $b){
    $ta = $a['timestamp'] ?? ($a['created_at'] ?? '');
    $tb = $b['timestamp'] ?? ($b['created_at'] ?? '');
    return strcmp($tb, $ta);
});

function e($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
?>
<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>All Feedback</title>
  <link rel="icon" type="image/png" href="img/G15_logo.png">
  <link rel="stylesheet" href="CSS/Leave Your Feedback Page.css">
  <script src="Javascript/feedback.js" defer></script>
</head>
<body>
  <div class="Heading">
    <button id="sidebarToggle" class="toggle-btn" aria-expanded="false">☰</button>
    <img src="img/G15_logo.png" class="heading-logo" alt="Logo">
  </div>

  <aside id="leftSide" class="left-side" aria-hidden="true">
    <nav>
      <img src="img/G15_logo.png" class="side-logo" alt="Logo Sidebar">
      <ul class="side-list">
        <li><a href="index.html"><span class="icon">🏠</span>Homepage</a></li>
        <li><a href="Booth Directory Page.html"><span class="icon">📂</span>Booth Directory</a></li>
        <li style="padding-left:20px"><a href="Booth1 Page.html">• Booth 1</a></li>
        <li style="padding-left:20px"><a href="Booth2 Page.html">• Booth 2</a></li>
        <li style="padding-left:20px"><a href="Booth3 Page.html">• Booth 3</a></li>
        <li style="padding-left:20px"><a href="Booth4 Page.html">• Booth 4</a></li>
        <li><a href="Registration Page.html">📝 Registration</a></li>
        <li><a href="Leave Your Feedback Page.html">💬 Feedback</a></li>
        <li style="padding-left:20px"><a href="show_feedback.php">• View all feedback</a></li>
      </ul>
    </nav>
  </aside>

  <div class="drawer-backdrop" id="drawerBackdrop"></div>

  <div class="fb-container">
    <header class="page-header">
      <h1>ความคิดเห็นทั้งหมด</h1>

      <div class="fb-search-row">
        <form method="get" style="display:flex; width:100%; max-width:600px; gap:12px; align-items:center;">
          <input type="text" name="q" id="q" placeholder="ค้นหาคำในความคิดเห็น..." value="<?php echo e($_GET['q'] ?? ''); ?>">
          <button type="submit" class="btn">ค้นหา</button>
        </form>
      </div>
    </header>

    <main>
      <?php
        $q = isset($_GET['q']) ? trim($_GET['q']) : '';
        $qLower = mb_strtolower($q, 'UTF-8');
        $count = 0;
      ?>

      <div class="fb-cards" role="list">
        <?php foreach ($items as $fb):
          if ($q !== '') {
            $hay = mb_strtolower( ($fb['name'] ?? '') . ' ' . ($fb['like'] ?? '') . ' ' . ($fb['improve'] ?? ''), 'UTF-8');
            if (mb_strpos($hay, $qLower) === false) continue;
          }
          $count++;
          $name = e($fb['name'] ?? '');
          $gender = e($fb['gender'] ?? '');
          $rating = intval($fb['rating'] ?? 0);
          $like = nl2br(e($fb['like'] ?? ''));
          $improve = nl2br(e($fb['improve'] ?? ''));
          $ts = e($fb['timestamp'] ?? ($fb['created_at'] ?? ''));
        ?>
          <article class="fb-card" role="listitem">
            <div class="fb-meta"><strong class="name"><?php echo $name; ?></strong><?php echo $gender ? " / ". $gender : ''; ?></div>

            <div class="fb-stars" aria-hidden="true">
              <?php for ($s=1;$s<=5;$s++): ?>
                <span class="star<?php echo $s <= $rating ? ' active' : ''; ?>">★</span>
              <?php endfor; ?>
              <span style="margin-left:8px; color:#666; font-size:.95rem;"><?php echo $rating; ?>/5</span>
            </div>

            <div class="fb-row">
              <div class="label">ชอบ</div>
              <div class="content"><?php echo $like; ?></div>
            </div>

            <div class="fb-row">
              <div class="label">ควรปรับปรุง</div>
              <div class="content"><?php echo $improve; ?></div>
            </div>

            <div class="fb-row footer"><small class="ts"><?php echo $ts; ?></small></div>
          </article>
        <?php endforeach; ?>
      </div>

      <?php if ($count === 0): ?>
        <p class="no-data">ไม่พบความคิดเห็น<?php echo $q ? " ที่ตรงกับ “".e($q)."”" : ''; ?>.</p>
      <?php else: ?>
        <p class="muted" style="text-align:center; margin-top:18px;">พบความคิดเห็นทั้งหมด <?php echo $count; ?> รายการ.</p>
      <?php endif; ?>
    </main>
  </div>

  <div class="footer">
    <p>© 2025 Dreamy Cloud Festival | Group 15</p>
  </div>


</body>
</html>
