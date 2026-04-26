// Future plugin API example. This file is illustrative only.

export default {
  name: 'commit-cheerleader',
  version: '0.1.0',
  onEvent(event, context) {
    if (event.type === 'git:commit') {
      return context.say('Your companion approves this commit. Probably.');
    }
  }
};
