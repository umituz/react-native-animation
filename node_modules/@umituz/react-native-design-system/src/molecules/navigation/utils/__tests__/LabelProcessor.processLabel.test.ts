import { LabelProcessor } from '../LabelProcessor';

describe('LabelProcessor - processLabel', () => {
  beforeEach(() => {
    // Clear cache before each test
    (LabelProcessor as any).labelCache.clear();
  });

  it('should return original label when no getLabel function provided', () => {
    const result = LabelProcessor.processLabel({
      label: 'Test Label',
    });

    expect(result).toBe('Test Label');
  });

  it('should process label using getLabel function', () => {
    const getLabel = jest.fn((label: string) => label.toUpperCase());
    
    const result = LabelProcessor.processLabel({
      label: 'test label',
      getLabel,
    });

    expect(result).toBe('TEST LABEL');
    expect(getLabel).toHaveBeenCalledWith('test label');
  });

  it('should return original label when getLabel returns non-string', () => {
    const getLabel = jest.fn(() => 123);
    
    const result = LabelProcessor.processLabel({
      label: 'Test Label',
      getLabel,
    });

    expect(result).toBe('Test Label');
  });

  it('should return original label when getLabel throws error', () => {
    const getLabel = jest.fn(() => {
      throw new Error('Processing failed');
    });
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    const result = LabelProcessor.processLabel({
      label: 'Test Label',
      getLabel,
    });

    expect(result).toBe('Test Label');
    expect(consoleSpy).toHaveBeenCalledWith(
      '[LabelProcessor] Error processing label: Test Label',
      expect.any(Error)
    );
    
    consoleSpy.mockRestore();
  });

  it('should cache results to improve performance', () => {
    const getLabel = jest.fn((label: string) => label.toUpperCase());
    
    // First call
    const result1 = LabelProcessor.processLabel({
      label: 'Test Label',
      getLabel,
    });
    
    // Second call with same parameters
    const result2 = LabelProcessor.processLabel({
      label: 'Test Label',
      getLabel,
    });

    expect(result1).toBe('TEST LABEL');
    expect(result2).toBe('TEST LABEL');
    expect(getLabel).toHaveBeenCalledTimes(1); // Should only be called once due to caching
  });

  it('should handle cache size limit to prevent memory leaks', () => {
    const getLabel = jest.fn((label: string) => label.toUpperCase());
    
    // Fill cache beyond limit
    for (let i = 0; i < 150; i++) {
      LabelProcessor.processLabel({
        label: `label${i}`,
        getLabel,
      });
    }

    // Cache should not grow indefinitely
    const cacheSize = (LabelProcessor as any).labelCache.size;
    expect(cacheSize).toBeLessThanOrEqual(100);
  });

  it('should handle different getLabel functions separately', () => {
    const getLabel1 = jest.fn((label: string) => label.toUpperCase());
    const getLabel2 = jest.fn((label: string) => label.toLowerCase());
    
    const result1 = LabelProcessor.processLabel({
      label: 'Test Label 1',
      getLabel: getLabel1,
    });
    
    const result2 = LabelProcessor.processLabel({
      label: 'Test Label 2',
      getLabel: getLabel2,
    });

    expect(result1).toBe('TEST LABEL 1');
    expect(result2).toBe('test label 2');
    expect(getLabel1).toHaveBeenCalledTimes(1);
    expect(getLabel2).toHaveBeenCalledTimes(1);
  });
});