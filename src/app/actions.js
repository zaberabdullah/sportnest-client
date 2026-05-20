"use server";

import { revalidatePath } from "next/cache";

export async function createFacility(formData) {
  try {
    const name = formData.get("name");
    const facility_type = formData.get("facility_type");
    const location = formData.get("location");
    const price_per_hour = Number(formData.get("price_per_hour"));
    const capacity = Number(formData.get("capacity"));
    const description = formData.get("description");
    const image = formData.get("image");

    const available_slots = ["06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM"];

    const finalData = {
      name,
      facility_type,
      location,
      price_per_hour,
      capacity,
      available_slots,
      description,
      image,
    };

    console.log("Sending to Backend API:", finalData);

    const res = await fetch("http://localhost:5000/api/facility", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    const data = await res.json();

    if (res.ok) {
      revalidatePath("/dashboard/manage-facilities");
      return { success: true, message: "Facility added successfully!" };
    }

    return { success: false, message: data.message || "Failed to save on database." };
  } catch (err) {
    console.error("Server Action Error:", err);
    return { success: false, message: "Server action failed entirely!" };
  }
}
