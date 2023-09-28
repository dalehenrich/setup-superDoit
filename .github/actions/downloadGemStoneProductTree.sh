#! /usr/bin/env bash

set -e
#set -x

if [ "$PLATFORM" = "macos-10.15" ] ; then
	productExtension="i386.Darwin"
else
	productExtension="x86_64.Linux"
fi

cd ${superDoit_root_dir}/gemstone/products
echo "Downloading product tree for $superDoit_gemstone_version ..."
${superDoit_root_dir}/bin/install.sh $superDoit_gemstone_version

productName=GemStone64Bit${superDoit_gemstone_version}-${productExtension}
echo "gemstone-product-name=$productName" >> $GITHUB_OUTPUT
echo "gemstone-product-path=${superDoit_root_dir}/gemstone/products/${productName}" >> $GITHUB_OUTPUT

