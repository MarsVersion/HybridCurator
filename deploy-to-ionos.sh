#!/usr/bin/env bash
set -euo pipefail

# Deploy Hybrid Curator static site to IONOS via SFTP.
# Set these environment variables before running:
#   IONOS_SFTP_HOST   e.g. access123456789.webspace-data.io
#   IONOS_SFTP_USER   e.g. u12345678
#   IONOS_SFTP_PASS   your SFTP password
# Optional:
#   IONOS_SFTP_PATH   remote path (default: hybridcurator)

ROOT="$(cd "$(dirname "$0")" && pwd)"
REMOTE_PATH="${IONOS_SFTP_PATH:-hybridcurator}"
PORT="${IONOS_SFTP_PORT:-22}"

if [[ -z "${IONOS_SFTP_HOST:-}" || -z "${IONOS_SFTP_USER:-}" || -z "${IONOS_SFTP_PASS:-}" ]]; then
  echo "Missing IONOS_SFTP_HOST, IONOS_SFTP_USER, or IONOS_SFTP_PASS." >&2
  exit 1
fi

if ! command -v sshpass >/dev/null 2>&1; then
  echo "sshpass is required. Install with: brew install sshpass" >&2
  exit 1
fi

echo "Uploading site files to ${IONOS_SFTP_USER}@${IONOS_SFTP_HOST}:${REMOTE_PATH} ..."

export SSHPASS="$IONOS_SFTP_PASS"
sshpass -e sftp -oBatchMode=no -oStrictHostKeyChecking=accept-new -P "$PORT" "${IONOS_SFTP_USER}@${IONOS_SFTP_HOST}" <<EOF
cd ${REMOTE_PATH}
put "${ROOT}/index.html"
put "${ROOT}/privacy.html"
put "${ROOT}/demo.html"
put "${ROOT}/chat.html"
put "${ROOT}/chat.js"
put "${ROOT}/script.js"
put "${ROOT}/css/base.css" css/base.css
put "${ROOT}/css/home.css" css/home.css
put "${ROOT}/css/chat.css" css/chat.css
put "${ROOT}/images/hc-jm-sw.png" images/hc-jm-sw.png
put "${ROOT}/images/hc Facebook fallback.png" "images/hc Facebook fallback.png"
put "${ROOT}/images/hc code fallback.png" "images/hc code fallback.png"
put "${ROOT}/images/hc Facebook.mp4" "images/hc Facebook.mp4"
put "${ROOT}/images/hc code.mp4" "images/hc code.mp4"
put "${ROOT}/favicon/favicon.ico" favicon/favicon.ico
put "${ROOT}/favicon/favicon-16x16.png" favicon/favicon-16x16.png
put "${ROOT}/favicon/favicon-32x32.png" favicon/favicon-32x32.png
put "${ROOT}/favicon/favicon-180x180.png" favicon/favicon-180x180.png
put "${ROOT}/favicon/apple-touch-icon.png" favicon/apple-touch-icon.png
put "${ROOT}/favicon/android-chrome-192x192.png" favicon/android-chrome-192x192.png
put "${ROOT}/favicon/android-chrome-512x512.png" favicon/android-chrome-512x512.png
bye
EOF

echo "Upload complete."
