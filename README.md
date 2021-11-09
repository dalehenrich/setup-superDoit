# setup-superDoit
BRANCH | STATUS
------------- | -------------
**v2** | [![**v2** build status](https://github.com/dalehenrich/setup-superDoit/actions/workflows/ci.yml/badge.svg?branch=v2)](https://github.com/dalehenrich/setup-superDoit/actions)  [![**v2** build status](https://github.com/dalehenrich/setup-superDoit/actions/workflows/check-dist.yml/badge.svg?branch=v2)](https://github.com/dalehenrich/setup-superDoit/actions)

**v2.0** | [![**v2.0** build status](https://github.com/dalehenrich/setup-superDoit/actions/workflows/ci.yml/badge.svg?branch=v2.0)](https://github.com/dalehenrich/setup-superDoit/actions)  [![**v2.0** build status](https://github.com/dalehenrich/setup-superDoit/actions/workflows/check-dist.yml/badge.svg?branch=v2.0)](https://github.com/dalehenrich/setup-superDoit/actions)

## Just enough javascript to use GemStone Smalltalk for everything else

This GitHub Action sets up [superDoit] for using GemStone Smalltalk scripts in GitHub Actions.
After running setup-superDoit, the system is setup to run .solo scripts. 
See [superDoit] for .solo scripts to setup and start stones, so that .stone scripts can be run.

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
    default: 'masterV1.0'
outputs:
  gemstone-version:
    description: 'GemStone version selection'
  gemstone-product-directory:
    description: 'directory where GemStone product tree should be installed'
  gemstone-product-name:
    description: 'name of GemStone product tree directory'
runs:
  using: 'node12'
  main: 'dist/index.js'
```
### Basic

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: dalehenrich/setup-superDoit@v1
    id: superdoit
    with:
      gemstone-version: '3.6.1'
  - run: simple.solo
    shell: bash
    timeout-minutes: 15
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
      - uses: dalehenrich/setup-superDoit@v1
        with:
          gemstone-version: ${{ matrix.gemstone }}
      - run: simple.solo
        shell: bash
        timeout-minutes: 15
```

### Use a different branch or fork

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: dalehenrich/setup-superDoit@v1
    id: superdoit
    with:
      gemstone-version: '3.6.1'
      superDoit-branch: 'testing-branch'
      superDoit-source: 'myfork/superDoit'
  - run: simple.solo -h
    shell: bash
    timeout-minutes: 15
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

