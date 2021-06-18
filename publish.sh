#!/bin/bash
# This is an example of a File Header comments in Bash
#
# Copyright 2021 Crowdlinker
#
# You should have received a copy of the MIT along with this program.  
# If not, see <https://opensource.org/licenses/MIT>.

npm run build
cp README.md ./dist
cp LICENSE ./dist
cp package.json ./dist
cd ./dist
npm publish
