let deferredInstallPrompt = null;
const installButton = document.getElementById('btnInstall');

installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', afficherBouttonInstall);

function afficherBouttonInstall(evt) {
    //CODELAB: Add code to save event & show the install button
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}

function installPWA(evt) {
    // CODELAB: Add code show install prompt & hide the install button.
    // CODELAB: Log user response to prompt.

    // Add code show install prompt & hide the install button.
    deferredInstallPrompt.prompt();
    // Hide the install button, it can't be called twice.
    evt.srcElement.setAttribute('hidden', true);
    // Log user response to prompt.
    // Log user response to prompt.
    deferredInstallPrompt.userChoice
        .then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log("L'usager a installé la PWA via mon boutton", choice);
            } else {
                console.log("L'usager a refusé d'installer la PWA", choice);
            }
            deferredInstallPrompt = null;
        });

}
