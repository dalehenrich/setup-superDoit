#! /usr/bin/env bash

set -e
set -x

soloExtentVersion = $superDoit_gemstone_version
if [[ $extenVersion != '3.6.1' && $extenVersion != '3.6.0' ]] ; then
	soloExtentVersion='3.6.1.
fi

echo "Downloading extent0.solo.dbf for $soloExtentVersion ..."

curl -s -S -L https://github.com/dalehenrich/superDoit/releases/download/v0.1.0/${soloExtentVersion}_extent0.solo.dbf.gz | gunzip -c > $superDoit_root_dir/gemstone/solo/extent0.solo.dbf

chmod 0o444  $superDoit_root_dir/gemstone/solo/extent0.solo.dbf
