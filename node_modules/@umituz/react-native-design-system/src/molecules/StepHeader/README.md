# StepHeader

A header component for step-by-step workflows (onboarding, registration, wizard) with step indicator, title, and subtitle.

## Import & Usage

```typescript
import { StepHeader } from 'react-native-design-system/src/molecules/StepHeader';
```

**Location:** `src/molecules/StepHeader/StepHeader.tsx`

## Basic Usage

```tsx
<StepHeader
  title="Welcome"
  subtitle="A few steps to create your account"
  config={{
    showStepIndicator: true,
    currentStep: 1,
    totalSteps: 4,
  }}
/>
```

## Strategy

**Purpose**: Provide clear visual hierarchy and progress indication for multi-step workflows.

**When to Use**:
- Onboarding flows (3-5 steps)
- Registration forms (multi-step)
- Checkout wizards
- Setup assistants
- Questionnaires/surveys
- Profile completion flows

**When NOT to Use**:
- For single-step forms (use simple headers)
- For long workflows (>7 steps, break into sections)
- For non-sequential tasks
- For simple pages (use PageHeader instead)

## Rules

### Required

1. **MUST** provide a `title` prop
2. **SHOULD** provide `subtitle` for context
3. **MUST** keep title concise (1-2 lines max)
4. **ALWAYS** show step indicator for multi-step workflows
5. **SHOULD** use appropriate alignment (left for forms, center for onboarding)
6. **MUST** have currentStep and totalSteps when showing indicator
7. **NEVER** use too many steps (>7 is too many)

### Step Indicator

1. **Show when**: 3+ steps in workflow
2. **Position**: Above title, centered or aligned
3. **Format**: Dot system (filled for completed, outlined for current)
4. **Visibility**: Always visible, don't hide on last step

### Content Guidelines

1. **Title**: Clear, action-oriented (e.g., "Create Account" not "Step 1")
2. **Subtitle**: Additional context, max 1 line
3. **Number of steps**: Ideal 3-5, max 7
4. **Alignment**: Left for forms, center for onboarding

### Spacing & Layout

1. **Margin bottom**: 32px default
2. **Padding horizontal**: 24px default
3. **Font size**: Title 28px, subtitle 16px default
4. **Responsive**: Adjust sizing for different screens

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No title
<StepHeader
  // Missing title
  subtitle="This has no title"
/>

// ❌ Too many steps
<StepHeader
  title="Step 1"
  config={{
    showStepIndicator: true,
    currentStep: 1,
    totalSteps: 15, // ❌ Too many steps
  }}
/>

// ❌ Title too long
<StepHeader
  title="Please enter your personal profile information including your name email address phone number and physical address" // ❌ Too long
  subtitle="Required information"
/>

// ❌ Step indicator without totalSteps
<StepHeader
  title="Step 1"
  config={{
    showStepIndicator: true,
    currentStep: 1,
    // Missing totalSteps
  }}
/>

// ❌ Wrong alignment for RTL
<StepHeader
  title="مرحبا" // Arabic text
  config={{
    titleAlignment: 'left', // ❌ Should be right for RTL
  }}
/>

// ❌ Generic titles
<StepHeader
  title="Step 1" // ❌ Not descriptive
  config={{
    showStepIndicator: true,
    currentStep: 1,
    totalSteps: 3,
  }}
/>
```

## Best Practices

### Onboarding Flow

✅ **DO**:
```tsx
<StepHeader
  title="Welcome 👋"
  subtitle="Let's get you set up"
  config={{
    showStepIndicator: true,
    currentStep: 1,
    totalSteps: 4,
    titleAlignment: 'center',
  }}
/>
```

❌ **DON'T**:
```tsx
// ❌ Generic step title
<StepHeader
  title="Step 1"
  config={{
    showStepIndicator: true,
    currentStep: 1,
    totalSteps: 4,
  }}
/>
```

### Registration Form

✅ **DO**:
```tsx
<StepHeader
  title="Create Account"
  subtitle="Start with your email and password"
  config={{
    showStepIndicator: true,
    currentStep: 1,
    totalSteps: 3,
    titleAlignment: 'left',
  }}
/>
```

### Number of Steps

✅ **DO**:
```tsx
// ✅ Good: 3-5 steps
totalSteps: 4
```

❌ **DON'T**:
```tsx
// ❌ Bad: Too many steps
totalSteps: 10

