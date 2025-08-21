import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PATIENT_MESSAGES, GENERAL_MESSAGES } from '../../constants/messages';
import ConfirmModal from '../../components/ConfirmModal';
import Popconfirm from '../../components/Popconfirm';

// Hàm lấy ngày hiện tại theo định dạng YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Hàm lấy giờ hiện tại theo định dạng HH:MM
const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

// Mock data cho bệnh nhân
const mockPatients = [
  {
    id: 1,
    hoVaTen: 'Nguyễn Thị',
    ten: 'Lan',
    tuoi: 25,
    gt: 'Nữ',
    xa: 'Phường 1',
    soTien: 150000,
    dienThoai: '0901234567',
    daSA: false,
    bacSi: 'BS Nguyễn Văn A',
    daChuyen: false,
    ngayKham: getCurrentDate(),
    gioKham: getCurrentTime(),
    ghiChu: ''
  },
  {
    id: 2,
    stt: 2,
    hoVaTen: 'Trần Văn',
    ten: 'Nam',
    tuoi: 30,
    gt: 'Nam',
    xa: 'Phường 2',
    soTien: 200000,
    dienThoai: '0907654321',
    daSA: true,
    bacSi: 'BS Trần Minh Hoàng',
    daChuyen: false,
    ngayKham: getCurrentDate(),
    gioKham: getCurrentTime(),
    ghiChu: ''
  },
  {
    id: 3,
    stt: 3,
    hoVaTen: 'Lê Thị',
    ten: 'Hoa',
    tuoi: 35,
    gt: 'Nữ',
    xa: 'Xã Tân Phú',
    soTien: 180000,
    dienThoai: '0912345678',
    daSA: false,
    bacSi: 'BS Lê Thị C',
    daChuyen: false,
    ngayKham: getCurrentDate(),
    gioKham: getCurrentTime(),
    ghiChu: ''
  },
  {
    id: 4,
    stt: 4,
    hoVaTen: 'Phạm Văn',
    ten: 'Đức',
    tuoi: 45,
    gt: 'Nam',
    xa: 'Phường 3',
    soTien: 250000,
    dienThoai: '0923456789',
    daSA: true,
    bacSi: 'BS Nguyễn Văn A',
    daChuyen: false,
    ngayKham: getCurrentDate(),
    gioKham: getCurrentTime(),
    ghiChu: ''
  },
  {
    id: 5,
    stt: 5,
    hoVaTen: 'Hoàng Thị',
    ten: 'Mai',
    tuoi: 28,
    gt: 'Nữ',
    xa: 'Xã Hòa Bình',
    soTien: 120000,
    dienThoai: '0934567890',
    daSA: false,
    bacSi: 'BS Trần Minh Hoàng',
    daChuyen: false,
    ngayKham: getCurrentDate(),
    gioKham: getCurrentTime(),
    ghiChu: ''
  },
  {
    id: 6,
    stt: 6,
    hoVaTen: 'Vũ Văn',
    ten: 'Hùng',
    tuoi: 52,
    gt: 'Nam',
    xa: 'Phường 4',
    soTien: 300000,
    dienThoai: '0945678901',
    daSA: true,
    bacSi: 'BS Lê Thị C',
    daChuyen: false,
    ngayKham: getCurrentDate(),
    gioKham: getCurrentTime(),
    ghiChu: ''
  },
  {
    id: 7,
    stt: 7,
    hoVaTen: 'Đặng Thị',
    ten: 'Linh',
    tuoi: 22,
    gt: 'Nữ',
    xa: 'Xã Thanh Hà',
    soTien: 100000,
    dienThoai: '0956789012',
    daSA: false,
    bacSi: 'BS Nguyễn Văn A',
    daChuyen: false,
    ngayKham: getCurrentDate(),
    gioKham: getCurrentTime(),
    ghiChu: ''
  },
  {
    id: 8,
    stt: 8,
    hoVaTen: 'Bùi Văn',
    ten: 'Thành',
    tuoi: 38,
    gt: 'Nam',
    xa: 'Phường 5',
    soTien: 220000,
    dienThoai: '0967890123',
    daSA: true,
    bacSi: 'BS Trần Minh Hoàng',
    daChuyen: false,
    ngayKham: getCurrentDate(),
    gioKham: getCurrentTime(),
    ghiChu: ''
  },
  {
    id: 9,
    stt: 9,
    hoVaTen: 'Ngô Thị',
    ten: 'Hương',
    tuoi: 41,
    gt: 'Nữ',
    xa: 'Xã Phú Lộc',
    soTien: 190000,
    dienThoai: '0978901234',
    daSA: false,
    bacSi: 'BS Lê Thị C',
    daChuyen: false,
    ngayKham: getCurrentDate(),
    gioKham: getCurrentTime(),
    ghiChu: ''
  },
  {
    id: 10,
    stt: 10,
    hoVaTen: 'Đinh Văn',
    ten: 'Long',
    tuoi: 33,
    gt: 'Nam',
    xa: 'Phường 6',
    soTien: 160000,
    dienThoai: '0989012345',
    daSA: false,
    bacSi: 'BS Nguyễn Văn A',
    daChuyen: false,
    ngayKham: getCurrentDate(),
    gioKham: getCurrentTime(),
    ghiChu: ''
  }
];

