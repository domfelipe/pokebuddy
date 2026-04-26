export function classifyCommand(commandText, exitCode = 0) {
  const text = String(commandText).toLowerCase();
  const ok = exitCode === 0;

  if (text.includes('git commit')) return ok ? 'commit_created' : 'command_failure';
  if (text.includes('git merge')) return ok ? 'merge_completed' : 'command_failure';
  if (text.includes('git push')) return ok ? 'push_attempted' : 'command_failure';
  if (text.includes('test')) return ok ? 'tests_passed' : 'tests_failed';
  if (text.includes('build')) return ok ? 'build_passed' : 'build_failed';
  if (text.includes('lint')) return ok ? 'lint_passed' : 'lint_failed';

  return ok ? 'command_success' : 'command_failure';
}

export function recommendedCompanionForEvent(eventType, fallbackId) {
  const mapping = {
    tests_passed: 'zapbit',
    tests_failed: 'nullwisp',
    build_passed: 'zapbit',
    build_failed: 'nullwisp',
    lint_passed: 'zapbit',
    lint_failed: 'nullwisp',
    commit_created: 'mergedrake',
    merge_completed: 'mergedrake',
    push_attempted: 'mergedrake',
    command_failure: 'nullwisp'
  };

  return mapping[eventType] || fallbackId || 'zapbit';
}
