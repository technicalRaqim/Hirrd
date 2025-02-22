import supabaseClient from "@/utils/supabase";
import { supabaseUrl } from "@/utils/supabase";
export async function getCompanies(token){
    const supabase = await supabaseClient(token);
     console.log(token)
    const { data, error } = await supabase.from("companies").select("*")
    console.log("companies")

    if(error){
        console.log("Error fetching companies:", error);
        return null;
    }
    return data;
}


// export async function addNewCompany(token, _, companyData) {
//     const supabase = await supabaseClient(token);
  
//     const random = Math.floor(Math.random() * 90000);
//     const fileName = `logo-${random}-${companyData.name}`;
  
//     const { error: storageError } = await supabase.storage
//       .from("company-logo")
//       .upload(fileName, companyData.logo);
  
//     if (storageError) throw new Error("Error uploading Company Logo");
  
//     const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;
  
//     const { data, error } = await supabase
//       .from("companies")
//       .insert([
//         {
//           name: companyData.name,
//           logo_url: logo_url,
//         },
//       ])
//       .select();
  
//     if (error) {
//       console.error(error);
//       throw new Error("Error submitting Companys");
//     }
  
//     return data;
//   }

  export async function addNewCompany(token, _, companyData) {
    const supabase = await supabaseClient(token);
    const random = Math.floor(Math.random() * 90000);
    const fileName = `logo-${random}-${companyData.name}`;
  
    // Log before uploading
    console.log("Uploading logo:", fileName);
  
    const { error: storageError } = await supabase.storage
      .from("company-logo")
      .upload(fileName, companyData.logo);
  
    if (storageError) {
      console.error("Error uploading logo:", storageError);
      throw new Error("Error uploading Company Logo");
    }
  
    const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;
  
    // Log logo URL
    console.log("Logo URL:", logo_url);
  
    const { data, error } = await supabase
      .from("companies")
      .insert([{ name: companyData.name, logo_url: logo_url }])
      .select();
  
    if (error) {
      console.error("Error inserting company:", error.message);
      throw new Error("Error submitting Companies");
    }
  
    return data;
  }
  