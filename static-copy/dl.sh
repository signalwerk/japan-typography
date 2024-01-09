rm -rf ./data/download/

mkdir -p ./data/download/
wget \
     --recursive \
     --level 5 \
     --force-directories \
     --keep-session-cookies \
     --no-clobber \
     --page-requisites \
     --html-extension \
     --span-hosts \
     --no-host-directories \
     --convert-links \
     --backup-converted \
     --domains fonts.signalwerk.ch,media.signalwerk.ch,typography.japan.signalwerk.ch \
     -P ./data/download/ \
     "https://typography.japan.signalwerk.ch/"


