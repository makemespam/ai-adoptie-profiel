$env_vars = @(
  @{ name = "NEXT_PUBLIC_EMAILJS_SERVICE_ID";        value = "VERVANG_MET_BUREAUTJEAAP_EMAILJS_KEY" },
  @{ name = "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER";  value = "VERVANG_MET_BUREAUTJEAAP_EMAILJS_KEY" },
  @{ name = "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN"; value = "VERVANG_MET_BUREAUTJEAAP_EMAILJS_KEY" },
  @{ name = "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY";        value = "VERVANG_MET_BUREAUTJEAAP_EMAILJS_KEY" },
  @{ name = "NEXT_PUBLIC_ADMIN_EMAIL";               value = "VERVANG_MET_BUREAUTJEAAP_EMAILJS_KEY" }
)

foreach ($item in $env_vars) {
  $tmpFile = [System.IO.Path]::GetTempFileName()
  # WriteAllText: no trailing newline whatsoever
  [System.IO.File]::WriteAllText($tmpFile, $item.value)
  Write-Host "Adding $($item.name)..."
  Get-Content -Raw $tmpFile | npx vercel env add $item.name production
  Remove-Item $tmpFile
}

Write-Host "Done."
