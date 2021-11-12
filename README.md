# setup-superDoit
BRANCH | STATUS
------------- | -------------
**v2** | [![**v2** build status](https://github.com/dalehenrich/setup-superDoit/actions/workflows/ci.yml/badge.svg?branch=v2)](https://github.com/dalehenrich/setup-superDoit/actions)
**v2.0** | [![**v2.0** build status](https://github.com/dalehenrich/setup-superDoit/actions/workflows/ci.yml/badge.svg?branch=v2.0)](https://github.com/dalehenrich/setup-superDoit/actions)

This GitHub Action sets up [superDoit] for using [superDoit] scripts in GitHub Actions.
After running setup-superDoit, the system is setup to run .solo, .stone, and .topaz scripts.
A stone is started for the give `gemstone-version` output and the `topazini-path` output points at the .topazini file for the stone.

## Usage

### action.yml def
```yml
name: 'Setup superDoit'
description: 'Setup superDoit for running GemStone Smalltalk scripts: .stone, .solo, and .topaz'
author: 'Dale Henrichs, GemTalk Systems'
inputs:
  gemstone-version:
    description: 'Version of GemStone to use when running scripts'
  superDoit-source:
    description: 'GigHub slug of the superDoit source repository'
    required: false
    default: 'dalehenrich/superDoit'
  superDoit-branch:
    description: 'Branch or tag to use from superDoit repository'
    required: false
    default: 'v2'
outputs:
  gemstone-version:
    description: 'GemStone version used for stones'
    value: ${{ steps.downloadSuperDoitProject.outputs.gemstone-version }}
  gemstone-product-path:
    description: 'path to requested gemstone-version product tree. Suitable for use as GEMSTONE env var'
    value: ${{ steps.downloadGemStoneProductTree.outputs.gemstone-product-path }}
  gemstone-product-name:
    description: 'name of GemStone product tree directory'
    value: ${{steps.downloadGemStoneProductTree.outputs.gemstone-product-name}}
  stone-directory:
    description: 'directory where stone is running'
    value: ${{steps.setup_and_start_stone.outputs.stone-directory}}
  topazini-path:
    description: 'location of the default .topazini file'
    value: ${{steps.setup_and_start_stone.outputs.topazini-path}}
  stone-name:
    description: 'name of the stone'
    value: ${{steps.setup_and_start_stone.outputs.stone-name}}
  stone-system-conf-path:
    description: 'path to sysmtem.conf file'
    value: ${{steps.setup_and_start_stone.outputs.stone-system-conf-path}}
  solo-version:
    description: 'GemStone version used for solo'
    value: ${{ steps.downloadSoloExtent.outputs.solo-version }}
  solo-product-name:
    description: 'name of GemStone product tree directory used for solo'
    value: ${{steps.downloadGemStoneProductTree.outputs.solo-product-name}}
  superDoit-root:
    description: 'root directory of the downloaded superDoit project'
    value: ${{ steps.downloadSuperDoitProject.outputs.superDoit-root }}
```
### Basic

```yaml
    steps:
      - uses: actions/checkout@v2
      - id: setup-superDoit
        uses: dalehenrich/setup-superDoit@v2.0
        with:
          gemstone-version: ${{ matrix.gsvers }}
          superDoit-source: ${{ github.workspace }}
```

### Testing Different GemStone versions

```yaml
jobs:
  build:
    strategy:
      matrix:
        gemstone: [ 3.6.0, 3.6.1 ]
    name: ${{ matrix.gemstone }}
    steps:
      - uses: actions/checkout@v2
      - id: setup-superDoit
        uses: dalehenrich/setup-superDoit@v2.0
        with:
          gemstone-version: ${{ matrix.gsvers }}
          superDoit-source: ${{ github.workspace }}
```

### Use a different branch or fork

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: dalehenrich/setup-superDoit@v2
    id: superdoit
    with:
      gemstone-version: '3.6.1'
      superDoit-branch: 'testing-branch'
      superDoit-source: 'myfork/superDoit'
```
## Branch conventions
1. vX
2. vX.Y
3. vX.Y.Z or vX.Y.Z-id

### vX
Production branch.

X is incremented whenever there is a breaking change.
vX.Y and vX.Y.Z branches are merged into the VX branch, when development is complete on the feature or patch.

### vX.Y
Feature/Bug candidate branch.
 
Y is incremented whenever work on a new feature or bugfix is started.
vX.Y branches are merged into the VX branch when development is complete.

Primary work takes place on a vX.Y.Z branch and the VX.Y.Z branch is merged into the VX.Y branch at stable points, so if you want to have early access to a feature or bugfix, it is relatively safe to use this branch in production.

### vX.Y.Z
Development branch.

Z is incremented whenever work on a new feature or bugfix is started.
A pre-release may be used to further identify the purpose of the work.

Primary work takes place on this branch and cannot be depended upon to be usable
 

[superDoit]: https://github.com/dalehenrich/superDoit

