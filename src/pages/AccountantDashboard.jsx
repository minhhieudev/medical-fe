import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { useSelector } from 'react-redux';

const AccountantDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Chào mừng, {user?.name}
        </h1>
        <p className="text-gray-600">Dashboard dành cho kế toán</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu hôm nay</CardTitle>
            <CardDescription>Tổng thu nhập</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">12,500,000₫</div>
            <p className="text-sm text-gray-500">+8% so với hôm qua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hóa đơn chưa thanh toán</CardTitle>
            <CardDescription>Cần thu tiền</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">5</div>
            <p className="text-sm text-gray-500">Tổng: 3,200,000₫</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doanh thu tháng này</CardTitle>
            <CardDescription>Tính đến hiện tại</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">285M₫</div>
            <p className="text-sm text-gray-500">85% mục tiêu tháng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chi phí tháng này</CardTitle>
            <CardDescription>Tổng chi phí</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">125M₫</div>
            <p className="text-sm text-gray-500">Lợi nhuận: 160M₫</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Giao dịch gần đây</CardTitle>
            <CardDescription>Các khoản thu chi mới nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '10:30', patient: 'Nguyễn Văn A', service: 'Siêu âm thai', amount: '+800,000₫', type: 'income' },
                { time: '09:45', patient: 'Trần Thị B', service: 'Siêu âm bụng', amount: '+600,000₫', type: 'income' },
                { time: '09:00', supplier: 'Công ty ABC', service: 'Mua vật tư y tế', amount: '-2,500,000₫', type: 'expense' },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{transaction.patient || transaction.supplier}</p>
                    <p className="text-sm text-gray-500">{transaction.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{transaction.time}</p>
                    <span className={`font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Báo cáo tài chính</CardTitle>
            <CardDescription>Thống kê theo dịch vụ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { service: 'Siêu âm thai', count: 28, revenue: '22,400,000₫' },
                { service: 'Siêu âm bụng', count: 15, revenue: '9,000,000₫' },
                { service: 'Siêu âm tim', count: 8, revenue: '12,000,000₫' },
                { service: 'Siêu âm tổng quát', count: 12, revenue: '7,200,000₫' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.service}</p>
                    <p className="text-sm text-gray-500">{item.count} ca</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{item.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountantDashboard;
