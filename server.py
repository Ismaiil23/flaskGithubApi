from flask import Flask, jsonify, render_template
import os
from dotenv import load_dotenv
from github import Github

load_dotenv() 

app = Flask(__name__)

github_token = os.environ.get('GITHUB_TOKEN')


g = Github(github_token)

@app.route('/')
def accueil():
    return render_template('accueil.html')

@app.route('/Contact')
def contact():
    return render_template('contact.html')

@app.route('/github/user')
def get_github_user():
    user = g.get_user()
    return jsonify(user.raw_data)


@app.route('/github/repos')
def get_github_repos():
    try:
        repos = g.get_user().get_repos(sort="updated")
        repos_data = [{
            'name': repo.name,
            'description': repo.description,
            'html_url': repo.html_url
        } for repo in repos]

        return jsonify(repos_data)
    except GithubException as e:
        return jsonify({"error": str(e)}), 401
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
