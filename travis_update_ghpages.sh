#!/bin/bash

git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

set-up-ssh --key "$encrypted_e6e51d25be94_key" --iv "$encrypted_e6e51d25be94_iv" --path-encrypted-key "asterics_ergo_deploy_key.enc"

git subtree push --prefix custom/bin/ARE/data/webservice/ origin gh-pages
