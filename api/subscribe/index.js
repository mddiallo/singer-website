const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const TABLE_NAME = process.env.AZURE_TABLE_NAME || "FanSubscribers";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function (context, req) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    context.res = { status: 204, headers };
    return;
  }

  // Input validation
  const { name, email } = req.body || {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    context.res = {
      status: 400,
      headers,
      body: { error: "invalid_name", message: "Name must be at least 2 characters." },
    };
    return;
  }

  if (!email || !EMAIL_RE.test(email)) {
    context.res = {
      status: 400,
      headers,
      body: { error: "invalid_email", message: "A valid email address is required." },
    };
    return;
  }

  // Check required env vars
  if (!ACCOUNT_NAME || !ACCOUNT_KEY) {
    context.log.error("Azure Storage credentials not configured.");
    context.res = {
      status: 500,
      headers,
      body: { error: "config_error", message: "Storage not configured." },
    };
    return;
  }

  try {
    const credential = new AzureNamedKeyCredential(ACCOUNT_NAME, ACCOUNT_KEY);
    const client = new TableClient(
      `https://${ACCOUNT_NAME}.table.core.windows.net`,
      TABLE_NAME,
      credential
    );

    // PartitionKey: first letter of email domain (simple distribution)
    // RowKey: base64url(email) — unique, no forbidden chars
    const domain = email.split("@")[1];
    const partitionKey = domain[0].toUpperCase();
    const rowKey = Buffer.from(email.toLowerCase()).toString("base64url");

    await client.upsertEntity(
      {
        partitionKey,
        rowKey,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        subscribedAt: new Date().toISOString(),
        source: "website_signup",
      },
      "Merge"
    );

    context.res = {
      status: 201,
      headers,
      body: { success: true, message: "Subscription confirmed." },
    };
  } catch (err) {
    context.log.error("Table Storage write failed:", err.message);
    context.res = {
      status: 500,
      headers,
      body: { error: "storage_error", message: "Could not save subscription. Please try again." },
    };
  }
};
