/* Guess I have to expose this shit? If anyone
 * has any ideas pls let me know. I have RLS
 * policies but this feels wrong
 */
const SUPABASE_URL = "https://rupshzteaklaociulmcb.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1cHNoenRlYWtsYW9jaXVsbWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NjIyMjksImV4cCI6MjA1OTIzODIyOX0.6t2CgInwF5ptxvn1gsnJCeAnnjbEGLD1aQ-Hd-rNYGw";

const RATE_LIMIT_MS = 60_000;

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("logbook-form");
const nameInput = document.getElementById("logbook-name");
const messageInput = document.getElementById("logbook-message");
const entriesContainer = document.getElementById("logbook-entries");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const lastPostTime = localStorage.getItem("lastLogTime");
  const now = Date.now();

  if (lastPostTime && now - lastPostTime < RATE_LIMIT_MS) {
    alert("Slow down! Try again in a bit.");
  }

  //   Catch Honeypot
  const honeypot = document.getElementById("logbook-nickname");
  if (honeypot.value !== "") {
    console.warn("Bot detected, honeypot caught it.");
    return;
  }

  const name = nameInput.value.trim() || "anon";
  const message = messageInput.value.trim();

  if (!message) return;

  if (message.length < 2 || message.length > 55) {
    alert("Message must be between 2 and 55 characters.");
    return;
  }

  const { error } = await client.from("log").insert([{ name, message }]);
  if (error) {
    alert("Failed to post log:", error);
    return;
  }

  localStorage.setItem("lastLogTime", now);
  nameInput.value = "";
  messageInput.value = "";
  fetchLogbookEntries();
});

async function fetchLogbookEntries() {
  const { data, error } = await client
    .from("log")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch logbook entries:", error);
    return;
  }

  const entries = data.map((entry) => {
    return `
        <div class="logbook-entry">
            <h4>${entry?.name}</h4>
            <p>${entry?.message}</p>
            <p class="logbook-footer">
                <span>
                ${new Date(entry?.created_at).toLocaleDateString()}
                </span>
                <i class="fa-solid fa-pencil" aria-hidden="true"></i>
            </p>
        </div>
      `;
  });

  entriesContainer.innerHTML = `
      <h2 class="content-heading">## logbook entries</h2>
      ${entries.join("")}
    `;
}

document
  .querySelector('[data-tab="logbook"]')
  ?.addEventListener("click", () => {
    fetchLogbookEntries();
  });
