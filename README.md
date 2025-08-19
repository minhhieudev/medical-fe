# Hệ thống quản lý phòng khám siêu âm

Ứng dụng web quản lý phòng khám siêu âm được xây dựng bằng React, TypeScript, Redux Toolkit và Tailwind CSS.

## Tính năng chính

- **Hệ thống đăng nhập** với 3 quyền truy cập:
  - **Bác sĩ**: Quản lý lịch khám, xem thông tin bệnh nhân
  - **Nhân viên**: Quản lý lịch hẹn, tiếp đón bệnh nhân
  - **Kế toán**: Quản lý tài chính, hóa đơn

- **Dashboard riêng biệt** cho từng vai trò
- **Giao diện responsive** với Tailwind CSS
- **State management** với Redux Toolkit
- **Form validation** với React Hook Form + Zod
- **UI components** tái sử dụng

## Công nghệ sử dụng

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + shadcn/ui
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React

## Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy ứng dụng development
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:5173

### Build production
```bash
npm run build
```

## Tài khoản demo

Để test ứng dụng, bạn có thể sử dụng các tài khoản demo sau:

| Vai trò | Email | Mật khẩu |
|---------|-------|----------|
| Bác sĩ | doctor@clinic.com | password123 |
| Nhân viên | staff@clinic.com | password123 |
| Kế toán | accountant@clinic.com | password123 |

## Cấu trúc thư mục

```
src/
├── components/          # UI components
│   └── ui/             # Base UI components
├── pages/              # Page components
├── layouts/            # Layout components
├── store/              # Redux store và slices
├── hooks/              # Custom hooks
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── main.tsx           # Entry point
```

## Tính năng sắp tới

- [ ] Quản lý bệnh nhân
- [ ] Lịch hẹn chi tiết
- [ ] Báo cáo thống kê
- [ ] Quản lý hóa đơn
- [ ] Tích hợp với backend API
- [ ] Hệ thống thông báo
- [ ] Export/Import dữ liệu

## Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.
