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
    cd vue;vite build -d && vue-tsc --emitDeclarationOnly;cd $CWD;

    echo;
    echo "Moving web components to global dist directoery..."
    mkdir dist/web;
    cp -rfv web/dist/* dist/web;
    rm -rf web/dist;

    echo;
    echo "Building Vite/Vue3 demo app...";
    cd demo;
    npm install;
    vite preview -d -m dev;
    cd $CWD;
fi

exit 0;
