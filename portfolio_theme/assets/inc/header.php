<?php
global $site_url;

global $page_url;
global $page_slug;
global $page_name;
global $page_dsc;

global $parent_name;

global $page_css;
global $add_css;

global $version;

// META
$site_tit = 'Chiqnos';

if ($page_slug == 'top') {
  $page_tit = $site_tit;
} elseif (isset($grand_name)) { //第4階層
  $page_tit = $page_name . '｜' . $parent_name . '｜' . $grand_name . '｜' . $site_tit;
} elseif (isset($parent_name)) { //第3階層
  $page_tit = $page_name . '｜' . $parent_name . '｜' . $site_tit;
} else { //第2階層
  $page_tit = $page_name . '｜' . $site_tit;
}

//canonical
$site_htp = empty($_SERVER["HTTPS"]) ? "http://" : "https://";
$site_url = $site_htp . $_SERVER["SERVER_NAME"];
$page_url = $site_htp . $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];

//user agent
$ua = $_SERVER['HTTP_USER_AGENT'];
$browser = ((strpos($ua, 'iPhone') !== false) || (strpos($ua, 'iPod') !== false) || (strpos($ua, 'Android') !== false));

//description
if (!isset($page_dsc)) $page_dsc = 'Chicnos(築の巣)は、京都を拠点に活動するWebコーダーです。お客様の想いを込めたウェブサイトを丁寧にコーディングいたします。';

//version
$version = '?v=' . date("Ymd-His");
?>
<!DOCTYPE html>
<html lang="ja">

<head>

  <meta charset="utf-8">
  <?php if ($browser == 'sp') : ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes">
  <?php else : ?>
    <meta name="viewport" content="width=device-width">
  <?php endif; ?>

  <meta name="format-detection" content="telephone=no,address=no,email=no">

  <!-- web font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Zen+Kaku+Gothic+New:wght@700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Noto+Serif+JP&display=swap" rel="stylesheet">


  <!-- web icon -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <?php if (isset($add_css)) echo $add_css; ?>

  <!-- css -->
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/common.min.css<?php echo $version; ?>">

  <?php if (isset($page_css)) : ?>
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/<?php echo $page_css; ?>.min.css<?php echo $version; ?>">
  <?php endif; ?>

  <!-- js -->
  <link rel="prefetch" href="<?php echo get_template_directory_uri(); ?>/assets/js/jquery.min.js" as="script">
  <link rel="prefetch" href="<?php echo get_template_directory_uri(); ?>/assets/js/script.js" as="script">
  <script src="<?php echo get_template_directory_uri(); ?>/assets/js/jquery.min.js"></script>

  <meta name="description" content="<?php echo $page_dsc; ?>">
  <meta property="og:description" content="<?php echo $page_dsc; ?>">

  <link rel="canonical" href="<?php echo $page_url; ?>">
  <meta property="og:title" content="<?php echo $page_tit; ?>">
  <meta property="og:url" content="<?php echo $page_url; ?>">
  <meta property="og:type" content="<?php if ($page_slug == 'top') : ?>website<?php else : ?>article<?php endif; ?>">
  <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/img/common/ogp.png">
  <meta name="twitter:card" content="summary_large_image">


  <meta name="copyright" content="Copyright © Chiqnos All Rights Reserved.">

  <!-- icon -->
  <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
  <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/common/apple_touch_icon.png">


  <title><?php echo $page_tit; ?></title>
</head>


<body>

  <!-- ヘッダーここから -->
  <header class="header">
    <div class="header_container">
      <h1 class="brand_name">
        <a class="brand_name_link" href="/">
          Chiqnos
        </a>
      </h1>
      <div class="hamburger_menu sp_only">
        <button class="hamburger_menu_btn">
          <span></span>
        </button>
        <p class="hamburger_menu_text">Menu</p>
      </div>

      <div class="header_nav">
        <nav class="nav_menu" aria-label="サイト内メニュー">
          <ul class="menu_list">
            <li class="menu_list_item">
              <a class="menu_list_item_link" href="#service">Service</a>
            </li>
            <li class="menu_list_item">
              <a class="menu_list_item_link" href="#flow">Flow</a>
            </li>
            <li class="menu_list_item">
              <a class="menu_list_item_link" href="#works">Works</a>
            </li>
            <li class="menu_list_item">
              <a class="menu_list_item_link" href="#about">About</a>
            </li>
          </ul>
        </nav>
        <p class="contact">
          <a class="contact_link" href="#contact">
            お問い合わせ・ご相談
          </a>
        </p>
      </div>
    </div>
  </header>