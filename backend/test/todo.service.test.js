// 用 jest.mock 把真 repo 換成假的
jest.mock('../src/repositories/todo.repo', () => ({
    listByUser: jest.fn().mockResolvedValue([{ title: 'Mock' }]),
  }));
  
  const todoService = require('../src/services/todo.service');
  const todoRepo    = require('../src/repositories/todo.repo');
  
  describe('todoService.listTodos', () => {
    it('returns data from repository', async () => {
      const result = await todoService.listTodos('uid', {});
      expect(todoRepo.listByUser).toHaveBeenCalledWith('uid', {});
      expect(result).toEqual([{ title: 'Mock' }]);
    });
  });
  