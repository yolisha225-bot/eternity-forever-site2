<?php
/**
 * ETERNITY FOREVER — compteur de visiteurs uniques.
 *
 * Compte chaque visiteur une seule fois par tranche de 24h (dédoublonnage
 * par cookie technique "etfo_visited", sans donnée personnelle), puis
 * renvoie le total cumulé depuis le lancement.
 *
 * Le fichier de données (visits.json) n'est PAS suivi par Git : il est créé
 * automatiquement ici au premier appel et vit uniquement sur le serveur,
 * pour ne jamais être écrasé par un futur déploiement.
 */

header('Content-Type: application/json; charset=utf-8');

$dataFile = __DIR__ . '/visits.json';

// Ouvre (ou crée) le fichier en lecture/écriture, verrouille pour éviter
// les écritures concurrentes si deux visiteurs arrivent en même temps.
$fp = fopen($dataFile, 'c+');
if (!$fp) {
    http_response_code(500);
    echo json_encode(['count' => 0]);
    exit;
}

flock($fp, LOCK_EX);

$raw = stream_get_contents($fp);
$data = json_decode($raw, true);
if (!is_array($data) || !isset($data['count'])) {
    $data = ['count' => 0];
}

$alreadyCountedToday = isset($_COOKIE['etfo_visited']);

if (!$alreadyCountedToday) {
    $data['count'] = (int) $data['count'] + 1;
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data));
    fflush($fp);
    setcookie('etfo_visited', '1', time() + 86400, '/', '', true, true);
}

flock($fp, LOCK_UN);
fclose($fp);

echo json_encode(['count' => $data['count']]);
