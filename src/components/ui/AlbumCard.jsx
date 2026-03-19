import { useLanguage } from "../../context/LanguageContext";
import styles from "./AlbumCard.module.css";

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const AppleMusicIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208A4.86 4.86 0 00.16 4.87c-.015.208-.02.418-.022.627C.137 5.5.13 5.5.13 5.5v13.001c0 .277.007.553.02.83.03.684.146 1.348.4 1.993.381.967 1.023 1.71 1.91 2.234.62.37 1.3.574 2.016.65.498.053 1.002.076 1.503.08.05.003.1.003.15.003H18.99c.25 0 .5-.01.748-.025.53-.028 1.046-.13 1.552-.3 1.11-.38 1.944-1.09 2.48-2.114.301-.571.463-1.187.525-1.822.018-.177.026-.353.026-.529V6.124zm-3.99 5.316l-5.998 3.42c-.18.1-.38.154-.58.154-.2 0-.4-.053-.58-.154l-5.998-3.42a1.154 1.154 0 01-.58-1 1.154 1.154 0 01.58-1l5.998-3.42a1.154 1.154 0 011.16 0l5.998 3.42c.36.206.58.586.58 1s-.22.794-.58 1z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);

export default function AlbumCard({ album }) {
  const { t } = useLanguage();

  return (
    <div className={styles.card}>
      <div className={styles.cover}>
        {album.coverSrc ? (
          <img src={album.coverSrc} alt={album.coverAlt} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>
            <span>♪</span>
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{album.title}</h3>
        <p className={styles.year}>{album.year}</p>
        <div className={styles.links}>
          {album.links.spotify && (
            <a
              href={album.links.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label={`${t("music.streamOn")} Spotify`}
              title="Spotify"
            >
              <SpotifyIcon />
            </a>
          )}
          {album.links.appleMusic && (
            <a
              href={album.links.appleMusic}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label={`${t("music.streamOn")} Apple Music`}
              title="Apple Music"
            >
              <AppleMusicIcon />
            </a>
          )}
          {album.links.youtube && (
            <a
              href={album.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label={`${t("music.streamOn")} YouTube`}
              title="YouTube"
            >
              <YoutubeIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