const StaffDashboard = () => {
  const [patients, setPatients] = useState(mockPatients.map(p => ({ ...p })));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [doctors, setDoctors] = useState(['BS Nguyễn Văn A', 'BS Trần Minh Hoàng', 'BS Lê Thị C']);
  const [editingPatient, setEditingPatient] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'danger'
  });
  const [newPatient, setNewPatient] = useState({
    hoVaTen: '',
    ten: '',
    tuoi: '',
    gt: 'Nữ',
    xa: '',
    soTien: '',
    dienThoai: '',
    daSA: false,
    bacSi: '',
    ngayKham: getCurrentDate(),
    gioKham: getCurrentTime(),
    ghiChu: '',
    daChuyen: false
  });

  // Filter patients based on search criteria
  const filteredPatients = patients.filter(patient => {
    if (searchTerm === '') return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      patient.hoVaTen.toLowerCase().includes(searchLower) ||
      patient.ten.toLowerCase().includes(searchLower) ||
      patient.dienThoai.includes(searchTerm) ||
      patient.xa.toLowerCase().includes(searchLower) ||
      patient.bacSi.toLowerCase().includes(searchLower)
    );
  });

  // Thêm bệnh nhân mới (luôn thêm mới) - KHÔNG reset form
  const handleAddPatient = () => {
    const patient = {
      id: Date.now(),
      stt: patients.length + 1,
      ...newPatient,
      soTien: parseInt(newPatient.soTien) || 0,
      tuoi: parseInt(newPatient.tuoi) || 0,
      daChuyen: newPatient.daChuyen,
      daSA: newPatient.daSA
    };

    setPatients([...patients, patient]);
    // Không reset form - giữ dữ liệu để tiếp tục nhập
    toast.success(PATIENT_MESSAGES.CREATE_SUCCESS);
  };

  // Load thông tin bệnh nhân vào form để sửa
  const handleEditPatient = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setEditingPatient(patient.id);
      setNewPatient({
        hoVaTen: patient.hoVaTen,
        ten: patient.ten,
        tuoi: patient.tuoi.toString(),
        gt: patient.gt,
        xa: patient.xa,
        soTien: patient.soTien.toString(),
        dienThoai: patient.dienThoai,
        daSA: patient.daSA,
        bacSi: patient.bacSi,
        ngayKham: patient.ngayKham || getCurrentDate(),
        gioKham: patient.gioKham || getCurrentTime(),
        ghiChu: patient.ghiChu || '',
        daChuyen: patient.daChuyen
      });
    }
  };

  // Lưu cập nhật bệnh nhân
  const handleUpdatePatient = () => {
    if (!editingPatient) return;

    setPatients(prev => prev.map(p =>
      p.id === editingPatient
        ? {
          ...p,
          ...newPatient,
          soTien: parseInt(newPatient.soTien) || 0,
          tuoi: parseInt(newPatient.tuoi) || 0,
          daChuyen: newPatient.daChuyen,
          daSA: newPatient.daSA
        }
        : p
    ));

    setEditingPatient(null);
    resetForm();
    toast.success(PATIENT_MESSAGES.UPDATE_SUCCESS);
  };



  const handleInputChange = (field, value) => {
    setNewPatient(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Reset form
  const resetForm = () => {
    setEditingPatient(null);
    setNewPatient({
      hoVaTen: '',
      ten: '',
      tuoi: '',
      gt: 'Nữ',
      xa: '',
      soTien: '',
      dienThoai: '',
      daSA: false,
      bacSi: '',
      ngayKham: getCurrentDate(),
      gioKham: getCurrentTime(),
      ghiChu: '',
      daChuyen: false
    });
  };

  // Chọn/bỏ chọn bệnh nhân
  const toggleSelectPatient = (patientId) => {
    setSelectedPatients(prev =>
      prev.includes(patientId)
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  // Chọn/bỏ chọn tất cả
  const toggleSelectAll = () => {
    setSelectedPatients(prev =>
      prev.length === filteredPatients.length
        ? []
        : filteredPatients.map(p => p.id)
    );
  };

  // Chuyển khoa cho bệnh nhân đã chọn
  const handleChuyenKhoa = () => {
    if (selectedPatients.length === 0) {
      toast.error('Vui lòng chọn bệnh nhân cần chuyển khoa');
      return;
    }
    setPatients(prev => prev.map(p =>
      selectedPatients.includes(p.id)
        ? { ...p, daChuyen: !p.daChuyen }
        : p
    ));
    setSelectedPatients([]);
    toast.success(`Cập nhật ${selectedPatients.length} bệnh nhân`);
  };

  // Đánh dấu đã siêu âm
  const handleDaSieuAm = () => {
    if (selectedPatients.length === 0) {
      toast.error('Vui lòng chọn bệnh nhân cần cập nhật siêu âm');
      return;
    }
    setPatients(prev => prev.map(p =>
      selectedPatients.includes(p.id)
        ? { ...p, daSA: !p.daSA }
        : p
    ));
    setSelectedPatients([]);
    toast.success(`Đã cập nhật trạng thái siêu âm cho ${selectedPatients.length} bệnh nhân`);
  };

  // Xóa nhiều bệnh nhân
  const handleDeleteSelected = () => {
    if (selectedPatients.length === 0) {
      toast.error('Vui lòng chọn bệnh nhân cần xóa');
      return;
    }
    setConfirmModal({
      isOpen: true,
      title: 'Xóa nhiều bệnh nhân',
      message: `Bạn có chắc chắn muốn xóa ${selectedPatients.length} bệnh nhân đã chọn?`,
      onConfirm: () => {
        setPatients(prev => prev.filter(p => !selectedPatients.includes(p.id)));
        setSelectedPatients([]);
        toast.success(`Đã xóa ${selectedPatients.length} bệnh nhân`);
      },
      type: 'danger'
    });
  };

  // Cuối ngày - xóa hết danh sách
  const handleCuoiNgay = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Cuối ngày',
      message: 'Bạn có chắc chắn muốn xóa hết danh sách bệnh nhân? Hành động này không thể hoàn tác.',
      onConfirm: () => {
        setPatients([]);
        setSelectedPatients([]);
        toast.success('Đã xóa hết danh sách bệnh nhân');
      },
      type: 'warning'
    });
  };

  // Thêm bác sĩ mới
  const addNewDoctor = () => {
    const doctorName = prompt('Nhập tên bác sĩ mới:');
    if (doctorName && doctorName.trim()) {
      const newDoctor = `BS ${doctorName.trim()}`;
      if (!doctors.includes(newDoctor)) {
        setDoctors(prev => [...prev, newDoctor]);
        setNewPatient(prev => ({ ...prev, bacSi: newDoctor }));
        toast.success('Đã thêm bác sĩ mới');
      } else {
        toast.error('Bác sĩ này đã tồn tại');
      }
    }
  };

  return (
    <div className="px-6 py-0 space-y-3">
      {/* Toolbar */}
      <div className="bg-white border border-gray-300 rounded shadow-sm p-2 mb-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <div className="flex items-center space-x-3">
            <div className="text-xs text-gray-600 whitespace-nowrap font-bold">
              Tổng: {filteredPatients.length} | Chọn: {selectedPatients.length}
            </div>
            <input
              type="text"
              placeholder="🔍 Tìm kiếm..."
              className="w-40 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-1 flex-wrap">
            <button
              onClick={resetForm}
              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
            >
              ➕ Mới
            </button>
            <button
              onClick={handleDeleteSelected}
              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors disabled:opacity-50"
              disabled={selectedPatients.length === 0}
            >
              🗑️ Xóa ({selectedPatients.length})
            </button>
            <button
              onClick={handleChuyenKhoa}
              className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              disabled={selectedPatients.length === 0}
            >
              🔄 Chuyển ({selectedPatients.length})
            </button>
            <button
              onClick={handleDaSieuAm}
              className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 transition-colors disabled:opacity-50"
              disabled={selectedPatients.length === 0}
            >
              ✅ SA ({selectedPatients.length})
            </button>
            <button
              onClick={handleCuoiNgay}
              className="px-2 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
            >
              🌅 Cuối ngày
            </button>
          </div>
        </div>
      </div>

      {/* Form nhập thông tin bệnh nhân */}
      <div className="bg-white border border-gray-300 rounded shadow-sm p-3 mb-2">
        {/* Form Grid - Tối ưu không gian */}
        <div className="grid grid-cols-12 gap-2 items-center">
          {/* STT */}
          <div className="col-span-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">STT</label>
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 text-xs bg-gray-50 rounded"
              value={editingPatient ? patients.find(p => p.id === editingPatient)?.stt : patients.length + 1}
              readOnly
            />
          </div>

          {/* Họ và tên */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Họ và tên</label>
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500"
              value={newPatient.hoVaTen}
              onChange={(e) => handleInputChange('hoVaTen', e.target.value)}
              placeholder="Họ và tên"
            />
          </div>

          {/* Tên */}
          <div className="col-span-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">Tên</label>
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500"
              value={newPatient.ten}
              onChange={(e) => handleInputChange('ten', e.target.value)}
              placeholder="Tên"
            />
          </div>

          {/* Tuổi */}
          <div className="col-span-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">Tuổi</label>
            <input
              type="number"
              className="w-full px-2 py-1 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500"
              value={newPatient.tuoi}
              onChange={(e) => handleInputChange('tuoi', e.target.value)}
              placeholder="0"
              min="0"
              max="120"
            />
          </div>

          {/* Giới tính */}
          <div className="col-span-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">GT</label>
            <select
              className="w-full px-2 py-1 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500"
              value={newPatient.gt}
              onChange={(e) => handleInputChange('gt', e.target.value)}
            >
              <option value="Nữ">Nữ</option>
              <option value="Nam">Nam</option>
            </select>
          </div>

          {/* Xã/Phường */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Xã/Phường</label>
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500"
              value={newPatient.xa}
              onChange={(e) => handleInputChange('xa', e.target.value)}
              placeholder="Xã/phường"
            />
          </div>

          {/* Số tiền */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Tiền</label>
            <input
              type="number"
              className="w-full px-2 py-1 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500"
              value={newPatient.soTien}
              onChange={(e) => handleInputChange('soTien', e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>

          {/* Điện thoại */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input
              type="tel"
              className="w-full px-2 py-1 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500"
              value={newPatient.dienThoai}
              onChange={(e) => handleInputChange('dienThoai', e.target.value)}
              placeholder="Số điện thoại"
            />
          </div>

          {/* Bác sĩ chuyên */}
          <div className="col-span-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">Bác sĩ</label>
            <div className="flex">
              <select
                className="flex-1 px-2 py-1 border border-gray-300 text-xs rounded-l focus:ring-blue-500 focus:border-blue-500"
                value={newPatient.bacSi}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.startsWith('DELETE:')) {
                    const doctorToDelete = value.replace('DELETE:', '');
                    setDoctors(prev => prev.filter(d => d !== doctorToDelete));
                    if (newPatient.bacSi === doctorToDelete) {
                      handleInputChange('bacSi', '');
                    }
                    toast.success('Đã xóa bác sĩ');
                  } else {
                    handleInputChange('bacSi', value);
                  }
                }}
              >
                <option value="">Chọn bác sĩ</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor}>
                    {doctor}
                  </option>
                ))}
                {doctors.length > 0 && <option disabled>──────</option>}
                {doctors.map((doctor, index) => (
                  <option key={`delete-${index}`} value={`DELETE:${doctor}`} className="text-red-600">
                    ❌ {doctor}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addNewDoctor}
                className="px-2 py-1 bg-green-500 text-white text-xs rounded-r hover:bg-green-600 transition-colors"
                title="Thêm bác sĩ mới"
              >
                ➕
              </button>
            </div>
          </div>

          {/* Ngày khám */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Ngày khám</label>
            <input
              type="date"
              className="w-full px-2 py-1 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500"
              value={newPatient.ngayKham}
              onChange={(e) => handleInputChange('ngayKham', e.target.value)}
            />
          </div>

          {/* Giờ khám */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Giờ khám</label>
            <input
              type="time"
              className="w-full px-2 py-1 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500"
              value={newPatient.gioKham}
              onChange={(e) => handleInputChange('gioKham', e.target.value)}
            />
          </div>

          {/* Ghi chú */}
          <div className="col-span-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">Ghi chú</label>
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 text-xs rounded focus:ring-blue-500 focus:border-blue-500"
              value={newPatient.ghiChu}
              onChange={(e) => handleInputChange('ghiChu', e.target.value)}
              placeholder="Ghi chú"
            />
          </div>

          {/* Nút action */}
          <div className="col-span-2 flex justify-end space-x-2 mt-4">
            {editingPatient ? (
              <>
                <button
                  onClick={handleUpdatePatient}
                  className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
                >
                  💾 Lưu
                </button>
                <button
                  onClick={resetForm}
                  className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
                >
                  🔄 Hủy
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAddPatient}
                  className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                >
                  ➕ Thêm
                </button>
                <button
                  onClick={resetForm}
                  className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
                >
                  🔄 Reset
                </button>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Bảng dữ liệu */}
      <div className="bg-white border border-gray-300 overflow-hidden shadow-lg rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 text-xs">
              <th className="border border-gray-300 px-2 py-2 text-center font-medium">
                <input
                  type="checkbox"
                  checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded"
                />
              </th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">STT</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">HỌ VÀ TÊN</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">TÊN</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">TUỔI</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">GT</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">XÃ</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">SỐ TIỀN</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">ĐIỆN THOẠI</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">ĐÃ SA</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">BÁC SĨ</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">ĐÃ CHUYỂN</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">Ghi chú</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium">THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="13" className="border border-gray-300 px-4 py-8 text-center text-gray-500 text-sm">
                  {searchTerm ? PATIENT_MESSAGES.SEARCH_NO_RESULTS : GENERAL_MESSAGES.NO_DATA}
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient, index) => (
                <tr key={patient.id} className={`text-xs transition-colors hover:bg-blue-100 ${selectedPatients.includes(patient.id) ? 'bg-blue-50' :
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedPatients.includes(patient.id)}
                      onChange={() => toggleSelectPatient(patient.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center font-medium">{index + 1}</td>
                  <td className="border border-gray-300 px-2 py-2 font-medium text-blue-700">{patient.hoVaTen}</td>
                  <td className="border border-gray-300 px-2 py-2">{patient.ten}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{patient.tuoi}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${patient.gt === 'Nam' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                      }`}>
                      {patient.gt}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">{patient.xa}</td>
                  <td className="border border-gray-300 px-2 py-2 text-right font-medium text-green-600">
                    {patient.soTien.toLocaleString()}đ
                  </td>
                  <td className="border border-gray-300 px-2 py-2 font-mono">{patient.dienThoai}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${patient.daSA ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                      {patient.daSA ? '✓' : '○'}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-blue-600">{patient.bacSi}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${patient.daChuyen ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                      {patient.daChuyen ? '✓' : '○'}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">{patient.ghiChu}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <div className="flex justify-center space-x-1">
                      <button
                        onClick={() => handleEditPatient(patient.id)}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        title="Sửa"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <Popconfirm
                        title={`Xóa "${patient.hoVaTen} ${patient.ten}"?`}
                        onConfirm={() => {
                          setPatients(patients.filter(p => p.id !== patient.id));
                          toast.success(PATIENT_MESSAGES.DELETE_SUCCESS);
                        }}
                        placement="top"
                      >
                        <button
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                          title="Xóa"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </Popconfirm>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
      />
    </div>
  );
};

export default StaffDashboard;
