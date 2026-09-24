import type { AvailableLanguages } from './dropdownData';

export type SportFormat = 'team' | 'players';

export type Venue = 'indoor' | 'outdoor';

export type VenueFilter = 'all' | Venue;

export type Sport = {
  id: string;
  format: SportFormat;
  /** Venues this sport can be booked at. */
  venues: Venue[];
  /** Players per side, for `team` sports. */
  teamSizes?: number[];
  /** Substitutes a `team` booking can add on top of both sides. */
  maxSubs?: number;
  /** Bounds for `players` sports. */
  minPlayers?: number;
  maxPlayers?: number;
  durationMinutes: number;
  pricePerPlayer: number;
};

export const sports: Sport[] = [
  {
    id: 'football',
    format: 'team',
    venues: ['outdoor', 'indoor'],
    teamSizes: [5, 7, 11],
    maxSubs: 6,
    durationMinutes: 60,
    pricePerPlayer: 8,
  },
  {
    id: 'basketball',
    format: 'team',
    venues: ['indoor'],
    teamSizes: [3, 5],
    maxSubs: 4,
    durationMinutes: 60,
    pricePerPlayer: 7,
  },
  {
    id: 'volleyball',
    format: 'team',
    venues: ['indoor', 'outdoor'],
    teamSizes: [4, 6],
    maxSubs: 4,
    durationMinutes: 60,
    pricePerPlayer: 7,
  },
  {
    id: 'padel',
    format: 'players',
    venues: ['indoor', 'outdoor'],
    minPlayers: 2,
    maxPlayers: 4,
    durationMinutes: 90,
    pricePerPlayer: 12,
  },
  {
    id: 'climbing',
    format: 'players',
    venues: ['indoor'],
    minPlayers: 1,
    maxPlayers: 6,
    durationMinutes: 120,
    pricePerPlayer: 15,
  },
  {
    id: 'yoga',
    format: 'players',
    venues: ['indoor'],
    minPlayers: 1,
    maxPlayers: 8,
    durationMinutes: 75,
    pricePerPlayer: 14,
  },
];

export type SlotGroupId = 'morning' | 'afternoon' | 'evening';

export const slotGroups: { id: SlotGroupId; times: string[] }[] = [
  { id: 'morning', times: ['07:00', '08:00', '09:00', '10:00'] },
  { id: 'afternoon', times: ['12:00', '13:00', '14:00', '16:00'] },
  { id: 'evening', times: ['18:00', '19:00', '20:00', '21:00'] },
];

/** How many days ahead the date rail offers. */
export const bookingWindowDays = 14;

