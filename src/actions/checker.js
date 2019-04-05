export const HANDLE_DROP = 'HANDLE_DROP';

export function handleDrop(checker) {
  return {
    type: HANDLE_DROP,
    checker
  }
}