import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import {cors} from 'hono/cors'
import SHA256 from 'crypto-js/sha256.js'

export type Article = {
  id: string;
  title: string;
  text: string;
  author: string;
  tags: string[];
  createdAt: string; // ISO date string
  readingTimeMin?: number; // approximate reading time in minutes
  imageUrl?: string;
};

export const articles: Article[] = [
  {
    id: "1",
    title: "Введение в React и @mui/joy",
    text: `@mui/joy — это набор компонентов, которые позволяют быстро собирать приятные интерфейсы без лишней кастомизации.

Он включает в себя типовую типографику, карточки, формы, сетки и навигационные элементы, которые хорошо сочетаются между собой. Благодаря продуманной системе токенов и вариантов (variant, color, size) можно добиться выразительного дизайна без написания кастомных стилей. Это особенно полезно в учебных и прототипных проектах, когда нужно сосредоточиться на содержании, а не на бесконечной настройке CSS.

В этой статье мы кратко обсудим, как собрать стартовую страницу, где отображаются карточки статей, как работать с компонентом Typography для разных смысловых уровней текста и как без боли организовать отступы при помощи Stack. Кроме того, рассмотрим, как использовать компонент Card для визуального отделения сущностей, и добавим небольшие эффекты наведения, чтобы интерфейс казался отзывчивым.

Наконец, обратим внимание на то, как компоненты Joy дружат с React Router: кликабельные карточки, страницы деталей и хлебные крошки. Всё это позволяет собрать цельный UX с минимальными усилиями.`,
    author: "Иван Иванов",
    tags: ["React", "UI", "Joy"],
    createdAt: new Date().toISOString(),
    readingTimeMin: 9,
  },
  {
    id: "2",
    title: "State и Hooks в React",
    text: `Хуки позволяют использовать состояние и другие возможности React без написания классов. Важно уметь разбивать состояние на логичные части и держать компоненты максимально простыми.

Обычно для полей формы удобно заводить независимые useState — так проще контролировать каждое значение и валидировать его по отдельности. Например, в форме регистрации мы можем хранить логин, почту, пароль и подтверждение пароля в отдельных переменных. Это делает код более очевидным и упрощает обработку ошибок (например, если пароли не совпадают, мы подсветим оба поля и выведем понятное сообщение).

Помимо локального состояния в компонентах, стоит помнить о мемоизации колбеков (useCallback) и вычисляемых значений (useMemo), чтобы избежать лишних перерисовок. Однако не стоит злоупотреблять оптимизациями преждевременно — сначала добейтесь корректной работы интерфейса, а затем измеряйте и улучшайте производительность.

Наконец, помните о читаемости: короткие функции-обработчики, говорящие имена переменных и небольшие компоненты — залог понятной кодовой базы.`,
    author: "Петр Петров",
    tags: ["React", "Hooks"],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    readingTimeMin: 11,
  },
  {
    id: "3",
    title: "Типизация компонентов с TypeScript",
    text: `TypeScript помогает избежать множества ошибок времени выполнения, добавляя статическую типизацию в ваш React‑код. Он улучшает разработческий опыт за счет автодополнения, рефакторинга и раннего обнаружения несоответствий типов.

При описании сущностей удобно начинать с базовых типов. Например, для статьи мы можем определить поля id, title, text, author, tags и метаданные (createdAt, readingTimeMin). Это упрощает использование мок‑данных и обеспечивает единообразие в компонентах списка и деталей. Если впоследствии структура изменится, IDE подскажет места, которые нужно поправить.

Для пропсов компонентов используйте интерфейсы или типы с точными контрактами. Когда компонент становится слишком общим, разбейте его на более мелкие части или примените обобщения (generics) — так вы сохраните гибкость без потери безопасности типов. Отдельно стоит уделить внимание обработке optional‑полей и null/undefined: явные проверки делают логику надежнее.

В завершение отметим, что строгая типизация — это инвестиция в поддерживаемость проекта. Чем раньше вы формализуете модель данных и интерфейсы, тем меньше сюрпризов получите на поздних этапах разработки.`,
    author: "Светлана Смирнова",
    tags: ["TypeScript", "React"],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    readingTimeMin: 10,
  },
];


export type UserEntity = {
  id: string;
  login: string;
  role: "reader" | "writer" | "admin";
  registeredAt: string;
  passHash: string;
}

const users: UserEntity[] = [{
  id: "0",
  login: "admin",
  passHash: SHA256('admin').toString(),
  role: "admin",
  registeredAt: new Date(0).toISOString()
}, {
  id: "1",
  login: "user1",
  passHash: SHA256('password').toString(),
  role: "reader",
  registeredAt: new Date(Date.now() - 20 * 86400000).toISOString()
}, {
  id: "2",
  login: "writer1",
  role: "writer",
  passHash: SHA256('password1').toString(),
  registeredAt: new Date(Date.now() - 10 * 86400000).toISOString(),
}]

