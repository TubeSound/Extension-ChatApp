// src/tabs/smoke-test.tsx

import React, { useState, useEffect } from 'react';
import { pipeline, TextGenerationPipeline } from '@huggingface/transformers';

const MODEL_ID = 'onnx-community/gemma-2-2b-jpn-it';
// assets ディレクトリに配置したファイルパス
const ONNX_MODEL_PATH = '/model_q4f16.onnx';
const INPUT_PROMPT = '今日はいい天気ですね。週末は何をしますか？';

const SmokeTestPage = () => {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('モデルをロード中...');
    const [result, setResult] = useState('');

    // 推論パイプラインを保持する状態
    const [generator, setGenerator] = useState<TextGenerationPipeline | null>(null);

    useEffect(() => {
        // モデルのロードと推論処理
        const runInference = async () => {
            try {
                // 1. モデルとトークナイザーをローカルファイルからロード
                // `quantized: true` は Q4 量子化されたモデルを使用していることを示します
                const pipe = await pipeline('text-generation', MODEL_ID, {
                    quantized: true,
                    // ONNX ファイルパスを指定
                    model: ONNX_MODEL_PATH,
                    // model_file_name は ONNX ファイル名と一致させる必要があります
                    model_file_name: "model_q4f16.onnx",
                });

                setGenerator(pipe as TextGenerationPipeline);
                setStatus('モデルのロードが完了しました。推論を実行中...');

                // 2. 推論の実行
                const outputs = await pipe(INPUT_PROMPT, {
                    max_new_tokens: 64,
                    // temperature: 0.7, // 必要に応じて調整
                });

                const generatedText = outputs[0].generated_text;
                setResult(generatedText);
                setStatus('推論完了！');

            } catch (error) {
                console.error('推論中にエラーが発生しました:', error);
                setStatus(`エラーが発生しました: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        runInference();
        // クリーンアップ関数は不要
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-xl">

                <h1 className="text-3xl font-bold mb-6 text-indigo-700">
                    🧠 LLM 推論 Smoke Test
                </h1>

                <div className="mb-6">
                    <p className="text-gray-600 font-semibold">現在のステータス:</p>
                    <p className={`text-lg ${loading ? 'text-orange-500' : 'text-green-600'}`}>
                        {status}
                    </p>
                </div>

                <div className="border-t pt-4">
                    <h2 className="text-xl font-semibold mb-2">入力プロンプト:</h2>
                    <div className="p-4 bg-gray-100 rounded-lg whitespace-pre-wrap text-gray-800">
                        {INPUT_PROMPT}
                    </div>
                </div>

                {result && (
                    <div className="mt-6 border-t pt-4">
                        <h2 className="text-xl font-semibold mb-2">生成結果:</h2>
                        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg whitespace-pre-wrap text-gray-800">
                            {result}
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="mt-6 text-center text-indigo-500">
                        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-indigo-500 rounded-full" role="status" />
                        <p className="mt-2">処理中...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SmokeTestPage;