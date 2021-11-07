# setup-superDoit

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

[superDoit]: https://github.com/dalehenrich/superDoit

