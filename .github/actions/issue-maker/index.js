const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	try {
		const issueTitle = core.getInput('issue-title');
		const jokeBody = core.getInput('joke');
		const token = core.getInput('repo-token');

		const octokit = new github.getOctokit(token);

		await octokit.request(`POST /repos/{owner}/{repo}/issues`, {
			repo: github.context.repo.repo,
			owner: github.context.repo.owner,
			title: issueTitle,
			body: jokeBody,
		});
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
