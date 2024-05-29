const { Octokit } = require("@octokit/rest");
const fs = require('fs');
const path = require('path');

const token = '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'; 
const octokit = new Octokit({ auth: token });

const owner = 'Tester01BME';
const repo = 'digital-mural-website';

async function uploadToGitHub() {
    const files = fs.readdirSync(path.join(__dirname, 'uploads'));

    for (const file of files) {
        const filePath = path.join(__dirname, 'uploads', file);
        const content = fs.readFileSync(filePath, 'base64');
        const message = `Add ${file}`;

        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: `contributions/${file}`,
            message,
            content,
            committer: {
                name: "Your Name",
                email: "your_email@example.com"
            },
            author: {
                name: "Your Name",
                email: "your_email@example.com"
            }
        });

        // Optionally remove the file after uploading
        fs.unlinkSync(filePath);
    }
}

uploadToGitHub().catch(console.error);
