class PromptParser {
    constructor() {
        this.metadataPatterns = {
            usage: /Usage:\s*(\d+)/i,
            rating: /Rating:\s*(\d+(\.\d+)?)/i,
            source: /Source:\s*(\S+)/i,
            notes: /Notes:\s*(.*)/i
        };
    }

    parseContent(content) {
        const lines = content.split('\n');
        const metadata = this.extractMetadata(lines);
        const summary = this.generateSummary(lines);

        return { metadata, summary };
    }

    extractMetadata(lines) {
        const metadata = {};

        for (const line of lines) {
            for (const [key, pattern] of Object.entries(this.metadataPatterns)) {
                const match = line.match(pattern);
                if (match) {
                    metadata[key] = match[1];
                }
            }
        }

        return metadata;
    }

    generateSummary(lines) {
        const summaryLines = lines.slice(0, 3);
        return summaryLines.join(' ');
    }

    formatPrompt(prompt) {
        return `Title: ${prompt.title}\nContent: ${prompt.content}\nTags: ${prompt.tags.join(', ')}\nFolder: ${prompt.folder}`;
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
}
