<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/auth.php';

require_login_page();

$user = current_user();

$tab = (string) ($_GET['tab'] ?? 'dashboard');
if (!in_array($tab, ['dashboard', 'etl'], true)) {
    $tab = 'dashboard';
}

require __DIR__ . '/views/dashboard.php';
