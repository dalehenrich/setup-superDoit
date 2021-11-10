#! /usr/bin/env bash

installation_directory="$HOME/.superDoit"

if [ -d "$superDoit_source" ] ; then
	"directory exists so no need to download the project"
	exit 0
fi
echo "NEED TO DOWANLOAD ${superDoit_source}@${superDoit_source}"
