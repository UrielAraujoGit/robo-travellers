import {
  Link,
  NavLink,
  useLocation,
  type NavLinkRenderProps,
} from "react-router";
import { Icon } from "./Icon";

const navLinkClass = ({ isActive }: NavLinkRenderProps) =>
  `relative py-3.25 text-[13px] tablet:py-3.75 tablet:text-[16px] hover:text-foreground ${
    isActive
      ? "text-foreground after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:rounded-full after:bg-accent after:shadow-[0_0_10px_var(--color-accent)]"
      : "text-muted"
  }`;

export function Header() {
  // A planet's mission page belongs to the archive, so "Explore" stays active there
  const inMission = useLocation().pathname.startsWith("/exoplanet/");
  return (
    // Fixed to the top of the viewport, with the same side gutters as Page;
    // content scrolls under a translucent, blurred background.
    <header className="fixed inset-x-0 top-0 z-50 bg-[rgba(1,1,7,0.88)] px-4.5 backdrop-blur-[18px] tablet:px-6 desktop:px-[5vw]">
      <div className="flex h-17 items-center justify-between border-b border-[rgba(139,117,255,0.18)] tablet:h-19 desktop:h-24">
        <Link
          to="/"
          className="flex items-center gap-3.25 font-display text-[13px] leading-[normal] font-semibold tracking-[0.34em]"
          aria-label="EXOLOG home"
        >
          <span className="size-8 text-accent tablet:size-9.5">
            <Icon name="planet" className="size-8 tablet:size-9.5" />
          </span>
          <span className="hidden tablet:inline">EXOLOG</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-5 tablet:gap-4.5 desktop:gap-10.5"
        >
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={(props) =>
              navLinkClass({ ...props, isActive: props.isActive || inMission })
            }
          >
            Explore
          </NavLink>
          <span className="hidden rounded-full border border-[#302855] px-3 py-2 font-display text-[10px] leading-[normal] font-medium tracking-[0.13em] text-accent desktop:inline">
            <i className="mr-1.75 inline-block size-1.5 rounded-full bg-accent shadow-[0_0_9px_var(--color-accent)]" />{" "}
            LIVE SIGNAL
          </span>
        </nav>
      </div>
    </header>
  );
}
