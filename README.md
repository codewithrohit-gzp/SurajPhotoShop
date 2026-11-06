# Frame & Focus — Photo Shop Website

A responsive React + Vite storefront starter for a photography/printing shop. It includes category filtering, search, sorting, wishlist hearts, a working client-side cart, quantity controls, and an order form that opens WhatsApp with the order summary.

## Run locally

1. Install Node.js (LTS) from https://nodejs.org/
2. Extract this ZIP and open the `printshop-studio` folder in VS Code.
3. Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL shown by Vite (usually `http://localhost:5173`).

## Customise for your client

- **Shop name/logo:** edit the brand text in `src/App.jsx` (`Frame & Focus`).
- **Products, prices, categories, images:** edit the `products` array near the top of `src/App.jsx`.
- **Shop address, phone and email:** replace the placeholder details in the footer.
- **WhatsApp ordering:** in `placeOrder`, replace `https://wa.me/?text=` with your shop's WhatsApp number, e.g. `https://wa.me/919876543210?text=...`. Use country code + number with no `+`, spaces or dashes.
- **Images:** sample images currently use Unsplash URLs. Replace them with the client's own product images for launch.
- **Colours and layout:** customise variables at the top of `src/style.css`.

## Important notes

This is a working **frontend demo**. Cart state is in memory and resets on refresh. The order form hands off to WhatsApp; it does not store orders in a database or accept online payments. For a production client project, add a backend (for example Laravel/Node + MySQL/MongoDB), persistent cart/order records, admin product management, image upload, and a payment gateway.
