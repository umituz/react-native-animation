/**
 * QueryClient Singleton
 * Infrastructure layer re-export from domain accessor
 */

export {
  getGlobalQueryClient,
  setGlobalQueryClient,
  hasGlobalQueryClient,
  clearGlobalQueryClient,
} from '../../domain/config/QueryClientAccessor';
