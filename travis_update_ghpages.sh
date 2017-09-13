#!/bin/bash

ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ./asterics_ergo_deploy_key.enc -out ./asterics_ergo_deploy_key -d
chmod 600 ./asterics_ergo_deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

git subtree push --prefix custom/bin/ARE/data/webservice/ origin gh-pages
