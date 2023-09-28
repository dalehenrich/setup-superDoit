#! /usr/bin/env bash

set -e
set -x

sudo mkdir /opt/gemstone
sudo chmod oug+rwx /opt/gemstone
sudo mkdir /opt/gemstone/locks
sudo chmod oug+rwx /opt/gemstone/locks

. $SUPERDOIT_ROOT/dev/defPath.env

echo "GEMSTONE=$GEMSTONE"
ls -l $GEMSTONE/bin
$GEMSTONE/bin/topaz -h
topaz -h
createSuperDoitStone.solo -D --GEMSTONE=$GEMSTONE --stoneDirectory=$GEMSTONE_STONE_DIR --stoneName=$GEMSTONE_STONE_NAME

$GEMSTONE/bin/startstone -l $GEMSTONE_STONE_DIR/logs/${GEMSTONE_STONE_NAME}.log -z $GEMSTONE_SYSTEM_CONF $GEMSTONE_STONE_NAME
