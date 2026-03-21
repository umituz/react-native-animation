/**
 * React Native UUID
 *
 * Cross-platform UUID generation for React Native apps
 */

export {
  generateUUID,
  generateUUID as uuidv4,
  generateUUID as generateCreationId,
  isValidUUID,
  getUUIDVersion,
} from "./infrastructure/utils/UUIDUtils";
export type { UUID } from "./types/UUID";
export { UUIDVersion, UUID_CONSTANTS } from "./types/UUID";
