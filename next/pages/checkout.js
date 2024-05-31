import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/router";

export default function CheckOut() {
  const { items = [] } = useCart();
  const products = items;
  const [paymentMethod, setPaymentMethod] = useState("取貨付款");
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("黑貓");
  const [customerError, setCustomerError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleDeliveryMethodChange = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    // 檢查姓名、電話和地址是否填寫
    let errors = {};
    if (!customer.trim()) {
      errors.customer = "姓名必須填寫";
    }
    if (!phone.trim()) {
      errors.phone = "電話必須填寫";
    }
    if (!address.trim()) {
      errors.address = "地址必須填寫";
    }

    // 如果有錯誤，設置錯誤訊息並返回
    if (Object.keys(errors).length > 0) {
      setCustomerError(errors.customer || "");
      setPhoneError(errors.phone || "");
      setAddressError(errors.address || "");
      setSubmitting(false);
      return;
    }
    const productsData = products.map((product) => ({
      id: product.id,
      name: product.name,
      qty: product.qty,
      price: product.price,
    }));
    // 提交訂單資料
    fetch("http://localhost:3001/order-s", {
      // 正確的後端路由URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // product_name: products.map(product => product.name), // 修改為對應的屬性名稱
        // qty: products.map(product => product.qty), // 修改為對應的屬性名稱
        // price: products.map(product => product.price), // 修改為對應的屬性名稱
        products: productsData,
        total_price: products.reduce(
          (acc, product) => acc + product.price * product.qty,
          0
        ), // 修改為對應的屬性名稱
        customer: customer,
        phone: phone,
        address: address,
        deliveryMethod: deliveryMethod,
        paymentMethod: paymentMethod,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit order");
        }
        return response;
      })

      .then((data) => {
        console.log("後端返回的數據：", data); // 在此處添加 console.log
        // 清空表單
        setCustomer("");
        setPhone("");
        setAddress("");
        // 訂單提交後跳轉到訂單成功頁面
        router.push("/order-success");
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        // 檢查錯誤類型，並設置相應的錯誤訊息
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          setSubmitError("無法連接到服務器，請檢查您的網絡連接。");
        } else {
          setSubmitError("無法提交訂單，請稍後再試。");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.qty,
    0
  );

  const router = useRouter();

  return (
    <div className="checkout-page">
      <h1>結帳</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>商品名稱</th>
            <th>數量</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="product">
              <td>{product.name}</td>
              <td style={{ fontWeight: "bold" }}>{product.qty}</td>
              <td>NT${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-price">合計:NT${totalPrice}</div>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customer">收件人:</label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
          {customerError && (
            <span className="error-message">{customerError}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">收件人電話:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {phoneError && <span className="error-message">{phoneError}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address">收件人地址:</label>
          <textarea
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {addressError && (
            <span className="error-message">{addressError}</span>
          )}
        </div>
        <div className="form-group">
          <label>運送方式:</label>
          <div>
            <label>
              <input
                type="radio"
                name="deliveryMethod"
                value="7-11"
                checked={deliveryMethod === "7-11"}
                onChange={handleDeliveryMethodChange}
              />
              7-11
            </label>
            <label>
              <input
                type="radio"
                name="deliveryMethod"
                value="全家"
                checked={deliveryMethod === "全家"}
                onChange={handleDeliveryMethodChange}
              />
              全家
            </label>
            <label>
              <input
                type="radio"
                name="deliveryMethod"
                value="黑貓"
                checked={deliveryMethod === "黑貓"}
                onChange={handleDeliveryMethodChange}
              />
              黑貓
            </label>
          </div>
        </div>
        <div className="payment-options">
          <label>付款方式:</label>
          <label>
            <input
              type="radio"
              name="payment"
              value="取貨付款"
              checked={paymentMethod === "取貨付款"}
              onChange={handlePaymentMethodChange}
            />
            取貨付款
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="信用卡"
              checked={paymentMethod === "信用卡"}
              onChange={handlePaymentMethodChange}
            />
            信用卡
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="atm"
              checked={paymentMethod === "atm"}
              onChange={handlePaymentMethodChange}
            />
            ATM結帳
          </label>
        </div>
        <div className="button-container">
          <button className="submit-btn" type="submit" disabled={submitting}>
            提交訂單
          </button>
          {submitError && <span className="error-message">{submitError}</span>}
          <Link href="/cart" className="back-btn">
            返回購物車
          </Link>
        </div>
      </form>
    </div>
  );
}
