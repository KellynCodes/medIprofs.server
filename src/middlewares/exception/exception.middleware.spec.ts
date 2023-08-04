import { ExceptionMiddleware } from './exception.middleware';

describe('ExceptionMiddleware', () => {
  it('should be defined', () => {
    expect(new ExceptionMiddleware()).toBeDefined();
  });
});
