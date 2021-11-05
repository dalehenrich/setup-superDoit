const core = require('@actions/core');
const tc = require('@actions/tool-cache')
const path = require('path')
const io = require('@actions/io')
const os = require('os')

const DEFAULT_BRANCH = 'masterV1.0'
const DEFAULT_SOURCE = 'dalehenrich/superDoit'

const INSTALLATION_DIRECTORY = path.join(os.homedir(), '.superDoit')

async function run() {
  try {
		const version = core.getInput('gemstone-version', { required: true })

		core.setOutput('gemstone-version', version)

    const superDoitBranch = core.getInput('smalltalkCI-branch') || DEFAULT_BRANCH
    const superDoitSource = core.getInput('smalltalkCI-source') || DEFAULT_SOURCE

    /* Download and extract superDoit. */
    console.log('Downloading and extractingsuperDoit...')
    let tempDir = path.join(os.homedir(), '.superDoit-temp')
    const toolPath = await tc.downloadTool(`https://github.com/${superDoitSource}/archive/${superDoitBranch}.tar.gz`)
    tempDir = await tc.extractTar(toolPath, tempDir)
    await io.mv(path.join(tempDir, `superDoit-${superDoitBranch}`), INSTALLATION_DIRECTORY)

    /* Set up superDoit command. */
    core.addPath(path.join(INSTALLATION_DIRECTORY, 'bin'))

    /* Set up superDoit examples --- TESTING */
    core.addPath(path.join(INSTALLATION_DIRECTORY, 'examples/simple'))

	} catch (error) {
    core.setFailed(error.message);
  }
}

run();
