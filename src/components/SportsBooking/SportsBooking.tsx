'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { useLanguage } from '@/contexts/Language';
import {
  bookingWindowDays,
  type Sport,
  slotGroups,
  sports,
  sportsData,
  type Venue,
  type VenueFilter,
} from '@/data/sportsData';

import {
  ArrowIcon,
  BackIcon,
  CalendarIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  SparkIcon,
  SportIcon,
  VenueIcon,
} from './SportsIcons';

import styles from './SportsBooking.module.css';

const STEP_IDS = ['sport', 'when', 'squad'] as const;
const VENUE_FILTERS: VenueFilter[] = ['all', 'indoor', 'outdoor'];

type StepId = (typeof STEP_IDS)[number];

type SlotState = 'open' | 'full' | 'past';

type SlotInfo = {
  state: SlotState;
  spots: number;
  label: string;
  level: 'low' | 'mid' | 'high';
};

type Confirmation = {
  reference: string;
  sport: Sport;
  venue: Venue;
  dateISO: string;
  time: string;
  players: number;
  price: number;
};

const pad = (value: number) => String(value).padStart(2, '0');

const toISODate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** Parsed at midday so daylight-saving shifts can never roll the day over. */
const fromISODate = (iso: string) => new Date(`${iso}T12:00:00`);

const minutesOfTime = (time: string) =>
  Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const fill = (template: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template
  );

/** FNV-1a: stable stand-in for a venue availability API, same answer every render. */
const hashString = (value: string) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

/** 0 spots means the hall or pitch is fully booked for that slot. */
const spotsForSlot = (
  sportId: string,
  venue: Venue,
  dateISO: string,
  time: string
) => hashString(`${sportId}|${venue}|${dateISO}|${time}`) % 6;

const buildDays = (todayISO: string) => {
  const start = fromISODate(todayISO);
  return Array.from({ length: bookingWindowDays }, (_, offset) => {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    return { iso: toISODate(date), date, offset };
  });
};

