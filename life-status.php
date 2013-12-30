<?php

$ch = curl_init();
$timeout = 10;

curl_setopt($ch, CURLOPT_URL, "https://sentry2.f3ndot.com/status");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
curl_setopt($ch, CURLOPT_CAINFO, dirname(__FILE__) . '/cacert.pem');

$statusJson = json_decode(curl_exec($ch));

if (curl_errno($ch)) {
  $statusJson = array(
    'status' => 'Error fetching life status',
    'color' => 'red',
    'bold' => true,
    'verify' => "There was an error contacting the life status server.\n\nIt may be offline or temporarily unavailable."
  );
}

curl_close($ch);

echo json_encode($statusJson);
