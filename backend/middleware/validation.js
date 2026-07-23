const { body, param, query, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const registerRules = [
  body('name').optional().isString().trim().isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters'),
  body('full_name').optional().isString().trim().isLength({ min: 1, max: 100 }).withMessage('Full name must be 1-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number'),
  body('phone').optional().matches(/^\+?[\d\s-]{7,20}$/).withMessage('Invalid phone number format'),
  handleValidation,
];

const loginRules = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation,
];

const updateProfileRules = [
  body('full_name').isString().trim().isLength({ min: 1, max: 100 }).withMessage('Name is required (1-100 characters)'),
  body('phone').optional({ nullable: true }).matches(/^\+?[\d\s-]{7,20}$/).withMessage('Invalid phone number format'),
  handleValidation,
];

const forgotPasswordRules = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  handleValidation,
];

const resetPasswordRules = [
  body('token').notEmpty().withMessage('Token is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number'),
  handleValidation,
];

const createOrderRules = [
  body('shipping_address').optional().isString().trim().isLength({ min: 1, max: 500 }).withMessage('Shipping address is required'),
  body('delivery_address').optional().isString().trim().isLength({ min: 1, max: 500 }).withMessage('Delivery address is required'),
  body('phone_number').optional().isString().trim().isLength({ min: 1, max: 20 }).withMessage('Phone number is required'),
  body('phone').optional().isString().trim().isLength({ min: 1, max: 20 }).withMessage('Phone is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.product_id').isInt({ min: 1 }).withMessage('Valid product_id is required'),
  body('items.*.quantity').isInt({ min: 1, max: 9999 }).withMessage('Quantity must be 1-9999'),
  handleValidation,
];

const createProductRules = [
  body('name_en').isString().trim().isLength({ min: 1, max: 255 }).withMessage('English name is required'),
  body('name_am').optional({ nullable: true }).isString().trim().isLength({ max: 255 }),
  body('name_om').optional({ nullable: true }).isString().trim().isLength({ max: 255 }),
  body('price').isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  body('stock_quantity').optional().isInt({ min: 0 }).withMessage('Stock must be non-negative'),
  body('roast_level').optional().isIn(['Light', 'Medium', 'Dark']).withMessage('Roast level must be Light, Medium, or Dark'),
  body('category_id').optional({ nullable: true }).isInt({ min: 1 }).withMessage('Invalid category'),
  handleValidation,
];

const updateProductRules = [
  body('name_en').optional().isString().trim().isLength({ min: 1, max: 255 }),
  body('price').optional().isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  body('stock_quantity').optional().isInt({ min: 0 }).withMessage('Stock must be non-negative'),
  body('roast_level').optional().isIn(['Light', 'Medium', 'Dark']).withMessage('Roast level must be Light, Medium, or Dark'),
  body('category_id').optional({ nullable: true }).isInt({ min: 1 }),
  handleValidation,
];

const updateOrderStatusRules = [
  body('status').isIn(['Pending', 'Payment Verified', 'Roasting', 'Packaging', 'Shipping', 'Delivered', 'Cancelled'])
    .withMessage('Invalid order status'),
  handleValidation,
];

const adminUpdateOrderStatusRules = [
  body('orderId').isInt({ min: 1 }).withMessage('Valid orderId is required'),
  body('status').isIn(['Pending', 'Payment Verified', 'Roasting', 'Packaging', 'Shipping', 'Delivered', 'Cancelled'])
    .withMessage('Invalid order status'),
  handleValidation,
];

const uploadPaymentRules = [
  body('order_id').isInt({ min: 1 }).withMessage('Valid order_id is required'),
  body('method').isString().trim().isLength({ min: 1 }).withMessage('Payment method is required'),
  body('screenshot_url').optional({ nullable: true }).isURL().withMessage('Invalid screenshot URL'),
  body('proof_image').optional({ nullable: true }).isURL().withMessage('Invalid proof image URL'),
  handleValidation,
];

const verifyPaymentRules = [
  body('status').isIn(['Approved', 'Rejected']).withMessage('Status must be Approved or Rejected'),
  body('admin_notes').optional({ nullable: true }).isString().trim().isLength({ max: 500 }),
  handleValidation,
];