export const sportsData: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    locale: 'en-GB',
    page: {
      eyebrow: 'Courts · pitches · studios',
      title: 'Book your next session',
      subtitle:
        'Indoor or outdoor, pick a sport, grab a free slot and tell us how many of you are coming. Three steps, no account needed.',
    },
    steps: {
      sport: 'Sport',
      when: 'Date & time',
      squad: 'Your squad',
    },
    stepOf: 'Step {current} of {total}',
    stepStatus: 'Step {current} of {total}: {label}',
    venue: {
      filterLegend: 'Where do you want to play?',
      all: 'Anywhere',
      indoor: 'Indoor',
      outdoor: 'Outdoor',
      legend: 'Indoor or outdoor?',
      hint: 'Indoor courts are heated and available all year.',
      indoorOnly: 'Indoor only',
      outdoorOnly: 'Outdoor only',
      both: 'Indoor & outdoor',
      indoorMeta: 'Heated hall, all year',
      outdoorMeta: 'Open air, floodlit',
      noResults: 'No sports available there yet — try another venue.',
    },
    sport: {
      legend: 'Choose a sport',
      hint: 'Every venue is indoor or floodlit, so rain is never a problem.',
      teamBadge: 'Team game',
      playersBadge: 'Up to {max} players',
      perPlayer: '{price} per player',
      selected: 'Selected',
    },
    date: {
      legend: 'Pick a date',
      hint: 'The next {days} days are open for booking. Scroll for more dates.',
      today: 'Today',
      tomorrow: 'Tomorrow',
      loading: 'Loading available dates…',
    },
    time: {
      legend: 'Pick a time slot',
      hint: 'Sessions last {minutes} minutes. Only free slots can be selected.',
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
      full: 'Fully booked',
      past: 'Already started',
      spotsLeft: '{count} spots left',
      lastSpot: 'Last spot',
      selectDateFirst: 'Pick a date to see the available slots.',
    },
    squad: {
      teamLegend: 'How big is each team?',
      teamHint:
        'We field both sides, so a {size}-a-side game is {total} players.',
      aSide: '{size}-a-side',
      aSideTotal: '{total} players',
      subsLegend: 'Substitutes',
      subsHint: 'Optional. Subs share the pitch fee too.',
      playersLegend: 'How many players?',
      playersHint: 'Between {min} and {max} people per session.',
      decrease: 'One fewer',
      increase: 'One more',
      playersLabel: 'Number of players',
      subsLabel: 'Number of substitutes',
      people: 'people',
      person: 'person',
    },
    summary: {
      title: 'Your session',
      empty: 'Nothing picked yet — start by choosing a sport.',
      sport: 'Sport',
      venue: 'Venue',
      when: 'When',
      squad: 'Squad',
      duration: 'Duration',
      total: 'Total',
      minutes: '{minutes} min',
      perPlayerNote: '{price} per player',
      pending: 'To be chosen',
    },
    actions: {
      back: 'Back',
      continue: 'Continue',
      confirm: 'Confirm booking',
      another: 'Book another session',
      calendar: 'Add to calendar',
    },
    errors: {
      sport: 'Choose a sport to continue.',
      venue: 'Choose an indoor or outdoor venue.',
      date: 'Pick a date for your session.',
      time: 'Pick a free time slot for your session.',
    },
    success: {
      title: 'You are booked in!',
      body: '{sport} {venue} on {date} at {time}, {squad} players. We have emailed the team captain the details.',
      reference: 'Booking reference',
    },
    sports: {
      football: { name: 'Football', tagline: 'Floodlit 3G pitches' },
      basketball: { name: 'Basketball', tagline: 'Indoor sprung court' },
      volleyball: { name: 'Volleyball', tagline: 'Sand and indoor courts' },
      padel: { name: 'Padel', tagline: 'Glass-back panoramic courts' },
      climbing: {
        name: 'Climbing',
        tagline: 'Bouldering wall, shoes included',
      },
      yoga: { name: 'Yoga', tagline: 'Small guided studio classes' },
    },
  },
  spanish: {
    locale: 'es-ES',
    page: {
      eyebrow: 'Pistas · campos · estudios',
      title: 'Reserva tu próxima sesión',
      subtitle:
        'En interior o al aire libre: elige un deporte, coge un hueco libre y dinos cuántos venís. Tres pasos y sin registro.',
    },
    steps: {
      sport: 'Deporte',
      when: 'Fecha y hora',
      squad: 'Tu equipo',
    },
    stepOf: 'Paso {current} de {total}',
    stepStatus: 'Paso {current} de {total}: {label}',
    venue: {
      filterLegend: '¿Dónde quieres jugar?',
      all: 'En cualquier sitio',
      indoor: 'Interior',
      outdoor: 'Exterior',
      legend: '¿Interior o exterior?',
      hint: 'Las pistas de interior están climatizadas y abren todo el año.',
      indoorOnly: 'Solo interior',
      outdoorOnly: 'Solo exterior',
      both: 'Interior y exterior',
      indoorMeta: 'Pabellón climatizado',
      outdoorMeta: 'Aire libre, iluminado',
      noResults: 'Aún no hay deportes ahí: prueba otra opción.',
    },
    sport: {
      legend: 'Elige un deporte',
      hint: 'Todas las instalaciones son cubiertas o iluminadas: la lluvia nunca es un problema.',
      teamBadge: 'Por equipos',
      playersBadge: 'Hasta {max} jugadores',
      perPlayer: '{price} por jugador',
      selected: 'Seleccionado',
    },
    date: {
      legend: 'Elige una fecha',
      hint: 'Puedes reservar los próximos {days} días. Desliza para ver más fechas.',
      today: 'Hoy',
      tomorrow: 'Mañana',
      loading: 'Cargando fechas disponibles…',
    },
    time: {
      legend: 'Elige una hora',
      hint: 'Las sesiones duran {minutes} minutos. Solo puedes elegir huecos libres.',
      morning: 'Mañana',
      afternoon: 'Tarde',
      evening: 'Noche',
      full: 'Completo',
      past: 'Ya ha empezado',
      spotsLeft: 'Quedan {count} plazas',
      lastSpot: 'Última plaza',
      selectDateFirst: 'Elige una fecha para ver los huecos disponibles.',
    },
    squad: {
      teamLegend: '¿De cuántos es cada equipo?',
      teamHint:
        'Montamos los dos equipos, así que un {size} contra {size} son {total} jugadores.',
      aSide: '{size} contra {size}',
      aSideTotal: '{total} jugadores',
      subsLegend: 'Suplentes',
      subsHint: 'Opcional. Los suplentes también comparten el coste.',
      playersLegend: '¿Cuántos jugadores?',
      playersHint: 'Entre {min} y {max} personas por sesión.',
      decrease: 'Uno menos',
      increase: 'Uno más',
      playersLabel: 'Número de jugadores',
      subsLabel: 'Número de suplentes',
      people: 'personas',
      person: 'persona',
    },
    summary: {
      title: 'Tu sesión',
      empty: 'Aún no has elegido nada: empieza por el deporte.',
      sport: 'Deporte',
      venue: 'Instalación',
      when: 'Cuándo',
      squad: 'Equipo',
      duration: 'Duración',
      total: 'Total',
      minutes: '{minutes} min',
      perPlayerNote: '{price} por jugador',
      pending: 'Por elegir',
    },
    actions: {
      back: 'Atrás',
      continue: 'Continuar',
      confirm: 'Confirmar reserva',
      another: 'Reservar otra sesión',
      calendar: 'Añadir al calendario',
    },
    errors: {
      sport: 'Elige un deporte para continuar.',
      venue: 'Elige instalación interior o exterior.',
      date: 'Elige la fecha de tu sesión.',
      time: 'Elige un hueco libre para tu sesión.',
    },
    success: {
      title: '¡Reserva confirmada!',
      body: '{sport} {venue} el {date} a las {time}, {squad} jugadores. Hemos enviado los detalles al capitán por email.',
      reference: 'Referencia de la reserva',
    },
    sports: {
      football: { name: 'Fútbol', tagline: 'Césped artificial iluminado' },
      basketball: { name: 'Baloncesto', tagline: 'Pista cubierta de parqué' },
      volleyball: { name: 'Voleibol', tagline: 'Pistas de arena y cubiertas' },
      padel: { name: 'Pádel', tagline: 'Pistas panorámicas de cristal' },
      climbing: {
        name: 'Escalada',
        tagline: 'Rocódromo, pies de gato incluidos',
      },
      yoga: { name: 'Yoga', tagline: 'Clases guiadas en grupo reducido' },
    },
  },
  japanese: {
    locale: 'ja-JP',
    page: {
      eyebrow: 'コート・グラウンド・スタジオ',
      title: '次のセッションを予約',
      subtitle:
        '屋内でも屋外でも、スポーツを選んで空き枠を押さえ、参加人数を教えてください。3ステップ、登録不要です。',
    },
    steps: {
      sport: 'スポーツ',
      when: '日付と時間',
      squad: 'メンバー',
    },
    stepOf: 'ステップ {current} / {total}',
    stepStatus: 'ステップ {current} / {total}：{label}',
    venue: {
      filterLegend: 'どこでプレーしますか？',
      all: 'どこでも',
      indoor: '屋内',
      outdoor: '屋外',
      legend: '屋内か屋外か',
      hint: '屋内コートは空調付きで通年利用できます。',
      indoorOnly: '屋内のみ',
      outdoorOnly: '屋外のみ',
      both: '屋内・屋外',
      indoorMeta: '空調付きホール',
      outdoorMeta: '屋外・ナイター',
      noResults: '該当するスポーツがありません。別の場所をお試しください。',
    },
    sport: {
      legend: 'スポーツを選ぶ',
      hint: 'すべて屋内またはナイター設備付きなので、雨でも問題ありません。',
      teamBadge: 'チーム戦',
      playersBadge: '最大 {max} 名',
      perPlayer: '1名あたり {price}',
      selected: '選択中',
    },
    date: {
      legend: '日付を選ぶ',
      hint: '今日から {days} 日先まで予約できます。横にスクロールできます。',
      today: '今日',
      tomorrow: '明日',
      loading: '空き日程を読み込み中…',
    },
    time: {
      legend: '時間帯を選ぶ',
      hint: 'セッションは {minutes} 分です。空き枠のみ選択できます。',
      morning: '午前',
      afternoon: '午後',
      evening: '夜',
      full: '満員',
      past: '開始済み',
      spotsLeft: '残り {count} 枠',
      lastSpot: '残り1枠',
      selectDateFirst: '日付を選ぶと空き枠が表示されます。',
    },
    squad: {
      teamLegend: '1チームの人数は？',
      teamHint: '両チーム分を用意するので、{size}人制なら合計 {total} 名です。',
      aSide: '{size}人制',
      aSideTotal: '{total} 名',
      subsLegend: '控えの人数',
      subsHint: '任意です。控えの方も料金を分担します。',
      playersLegend: '参加人数は？',
      playersHint: '1回につき {min}〜{max} 名です。',
      decrease: '1人減らす',
      increase: '1人増やす',
      playersLabel: '参加人数',
      subsLabel: '控えの人数',
      people: '名',
      person: '名',
    },
    summary: {
      title: '予約内容',
      empty: 'まだ何も選ばれていません。まずスポーツを選んでください。',
      sport: 'スポーツ',
      venue: '会場',
      when: '日時',
      squad: '人数',
      duration: '所要時間',
      total: '合計',
      minutes: '{minutes} 分',
      perPlayerNote: '1名あたり {price}',
      pending: '未選択',
    },
    actions: {
      back: '戻る',
      continue: '次へ',
      confirm: '予約を確定',
      another: '別のセッションを予約',
      calendar: 'カレンダーに追加',
    },
    errors: {
      sport: 'スポーツを選んでください。',
      venue: '屋内か屋外を選んでください。',
      date: '日付を選んでください。',
      time: '空いている時間帯を選んでください。',
    },
    success: {
      title: '予約が完了しました！',
      body: '{date} {time} から {sport}（{venue}）、{squad} 名。詳細は代表者にメールでお送りしました。',
      reference: '予約番号',
    },
    sports: {
      football: { name: 'サッカー', tagline: 'ナイター付き人工芝ピッチ' },
      basketball: { name: 'バスケットボール', tagline: '屋内フロアコート' },
      volleyball: { name: 'バレーボール', tagline: 'ビーチ・屋内コート' },
      padel: { name: 'パデル', tagline: 'ガラス張りパノラマコート' },
      climbing: {
        name: 'クライミング',
        tagline: 'ボルダリング壁、シューズ込み',
      },
      yoga: { name: 'ヨガ', tagline: '少人数のスタジオクラス' },
    },
  },
};
