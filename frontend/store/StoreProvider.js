// "use client";
// import { store, persistor } from "./store";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

// export default function StoreProvider({ children }) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={<p>Loading..</p>} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }

"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
}
