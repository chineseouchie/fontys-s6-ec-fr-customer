import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserProvider from "./providers/UserProvider"
import { SnackbarProvider } from "notistack";
import Slide from "@mui/material/Slide";
import CartProvider from "./providers/CartProvider";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

if (process.env.NODE_ENV === "production") {

	console.log("Running production")
	Sentry.init({
		dsn: "https://8dfece0431454327b10ffa3fd399d06e@o492790.ingest.sentry.io/6395456",
		integrations: [new BrowserTracing()],
	  
		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
}

ReactDOM.render(
	<React.StrictMode>
		<SnackbarProvider
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			maxSnack={1}
			TransitionComponent={Slide}>
			<UserProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</UserProvider>
		</SnackbarProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
