# Domain Types

Storage domain için TypeScript tipleri ve interface'ler.

## Types

```tsx
import type {
  StoreConfig,
  PersistedState,
  SetState,
  GetState,
  ActionsCreator,
} from '@umituz/react-native-storage';

import type {
  StoreApi,
  UseBoundStore,
} from 'zustand';

import type {
  StateCreator,
  StoreMutatorIdentifier,
} from 'zustand/vanilla';
```

## Store Types

### StoreConfig

Store konfigürasyonu için tip.

```tsx
interface StoreConfig<TState, TActions> {
  name: string;
  initialState: TState;
  actions?: ActionsCreator<TState, TActions>;
  persist?: boolean;
  version?: number;
  partialize?: (state: TState & TActions) => Partial<TState>;
  onRehydrate?: (state: TState & TActions) => void;
  migrate?: (persistedState: unknown, version: number) => TState & TActions;
}
```

### PersistedState

Persist edilmiş state için tip.

```tsx
interface PersistedState<T> {
  version: number;
  state: T;
}
```

### SetState

State güncelleme fonksiyonu tipi.

```tsx
type SetState<T> = (
  partial: Partial<T> | ((state: T) => Partial<T>),
  replace?: boolean
) => void;
```

### GetState

State okuma fonksiyonu tipi.

```tsx
type GetState<T> = () => T;
```

### ActionsCreator

Action oluşturucu fonksiyon tipi.

```tsx
type ActionsCreator<TState, TActions> = (
  set: SetState<TState & TActions>,
  get: GetState<TState & TActions>
) => TActions;
```

## Zustand Types

### StoreApi

Zustand store API tipi.

```tsx
interface StoreApi<T> {
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => Partial<T>), replace?: boolean) => void;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
  destroy: () => void;
}
```

### UseBoundStore

React hook tipi.

```tsx
type UseBoundStore<T> = {
  (): T;
  <U>(selector: (state: T) => U, equalityFn?: (a: U, b: U) => boolean): U;
};
```

### StateCreator

State oluşturucu tipi.

```tsx
type StateCreator<T, Mis = []> = (
  set: SetState<T>,
  get: GetState<T>,
  api: StoreApi<T>,
) => T;
```

## Kullanım Örnekleri

### Basit Store Type

```tsx
import type { StoreConfig } from '@umituz/react-native-storage';

interface CounterState {
  count: number;
}

interface CounterActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

type CounterStore = CounterState & CounterActions;

const config: StoreConfig<CounterState, CounterActions> = {
  name: 'counter',
  initialState: { count: 0 },
  actions: (set) => ({
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
  }),
};
```

### Generic Store Type

```tsx
import type { StoreConfig, ActionsCreator } from '@umituz/react-native-storage';

interface ListState<T> {
  items: T[];
  loading: boolean;
}

interface ListActions<T> {
  setItems: (items: T[]) => void;
  addItem: (item: T) => void;
  removeItem: (id: string) => void;
  loadItems: () => Promise<void>;
}

function createListStore<T>(config: {
  name: string;
  fetcher: () => Promise<T[]>;
}) {
  return createStore<ListState<T>, ListActions<T>>({
    name: config.name,
    initialState: {
      items: [],
      loading: false,
    },
    actions: (set, get) => ({
      setItems: (items) => set({ items }),
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => (item as any).id !== id),
      })),
      loadItems: async () => {
        set({ loading: true });
        const items = await config.fetcher();
        set({ items, loading: false });
      },
    }),
  });
}

// Kullanım
const userStore = createListStore<User>({
  name: 'users',
  fetcher: () => fetch('/api/users').then(r => r.json()),
});
```

### Union Type State

```tsx
type Theme = 'light' | 'dark';

interface SettingsState {
  theme: Theme;
  language: 'en' | 'tr';
}

const settingsStore = createStore<SettingsState>({
  name: 'settings',
  initialState: {
    theme: 'light',
    language: 'en',
  },
});
```

### Discriminated Union

```tsx
type LoadingState = {
  status: 'loading';
};

type SuccessState<T> = {
  status: 'success';
  data: T;
};

type ErrorState = {
  status: 'error';
  error: Error;
};

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

interface DataState {
  user: AsyncState<User>;
  posts: AsyncState<Post[]>;
}

const dataStore = createStore<DataState>({
  name: 'data',
  initialState: {
    user: { status: 'loading' },
    posts: { status: 'loading' },
  },
  actions: (set) => ({
    loadUser: async () => {
      set({ user: { status: 'loading' } });

      try {
        const user = await fetchUser();
        set({ user: { status: 'success', data: user } });
      } catch (error) {
        set({ user: { status: 'error', error: error as Error } });
      }
    },
  }),
});
```

