import { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";

export function DiagnosticRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`max-w-[60%] truncate text-right ${highlight ? "font-semibold text-staf-coral" : "text-foreground"
          }`}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

export function useLocalTime() {
  const [timeString, setTimeString] = useState<string>("");
  const [timeZoneOffset, setTimeZoneOffset] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      const offsetMinutes = -now.getTimezoneOffset();
      const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
      const sign = offsetMinutes >= 0 ? "+" : "-";
      setTimeZoneOffset(`UTC${sign}${offsetHours}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return { timeString, timeZoneOffset };
}

export function LocalTime({ timeString, timeZoneOffset }: { timeString: string; timeZoneOffset: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        Heure locale
      </span>
      <span className="text-right tabular-nums text-foreground">
        {timeString || "--:--:--"}{" "}
        {timeZoneOffset && <span className="text-muted-foreground">({timeZoneOffset})</span>}
      </span>
    </div>
  );
}

export function LocationRow({ region }: { region: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        Région
      </span>
      <span className="text-right text-foreground">{region}</span>
    </div>
  );
}

export function useDetectedRegion() {
  const [region, setRegion] = useState<string>(() => getFallbackRegion());

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data) => {
        if (data.city && data.country_name) {
          setRegion(`${data.city}, ${data.country_name}`);
        }
      })
      .catch(() => {
        setRegion(getFallbackRegion());
      });

    return () => controller.abort();
  }, []);

  return region;
}

function getFallbackRegion(): string {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!timeZone) return "Non détectée";

    const parts = timeZone.split("/");
    const city = parts[1] ? parts[1].replace(/_/g, " ") : parts[0];
    const regionName = parts[0];

    return `${city} (${regionName})`;
  } catch {
    return "Non détectée";
  }
}