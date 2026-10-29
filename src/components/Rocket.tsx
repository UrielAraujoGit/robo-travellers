/**
 * The rocket carrying the robot, drawn with CSS (250×110px, flying right).
 * It bobs and its flame flickers, unless the user prefers reduced motion.
 */
export function Rocket({ label }: { label: string }) {
  return (
    <div
      className="relative h-27.5 w-62.5 -rotate-14 motion-safe:animate-rocket-flight"
      role="img"
      aria-label={label}
    >
      <span className="absolute top-9.5 -left-38.75 -z-1 h-9.5 w-55 bg-[linear-gradient(90deg,transparent,#7042ff_38%,#f25bff_72%,#fff_100%)] blur-[4px] [clip-path:polygon(0_45%,100%_0,100%_100%,0_58%)] motion-safe:animate-flame-pulse" />
      <span className="absolute top-1.5 left-15.75 h-7.5 w-16.75 bg-[#392c61] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
      <span className="absolute -bottom-1 left-15.75 h-7.5 w-16.75 bg-[#392c61] [clip-path:polygon(0_0,55%_100%,100%_0)]" />
      <span className="absolute top-6.25 left-12 h-16.5 w-37.5 rounded-[42%_20%_20%_42%] border border-[#9083ba] bg-[linear-gradient(180deg,#8178a3,#29233e_55%,#12101e)] shadow-[inset_0_8px_13px_rgba(255,255,255,0.12)]">
        {/* Window with the robot looking out */}
        <i className="absolute top-2.25 right-5.5 size-11.25 overflow-hidden rounded-full border-3 border-[#69569e] bg-[#09081a] shadow-[0_0_14px_#725bff]">
          <b className="absolute top-3.25 left-3 h-4.25 w-4.75 rounded-[7px] bg-[#7975c8] shadow-[inset_-5px_0_#2d2855] after:absolute after:top-1.25 after:right-0.5 after:size-1.5 after:rounded-full after:bg-[#a5e6ff] after:shadow-[0_0_7px_#8ddcff]" />
        </i>
      </span>
      <span className="absolute top-6.25 left-46.5 h-16.5 w-15.5 rounded-[9px] bg-[linear-gradient(140deg,#b37bdf,#4a347c_55%,#1c1732)] [clip-path:polygon(0_0,100%_50%,0_100%)]" />
    </div>
  );
}
