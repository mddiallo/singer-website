import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useFanSignup() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState("");

  function validate() {
    const e = {};
    if (!name.trim() || name.trim().length < 2) e.name = t("signup.errorName");
    if (!EMAIL_RE.test(email)) e.email = t("signup.errorEmail");
    return e;
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "server_error");
      setStatus("success");
    } catch {
      setStatus("error");
      setServerMsg(t("signup.errorServer"));
    }
  }

  return { name, setName, email, setEmail, errors, status, serverMsg, handleSubmit };
}
