class StorageService {
    async savePrompt(prompt) {
        const prompts = await this.getAllPrompts();
        prompts[prompt.id] = prompt;
        return chrome.storage.local.set({ prompts });
    }

    async getAllPrompts() {
        const data = await chrome.storage.local.get('prompts');
        return data.prompts || {};
    }

    async getPromptById(id) {
        const prompts = await this.getAllPrompts();
        return prompts[id];
    }

    async deletePrompt(id) {
        const prompts = await this.getAllPrompts();
        delete prompts[id];
        return chrome.storage.local.set({ prompts });
    }

    async saveFolder(folder) {
        const folders = await this.getAllFolders();
        folders[folder.id] = folder;
        return chrome.storage.local.set({ folders });
    }

    async getAllFolders() {
        const data = await chrome.storage.local.get('folders');
        return data.folders || {};
    }

    async getFolderById(id) {
        const folders = await this.getAllFolders();
        return folders[id];
    }

    async deleteFolder(id) {
        const folders = await this.getAllFolders();
        delete folders[id];
        return chrome.storage.local.set({ folders });
    }

    async saveTag(tag) {
        const tags = await this.getAllTags();
        tags.add(tag.toLowerCase());
        return chrome.storage.local.set({ tags: Array.from(tags) });
    }

    async getAllTags() {
        const data = await chrome.storage.local.get('tags');
        return new Set(data.tags || []);
    }

    async deleteTag(tag) {
        const tags = await this.getAllTags();
        tags.delete(tag.toLowerCase());
        return chrome.storage.local.set({ tags: Array.from(tags) });
    }

    async saveSettings(settings) {
        return chrome.storage.local.set({ settings });
    }

    async getSettings() {
        const data = await chrome.storage.local.get('settings');
        return data.settings || {};
    }
}