const buildCalendarHref = (
  confirmation: Confirmation,
  title: string,
  description: string
) => {
  const start = new Date(`${confirmation.dateISO}T${confirmation.time}:00`);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + confirmation.sport.durationMinutes);
  const stamp = (date: Date) =>
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;

  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Portfolio//Sports Booking//EN',
    'BEGIN:VEVENT',
    `UID:${confirmation.reference}@portfolio.local`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(calendar)}`;
};

const makeReference = () => {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const code = Array.from(
    { length: 6 },
    () => alphabet[Math.floor(Math.random() * alphabet.length)]
  ).join('');
  return `SPT-${code}`;
};

interface StepperProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  decreaseLabel: string;
  increaseLabel: string;
  unit: string;
  describedBy?: string;
  onChange: (value: number) => void;
}

const Stepper = ({
  id,
  label,
  value,
  min,
  max,
  decreaseLabel,
  increaseLabel,
  unit,
  describedBy,
  onChange,
}: StepperProps) => (
  <div className={styles.stepper}>
    <label className='sr-only' htmlFor={id}>
      {label}
    </label>
    <button
      type='button'
      className={styles.stepperButton}
      onClick={() => onChange(clamp(value - 1, min, max))}
      disabled={value <= min}
      aria-label={decreaseLabel}
    >
      <MinusIcon />
    </button>
    <input
      id={id}
      className={styles.stepperInput}
      type='number'
      inputMode='numeric'
      min={min}
      max={max}
      step={1}
      value={value}
      aria-describedby={describedBy}
      onChange={(event) => {
        const next = Number(event.target.value);
        if (Number.isFinite(next)) {
          onChange(clamp(Math.round(next), min, max));
        }
      }}
    />
    <button
      type='button'
      className={styles.stepperButton}
      onClick={() => onChange(clamp(value + 1, min, max))}
      disabled={value >= max}
      aria-label={increaseLabel}
    >
      <PlusIcon />
    </button>
    <span className={styles.stepperUnit} aria-hidden='true'>
      {unit}
    </span>
  </div>
);

export const SportsBooking = () => {
  const { translations } = useLanguage(sportsData);
  const t = translations as Record<string, any>;
  const locale = t?.locale ?? 'en-GB';

  const [step, setStep] = useState(0);
  const [venueFilter, setVenueFilter] = useState<VenueFilter>('all');
  const [sportId, setSportId] = useState('');
  const [venue, setVenue] = useState<Venue | ''>('');
  const [dateISO, setDateISO] = useState('');
  const [time, setTime] = useState('');
  const [teamSize, setTeamSize] = useState(5);
  const [subs, setSubs] = useState(0);
  const [players, setPlayers] = useState(2);
  const [error, setError] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  /** Resolved after mount so the prerendered HTML never disagrees with the browser clock. */
  const [now, setNow] = useState<{ iso: string; minutes: number } | null>(null);

  const stepHeadingRef = useRef<HTMLLegendElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);

  const baseId = useId();
  const filterHintId = `${baseId}-filter-hint`;
  const sportHintId = `${baseId}-sport-hint`;
  const venueHintId = `${baseId}-venue-hint`;
  const dateHintId = `${baseId}-date-hint`;
  const timeHintId = `${baseId}-time-hint`;
  const squadHintId = `${baseId}-squad-hint`;
  const subsHintId = `${baseId}-subs-hint`;

  useEffect(() => {
    const current = new Date();
    setNow({
      iso: toISODate(current),
      minutes: current.getHours() * 60 + current.getMinutes(),
    });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: `step` is the trigger — each change moves focus to the new step's heading
  useEffect(() => {
    if (!hasNavigated.current) return;
    stepHeadingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (confirmation) successHeadingRef.current?.focus();
  }, [confirmation]);

  const sport = useMemo(
    () => sports.find((item) => item.id === sportId),
    [sportId]
  );

  const visibleSports = useMemo(
    () =>
      venueFilter === 'all'
        ? sports
        : sports.filter((item) => item.venues.includes(venueFilter)),
    [venueFilter]
  );

  const days = useMemo(() => (now ? buildDays(now.iso) : []), [now]);

  const formats = useMemo(
    () => ({
      weekday: new Intl.DateTimeFormat(locale, { weekday: 'short' }),
      month: new Intl.DateTimeFormat(locale, { month: 'short' }),
      full: new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
      price: new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }),
    }),
    [locale]
  );

  const totalPlayers = !sport
    ? 0
    : sport.format === 'team'
      ? teamSize * 2 + subs
      : players;

  const totalPrice = sport ? sport.pricePerPlayer * totalPlayers : 0;

  const venueLabel = (which: Venue) => t?.venue?.[which] ?? '';

  const venueBadge = (item: Sport) => {
    if (item.venues.length > 1) return t?.venue?.both;
    return item.venues[0] === 'indoor'
      ? t?.venue?.indoorOnly
      : t?.venue?.outdoorOnly;
  };

  const dayLabel = (day: { date: Date; offset: number }) => {
    if (day.offset === 0) return t?.date?.today;
    if (day.offset === 1) return t?.date?.tomorrow;
    return formats.weekday.format(day.date);
  };

  const slotInfo = (slotTime: string): SlotInfo => {
    if (!sport || !venue || !dateISO || !now) {
      return { state: 'open', spots: 0, label: '', level: 'mid' };
    }
    if (dateISO === now.iso && minutesOfTime(slotTime) <= now.minutes + 30) {
      return {
        state: 'past',
        spots: 0,
        label: t?.time?.past ?? '',
        level: 'low',
      };
    }
    const spots = spotsForSlot(sport.id, venue, dateISO, slotTime);
    if (spots === 0) {
      return {
        state: 'full',
        spots,
        label: t?.time?.full ?? '',
        level: 'low',
      };
    }
    return {
      state: 'open',
      spots,
      label:
        spots === 1
          ? (t?.time?.lastSpot ?? '')
          : fill(t?.time?.spotsLeft ?? '', { count: spots }),
      level: spots === 1 ? 'low' : spots <= 3 ? 'mid' : 'high',
    };
  };

  const selectSport = (next: Sport) => {
    setSportId(next.id);
    setTime('');
    setDateISO('');
    setError('');
    setTeamSize(next.teamSizes?.[0] ?? 5);
    setSubs(0);
    setPlayers(next.minPlayers ?? 2);
    // A single-venue sport needs no second question; a filtered search already answered it.
    if (next.venues.length === 1) {
      setVenue(next.venues[0]);
    } else if (venueFilter !== 'all') {
      setVenue(venueFilter);
    } else {
      setVenue('');
    }
  };

  const changeFilter = (next: VenueFilter) => {
    setVenueFilter(next);
    setError('');
    if (sport && next !== 'all' && !sport.venues.includes(next)) {
      setSportId('');
      setVenue('');
      setDateISO('');
      setTime('');
    }
  };

  const goToStep = (next: number) => {
    hasNavigated.current = true;
    setStep(next);
    setAnnouncement(
      fill(t?.stepStatus ?? '', {
        current: next + 1,
        total: STEP_IDS.length,
        label: t?.steps?.[STEP_IDS[next]] ?? '',
      })
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 0) {
      if (!sport) {
        setError(t?.errors?.sport ?? '');
        return;
      }
      setError('');
      goToStep(1);
      return;
    }

    if (step === 1) {
      if (!venue) {
        setError(t?.errors?.venue ?? '');
        return;
      }
      if (!dateISO) {
        setError(t?.errors?.date ?? '');
        return;
      }
      if (!time) {
        setError(t?.errors?.time ?? '');
        return;
      }
      setError('');
      goToStep(2);
      return;
    }

    if (!sport || !venue) return;
    setError('');
    setConfirmation({
      reference: makeReference(),
      sport,
      venue,
      dateISO,
      time,
      players: totalPlayers,
      price: totalPrice,
    });
  };

  const resetBooking = () => {
    setConfirmation(null);
    setSportId('');
    setVenue('');
    setDateISO('');
    setTime('');
    setSubs(0);
    setError('');
    hasNavigated.current = false;
    setStep(0);
  };

  if (confirmation) {
    const sportName = t?.sports?.[confirmation.sport.id]?.name ?? '';
    const dateLabel = formats.full.format(fromISODate(confirmation.dateISO));
    const venueName = venueLabel(confirmation.venue);

    return (
      <section
        className={styles.confirmation}
        aria-labelledby={`${baseId}-done`}
      >
        <p className={styles.confirmationMark} aria-hidden='true'>
          <SportIcon sportId={confirmation.sport.id} />
        </p>
        <h2
          className={styles.confirmationTitle}
          id={`${baseId}-done`}
          ref={successHeadingRef}
          tabIndex={-1}
        >
          {t?.success?.title}
        </h2>
        <p className={styles.confirmationBody}>
          {fill(t?.success?.body ?? '', {
            sport: sportName,
            venue: venueName,
            date: dateLabel,
            time: confirmation.time,
            squad: confirmation.players,
          })}
        </p>
        <p className={styles.reference}>
          <span className={styles.referenceLabel}>{t?.success?.reference}</span>
          <strong className={styles.referenceCode}>
            {confirmation.reference}
          </strong>
        </p>
        <p className={styles.confirmationTotal}>
          {t?.summary?.total}
          <strong>{formats.price.format(confirmation.price)}</strong>
        </p>
        <div className={styles.confirmationActions}>
          <a
            className={styles.secondaryAction}
            href={buildCalendarHref(
              confirmation,
              `${sportName} · ${venueName}`,
              `${confirmation.players} · ${confirmation.reference}`
            )}
            download={`${confirmation.reference}.ics`}
          >
            <CalendarIcon />
            {t?.actions?.calendar}
          </a>
          <button
            type='button'
            className={styles.primaryAction}
            onClick={resetBooking}
          >
            {t?.actions?.another}
            <ArrowIcon />
          </button>
        </div>
      </section>
    );
  }

  const currentStep: StepId = STEP_IDS[step];
  const isLastStep = step === STEP_IDS.length - 1;

  return (
    <section className={styles.booking}>
      <ol className={styles.progress}>
        {STEP_IDS.map((id, index) => (
          <li
            key={id}
            className={styles.progressItem}
            data-state={
              index < step ? 'done' : index === step ? 'current' : 'todo'
            }
            aria-current={index === step ? 'step' : undefined}
          >
            <span className={styles.progressDot} aria-hidden='true'>
              {index < step ? <CheckIcon /> : index + 1}
            </span>
            <span className={styles.progressLabel}>{t?.steps?.[id]}</span>
          </li>
        ))}
      </ol>

      <div className={styles.layout}>
        <form className={styles.panel} onSubmit={handleSubmit} noValidate>
          <p className={styles.stepCount}>
            <SparkIcon />
            {fill(t?.stepOf ?? '', {
              current: step + 1,
              total: STEP_IDS.length,
            })}
          </p>

          {currentStep === 'sport' && (
            <>
              <fieldset className={styles.fieldset}>
                <legend className={styles.miniLegend}>
                  {t?.venue?.filterLegend}
                </legend>
                <p className='sr-only' id={filterHintId}>
                  {t?.venue?.hint}
                </p>
                <div className={styles.chips}>
                  {VENUE_FILTERS.map((option) => (
                    <label key={option} className={styles.chip}>
                      <input
                        className={styles.control}
                        type='radio'
                        name='venueFilter'
                        value={option}
                        checked={venueFilter === option}
                        aria-describedby={filterHintId}
                        onChange={() => changeFilter(option)}
                      />
                      <span className={styles.chipInner}>
                        {option !== 'all' && <VenueIcon venue={option} />}
                        {t?.venue?.[option]}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend
                  className={styles.legend}
                  ref={stepHeadingRef}
                  tabIndex={-1}
                >
                  {t?.sport?.legend}
                </legend>
                <p className={styles.hint} id={sportHintId}>
                  {t?.sport?.hint}
                </p>
                {visibleSports.length === 0 ? (
                  <p className={styles.empty}>{t?.venue?.noResults}</p>
                ) : (
                  <div className={styles.sportGrid}>
                    {visibleSports.map((item) => {
                      const copy = t?.sports?.[item.id] ?? {};
                      const capacity =
                        item.format === 'team'
                          ? t?.sport?.teamBadge
                          : fill(t?.sport?.playersBadge ?? '', {
                              max: item.maxPlayers ?? 0,
                            });

                      return (
                        <label key={item.id} className={styles.sportCard}>
                          <input
                            className={styles.control}
                            type='radio'
                            name='sport'
                            value={item.id}
                            checked={sportId === item.id}
                            onChange={() => selectSport(item)}
                            aria-describedby={sportHintId}
                          />
                          <span className={styles.sportCardInner}>
                            <span className={styles.sportTop}>
                              <span
                                className={styles.sportIcon}
                                aria-hidden='true'
                              >
                                <SportIcon sportId={item.id} />
                              </span>
                              <span className={styles.tick} aria-hidden='true'>
                                <CheckIcon />
                              </span>
                            </span>
                            <span className={styles.sportName}>
                              {copy.name}
                            </span>
                            <span className={styles.sportTagline}>
                              {copy.tagline}
                            </span>
                            <span className={styles.sportMeta}>
                              <span className={styles.badge}>{capacity}</span>
                              <span className={styles.badge}>
                                {venueBadge(item)}
                              </span>
                            </span>
                            <span className={styles.price}>
                              {fill(t?.sport?.perPlayer ?? '', {
                                price: formats.price.format(
                                  item.pricePerPlayer
                                ),
                              })}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </fieldset>
            </>
          )}

          {currentStep === 'when' && sport && (
            <>
              {sport.venues.length > 1 && (
                <fieldset className={styles.fieldset}>
                  <legend className={styles.miniLegend}>
                    {t?.venue?.legend}
                  </legend>
                  <p className={styles.hint} id={venueHintId}>
                    {t?.venue?.hint}
                  </p>
                  <div className={styles.segmented}>
                    {sport.venues.map((option) => (
                      <label key={option} className={styles.segment}>
                        <input
                          className={styles.control}
                          type='radio'
                          name='venue'
                          value={option}
                          checked={venue === option}
                          aria-describedby={venueHintId}
                          onChange={() => {
                            setVenue(option);
                            setTime('');
                            setError('');
                          }}
                        />
                        <span className={styles.segmentInner}>
                          <span
                            className={styles.segmentIcon}
                            aria-hidden='true'
                          >
                            <VenueIcon venue={option} />
                          </span>
                          <span className={styles.segmentTitle}>
                            {venueLabel(option)}
                          </span>
                          <span className={styles.segmentMeta}>
                            {option === 'indoor'
                              ? t?.venue?.indoorMeta
                              : t?.venue?.outdoorMeta}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <fieldset className={styles.fieldset}>
                <legend
                  className={styles.legend}
                  ref={stepHeadingRef}
                  tabIndex={-1}
                >
                  {t?.date?.legend}
                </legend>
                <p className={styles.hint} id={dateHintId}>
                  {fill(t?.date?.hint ?? '', { days: bookingWindowDays })}
                </p>
                {days.length === 0 ? (
                  <p className={styles.empty}>{t?.date?.loading}</p>
                ) : (
                  <div className={styles.dateRail}>
                    {days.map((day) => (
                      <label key={day.iso} className={styles.dateCard}>
                        <input
                          className={styles.control}
                          type='radio'
                          name='date'
                          value={day.iso}
                          checked={dateISO === day.iso}
                          aria-label={formats.full.format(day.date)}
                          aria-describedby={dateHintId}
                          onChange={() => {
                            setDateISO(day.iso);
                            setTime('');
                            setError('');
                          }}
                        />
                        <span className={styles.dateCardInner}>
                          <span className={styles.dateWeekday}>
                            {dayLabel(day)}
                          </span>
                          <span className={styles.dateNumber}>
                            {day.date.getDate()}
                          </span>
                          <span className={styles.dateMonth}>
                            {formats.month.format(day.date)}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>{t?.time?.legend}</legend>
                <p className={styles.hint} id={timeHintId}>
                  {fill(t?.time?.hint ?? '', {
                    minutes: sport.durationMinutes,
                  })}
                </p>
                {!dateISO || !venue ? (
                  <p className={styles.empty}>{t?.time?.selectDateFirst}</p>
                ) : (
                  <div className={styles.slotGroups}>
                    {slotGroups.map((group) => (
                      <div key={group.id} className={styles.slotGroup}>
                        <p className={styles.slotGroupLabel} aria-hidden='true'>
                          {t?.time?.[group.id]}
                        </p>
                        <div className={styles.slotGrid}>
                          {group.times.map((slotTime) => {
                            const info = slotInfo(slotTime);

                            return (
                              <label
                                key={slotTime}
                                className={styles.slotCard}
                                data-state={info.state}
                              >
                                <input
                                  className={styles.control}
                                  type='radio'
                                  name='time'
                                  value={slotTime}
                                  checked={time === slotTime}
                                  disabled={info.state !== 'open'}
                                  aria-label={`${t?.time?.[group.id]} ${slotTime} — ${info.label}`}
                                  aria-describedby={timeHintId}
                                  onChange={() => {
                                    setTime(slotTime);
                                    setError('');
                                  }}
                                />
                                <span className={styles.slotCardInner}>
                                  <span className={styles.slotTime}>
                                    {slotTime}
                                  </span>
                                  <span className={styles.slotMeta}>
                                    <span
                                      className={styles.slotDot}
                                      data-level={info.level}
                                      aria-hidden='true'
                                    />
                                    {info.label}
                                  </span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </fieldset>
            </>
          )}

          {currentStep === 'squad' && sport && (
            <>
              {sport.format === 'team' ? (
                <>
                  <fieldset className={styles.fieldset}>
                    <legend
                      className={styles.legend}
                      ref={stepHeadingRef}
                      tabIndex={-1}
                    >
                      {t?.squad?.teamLegend}
                    </legend>
                    <p className={styles.hint} id={squadHintId}>
                      {fill(t?.squad?.teamHint ?? '', {
                        size: teamSize,
                        total: teamSize * 2,
                      })}
                    </p>
                    <div className={styles.segmented}>
                      {sport.teamSizes?.map((size) => (
                        <label key={size} className={styles.segment}>
                          <input
                            className={styles.control}
                            type='radio'
                            name='teamSize'
                            value={size}
                            checked={teamSize === size}
                            aria-describedby={squadHintId}
                            onChange={() => {
                              setTeamSize(size);
                              setSubs(0);
                            }}
                          />
                          <span className={styles.segmentInner}>
                            <span className={styles.segmentTitle}>
                              {fill(t?.squad?.aSide ?? '', { size })}
                            </span>
                            <span className={styles.segmentMeta}>
                              {fill(t?.squad?.aSideTotal ?? '', {
                                total: size * 2,
                              })}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className={styles.fieldset}>
                    <legend className={styles.miniLegend}>
                      {t?.squad?.subsLegend}
                    </legend>
                    <p className={styles.hint} id={subsHintId}>
                      {t?.squad?.subsHint}
                    </p>
                    <Stepper
                      id={`${baseId}-subs`}
                      label={t?.squad?.subsLabel ?? ''}
                      value={subs}
                      min={0}
                      max={sport.maxSubs ?? 0}
                      decreaseLabel={t?.squad?.decrease ?? ''}
                      increaseLabel={t?.squad?.increase ?? ''}
                      unit={t?.squad?.people ?? ''}
                      describedBy={subsHintId}
                      onChange={setSubs}
                    />
                  </fieldset>
                </>
              ) : (
                <fieldset className={styles.fieldset}>
                  <legend
                    className={styles.legend}
                    ref={stepHeadingRef}
                    tabIndex={-1}
                  >
                    {t?.squad?.playersLegend}
                  </legend>
                  <p className={styles.hint} id={squadHintId}>
                    {fill(t?.squad?.playersHint ?? '', {
                      min: sport.minPlayers ?? 1,
                      max: sport.maxPlayers ?? 1,
                    })}
                  </p>
                  <Stepper
                    id={`${baseId}-players`}
                    label={t?.squad?.playersLabel ?? ''}
                    value={players}
                    min={sport.minPlayers ?? 1}
                    max={sport.maxPlayers ?? 1}
                    decreaseLabel={t?.squad?.decrease ?? ''}
                    increaseLabel={t?.squad?.increase ?? ''}
                    unit={t?.squad?.people ?? ''}
                    describedBy={squadHintId}
                    onChange={setPlayers}
                  />
                </fieldset>
              )}
            </>
          )}

          {error && (
            <p className={styles.error} role='alert'>
              {error}
            </p>
          )}

          <div className={styles.actions}>
            {step > 0 && (
              <button
                type='button'
                className={styles.secondaryAction}
                onClick={() => goToStep(step - 1)}
              >
                <BackIcon />
                {t?.actions?.back}
              </button>
            )}
            <button type='submit' className={styles.primaryAction}>
              {isLastStep ? t?.actions?.confirm : t?.actions?.continue}
              <ArrowIcon />
            </button>
          </div>
        </form>

        <aside className={styles.summary} aria-label={t?.summary?.title}>
          <h2 className={styles.summaryTitle}>{t?.summary?.title}</h2>
          {!sport ? (
            <p className={styles.summaryEmpty}>{t?.summary?.empty}</p>
          ) : (
            <>
              <p className={styles.summaryHero}>
                <span className={styles.summaryHeroIcon} aria-hidden='true'>
                  <SportIcon sportId={sport.id} />
                </span>
                {t?.sports?.[sport.id]?.name}
              </p>
              <dl className={styles.summaryList}>
                <div className={styles.summaryRow}>
                  <dt>{t?.summary?.venue}</dt>
                  <dd>{venue ? venueLabel(venue) : t?.summary?.pending}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>{t?.summary?.when}</dt>
                  <dd>
                    {dateISO
                      ? `${formats.full.format(fromISODate(dateISO))}${time ? ` · ${time}` : ''}`
                      : t?.summary?.pending}
                  </dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>{t?.summary?.squad}</dt>
                  <dd>
                    {totalPlayers}{' '}
                    {totalPlayers === 1 ? t?.squad?.person : t?.squad?.people}
                  </dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>{t?.summary?.duration}</dt>
                  <dd>
                    {fill(t?.summary?.minutes ?? '', {
                      minutes: sport.durationMinutes,
                    })}
                  </dd>
                </div>
              </dl>
              <p className={styles.summaryTotal}>
                <span>{t?.summary?.total}</span>
                <strong>{formats.price.format(totalPrice)}</strong>
              </p>
              <p className={styles.summaryNote}>
                {fill(t?.summary?.perPlayerNote ?? '', {
                  price: formats.price.format(sport.pricePerPlayer),
                })}
              </p>
            </>
          )}
        </aside>
      </div>

      <p className='sr-only' aria-live='polite'>
        {announcement}
      </p>
    </section>
  );
};
