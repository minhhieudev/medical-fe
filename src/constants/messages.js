// Authentication messages
export const AUTH_MESSAGES = {
  LOGIN_FAILED: 'Email hoặc mật khẩu không đúng',
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
  TOKEN_NOT_FOUND: 'Không tìm thấy token xác thực',
  USER_NOT_FOUND: 'Không tìm thấy thông tin người dùng',
  GET_USER_FAILED: 'Không thể lấy thông tin người dùng',
  SESSION_EXPIRED: 'Phiên đăng nhập đã hết hạn',
  UNAUTHORIZED: 'Bạn không có quyền truy cập',
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Email là bắt buộc',
  EMAIL_INVALID: 'Email không hợp lệ',
  PASSWORD_REQUIRED: 'Mật khẩu là bắt buộc',
  PASSWORD_MIN_LENGTH: 'Mật khẩu phải có ít nhất 6 ký tự',
  NAME_REQUIRED: 'Họ tên là bắt buộc',
  PHONE_REQUIRED: 'Số điện thoại là bắt buộc',
  PHONE_INVALID: 'Số điện thoại không hợp lệ',
  DATE_REQUIRED: 'Ngày là bắt buộc',
  DATE_INVALID: 'Ngày không hợp lệ',
};

// Patient management messages
export const PATIENT_MESSAGES = {
  CREATE_SUCCESS: 'Thêm bệnh nhân thành công',
  CREATE_FAILED: 'Thêm bệnh nhân thất bại',
  UPDATE_SUCCESS: 'Cập nhật thông tin bệnh nhân thành công',
  UPDATE_FAILED: 'Cập nhật thông tin bệnh nhân thất bại',
  DELETE_SUCCESS: 'Xóa bệnh nhân thành công',
  DELETE_FAILED: 'Xóa bệnh nhân thất bại',
  DELETE_CONFIRM: 'Bạn có chắc chắn muốn xóa bệnh nhân này?',
  NOT_FOUND: 'Không tìm thấy bệnh nhân',
  SEARCH_NO_RESULTS: 'Không tìm thấy kết quả phù hợp',
};

// Appointment messages
export const APPOINTMENT_MESSAGES = {
  CREATE_SUCCESS: 'Đặt lịch hẹn thành công',
  CREATE_FAILED: 'Đặt lịch hẹn thất bại',
  UPDATE_SUCCESS: 'Cập nhật lịch hẹn thành công',
  UPDATE_FAILED: 'Cập nhật lịch hẹn thất bại',
  CANCEL_SUCCESS: 'Hủy lịch hẹn thành công',
  CANCEL_FAILED: 'Hủy lịch hẹn thất bại',
  CANCEL_CONFIRM: 'Bạn có chắc chắn muốn hủy lịch hẹn này?',
  TIME_CONFLICT: 'Thời gian này đã có lịch hẹn khác',
  PAST_DATE: 'Không thể đặt lịch hẹn trong quá khứ',
};

// General messages
export const GENERAL_MESSAGES = {
  LOADING: 'Đang tải...',
  SAVE_SUCCESS: 'Lưu thành công',
  SAVE_FAILED: 'Lưu thất bại',
  DELETE_SUCCESS: 'Xóa thành công',
  DELETE_FAILED: 'Xóa thất bại',
  NETWORK_ERROR: 'Lỗi kết nối mạng',
  SERVER_ERROR: 'Lỗi máy chủ',
  UNKNOWN_ERROR: 'Đã xảy ra lỗi không xác định',
  CONFIRM_ACTION: 'Bạn có chắc chắn muốn thực hiện hành động này?',
  NO_DATA: 'Không có dữ liệu',
  SEARCH_PLACEHOLDER: 'Tìm kiếm...',
};
