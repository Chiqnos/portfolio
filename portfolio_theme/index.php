<?php
$page_slug = 'top';
$page_css = $page_slug; //cssファイル名

//現在ページだけヘッダーに追加したいものがあれば下記のコメントアウトを解除してに中に記入
/* $add_css = <<<CSSDOC
CSSDOC; */

$current_path = dirname(__FILE__);

include_once($current_path . '/assets/inc/header.php');
?>

<!-- コンテンツここから -->
<main class="mainContents page_<?php echo $page_slig; ?>">
  <p class="px">16px</p>
  <p class="rem">16rem</p>
  <p class="vw">16vw</p>
</main>


<?php include_once($current_path . '/assets/inc/footer.php'); ?>

<!-- 現在のページのみ使用するJSはここから下に記述 -->


</body>

</html>