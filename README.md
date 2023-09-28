# setup-superDoit
BRANCH | STATUS
------------- | -------------
**v4.1** | [![**v4.1** build status](https://github.com/dalehenrich/setup-superDoit/actions/workflows/ci.yml/badge.svg?branch=v4.1)](https://github.com/dalehenrich/setup-superDoit/actions)
**v2** | [![**v2** build status](https://github.com/dalehenrich/setup-superDoit/actions/workflows/ci.yml/badge.svg?branch=v2)](https://github.com/dalehenrich/setup-superDoit/actions)

## Versions
### v4.1
Intended for .solo scripts used with versions of GemStone that are shipped with an extent0.rowan.dbf in $GEMSTONE/bin, GemStone 3.6.4 and newer versions of GemStone (currently tested thru 3.6.5). 

Should be used with superDoit branch v4.1 and later. 

.stone scripts may be used with GemStone versions as old as 3.4.0.

### v2
Intended for use with older versions of GemStone: 3.6.1, 3.6.0, 3.5.8, 3.5.0 (tested versions)

This GitHub Action sets up [superDoit] for using [superDoit] scripts in GitHub Actions.
After running setup-superDoit, the system is setup to run .solo, .stone, and .topaz scripts.
A stone is started for the give `gemstone-version` output and the `topazini-path` output points at the .topazini file for the stone.

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

