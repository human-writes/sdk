#!/bin/sh

TARGET=$1;
CWD=$(pwd);

if [ -z $TARGET ];
then
    echo "Target is missing.";
    exit 1;
fi

if [ "$TARGET"=="all" ];
then

    echo "Building web components...";
    rm -rf web/dist;
    cd web;gulp;cd $CWD;

    if [ ! -f web/dist/human-writes.min.js ];
    then
        echo "An error occured while building the we components dist file. Stopping.";
        exit 1;
    fi

    cp web/dist/human-writes.min.js tests/public
    cp assets/*.svg tests/public

    echo;
    echo "Building Vite/Vue3 plugin...";
    rm -rf vue/dist;
    cd vue;vite build && vue-tsc --emitDeclarationOnly;cd $CWD;

    echo;
    echo "Building Vite/Vue3 test app...";
    cd demo;vite build;cd $CWD;

    exit 0;
fi