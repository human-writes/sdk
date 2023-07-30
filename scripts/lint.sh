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

    echo "Linitng web components...";
    cd web;npx eslint components --ext .js;
    cd $CWD;

    echo;
    echo "Linitng Vite/Vue3 plugin...";
    cd vue;npx eslint . --ext .vue,.js,.cjs,.mjs --fix;
    cd $CWD;
fi

exit 0;
