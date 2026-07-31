import { EntityExistsPipe } from './entity-exists.pipe';

class MockEntity {}

describe('EntityExistsPipe', () => {
  it('should be defined', () => {
    const PipeClass = EntityExistsPipe(MockEntity);
    expect(PipeClass).toBeDefined();
  });
});
