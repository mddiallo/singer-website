import styles from "./Button.module.css";

export default function Button({
  variant = "primary",
  href,
  onClick,
  disabled = false,
  external = false,
  children,
}) {
  const cls = `${styles.btn} ${styles[variant]}`;

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
