// src/tabs/smoke-test.tsx

import React from 'react';

// Tailwind CSS を利用して、中央寄せのシンプルなページを作成
const SmokeTestPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="p-10 bg-white rounded-xl shadow-2xl text-center max-w-lg mx-auto">

                <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
                    ✅ Smoke Test Passed!
                </h1>

                <p className="text-xl text-gray-700 mb-6">
                    このページは、拡張機能の新しいタブとして正常に開かれました。
                </p>

                <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                        **フレームワーク:** Plasmo + Tailwind CSS
                    </p>
                    <p className="text-sm text-gray-500">
                        **コンポーネント:** `tabs/smoke-test.tsx`
                    </p>
                </div>

                <a
                    href="javascript:window.close()"
                    className="mt-8 inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full transition duration-150"
                >
                    タブを閉じる
                </a>
            </div>
        </div>
    );
};

export default SmokeTestPage;