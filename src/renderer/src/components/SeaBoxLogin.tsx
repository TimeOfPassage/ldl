import { useState } from "react";
import { Button } from "@renderer/components/ui/button";
import { Card } from "@renderer/components/ui/card";
import { User, Mail, Shield, Copy } from "lucide-react";

export function SeaBoxLogin() {
    const [deviceId] = useState("f0d16988-a9ff-5a04-a9ae-423a3c2ce4d4");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(deviceId);
        console.log("Device ID copied");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
            {/* Main Container */}
            <div className="flex w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-white">
                {/* Left Panel - Light Blue */}
                <div className="w-1/2 bg-gradient-to-br from-blue-200 to-blue-300 p-12 flex flex-col items-center justify-center">
                    {/* Logo/Mascot */}
                    <div className="mb-8">
                        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                                <div className="text-4xl">🐻</div>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-slate-700 mb-2">SeaBox跨境助手</h1>
                    <p className="text-slate-600 text-sm mb-12">一站式跨境电商运营解决方案</p>

                    {/* Feature Cards */}
                    <div className="w-full space-y-4">
                        <Card className="bg-white/80 backdrop-blur-sm border-0 p-4 hover:bg-white/90 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-slate-800">账号助手</h3>
                                    <p className="text-sm text-slate-600">多账号统一管理、便捷切换</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-0 p-4 hover:bg-white/90 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-slate-800">翻译助手</h3>
                                    <p className="text-sm text-slate-600">多语言本地化、优化翻译衔接</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-0 p-4 hover:bg-white/90 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-slate-800">安全免费</h3>
                                    <p className="text-sm text-slate-600">本地翻译 API 不会过服务器 保障隐私安全</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Right Panel - White */}
                <div className="w-1/2 p-12 flex flex-col justify-center relative">
                    {/* Language/Theme Toggle */}
                    <div className="absolute top-6 right-6 flex gap-2">
                        <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600">
                            中
                        </button>
                        <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600">
                            ☀️
                        </button>
                    </div>

                    <div className="max-w-md mx-auto w-full">
                        {/* Welcome Text */}
                        <h2 className="text-slate-800 mb-3">欢迎使用</h2>
                        <p className="text-slate-500 mb-8">使用SeaBox跨境助手，助力全球业务增长</p>

                        {/* Device ID Section */}
                        <div className="mb-6">
                            <label className="text-sm text-slate-600 mb-2 block">设备标识</label>
                            <div className="relative">
                                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <Shield className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                    <span className="text-sm text-slate-600 font-mono flex-1 truncate">
                                        {deviceId}
                                    </span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-1.5 hover:bg-slate-200 rounded transition-colors flex-shrink-0"
                                        title="复制"
                                    >
                                        <Copy className="w-4 h-4 text-slate-600" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Enter Button */}
                        <Button
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-lg"
                            onClick={() => console.log("进入软件")}
                        >
                            进入软件
                        </Button>

                        {/* Footer */}
                        <p className="text-center text-xs text-slate-400 mt-8">
                            © 2024-2025 SeaBox跨境助手
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
