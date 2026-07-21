const ORDER_STATUSES = ['Pending', 'Payment Verified', 'Roasting', 'Packaging', 'Shipping', 'Delivered', 'Cancelled'];

const ORDER_STATUS_TRANSITIONS = {
  'Pending': ['Payment Verified', 'Cancelled'],
  'Payment Verified': ['Roasting', 'Cancelled'],
  'Roasting': ['Packaging', 'Cancelled'],
  'Packaging': ['Shipping', 'Cancelled'],
  'Shipping': ['Delivered'],
  'Delivered': [],
  'Cancelled': [],
};

const PAYMENT_STATUSES = ['Pending', 'Approved', 'Rejected'];

const PAYMENT_VALID_TRANSITIONS = {
  'Pending': ['Approved', 'Rejected'],
  'Approved': [],
  'Rejected': ['Pending'],
};

const PRODUCT_SORT_FIELDS = ['created_at', 'price', 'name_en', 'stock_quantity'];
const SORT_ORDERS = ['ASC', 'DESC'];

const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 20,
  maxLimit: 100,
};

const ALLOWED_PRODUCT_FIELDS = [
  'name_en', 'name_am', 'name_om',
  'description_en', 'description_am', 'description_om',
  'price', 'stock_quantity', 'roast_level', 'origin_region',
  'altitude', 'process_method', 'image_url', 'category_id', 'is_active',
];

const ROAST_LEVELS = ['Light', 'Medium', 'Dark'];

module.exports = {
  ORDER_STATUSES,
  ORDER_STATUS_TRANSITIONS,
  PAYMENT_STATUSES,
  PAYMENT_VALID_TRANSITIONS,
  PRODUCT_SORT_FIELDS,
  SORT_ORDERS,
  PAGINATION_DEFAULTS,
  ALLOWED_PRODUCT_FIELDS,
  ROAST_LEVELS,
};
