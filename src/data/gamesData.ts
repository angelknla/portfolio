import type { AvailableLanguages } from './dropdownData';

export const gamesData: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    common: {
      notFound: 'Game not found.',
      backToGames: '← Back to games',
      touchControls: 'Touch Controls',
      keyboardControls: 'Keyboard Controls',
      touchControl: 'Touch Control',
      keyboardControl: 'Keyboard Control',
      howToPlay: '📋 How to Play',
      startGame: 'Start Game',
      playAgain: 'Play Again',
      gameOver: 'Game Over!',
      tapToRestart: 'Tap to restart',
      pressToRestart: 'Press SPACE or click to restart',
      level: 'Level',
      score: 'Score',
      finalScore: 'Final Score',
    },
    balloon: {
      title: '🎈 Balloon Flight',
      distance: 'Distance',
      blowButton: '💨 BLOW',
      blowAriaLabel: 'Blow balloon',
      instructions: {
        controls: {
          title: 'Controls',
          textMobile: 'Hold the button to blow the balloon up',
          textDesktop: 'Hold SPACE to blow the balloon up',
        },
        physics: {
          title: 'Physics',
          text: 'Release to let gravity pull the balloon down',
        },
        avoid: {
          title: 'Avoid',
          text: "Don't touch the walls or the brown obstacles",
        },
        goal: {
          title: 'Goal',
          text: 'Reach the flag at the end of each level to advance',
        },
      },
      startTextMobile: 'Hold the button below to blow the balloon up',
      startTextDesktop: 'Hold SPACE to blow the balloon up',
      victoryTitle: '🎉 You Win!',
      victoryText: 'You reached the goal!',
    },
    doroteyo: {
      title: '⭐ Doroteyo',
      planets: 'Planets',
      shootButton: '⭐ SHOOT',
      moveLeftAria: 'Move Left',
      moveRightAria: 'Move Right',
      shootAria: 'Shoot',
      instructions: {
        objective: {
          title: 'Objective',
          text: 'Destroy all planets to complete each level',
        },
        shooting: {
          title: 'Shooting',
          text: 'Fire stars at planets to make them split apart',
        },
        splitting: {
          title: 'Planet Splitting',
          text: 'Large planets split into 2 medium, medium into 2 small, then destroyed',
        },
        powerUp: {
          title: 'Power-Up',
          text: 'When you destroy a small planet, transform into a powered-up girl for 5 seconds with faster, stronger shots',
        },
        health: {
          title: 'Health',
          text: 'You have 3 lives. Avoid getting hit by bouncing planets!',
        },
        levels: {
          title: 'Levels',
          text: 'Complete Level 1 to unlock Level 2. Your health is restored between levels!',
        },
      },
      startTextMobile: 'Use buttons to move and shoot stars at planets!',
      startTextDesktop: 'Arrow keys to move, SPACE to shoot stars at planets!',
      levelTwoLabel: 'Level 2',
      getReady: 'Get Ready!',
      victoryTitle: '🎉 Victory!',
      victoryText: 'All planets destroyed!',
      tapHint: '💡 Tip: Tap the play area to shoot!',
    },
    mario: {
      title: '🍄 Super Mario Platform',
      coins: 'Coins',
      moveLeftAria: 'Move Left',
      moveRightAria: 'Move Right',
      jumpAria: 'Jump',
      instructions: {
        move: {
          title: 'Move',
          textMobile: 'Tap ← → to run left and right',
          textDesktop: 'Arrow keys ← → to run left and right',
        },
        jump: {
          title: 'Jump',
          textMobile: 'Tap ↑ to jump onto platforms',
          textDesktop: 'Arrow key ↑ or SPACE to jump onto platforms',
        },
        coins: {
          title: 'Coins',
          text: 'Collect all coins to complete the level',
        },
        levels: {
          title: 'Levels',
          text: 'Clear both levels to win the game',
        },
      },
      startTextMobile: 'Use the buttons below to move and jump',
      startTextDesktop: 'Use arrow keys to move and jump (or SPACE to jump)',
      victoryTitle: '🎉 You Win!',
      victoryText: 'All coins collected!',
    },
    snake: {
      title: '🐍 Snake Game',
      length: 'Length',
      moveUpAria: 'Move up',
      moveLeftAria: 'Move left',
      moveDownAria: 'Move down',
      moveRightAria: 'Move right',
      instructions: {
        controls: {
          title: 'Controls',
          textMobile:
            'Tap the arrow buttons below to move the snake in any direction',
          textDesktop:
            'Use arrow keys (↑ ↓ ← →) to move the snake in any direction',
        },
        objective: {
          title: 'Objective',
          text: 'Eat the red food to grow longer and increase your score',
        },
        avoid: {
          title: 'Avoid',
          text: "Don't hit the walls or run into yourself!",
        },
        scoring: {
          title: 'Scoring',
          text: 'Each food gives you +10 points. How long can you survive?',
        },
        proTip: {
          title: 'Pro Tip',
          text: 'Plan your moves ahead! The snake speeds up as you get longer',
        },
      },
      startTextMobile: 'Tap the buttons below to control the snake',
      startTextDesktop: 'Use arrow keys to control the snake',
    },
  },
  spanish: {
    common: {
      notFound: 'Juego no encontrado.',
      backToGames: '← Volver a los juegos',
      touchControls: 'Controles Táctiles',
      keyboardControls: 'Controles de Teclado',
      touchControl: 'Control Táctil',
      keyboardControl: 'Control de Teclado',
      howToPlay: '📋 Cómo Jugar',
      startGame: 'Comenzar Juego',
      playAgain: 'Jugar de Nuevo',
      gameOver: '¡Juego Terminado!',
      tapToRestart: 'Toca para reiniciar',
      pressToRestart: 'Pulsa ESPACIO o haz clic para reiniciar',
      level: 'Nivel',
      score: 'Puntuación',
      finalScore: 'Puntuación Final',
    },
    balloon: {
      title: '🎈 Vuelo en Globo',
      distance: 'Distancia',
      blowButton: '💨 SOPLAR',
      blowAriaLabel: 'Soplar globo',
      instructions: {
        controls: {
          title: 'Controles',
          textMobile: 'Mantén pulsado el botón para inflar el globo',
          textDesktop: 'Mantén pulsado ESPACIO para inflar el globo',
        },
        physics: {
          title: 'Física',
          text: 'Suelta para dejar que la gravedad baje el globo',
        },
        avoid: {
          title: 'Evita',
          text: 'No toques las paredes ni los obstáculos marrones',
        },
        goal: {
          title: 'Meta',
          text: 'Llega a la bandera al final de cada nivel para avanzar',
        },
      },
      startTextMobile: 'Mantén pulsado el botón para inflar el globo',
      startTextDesktop: 'Mantén pulsado ESPACIO para inflar el globo',
      victoryTitle: '🎉 ¡Has Ganado!',
      victoryText: '¡Has llegado a la meta!',
    },
    doroteyo: {
      title: '⭐ Doroteyo',
      planets: 'Planetas',
      shootButton: '⭐ DISPARAR',
      moveLeftAria: 'Mover a la izquierda',
      moveRightAria: 'Mover a la derecha',
      shootAria: 'Disparar',
      instructions: {
        objective: {
          title: 'Objetivo',
          text: 'Destruye todos los planetas para completar cada nivel',
        },
        shooting: {
          title: 'Disparo',
          text: 'Dispara estrellas a los planetas para dividirlos',
        },
        splitting: {
          title: 'División de Planetas',
          text: 'Los planetas grandes se dividen en 2 medianos, los medianos en 2 pequeños y luego se destruyen',
        },
        powerUp: {
          title: 'Potenciador',
          text: 'Al destruir un planeta pequeño, te transformas durante 5 segundos en una versión potenciada con disparos más rápidos y fuertes',
        },
        health: {
          title: 'Vida',
          text: 'Tienes 3 vidas. ¡Evita que los planetas rebotando te golpeen!',
        },
        levels: {
          title: 'Niveles',
          text: 'Completa el Nivel 1 para desbloquear el Nivel 2. ¡Tu vida se restaura entre niveles!',
        },
      },
      startTextMobile:
        '¡Usa los botones para moverte y disparar estrellas a los planetas!',
      startTextDesktop:
        'Flechas para moverte, ESPACIO para disparar estrellas a los planetas!',
      levelTwoLabel: 'Nivel 2',
      getReady: '¡Prepárate!',
      victoryTitle: '🎉 ¡Victoria!',
      victoryText: '¡Todos los planetas destruidos!',
      tapHint: '💡 Consejo: ¡Toca el área de juego para disparar!',
    },
    mario: {
      title: '🍄 Plataformas de Super Mario',
      coins: 'Monedas',
      moveLeftAria: 'Mover a la izquierda',
      moveRightAria: 'Mover a la derecha',
      jumpAria: 'Saltar',
      instructions: {
        move: {
          title: 'Moverse',
          textMobile: 'Toca ← → para correr a izquierda y derecha',
          textDesktop: 'Flechas ← → para correr a izquierda y derecha',
        },
        jump: {
          title: 'Saltar',
          textMobile: 'Toca ↑ para saltar sobre las plataformas',
          textDesktop: 'Flecha ↑ o ESPACIO para saltar sobre las plataformas',
        },
        coins: {
          title: 'Monedas',
          text: 'Recoge todas las monedas para completar el nivel',
        },
        levels: {
          title: 'Niveles',
          text: 'Supera ambos niveles para ganar el juego',
        },
      },
      startTextMobile: 'Usa los botones para moverte y saltar',
      startTextDesktop:
        'Usa las flechas para moverte y saltar (o ESPACIO para saltar)',
      victoryTitle: '🎉 ¡Has Ganado!',
      victoryText: '¡Todas las monedas recogidas!',
    },
    snake: {
      title: '🐍 Juego de la Serpiente',
      length: 'Longitud',
      moveUpAria: 'Mover arriba',
      moveLeftAria: 'Mover a la izquierda',
      moveDownAria: 'Mover abajo',
      moveRightAria: 'Mover a la derecha',
      instructions: {
        controls: {
          title: 'Controles',
          textMobile:
            'Toca los botones de flecha para mover la serpiente en cualquier dirección',
          textDesktop:
            'Usa las flechas (↑ ↓ ← →) para mover la serpiente en cualquier dirección',
        },
        objective: {
          title: 'Objetivo',
          text: 'Come la comida roja para crecer y aumentar tu puntuación',
        },
        avoid: {
          title: 'Evita',
          text: '¡No choques contra las paredes ni contra ti mismo!',
        },
        scoring: {
          title: 'Puntuación',
          text: 'Cada comida te da +10 puntos. ¿Cuánto tiempo puedes sobrevivir?',
        },
        proTip: {
          title: 'Consejo',
          text: '¡Planea tus movimientos! La serpiente acelera a medida que crece',
        },
      },
      startTextMobile: 'Toca los botones para controlar la serpiente',
      startTextDesktop: 'Usa las flechas para controlar la serpiente',
    },
  },
  japanese: {
    common: {
      notFound: 'ゲームが見つかりません。',
      backToGames: '← ゲーム一覧に戻る',
      touchControls: 'タッチ操作',
      keyboardControls: 'キーボード操作',
      touchControl: 'タッチ操作',
      keyboardControl: 'キーボード操作',
      howToPlay: '📋 遊び方',
      startGame: 'ゲーム開始',
      playAgain: 'もう一度プレイ',
      gameOver: 'ゲームオーバー!',
      tapToRestart: 'タップして再開',
      pressToRestart: 'スペースキーまたはクリックで再開',
      level: 'レベル',
      score: 'スコア',
      finalScore: '最終スコア',
    },
    balloon: {
      title: '🎈 バルーンフライト',
      distance: '距離',
      blowButton: '💨 ふくらませる',
      blowAriaLabel: '風船をふくらませる',
      instructions: {
        controls: {
          title: '操作',
          textMobile: 'ボタンを押し続けて風船をふくらませる',
          textDesktop: 'スペースキーを押し続けて風船をふくらませる',
        },
        physics: {
          title: '物理',
          text: '離すと重力で風船が落ちる',
        },
        avoid: {
          title: '注意',
          text: '壁や茶色の障害物に触れないように',
        },
        goal: {
          title: 'ゴール',
          text: '各レベルの最後にある旗に到達して進もう',
        },
      },
      startTextMobile: 'ボタンを押し続けて風船をふくらませよう',
      startTextDesktop: 'スペースキーを押し続けて風船をふくらませよう',
      victoryTitle: '🎉 クリア!',
      victoryText: 'ゴールに到達しました!',
    },
    doroteyo: {
      title: '⭐ ドロテヨ',
      planets: '惑星',
      shootButton: '⭐ 発射',
      moveLeftAria: '左に移動',
      moveRightAria: '右に移動',
      shootAria: '発射',
      instructions: {
        objective: {
          title: '目的',
          text: 'すべての惑星を破壊して各レベルをクリアしよう',
        },
        shooting: {
          title: '発射',
          text: '星を惑星に発射して分裂させよう',
        },
        splitting: {
          title: '惑星の分裂',
          text: '大きい惑星は中くらいの惑星2つに、中くらいは小さい惑星2つに分裂し、最後に消滅する',
        },
        powerUp: {
          title: 'パワーアップ',
          text: '小さい惑星を破壊すると、5秒間パワーアップし、発射速度と威力が上がる',
        },
        health: {
          title: '体力',
          text: 'ライフは3つ。跳ね返る惑星に当たらないように注意しよう!',
        },
        levels: {
          title: 'レベル',
          text: 'レベル1をクリアするとレベル2が解放される。レベル間で体力が回復する!',
        },
      },
      startTextMobile: 'ボタンで移動し、惑星に星を発射しよう!',
      startTextDesktop: '矢印キーで移動、スペースキーで惑星に星を発射しよう!',
      levelTwoLabel: 'レベル2',
      getReady: '準備して!',
      victoryTitle: '🎉 勝利!',
      victoryText: 'すべての惑星を破壊しました!',
      tapHint: '💡 ヒント: プレイエリアをタップして発射しよう!',
    },
    mario: {
      title: '🍄 スーパーマリオ風プラットフォーム',
      coins: 'コイン',
      moveLeftAria: '左に移動',
      moveRightAria: '右に移動',
      jumpAria: 'ジャンプ',
      instructions: {
        move: {
          title: '移動',
          textMobile: '← → をタップして左右に走る',
          textDesktop: '矢印キー ← → で左右に走る',
        },
        jump: {
          title: 'ジャンプ',
          textMobile: '↑ をタップしてプラットフォームにジャンプ',
          textDesktop:
            '矢印キー ↑ またはスペースキーでプラットフォームにジャンプ',
        },
        coins: {
          title: 'コイン',
          text: 'すべてのコインを集めてレベルをクリアしよう',
        },
        levels: {
          title: 'レベル',
          text: '両方のレベルをクリアしてゲームに勝利しよう',
        },
      },
      startTextMobile: '下のボタンで移動とジャンプをしよう',
      startTextDesktop:
        '矢印キーで移動とジャンプ(スペースキーでもジャンプ可能)',
      victoryTitle: '🎉 クリア!',
      victoryText: 'すべてのコインを集めました!',
    },
    snake: {
      title: '🐍 スネークゲーム',
      length: '長さ',
      moveUpAria: '上に移動',
      moveLeftAria: '左に移動',
      moveDownAria: '下に移動',
      moveRightAria: '右に移動',
      instructions: {
        controls: {
          title: '操作',
          textMobile: '矢印ボタンをタップしてヘビを好きな方向に動かそう',
          textDesktop: '矢印キー(↑ ↓ ← →)でヘビを好きな方向に動かそう',
        },
        objective: {
          title: '目的',
          text: '赤い食べ物を食べて長くなり、スコアを増やそう',
        },
        avoid: {
          title: '注意',
          text: '壁や自分自身にぶつからないように!',
        },
        scoring: {
          title: 'スコア',
          text: '食べ物ごとに+10点。どこまで生き残れるか?',
        },
        proTip: {
          title: 'コツ',
          text: '先を見越して動こう! ヘビは長くなるほど速くなる',
        },
      },
      startTextMobile: 'ボタンをタップしてヘビを操作しよう',
      startTextDesktop: '矢印キーでヘビを操作しよう',
    },
  },
};
