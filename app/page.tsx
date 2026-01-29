'use client';

import { useState } from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin';

type ScanResult = {
    text: string;
    time: string;
};

export default function App() {
    const [decodedResults, setDecodedResults] = useState<ScanResult[]>([]);

    const onNewScanResult = (decodedText: string, _decodedResult: any) => {
        // handle decoded results here
        console.log("Decoded text:", decodedText);
        setDecodedResults(prev => [
            { text: decodedText, time: new Date().toLocaleTimeString() },
            ...prev
        ]);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        📷 QR Code Scanner
                    </h1>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <Html5QrcodePlugin
                            fps={10}
                            qrbox={250}
                            disableFlip={false}
                            qrCodeSuccessCallback={onNewScanResult}
                        />
                    </div>

                    {decodedResults.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                ✅ ผลลัพธ์การสแกน
                            </h2>
                            <div className="space-y-3">
                                {decodedResults.map((result, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-green-50 border border-green-200 rounded-lg p-4"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm text-gray-500">
                                                {result.time}
                                            </span>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard?.writeText(result.text);
                                                    alert('คัดลอกแล้ว!');
                                                }}
                                                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                            >
                                                📋 คัดลอก
                                            </button>
                                        </div>
                                        <p className="text-gray-800 font-mono text-sm break-all">
                                            {result.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => setDecodedResults([])}
                                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            >
                                🗑️ ล้างประวัติ
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}