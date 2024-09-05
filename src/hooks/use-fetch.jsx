// import { useSession } from "@clerk/clerk-react";
// import { useState } from "react";

// const useFetch = (cb, options = {}) => {
//   const [data, setData] = useState(undefined);
//   const [loading, setLoading] = useState(null);
//   const [error, setError] = useState(null);

//   const { session } = useSession();

//   const fn = async (...args) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const supabaseAccessToken = await session.getToken({
//         template: "supabase",
//       });
//       const response = await cb(supabaseAccessToken, options, ...args);
//       setData(response);
//       setError(null);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, fn };
// };

// export default useFetch;

// import { useSession } from "@clerk/clerk-react";
// import { useState, useCallback } from "react";

// const useFetch = (cb, options = {}) => {
//   const [data, setData] = useState(undefined);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const { session } = useSession();

//   const fn = useCallback(async (...args) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const supabaseAccessToken = await session.getToken({ template: "supabase" });
//       const response = await cb(supabaseAccessToken, options, ...args);
//       setData(response);
//     } catch (error) {
//       console.error("Fetch error:", error);  // Log the error for debugging
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   }, [cb, options, session]);

//   return { data, loading, error, fn };
// };

// export default useFetch;

import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      if (!supabaseAccessToken) {
        throw new Error("Failed to retrieve Supabase access token");
      }
      const response = await cb(supabaseAccessToken, options, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;