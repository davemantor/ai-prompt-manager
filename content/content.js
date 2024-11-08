class SidebarNavigation {
    constructor() {
        this.sidebar = null;
    }

    injectSidebar() {
        this.sidebar = document.createElement('div');
        this.sidebar.className = 'ai-prompt-sidebar';
        this.sidebar.innerHTML = this.renderSidebar();
        document.body.appendChild(this.sidebar);
        this.setupEventListeners();
    }

    renderSidebar() {
        return `
            <div class="sidebar-header">
                <h2>AI Prompt Manager</h2>
                <button class="close-sidebar-btn">X</button>
            </div>
            <div class="sidebar-content">
                <div class="prompt-list"></div>
                <button class="add-prompt-btn">Add Prompt</button>
            </div>
        `;
    }

    setupEventListeners() {
        document.querySelector('.close-sidebar-btn').addEventListener('click', () => {
            this.sidebar.style.display = 'none';
        });

        document.querySelector('.add-prompt-btn').addEventListener('click', () => {
            this.addPrompt();
        });

        this.sidebar.addEventListener('click', (event) => {
            if (event.target.classList.contains('prompt-item')) {
                this.handlePromptClick(event.target.dataset.id);
            }
        });
    }

    async addPrompt() {
        const promptId = prompt('Enter prompt ID:');
        if (promptId) {
            const promptItem = document.createElement('div');
            promptItem.className = 'prompt-item';
            promptItem.dataset.id = promptId;
            promptItem.textContent = `Prompt ${promptId}`;
            document.querySelector('.prompt-list').appendChild(promptItem);
            await StorageService.savePrompt({ id: promptId, content: '' });
        }
    }

    async handlePromptClick(promptId) {
        const prompt = await StorageService.getPromptById(promptId);
        alert(`Prompt ${promptId} clicked: ${prompt.content}`);
    }

    async importPrompts(prompts) {
        for (const prompt of prompts) {
            await StorageService.savePrompt(prompt);
        }
    }

    async exportPrompts() {
        const prompts = await StorageService.getAllPrompts();
        return prompts;
    }

    async importFolders(folders) {
        for (const folder of folders) {
            await StorageService.saveFolder(folder);
        }
    }

    async exportFolders() {
        const folders = await StorageService.getAllFolders();
        return folders;
    }

    async saveVersion(promptId, versionContent) {
        const prompt = await StorageService.getPromptById(promptId);
        prompt.versions.push(versionContent);
        await StorageService.savePrompt(prompt);
    }

    async loadVersion(promptId, versionIndex) {
        const prompt = await StorageService.getPromptById(promptId);
        alert(`Loaded version ${versionIndex} of prompt ${promptId}: ${prompt.versions[versionIndex]}`);
    }
}

const sidebarNavigation = new SidebarNavigation();
sidebarNavigation.injectSidebar();
