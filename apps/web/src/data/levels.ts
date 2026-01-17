/**
 * Puzzle levels data
 */

import type { PuzzleLevel } from '@logicnomad/engine';

export const levels: PuzzleLevel[] = [
  // Tutorial Level
  {
    id: 'tutorial',
    name: 'Заавар: Хэрхэн тоглох вэ?',
    description: 'Эхний удаа тоглож байгаа бол энэ түвшинг эхлүүлнэ үү',
    difficulty: 'easy',
    grid: [
      [
        { type: 'start', x: 0, y: 0 },
        { type: 'empty', x: 1, y: 0 },
        { type: 'goal', x: 2, y: 0 },
      ],
    ],
    startPosition: { x: 0, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 2, y: 0 },
    maxSteps: 5,
    minSteps: 2,
    hints: [
      '1. Flowchart editor дээр Start node нэмнэ үү',
      '2. Action node нэмээд "Урагш яв" сонгоно уу',
      '3. Node-уудыг холбоно уу',
      '4. "Алгоритм ажиллуулах" товч дараад үр дүнг харна уу',
    ],
    requiredActions: ['move'],
  },
  // Level 1
  {
    id: 'level-1',
    name: 'Түвшин 1: Эхлэл',
    description: 'Энгийн урагш хөдөлгөөн',
    difficulty: 'easy',
    grid: [
      [
        { type: 'start', x: 0, y: 0 },
        { type: 'empty', x: 1, y: 0 },
        { type: 'empty', x: 2, y: 0 },
        { type: 'goal', x: 3, y: 0 },
      ],
      [
        { type: 'wall', x: 0, y: 1 },
        { type: 'wall', x: 1, y: 1 },
        { type: 'wall', x: 2, y: 1 },
        { type: 'wall', x: 3, y: 1 },
      ],
    ],
    startPosition: { x: 0, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 3, y: 0 },
    maxSteps: 10,
    minSteps: 3,
    hints: ['3 удаа урагш явна уу'],
    requiredActions: ['move'],
  },
  // Level 2
  {
    id: 'level-2',
    name: 'Түвшин 2: Эргэх',
    description: 'Эргэж, дараа нь урагш яв',
    difficulty: 'easy',
    grid: [
      [
        { type: 'start', x: 0, y: 0 },
        { type: 'empty', x: 1, y: 0 },
        { type: 'wall', x: 2, y: 0 },
      ],
      [
        { type: 'wall', x: 0, y: 1 },
        { type: 'empty', x: 1, y: 1 },
        { type: 'empty', x: 2, y: 1 },
        { type: 'goal', x: 3, y: 1 },
      ],
    ],
    startPosition: { x: 0, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 3, y: 1 },
    maxSteps: 15,
    minSteps: 5,
    hints: [
      'Эхлээд баруун эргэх',
      'Дараа нь урагш яв',
      'Дахин баруун эргэх',
      'Сүүлийн урагш хөдөлгөөн',
    ],
    requiredActions: ['move', 'turnRight'],
  },
  // Level 3
  {
    id: 'level-3',
    name: 'Түвшин 3: Давталт',
    description: 'Loop ашиглан олон удаа хөдөлгөөн хийх',
    difficulty: 'easy',
    grid: [
      [
        { type: 'start', x: 0, y: 0 },
        { type: 'empty', x: 1, y: 0 },
        { type: 'empty', x: 2, y: 0 },
        { type: 'empty', x: 3, y: 0 },
        { type: 'goal', x: 4, y: 0 },
      ],
    ],
    startPosition: { x: 0, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 4, y: 0 },
    maxSteps: 15,
    minSteps: 5,
    hints: [
      'Loop node ашиглана уу',
      '4 удаа урагш явна уу',
      'Loop count = 4 гэж тохируулна уу',
    ],
    requiredActions: ['move'],
  },
  // Level 4
  {
    id: 'level-4',
    name: 'Түвшин 4: Зууван зам',
    description: 'Эргэж, дараа нь урагш яв',
    difficulty: 'medium',
    grid: [
      [
        { type: 'start', x: 0, y: 0 },
        { type: 'empty', x: 1, y: 0 },
        { type: 'empty', x: 2, y: 0 },
        { type: 'empty', x: 3, y: 0 },
      ],
      [
        { type: 'wall', x: 0, y: 1 },
        { type: 'empty', x: 1, y: 1 },
        { type: 'wall', x: 2, y: 1 },
        { type: 'empty', x: 3, y: 1 },
        { type: 'goal', x: 4, y: 1 },
      ],
      [
        { type: 'wall', x: 0, y: 2 },
        { type: 'empty', x: 1, y: 2 },
        { type: 'empty', x: 2, y: 2 },
        { type: 'empty', x: 3, y: 2 },
      ],
    ],
    startPosition: { x: 0, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 4, y: 1 },
    maxSteps: 20,
    minSteps: 8,
    hints: [
      'Эхлээд урагш яв',
      'Баруун эргэх',
      'Дахин урагш яв',
      'Зүүн эргэх',
      'Сүүлийн урагш хөдөлгөөн',
    ],
    requiredActions: ['move', 'turnLeft', 'turnRight'],
  },
  // Level 5
  {
    id: 'level-5',
    name: 'Түвшин 5: Нөхцөл шалгах',
    description: 'If node ашиглан хана шалгах',
    difficulty: 'medium',
    grid: [
      [
        { type: 'start', x: 0, y: 0 },
        { type: 'empty', x: 1, y: 0 },
        { type: 'wall', x: 2, y: 0 },
        { type: 'empty', x: 3, y: 0 },
        { type: 'goal', x: 4, y: 0 },
      ],
    ],
    startPosition: { x: 0, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 4, y: 0 },
    maxSteps: 25,
    minSteps: 7,
    hints: [
      'Хана байвал эргэх хэрэгтэй',
      'Condition node ашиглана уу',
      '"wallAhead" нөхцөл сонгоно уу',
    ],
    requiredActions: ['move', 'turnRight'],
  },
  // Level 6
  {
    id: 'level-6',
    name: 'Түвшин 6: Давталт + Эргэх',
    description: 'Loop болон эргэх хослуулах',
    difficulty: 'medium',
    grid: [
      [
        { type: 'start', x: 0, y: 0 },
        { type: 'empty', x: 1, y: 0 },
        { type: 'empty', x: 2, y: 0 },
      ],
      [
        { type: 'wall', x: 0, y: 1 },
        { type: 'empty', x: 1, y: 1 },
        { type: 'empty', x: 2, y: 1 },
        { type: 'goal', x: 3, y: 1 },
      ],
    ],
    startPosition: { x: 0, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 3, y: 1 },
    maxSteps: 20,
    minSteps: 6,
    hints: [
      '2 удаа урагш яв',
      'Баруун эргэх',
      'Дахин 2 удаа урагш яв',
    ],
    requiredActions: ['move', 'turnRight'],
  },
  // Level 7
  {
    id: 'level-7',
    name: 'Түвшин 7: У-хэлбэр',
    description: 'U-хэлбэртэй замыг дагах',
    difficulty: 'medium',
    grid: [
      [
        { type: 'start', x: 0, y: 0 },
        { type: 'empty', x: 1, y: 0 },
        { type: 'empty', x: 2, y: 0 },
        { type: 'empty', x: 3, y: 0 },
      ],
      [
        { type: 'wall', x: 0, y: 1 },
        { type: 'empty', x: 1, y: 1 },
        { type: 'wall', x: 2, y: 1 },
        { type: 'empty', x: 3, y: 1 },
        { type: 'goal', x: 4, y: 1 },
      ],
      [
        { type: 'wall', x: 0, y: 2 },
        { type: 'empty', x: 1, y: 2 },
        { type: 'empty', x: 2, y: 2 },
        { type: 'empty', x: 3, y: 2 },
      ],
    ],
    startPosition: { x: 0, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 4, y: 1 },
    maxSteps: 30,
    minSteps: 10,
    hints: [
      'Эхлээд урагш яв',
      'Доош эргэх (баруун)',
      'Доош яв',
      'Зүүн эргэх',
      'Дахин урагш яв',
    ],
    requiredActions: ['move', 'turnLeft', 'turnRight'],
  },
  // Level 8
  {
    id: 'level-8',
    name: 'Түвшин 8: Лабиринт',
    description: 'Энгийн лабиринт',
    difficulty: 'hard',
    grid: [
      [
        { type: 'start', x: 0, y: 0 },
        { type: 'empty', x: 1, y: 0 },
        { type: 'wall', x: 2, y: 0 },
        { type: 'empty', x: 3, y: 0 },
      ],
      [
        { type: 'wall', x: 0, y: 1 },
        { type: 'empty', x: 1, y: 1 },
        { type: 'wall', x: 2, y: 1 },
        { type: 'empty', x: 3, y: 1 },
        { type: 'goal', x: 4, y: 1 },
      ],
      [
        { type: 'wall', x: 0, y: 2 },
        { type: 'empty', x: 1, y: 2 },
        { type: 'empty', x: 2, y: 2 },
        { type: 'empty', x: 3, y: 2 },
      ],
    ],
    startPosition: { x: 0, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 4, y: 1 },
    maxSteps: 35,
    minSteps: 12,
    hints: [
      'Лабиринтыг дагах',
      'Хананд мөргөхгүй байх',
      'Condition node ашиглах',
    ],
    requiredActions: ['move', 'turnLeft', 'turnRight'],
  },
  // Level 9
  {
    id: 'level-9',
    name: 'Түвшин 9: Дөрвөн тал',
    description: 'Дөрвөн чиглэлд эргэх',
    difficulty: 'medium',
    grid: [
      [
        { type: 'start', x: 1, y: 0 },
        { type: 'empty', x: 2, y: 0 },
        { type: 'empty', x: 3, y: 0 },
      ],
      [
        { type: 'empty', x: 0, y: 1 },
        { type: 'empty', x: 1, y: 1 },
        { type: 'wall', x: 2, y: 1 },
        { type: 'empty', x: 3, y: 1 },
        { type: 'goal', x: 4, y: 1 },
      ],
      [
        { type: 'empty', x: 1, y: 2 },
        { type: 'empty', x: 2, y: 2 },
        { type: 'empty', x: 3, y: 2 },
      ],
    ],
    startPosition: { x: 1, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 4, y: 1 },
    maxSteps: 25,
    minSteps: 9,
    hints: [
      'Дөрвөн чиглэлд эргэх',
      'Loop ашиглах',
      '4 удаа давтах',
    ],
    requiredActions: ['move', 'turnRight'],
  },
  // Level 10
  {
    id: 'level-10',
    name: 'Түвшин 10: Спираль',
    description: 'Спираль хэлбэртэй зам',
    difficulty: 'hard',
    grid: [
      [
        { type: 'start', x: 0, y: 0 },
        { type: 'empty', x: 1, y: 0 },
        { type: 'empty', x: 2, y: 0 },
        { type: 'empty', x: 3, y: 0 },
      ],
      [
        { type: 'wall', x: 0, y: 1 },
        { type: 'empty', x: 1, y: 1 },
        { type: 'wall', x: 2, y: 1 },
        { type: 'empty', x: 3, y: 1 },
        { type: 'goal', x: 4, y: 1 },
      ],
      [
        { type: 'wall', x: 0, y: 2 },
        { type: 'empty', x: 1, y: 2 },
        { type: 'empty', x: 2, y: 2 },
        { type: 'wall', x: 3, y: 2 },
      ],
      [
        { type: 'wall', x: 0, y: 3 },
        { type: 'empty', x: 1, y: 3 },
        { type: 'empty', x: 2, y: 3 },
        { type: 'wall', x: 3, y: 3 },
      ],
    ],
    startPosition: { x: 0, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 4, y: 1 },
    maxSteps: 40,
    minSteps: 15,
    hints: [
      'Спираль замыг дагах',
      'Олон удаа эргэх',
      'Condition node ашиглах',
    ],
    requiredActions: ['move', 'turnLeft', 'turnRight'],
  },
];
