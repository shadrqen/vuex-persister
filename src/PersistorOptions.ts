export interface PersistorOptions {
    key: string,
    saveState: (key: string, state: {}, storage: Storage) => void
}
