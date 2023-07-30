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
    cd web;webpack --config webpack.config.js;cd $CWD;

    echo;
    echo "Building Vite/Vue3 plugin...";
#    rm -rf vue/dist;
    cd vue;vite build && vue-tsc --emitDeclarationOnly;cd $CWD;

    echo;
    echo "Building Vite/Vue3 demo app...";
    cd demo;
    npm install;
    vite build;
    cd $CWD;
fi

exit 0;
