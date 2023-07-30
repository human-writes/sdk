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

    echo;
    echo "Building Vite/Vue3 plugin...";
    cd vue;vite build && vue-tsc --emitDeclarationOnly;cd $CWD;

    echo;
    echo "Building Vite/Vue3 demo app...";
    cd demo;
    npm install;
    vite build;
    cd $CWD;
fi

exit 0;
