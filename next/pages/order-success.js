import React from 'react'
import Link from 'next/link';

export default function OrderSuccess() {
  return (
    <div className="order-success-page">
    <h2>訂單已成功提交！</h2>
    <p>感謝您的訂購。</p>
    <p>您的訂單已成功提交。我們將盡快處理您的訂單，並通過郵件向您發送確認信息。</p>
    <Link href="/product/list" className="back-to-products-btn">返回商品頁</Link>
  </div>
);
};
