const whitelist = [
  // "http://172.20.51.120:3000",
  "http://localhost:5000",
  "http://localhost:3000",
  // "http://certificate.statstudio.in",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
