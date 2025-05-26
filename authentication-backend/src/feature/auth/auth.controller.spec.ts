import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { BadRequestException } from '@nestjs/common';

const mockAuthService = {
  findByEmail: jest.fn(),
  register: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: typeof mockAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService);
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    service.findByEmail.mockResolvedValue(null);
    service.register.mockResolvedValue({ email: 'test@example.com', _id: 'abc123' });
    const dto: RegisterDto = { email: 'test@example.com', password: 'motdepasse123' };
    const result = await controller.register(dto);
    expect(result).toHaveProperty('email', 'test@example.com');
    expect(service.register).toHaveBeenCalledWith(dto.email, dto.password);
  });

  it('should throw if email already exists', async () => {
    service.findByEmail.mockResolvedValue({ email: 'test@example.com' });
    const dto: RegisterDto = { email: 'test@example.com', password: 'motdepasse123' };
    await expect(controller.register(dto)).rejects.toThrow(BadRequestException);
  });
});
