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
${superDoit_root_dir}/dev/downloadGemStone.sh $superDoit_gemstone_version

productName=GemStone64Bit${superDoit_gemstone_version}-${productExtension}
echo "::set-output name=gemstone-product-name::$productName"
echo "::set-output name=gemstone-product-path::${superDoit_root_dir}/gemstone/products/${productName}"
if [ "$superDoit_gemstone_version" != "$superDoit_solo_version" ] ; then
	echo "Downloading solo product tree for $superDoit_solo_version ..."
	${superDoit_root_dir}/dev/downloadGemStone.sh $superDoit_solo_version
	productName=GemStone64Bit${superDoit_solo_version}-${productExtension}
fi

echo "create solo product symbolic link for $superDoit_solo_version ..."
cd ../solo
ln -s ../products/$productName product
echo "solo-product-name=$productName" >> $GITHUB_OUTPUT

