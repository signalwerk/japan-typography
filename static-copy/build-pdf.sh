#!/bin/bash


# Array of pages to be converted to PDF
pages=("/introduction" "/reference-mark" "/brackets" "/markers-of-approval-disapproval" "/setting-aesthetic-accents" "/typographic-strategies-for-webpage-integrations" "/finals-stroke")



basePath="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Load the .env file
source "$basePath/.env"

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




convert_to_pdf() {
    local page=$1
    local pdf_path=$2
    local className=$3

    local finalPath="https://paged.worker.signalwerk.ch${page}?originHostname=typography.japan.signalwerk.ch&addBodyClass=${className}&bust=$(date +%s)"
    echo "$finalPath"

    curl \
        --user $BASIC_AUTH_USERNAME:$BASIC_AUTH_PASSWORD \
        --request POST 'https://html2pdf.srv.signalwerk.ch/forms/chromium/convert/url' \
        --form "url=${finalPath}" \
        --form "printBackground=true" \
        --form "paperWidth=$paperWidth" \
        --form "paperHeight=$paperHeight" \
        --form "marginTop=0" \
        --form "marginBottom=0" \
        --form "marginLeft=0" \
        --form "marginRight=0" \
        --form 'waitDelay="1s"' \
        -o "$pdf_path"
}

merge_pdfs() {
    local output_file=${1:-"merged.pdf"}  # Default output filename
    local temp_dir="$basePath/pdf/.temp"
    mkdir -p "$temp_dir"

    # Create temporary numbered copies and prepare the --form string for curl
    local form_files=()
    local count=1
    for page in "${pages[@]}"; do
        local original_pdf="$basePath/pdf/${page:-"index"}.pdf"
        local temp_pdf="$temp_dir/$(printf "%05d" $count).pdf"
        cp "$original_pdf" "$temp_pdf"
        form_files+=(--form "files=@$temp_pdf")
        ((count++))
    done

    # Merge PDFs using curl
    output_path="$basePath/pdf/${output_file%.pdf}"
    curl \
        --user $BASIC_AUTH_USERNAME:$BASIC_AUTH_PASSWORD \
        --request POST \
        --url 'https://html2pdf.srv.signalwerk.ch/forms/pdfengines/merge' \
        "${form_files[@]}" \
        -o "${output_path}.pdf"


    pdftotext "${output_path}.pdf" "${output_path}.txt"
    pdfcpu booklet -- "p:A4, border:on" "${output_path}-mont.pdf" 2 "${output_path}.pdf"


    # Clean up temporary files
    rm -rf "$temp_dir"
}


# Convert each page to PDF
# for page in "${pages[@]}"; do
#     convert_to_pdf "$page"
# done

# Merge the generated PDFs
# merge_pdfs "_merged.pdf"


# convert_to_pdf "/" "$basePath/pdf/print.pdf" "pagedjs--pdf"
# pdftotext "$basePath/pdf/print.pdf" "$basePath/pdf/print.txt"
# pdfcpu booklet -- "formsize:A3" "$basePath/pdf/print-mont.pdf" 2 "$basePath/pdf/print.pdf"
convert_to_pdf "/" "$basePath/pdf/print-paper.pdf" "pagedjs--print"
