import type { Lang } from "./i18n";

export type Example = { id: string; name: Record<Lang, string>; code: Record<Lang, string> };

export const EXAMPLES: Example[] = [
  {
    id: "flowchart",
    name: { zh: "流程图", en: "Flowchart" },
    code: {
      zh: `flowchart TD
    A[开始] --> B{是否已登录?}
    B -- 是 --> C[进入首页]
    B -- 否 --> D[跳转登录页]
    D --> E[输入账号密码]
    E --> F{校验通过?}
    F -- 是 --> C
    F -- 否 --> E
    C --> G[结束]`,
      en: `flowchart TD
    A[Start] --> B{Logged in?}
    B -- Yes --> C[Home page]
    B -- No --> D[Login page]
    D --> E[Enter credentials]
    E --> F{Valid?}
    F -- Yes --> C
    F -- No --> E
    C --> G[End]`,
    },
  },
  {
    id: "sequence",
    name: { zh: "时序图", en: "Sequence" },
    code: {
      zh: `sequenceDiagram
    participant U as 用户
    participant W as 浏览器
    participant S as 服务器
    U->>W: 输入网址
    W->>S: 发送 HTTP 请求
    S-->>W: 返回 HTML
    W-->>U: 渲染页面
    Note over W,S: 全程使用 HTTPS`,
      en: `sequenceDiagram
    participant U as User
    participant W as Browser
    participant S as Server
    U->>W: Enter URL
    W->>S: HTTP request
    S-->>W: HTML response
    W-->>U: Render page
    Note over W,S: HTTPS all the way`,
    },
  },
  {
    id: "class",
    name: { zh: "类图", en: "Class" },
    code: {
      zh: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +fetch()
    }
    class Cat {
        +climb()
    }
    Animal <|-- Dog
    Animal <|-- Cat`,
      en: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +fetch()
    }
    class Cat {
        +climb()
    }
    Animal <|-- Dog
    Animal <|-- Cat`,
    },
  },
  {
    id: "state",
    name: { zh: "状态图", en: "State" },
    code: {
      zh: `stateDiagram-v2
    [*] --> 待支付
    待支付 --> 已支付: 付款
    待支付 --> 已取消: 超时
    已支付 --> 已发货: 发货
    已发货 --> 已完成: 确认收货
    已完成 --> [*]
    已取消 --> [*]`,
      en: `stateDiagram-v2
    [*] --> Pending
    Pending --> Paid: pay
    Pending --> Cancelled: timeout
    Paid --> Shipped: ship
    Shipped --> Done: confirm
    Done --> [*]
    Cancelled --> [*]`,
    },
  },
  {
    id: "er",
    name: { zh: "ER 图", en: "ER" },
    code: {
      zh: `erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    USER {
        int id
        string name
    }
    ORDER {
        int id
        date created_at
    }`,
      en: `erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    USER {
        int id
        string name
    }
    ORDER {
        int id
        date created_at
    }`,
    },
  },
  {
    id: "gantt",
    name: { zh: "甘特图", en: "Gantt" },
    code: {
      zh: `gantt
    title 项目计划
    dateFormat YYYY-MM-DD
    section 设计
    需求分析 :a1, 2026-01-01, 7d
    原型设计 :after a1, 5d
    section 开发
    前端开发 :2026-01-13, 14d
    后端开发 :2026-01-13, 12d
    section 发布
    测试上线 :2026-01-27, 5d`,
      en: `gantt
    title Project plan
    dateFormat YYYY-MM-DD
    section Design
    Requirements :a1, 2026-01-01, 7d
    Prototype    :after a1, 5d
    section Build
    Frontend :2026-01-13, 14d
    Backend  :2026-01-13, 12d
    section Release
    Test & launch :2026-01-27, 5d`,
    },
  },
  {
    id: "pie",
    name: { zh: "饼图", en: "Pie" },
    code: {
      zh: `pie title 浏览器份额
    "Chrome" : 65
    "Safari" : 18
    "Edge" : 8
    "Firefox" : 5
    "其他" : 4`,
      en: `pie title Browser share
    "Chrome" : 65
    "Safari" : 18
    "Edge" : 8
    "Firefox" : 5
    "Other" : 4`,
    },
  },
  {
    id: "mindmap",
    name: { zh: "思维导图", en: "Mindmap" },
    code: {
      zh: `mindmap
  root((Mermaid))
    图表类型
      流程图
      时序图
      甘特图
    特点
      文本即图表
      版本可控
    导出
      SVG
      PNG`,
      en: `mindmap
  root((Mermaid))
    Diagrams
      Flowchart
      Sequence
      Gantt
    Why
      Text as diagram
      Version control
    Export
      SVG
      PNG`,
    },
  },
];
