class SearchBar {
    constructor() {
        this.searchInput = null;
        this.filterOptions = {};
    }

    initialize(container) {
        this.container = container;
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="search-bar">
                <input type="text" class="search-input" placeholder="Search prompts...">
                <div class="filter-options">
                    <label>
                        <input type="checkbox" name="tags" value="tags"> Tags
                    </label>
                    <label>
                        <input type="checkbox" name="type" value="type"> Type
                    </label>
                    <label>
                        <input type="checkbox" name="dateRange" value="dateRange"> Date Range
                    </label>
                    <label>
                        <input type="checkbox" name="versionControl" value="versionControl"> Version Control
                    </label>
                    <label>
                        <input type="checkbox" name="importExport" value="importExport"> Import/Export
                    </label>
                </div>
            </div>
        `;
        this.searchInput = this.container.querySelector('.search-input');
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.container.querySelectorAll('.filter-options input').forEach(input => {
            input.addEventListener('change', this.handleFilterChange.bind(this));
        });
    }

    handleSearch(event) {
        const query = event.target.value;
        this.search(query, this.filterOptions);
    }

    handleFilterChange(event) {
        const { name, value, checked } = event.target;
        if (checked) {
            this.filterOptions[name] = value;
        } else {
            delete this.filterOptions[name];
        }
        this.search(this.searchInput.value, this.filterOptions);
    }

    async search(query, filters) {
        const results = await StorageService.searchPrompts(query, filters);
        this.renderSearchResults(results);
    }

    renderSearchResults(results) {
        const resultsContainer = document.querySelector('.search-results');
        resultsContainer.innerHTML = results.map(result => `
            <div class="search-result">
                <h3>${result.prompt.title}</h3>
                <p>${result.prompt.content}</p>
            </div>
        `).join('');
    }
}
