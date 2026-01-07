<?php
/**
 * config.php
 * Zentrale Konfiguration + Supabase REST Helper
 */

declare(strict_types=1);

define("SUPABASE_URL", "https://opmfwbbynlvzqwhnpqmh.supabase.co");

define(
    "SUPABASE_ANON_KEY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." .
    "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbWZ3YmJ5bmx2enF3aG5wcW1oIiw" .
    "icm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODY4MDYsImV4cCI6MjA3NzY2MjgwNn0." .
    "SmS4N__rEP8TvY53W0dHRpclWavYyxZF225ylqCnmB0"
);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Supabase REST Request (PostgREST)
 *
 * @param string $endpoint    z.B. "Users"
 * @param string $method      GET|POST|PATCH|DELETE
 * @param array|null $data    Body-Daten (für POST/PATCH)
 * @param string $queryString z.B. "?select=id&email=eq.test%40mail.com"
 *
 * @return array Ergebnis (decoded JSON) oder ["error" => "...", "status" => 0]
 */
function supabase_request(
    string $endpoint,
    string $method = "GET",
    ?array $data = null,
    string $queryString = ""
): array {
    $endpoint = ltrim($endpoint, "/");
    $baseUrl = rtrim(SUPABASE_URL, "/");
    $url = $baseUrl . "/rest/v1/" . $endpoint;

    if ($queryString !== "") {
        $url .= $queryString;
    }

    $ch = curl_init($url);
    if ($ch === false) {
        return ["error" => "cURL init failed", "status" => 0];
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

    $response = curl_exec($ch);
    $curlError = curl_error($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($curlError) {
        return ["error" => $curlError, "status" => $status];
    }

    if ($response === false || $response === "") {
        return ["error" => "Empty response", "status" => $status];
    }

    $decoded = json_decode($response, true);
    if (!is_array($decoded)) {
        return ["error" => "Invalid JSON response", "status" => $status];
    }

    return $decoded;
}
