/**
 * Atoms - Primitive UI components
 * Building blocks for molecules and organisms
 */

// Button
export {
    AtomicButton,
} from './button/AtomicButton';
export type {
    AtomicButtonProps,
    ButtonVariant,
    ButtonSize,
} from './button/types';

// Text
export { AtomicText, type AtomicTextProps } from './AtomicText';

// Card
export {
    AtomicCard,
} from './card/AtomicCard';
export type {
    AtomicCardProps,
    CardVariant as AtomicCardVariant,
    CardPadding as AtomicCardPadding,
} from './card/types';

// Input
export {
    AtomicInput,
} from './AtomicInput';
export type {
    AtomicInputProps,
    AtomicInputVariant,
    AtomicInputState,
    AtomicInputSize,
} from './input/types';

// Icon (Zustand-based icon system)
export {
    AtomicIcon,
    type AtomicIconProps,
    type IconSize,
    type IconColor,
    type IconName,
    type IconRenderProps,
    // Icon Store
    useIconStore,
    useIconRenderer,
    useIconName,
    useHasIconConfig,
    type IconRenderer,
    type IconNames,
    REQUIRED_ICON_KEYS,
    // Type utilities
    type IconSizePreset,
    ICON_SIZES,
    getIconSize,
    isIconSizePreset,
} from './icon/index';


// Avatar
export { AtomicAvatar, type AtomicAvatarProps } from './AtomicAvatar';

// Chip
export {
    AtomicChip,
} from './chip/AtomicChip';
export type {
    AtomicChipProps,
    ChipVariant,
    ChipSize,
    ChipColor,
} from './chip/types';

// Progress
export { AtomicProgress, type AtomicProgressProps } from './AtomicProgress';

// Fab
export {
    AtomicFab,
    type AtomicFabProps,
    type FabSize,
    type FabVariant,
    getFabVariants,
} from './AtomicFab';

// Picker
export {
    AtomicPicker,
    type AtomicPickerProps,
    type PickerOption,
    type PickerSize,
} from './AtomicPicker';

// DatePicker
export { AtomicDatePicker, type AtomicDatePickerProps } from './AtomicDatePicker';

// Skeleton
export {
    AtomicSkeleton,
    type AtomicSkeletonProps,
} from './skeleton/AtomicSkeleton';
export type {
    SkeletonPattern,
    SkeletonConfig,
} from './skeleton/AtomicSkeleton.types';
export { SKELETON_PATTERNS } from './skeleton/AtomicSkeleton.types';

// Badge
export {
    AtomicBadge,
    type AtomicBadgeProps,
    type BadgeVariant,
    type BadgeSize,
} from './badge/AtomicBadge';

// Spinner
export {
    AtomicSpinner,
    type AtomicSpinnerProps,
    type SpinnerSize,
    type SpinnerColor,
} from './AtomicSpinner';

// Empty State
export { EmptyState, type EmptyStateProps } from './EmptyState';

// TextArea
export { AtomicTextArea, type AtomicTextAreaProps } from './AtomicTextArea';

// Switch
export { AtomicSwitch, type AtomicSwitchProps } from './AtomicSwitch';

// Touchable
export { AtomicTouchable, type AtomicTouchableProps } from './AtomicTouchable';

// StatusBar
export { AtomicStatusBar, type AtomicStatusBarProps } from './status-bar/AtomicStatusBar';

// Keyboard Avoiding
export { AtomicKeyboardAvoidingView, type AtomicKeyboardAvoidingViewProps } from './AtomicKeyboardAvoidingView';

// GlassView
export { GlassView, type GlassViewProps } from './GlassView/GlassView';

// Image — available via sub-path: @umituz/react-native-design-system/image
// Requires expo-image peer dependency
