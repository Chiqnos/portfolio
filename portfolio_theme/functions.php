<?php
function remove_unnecessary_wp_head_info()
{
  remove_action('wp_head', 'wp_generator');
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'wlwmanifest_link');
  remove_action('wp_head', 'feed_links', 2);
  remove_action('wp_head', 'feed_links_extra', 3);
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('wp_print_styles', 'print_emoji_styles');
}

add_action('after_setup_theme', 'remove_unnecessary_wp_head_info');

// WordPressの機能をここで有効化するコードを追加
function initialize_theme_support()
{
  // サポートする機能を追加
  add_theme_support('post-thumbnails'); // アイキャッチ画像を有効化
  // その他の初期設定や機能追加
}

add_action('after_setup_theme', 'initialize_theme_support');
