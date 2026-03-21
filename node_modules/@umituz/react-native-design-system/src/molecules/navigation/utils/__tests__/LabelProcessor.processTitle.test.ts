import { LabelProcessor } from '../LabelProcessor';

describe('LabelProcessor - processTitle', () => {
  beforeEach(() => {
    // Clear cache before each test
    (LabelProcessor as any).labelCache.clear();
  });

  it('should return undefined when title is undefined', () => {
    const result = LabelProcessor.processTitle(undefined);
    
    expect(result).toBeUndefined();
  });

  it('should return undefined when title is null', () => {
    const result = LabelProcessor.processTitle(null as any);
    
    expect(result).toBeUndefined();
  });

  it('should return undefined when title is not a string', () => {
    const result = LabelProcessor.processTitle(123 as any);
    
    expect(result).toBeUndefined();
  });

  it('should return original title when no getLabel function provided', () => {
    const result = LabelProcessor.processTitle('Test Title');
    
    expect(result).toBe('Test Title');
  });

  it('should process title using getLabel function', () => {
    const getLabel = jest.fn((label: string) => label.toUpperCase());
    
    const result = LabelProcessor.processTitle('test title', getLabel);

    expect(result).toBe('TEST TITLE');
    expect(getLabel).toHaveBeenCalledWith('test title');
  });

  it('should handle empty string title', () => {
    const getLabel = jest.fn((label: string) => label.toUpperCase());
    
    const result = LabelProcessor.processTitle('', getLabel);

    expect(result).toBe('');
    expect(getLabel).toHaveBeenCalledWith('');
  });

  it('should handle special characters in title', () => {
    const getLabel = jest.fn((label: string) => label);
    
    const result = LabelProcessor.processTitle('Test & Title (Special)', getLabel);

    expect(result).toBe('Test & Title (Special)');
    expect(getLabel).toHaveBeenCalledWith('Test & Title (Special)');
  });
});