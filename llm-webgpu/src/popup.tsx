// src/popup.tsx
import React from 'react';

// 新しいタブを開く処理をバックグラウンドに依頼する関数
const openSmokeTestPage = () => {
  // chrome.runtime.sendMessage を使用してバックグラウンドスクリプトにメッセージを送信
  // メッセージの型は { action: 'openSmokeTest' } とします
  chrome.runtime.sendMessage({ action: 'openSmokeTest' }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error sending message:", chrome.runtime.lastError);
      return;
    }
    console.log("Response from background:", response);
  });
};

const Popup = () => {
  return (
    <div className="p-4 w-64 text-center">
      <h1 className="text-xl font-bold mb-4 text-gray-800">
        🚀 My Extension Popup
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        サンプルページへ移動します。
      </p>

      {/* Tailwind CSSでスタイルを設定したボタン */}
      <button
        onClick={openSmokeTestPage}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 border border-transparent rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        サンプルページを開く
      </button>
    </div>
  );
  // 
};

export default Popup;