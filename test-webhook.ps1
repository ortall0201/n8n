# Test Newsletter Signup Webhook
# Usage: Paste the test URL from n8n here

$testUrl = "http://localhost:5678/webhook-test/YOUR-UNIQUE-ID/newsletter-signup"
$body = @{
    email = "test@example.com"
    name = "Test User"
} | ConvertTo-Json

Write-Host "Testing webhook at: $testUrl"
Write-Host "Sending data: $body"

try {
    $response = Invoke-WebRequest -Uri $testUrl -Method POST -Body $body -ContentType "application/json"
    Write-Host "Success! Response:"
    Write-Host $response.Content
} catch {
    Write-Host "Error: $_"
    Write-Host "Response: $($_.Exception.Response)"
}
