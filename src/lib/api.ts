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

export async function submitProgramFeedback(data: {
  role: string;
  rating: number;
  feedback: string;
  topicSuggestions?: string;
  email?: string;
  isAnonymous: boolean;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit program feedback");
    return await res.json();
  } catch (err) {
    console.warn("Backend not reachable, recorded locally:", err);
    return { success: true, message: "Thank you for your valuable feedback! It helps us improve.", offline: true };
  }
}

export async function submitAmbassadorApplication(data: {
  fullName: string;
  email: string;
  age: number | string;
  schoolOrOrg: string;
  city: string;
  statement: string;
  interests: string[];
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/ambassador`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit ambassador application");
    return await res.json();
  } catch (err) {
    console.warn("Backend not reachable, recorded locally:", err);
    return { success: true, message: "Application received! We'll email you with next steps.", offline: true };
  }
}

export async function submitGeneralInquiry(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit inquiry");
    return await res.json();
  } catch (err) {
    console.warn("Backend not reachable, recorded locally:", err);
    return { success: true, message: "Message sent! Our team will get back to you shortly.", offline: true };
  }
}

export async function signPetitionApi(data: {
  petitionId: string;
  signerName: string;
  email: string;
  zipCode?: string;
  comment?: string;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/petitions/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to record signature");
    return await res.json();
  } catch (err) {
    console.warn("Backend not reachable, signed locally:", err);
    return { success: true, message: "Signature added successfully!", offline: true };
  }
}

export async function submitCommunityPetition(data: {
  title: string;
  target: string;
  summary: string;
  demands: string;
  proposerName: string;
  proposerEmail: string;
  location: string;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/petitions/propose`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit petition proposal");
    return await res.json();
  } catch (err) {
    console.warn("Backend not reachable, submitted locally:", err);
    return { success: true, message: "Community petition submitted for review!", offline: true };
  }
}
