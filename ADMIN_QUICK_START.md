# Admin Panel - Quick Start Guide

## 🚀 Getting Started

### Step 1: Start the Application

```bash
npm start
```

The application will run on `http://localhost:4200`

### Step 2: Access Admin Panel

Navigate to: `http://localhost:4200/admin`

You will be automatically redirected to the dashboard.

---

## 📊 Dashboard

The dashboard provides a complete overview of your ecommerce business:

### Key Metrics

- **Total Orders**: All orders placed on the store
- **Total Revenue**: Sum of all paid orders
- **Total Customers**: Number of registered customers
- **Total Products**: Number of products in inventory

### Quick Stats

- **Pending Orders**: Orders awaiting processing
- **Low Stock Products**: Products with stock below 10 units
- **Monthly Revenue**: Revenue for the current month
- **Growth Rate**: Month-over-month percentage growth

### Visualizations

- **Order Status Breakdown**: Visual bars showing order distribution
- **Revenue Analysis**: Paid and pending revenue totals
- **Customer Insights**: Active customers and spending metrics

### Recent Data

- **Recent Orders**: Last 5 orders with current status
- **Low Stock Alerts**: Products approaching out-of-stock
- **Top Customers**: Highest spending customers

---

## 📦 Products Management

### View All Products

1. Click **Products** in sidebar → **All Products**
2. See all products in a table with:
   - Product image and name
   - Category
   - Price
   - Stock level (color-coded)
   - Discount percentage
   - Active/Inactive status

### Add New Product

1. Click **+ Add Product** button
2. Fill in the form:
   - **Product Name** (required)
   - **Category** (required)
   - **Price** (required)
   - **Original Price** (optional for discount calculation)
   - **Stock** (required)
   - **Discount %** (optional)
   - **Description** (required)
   - **Image URL** (required, with preview)
3. Click **Add Product**

### Edit Product

1. Find product in the table
2. Click **Edit** button
3. Modify information
4. Click **Update Product**

### Delete Product

1. Find product in the table
2. Click **Delete** button
3. Confirm deletion

### Search & Filter

- Use **search box** to find by name or description
- Use **category dropdown** to filter by category
- Search is real-time using signals

### Export Products

- Click **📥 Export** button
- Downloads CSV file with all product data

---

## 📋 Orders Management

### View All Orders

1. Click **Orders** in sidebar → **All Orders**
2. See orders table with:
   - Order ID
   - Customer name and email
   - Total amount
   - Order status
   - Payment status
   - Order date

### Search Orders

- **By Order ID**: Search in search box
- **By Customer**: Search customer name
- **By Email**: Search email address
- **By Status**: Use status dropdown filter

### View Order Details

1. Click **View** button for any order
2. Modal opens showing:
   - Order number and date
   - Customer information
   - Order items (product, quantity, price)
   - Order total
   - Shipping address
   - Order status (can be changed)
   - Payment status (can be changed)

### Update Order Status

1. Open order details
2. Change **Order Status** dropdown:
   - Pending → Processing → Shipped → Delivered
3. Status updates automatically

### Update Payment Status

1. Open order details
2. Change **Payment Status** dropdown:
   - Pending → Paid (or) Failed → Refunded
3. Payment status updates automatically

### Print Order

1. Open order details
2. Click **🖨️ Print** button
3. Opens print dialog

### Export Orders

- Click **📥 Export** button
- Downloads CSV file with order data

---

## 👥 Customers Management

### View All Customers

1. Click **Customers** in sidebar
2. See customers table with:
   - Customer name
   - Email
   - Phone
   - Total orders
   - Total spent
   - Status (Active/Inactive)
   - Join date

### Customer Statistics

- **Total Customers**: Count of all customers
- **Active Customers**: Customers with isActive = true
- **Total Spent**: Sum of all customer spending
- **Average Order Value**: Average amount per order

### View Customer Details

1. Click **View** button for any customer
2. Modal shows:
   - Name, email, phone
   - Address information
   - Total spent
   - Total orders
   - Join date
   - Last order date
   - Status (can be toggled)

### Activate/Deactivate Customer

1. Open customer details
2. Toggle **Status** checkbox
3. Saves automatically

### Delete Customer

1. Find customer in table
2. Click **Delete** button
3. Confirm deletion

### Search Customers

- Search by **name**, **email**, or **phone**
- Real-time filtering with signals

---

## 📈 Reports & Analytics

### Access Reports

Click **Reports** in sidebar

### Available Reports

- **Sales Report**: Revenue trends and data
- **Customer Report**: Customer demographics and behavior
- **Product Report**: Product performance metrics
- **Inventory Report**: Stock levels and movements

