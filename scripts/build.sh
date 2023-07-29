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

    rm -rf dist;
    echo "Building web components...";
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
    cd vue;vite build && vue-tsc --emitDeclarationOnly;cd $CWD;

    echo;
    echo "Moving web components to global dist directoery..."
    mkdir dist/web;
    cp -rfv web/dist/* dist/web;
    rm -rf web/dist;

    echo;
    echo "Building Vite/Vue3 demo app...";
    cd demo;vite build;cd $CWD;

    exit 0;
fi