/**
 * Algorithm execution engine
 */

import type { FlowNode, ActionType, Direction, FlowEdge } from '../types/flowgraph';
import type {
  GameState,
  Position,
  PuzzleLevel,
  ExecutionResult,
} from '../types/game';
import { evaluateCondition } from './conditionEvaluator';

const MAX_EXECUTION_STEPS = 100;

/**
 * Execute action on game state
 */
function executeAction(
  action: ActionType,
  state: GameState,
  level: PuzzleLevel,
): GameState {
  const newState = { ...state };
  const { character, grid } = newState;

  switch (action) {
    case 'move': {
      const newPos = getNextPosition(character.position, character.direction);
      const validation = isValidPosition(newPos, grid);
      if (validation.valid) {
        newState.character.position = newPos;
        newState.lastAction = 'move';
      } else {
        // Collision occurred - mark as failed if out of bounds
        if (validation.reason === 'outOfBounds') {
          newState.isFailed = true;
          newState.failureReason = 'outOfBounds';
        } else if (validation.reason === 'wall') {
          newState.isFailed = true;
          newState.failureReason = 'collision';
        }
        newState.lastAction = 'move (blocked)';
      }
      break;
    }
    case 'turnLeft': {
      newState.character.direction = turnLeft(character.direction);
      newState.lastAction = 'turnLeft';
      break;
    }
    case 'turnRight': {
      newState.character.direction = turnRight(character.direction);
      newState.lastAction = 'turnRight';
      break;
    }
    case 'wait': {
      newState.lastAction = 'wait';
      break;
    }
  }

  // Increment step count
  newState.stepCount++;
  
  // Check game completion/ failure after each action
  checkGameCompletion(newState, level);

  return newState;
}

/**
 * Get next position based on direction
 */
function getNextPosition(position: Position, direction: Direction): Position {
  switch (direction) {
    case 'north':
      return { x: position.x, y: position.y - 1 };
    case 'south':
      return { x: position.x, y: position.y + 1 };
    case 'east':
      return { x: position.x + 1, y: position.y };
    case 'west':
      return { x: position.x - 1, y: position.y };
  }
}

/**
 * Check if position is valid (not wall, within bounds)
 * Enhanced collision detection
 */
function isValidPosition(
  position: Position,
  grid: GameState['grid'],
): { valid: boolean; reason?: 'outOfBounds' | 'wall' } {
  // Boundary check
  if (
    position.x < 0 ||
    position.y < 0 ||
    position.y >= grid.length ||
    (grid.length > 0 && position.x >= grid[position.y].length)
  ) {
    return { valid: false, reason: 'outOfBounds' };
  }

  // Wall collision check
  const cell = grid[position.y][position.x];
  if (cell.type === 'wall') {
    return { valid: false, reason: 'wall' };
  }

  return { valid: true };
}

/**
 * Turn left
 */
function turnLeft(direction: Direction): Direction {
  const directions: Direction[] = ['north', 'east', 'south', 'west'];
  const currentIndex = directions.indexOf(direction);
  return directions[(currentIndex + 3) % 4];
}

/**
 * Turn right
 */
function turnRight(direction: Direction): Direction {
  const directions: Direction[] = ['north', 'east', 'south', 'west'];
  const currentIndex = directions.indexOf(direction);
  return directions[(currentIndex + 1) % 4];
}

/**
 * Check if game is complete or failed
 * Enhanced goal logic and game over conditions
 */
function checkGameCompletion(state: GameState, level: PuzzleLevel): void {
  const { character, stepCount } = state;
  const { goalPosition, maxSteps } = level;

  // Goal reached check
  if (
    character.position.x === goalPosition.x &&
    character.position.y === goalPosition.y
  ) {
    state.isComplete = true;
    return;
  }

  // Step limit exceeded
  if (stepCount >= maxSteps) {
    state.isFailed = true;
    state.failureReason = 'maxSteps';
    return;
  }

  // Check if character is stuck (optional - for future enhancement)
  // Could detect if character hasn't moved in last N steps
}

/**
 * Get next node based on current node and edges
 */
function getNextNode(
  currentNode: FlowNode,
  edges: FlowEdge[],
  nodes: FlowNode[],
  conditionResult?: boolean,
): FlowNode | undefined {
  const outgoingEdges = edges.filter((e) => e.source === currentNode.id);

  if (currentNode.type === 'condition') {
    // For condition nodes, choose based on condition result
    const trueEdge = outgoingEdges.find((e) => e.sourceHandle === 'true' || e.label === 'true');
    const falseEdge = outgoingEdges.find((e) => e.sourceHandle === 'false' || e.label === 'false');
    
    // If no labeled edges, use first as true, second as false
    const chosenEdge = conditionResult
      ? (trueEdge || outgoingEdges[0])
      : (falseEdge || outgoingEdges[1] || outgoingEdges[0]);

    if (chosenEdge) {
      return nodes.find((n) => n.id === chosenEdge.target);
    }
  } else {
    // For other nodes, take first outgoing edge
    if (outgoingEdges.length > 0) {
      return nodes.find((n) => n.id === outgoingEdges[0].target);
    }
  }

  return undefined;
}

