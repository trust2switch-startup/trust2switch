import { NextRequest } from 'next/server';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { POST as loginHandler } from '@/app/api/auth/login/route';
import { GET as contentGetHandler } from '@/app/api/content/route';

const mocks = vi.hoisted(() => ({
  ensureDatabaseConnection: vi.fn(),
  userRepository: {
    findOne: vi.fn(),
  },
  contentRepository: {
    findOne: vi.fn(),
    updateById: vi.fn(),
    create: vi.fn(),
  },
  comparePassword: vi.fn(),
  generateToken: vi.fn(),
}));

vi.mock('@/lib/db/connect', () => ({ ensureDatabaseConnection: mocks.ensureDatabaseConnection }));
vi.mock('@/lib/repositories', () => ({
  userRepository: mocks.userRepository,
  contentRepository: mocks.contentRepository,
}));
vi.mock('@/lib/auth/auth', () => ({
  comparePassword: (...args: unknown[]) => mocks.comparePassword(...args),
  generateToken: (...args: unknown[]) => mocks.generateToken(...args),
  verifyToken: vi.fn(),
  extractTokenFromHeader: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  mocks.generateToken.mockReturnValue('test-token');
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('auth login handler', () => {
  it('rejects invalid payload', async () => {
    const req = {
      json: async () => ({ username: '', password: '' }),
      headers: new Headers(),
      url: 'http://localhost/api/auth/login',
    } as unknown as NextRequest;

    const res = await loginHandler(req);
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.success).toBe(false);
  });

  it('returns token for valid credentials', async () => {
    mocks.userRepository.findOne.mockResolvedValue({
      _id: 'user-id',
      username: 'admin',
      email: 'admin@test.com',
      password: 'hashed',
      role: 'admin',
    });
    mocks.comparePassword.mockResolvedValue(true);
    mocks.generateToken.mockReturnValue('signed-token');

    const req = {
      json: async () => ({ username: 'admin', password: 'strongpassword' }),
      headers: new Headers(),
      url: 'http://localhost/api/auth/login',
    } as unknown as NextRequest;

    const res = await loginHandler(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.token).toBe('signed-token');
    expect(body.user.username).toBe('admin');
  });
});

describe('content GET handler', () => {
  it('returns null payload when no content configured', async () => {
    mocks.contentRepository.findOne.mockResolvedValueOnce(null);

    const res = await contentGetHandler();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toBeNull();
  });

  it('returns content when present', async () => {
    const mockContent = {
      _id: 'content-id',
      site: { name: 'Trust2Switch', tagline: 'Learn fast', description: 'Desc', url: 'https://example.com' },
      navigation: { home: '/', courses: '/courses', about: '/about', blog: '/blog', contact: '/contact', cta: '/apply' },
      home: {},
      courses: {},
      about: {},
      contact: {},
      blog: {},
      shop: {},
    };
    mocks.contentRepository.findOne.mockResolvedValueOnce(mockContent);

    const res = await contentGetHandler();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.site.name).toBe('Trust2Switch');
  });
});
