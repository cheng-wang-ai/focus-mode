import * as vscode from 'vscode';

export interface I18nStrings {
    learningLabel: string;
    productivityLabel: string;
    learningShort: string;
    productivityShort: string;
    learningTooltip: string;
    productivityTooltip: string;
    switchedGlobal: string;      // contains {0} placeholder
    noFileOpen: string;
    pickTitle: string;           // contains {0} placeholder
    pickPlaceholder: string;
    learningPickLabel: string;
    learningPickDesc: string;
    productivityPickLabel: string;
    productivityPickDesc: string;
    followGlobalLabel: string;
    followGlobalDescYes: string;
    followGlobalDescNo: string;
    resetDone: string;           // contains {0} placeholder
    setDone: string;             // contains {0} and {1} placeholders
}

/** Replace `{0}`, `{1}`, … placeholders in a string. */
export function fmt(template: string, ...args: string[]): string {
    return template.replace(/\{(\d+)\}/g, (_, i) => args[Number(i)] ?? '');
}

const strings: Record<string, I18nStrings> = {
    en: {
        learningLabel: '🎓 Learning Mode',
        productivityLabel: '⚡ Productivity Mode',
        learningShort: '🎓 Learning',
        productivityShort: '⚡ Productivity',
        learningTooltip: 'Learning Mode: autocomplete disabled\nClick to toggle global mode',
        productivityTooltip: 'Productivity Mode: autocomplete enabled\nClick to toggle global mode',
        switchedGlobal: 'Switched to {0} (global)',
        noFileOpen: 'Focus Mode: please open a file first',
        pickTitle: 'Set mode for "{0}"',
        pickPlaceholder: 'Choose autocomplete mode for this language',
        learningPickLabel: '🎓 Learning Mode',
        learningPickDesc: 'Disable autocomplete for this language',
        productivityPickLabel: '⚡ Productivity Mode',
        productivityPickDesc: 'Enable autocomplete for this language',
        followGlobalLabel: '↩ Follow Global Mode',
        followGlobalDescYes: 'Remove language-specific override',
        followGlobalDescNo: '(currently following global)',
        resetDone: '{0}: reverted to global mode',
        setDone: '{0}: set to {1}',
    },
    zh: {
        learningLabel: '🎓 学习模式',
        productivityLabel: '⚡ 效率模式',
        learningShort: '🎓 学习',
        productivityShort: '⚡ 效率',
        learningTooltip: '学习模式：已关闭自动补全\n点击切换全局模式',
        productivityTooltip: '效率模式：已开启自动补全\n点击切换全局模式',
        switchedGlobal: '已切换到{0}（全局）',
        noFileOpen: 'Focus Mode：请先打开一个文件',
        pickTitle: '设置 "{0}" 的模式',
        pickPlaceholder: '选择此语言的补全模式',
        learningPickLabel: '🎓 学习模式',
        learningPickDesc: '关闭此语言的自动补全',
        productivityPickLabel: '⚡ 效率模式',
        productivityPickDesc: '开启此语言的自动补全',
        followGlobalLabel: '↩ 跟随全局模式',
        followGlobalDescYes: '移除此语言的单独设置',
        followGlobalDescNo: '（当前已跟随全局）',
        resetDone: '{0}：已恢复为全局模式',
        setDone: '{0}：已设置为{1}',
    },
    ja: {
        learningLabel: '🎓 学習モード',
        productivityLabel: '⚡ 生産性モード',
        learningShort: '🎓 学習',
        productivityShort: '⚡ 生産性',
        learningTooltip: '学習モード：自動補完が無効\nクリックでグローバルモードを切替',
        productivityTooltip: '生産性モード：自動補完が有効\nクリックでグローバルモードを切替',
        switchedGlobal: '{0}（グローバル）に切り替えました',
        noFileOpen: 'Focus Mode：まずファイルを開いてください',
        pickTitle: '"{0}" のモードを設定',
        pickPlaceholder: 'この言語の補完モードを選択',
        learningPickLabel: '🎓 学習モード',
        learningPickDesc: 'この言語の自動補完を無効にする',
        productivityPickLabel: '⚡ 生産性モード',
        productivityPickDesc: 'この言語の自動補完を有効にする',
        followGlobalLabel: '↩ グローバルモードに従う',
        followGlobalDescYes: 'この言語の個別設定を削除する',
        followGlobalDescNo: '（現在グローバルに従っています）',
        resetDone: '{0}：グローバルモードに戻しました',
        setDone: '{0}：{1} に設定しました',
    },
    ko: {
        learningLabel: '🎓 학습 모드',
        productivityLabel: '⚡ 생산성 모드',
        learningShort: '🎓 학습',
        productivityShort: '⚡ 생산성',
        learningTooltip: '학습 모드: 자동 완성 비활성화\n클릭하여 전역 모드 전환',
        productivityTooltip: '생산성 모드: 자동 완성 활성화\n클릭하여 전역 모드 전환',
        switchedGlobal: '{0}(으)로 전환되었습니다 (전역)',
        noFileOpen: 'Focus Mode: 먼저 파일을 열어주세요',
        pickTitle: '"{0}" 모드 설정',
        pickPlaceholder: '이 언어의 자동 완성 모드 선택',
        learningPickLabel: '🎓 학습 모드',
        learningPickDesc: '이 언어의 자동 완성 비활성화',
        productivityPickLabel: '⚡ 생산성 모드',
        productivityPickDesc: '이 언어의 자동 완성 활성화',
        followGlobalLabel: '↩ 전역 모드 따르기',
        followGlobalDescYes: '이 언어의 개별 설정 제거',
        followGlobalDescNo: '(현재 전역을 따르고 있음)',
        resetDone: '{0}: 전역 모드로 복원되었습니다',
        setDone: '{0}: {1}(으)로 설정되었습니다',
    },
    fr: {
        learningLabel: '🎓 Mode Apprentissage',
        productivityLabel: '⚡ Mode Productivité',
        learningShort: '🎓 Apprentissage',
        productivityShort: '⚡ Productivité',
        learningTooltip: 'Mode Apprentissage : saisie semi-automatique désactivée\nCliquer pour basculer le mode global',
        productivityTooltip: 'Mode Productivité : saisie semi-automatique activée\nCliquer pour basculer le mode global',
        switchedGlobal: 'Basculé vers {0} (global)',
        noFileOpen: "Focus Mode : veuillez d'abord ouvrir un fichier",
        pickTitle: 'Définir le mode pour "{0}"',
        pickPlaceholder: 'Choisir le mode de saisie pour ce langage',
        learningPickLabel: '🎓 Mode Apprentissage',
        learningPickDesc: 'Désactiver la saisie semi-automatique pour ce langage',
        productivityPickLabel: '⚡ Mode Productivité',
        productivityPickDesc: 'Activer la saisie semi-automatique pour ce langage',
        followGlobalLabel: '↩ Suivre le mode global',
        followGlobalDescYes: 'Supprimer le paramètre spécifique à ce langage',
        followGlobalDescNo: '(suit actuellement le mode global)',
        resetDone: '{0} : rétabli au mode global',
        setDone: '{0} : défini sur {1}',
    },
    de: {
        learningLabel: '🎓 Lernmodus',
        productivityLabel: '⚡ Produktivitätsmodus',
        learningShort: '🎓 Lernen',
        productivityShort: '⚡ Produktivität',
        learningTooltip: 'Lernmodus: Autovervollständigung deaktiviert\nKlicken zum Umschalten des globalen Modus',
        productivityTooltip: 'Produktivitätsmodus: Autovervollständigung aktiviert\nKlicken zum Umschalten des globalen Modus',
        switchedGlobal: 'Zu {0} gewechselt (global)',
        noFileOpen: 'Focus Mode: Bitte zuerst eine Datei öffnen',
        pickTitle: 'Modus für "{0}" festlegen',
        pickPlaceholder: 'Vervollständigungsmodus für diese Sprache wählen',
        learningPickLabel: '🎓 Lernmodus',
        learningPickDesc: 'Autovervollständigung für diese Sprache deaktivieren',
        productivityPickLabel: '⚡ Produktivitätsmodus',
        productivityPickDesc: 'Autovervollständigung für diese Sprache aktivieren',
        followGlobalLabel: '↩ Globalen Modus übernehmen',
        followGlobalDescYes: 'Sprachspezifische Einstellung entfernen',
        followGlobalDescNo: '(folgt derzeit dem globalen Modus)',
        resetDone: '{0}: Globaler Modus wiederhergestellt',
        setDone: '{0}: auf {1} gesetzt',
    },
    es: {
        learningLabel: '🎓 Modo Aprendizaje',
        productivityLabel: '⚡ Modo Productividad',
        learningShort: '🎓 Aprendizaje',
        productivityShort: '⚡ Productividad',
        learningTooltip: 'Modo Aprendizaje: autocompletar desactivado\nHaga clic para cambiar el modo global',
        productivityTooltip: 'Modo Productividad: autocompletar activado\nHaga clic para cambiar el modo global',
        switchedGlobal: 'Cambiado a {0} (global)',
        noFileOpen: 'Focus Mode: por favor abra un archivo primero',
        pickTitle: 'Establecer modo para "{0}"',
        pickPlaceholder: 'Elija el modo de autocompletar para este lenguaje',
        learningPickLabel: '🎓 Modo Aprendizaje',
        learningPickDesc: 'Desactivar autocompletar para este lenguaje',
        productivityPickLabel: '⚡ Modo Productividad',
        productivityPickDesc: 'Activar autocompletar para este lenguaje',
        followGlobalLabel: '↩ Seguir modo global',
        followGlobalDescYes: 'Eliminar configuración específica de este lenguaje',
        followGlobalDescNo: '(siguiendo el modo global actualmente)',
        resetDone: '{0}: restablecido al modo global',
        setDone: '{0}: establecido en {1}',
    },
    pt: {
        learningLabel: '🎓 Modo Aprendizado',
        productivityLabel: '⚡ Modo Produtividade',
        learningShort: '🎓 Aprendizado',
        productivityShort: '⚡ Produtividade',
        learningTooltip: 'Modo Aprendizado: preenchimento automático desativado\nClique para alternar o modo global',
        productivityTooltip: 'Modo Produtividade: preenchimento automático ativado\nClique para alternar o modo global',
        switchedGlobal: 'Alternado para {0} (global)',
        noFileOpen: 'Focus Mode: por favor abra um arquivo primeiro',
        pickTitle: 'Definir modo para "{0}"',
        pickPlaceholder: 'Escolha o modo de preenchimento automático para este idioma',
        learningPickLabel: '🎓 Modo Aprendizado',
        learningPickDesc: 'Desativar preenchimento automático para este idioma',
        productivityPickLabel: '⚡ Modo Produtividade',
        productivityPickDesc: 'Ativar preenchimento automático para este idioma',
        followGlobalLabel: '↩ Seguir modo global',
        followGlobalDescYes: 'Remover configuração específica deste idioma',
        followGlobalDescNo: '(seguindo o modo global atualmente)',
        resetDone: '{0}: revertido ao modo global',
        setDone: '{0}: definido como {1}',
    },
    ru: {
        learningLabel: '🎓 Режим обучения',
        productivityLabel: '⚡ Режим продуктивности',
        learningShort: '🎓 Обучение',
        productivityShort: '⚡ Продуктивность',
        learningTooltip: 'Режим обучения: автодополнение отключено\nНажмите для переключения глобального режима',
        productivityTooltip: 'Режим продуктивности: автодополнение включено\nНажмите для переключения глобального режима',
        switchedGlobal: 'Переключено на {0} (глобально)',
        noFileOpen: 'Focus Mode: сначала откройте файл',
        pickTitle: 'Установить режим для "{0}"',
        pickPlaceholder: 'Выберите режим автодополнения для этого языка',
        learningPickLabel: '🎓 Режим обучения',
        learningPickDesc: 'Отключить автодополнение для этого языка',
        productivityPickLabel: '⚡ Режим продуктивности',
        productivityPickDesc: 'Включить автодополнение для этого языка',
        followGlobalLabel: '↩ Следовать глобальному режиму',
        followGlobalDescYes: 'Удалить настройки для этого языка',
        followGlobalDescNo: '(в данный момент следует глобальному)',
        resetDone: '{0}: возвращено в глобальный режим',
        setDone: '{0}: установлено на {1}',
    },
};

/**
 * Returns the i18n string table for the current VS Code display language.
 * Falls back to English if the locale is not supported.
 */
export function getStrings(): I18nStrings {
    const locale = vscode.env.language.toLowerCase();  // e.g. "zh-cn", "ja", "en-us"
    if (locale.startsWith('zh')) { return strings.zh; }
    if (locale.startsWith('ja')) { return strings.ja; }
    if (locale.startsWith('ko')) { return strings.ko; }
    if (locale.startsWith('fr')) { return strings.fr; }
    if (locale.startsWith('de')) { return strings.de; }
    if (locale.startsWith('es')) { return strings.es; }
    if (locale.startsWith('pt')) { return strings.pt; }
    if (locale.startsWith('ru')) { return strings.ru; }
    return strings.en;
}