### Key Analytics

- **Total Sales**: Period revenue
- **Average Order Value**: Mean order amount
- **Conversion Rate**: Percentage of successful transactions

### Product Analytics

- **Top Selling Products**: Most revenue-generating products
- **Units Sold**: Product quantity sold
- **Revenue per Product**: Total revenue per product
- **Growth Rate**: Period-over-period changes

### Customer Analytics

- **Customer Demographics**: New vs returning customers
- **Customer Satisfaction**: Star ratings and reviews

### Export Reports

- **📊 Export as PDF**: Professional PDF report
- **📥 Export as CSV**: Spreadsheet format
- **📧 Email Report**: Send report via email

---

## ⚙️ Settings

### Access Settings

Click **Settings** in sidebar

### Store Settings

- Store Name
- Store Email
- Store Phone
- Currency (USD, EUR, GBP)
- Store Address

### Security Settings

- **Change Password**: Update admin password
- **Two-Factor Authentication**: Add 2FA
- **Session Timeout**: Auto-logout time

### Notifications

Configure which notifications to receive:

- [ ] New Orders
- [ ] Low Stock Alerts
- [ ] Daily Reports
- [ ] Customer Messages

### Backup & Data

- **Last Backup**: Shows last backup date/time
- **🔄 Backup Now**: Create immediate backup
- **⬇️ Download**: Download backup file
- **🗑️ Delete All Data**: Dangerous action (irreversible)

---

## 🎨 Features & Functionality

### Color Indicators

- **Blue**: Primary actions (View, Edit, Primary info)
- **Green**: Success (Active, Delivered, Paid)
- **Yellow/Orange**: Warnings (Pending, Low stock)
- **Red**: Danger (Cancelled, Failed, Inactive)
- **Purple**: Processing (Shipped)

### Status Meanings

#### Order Status

- **Pending**: Order placed, awaiting processing
- **Processing**: Order is being prepared
- **Shipped**: Order sent to customer
- **Delivered**: Order received by customer
- **Cancelled**: Order cancelled by customer or admin

#### Payment Status

- **Pending**: Payment not yet received
- **Paid**: Payment received successfully
- **Failed**: Payment transaction failed
- **Refunded**: Payment was refunded to customer

#### Product Stock

- **Green**: Stock level healthy (>20 units)
- **Orange**: Stock level low (5-20 units)
- **Red**: Stock level critical (<5 units)

### Keyboard Shortcuts

- Coming in future version

---

## 🔍 Signals & Real-Time Updates

All data updates in real-time using Angular Signals:

```typescript
// Example: When you add a product
this.productService.addProduct({...})
// Automatically updates filtered list
// Re-renders without page refresh
```

### No Manual Refresh Needed

- Statistics update automatically
- Tables reflect changes immediately
- Search/filter results update in real-time

---

## 📱 Responsive Design

### Desktop (1024px+)

- Full sidebar
- Multi-column grids
- Full table views

### Tablet (768px - 1023px)

- Sidebar still visible
- 2-column layouts
- Horizontal scroll for tables

### Mobile (< 768px)

- Collapsible sidebar
- Single column layouts
- Optimized touch targets

---

## 💡 Tips & Tricks

### Quick Navigation

- Use breadcrumbs for navigation
- Sidebar menu collapses/expands
- Quick links in dashboard

### Bulk Operations

- Search to filter items
- Then perform action on filtered list
- Export functionality for reporting

### Data Management

- Always confirm before deleting
- View details before editing
- Use search to find specific items

### Performance

- Search is fast (signals-based)
- Filters update instantly
- No page reloads needed

---

## 🐛 Troubleshooting

### Products Not Showing

**Solution**: Refresh page or click "All Products" again

### Order Status Not Updating

**Solution**: Check that new status is valid. Open order details again.

### Search Not Working

**Solution**: Ensure product/customer exists. Check spelling.

### Form Validation

**Solution**: Fill all required fields marked with \*

---

## 🔐 Security Notes

- Admin panel runs at `/admin` path
- Login/authentication to be added in production
- Always backup data before making major changes
- Change password regularly
- Enable 2FA for enhanced security

---

## 📞 Support

For issues or feature requests:

1. Check ADMIN_README.md for detailed documentation
2. Review service implementations in `src/app/admin/services/`
3. Check component templates for usage examples

---

## Next Steps

1. ✅ Dashboard: Review business metrics
2. ✅ Products: Add your products
3. ✅ Customers: Monitor customer activities
4. ✅ Orders: Track and manage orders
5. ✅ Reports: Generate business insights
6. ✅ Settings: Configure your store

**Happy selling! 🎉**
