#! /usr/bin/env bash

echo "superDoit_source = $superDoit_source"
echo "superDoit_branch = $superDoit_branch"
export superDoit_gemstone_version=3.6.1
echo "::set-output name=gemstone-version::$superDoit_gemstone_version"
