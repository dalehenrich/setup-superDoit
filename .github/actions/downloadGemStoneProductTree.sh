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
echo "gemstone-product-name=$productName" >> $GITHUB_OUTPUT
echo "gemstone-product-path=${superDoit_root_dir}/gemstone/products/${productName}" >> $GITHUB_OUTPUT

echo "create solo product symbolic link for $superDoit_solo_version ..."
cd ../solo
ln -s ../products/$productName product
echo "Copying extent0.rowan.dbf and extent0.dbf"
cp ../products/$productName/bin/extent0.rowan.dbf extent0.solo.dbf
chmod -w extent0.solo.dbf
cp ../products/$productName/bin/extent0.dbf extent0.dbf
chmod -w extent0.dbf

echo "solo-product-name=$productName" >> $GITHUB_OUTPUT

