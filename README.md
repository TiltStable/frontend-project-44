# Игры разума (JS)

[![hexlet-check](https://github.com/TiltStable/frontend-project-44/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/TiltStable/frontend-project-44/actions)

Погрузитесь в непростую экосистему JavaScript, научитесь настраивать рабочее окружение. Подружитесь с линтером (анализатором качества кода) и менеджером зависимостей npm. Поймёте, чем git отличается от GitHub, поработаете с внешними репозиториями. Получите опыт построения архитектуры полноценного приложения и написания чистого кода.

Учебный проект Хекслета: https://ru.hexlet.io/programs/frontend
Как это должно работать: https://asciinema.org/a/l40Lrk3midkLmNEOmgZErGnY7

## Стек

- JavaScript

## Требования

- Node.js не ниже 22 версии

## Установка

<!-- Опишите установку: клонирование, зависимости, переменные окружения -->

```bash
git clone https://github.com/TiltStable/frontend-project-44.git
cd frontend-project-44
```

## Использование

```bash
git clone https://github.com/TiltStable/frontend-project-44.git
cd frontend-project-44
npm ci
npm link
brain-even
```

Игра интерактивная: запускается в терминале, ответы вводятся с клавиатуры.

**Проверка на чётность** (`brain-even`): показывается случайное число. Ответьте
`yes`, если оно чётное, или `no`, если нечётное. Три верных ответа подряд —
победа; любой неверный или некорректный ввод завершает игру.

**Калькулятор** (`brain-calc`): показывается случайное выражение из операций
`+`, `-` и `*`, например `35 + 16`. Вычислите его и введите ответ.

**НОД** (`brain-gcd`): показываются два случайных числа, например `25 50`.
Введите их наибольший общий делитель.

**Арифметическая прогрессия** (`brain-progression`): показывается прогрессия
из 10 чисел, в которой одно заменено точками `..`. Введите пропущенное число.

**Простое ли число?** (`brain-prime`): показывается случайное число. Ответьте
`yes`, если оно простое, или `no`, если нет.

Команда `brain-games` показывает приветствие.

[![asciicast](https://asciinema.org/a/L5zCSWMtSf86EVWF.svg)](https://asciinema.org/a/L5zCSWMtSf86EVWF)

[![asciicast](https://asciinema.org/a/vK2PdsFhp8ldlRfW.svg)](https://asciinema.org/a/vK2PdsFhp8ldlRfW)

[![asciicast](https://asciinema.org/a/09tipQIUlqHfgFjz.svg)](https://asciinema.org/a/09tipQIUlqHfgFjz)

[![asciicast](https://asciinema.org/a/oXc8POKwHLvLMStA.svg)](https://asciinema.org/a/oXc8POKwHLvLMStA)

[![asciicast](https://asciinema.org/a/QVjXMp7CvL0t9q04.svg)](https://asciinema.org/a/QVjXMp7CvL0t9q04)

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
