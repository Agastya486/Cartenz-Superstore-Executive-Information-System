<?php
declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
| Ubah nilai di bawah jika kredensial server MySQL berbeda.
*/
define('DB_HOST', getenv('DB_HOST') ?: 'vwm60s.h.filess.io');
define('DB_PORT', getenv('DB_PORT') ?: '3307');
define('DB_NAME', getenv('DB_NAME') ?: 'superstore_db_pilotwatch');
define('DB_USER', getenv('DB_USER') ?: 'superstore_db_pilotwatch');
define('DB_PASS', getenv('DB_PASS') ?: 'd11d1695384ac35c6876fc213c036f44e021a182');

const APP_NAME = 'Cartenz Superstore EIS';

/* Akun admin awal (dibuat otomatis saat tabel admin_users masih kosong). */
const DEFAULT_ADMIN_USERNAME = 'admin';
const DEFAULT_ADMIN_PASSWORD = 'admin123';
const DEFAULT_ADMIN_NAME     = 'Administrator';

/* Interval polling data real-time di sisi browser (milidetik). */
const LIVE_SYNC_MS = 5000;