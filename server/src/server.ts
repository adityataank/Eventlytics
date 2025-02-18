import app from "./app";

import { appConfig } from "./config/config";

app.listen(appConfig.PORT, () =>
  console.log(`\n🎉 Server started on PORT: ${appConfig.PORT} 🎉\n`)
);
