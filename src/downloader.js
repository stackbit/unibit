const path = require('path');
const fs = require('fs');
const ora = require('ora');
const downloadGitRepo = require('download-git-repo');

module.exports = function(repository, name) {
    const destination = path.resolve(process.cwd(), name)
    const spinner = ora(`Creating new site into ${destination}`).start();

    if (fs.existsSync(destination)) {
        spinner.fail(`Could not create new site. Directory already exists at ${destination}!`)
        process.exit(1)
    }

    downloadGitRepo(
        repository,
        name,
        err => {
            if (err) {
                spinner.fail('Could not create new site. Please try again');
                process.exit(1)
            } else {
                spinner.succeed(`New site created into ${destination}`);
            }
        }
    );
}