const adminVerifyPaymentRules = [
  body('paymentId').isInt({ min: 1 }).withMessage('Valid paymentId is required'),
  body('status').isIn(['Approved', 'Rejected']).withMessage('Status must be Approved or Rejected'),
  body('admin_notes').optional({ nullable: true }).isString().trim().isLength({ max: 500 }),
  handleValidation,
];

const updateUserRoleRules = [
  body('userId').isInt({ min: 1 }).withMessage('Valid userId is required'),
  body('roleId').isInt({ min: 1 }).withMessage('Valid roleId is required'),
  handleValidation,
];

const paginationRules = [
  query('page').optional().isInt({ min: 1 }).toInt().withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt().withMessage('Limit must be 1-100'),
  handleValidation,
];

const productFilterRules = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('search').optional().isString().trim().isLength({ max: 200 }),
  query('category').optional().isInt({ min: 1 }).toInt(),
  query('roast').optional().isIn(['Light', 'Medium', 'Dark']),
  query('sort').optional().isIn(['created_at', 'price', 'name_en', 'stock_quantity']),
  query('order').optional().isIn(['ASC', 'DESC']),
  handleValidation,
];

const createReviewRules = [
  body('product_id').isInt({ min: 1 }).withMessage('Valid product_id is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
  body('comment').optional({ nullable: true }).isString().trim().isLength({ max: 1000 }).withMessage('Comment must be under 1000 characters'),
  handleValidation,
];

const createCategoryRules = [
  body('name_en').isString().trim().isLength({ min: 1, max: 100 }).withMessage('English name is required'),
  body('name_am').optional({ nullable: true }).isString().trim().isLength({ max: 100 }),
  body('name_om').optional({ nullable: true }).isString().trim().isLength({ max: 100 }),
  body('description_en').optional({ nullable: true }).isString().trim().isLength({ max: 500 }),
  handleValidation,
];

const createSubscriptionRules = [
  body('plan_name').isString().trim().isLength({ min: 1, max: 50 }).withMessage('Plan name is required'),
  body('frequency_days').isInt({ min: 7, max: 90 }).withMessage('Frequency must be 7-90 days'),
  handleValidation,
];

const updateSubscriptionRules = [
  body('status').optional().isIn(['Active', 'Paused', 'Cancelled']).withMessage('Invalid status'),
  body('frequency_days').optional().isInt({ min: 7, max: 90 }).withMessage('Frequency must be 7-90 days'),
  handleValidation,
];

const idParamRules = [
  param('id').isInt({ min: 1 }).withMessage('Invalid ID parameter'),
  handleValidation,
];

const changePasswordRules = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number'),
  handleValidation,
];

const verifyOTPRules = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('code').isLength({ min: 6, max: 6 }).isNumeric().withMessage('OTP must be a 6-digit number'),
  body('purpose').isIn(['verify', 'reset']).withMessage('Purpose must be verify or reset'),
  handleValidation,
];

const resetPasswordOTPRules = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('code').isLength({ min: 6, max: 6 }).isNumeric().withMessage('OTP must be a 6-digit number'),
  body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number'),
  handleValidation,
];

const resendOTPRules = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('purpose').isIn(['verify', 'reset']).withMessage('Purpose must be verify or reset'),
  handleValidation,
];

module.exports = {
  handleValidation,
  registerRules,
  loginRules,
  updateProfileRules,
  changePasswordRules,
  forgotPasswordRules,
  resetPasswordRules,
  verifyOTPRules,
  resetPasswordOTPRules,
  resendOTPRules,
  createOrderRules,
  createProductRules,
  updateProductRules,
  updateOrderStatusRules,
  adminUpdateOrderStatusRules,
  uploadPaymentRules,
  verifyPaymentRules,
  adminVerifyPaymentRules,
  updateUserRoleRules,
  paginationRules,
  productFilterRules,
  createReviewRules,
  createCategoryRules,
  createSubscriptionRules,
  updateSubscriptionRules,
  idParamRules,
};
