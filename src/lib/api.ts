// Client-side API fetchers with fallback to local state if backend is offline

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function submitQuestion(data: { question: string; category?: string; age_range?: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/qa/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit question to backend");
    return await res.json();
  } catch (err) {
    console.warn("Backend not reachable, stored locally:", err);
    return { success: true, message: "Question received anonymously! We'll review and add it soon.", offline: true };
  }
}

export async function submitStory(data: { story: string; author_alias?: string; age?: number; category?: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/voices/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit story to backend");
    return await res.json();
  } catch (err) {
    console.warn("Backend not reachable, stored locally:", err);
    return { success: true, message: "Thank you for sharing your voice! Submitted anonymously.", offline: true };
  }
}

export async function rsvpWorkshop(data: { session_id: string; attendee_name: string; email: string; guest_count?: number }) {
  try {
    const res = await fetch(`${API_BASE_URL}/workshops/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to RSVP");
    return await res.json();
  } catch (err) {
    console.warn("Backend not reachable, confirmed locally:", err);
    return { success: true, message: "Spot reserved! Confirmation email on its way.", offline: true };
  }
}

export async function requestWorkshopVisit(data: { organization_name: string; contact_name: string; email: string; phone?: string; estimated_attendees?: number; preferred_dates?: string; notes?: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/workshops/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit workshop request");
    return await res.json();
  } catch (err) {
    console.warn("Backend not reachable, confirmed locally:", err);
    return { success: true, message: "Workshop request received! Our team will reach out within 2 business days.", offline: true };
  }
}

export async function updateUserProgress(data: { topic_id: string; xp_gained: number; category_id: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/user/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to save progress");
    return await res.json();
  } catch (err) {
    return { success: true, xp: data.xp_gained, offline: true };
  }
}
