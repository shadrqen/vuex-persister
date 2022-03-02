export interface SaveState<State> {
    (key: string, state: State, storage: Storage): void
}
