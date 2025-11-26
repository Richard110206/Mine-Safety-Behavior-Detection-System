import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "矿井不安全行为识别检测调度系统",
  description: "基于AI视觉识别的矿井安全监控与告警管理系统，实时监测工作人员不安全行为，保障矿井作业安全",
  keywords: "矿井安全,不安全行为识别,AI监控,安全帽检测,轨道跨越检测,瓦斯监测",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
