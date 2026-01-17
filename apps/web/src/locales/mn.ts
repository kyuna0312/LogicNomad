/**
 * Mongolian language translations
 */

export const translations = {
  // Navigation
  home: 'Нүүр',
  levels: 'Түвшин',
  tutorial: 'Заавар',
  about: 'Тухай',

  // Game
  start: 'Эхлэх',
  reset: 'Дахин эхлэх',
  execute: 'Алгоритм ажиллуулах',
  pause: 'Зогсоох',
  resume: 'Үргэлжлүүлэх',

  // Flowgraph
  addNode: 'Node нэмэх',
  deleteNode: 'Node устгах',
  connectNodes: 'Node холбох',
  validate: 'Шалгах',

  // Node types
  nodeStart: 'Эхлэх',
  nodeAction: 'Үйлдэл',
  nodeCondition: 'Нөхцөл',
  nodeLoop: 'Давталт',
  nodeEnd: 'Дуусах',

  // Actions
  actionMove: 'Урагш яв',
  actionTurnLeft: 'Зүүн эргэх',
  actionTurnRight: 'Баруун эргэх',
  actionWait: 'Хүлээх',

  // Messages
  success: 'Амжилттай! 🎉',
  failed: 'Алдаа гарлаа',
  levelComplete: 'Түвшин дууссан!',
  algorithmValid: 'Алгоритм зөв байна',
  algorithmInvalid: 'Алгоритмд алдаа байна',
  maxStepsExceeded: 'Хэт олон алхам хийсэн',
  infiniteLoop: 'Хязгааргүй давталт илэрсэн',

  // Levels
  level1: 'Түвшин 1: Эхлэл',
  level2: 'Түвшин 2: Энгийн хөдөлгөөн',
  level3: 'Түвшин 3: Эргэх',
  level4: 'Түвшин 4: Давталт',

  // Tutorial
  tutorialTitle: 'Хэрхэн тоглох вэ?',
  tutorialStep1: '1. Түвшинг сонгоно уу',
  tutorialStep2: '2. Flowchart ашиглан алгоритм зохионо уу',
  tutorialStep3: '3. "Алгоритм ажиллуулах" товч дараад үр дүнг харна уу',
  tutorialStep4: '4. Алдаа гарвал засварлаж дахин оролдоно уу',

  // Game state
  stepCount: 'Алхам',
  position: 'Байрлал',
  direction: 'Чиглэл',
  goal: 'Зорилго',
} as const;

export type TranslationKey = keyof typeof translations;
