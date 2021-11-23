#!/bin/bash
if [ "$GITHUB_PRIVATE_KEY" ]; then
    mkdir -p ~/.ssh
    openssl base64 -d -A <<< "$GITHUB_PRIVATE_KEY" > ~/.ssh/id_rsa
    ssh-keyscan -t rsa github.com > ~/.ssh/known_hosts
    chmod 600 ~/.ssh/id_rsa
    git config --global url."git@github.com:".insteadOf "https://github.com/"
elif [ "$GITHUB_CREDENTIAL" ]; then
    git config --global url."https://$GITHUB_CREDENTIAL@github.com".insteadOf "https://github.com"
    git config --global url."https://$GITHUB_CREDENTIAL@github.com/".insteadOf "git@github.com:"
fi

poetry install --no-dev --extras wsgi

if [ "$GITHUB_PRIVATE_KEY" ]; then
    rm ~/.ssh/id_rsa
elif [ "$GITHUB_CREDENTIAL" ]; then
    git config --unset --global url."https://$GITHUB_CREDENTIAL@github.com".insteadOf
    git config --unset --global url."https://$GITHUB_CREDENTIAL@github.com/".insteadOf
fi
