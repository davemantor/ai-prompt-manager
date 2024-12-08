chrome.runtime.onInstalled.addListener(() => {
    console.log('AI Prompt Manager extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getPrompts') {
        chrome.storage.local.get('prompts', (data) => {
            sendResponse(data.prompts || {});
        });
        return true; // Keep the message channel open for sendResponse
    } else if (message.action === 'savePrompt') {
        const { prompt } = message;
        chrome.storage.local.get('prompts', (data) => {
            const prompts = data.prompts || {};
            prompts[prompt.id] = prompt;
            chrome.storage.local.set({ prompts }, () => {
                sendResponse({ success: true });
            });
        });
        return true; // Keep the message channel open for sendResponse
    } else if (message.action === 'importPrompts') {
        const { prompts } = message;
        chrome.storage.local.set({ prompts }, () => {
            sendResponse({ success: true });
        });
        return true; // Keep the message channel open for sendResponse
    } else if (message.action === 'exportPrompts') {
        chrome.storage.local.get('prompts', (data) => {
            sendResponse(data.prompts || {});
        });
        return true; // Keep the message channel open for sendResponse
    } else if (message.action === 'getFolders') {
        chrome.storage.local.get('folders', (data) => {
            sendResponse(data.folders || {});
        });
        return true; // Keep the message channel open for sendResponse
    } else if (message.action === 'saveFolder') {
        const { folder } = message;
        chrome.storage.local.get('folders', (data) => {
            const folders = data.folders || {};
            folders[folder.id] = folder;
            chrome.storage.local.set({ folders }, () => {
                sendResponse({ success: true });
            });
        });
        return true; // Keep the message channel open for sendResponse
    } else if (message.action === 'importFolders') {
        const { folders } = message;
        chrome.storage.local.set({ folders }, () => {
            sendResponse({ success: true });
        });
        return true; // Keep the message channel open for sendResponse
    } else if (message.action === 'exportFolders') {
        chrome.storage.local.get('folders', (data) => {
            sendResponse(data.folders || {});
        });
        return true; // Keep the message channel open for sendResponse
    }
});