/**
 * Execute flowgraph algorithm on puzzle level
 * Enhanced with proper loop and condition support
 */
export function executeAlgorithm(
  nodes: FlowNode[],
  level: PuzzleLevel,
  edges: FlowEdge[] = [],
): ExecutionResult {
  // Initialize game state
  const initialState: GameState = {
    character: {
      position: { ...level.startPosition },
      direction: level.startDirection,
    },
    grid: level.grid.map((row) => row.map((cell) => ({ ...cell }))),
    stepCount: 0,
    isComplete: false,
    isFailed: false,
  };

  let currentState = initialState;
  let currentNode = nodes.find((n) => n.type === 'start');
  let executionSteps = 0;
  const loopStack: Array<{
    loopNode: FlowNode;
    loopCount: number;
    currentIteration: number;
    loopStartNode: FlowNode;
  }> = [];

  if (!currentNode) {
    return {
      success: false,
      stepCount: 0,
      message: 'Start node олдсонгүй',
      finalState: initialState,
    };
  }

  while (
    currentNode &&
    executionSteps < MAX_EXECUTION_STEPS &&
    !currentState.isComplete &&
    !currentState.isFailed
  ) {
    executionSteps++;

    switch (currentNode.type) {
      case 'start': {
        // Move to next node
        const nextNode = getNextNode(currentNode, edges, nodes);
        currentNode = nextNode;
        break;
      }

      case 'action': {
        if (currentNode.data?.action) {
          currentState = executeAction(
            currentNode.data.action,
            currentState,
            level,
          );
        }
        const nextNode = getNextNode(currentNode, edges, nodes);
        currentNode = nextNode;
        break;
      }

      case 'loop': {
        const loopCount = currentNode.data?.loopCount || 1;
        const loopStartNode = getNextNode(currentNode, edges, nodes);

        if (!loopStartNode) {
          currentNode = undefined;
          break;
        }

        // Check if we're already in this loop (returning to loop node)
        const existingLoop = loopStack.find(
          (l) => l.loopNode.id === currentNode!.id,
        );

        if (existingLoop) {
          // We've returned to the loop node - increment iteration
          existingLoop.currentIteration++;

          if (existingLoop.currentIteration >= existingLoop.loopCount) {
            // Loop finished - exit loop
            loopStack.pop();
            // Find node after loop (next node from loop node)
            const nextAfterLoop = getNextNode(currentNode, edges, nodes);
            currentNode = nextAfterLoop;
          } else {
            // Continue loop iteration - go to loop start
            currentNode = existingLoop.loopStartNode;
          }
        } else {
          // Starting new loop - first iteration
          loopStack.push({
            loopNode: currentNode,
            loopCount,
            currentIteration: 1, // Start at 1, not 0
            loopStartNode,
          });
          currentNode = loopStartNode;
        }
        break;
      }

      case 'condition': {
        const condition = currentNode.data?.condition || 'canMove';
        const conditionResult = evaluateCondition(
          condition,
          currentState,
          level,
        );

        const nextNode = getNextNode(currentNode, edges, nodes, conditionResult);
        currentNode = nextNode;
        break;
      }

      case 'end': {
        currentNode = undefined; // Exit
        break;
      }
    }

    // Infinite loop protection is handled by MAX_EXECUTION_STEPS check
  }

  // Check completion
  if (currentState.isComplete) {
    const { stepCount } = currentState;
    const { minSteps, maxSteps } = level;
    
    let message = 'Амжилттай! 🎉';
    if (minSteps && stepCount === minSteps) {
      message += ' (Хамгийн оновчтой шийдэл!)';
    } else if (minSteps && stepCount <= minSteps + 2) {
      message += ' (Маш сайн!)';
    } else if (stepCount < maxSteps * 0.7) {
      message += ' (Сайн ажиллалаа!)';
    }

    return {
      success: true,
      stepCount,
      message,
      finalState: currentState,
    };
  }

  // Check failure conditions
  if (currentState.isFailed) {
    const failureMessages: Record<string, string> = {
      maxSteps: `Хэт олон алхам хийсэн (${currentState.stepCount}/${level.maxSteps})`,
      collision: 'Хананд мөргөлдсөн!',
      outOfBounds: 'Газар дээрээс гарсан!',
      infiniteLoop: 'Хязгааргүй давталт илэрсэн',
    };

    return {
      success: false,
      stepCount: currentState.stepCount,
      message: failureMessages[currentState.failureReason || 'maxSteps'] || 'Алдаа гарлаа',
      finalState: currentState,
    };
  }

  // Infinite loop protection
  if (executionSteps >= MAX_EXECUTION_STEPS) {
    currentState.isFailed = true;
    currentState.failureReason = 'infiniteLoop';
    return {
      success: false,
      stepCount: currentState.stepCount,
      message: 'Хязгааргүй давталт илэрсэн. Алгоритмаа шалгана уу.',
      finalState: currentState,
    };
  }

  // Algorithm didn't complete
  return {
    success: false,
    stepCount: currentState.stepCount,
    message: 'Алгоритм дуусаагүй байна. End node хүрэхгүй байна.',
    finalState: currentState,
  };
}
