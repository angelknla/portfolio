/**
 * Minimal line-art icon set for the booking flow. Stroke-based, sized in `em`
 * and painted with `currentColor` so every icon inherits type size and theme.
 */
type IconProps = {
  className?: string;
};

const base = {
  viewBox: '0 0 24 24',
  width: '1em',
  height: '1em',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

const FootballIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx='12' cy='12' r='9' />
    <path d='M12 8.2l3.2 2.3-1.2 3.8h-4l-1.2-3.8L12 8.2z' />
    <path d='M12 3v5.2M19.6 9.3l-4.4 1.2M17 20l-3-6M7 20l3-6M4.4 9.3l4.4 1.2' />
  </svg>
);

const BasketballIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx='12' cy='12' r='9' />
    <path d='M12 3v18M3 12h18' />
    <path d='M5.6 5.6c3.6 3.6 3.6 9.2 0 12.8M18.4 5.6c-3.6 3.6-3.6 9.2 0 12.8' />
  </svg>
);

const VolleyballIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx='12' cy='12' r='9' />
    <path d='M12 3c-3 4.2-3 12.6 3.5 17.4M3.4 10.2c5 1 11.4-2.2 13.3-6.4M20.7 13.4c-4.6-2.2-11.8-1-15.9 5' />
  </svg>
);

const PadelIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M14.6 2.8c3.4 0 6.1 2.7 6.1 6.1 0 3.9-2.9 6.6-6.6 6.6-2.4 0-4.3-.7-5.6-2-1.3-1.3-2-3.2-2-5.1 0-3.4 2.7-5.6 6.1-5.6z' />
    <path d='M9.4 15.2l-2.6 2.6' />
    <rect
      x='3.3'
      y='17.4'
      width='4.2'
      height='3.4'
      rx='1.7'
      transform='rotate(-45 5.4 19.1)'
    />
    <circle cx='12' cy='9' r='1.4' />
    <circle cx='16' cy='11.6' r='1.4' />
  </svg>
);

const ClimbingIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M5 21V3' />
    <circle cx='14.2' cy='5.4' r='2' />
    <path d='M12.8 8.6l-2.6 4 2.9 1.8-1.4 6.6' />
    <path d='M12.8 9.4L9 7.2M15.7 14.4l3.3 1.2' />
    <path d='M9 4.2h.01M9.4 11.4h.01M9 17.8h.01' strokeWidth={2.4} />
  </svg>
);

const YogaIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx='12' cy='5' r='2.2' />
    <path d='M12 9.2v4.4' />
    <path d='M12 13.6c-2.6 0-4.8 1.6-5.6 4.2h11.2c-.8-2.6-3-4.2-5.6-4.2z' />
    <path d='M12 11.2L6.6 9M12 11.2L17.4 9' />
    <path d='M4 20.6h16' />
  </svg>
);

const SPORT_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  football: FootballIcon,
  basketball: BasketballIcon,
  volleyball: VolleyballIcon,
  padel: PadelIcon,
  climbing: ClimbingIcon,
  yoga: YogaIcon,
};

export const SportIcon = ({
  sportId,
  className,
}: {
  sportId: string;
  className?: string;
}) => {
  const Icon = SPORT_ICONS[sportId];
  return Icon ? <Icon className={className} /> : null;
};

export const CheckIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.4}>
    <path d='M5 12.8l4.4 4.2L19 6.6' />
  </svg>
);

export const ArrowIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M4.5 12h14M13 6.5l5.5 5.5L13 17.5' />
  </svg>
);

export const BackIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M19.5 12h-14M11 6.5L5.5 12l5.5 5.5' />
  </svg>
);

export const CalendarIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x='3.5' y='5' width='17' height='16' rx='2.5' />
    <path d='M3.5 10h17M8.5 3v4M15.5 3v4' />
  </svg>
);

export const MinusIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2}>
    <path d='M6 12h12' />
  </svg>
);

export const PlusIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2}>
    <path d='M12 6v12M6 12h12' />
  </svg>
);

export const IndoorIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M3.5 10.5L12 4l8.5 6.5V20a1 1 0 01-1 1h-15a1 1 0 01-1-1v-9.5z' />
    <path d='M9 21v-5.5h6V21' />
  </svg>
);

export const OutdoorIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx='12' cy='12' r='4' />
    <path d='M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19' />
  </svg>
);

export const VenueIcon = ({
  venue,
  className,
}: {
  venue: 'indoor' | 'outdoor';
  className?: string;
}) =>
  venue === 'indoor' ? (
    <IndoorIcon className={className} />
  ) : (
    <OutdoorIcon className={className} />
  );

export const SparkIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z' />
  </svg>
);
