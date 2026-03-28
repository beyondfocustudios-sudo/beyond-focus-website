export function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#FA8334]/20 bg-[#FA8334]/5 px-4 py-2">
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FA8334] opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FA8334]" />
      </span>
      <span className="text-[12px] font-medium text-[#0E3A45]">
        Disponibilidade limitada — 2 vagas para Abril
      </span>
    </div>
  );
}
