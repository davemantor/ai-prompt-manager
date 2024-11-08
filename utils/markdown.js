class MarkdownHandler {
    constructor() {
        this.converter = new showdown.Converter({
            tables: true,
            tasklists: true,
            strikethrough: true,
            emoji: true
        });
    }

    toHTML(markdown) {
        return this.converter.makeHtml(markdown);
    }

    toMarkdown(html) {
        return this.converter.makeMarkdown(html);
    }

    renderPreview(markdown) {
        const html = this.toHTML(markdown);
        return `
            <div class="markdown-preview">
                ${html}
            </div>
        `;
    }
}
