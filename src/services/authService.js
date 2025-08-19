// Mock users for demo
const mockUsers = [
  {
    id: '1',
    email: 'doctor@clinic.com',
    name: 'Dr. Nguyễn Văn A',
    role: 'doctor',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'staff@clinic.com',
    name: 'Trần Thị B',
    role: 'staff',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'accountant@clinic.com',
    name: 'Lê Văn C',
    role: 'accountant',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

class AuthService {
  async login(credentials) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user by email
    const user = mockUsers.find(u => u.email === credentials.email);

    if (!user || credentials.password !== 'password123') {
      throw new Error('Email hoặc mật khẩu không đúng');
    }

    const token = `mock-token-${user.id}-${Date.now()}`;

    return {
      user,
      token,
    };
  }

  async getCurrentUser() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    // Extract user ID from mock token
    const userId = token.split('-')[2];
    const user = mockUsers.find(u => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async logout() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    // In real app, this would invalidate the token on server
  }

  async refreshToken() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      throw new Error('No token to refresh');
    }

    const userId = currentToken.split('-')[2];
    const newToken = `mock-token-${userId}-${Date.now()}`;

    return { token: newToken };
  }
}

export const authService = new AuthService();
