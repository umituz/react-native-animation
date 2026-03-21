/**
 * OnboardingAnswers Hook Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import { useOnboardingAnswers } from '../useOnboardingAnswers';
import { useOnboardingStore } from '../../storage/OnboardingStore';

// Mock the store
jest.mock('../../storage/OnboardingStore', () => ({
  useOnboardingStore: jest.fn(),
}));

const mockUseOnboardingStore = useOnboardingStore as jest.MockedFunction<typeof useOnboardingStore>;

describe('useOnboardingAnswers', () => {
  const mockGetAnswer = jest.fn();
  const mockSaveAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseOnboardingStore.mockReturnValue({
      getAnswer: mockGetAnswer,
      saveAnswer: mockSaveAnswer,
    } as any);
  });

  it('should initialize with undefined answer', () => {
    const mockSlide = {
      id: '1',
      type: 'question',
      question: {
        id: 'q1',
        type: 'single',
        text: 'Test question',
      },
    };

    const { result } = renderHook(() => useOnboardingAnswers(mockSlide));

    expect(result.current.currentAnswer).toBeUndefined();
    expect(mockGetAnswer).toHaveBeenCalledWith('q1');
  });

  it('should load saved answer for slide', () => {
    const mockSlide = {
      id: '1',
      type: 'question',
      question: {
        id: 'q1',
        type: 'single',
        text: 'Test question',
      },
    };

    mockGetAnswer.mockReturnValue('option1');

    const { result } = renderHook(() => useOnboardingAnswers(mockSlide));

    expect(result.current.currentAnswer).toBe('option1');
  });

  it('should use default value when no saved answer', () => {
    const mockSlide = {
      id: '1',
      type: 'question',
      question: {
        id: 'q1',
        type: 'single',
        text: 'Test question',
        defaultValue: 'default',
      },
    };

    mockGetAnswer.mockReturnValue(undefined);

    const { result } = renderHook(() => useOnboardingAnswers(mockSlide));

    expect(result.current.currentAnswer).toBe('default');
  });

  it('should set current answer', () => {
    const mockSlide = {
      id: '1',
      type: 'question',
      question: {
        id: 'q1',
        type: 'single',
        text: 'Test question',
      },
    };

    const { result } = renderHook(() => useOnboardingAnswers(mockSlide));

    act(() => {
      result.current.setCurrentAnswer('newAnswer');
    });

    expect(result.current.currentAnswer).toBe('newAnswer');
  });

  it('should save answer for slide', async () => {
    const mockSlide = {
      id: '1',
      type: 'question',
      question: {
        id: 'q1',
        type: 'single',
        text: 'Test question',
      },
    };

    mockSaveAnswer.mockResolvedValue(undefined);

    const { result } = renderHook(() => useOnboardingAnswers(mockSlide));

    act(() => {
      result.current.setCurrentAnswer('answer1');
    });

    await act(async () => {
      await result.current.saveCurrentAnswer(mockSlide);
    });

    expect(mockSaveAnswer).toHaveBeenCalledWith('q1', 'answer1');
  });

  it('should not save answer for non-question slide', async () => {
    const mockSlide = {
      id: '1',
      type: 'welcome',
      title: 'Welcome',
    };

    const { result } = renderHook(() => useOnboardingAnswers(mockSlide));

    await act(async () => {
      await result.current.saveCurrentAnswer(mockSlide);
    });

    expect(mockSaveAnswer).not.toHaveBeenCalled();
  });

  it('should not save undefined answer', async () => {
    const mockSlide = {
      id: '1',
      type: 'question',
      question: {
        id: 'q1',
        type: 'single',
        text: 'Test question',
      },
    };

    const { result } = renderHook(() => useOnboardingAnswers(mockSlide));

    await act(async () => {
      await result.current.saveCurrentAnswer(mockSlide);
    });

    expect(mockSaveAnswer).not.toHaveBeenCalled();
  });
});