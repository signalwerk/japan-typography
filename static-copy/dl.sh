rm -rf ./data/

     # --backup-converted \

mkdir -p ./data/
wget \
     --recursive \
     --level 5 \
     --force-directories \
     --keep-session-cookies \
     --restrict-file-names="ascii,lowercase" \
     --no-clobber \
     --page-requisites \
     --html-extension \
     --span-hosts \
     --no-host-directories \
     --convert-links \
     --domains fonts.signalwerk.ch,media.signalwerk.ch,typography.japan.signalwerk.ch \
     -P ./data/ \
     "https://typography.japan.signalwerk.ch/"

