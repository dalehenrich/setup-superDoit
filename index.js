const core = require('@actions/core')
const path = require('path')
const io = require('@actions/io')
const os = require('os')
const tc = require('@actions/tool-cache')
const mv = require('mv')
const gunzip = require('gunzip-file')
const fs = require('fs')
const createSymlink = require('create-symlink')
const extractDmg = require("extract-dmg");

const DEFAULT_BRANCH = 'masterV1.0'
const DEFAULT_SOURCE = 'dalehenrich/superDoit'

const INSTALLATION_DIRECTORY = path.join(os.homedir(), '.superDoit')
const GEMSTONE_DIRECTORY = path.join(os.homedir(), '.superDoit/gemstone/gs')

async function run() {
  try {
		const version = core.getInput('gemstone-version', { required: true })

		core.setOutput('gemstone-version', version)

    const superDoitBranch = core.getInput('superDoit-branch') || DEFAULT_BRANCH
    const superDoitSource = core.getInput('superDoit-source') || DEFAULT_SOURCE

    /* Download and extract superDoit. */
		let doDownLoad = false;
		try {
			const stat = fs.lstatSync(superDoitSource)
		} catch (e) {
			// not a file or directory, so must be a github repo spec
 	  	doDownLoad = true;
		};
		if (doDownLoad) {
    	console.log(`Download and extract superDoit...${superDoitSource}@${superDoitBranch}`)
    	let tempDir = path.join(os.homedir(), '.superDoit-temp')
    	const toolPath = await tc.downloadTool(`https://github.com/${superDoitSource}/archive/${superDoitBranch}.tar.gz`)
    	tempDir = await tc.extractTar(toolPath, tempDir)

    	await io.mv(path.join(tempDir, `superDoit-${superDoitBranch}`), INSTALLATION_DIRECTORY)
		} else {
   		console.log(`Using existing superDoit directory ...${superDoitSource}`)
			await createSymlink( superDoitSource, INSTALLATION_DIRECTORY)
		}

    console.log('Download and extract extent0.solo.dbf...')
    let soloTempDir = path.join(os.homedir(), '.solodbf-temp')
    const soloToolPath = await tc.downloadTool(`https://github.com/dalehenrich/superDoit/releases/download/v0.1.0/${version}_extent0.solo.dbf.gz`)
    await gunzip( soloToolPath, soloTempDir)
    await mv(soloTempDir, path.join(GEMSTONE_DIRECTORY, 'extent0.solo.dbf'), function(err) {
      if (err) {
      	// handle the error
      	core.setFailed(err.message)
      }})
		await fs.chmod(path.join(GEMSTONE_DIRECTORY, 'extent0.solo.dbf'), 0o444, (err) => {
  		if (err) throw err;
  		console.log('The permissions for file "extent0.solo.dbf" have been changed!');
		})

    /* Download and extract GemStone product tree. */
    console.log('Download and extract GemStone product tree...')
		const osPlatform = process.env.PLATFORM
		if (osPlatform == 'ubuntu-18.04') {
			const productTreeZipPath = await tc.downloadTool(`https://ftp.gemtalksystems.com/GemStone64/${version}/GemStone64Bit${version}-x86_64.Linux.zip`)
    	const productTreeDir =  await tc.extractZip(productTreeZipPath, GEMSTONE_DIRECTORY)
			// create symbolic link to product
			await createSymlink(path.join(productTreeDir, `GemStone64Bit${version}-x86_64.Linux`), path.join(GEMSTONE_DIRECTORY, 'product'))
		} else if (osPlatform == 'macos-10.15') {
			const productTreeZipPath = await tc.downloadTool(`https://ftp.gemtalksystems.com/GemStone64/${version}/GemStone64Bit${version}-i386.Darwin.dmg`)
			await extractDmg(`GemStone64Bit${version}-i386.Darwin.dmg`, path.join(GEMSTONE_DIRECTORY, 'product'))
		} else {
			core.setFailed(`Unsupported platform ${osPlatform}`)
		}

		/* Set up superDoit command */
    core.addPath(path.join(INSTALLATION_DIRECTORY, 'bin'))

		/* Set up for superDoit GemStone .solo scripts */
    core.addPath(path.join(INSTALLATION_DIRECTORY, 'gemstone/bin'))

		/* Set up for superDoit examples --- TESTING */
    core.addPath(path.join(INSTALLATION_DIRECTORY, 'examples/simple'))
    core.addPath(path.join(INSTALLATION_DIRECTORY, 'examples/utility'))

	} catch (error) {
    core.setFailed(error.message);
  }
}

run();
