#!/bin/bash
set -euo pipefail

# Build a Flatcar qcow2 image with embedded Ignition config.
# Resolves secrets from 1Password Connect before transpiling.
#
# Prerequisites:
#   - 1Password Connect running (localhost:8080)
#   - butane (brew install butane)
#   - libguestfs-tools (guestmount/guestunmount)
#   - wget
#
# Usage: ./build-image.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORK_DIR="$(mktemp -d /tmp/flatcar-build.XXXX)"
CONNECT_URL="${OP_CONNECT_URL:-http://localhost:8080}"
CONNECT_TOKEN="${OP_CONNECT_TOKEN:-$(cat ~/.config/op-connect/token)}"
VAULT_NAME="forge"
ITEM_NAME="pangolin"

echo "==> Resolving secrets from 1Password Connect"

vault_id=$(curl -sf -H "Authorization: Bearer $CONNECT_TOKEN" "$CONNECT_URL/v1/vaults" | \
  python3 -c "import sys,json; print(next(v['id'] for v in json.load(sys.stdin) if v['name']=='$VAULT_NAME'))")

item_id=$(curl -sf -H "Authorization: Bearer $CONNECT_TOKEN" "$CONNECT_URL/v1/vaults/$vault_id/items" | \
  python3 -c "import sys,json; print(next(i['id'] for i in json.load(sys.stdin) if i['title']=='$ITEM_NAME'))")

item=$(curl -sf -H "Authorization: Bearer $CONNECT_TOKEN" "$CONNECT_URL/v1/vaults/$vault_id/items/$item_id")

get_field() {
  echo "$item" | python3 -c "import sys,json; print(next(f['value'] for f in json.load(sys.stdin)['fields'] if f.get('label')=='$1'))"
}

FORGEJO_TOKEN=$(get_field "forgejo-token")
WEBHOOK_SECRET=$(get_field "webhook-secret")
OP_CONNECT_TOKEN_VALUE="$CONNECT_TOKEN"
OP_CREDENTIALS_JSON=$(cat ~/.config/op-connect/1password-credentials.json)

echo "==> Substituting secrets into Butane config"

sed \
  -e "s|\${FORGEJO_TOKEN}|${FORGEJO_TOKEN}|g" \
  -e "s|\${WEBHOOK_SECRET}|${WEBHOOK_SECRET}|g" \
  -e "s|\${OP_CONNECT_TOKEN}|${OP_CONNECT_TOKEN_VALUE}|g" \
  "$SCRIPT_DIR/config.yaml" > "$WORK_DIR/config.yaml"

# OP credentials JSON is multiline; use python for safe substitution
python3 -c "
import sys
with open('$WORK_DIR/config.yaml') as f:
    content = f.read()
creds = '''$(echo "$OP_CREDENTIALS_JSON")'''
content = content.replace('\${OP_CREDENTIALS_JSON}', creds)
with open('$WORK_DIR/config.yaml', 'w') as f:
    f.write(content)
"

echo "==> Transpiling Butane to Ignition"

butane --strict "$WORK_DIR/config.yaml" > "$WORK_DIR/config.ign"

echo "==> Downloading Flatcar stable image"

IMAGE_URL="https://stable.release.flatcar-linux.net/amd64-usr/current/flatcar_production_qemu_image.img"
IMAGE_FILE="$WORK_DIR/flatcar_production_qemu_image.img"

if [ -f "$SCRIPT_DIR/flatcar_production_qemu_image.img" ]; then
  echo "    Using cached image from $SCRIPT_DIR/"
  cp "$SCRIPT_DIR/flatcar_production_qemu_image.img" "$IMAGE_FILE"
else
  wget -q --show-progress -O "$IMAGE_FILE.bz2" "${IMAGE_URL}.bz2"
  echo "    Decompressing..."
  bunzip2 "$IMAGE_FILE.bz2"
fi

echo "==> Embedding Ignition into OEM partition (partition 6)"

OEM_MOUNT=$(mktemp -d /tmp/flatcar-oem.XXXX)
guestmount -a "$IMAGE_FILE" -m /dev/sda6 "$OEM_MOUNT"
cp "$WORK_DIR/config.ign" "$OEM_MOUNT/config.ign"
guestunmount "$OEM_MOUNT"
rmdir "$OEM_MOUNT"

OUTPUT="$SCRIPT_DIR/flatcar-pangolin.qcow2"
mv "$IMAGE_FILE" "$OUTPUT"

echo "==> Cleaning up"
rm -rf "$WORK_DIR"

echo ""
echo "Image ready: $OUTPUT"
echo ""
echo "Upload to Contabo via web console or API, then reinstall the VPS with this custom image."
