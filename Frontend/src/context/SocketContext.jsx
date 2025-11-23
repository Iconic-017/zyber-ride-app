// PERFECT VERSION FOR THE USER

// import { createContext, useContext, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import { UserContext } from "./UserContext.jsx";

// export const SocketContext = createContext();

// const SocketProvider = ({ children }) => {
//   const { user } = useContext(UserContext);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     if (!user?._id) return; // wait for user to load

//     // initialize socket
//     socketRef.current = io(import.meta.env.VITE_BASE_URL, {
//       transports: ["websocket"],
//     });

//     const register = () => {
//       socketRef.current.emit("register-user", { userId: user._id, userType: "user" });
//       console.log("[socket] user registered:", user._id, "socket:", socketRef.current.id);
//     };

//     socketRef.current.on("connect", register);
//     socketRef.current.on("reconnect", register);
//     socketRef.current.on("disconnect", () => console.log("[socket] disconnected"));

//     return () => {
//       socketRef.current.off("connect", register);
//       socketRef.current.off("reconnect", register);
//       socketRef.current.disconnect();
//     };
//   }, [user]);

//   const emitTo = (event, data) => {
//     if (socketRef.current?.connected) socketRef.current.emit(event, data);
//     else console.warn("[socket] not connected");
//   };

//   return <SocketContext.Provider value={{ socket: socketRef.current, emitTo }}>{children}</SocketContext.Provider>;
// };

// export default SocketProvider;



















// // SocketContext.jsx
// import React, { createContext, useEffect, useRef, useContext } from "react";
// import { io } from "socket.io-client";
// import { CaptainDataContext } from "./CaptainContext.jsx";

// export const SocketContext = createContext();

// const SocketProvider = ({ children }) => {
//   const { captain } = useContext(CaptainDataContext);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     if (!captain?._id) return; // wait until captain is loaded

//     socketRef.current = io(import.meta.env.VITE_BASE_URL, {
//       transports: ["websocket", "polling"],
//     });

//     const register = () => {
//       socketRef.current.emit("register-user", {
//         userId: captain._id,
//         userType: "captain",
//       });
//       console.log("✅ Captain registered with socket:", captain._id);
//     };

//     socketRef.current.on("connect", register);
//     socketRef.current.on("reconnect", register);
//     socketRef.current.on("disconnect", () => console.log("❌ Socket disconnected"));

//     return () => {
//       socketRef.current.off("connect", register);
//       socketRef.current.off("reconnect", register);
//       socketRef.current.disconnect();
//     };
//   }, [captain]); // re-run when captain data loads

//   const emitTo = (event, data) => {
//     if (socketRef.current?.connected) {
//       socketRef.current.emit(event, data);
//     } else {
//       console.warn("⚠️ Socket not connected yet.");
//     }
//   };

//   return (
//     <SocketContext.Provider value={{ socket: socketRef.current, emitTo }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketProvider;




























// SocketContext.jsx
import React, { createContext, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import { CaptainDataContext } from "./CaptainContext.jsx";
import { UserContext } from "./UserContext.jsx"; // 👈 make sure you have this

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { captain } = useContext(CaptainDataContext);
  const { user } = useContext(UserContext);
  const socketRef = useRef(null);

  useEffect(() => {
    // ✅ Create socket only once
    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_BASE_URL, {
        transports: ["websocket", "polling"],
      });

      socketRef.current.on("connect", () => {
        console.log("✅ Socket connected:", socketRef.current.id);
      });

      socketRef.current.on("disconnect", (reason) => {
        console.log("❌ Socket disconnected:", reason);
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("⚠️ Socket connection error:", err.message);
      });
    }

    // ✅ Handle registration logic dynamically
    const currentEntity = captain?._id
      ? { id: captain._id, type: "captain" }
      : user?._id
      ? { id: user._id, type: "user" }
      : null;

    if (currentEntity) {
      const register = () => {
        socketRef.current.emit("register-user", {
          userId: currentEntity.id,
          userType: currentEntity.type,
        });
        console.log(`🧠 Registered ${currentEntity.type}:`, currentEntity.id);
      };

      socketRef.current.on("connect", register);
      socketRef.current.on("reconnect", register);

      // 🔥 Register immediately if already connected
      if (socketRef.current.connected) register();

      // Cleanup
      return () => {
        socketRef.current.off("connect", register);
        socketRef.current.off("reconnect", register);
      };
    }
  }, [captain, user]); // re-run when either captain or user loads

  // ✅ Common emit method
  const emitTo = (event, data) => {
    if (socketRef.current?.connected) {
      // console.log("📤 Emitting event:", event, data);
      socketRef.current.emit(event, data);
    } else {
      console.warn("⚠️ Socket not connected yet, cannot emit:", event);
    }
  };

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, emitTo }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
