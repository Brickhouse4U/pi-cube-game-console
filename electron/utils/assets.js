let resourcesPath = null;

export async function getResourcesPath() {
    if (resourcesPath) return resourcesPath;
    resourcesPath = await window.electron.getResourcesPath();
    return resourcesPath;
}

export async function getPicturePath(filename) {
    const base = await getResourcesPath();
    return `${base}pictures/${filename}`;
}

export async function getSoundPath(filename) {
    const base = await getResourcesPath();
    return `${base}sounds/${filename}`;
}