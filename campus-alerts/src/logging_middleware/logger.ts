import axios from "axios";

const LOG_API =
  "http://20.207.122.201/evaluation-service/logs";

interface LogPayload {
  stack: "frontend";

  level:
    | "debug"
    | "info"
    | "warn"
    | "error"
    | "fatal";

  package:
    | "api"
    | "component"
    | "hook"
    | "page"
    | "state"
    | "style";

  message: string;
}

export const Log = async (
  level: LogPayload["level"],
  pkg: LogPayload["package"],
  message: string
) => {
  try {
    const response = await axios.post(
      LOG_API,
      {
        stack: "frontend",
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
          clientID:
            import.meta.env
              .VITE_CLIENT_ID,
          clientSecret:
            import.meta.env
              .VITE_CLIENT_SECRET,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Logging failed",
      error
    );
  }
};