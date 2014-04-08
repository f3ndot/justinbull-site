<?php

$ch = curl_init();
$timeout = 10;

curl_setopt($ch, CURLOPT_URL, "https://sentry2.f3ndot.com/status");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
curl_setopt($ch, CURLOPT_CAINFO, dirname(__FILE__) . '/cacert.pem');

$webpageContent = curl_exec($ch);
$statusJson = json_decode($webpageContent);

if (curl_errno($ch) || $statusJson == null) {
  $statusJson = json_decode(file_get_contents('life-status-cached.txt'));
  $statusJson->cached = true;
} else {
  file_put_contents('life-status-cached.txt', $webpageContent);
}

curl_close($ch);

echo json_encode($statusJson);
