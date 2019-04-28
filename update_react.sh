# /bin/#!/usr/bin/env bash
cd $1
git pull origin master
npm run build
