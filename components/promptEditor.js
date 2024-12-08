class PromptEditor {
    constructor() {
        this.editor = null;
        this.toolbar = {
            basic: ['bold', 'italic', 'code'],
            formatting: ['heading', 'blockquote', 'bullet_list'],
            special: ['variables', 'conditions', 'examples']
        };
    }

    initialize(container) {
        this.editor = new Editor({
            element: container,
            extensions: this.getExtensions(),
            content: '',
            onUpdate: ({ editor }) => {
                this.handleContentUpdate(editor.getHTML());
            }
        });

        this.renderToolbar();
    }

    getExtensions() {
        return [
            new Bold(),
            new Italic(),
            new Code(),
            new Heading(),
            new Blockquote(),
            new BulletList(),
            new Variables(),
            new Conditions(),
            new Examples()
        ];
    }

    handleContentUpdate(content) {
        // Handle content update logic here
    }

    renderToolbar() {
        const toolbarContainer = document.createElement('div');
        toolbarContainer.className = 'editor-toolbar';
        toolbarContainer.innerHTML = `
            ${this.renderToolbarGroup(this.toolbar.basic)}
            <div class="toolbar-separator"></div>
            ${this.renderToolbarGroup(this.toolbar.formatting)}
            <div class="toolbar-separator"></div>
            ${this.renderToolbarGroup(this.toolbar.special)}
        `;
        this.editor.element.parentNode.insertBefore(toolbarContainer, this.editor.element);
    }

    renderToolbarGroup(group) {
        return group.map(tool => `
            <button class="toolbar-btn" data-tool="${tool}">
                ${tool}
            </button>
        `).join('');
    }

    async savePrompt(prompt) {
        await StorageService.savePrompt(prompt);
    }

    async loadPrompt(promptId) {
        const prompt = await StorageService.getPromptById(promptId);
        this.editor.setContent(prompt.content);
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

    async saveVersion(promptId, versionContent) {
        const prompt = await StorageService.getPromptById(promptId);
        prompt.versions.push(versionContent);
        await StorageService.savePrompt(prompt);
    }

    async loadVersion(promptId, versionIndex) {
        const prompt = await StorageService.getPromptById(promptId);
        this.editor.setContent(prompt.versions[versionIndex]);
    }
}
