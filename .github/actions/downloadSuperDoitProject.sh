#! /usr/bin/env bash

installation_directory="$HOME/.superDoit"

if [ -d "$superDoit_source" ] ; then
	"directory exists so no need to download the project"
	echo "::set-output name=superDoit-installation-directory::$superDoit_source"
	exit 0
fi
echo "Downloading ${superDoit_source}@${superDoit_branch}"
echo "::set-output name=superDoit-installation-directory::${installation_directory}/${superDoit_source}"