// ❌ Bad: Too few for indicator
totalSteps: 2
```

### Title Length

✅ **DO**:
```tsx
// ✅ Good: Concise and clear
title="Create Profile"
title="Enter Your Details"
title="Almost Done!"
```

❌ **DON'T**:
```tsx
// ❌ Bad: Too long
title="Please Enter Your Personal Profile Information Here"
```

## AI Coding Guidelines

### For AI Agents

When generating StepHeader components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { StepHeader } from 'react-native-design-system/src/molecules/StepHeader';
   ```

2. **Always provide a title**:
   ```tsx
   // ✅ Good
   <StepHeader
     title="创建账户"
     subtitle="输入您的电子邮件和密码"
     config={{
       showStepIndicator: true,
       currentStep: step,
       totalSteps: totalSteps,
     }}
   />

   // ❌ Bad - no title
   <StepHeader
     subtitle="No title provided"
   />
   ```

3. **Always use descriptive titles, not step numbers**:
   ```tsx
   // ✅ Good - descriptive
   title="Create Account"
   title="Enter Profile Information"
   title="Review and Confirm"

   // ❌ Bad - generic
   title="Step 1"
   title="Step 2"
   title="Step 3"
   ```

4. **Always show step indicator for multi-step workflows**:
   ```tsx
   // ✅ Good - with indicator
   <StepHeader
     title="Profile Information"
     config={{
       showStepIndicator: true,
       currentStep: 2,
       totalSteps: 4,
     }}
   />

   // ❌ Bad - no indicator in multi-step flow
   <StepHeader
     title="Profile Information"
     // Missing step indicator
   />
   ```

5. **Always choose appropriate alignment**:
   ```tsx
   // ✅ Good - left for forms
   config={{
     titleAlignment: 'left',
   }}

   // ✅ Good - center for onboarding
   config={{
     titleAlignment: 'center',
   }}

   // ✅ Good - right for RTL languages
   config={{
     titleAlignment: 'right',
   }}
   ```

### Common Patterns

#### Onboarding Step Header
```tsx
<StepHeader
  title="Welcome 👋"
  subtitle="Let's get you set up in a few steps"
  config={{
    showStepIndicator: true,
    currentStep: 1,
    totalSteps: 4,
    titleAlignment: 'center',
    spacing: {
      marginBottom: 48,
    },
  }}
/>
```

#### Registration Form Step Header
```tsx
<StepHeader
  title="Personal Information"
  subtitle="Tell us a bit about yourself"
  config={{
    showStepIndicator: true,
    currentStep: 2,
    totalSteps: 3,
    titleAlignment: 'left',
  }}
/>
```

#### Checkout Step Header
```tsx
<StepHeader
  title="Payment Method"
  subtitle="Choose how you want to pay"
  config={{
    showStepIndicator: true,
    currentStep: 3,
    totalSteps: 4,
  }}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | **Yes** | - | Main title |
| `subtitle` | `string` | No | - | Subtitle text |
| `config` | `StepHeaderConfig` | No | `{}` | Configuration options |
| `style` | `ViewStyle` | No | - | Custom container style |

### StepHeaderConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showStepIndicator` | `boolean` | `false` | Show step indicator |
| `currentStep` | `number` | - | Current step (1-based) |
| `totalSteps` | `number` | - | Total number of steps |
| `titleAlignment` | `'left' \| 'center' \| 'right'` | `'left'` | Title alignment |
| `titleFontSize` | `number` | `28` | Title font size |
| `subtitleFontSize` | `number` | `16` | Subtitle font size |
| `spacing` | `object` | - | Spacing settings |
| `spacing.marginBottom` | `number` | `32` | Bottom margin |
| `spacing.paddingHorizontal` | `number` | `24` | Horizontal padding |

## Accessibility

- ✅ Screen reader announces title and subtitle
- ✅ Semantic heading structure (h1/h2)
- ✅ Step progress announced
- ✅ Focus management for keyboard navigation
- ✅ Sufficient color contrast

## Performance Tips

1. **Memoization**: Memo step header to prevent re-renders
2. **Minimal props**: Only update when step changes
3. **Avoid inline objects**: Define config outside render
4. **Optimize text**: Keep titles short and concise

## Related Components

- [`StepProgress`](../StepProgress/README.md) - Step progress bar
- [`BaseModal`](../BaseModal/README.md) - Modal for step flows
- [`FormField`](../FormField/README.md) - Form field component
- [`AtomicText`](../../atoms/AtomicText/README.md) - Text component

## License

MIT
