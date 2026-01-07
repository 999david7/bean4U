<?php
/**
 * config.php
 * Supabase REST helper + Session init
 */

declare(strict_types=1);

define("SUPABASE_URL", "https://opmfwbbynlvzqwhnpqmh.supabase.co");

define(
    "SUPABASE_ANON_KEY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." .
    "eyJpc3MiOiJzdXBhYmJ5bmx2enF3aG5wcW1oIiwicm9sZSI6ImFub24iLCJpYXQi" .
    "OjE3NjIwODY4MDYsImV4cCI6MjA3NzY2MjgwNn0." .
    "SmS4N__rEP8TvY53W0dHRpclWavYyxZF225ylqCnmB0"
);

/**
 * Stell sicher, dass das hier EXAKT dein Tabellenname ist.
 * (Oft ist es in Postgres eigentlich "users" klein geschrieben.)
 */
define("USERS_TABLE", "Users");

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Supabase REST Request (PostgREST)
 *
 * @param string $endpoint Table/View name
 * @param string $method   GET|POST|PATCH|DELETE
 * @param array|null $data Request body (POST/PATCH)
 * @param string $query    Querystring, z.B. "?select=id&email=eq.test%40x.com"
 *
 * @return array ["ok"=>bool,"status"=>int,"data"=>mixed,"raw"=>string]
 */
function supabase_request(
    string $endpoint,
    string $method = "GET",
    ?array $data = null,
    string $query = ""
): array {
    $endpoint = ltrim($endpoint, "/");
    $baseUrl = rtrim(SUPABASE_URL, "/");
    $url = $baseUrl . "/rest/v1/" . $endpoint . $query;

    $ch = curl_init($url);
    if ($ch === false) {
        return [
            "ok" => false,
            "status" => 0,
            "data" => null,
            "raw" => "cURL init failed"
        ];
    }

    $headers = [
        "apikey: " . SUPABASE_ANON_KEY,
        "Authorization: Bearer " . SUPABASE_ANON_KEY,
        "Accept: application/json",
        "Content-Type: application/json",
        "Prefer: return=representation",
    ];

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    if ($data !== null && strtoupper($method) !== "GET") {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $raw = curl_exec($ch);
    $curlErr = curl_error($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($curlErr) {
        return ["ok" => false, "status" => $status, "data" => null, "raw" => $curlErr];
    }

    if ($raw === false || $raw === "") {
        return ["ok" => ($status >= 200 && $status < 300), "status" => $status,
            "data" => null, "raw" => ""];
    }

    $decoded = json_decode($raw, true);

    $ok = ($status >= 200 && $status < 300);

    return [
        "ok" => $ok,
        "status" => $status,
        "data" => $decoded,
        "raw" => $raw
    ];
}
