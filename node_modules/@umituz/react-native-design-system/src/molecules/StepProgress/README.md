# StepProgress

A simple progress indicator for multi-step workflows that visualizes current step with a horizontal progress bar.

## Import & Usage

```typescript
import { StepProgress } from 'react-native-design-system/src/molecules/StepProgress';
```

**Location:** `src/molecules/StepProgress/StepProgress.tsx`

## Basic Usage

```tsx
<StepProgress
  currentStep={2}
  totalSteps={4}
/>
```

## Strategy

**Purpose**: Provide clear visual indication of progress in multi-step workflows.

**When to Use**:
- Multi-step forms (3-7 steps)
- Onboarding flows
- Checkout wizards
- Questionnaires
- Task completion tracking
- Profile completion flows

**When NOT to Use**:
- For continuous progress (use ProgressBar instead)
- For single-step forms
- For too many steps (>7)
- For non-sequential tasks

## Rules

### Required

1. **MUST** provide `currentStep` and `totalSteps`
2. **MUST** keep totalSteps between 3 and 7
3. **ALWAYS** update currentStep dynamically
4. **SHOULD** display step count to users
5. **MUST** use 1-based indexing (currentStep starts at 1)
6. **NEVER** show progress for single-step flows
7. **ALWAYS** validate currentStep <= totalSteps

### Step Management

1. **currentStep**: 1-based index (starts at 1)
2. **totalSteps**: Ideal 3-5, max 7
3. **Update**: Increment/decrement based on navigation
4. **Validation**: Ensure currentStep never exceeds totalSteps

### Visual Guidelines

1. **Position**: Above content, clearly visible
2. **Size**: Full width of container
3. **Color**: Theme primary color
4. **Animation**: Smooth transitions between steps

### User Feedback

1. **Show step number**: "Step 2 of 4"
2. **Show percentage**: "50% complete"
3. **Update immediately**: On step change
4. **Indicate completion**: Special state when finished

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Too many steps
<StepProgress
  currentStep={5}
  totalSteps={20} // ❌ Too many
/>

// ❌ Too few steps
<StepProgress
  currentStep={1}
  totalSteps={2} // ❌ Too few for progress indicator
/>

// ❌ Hardcoded currentStep
<StepProgress
  currentStep={2} // ❌ Not dynamic
  totalSteps={4}
/>

// ❌ Wrong indexing (0-based)
<StepProgress
  currentStep={1} // ❌ Should be 2 for second step
  totalSteps={4}
/>

// ❌ currentStep exceeds totalSteps
<StepProgress
  currentStep={5} // ❌ Exceeds totalSteps
  totalSteps={4}
/>

// ❌ Negative or zero steps
<StepProgress
  currentStep={0} // ❌ Should be 1-based
  totalSteps={4}
/>

// ❌ Missing progress display
<View>
  <StepProgress currentStep={2} totalSteps={4} />
  {/* ❌ No indication of which step */}
</View>
```

## Best Practices

### Dynamic Step Management

✅ **DO**:
```tsx
const [step, setStep] = useState(1);

<View>
  <StepProgress
    currentStep={step}
    totalSteps={4}
  />
  <AtomicText>Step {step} of 4</AtomicText>
  <Button
    title="Next"
    onPress={() => setStep(Math.min(step + 1, 4))}
  />
</View>
```

❌ **DON'T**:
```tsx
// ❌ Hardcoded
<StepProgress
  currentStep={2}
  totalSteps={4}
/>
```

### Number of Steps

✅ **DO**:
```tsx
// ✅ Good: 3-5 steps
<StepProgress currentStep={2} totalSteps={4} />
```

❌ **DON'T**:
```tsx
// ❌ Bad: Too many
<StepProgress currentStep={5} totalSteps={15} />

// ❌ Bad: Too few
<StepProgress currentStep={1} totalSteps={2} />
```

### User Feedback

✅ **DO**:
```tsx
<View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <AtomicText>Question {currentStep}/{totalSteps}</AtomicText>
    <AtomicText>%{Math.round((currentStep / totalSteps) * 100)}</AtomicText>
  </View>
  <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
</View>
```

### Step Validation

✅ **DO**:
```tsx
const goToNextStep = () => {
  if (currentStep < totalSteps) {
    setCurrentStep(currentStep + 1);
  }
};

