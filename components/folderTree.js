class FolderTree {
    constructor() {
        this.folders = [];
        this.draggedItem = null;
    }

    initialize(container) {
        this.container = container;
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.container.innerHTML = this.renderFolders(this.folders);
    }

    renderFolders(folders) {
        return folders.map(folder => `
            <div class="folder" data-id="${folder.id}" draggable="true">
                <div class="folder-name">${folder.name}</div>
                <div class="folder-children">
                    ${this.renderFolders(folder.children)}
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        this.container.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.container.addEventListener('dragover', this.handleDragOver.bind(this));
        this.container.addEventListener('drop', this.handleDrop.bind(this));
    }

    handleDragStart(event) {
        this.draggedItem = event.target;
        event.dataTransfer.setData('text/plain', event.target.dataset.id);
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDrop(event) {
        event.preventDefault();
        const targetId = event.dataTransfer.getData('text/plain');
        const targetFolder = this.findFolderById(targetId);
        const dropZone = event.target.closest('.folder');

        if (dropZone && targetFolder) {
            const dropZoneId = dropZone.dataset.id;
            const dropZoneFolder = this.findFolderById(dropZoneId);

            if (dropZoneFolder) {
                this.moveFolder(targetFolder, dropZoneFolder);
                this.render();
            }
        }
    }

    findFolderById(id) {
        const findFolder = (folders) => {
            for (const folder of folders) {
                if (folder.id === id) {
                    return folder;
                }
                const childFolder = findFolder(folder.children);
                if (childFolder) {
                    return childFolder;
                }
            }
            return null;
        };
        return findFolder(this.folders);
    }

    moveFolder(targetFolder, dropZoneFolder) {
        this.removeFolder(targetFolder.id);
        dropZoneFolder.children.push(targetFolder);
    }

    removeFolder(id) {
        const removeFolder = (folders) => {
            for (let i = 0; i < folders.length; i++) {
                if (folders[i].id === id) {
                    folders.splice(i, 1);
                    return true;
                }
                if (removeFolder(folders[i].children)) {
                    return true;
                }
            }
            return false;
        };
        removeFolder(this.folders);
    }
}
