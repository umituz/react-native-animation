/**
 * Chat Onboarding Hook
 *
 * Core state management for chat-based onboarding flows
 * Generic and reusable across all apps
 */

import { useState, useCallback, useRef, useEffect, useMemo } from "react";

import type { ChatStep, ChatOption } from "../../domain/entities/ChatStep";
import type { ChatMessage } from "../../domain/entities/ChatMessage";

export interface UseChatOnboardingOptions {
  /** Chat onboarding flow configuration */
  flow: Record<string, ChatStep>;

  /** Initial step ID (default: first step in flow) */
  initialStepId?: string;

  /** Callback when onboarding completes */
  onComplete?: () => void;

  /** Callback when user skips onboarding */
  onSkip?: () => void;

  /** Delay between messages (ms) */
  messageDelay?: number;

  /** Store progress persistently */
  storageKey?: string;
}

export interface UseChatOnboardingReturn {
  /** Current chat step */
  currentStep: ChatStep | null;

  /** Current step ID */
  currentStepId: string;

  /** Array of chat messages */
  messages: ChatMessage[];

  /** Whether to show options */
  showOptions: boolean;

  /** Whether processing user input */
  isProcessing: boolean;

  /** Whether to show typing indicator */
  showTypingIndicator: boolean;

  /** Handle option selection */
  handleOptionSelect: (option: ChatOption) => void;

  /** Reset onboarding flow */
  handleReset: () => void;

  /** Navigate to specific step */
  setCurrentStepId: (stepId: string) => void;

  /** Submit name input */
  handleSubmitName: (name: string) => void;

  /** Skip current step */
  handleSkip: () => void;
}

/**
 * Hook for managing chat onboarding state
 */
export const useChatOnboarding = ({
  flow,
  initialStepId,
  onComplete,
  onSkip,
  messageDelay = 500,
}: UseChatOnboardingOptions): UseChatOnboardingReturn => {
  // Get initial step ID
  const getInitialStepId = useCallback(() => {
    if (initialStepId) return initialStepId;
    const stepIds = Object.keys(flow);
    return stepIds.length > 0 ? stepIds[0] : "";
  }, [flow, initialStepId]);

  // State
  const [currentStepId, setCurrentStepId] = useState<string>(getInitialStepId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState<boolean>(false);

  // Refs
  const messageTimersRef = useRef<NodeJS.Timeout[]>([]);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize current step
  const currentStep = useMemo(() => {
    return flow[currentStepId] || null;
  }, [flow, currentStepId]);

  // Clear all timers
  const clearTimers = useCallback(() => {
    messageTimersRef.current.forEach((timer) => {
      clearTimeout(timer);
    });
    messageTimersRef.current = [];

    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  }, []);

  // Load messages for current step
  useEffect(() => {
    if (!currentStep) return;

    clearTimers();
    setMessages([]);
    setShowOptions(false);
    setShowTypingIndicator(true);

    const timers: NodeJS.Timeout[] = [];

    // Show typing indicator first
    const hideTypingDelay = currentStep.messages.length > 0 ? 300 : 0;
    timers.push(
      setTimeout(() => {
        setShowTypingIndicator(false);
      }, hideTypingDelay)
    );

    // Add messages with staggered delays
    let accumulatedDelay = hideTypingDelay;
    currentStep.messages.forEach((msg, index) => {
      const delay = accumulatedDelay + (index > 0 ? messageDelay : 0);
      timers.push(
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              text: msg,
              isUser: false,
            },
          ]);
        }, delay)
      );
      accumulatedDelay = delay + msg.length * 10; // Dynamic delay based on message length
    });

    // Auto-advance if configured
    if (currentStep.autoNext) {
      const autoAdvanceDelay = accumulatedDelay + (currentStep.delay || 2000);
      const timer = setTimeout(() => {
        setCurrentStepId(currentStep.autoNext!);
      }, autoAdvanceDelay);
      autoAdvanceTimerRef.current = timer;
    } else {
      // Show options after messages
      const optionsDelay = accumulatedDelay + 500;
      timers.push(
        setTimeout(() => {
          if (currentStep.options && currentStep.options.length > 0) {
            setShowOptions(true);
          }
        }, optionsDelay)
      );
    }

    messageTimersRef.current = timers;

    return () => {
      clearTimers();
    };
  }, [currentStep, messageDelay, clearTimers]);

  // Handle option selection
  const handleOptionSelect = useCallback(
    (option: ChatOption) => {
      if (isProcessing) return;

      setIsProcessing(true);
      setShowOptions(false);

      // Add user message
      setMessages((prev) => [
        ...prev,
        {
          text: option.label,
          isUser: true,
        },
      ]);

      // Navigate to next step
      setTimeout(() => {
        setCurrentStepId(option.next);
        setIsProcessing(false);
      }, 600);
    },
    [isProcessing]
  );

  // Handle name submission
  const handleSubmitName = useCallback(
    (name: string) => {
      if (!currentStep || isProcessing) return;

      setIsProcessing(true);

      // Skip if empty and allowed
      if (!name.trim() && currentStep.skipIfEmpty) {
        setCurrentStepId(currentStep.next || "");
        setIsProcessing(false);
        return;
      }

      // Add user message
      setMessages((prev) => [
        ...prev,
        {
          text: name.trim(),
          isUser: true,
        },
      ]);

      // Navigate to next step
      setTimeout(() => {
        if (currentStep?.next) {
          setCurrentStepId(currentStep.next);
        }
        setIsProcessing(false);
      }, 600);
    },
    [currentStep, isProcessing]
  );

  // Handle skip
  const handleSkip = useCallback(() => {
    clearTimers();
    onSkip?.();
  }, [clearTimers, onSkip]);

  // Handle reset
  const handleReset = useCallback(() => {
    clearTimers();
    setCurrentStepId(getInitialStepId());
    setMessages([]);
    setShowOptions(false);
    setIsProcessing(false);
    setShowTypingIndicator(false);
  }, [clearTimers, getInitialStepId]);

  // Handle completion
  useEffect(() => {
    if (currentStep?.isComplete) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, currentStep.delay || 2000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [currentStep, onComplete]);

  return {
    currentStep,
    currentStepId,
    messages,
    showOptions,
    isProcessing,
    showTypingIndicator,
    handleOptionSelect,
    handleReset,
    setCurrentStepId,
    handleSubmitName,
    handleSkip,
  };
};
