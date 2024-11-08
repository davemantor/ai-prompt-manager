class TagManager {
    constructor() {
        this.tags = new Set();
    }

    async initialize() {
        const storage = await chrome.storage.local.get('tags');
        this.tags = new Set(storage.tags || []);
    }

    async addTag(tag) {
        this.tags.add(tag.toLowerCase());
        await this.saveTags();
    }

    async saveTags() {
        await chrome.storage.local.set({ tags: Array.from(this.tags) });
    }

    renderTagInput() {
        return `
            <div class="tag-input-container">
                <input type="text" class="tag-input" placeholder="Add tags...">
                <div class="tag-suggestions"></div>
            </div>
        `;
    }

    setupEventListeners() {
        const tagInput = document.querySelector('.tag-input');
        tagInput.addEventListener('input', this.handleTagInput.bind(this));
    }

    handleTagInput(event) {
        const input = event.target.value.toLowerCase();
        const suggestions = Array.from(this.tags).filter(tag => tag.includes(input));
        this.renderTagSuggestions(suggestions);
    }

    renderTagSuggestions(suggestions) {
        const suggestionsContainer = document.querySelector('.tag-suggestions');
        suggestionsContainer.innerHTML = suggestions.map(tag => `
            <div class="tag-suggestion">${tag}</div>
        `).join('');
    }
}
