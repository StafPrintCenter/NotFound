export function PlatformSkeleton() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 opacity-60 animate-pulse sm:p-6">
      <div>
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="h-11 w-11 rounded-xl bg-muted" />
          <div className="h-6 w-24 rounded-full bg-muted" />
        </div>
        <div className="h-6 w-3/4 rounded bg-muted" />
        <div className="mt-3 space-y-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
        </div>
      </div>
      <div className="mt-5">
        <div className="h-5 w-32 rounded-full bg-muted" />
      </div>
    </div>
  );
}