// import "@/styles/globals.css";

import { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);
// 樣式
import "@/styles/globals.scss";
import "@/styles/product.scss";
import "@/styles/cart.scss";
import "@/styles/loader.scss";
import "@/styles/booking.scss";
import "@/styles/bookingCalender.scss";

import DefaultLayout from "@/components/layout/default-layout";
import { CartProvider } from "@/hooks/use-cart";
import { Toaster } from "react-hot-toast";
import { ThemeContextProvider } from "@/contexts/theme-context";
import { AuthContextProvider } from "@/contexts/auth-context";

// 載入動畫context
import { LoaderProvider } from "@/hooks/use-loader";

// 自訂用載入動畫元件
import {
  CatLoader,
  LegoLoader,
  NoLoader,
  NikeLoader,
} from "@/hooks/use-loader/components";

export default function App({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // 使用預設排版檔案，對應`components/layout/default-layout/index.js`
  // 或`components/layout/default-layout.js`
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <CartProvider>
      <AuthContextProvider>
        <LoaderProvider close={2} CustomLoader={LegoLoader}>
          <Toaster />
          {getLayout(<Component {...pageProps} />)}
        </LoaderProvider>
      </AuthContextProvider>
    </CartProvider>
  );
}
