// src/tabs/smoke-test.tsx
import React, { useState, useEffect } from 'react';

const SmokeTestPage = () => {

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-xl">

                <h1 className="text-3xl font-bold mb-6 text-indigo-700">
                    🧠 LLM 推論 Smoke Test
                </h1>

                <div className="border-t pt-4">
                    <h2 className="text-xl font-semibold mb-2">入力プロンプト:</h2>
                </div>
            </div>
        </div>
    );
};

export default SmokeTestPage;