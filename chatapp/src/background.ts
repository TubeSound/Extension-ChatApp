// src/background/index.ts (または src/background.ts)

// chrome.runtime.onMessage.addListener でポップアップからのメッセージを待ち受けます
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        // リクエストの型をチェック
        if (request.action === 'openSmokeTest') {
            console.log('Received message to open smoke test page.');
            const url = "tabs/smoke-test.html";
            chrome.tabs.create({ url }, (tab) => {
                if (chrome.runtime.lastError) {
                    console.error("Error creating new tab:", chrome.runtime.lastError);
                    sendResponse({ success: false, error: chrome.runtime.lastError.message });
                    return;
                }
                console.log(`New tab opened with ID: ${tab?.id}`);
                // 成功をポップアップに返信
                sendResponse({ success: true, tabId: tab?.id });
            });

            // 非同期操作を行うため、必ず true を返す必要があります
            // これにより、sendResponse が非同期で呼び出されることをブラウザに伝えます。
            return true;
        }

        // 処理しないメッセージの場合は false または何も返さない
        sendResponse({ success: false, message: "Unknown action" });
    }
);