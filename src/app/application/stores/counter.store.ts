import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

export const CounterStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    increment(): void {
      patchState(store, { count: store.count() + 1 });
    },
    decrement(): void {
      patchState(store, { count: store.count() - 1 });
    },
    reset(): void {
      patchState(store, { count: 0 });
    },
  }))
);

export type CounterStore = InstanceType<typeof CounterStore>;
