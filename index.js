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
const GEMSTONE_SOLO_DIRECTORY = path.join(os.homedir(), '.superDoit/gemstone/solo')
const GEMSTONE_PRODUCTS_DIRECTORY = path.join(os.homedir(), '.superDoit/gemstone/products')

async function run() {
  try {
		const version = core.getInput('gemstone-version', { required: true })

		core.setOutput('gemstone-version', version)
		core.setOutput('gemstone-product-directory', GEMSTONE_PRODUCTS_DIRECTORY)

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

		let unzippedDir = `superDoit-${superDoitBranch}`
		fs.readdirSync(tempDir).forEach(file => {
      unzippedDir = file;
    })

    	await io.mv(path.join(tempDir, `${unzippedDir}`), INSTALLATION_DIRECTORY)
		} else {
   		console.log(`Using existing superDoit directory ...${superDoitSource}`)
			await createSymlink( superDoitSource, INSTALLATION_DIRECTORY)
		}

		let extentVersion = version
		if ( (version != '3.6.0') && (version != '3.6.1') ) {
			// default version
			extentVersion = '3.6.1'
		}
		core.setOutput('solo-extent-version', extentVersion)
    console.log(`Download and extract extent0.solo.dbf...[https://github.com/dalehenrich/superDoit/releases/download/v0.1.0/${extentVersion}_extent0.solo.dbf.gz]`)
    let soloTempDir = path.join(os.homedir(), '.solodbf-temp')
    const soloToolPath = await tc.downloadTool(`https://github.com/dalehenrich/superDoit/releases/download/v0.1.0/${extentVersion}_extent0.solo.dbf.gz`)
    await gunzip( soloToolPath, soloTempDir)
    await mv(soloTempDir, path.join(GEMSTONE_SOLO_DIRECTORY, 'extent0.solo.dbf'), function(err) {
      if (err) {
      	// handle the error
      	core.setFailed(err.message)
      }})
		await fs.chmod(path.join(GEMSTONE_SOLO_DIRECTORY, 'extent0.solo.dbf'), 0o444, (err) => {
  		if (err) throw err;
  		console.log('The permissions for file "extent0.solo.dbf" have been changed!');
		})

    /* Download and extract GemStone product tree. */
	  console.log(`Preparing to download and extract GemStone ${version} for ${osPlatform}`)
		const osPlatform = process.env.PLATFORM
		let gemstoneProductName = ''
		if (osPlatform == 'ubuntu-18.04') {
			gemstoneProductName = `GemStone64Bit${version}-x86_64.Linux`
	  	console.log(`Download and extract GemStone64Bit${version}-x86_64.Linux...`)
			core.setOutput('gemstone-product-name', `GemStone64Bit${version}-x86_64.Linux`)
			const productTreeZipPath = await tc.downloadTool(`https://ftp.gemtalksystems.com/GemStone64/${version}/GemStone64Bit${version}-x86_64.Linux.zip`)
    	const productTreeDir =  await tc.extractZip(productTreeZipPath, GEMSTONE_PRODUCTS_DIRECTORY)
			if ( (version == '3.6.0') || (version == '3.6.1') ) {
				// create symbolic link to product -- product supports solo topaz
				console.log(`Create symbolic link for GemStone64Bit${version}-x86_64.Linux to to solo/product dir`)
				await createSymlink(path.join(productTreeDir, `GemStone64Bit${version}-x86_64.Linux`), path.join(GEMSTONE_SOLO_DIRECTORY, 'product'))
				core.setOutput('solo-product-name', `GemStone64Bit${extentVersion}-x86_64.Linux`)
			} else {
				/* Download and extract GemStone solo product tree because we need a version of GemStone that supports solo topaz */
	  		console.log(`Download and extract solo GemStone64Bit${extentVersion}-x86_64.Linux...`)
				core.setOutput('solo-product-name', `GemStone64Bit${extentVersion}-x86_64.Linux`)
				const productTreeZipPath = await tc.downloadTool(`https://ftp.gemtalksystems.com/GemStone64/${extentVersion}/GemStone64Bit${extentVersion}-x86_64.Linux.zip`)
    		const productTreeDir =  await tc.extractZip(productTreeZipPath, GEMSTONE_PRODUCTS_DIRECTORY)
				// create symbolic link to extentVersion
				console.log(`Create symoblic link for GemStone64Bit${extentVersion}-x86_64.Linux to to solo/product dir`)
				await createSymlink(path.join(productTreeDir, `GemStone64Bit${extentVersion}-x86_64.Linux`), path.join(GEMSTONE_SOLO_DIRECTORY, 'product'))
			}
		} else if (osPlatform == 'macos-10.15') {
			console.log(`deferring download of ${version} for ${osPlatform}`)
			gemstoneProductName = `GemStone64Bit${version}-i386.Darwin`
			core.setOutput('gemstone-product-name', `GemStone64Bit${version}-i386.Darwin`)
			core.setOutput('solo-product-name', `GemStone64Bit${extentVersion}-i386.Darwin`)
		} else {
			core.setFailed(`Unsupported platform ${osPlatform}`)
		}
		/* Set up superDoit command */
		const gemstoneProductPath = path.join(GEMSTONE_PRODUCTS_DIRECTORY, gemstoneProductName)
		core.setOutput('gemstone-product-path', gemstoneProductPath)
    core.addPath(path.join(INSTALLATION_DIRECTORY, 'bin'))

		/* Set up for superDoit GemStone .solo scripts */
    core.addPath(path.join(INSTALLATION_DIRECTORY, 'gemstone/bin'))

		/* Set up for superDoit examples --- TESTING */
    core.addPath(path.join(INSTALLATION_DIRECTORY, 'examples/simple'))
    core.addPath(path.join(INSTALLATION_DIRECTORY, 'examples/utility'))
    core.addPath(path.join(INSTALLATION_DIRECTORY, 'dev'))

	} catch (error) {
    core.setFailed(error.message);
  }
}

run();
