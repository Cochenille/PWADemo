let deferredInstallPrompt = null;
const installButton = document.getElementById('btnInstall');

installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', afficherBouttonInstall);

function afficherBouttonInstall(evt) {
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}

function installPWA(evt) {

    deferredInstallPrompt.prompt();

    // cache le boutton d'installation (on ne peut pas l'installer deux fois)
    evt.srcElement.setAttribute('hidden', true);
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
