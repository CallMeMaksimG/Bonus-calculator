# Правила работы с двумя GitHub-аккаунтами

## Аккаунты и ключи

| Аккаунт           | Назначение | SSH-ключ            | Алиас в ~/.ssh/config              |
| ----------------- | ---------- | ------------------- | ---------------------------------- |
| `sellergruppagit` | Рабочий    | `id_work_ed25519`   | `github.com` (дефолт), `github.com-work` |
| `CallMeMaksimG`   | Личный     | `id_ed25519`        | `github.com-personal`              |
| `sellerchina`     | Ещё один   | `id_sellerchina`    | `github-sellerchina`               |

> ⚠️ Обычный адрес `git@github.com:...` по умолчанию использует РАБОЧИЙ ключ
> → логин как `sellergruppagit`. Для личных репо это даёт отказ в push.

## Проверить, под кем я сейчас

```bash
ssh -T git@github.com-personal    # → Hi CallMeMaksimG!
ssh -T git@github.com             # → Hi sellergruppagit!
```

## Клонирование под нужным аккаунтом

Подставь алиас вместо github.com:

```bash
# Личный (CallMeMaksimG):
git clone git@github.com-personal:CallMeMaksimG/РЕПО.git

# Рабочий (sellergruppagit):
git clone git@github.com:sellergruppagit/РЕПО.git
```

## Исправить уже существующий репозиторий (push отклоняется)

```bash
git remote -v                                                       # текущий адрес
git remote set-url origin git@github.com-personal:CallMeMaksimG/РЕПО.git
ssh -T git@github.com-personal                                      # проверка: Hi CallMeMaksimG!
git push
```

## Email/имя под нужный аккаунт (в каждом личном репо)

```bash
git config user.email "личный_email@пример.com"
git config user.name "CallMeMaksimG"
```

Email должен быть привязан к аккаунту в настройках GitHub, иначе коммиты
не засчитываются в профиль.
