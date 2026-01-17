/**
 * Helper functions for node styling and information
 */

import type { NodeType } from '../types';

/**
 * Get color gradient class for a node type
 */
export function getNodeColor(nodeType: NodeType): string {
  const colors: Record<NodeType, string> = {
    start: 'from-green-400 to-emerald-500',
    action: 'from-blue-400 to-indigo-500',
    condition: 'from-yellow-400 to-orange-500',
    loop: 'from-purple-400 to-pink-500',
    end: 'from-red-400 to-rose-500',
  };
  return colors[nodeType] || 'from-gray-400 to-gray-500';
}

/**
 * Get icon for a node type
 */
export function getNodeIcon(nodeType: NodeType): string {
  const icons: Record<NodeType, string> = {
    start: '🟢',
    action: '⚡',
    condition: '❓',
    loop: '🔁',
    end: '🛑',
  };
  return icons[nodeType] || '⚙️';
}

/**
 * Get default label for a node type
 */
export function getNodeLabel(nodeType: NodeType): string {
  const labels: Record<NodeType, string> = {
    start: '🟢 Эхлэх',
    action: '⚡ Үйлдэл',
    condition: '❓ Нөхцөл',
    loop: '🔁 Давталт',
    end: '🛑 Дуусах',
  };
  return labels[nodeType] || 'Node';
}

/**
 * Get background color for minimap
 */
export function getMinimapColor(nodeType: NodeType): string {
  const colors: Record<NodeType, string> = {
    start: '#10b981',
    action: '#3b82f6',
    condition: '#f59e0b',
    loop: '#a855f7',
    end: '#ef4444',
  };
  return colors[nodeType] || '#6b7280';
}
