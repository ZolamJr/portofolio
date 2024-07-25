document.addEventListener('DOMContentLoaded', function() {
    const githubButton = document.getElementById('github-import');
    const fileButton = document.getElementById('file-import');

    // Fonction pour importer un projet depuis GitHub
    githubButton.addEventListener('click', function() {
        const repoName = prompt('Veuillez entrer le nom du dépôt GitHub (sans https://zolamjr.github.io/):');
        if (repoName) {
            importProjectFromGitHub(repoName);
        }
    });

    // Fonction pour importer un projet depuis l'Explorateur de Fichiers
    fileButton.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.zip,.rar'; // Limiter les types de fichiers si nécessaire
        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                importProjectFromFile(file);
            }
        };
        input.click();
    });

    // Fonction pour importer un projet depuis GitHub
    function importProjectFromGitHub(repoName) {
        const apiUrl = `https://api.github.com/repos/ZolamJr/${repoName}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.message && data.message === 'Not Found') {
                    alert('Dépôt non trouvé !');
                } else {
                    const projectName = data.name;
                    const projectDescription = data.description || 'Aucune description disponible';
                    const projectLink = data.html_url; // URL du dépôt GitHub
                    addProjectToPage(projectName, projectDescription, projectLink);
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'importation du projet:', error);
                alert('Erreur lors de l\'importation du projet.');
            });
    }

    // Fonction pour importer un projet depuis un fichier
    function importProjectFromFile(file) {
        console.log('Importation depuis le fichier:', file.name);

        const projectName = file.name.replace(/\.[^/.]+$/, ''); // Supprime l'extension du fichier
        addProjectToPage(projectName, 'Projet importé depuis un fichier', '#');
    }

    // Fonction pour ajouter un projet à la page
    function addProjectToPage(name, description, link) {
        const projectList = document.getElementById('project-list');

        // Créer une nouvelle carte de projet
        const newProject = document.createElement('div');
        newProject.className = 'project-card';

        // Ajouter du contenu à la carte
        newProject.innerHTML = `
            <h3>${name}</h3>
            <p>${description}</p>
            <a href="${link}" class="project-link" target="_blank">Voir le projet</a>
        `;

        // Ajouter la nouvelle carte à la liste de projets
        projectList.appendChild(newProject);
    }
});
