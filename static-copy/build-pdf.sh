#!/bin/bash

current_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Load the .env file
source "$current_dir/.env"

# Remove the output file if it already exists
rm -rf out.pdf

# Define variables for measurements in millimeters
paperWidth_mm=210
paperHeight_mm=297
marginTop_mm=0
marginBottom_mm=0
marginLeft_mm=0
marginRight_mm=0

# Calculate the conversion factor from millimeters to inches
mm_to_inch=$(bc -l <<< "1/25.4")

# 21 / 2.54 * 72
# 595.27559055

# 8.26 /MediaBox [0 0 594.95996 841.91998]
# 8.264 /MediaBox [0 0 595.91998 841.91998]
# 8.265 /MediaBox [0 0 595.91998 841.91998]
# 8.27  /MediaBox [0 0 595.91998 841.91998]



# Convert measurements from millimeters to inches
paperWidth=$(bc -l <<< "$paperWidth_mm * $mm_to_inch")
paperHeight=$(bc -l <<< "$paperHeight_mm * $mm_to_inch")
marginTop=$(bc -l <<< "$marginTop_mm * $mm_to_inch")
marginBottom=$(bc -l <<< "$marginBottom_mm * $mm_to_inch")
marginLeft=$(bc -l <<< "$marginLeft_mm * $mm_to_inch")
marginRight=$(bc -l <<< "$marginRight_mm * $mm_to_inch")

echo "paperWidth: $paperWidth"
echo "paperHeight: $paperHeight"
echo "marginTop: $marginTop"
echo "marginBottom: $marginBottom"

# Use the converted variables in the curl command
    # --request POST 'http://localhost:8084/forms/chromium/convert/url' \
    # --form "url=https://webhook.site/eb4c719d-4028-4cb2-8586-0d7988940b79" \
    # --form "url=https://paged.signalwerk.workers.dev/" \
    # --form 'extraHttpHeaders="{\"x-origin-hostname\": \"typography.japan.signalwerk.ch\"}"' \
    # --form 'waitDelay="5s"' \
curl \
--user $BASIC_AUTH_USERNAME:$BASIC_AUTH_PASSWORD \
    --request POST 'https://html2pdf.srv.signalwerk.ch/forms/chromium/convert/url' \
    --form "url=https://paged.signalwerk.workers.dev/brackets/?originHostname=typography.japan.signalwerk.ch&bust=$(date +%s)" \
    --form "paperWidth=$paperWidth" \
    --form "paperHeight=$paperHeight" \
    --form "marginTop=0" \
    --form "marginBottom=0" \
    --form "marginLeft=0" \
    --form "marginRight=0" \
    --form 'waitDelay="1s"' \
-o "$current_dir/main.pdf"
