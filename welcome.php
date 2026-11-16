<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/auth.php';

require_login_page();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome | Cartenz Superstore EIS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-6 selection:bg-sky-500 selection:text-white">
    <div class="w-full max-w-xl text-center">
        <img src="public/logo.png" alt="Cartenz Logo" class="w-14 h-14 object-contain rounded-xl bg-slate-800/60 p-1 border border-slate-700/60 mx-auto mb-5">
        <p class="text-xs uppercase tracking-wider text-sky-400 font-semibold">Cartenz Superstore</p>
        <p class="text-[11px] text-slate-500">Executive Information System</p>

        <h1 class="text-2xl font-extrabold text-white mt-5">Selamat Datang di Superstore Executive Information System (EIS)</h1>
        <p class="text-sm text-slate-400 mt-3 leading-relaxed">Platform visualisasi data terintegrasi untuk memantau kinerja penjualan, mendeteksi titik kebocoran profitabilitas, serta mensimulasikan kebijakan batas diskon secara real-time. Silakan pilih modul di bawah ini untuk memulai analisis strategis maupun meninjau alur pengolahan data perusahaan.</p>

        <div class="flex flex-col gap-3 mt-8">
            <a href="index.php?tab=dashboard"
               class="w-full bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white text-sm font-semibold rounded-xl py-3 transition shadow-lg shadow-sky-900/30">
                Dashboard
            </a>
            <a href="index.php?tab=etl"
               class="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl py-3 border border-slate-700 transition">
                ETL
            </a>
        </div>
    </div>
</body>
</html>
