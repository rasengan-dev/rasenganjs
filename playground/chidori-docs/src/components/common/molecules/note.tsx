type Props = {
  title: string;
  children: React.ReactNode;
};

export function Note({ title, children }: Props) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className="relative rounded-lg px-4 py-3 text-sm grid has-[&gt;svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[&gt;svg]:gap-x-3 gap-y-0.5 items-start [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:translate-y-0.5 [&amp;&gt;svg]:text-current bg-background text-foreground w-auto border md:-mx-1 mt-6"
      data-variant="default"
    >
      <div
        data-slot="alert-title"
        className="col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight"
      >
        {title}
      </div>
      <div
        data-slot="alert-description"
        className="w-full inline col-start-2 grid justify-items-start gap-1 text-sm [&amp;_p]:leading-relaxed text-card-foreground/80"
      >
        {children}
      </div>
    </div>
  );
}
