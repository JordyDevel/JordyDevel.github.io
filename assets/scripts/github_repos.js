/**
 * Carga los repositorios públicos de la cuenta/organización indicada y los
 * inserta en la lista <ul id="repo-list"> del index.html.
 *
 * Cambia <TU_USUARIO> por tu usuario o el nombre de la organización en GitHub.
 */
(function () {
    const USER = "JordyDevel";               // ← p.ej. “quasar‑engine‑labs”
    const LIST = document.getElementById("repo-list");

    if (!LIST) {
        console.warn("No se encontró el elemento #repo-list");
        return;
    }

    fetch(`https://api.github.com/users/${USER}/repos`)
        .then(r => {
            if (!r.ok) throw new Error(`Error ${r.status}`);
            return r.json();
        })
        .then(data => {
            data.forEach(repo => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <a href="${repo.html_url}" target="_blank">
                        ${repo.name}
                    </a>
                    ${repo.description ? " – " + repo.description : ""}
                `;
                LIST.appendChild(li);
            });
        })
        .catch(err => {
            console.error("No se pudieron cargar los repositorios:", err);
            LIST.innerHTML = "<li>Error al cargar los repositorios.</li>";
        });
})();