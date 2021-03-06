#! /usr/bin/env bash

set -e
#set -x

installation_directory="$HOME/.superDoit"
mkdir $installation_directory

if [ -d "$superDoit_source" ] ; then
	# directory exists so no need to download the project
	echo "using existing superDoit directory $superDoit_source"
	echo "::set-output name=superDoit-root::$superDoit_source"
	exit 0
fi
echo "Downloading ${superDoit_source}@${superDoit_branch} to ${installation_directory} ..."

curl -s -S -L https://github.com/${superDoit_source}/archive/${superDoit_branch}.tar.gz | tar xz -C $installation_directory --strip-components 1

echo "::set-output name=superDoit-root::$installation_directory"

