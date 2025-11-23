
const { Server } = require("socket.io");
const userModel = require("./models/user.model.js");
const captainModel = require("./models/Captain.model.js");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("register-user", async ({ userId, userType }) => {
      try {
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`✅ User socket stored in DB: ${userId}`);
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`✅ Captain socket stored in DB: ${userId}`);
        } else {
          console.warn("⚠️ Unknown userType:", userType);
        }
      } catch (err) {
        console.error("❌ Error saving socketId:", err.message);
      }
    });

    // socket.on("update-location-captain" , async (data) => {
    //   const {userId , location } = data;

    //   if(!location || !location.ltd || !location.lng){
    //     return socket.emit("error" , {message : 'invalid location'})
    //   }
     
    //   await captainModel.findByIdAndUpdate(userId, {
    //     location: {
    //       ltd:location.ltd,
    //       lng: location.lng,
    //     }
    //    });
      

    // })

    socket.on("update-location-captain", async (data) => {
      const {
        userId,
        ltd,
        lat,
        latitude,
        lng,
        lon,
        longitude,
      } = data || {};

      const resolvedLat =
        typeof lat === "number"
          ? lat
          : typeof latitude === "number"
          ? latitude
          : typeof ltd === "number"
          ? ltd
          : null;

      const resolvedLng =
        typeof lng === "number"
          ? lng
          : typeof longitude === "number"
          ? longitude
          : typeof lon === "number"
          ? lon
          : null;

      if (!userId || resolvedLat === null || resolvedLng === null) {
        return socket.emit("error", { message: "invalid location payload" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: "Point",
          coordinates: [resolvedLng, resolvedLat],
        },
      });
      // console.log(`📍 Updated captain ${userId} -> lat:${resolvedLat}, lng:${resolvedLng}`);
    });


    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${socket.id}`);
      try {
        await userModel.findOneAndUpdate({ socketId: socket.id }, { $unset: { socketId: "" } });
        await captainModel.findOneAndUpdate({ socketId: socket.id }, { $unset: { socketId: "" } });
      } catch (err) {
        console.error("❌ Error removing socketId:", err.message);
      }
    });
  });

  return io;
};

const sendMessageToSocketid = (socketId, payload) => {
  if (!io || !socketId) {
    console.error("Socket.IO not initialized or invalid socket ID");
    return;
  }

  const { event, data } = payload;

  if (!event) {
    console.error("Missing event name in sendMessageToSocketid payload");
    return;
  }

  io.to(socketId).emit(event, data);
};



module.exports = { initializeSocket, sendMessageToSocketid };