const app = new Hono()

app.use('*', cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/login', async (c) => {
  try {
    const body = await c.req.json<{ login?: string; password?: string }>()
    const {login, password} = body || {}


    if (!login || !password) {
      return c.json({error: 'login and password are required'}, 400)
    }


    const hashed = SHA256(password).toString()


    const user = users.find((u) => u.login === login && u.passHash === hashed)


    if (!user) {
      return c.json({error: 'Invalid credentials'}, 401)
    }


    const {passHash, ...userWithoutPassword} = user
    return c.json(userWithoutPassword)
  } catch (err) {
    return c.json({error: 'Invalid JSON'}, 400)
  }
})

app.post('/register', async (c) => {
  try {
    const body = await c.req.json<{ login?: string; password?: string; }>()
    const {login, password} = body || {}

    if (!login || !password) {
      return c.json({error: 'login and password are required'}, 400)
    }

    // Проверка на существующего пользователя
    const exists = users.find((u) => u.login === login)
    if (exists) {
      return c.json({error: 'User already exists'}, 409)
    }

    const newUser: UserEntity = {
      id: crypto.randomUUID(),
      login,
      role: 'reader',
      registeredAt: new Date().toISOString(),
      passHash: SHA256(password).toString(),
    }

    users.push(newUser)

    const {passHash, ...userWithoutPassword} = newUser
    return c.json(userWithoutPassword, 201)
  } catch (err) {
    return c.json({error: 'Invalid JSON'}, 400)
  }
})

app.get('/admin/users', (c) => {
  const login = c.req.header('x-user-login')

  if (!login) {
    return c.json({error: 'Unauthorized'}, 401)
  }

  const currentUser = users.find((u) => u.login === login)

  if (!currentUser) {
    return c.json({error: 'User not found'}, 404)
  }

  if (currentUser.role !== 'admin') {
    return c.json({error: 'Forbidden'}, 403)
  }

  const result = users.map(({id, login, registeredAt, role}) => ({
    id,
    login,
    registeredAt,
    role,
  }))

  return c.json(result)
})

app.post('/admin/changeRole', async (c) => {
  const adminLogin = c.req.header('x-user-login')

  if (!adminLogin) {
    return c.json({error: 'Unauthorized'}, 401)
  }

  const adminUser = users.find((u) => u.login === adminLogin)
  if (!adminUser) {
    return c.json({error: 'User not found'}, 404)
  }

  if (adminUser.role !== 'admin') {
    return c.json({error: 'Forbidden'}, 403)
  }

  try {
    const body = await c.req.json<{ id?: string; role?: UserEntity['role'] }>()
    const {id, role} = body || {}

    if (!id || !role) {
      return c.json({error: 'id and role are required'}, 400)
    }

    const user = users.find((u) => u.id === id)
    if (!user) {
      return c.json({error: 'User not found'}, 404)
    }

    user.role = role

    const {passHash, ...userWithoutPassword} = user
    return c.json(userWithoutPassword)
  } catch (err) {
    return c.json({error: 'Invalid JSON'}, 400)
  }
})

app.get('/articles', (c) => {
  return c.json(articles)
})

app.get('/articles/:id', (c) => {
  const id = c.req.param('id')
  const article = articles.find((a) => a.id === id)

  if (!article) {
    return c.json({error: 'Article not found'}, 404)
  }

  return c.json(article)
})

app.post('/writer/createArticle', async (c) => {
  const login = c.req.header('x-user-login')

  if (!login) {
    return c.json({error: 'Unauthorized'}, 401)
  }

  const currentUser = users.find((u) => u.login === login)
  if (!currentUser) {
    return c.json({error: 'User not found'}, 404)
  }

  if (currentUser.role !== 'writer') {
    return c.json({error: 'Forbidden: only writers can create articles'}, 403)
  }

  try {
    const body = await c.req.json<{ title?: string; text?: string; tags?: string[] }>()
    const {title, text, tags} = body || {}

    if (!title || !text || !tags) {
      return c.json({error: 'title, text and tags are required'}, 400)
    }

    const newArticle: Article = {
      id: crypto.randomUUID(),
      title,
      text,
      tags,
      author: currentUser.login,
      createdAt: new Date().toISOString(),
    }

    articles.push(newArticle)

    return c.json(newArticle, 201)
  } catch (err) {
    return c.json({error: 'Invalid JSON'}, 400)
  }
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
