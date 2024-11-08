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
    }
});
