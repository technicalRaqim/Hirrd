
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);


// const supabaseClient=async(supabaseAccessToken)=>{
// const supabase=createClient(supabaseUrl,supabaseKey,{
//     global:{
//         headers:{
//             Authorization:`Bearer $(supabaseAccessToken)` ,
//         }
//     }
// })
// return supabase;
// }
// export default supabaseClient

// import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// export const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// const supabaseClient = async (supabaseAccessToken) => {
//   const supabase = createClient(supabaseUrl, supabaseKey, {
//     global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
//   });
//   // set Supabase JWT on the client object,
//   // so it is sent up with all Supabase requests
//   return supabase;
// };

// export default supabaseClient;
        

// import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// const supabaseClient = async (supabaseAccessToken) => {
//   const supabase = createClient(supabaseUrl, supabaseKey, {
//     global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
//   });
//   // set Supabase JWT on the client object,
//   // so it is sent up with all Supabase requests
//   return supabase;
// };

// export default supabaseClient;

// https://ixvyiotswfpcdazkadbl.supabase.co/rest/v1/jobs?select=*%2Csaved%3Asave_jobs%28id%29%2Ccompany%3Acompanies%28name%2Clogo_url%29

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = async (supabaseAccessToken) => {
  // Log the token to check its format
  console.log("Supabase Access Token:", supabaseAccessToken);
  
  // Create Supabase client with the access token
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  });

  return supabase;
};

export default supabaseClient;
