let resourcesPath: string | null = null;

export async function getResourcesPath(): Promise<string> {
    if (resourcesPath) return resourcesPath;
    resourcesPath = await window.electron.getResourcesPath();
    return resourcesPath;
}

export async function getPicturePath(filename: string): Promise<string> {
    const base = await getResourcesPath();
    return `${base}pictures/${filename}`;
}

export async function getSoundPath(filename: string): Promise<string> {
    const base = await getResourcesPath();
    return `${base}sounds/${filename}`;
}

export async function getGamePreview(game: string): Promise<string> {
    const base = `/media/picube/covers/${game}/preview.mp4`;
    return base;
}

export async function getGameTitleFile(game: string): Promise<string> {
    return `/media/picube/covers/${game}/title.txt`;
}

export async function availableGameCovers(): Promise<string[]> {
    const covers = "/media/picube/covers";
    const files = await window.electron.readDirectory(covers);
    return files;
}
