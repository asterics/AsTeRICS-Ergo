#!/bin/bash

git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

openssl aes-256-cbc -K $encrypted_e6e51d25be94_key -iv $encrypted_e6e51d25be94_iv -in asterics_ergo_deploy_key.enc -out asterics_ergo_deploy_key -d
chmod 600 ./asterics_ergo_deploy_key

echo "adding ssh-key..."
eval `ssh-agent -s`
echo -e "\n" | ssh-add asterics_ergo_deploy_key

echo "pushing to gh-pages branch..."
git subtree push --prefix custom/bin/ARE/data/webservice/ origin gh-pages
