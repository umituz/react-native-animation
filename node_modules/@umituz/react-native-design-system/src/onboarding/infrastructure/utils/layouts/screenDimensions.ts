/**
 * Screen Dimensions
 * Centralized screen dimension values using design system utilities
 */

import { getScreenDimensions } from "../../../../device/detection/deviceDetection";

const dimensions = getScreenDimensions();

export const SCREEN_WIDTH = dimensions.width;
export const SCREEN_HEIGHT = dimensions.height;
