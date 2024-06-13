import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const fakeProducts = [
  {
    id: 1,
    name: 'Test Product 1',
    category: 'Test Category 1',
    brand: 'Test Brand 1',
    volumeMilliliters: 100,
    weightGrams: 0,
    alcoholContent: 0.5,
    price: 10,
    stock: 10,
    user: 'Test User 1',
    userId: 1,
    description: 'Test Description 1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Test Product 2',
    category: 'Test Category 2',
    brand: 'Test Brand 2',
    volumeMilliliters: 100,
    weightGrams: 0,
    alcoholContent: 0.5,
    price: 10,
    stock: 10,
    user: 'Test User 1',
    userId: 1,
    description: 'Test Description 2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const prismaMock = {
  product: {
    create: jest.fn().mockReturnValue(fakeProducts[0]),
    findMany: jest.fn().mockResolvedValue(fakeProducts),
    findUnique: jest.fn().mockResolvedValue(fakeProducts[0]),
    update: jest.fn().mockResolvedValue(fakeProducts[0]),
    delete: jest.fn(),
  },
};

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const response = await service.create(fakeProducts[0]);

      expect(response).toBe(fakeProducts[0]);
      expect(prisma.product.create).toHaveBeenCalledTimes(1);
      expect(prisma.product.create).toHaveBeenCalledWith({
        data: fakeProducts[0],
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const response = await service.findAll();

      expect(response).toEqual(fakeProducts);
      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.product.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(fakeProducts[0]);
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { user: true },
      });
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(undefined);

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
        include: { user: true },
      });
    });
  });

  describe('updateOne', () => {
    it('should update a single product', async () => {
      const response = await service.update(1, fakeProducts[0]);

      expect(response).toEqual(fakeProducts[0]);
      expect(prisma.product.update).toHaveBeenCalledTimes(1);
      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: fakeProducts[0],
      });
    });

    it('should return NotFoundException if product not found', async () => {
      const unexistingProduct = { id: 99, ...fakeProducts[0] };

      jest.spyOn(prisma.product, 'update').mockResolvedValue(unexistingProduct);

      try {
        await service.update(99, fakeProducts[0]);
      } catch (error) {
        expect(error).toEqual(new NotFoundException('Product not found'));
      }

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 99 },
        data: unexistingProduct,
      });
    });
  });

  describe('deleteOne', () => {
    it('should delete a single product', async () => {
      const response = await service.remove(1);

      expect(response).toBeUndefined();
      expect(prisma.product.delete).toHaveBeenCalledTimes(1);
      expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return NotFoundException if product not found', async () => {
      jest.spyOn(prisma.product, 'delete').mockResolvedValue(undefined);

      try {
        await service.remove(99);
      } catch (error) {
        expect(error).toEqual(new NotFoundException('Product not found'));
      }

      expect(prisma.product.delete).toHaveBeenCalledTimes(1);
      expect(prisma.product.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});
