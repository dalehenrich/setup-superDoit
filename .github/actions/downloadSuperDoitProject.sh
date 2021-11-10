#! /usr/bin/env bash

set -e
set -x

installation_directory="$HOME/.superDoit"
mkdir $installation_directory

if [ -d "$superDoit_source" ] ; then
	"directory exists so no need to download the project"
	echo "using existing superDoit directory $superDoit_source"
	echo "::set-output name=installation-directory::$superDoit_source"
	exit 0
fi
echo "Downloading ${superDoit_source}@${superDoit_branch} to ${installation_directory}/superDoit ..."

curl -s -S -L https://github.com/${superDoit_source}/archive/${superDoit_branch}.tar.gz | tar xvz -C $installation_directory

echo "::set-output name=installation-directory::$installation_directory/superDoit"

