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
  <div class="jumbotron" style="background-image: url('/assets/img/elements/jumbotron-bg.jpg');">
    <div class="jumbotron__inner">
      <p class="jumbotron__title">
        貴社のビジネスに適切な戦略をご提案し
        <br class="only-lg">
        「成果」に貢献いたします。
      </p>
    </div>
    <!-- /.jumbotron__inner -->
  </div>
  <!-- /.jumbotron -->
</main>


<?php include_once($current_path . '/assets/inc/footer.php'); ?>

<!-- 現在のページのみ使用するJSはここから下に記述 -->

<div class="mask" id="mask"></div>
</body>

</html>