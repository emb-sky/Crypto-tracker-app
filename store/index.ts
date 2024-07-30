import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, Persistor } from 'redux-persist'
import priceDataReducer from './priceDataSlice'

let persistor: Persistor | null = null;

const makeStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return configureStore({
      reducer: {
        priceData: priceDataReducer,
      },
    });
  } else {
    const storage = require('redux-persist/lib/storage').default;
    const persistConfig = {
      key: 'root',
      storage,
    }

    const persistedReducer = persistReducer(persistConfig, priceDataReducer)

    const store = configureStore({
      reducer: {
        priceData: persistedReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
          },
        }),
    })

    persistor = persistStore(store)
    return store
  }
}

export const store = makeStore()
export { persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch