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

    async saveVersion(promptId, versionContent) {
        const prompt = await this.getPromptById(promptId);
        if (!prompt.versions) {
            prompt.versions = [];
        }
        prompt.versions.push(versionContent);
        return this.savePrompt(prompt);
    }

    async getVersion(promptId, versionIndex) {
        const prompt = await this.getPromptById(promptId);
        return prompt.versions ? prompt.versions[versionIndex] : null;
    }

    async importPrompts(prompts) {
        for (const prompt of prompts) {
            await this.savePrompt(prompt);
        }
    }

    async exportPrompts() {
        const prompts = await this.getAllPrompts();
        return prompts;
    }

    async importFolders(folders) {
        for (const folder of folders) {
            await this.saveFolder(folder);
        }
    }

    async exportFolders() {
        const folders = await this.getAllFolders();
        return folders;
    }

    async importTags(tags) {
        for (const tag of tags) {
            await this.saveTag(tag);
        }
    }

    async exportTags() {
        const tags = await this.getAllTags();
        return Array.from(tags);
    }

    async importMarkdown(markdown) {
        const html = new showdown.Converter().makeHtml(markdown);
        return chrome.storage.local.set({ markdown: html });
    }

    async exportMarkdown() {
        const data = await chrome.storage.local.get('markdown');
        return new showdown.Converter().makeMarkdown(data.markdown || '');
    }
}
