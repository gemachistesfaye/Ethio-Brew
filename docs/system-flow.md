# Ethio-Brew System Flow

## 🛒 Customer Journey
1. **Browse**: User explores the coffee catalog, filters by origin.
2. **AI Recommendation**: User receives smart suggestions based on ratings and roasts.
3. **Cart**: User adds products to the slide-out cart.
4. **Checkout**: User provides delivery info and selects payment method (Telebirr/CBE).
5. **Payment Upload**: User transfers money via their banking app and uploads a screenshot of the receipt.
6. **Confirmation**: Order moves to `Pending` status.

## 🛠️ Admin Journey
1. **Dashboard Overview**: Admin sees total sales and pending tasks.
2. **Payment Verification**: Admin reviews the uploaded screenshot against the order amount.
3. **Approval**: Admin clicks "Approve". Order moves to `Verified`.
4. **Processing**: Admin starts roasting/packaging. Order moves to `Processing`.
5. **Delivery**: Order is handed to the courier. Order moves to `Delivered`.
6. **Loyalty**: Upon delivery, `EthioPoints` are automatically credited to the user's account.

## 🤖 AI Features
- **Recommendation Engine**: Suggests products using a scoring algorithm (Rating + Stock).
- **Chat Assistant**: Helps users with FAQs, prices, and brewing tips.
