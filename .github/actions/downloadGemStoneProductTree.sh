#! /usr/bin/env bash

set -e
#set -x

cd ${superDoit_root_dir}/gemstone/products
echo "Downloading product tree for $superDoit_gemstone_version ..."
${superDoit_root_dir}/bin/install.sh $superDoit_gemstone_version

PLATFORM="`uname -sm | tr ' ' '-'`"
case "$PLATFORM" in
   Darwin-arm64)
		productName="GemStone64Bit${gemstoneversion}-arm64.Darwin"
		;;
   Darwin-x86_64)
		productName="GemStone64Bit${gemstoneversion}-i386.Darwin"
		;;
	Linux-x86_64)
		productName="GemStone64Bit${gemstoneversion}-x86_64.Linux"
     ;;
	*)
		echo "This script should only be run on Mac (Darwin-i386 or Darwin-arm64), or Linux (Linux-x86_64) ). The result from \"uname -sm\" is \"`uname -sm`\""
		exit 1
     ;;
esac

echo "gemstone-product-name=$productName" >> $GITHUB_OUTPUT
echo "gemstone-product-path=${superDoit_root_dir}/gemstone/products/${productName}" >> $GITHUB_OUTPUT

