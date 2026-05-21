"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createFacility(formData) {
  let session;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (err) {
    return { success: false, message: "Authentication failed" };
  }

  if (!session?.user?.email) {
    return { success: false, message: "Please login first" };
  }

  const payload = {
    name: formData.get("name"),
    facility_type: formData.get("facility_type"),
    location: formData.get("location"),
    price_per_hour: Number(formData.get("price_per_hour")),
    capacity: Number(formData.get("capacity")),
    available_slots: ["06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM"],
    description: formData.get("description"),
    image: formData.get("image"),
    owner_email: session.user.email,
  };

  try {
    const res = await fetch("http://localhost:5000/api/facility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      redirect("/manage-facilities");
    }

    return { success: false, message: data.message || "Failed to save facility" };
  } catch (err) {
    return { success: false, message: "Server error occurred" };
  }
}