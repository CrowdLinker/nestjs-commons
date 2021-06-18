#!/bin/bash
# Publish package with the "next" tag.
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
npm publish --access public --tag next
