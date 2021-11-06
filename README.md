# setup-smalltalkCI

This GitHub Action sets up [superDoit] for using GemStone Smalltalk scripts in GitHub Actions.

## Usage

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