### Recursive Type

```tsx
interface TreeNode {
  id: string;
  value: any;
  children: TreeNode[];
}

interface TreeState {
  root: TreeNode | null;
}

const treeStore = createStore<TreeState>({
  name: 'tree',
  initialState: { root: null },
  actions: (set, get) => ({
    setRoot: (root: TreeNode) => set({ root }),

    findNode: (id: string): TreeNode | null => {
      const { root } = get();

      const search = (node: TreeNode | null): TreeNode | null => {
        if (!node) return null;
        if (node.id === id) return node;

        for (const child of node.children) {
          const found = search(child);
          if (found) return found;
        }

        return null;
      };

      return search(root);
    },
  }),
});
```

### Conditional Type

```tsx
type StoreType<T> = T extends true
  ? PersistedStore<T>
  : EphemeralStore<T>;

interface PersistedStore<T> {
  getState: () => T;
  setState: (partial: Partial<T>) => void;
  persist: true;
}

interface EphemeralStore<T> {
  getState: () => T;
  setState: (partial: Partial<T>) => void;
}
```

### Utility Types

```tsx
// DeepPartial - tüm nested özellikler optional
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

// ReadOnly
type ReadOnlyState<T> = {
  readonly [P in keyof T]: T[P];
};

// Optional
type OptionalState<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Required
type RequiredState<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
```

## Type Guards

```tsx
function isSuccessState<T>(state: AsyncState<T>): state is SuccessState<T> {
  return state.status === 'success';
}

function isErrorState<T>(state: AsyncState<T>): state is ErrorState {
  return state.status === 'error';
}

function isLoadingState<T>(state: AsyncState<T>): state is LoadingState {
  return state.status === 'loading';
}

// Kullanım
const { user } = dataStore.getState();

if (isSuccessState(user)) {
  console.log(user.data.name); // Type narrowing: user.data exists
} else if (isErrorState(user)) {
  console.error(user.error.message); // Type narrowing: user.error exists
}
```

## Type Inference

### Infer State from Store

```tsx
import { createStore } from '@umituz/react-native-storage';

const store = createStore({
  name: 'counter',
  initialState: { count: 0 },
  actions: (set) => ({
    increment: () => set((state) => ({ count: state.count + 1 })),
  }),
});

// State tipi otomatik çıkarılır
type CounterState = ReturnType<typeof store.getState>;
// { count: number; increment: () => void; }
```

### Extract Actions

```tsx
type Actions = Pick<CounterState, 'increment'>;
// { increment: () => void; }
```

### Extract State

```tsx
type State = Omit<CounterState, 'increment'>;
// { count: number; }
```

## Branded Types

```tsx
type UserId = string & { readonly __brand: unique symbol };
type PostId = string & { readonly __brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

function createPostId(id: string): PostId {
  return id as PostId;
}

// Yanlış kullanım engellenir
const userId: UserId = createUserId('user-123');
const postId: PostId = createPostId('post-456');

// postId = userId; // Type error!
```

## Template Literal Types

```tsx
type StorageKey = `user:${string}` | `post:${string}`;

function getStorage<T extends StorageKey>(key: T): any {
  // ...
}

const userKey: StorageKey = 'user:123'; // OK
const postKey: StorageKey = 'post:456'; // OK
const invalidKey: StorageKey = 'data'; // Type error!
```

## Generic Constraints

```tsx
interface Entity {
  id: string;
}

interface EntityState<T extends Entity> {
  items: T[];
  selectedId: string | null;
}

function createStoreWithEntity<T extends Entity>(config: {
  name: string;
  initialState: EntityState<T>;
}) {
  return createStore<EntityState<T>>({
    name: config.name,
    initialState: config.initialState,
    actions: (set) => ({
      setSelected: (id: string) => set({ selectedId: id }),
      clearSelected: () => set({ selectedId: null }),
    }),
  });
}

// Kullanım
interface User extends Entity {
  name: string;
}

interface Product extends Entity {
  price: number;
}

const userStore = createStoreWithEntity<User>({
  name: 'users',
  initialState: { items: [], selectedId: null },
});

const productStore = createStoreWithEntity<Product>({
  name: 'products',
  initialState: { items: [], selectedId: null },
});
```

## Mapped Types

```tsx
type Getters<T> = {
  [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K];
};

interface Settings {
  theme: string;
  language: string;
}

type SettingsGetters = Getters<Settings>;
// {
//   getTheme: () => string;
//   getLanguage: () => string;
// }
```

## Conditional Types with Enums

```tsx
enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

type StateByStatus<S extends Status> =
  S extends Status.Loading ? { loading: true } :
  S extends Status.Success ? { data: any } :
  S extends Status.Error ? { error: Error } :
  never;
```