const goToPrevStep = () => {
  if (currentStep > 1) {
    setCurrentStep(currentStep - 1);
  }
};
```

## AI Coding Guidelines

### For AI Agents

When generating StepProgress components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { StepProgress } from 'react-native-design-system/src/molecules/StepProgress';
   ```

2. **Always use dynamic state management**:
   ```tsx
   // ✅ Good - dynamic state
   const [step, setStep] = useState(1);
   <StepProgress currentStep={step} totalSteps={4} />

   // ❌ Bad - hardcoded
   <StepProgress currentStep={2} totalSteps={4} />
   ```

3. **Always validate step count**:
   ```tsx
   // ✅ Good - appropriate number of steps
   <StepProgress currentStep={2} totalSteps={4} />

   // ❌ Bad - too many steps
   <StepProgress currentStep={5} totalSteps={20} />
   ```

4. **Always provide user feedback**:
   ```tsx
   // ✅ Good - show step number
   <View>
     <AtomicText>Step {step} of {totalSteps}</AtomicText>
     <StepProgress currentStep={step} totalSteps={totalSteps} />
   </View>

   // ❌ Bad - no feedback
   <StepProgress currentStep={step} totalSteps={totalSteps} />
   ```

5. **Always use 1-based indexing**:
   ```tsx
   // ✅ Good - 1-based
   const [step, setStep] = useState(1); // Starts at 1

   // ❌ Bad - 0-based
   const [step, setStep] = useState(0); // Starts at 0
   ```

### Common Patterns

#### Onboarding Progress
```tsx
const [currentStep, setCurrentStep] = useState(1);
const steps = ['Welcome', 'Profile', 'Interests', 'Finish'];

<View>
  <StepProgress
    currentStep={currentStep}
    totalSteps={steps.length}
  />
  <AtomicText type="titleMedium" style={{ textAlign: 'center', marginTop: 8 }}>
    {steps[currentStep - 1]}
  </AtomicText>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
    <Button
      title="Back"
      disabled={currentStep === 1}
      onPress={() => setCurrentStep(currentStep - 1)}
    />
    <Button
      title={currentStep === steps.length ? 'Finish' : 'Next'}
      onPress={() => setCurrentStep(Math.min(currentStep + 1, steps.length))}
    />
  </View>
</View>
```

#### Quiz Progress
```tsx
const [questionIndex, setQuestionIndex] = useState(0);
const questions = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];

<View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
    <AtomicText type="labelLarge">
      Question {questionIndex + 1}/{questions.length}
    </AtomicText>
    <AtomicText type="labelLarge" color="primary">
      %{Math.round(((questionIndex + 1) / questions.length) * 100)}
    </AtomicText>
  </View>
  <StepProgress
    currentStep={questionIndex + 1}
    totalSteps={questions.length}
  />
  <AtomicText type="headlineMedium" style={{ marginTop: 24 }}>
    {questions[questionIndex]}
  </AtomicText>
</View>
```

#### Task Completion
```tsx
const [completedTasks, setCompletedTasks] = useState(0);
const totalTasks = 10;

<View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
    <AtomicText type="titleMedium">Daily Tasks</AtomicText>
    <AtomicText type="labelLarge" color="primary">
      %{Math.round((completedTasks / totalTasks) * 100)}
    </AtomicText>
  </View>
  <StepProgress
    currentStep={completedTasks}
    totalSteps={totalTasks}
  />
  <AtomicText type="bodyMedium" color="secondary" style={{ marginTop: 8 }}>
    {completedTasks}/{totalTasks} tasks completed
  </AtomicText>
</View>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `currentStep` | `number` | **Yes** | - | Current step (1-based) |
| `totalSteps` | `number` | **Yes** | - | Total number of steps (3-7 recommended) |
| `style` | `ViewStyle` | No | - | Custom container style |

## Accessibility

- ✅ Screen reader announces progress
- ✅ Semantic progress role
- ✅ Visual contrast maintained
- ✅ Progress percentage available
- ✅ Step count announced

## Performance Tips

1. **Memoization**: Memo component to prevent re-renders
2. **Minimal props**: Only 2 required props
3. **Stable references**: Use stable state values
4. **Optimize updates**: Only update when step changes

## Related Components

- [`StepHeader`](../StepHeader/README.md) - Step header component
- [`Divider`](../Divider/README.md) - Divider component
- [`AtomicText`](../../atoms/AtomicText/README.md) - Text component

## License

MIT
