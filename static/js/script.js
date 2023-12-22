document.addEventListener('DOMContentLoaded', (event) => {
    getGithubUser();
    getGithubRepos();
});

function getGithubUser() {
    fetch('/github/user')
        .then(response => response.json())
        .then(data => {
            const avatar = document.createElement('img');
            avatar.src = data.avatar_url;
            avatar.alt = "Avatar de l'utilisateur";
            avatar.onclick = function () {
                window.location.href = data.html_url;
            };
            const userInfo = document.getElementById('userInfo');
            userInfo.insertBefore(avatar, userInfo.firstChild);
            document.getElementById('name').innerHTML = data.login;
        })
        .catch(error => console.error(error));
}

async function getGithubRepos() {
    try {
        const response = await fetch('/github/repos');
        const repos = await response.json();
        const reposContainer = document.getElementById('repos-container');
        repos.forEach(repo => {
            const repoElement = document.createElement('div');
            let description = repo.description || 'Pas de description';
            repoElement.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${description}</p>
                <button onclick="window.location.href='${repo.html_url}'" target="_blank">Voir sur GitHub</button>
            `;
            reposContainer.appendChild(repoElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
